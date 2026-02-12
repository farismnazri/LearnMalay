import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { getCollections, type UserDocument } from "./db";
import { ADMIN_ID, type UserProfile, type UserProgress } from "@/lib/userStoreTypes";
import {
  ADMIN_AVATAR_ID,
  DEFAULT_USER_AVATAR_ID,
  isProfileAvatarId,
  type ProfileAvatarId,
} from "@/lib/profileAvatars";

const ADMIN_DEFAULT_PASSWORD = process.env.LEARN_MALAY_ADMIN_PASSWORD ?? "admin";
const AUTH_BOOTSTRAP_KEY = "users_auth_v1_bootstrap_done";

let userDataStateReady = false;
let userDataStatePromise: Promise<void> | null = null;

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

function avatarIdFromDb(rawAvatarId: string | null | undefined, isAdmin: boolean): ProfileAvatarId {
  if (rawAvatarId && isProfileAvatarId(rawAvatarId)) return rawAvatarId;
  return isAdmin ? ADMIN_AVATAR_ID : DEFAULT_USER_AVATAR_ID;
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
  const isAdmin = Boolean(row.is_admin);
  const avatarId = avatarIdFromDb(row.avatar_id, isAdmin);

  return {
    id: row.id,
    name: row.name,
    avatarId,
    isAdmin,
    progress: {
      chapter: Number(row.progress_chapter) || 1,
      page: Number(row.progress_page) || 1,
    },
  };
}

async function ensureAdmin() {
  const { users } = await getCollections();
  const existing = await users.findOne({ id: ADMIN_ID });

  if (!existing) {
    const pw = hashPassword(ADMIN_DEFAULT_PASSWORD);
    await users.insertOne({
      id: ADMIN_ID,
      name: ADMIN_ID,
      avatar_id: ADMIN_AVATAR_ID,
      is_admin: true,
      progress_chapter: 11,
      progress_page: 1,
      password_hash: pw.hash,
      password_salt: pw.salt,
      password_algo: pw.algo,
      created_at: new Date().toISOString(),
    });
    return;
  }

  const updates: Partial<UserDocument> = {};

  if (!existing.password_hash || !existing.password_salt) {
    const pw = hashPassword(ADMIN_DEFAULT_PASSWORD);
    updates.password_hash = pw.hash;
    updates.password_salt = pw.salt;
    updates.password_algo = pw.algo;
  }

  if (!existing.is_admin) {
    updates.is_admin = true;
  }

  if (!existing.avatar_id || !isProfileAvatarId(existing.avatar_id)) {
    updates.avatar_id = ADMIN_AVATAR_ID;
  }

  const currentChapter = Number(existing.progress_chapter) || 1;
  const currentPage = Number(existing.progress_page) || 1;
  if (currentChapter < 11) updates.progress_chapter = 11;
  if (currentPage < 1) updates.progress_page = 1;

  if (Object.keys(updates).length > 0) {
    await users.updateOne({ id: ADMIN_ID }, { $set: updates });
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
    { $set: { avatar_id: ADMIN_AVATAR_ID } }
  );

  await users.updateMany(
    {
      id: { $ne: ADMIN_ID },
      $or: [{ avatar_id: null }, { avatar_id: "" }, { avatar_id: { $exists: false } }],
    },
    { $set: { avatar_id: DEFAULT_USER_AVATAR_ID } }
  );
}

async function ensureUserDataState() {
  if (userDataStateReady) return;

  if (!userDataStatePromise) {
    userDataStatePromise = (async () => {
      await ensureAdmin();
      await ensureAuthBootstrap();
      await ensureAvatarBackfill();
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
      is_admin: false,
      progress_chapter: 1,
      progress_page: 1,
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

export async function deleteUser(id: string): Promise<void> {
  await ensureUserDataState();
  const { users } = await getCollections();

  const cleanId = normalizeUserId(id);
  if (cleanId === ADMIN_ID) throw new Error("Admin cannot be deleted.");

  await users.deleteOne({ id: cleanId });
}

export async function setCurrentChapter(id: string, progress: UserProgress): Promise<void> {
  await ensureUserDataState();
  const { users } = await getCollections();

  const cleanId = normalizeUserId(id);

  const chapter = Math.max(1, Math.min(11, Number(progress.chapter) || 1));
  const page = Math.max(1, Number(progress.page) || 1);

  const current = await users.findOne(
    { id: cleanId },
    {
      projection: {
        progress_chapter: 1,
        progress_page: 1,
      },
    }
  );

  if (!current) return;

  const currentChapter = Number(current.progress_chapter) || 1;
  const currentPage = Number(current.progress_page) || 1;

  const nextChapter = Math.max(currentChapter, chapter);
  const nextPage = chapter < currentChapter ? currentPage : page;

  await users.updateOne(
    { id: cleanId },
    {
      $set: {
        progress_chapter: nextChapter,
        progress_page: nextPage,
      },
    }
  );
}
