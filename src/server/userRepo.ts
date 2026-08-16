import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { getCollections, type UserDocument } from "./db";
import {
  ADMIN_ID,
  DEMO_DISPLAY_NAME,
  DEMO_ID,
  type UserProfile,
  type UserProgress,
  type UserRole,
} from "@/lib/userStoreTypes";
import {
  ADMIN_AVATAR_ID,
  CURRENT_AVATAR_MIGRATION_VERSION,
  DEFAULT_USER_AVATAR_ID,
  isProfileAvatarId,
  resolveStoredProfileAvatar,
  type ProfileAvatarId,
} from "@/lib/profileAvatars";
import { CHAPTERS, MAX_CHAPTER_ID, MIN_CHAPTER_ID, getChapterById } from "@/lib/chapters";
import {
  CHAPTER_PROGRESSION_VERSION,
  LEGACY_TO_CURRENT_CHAPTER_ID,
  getNextRequiredProgressChapter,
  migrateLegacyCompletedChapterRevisions,
  migrateLegacyProgressChapter,
} from "@/lib/chapterProgression";
import { USERNAME_SAFETY_REJECTION_MESSAGE, validateUsernameSafety } from "@/lib/usernameSafety";

const MAX_PROGRESS_PAGE = 10_000;

function resolveAdminBootstrapPassword(): string {
  const fromEnv = process.env.LEARN_MALAY_ADMIN_PASSWORD?.trim();
  if (fromEnv) return fromEnv;

  if (process.env.NODE_ENV !== "development") {
    throw new Error("LEARN_MALAY_ADMIN_PASSWORD must be set outside development.");
  }

  console.warn(
    "LEARN_MALAY_ADMIN_PASSWORD is not set. Using development fallback password for ADMIN."
  );
  return "admin";
}

function resolveAdminRotationPassword(): string {
  const fromEnv = process.env.LEARN_MALAY_ADMIN_PASSWORD?.trim();
  if (!fromEnv) {
    throw new Error("LEARN_MALAY_ADMIN_PASSWORD must be set to rotate the admin password.");
  }
  return fromEnv;
}

function resolveDemoBootstrapPassword(): string | null {
  const fromEnv = process.env.LEARN_MALAY_DEMO_PASSWORD?.trim();
  if (fromEnv) return fromEnv;

  if (process.env.NODE_ENV === "development") {
    console.warn(
      "LEARN_MALAY_DEMO_PASSWORD is not set. Using development fallback password for DEMO."
    );
    return "demomode";
  }

  return null;
}
const AUTH_BOOTSTRAP_KEY = "users_auth_v1_bootstrap_done";

let userDataStateReady = false;
let userDataStatePromise: Promise<void> | null = null;
let warnedMissingDemoPassword = false;

function normalizeUserId(id: string) {
  return id.trim().toUpperCase();
}

function sanitizeUserName(rawName: string): { id: string; name: string } {
  const normalized = rawName
    .normalize("NFKC")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) throw new Error("Username is required.");
  if (normalized.length > 32) throw new Error("Username must be 32 characters or less.");
  if (!/^[A-Za-z0-9 _.-]+$/.test(normalized)) {
    throw new Error("Username can only include letters, numbers, space, ., _, and -.");
  }

  return {
    id: normalized.toUpperCase(),
    name: normalized,
  };
}

function sanitizePassword(rawPassword: string): string {
  const normalized = rawPassword.normalize("NFKC");
  if (!normalized) throw new Error("Password is required.");
  if (normalized.length > 256) throw new Error("Password is too long.");
  return normalized;
}

function sanitizeAvatarId(rawAvatarId: string | null | undefined): ProfileAvatarId {
  if (!rawAvatarId) return DEFAULT_USER_AVATAR_ID;
  if (!isProfileAvatarId(rawAvatarId)) throw new Error("Invalid avatar selected.");
  return rawAvatarId;
}

function roleFromRow(row: UserDocument): UserRole {
  if (Boolean(row.is_admin) || row.id === ADMIN_ID) return "admin";
  if (row.id === DEMO_ID) return "demo";
  return "user";
}

function normalizeCompletedChapterRevisions(value: unknown): Record<string, number> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  const revisions: Record<string, number> = {};
  for (const [chapterId, revision] of Object.entries(value)) {
    if (/^\d+$/.test(chapterId) && Number.isInteger(revision) && Number(revision) >= 1) {
      revisions[chapterId] = Number(revision);
    }
  }
  return revisions;
}

function completedRevisionBaseline(progressChapter: number): Record<string, number> {
  const revisions: Record<string, number> = {};
  for (const chapter of CHAPTERS) {
    const completed = chapter.id === MAX_CHAPTER_ID
      ? progressChapter >= MAX_CHAPTER_ID
      : progressChapter > chapter.id;
    if (completed) revisions[String(chapter.id)] = chapter.revision;
  }
  return revisions;
}

function legacyCompletedRevisionBaseline(legacyProgressChapter: number): Record<string, number> {
  const revisions: Record<string, number> = {};
  for (let legacyChapterId = MIN_CHAPTER_ID; legacyChapterId < legacyProgressChapter; legacyChapterId += 1) {
    const currentChapterId = LEGACY_TO_CURRENT_CHAPTER_ID[legacyChapterId] ?? legacyChapterId;
    const chapter = getChapterById(currentChapterId);
    if (chapter) revisions[String(legacyChapterId)] = chapter.revision;
  }
  return revisions;
}

function hashPassword(password: string, saltHex?: string) {
  const salt = saltHex ?? randomBytes(16).toString("hex");
  const hash = scryptSync(password, Buffer.from(salt, "hex"), 64).toString("hex");
  return { salt, hash, algo: "scrypt" };
}

function verifyPassword(password: string, saltHex: string | null, hashHex: string | null): boolean {
  if (!saltHex || !hashHex) return false;

  const candidateHash = hashPassword(password, saltHex).hash;
  const a = Buffer.from(candidateHash, "hex");
  const b = Buffer.from(hashHex, "hex");

  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function toProfile(row: UserDocument): UserProfile {
  const role = roleFromRow(row);
  const isAdmin = role === "admin";
  const isDemo = role === "demo";
  const avatar = resolveStoredProfileAvatar(row.avatar_id, row.avatar_migration_version);

  return {
    id: row.id,
    name: row.name,
    avatarId: avatar.avatarId,
    avatarMigrationRequired: avatar.migrationRequired,
    role,
    isAdmin,
    isDemo,
    progress: {
      chapter: Number(row.progress_chapter) || 1,
      page: Number(row.progress_page) || 1,
    },
    completedChapterRevisions: normalizeCompletedChapterRevisions(row.completed_chapter_revisions),
  };
}

async function ensureAdmin() {
  const { users } = await getCollections();
  const existing = await users.findOne({ id: ADMIN_ID });
  const bootstrapPassword = resolveAdminBootstrapPassword();

  if (!existing) {
    const pw = hashPassword(bootstrapPassword);
    await users.insertOne({
      id: ADMIN_ID,
      name: ADMIN_ID,
      avatar_id: ADMIN_AVATAR_ID,
      avatar_migration_version: CURRENT_AVATAR_MIGRATION_VERSION,
      is_admin: true,
      progress_chapter: 11,
      progress_page: 1,
      completed_chapter_revisions: completedRevisionBaseline(11),
      chapter_progression_version: CHAPTER_PROGRESSION_VERSION,
      password_hash: pw.hash,
      password_salt: pw.salt,
      password_algo: pw.algo,
      created_at: new Date().toISOString(),
    });
    return;
  }

  const updates: Partial<UserDocument> = {};

  if (!existing.password_hash || !existing.password_salt) {
    const pw = hashPassword(bootstrapPassword);
    updates.password_hash = pw.hash;
    updates.password_salt = pw.salt;
    updates.password_algo = pw.algo;
  }

  if (!existing.is_admin) {
    updates.is_admin = true;
  }

  if (!existing.avatar_id) {
    updates.avatar_id = ADMIN_AVATAR_ID;
    updates.avatar_migration_version = CURRENT_AVATAR_MIGRATION_VERSION;
  }

  const currentChapter = Number(existing.progress_chapter) || 1;
  const currentPage = Number(existing.progress_page) || 1;
  if (currentChapter < 11) updates.progress_chapter = 11;
  if (currentPage < 1) updates.progress_page = 1;

  if (Object.keys(updates).length > 0) {
    await users.updateOne({ id: ADMIN_ID }, { $set: updates });
  }
}

async function ensureDemoAccount() {
  const { users } = await getCollections();
  const existing = await users.findOne({ id: DEMO_ID });
  const demoPassword = resolveDemoBootstrapPassword();

  if (!existing && !demoPassword) {
    if (!warnedMissingDemoPassword) {
      warnedMissingDemoPassword = true;
      console.warn(
        "LEARN_MALAY_DEMO_PASSWORD is not set outside development. Demo account bootstrap is disabled."
      );
    }
    return;
  }

  if (!existing) {
    if (!demoPassword) return;
    const pw = hashPassword(demoPassword);
    await users.insertOne({
      id: DEMO_ID,
      name: DEMO_DISPLAY_NAME,
      avatar_id: DEFAULT_USER_AVATAR_ID,
      avatar_migration_version: CURRENT_AVATAR_MIGRATION_VERSION,
      is_admin: false,
      progress_chapter: 11,
      progress_page: 1,
      completed_chapter_revisions: completedRevisionBaseline(11),
      chapter_progression_version: CHAPTER_PROGRESSION_VERSION,
      password_hash: pw.hash,
      password_salt: pw.salt,
      password_algo: pw.algo,
      created_at: new Date().toISOString(),
    });
    return;
  }

  const updates: Partial<UserDocument> = {};

  if ((!existing.password_hash || !existing.password_salt) && demoPassword) {
    const pw = hashPassword(demoPassword);
    updates.password_hash = pw.hash;
    updates.password_salt = pw.salt;
    updates.password_algo = pw.algo;
  }

  if (existing.is_admin) {
    updates.is_admin = false;
  }

  if (existing.name !== DEMO_DISPLAY_NAME) {
    updates.name = DEMO_DISPLAY_NAME;
  }

  if (!existing.avatar_id) {
    updates.avatar_id = DEFAULT_USER_AVATAR_ID;
    updates.avatar_migration_version = CURRENT_AVATAR_MIGRATION_VERSION;
  }

  const currentChapter = Number(existing.progress_chapter) || 1;
  const currentPage = Number(existing.progress_page) || 1;
  if (currentChapter < 11) updates.progress_chapter = 11;
  if (currentPage < 1) updates.progress_page = 1;

  if (Object.keys(updates).length > 0) {
    await users.updateOne({ id: DEMO_ID }, { $set: updates });
  }
}

async function ensureAuthBootstrap() {
  const { appMeta } = await getCollections();
  const done = await appMeta.findOne({ key: AUTH_BOOTSTRAP_KEY });

  if (done?.value === "1") return;

  await appMeta.updateOne(
    { key: AUTH_BOOTSTRAP_KEY },
    {
      $set: {
        value: "1",
        updated_at: new Date().toISOString(),
      },
    },
    { upsert: true }
  );
}

async function ensureAvatarBackfill() {
  const { users } = await getCollections();

  await users.updateOne(
    {
      id: ADMIN_ID,
      $or: [{ avatar_id: null }, { avatar_id: "" }, { avatar_id: { $exists: false } }],
    },
    {
      $set: {
        avatar_id: ADMIN_AVATAR_ID,
        avatar_migration_version: CURRENT_AVATAR_MIGRATION_VERSION,
      },
    }
  );

  await users.updateMany(
    {
      id: { $ne: ADMIN_ID },
      $or: [{ avatar_id: null }, { avatar_id: "" }, { avatar_id: { $exists: false } }],
    },
    {
      $set: {
        avatar_id: DEFAULT_USER_AVATAR_ID,
        avatar_migration_version: CURRENT_AVATAR_MIGRATION_VERSION,
      },
    }
  );
}

async function ensureCompletedChapterRevisionBackfill() {
  const { users } = await getCollections();
  const rows = await users.find({}).toArray();

  for (const row of rows) {
    if (
      row.completed_chapter_revisions &&
      typeof row.completed_chapter_revisions === "object" &&
      !Array.isArray(row.completed_chapter_revisions)
    ) {
      continue;
    }
    const progressChapter = Number(row.progress_chapter) || MIN_CHAPTER_ID;
    await users.updateOne(
      { id: row.id },
      { $set: { completed_chapter_revisions: completedRevisionBaseline(progressChapter) } }
    );
  }
}

async function ensureChapterProgressionMigration() {
  const { users } = await getCollections();
  const rows = await users.find({}).toArray();

  for (const row of rows) {
    if (row.chapter_progression_version === CHAPTER_PROGRESSION_VERSION) continue;

    const legacyProgressChapter = Number(row.progress_chapter) || MIN_CHAPTER_ID;
    const migratedProgressChapter = migrateLegacyProgressChapter(legacyProgressChapter);
    const updates: Partial<UserDocument> = {
      chapter_progression_version: CHAPTER_PROGRESSION_VERSION,
      progress_chapter: migratedProgressChapter,
    };

    if (migratedProgressChapter !== legacyProgressChapter) {
      updates.progress_page = 1;
    }

    if (
      row.completed_chapter_revisions &&
      typeof row.completed_chapter_revisions === "object" &&
      !Array.isArray(row.completed_chapter_revisions)
    ) {
      updates.completed_chapter_revisions = migrateLegacyCompletedChapterRevisions(
        {
          ...legacyCompletedRevisionBaseline(legacyProgressChapter),
          ...normalizeCompletedChapterRevisions(row.completed_chapter_revisions),
        },
      );
    } else {
      updates.completed_chapter_revisions = migrateLegacyCompletedChapterRevisions(
        legacyCompletedRevisionBaseline(legacyProgressChapter),
      );
    }

    await users.updateOne({ id: row.id }, { $set: updates });
  }
}

async function ensureUserDataState() {
  if (userDataStateReady) return;

  if (!userDataStatePromise) {
    userDataStatePromise = (async () => {
      await ensureAdmin();
      await ensureDemoAccount();
      await ensureAuthBootstrap();
      await ensureAvatarBackfill();
      await ensureChapterProgressionMigration();
      await ensureCompletedChapterRevisionBackfill();
    })();
  }

  try {
    await userDataStatePromise;
    userDataStateReady = true;
  } finally {
    userDataStatePromise = null;
  }
}

export async function initializeUserAuthState() {
  await ensureUserDataState();
}

export async function listUsers(): Promise<UserProfile[]> {
  await ensureUserDataState();
  const { users } = await getCollections();
  const rows = await users.find({}, { sort: { name: 1 } }).toArray();
  return rows.map(toProfile);
}

export async function getUser(id: string): Promise<UserProfile | null> {
  try {
    await ensureUserDataState();
    const { users } = await getCollections();
    const cleanId = normalizeUserId(id);
    const row = await users.findOne({ id: cleanId });
    return row ? toProfile(row) : null;
  } catch (e) {
    console.error("getUser failed", e);
    return null;
  }
}

export async function createUserAccount(input: {
  name: string;
  password: string;
  avatarId?: string;
}): Promise<UserProfile> {
  await ensureUserDataState();
  const { users } = await getCollections();

  const user = sanitizeUserName(input.name);
  const password = sanitizePassword(input.password);
  const avatarId = sanitizeAvatarId(input.avatarId);

  if (user.id === ADMIN_ID) {
    throw new Error("Admin account already exists. Please log in.");
  }
  if (user.id === DEMO_ID) {
    throw new Error("This account is reserved.");
  }
  if (!validateUsernameSafety(user.name).ok) {
    throw new Error(USERNAME_SAFETY_REJECTION_MESSAGE.en);
  }

  const existing = await users.findOne({ id: user.id }, { projection: { id: 1 } });
  if (existing) {
    throw new Error("Account already exists. Please log in.");
  }

  const pw = hashPassword(password);

  try {
    await users.insertOne({
      id: user.id,
      name: user.name.toUpperCase(),
      avatar_id: avatarId,
      avatar_migration_version: CURRENT_AVATAR_MIGRATION_VERSION,
      is_admin: false,
      progress_chapter: 1,
      progress_page: 1,
      completed_chapter_revisions: {},
      chapter_progression_version: CHAPTER_PROGRESSION_VERSION,
      password_hash: pw.hash,
      password_salt: pw.salt,
      password_algo: pw.algo,
      created_at: new Date().toISOString(),
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error && "code" in error && (error as { code?: number }).code === 11000) {
      throw new Error("Account already exists. Please log in.");
    }
    throw error;
  }

  return (await getUser(user.id))!;
}

export async function verifyUserPassword(id: string, password: string): Promise<boolean> {
  await ensureUserDataState();
  const { users } = await getCollections();

  const cleanId = normalizeUserId(id);
  const cleanPassword = sanitizePassword(password);

  const row = await users.findOne(
    { id: cleanId },
    {
      projection: {
        password_hash: 1,
        password_salt: 1,
      },
    }
  );

  if (!row) return false;
  return verifyPassword(cleanPassword, row.password_salt ?? null, row.password_hash ?? null);
}

export async function authenticateUserAccount(input: {
  name: string;
  password: string;
}): Promise<UserProfile | null> {
  await ensureUserDataState();

  const user = sanitizeUserName(input.name);
  const ok = await verifyUserPassword(user.id, input.password);
  if (!ok) return null;

  return getUser(user.id);
}

export async function rotateAdminPasswordFromEnv(): Promise<{ rotated: boolean }> {
  await ensureUserDataState();
  const { users } = await getCollections();

  const adminPassword = sanitizePassword(resolveAdminRotationPassword());
  const row = await users.findOne(
    { id: ADMIN_ID },
    {
      projection: {
        password_hash: 1,
        password_salt: 1,
      },
    }
  );

  if (!row) {
    throw new Error("Admin account is not initialized.");
  }

  const alreadyMatches = verifyPassword(adminPassword, row.password_salt ?? null, row.password_hash ?? null);
  if (alreadyMatches) {
    return { rotated: false };
  }

  const pw = hashPassword(adminPassword);
  await users.updateOne(
    { id: ADMIN_ID },
    {
      $set: {
        password_hash: pw.hash,
        password_salt: pw.salt,
        password_algo: pw.algo,
      },
    }
  );

  return { rotated: true };
}

export async function deleteUser(id: string): Promise<void> {
  await ensureUserDataState();
  const { users } = await getCollections();

  const cleanId = normalizeUserId(id);
  if (cleanId === ADMIN_ID) throw new Error("Admin cannot be deleted.");
  if (cleanId === DEMO_ID) throw new Error("Demo account cannot be deleted.");

  await users.deleteOne({ id: cleanId });
}

export async function updateUserAvatar(id: string, rawAvatarId: string): Promise<void> {
  await ensureUserDataState();
  const { users } = await getCollections();

  const cleanId = normalizeUserId(id);
  const avatarId = sanitizeAvatarId(rawAvatarId);
  await users.updateOne(
    { id: cleanId },
    {
      $set: {
        avatar_id: avatarId,
        avatar_migration_version: CURRENT_AVATAR_MIGRATION_VERSION,
      },
    }
  );
}

export async function setCurrentChapter(
  id: string,
  progress: UserProgress,
  completedChapterId?: number
): Promise<void> {
  await ensureUserDataState();
  const { users } = await getCollections();

  const cleanId = normalizeUserId(id);
  if (cleanId === DEMO_ID) return;

  if (!Number.isInteger(progress.chapter) || progress.chapter < MIN_CHAPTER_ID || progress.chapter > MAX_CHAPTER_ID) {
    throw new Error("Invalid progress payload.");
  }
  if (!Number.isInteger(progress.page) || progress.page < 1 || progress.page > MAX_PROGRESS_PAGE) {
    throw new Error("Invalid progress payload.");
  }

  const chapter = progress.chapter;
  const page = progress.page;

  const current = await users.findOne(
    { id: cleanId },
    {
      projection: {
        progress_chapter: 1,
        progress_page: 1,
        completed_chapter_revisions: 1,
      },
    }
  );

  if (!current) return;

  const currentChapter = Number.isInteger(current.progress_chapter)
    ? current.progress_chapter
    : MIN_CHAPTER_ID;
  const currentPage = Number.isInteger(current.progress_page)
    ? current.progress_page
    : 1;

  const requestedNextChapter = Math.max(currentChapter, chapter);
  const nextPage = chapter < currentChapter ? currentPage : page;
  const completedChapterRevisions = normalizeCompletedChapterRevisions(current.completed_chapter_revisions);

  if (completedChapterId !== undefined) {
    const completedChapter = getChapterById(completedChapterId);
    if (!completedChapter || completedChapterId > currentChapter) {
      throw new Error("Invalid completed chapter.");
    }
    completedChapterRevisions[String(completedChapterId)] = completedChapter.revision;
  }

  const nextChapter = completedChapterId === undefined
    ? requestedNextChapter
    : getNextRequiredProgressChapter(requestedNextChapter, completedChapterRevisions);

  await users.updateOne(
    { id: cleanId },
    {
      $set: {
        progress_chapter: nextChapter,
        progress_page: nextPage,
        completed_chapter_revisions: completedChapterRevisions,
      },
    }
  );
}
