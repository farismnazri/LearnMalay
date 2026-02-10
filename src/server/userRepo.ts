import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { getDb } from "./db";
import { ADMIN_ID, type UserProfile, type UserProgress } from "@/lib/userStoreTypes";
import {
  ADMIN_AVATAR_ID,
  DEFAULT_USER_AVATAR_ID,
  isProfileAvatarId,
  type ProfileAvatarId,
} from "@/lib/profileAvatars";

type UserRow = {
  id: string;
  name: string;
  is_admin: number;
  progress_chapter: number;
  progress_page: number;
  password_hash: string | null;
  password_salt: string | null;
  password_algo: string | null;
  avatar_id: string | null;
};

const ADMIN_DEFAULT_PASSWORD = process.env.LEARN_MALAY_ADMIN_PASSWORD ?? "admin";
const AUTH_BOOTSTRAP_KEY = "users_auth_v1_bootstrap_done";

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

function avatarIdFromDb(rawAvatarId: string | null, isAdmin: boolean): ProfileAvatarId {
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

function toProfile(row: UserRow): UserProfile {
  const avatarId = avatarIdFromDb(row.avatar_id, Boolean(row.is_admin));
  return {
    id: row.id,
    name: row.name,
    avatarId,
    isAdmin: Boolean(row.is_admin),
    progress: {
      chapter: Number(row.progress_chapter) || 1,
      page: Number(row.progress_page) || 1,
    },
  };
}

function ensureAdmin(db = getDb()) {
  const existing = db.prepare("SELECT * FROM users WHERE id = ?").get(ADMIN_ID) as UserRow | undefined;

  if (!existing) {
    const pw = hashPassword(ADMIN_DEFAULT_PASSWORD);
    db.prepare(
      `INSERT INTO users (
        id, name, is_admin, progress_chapter, progress_page, password_hash, password_salt, password_algo, avatar_id
      ) VALUES (?, ?, 1, 11, 1, ?, ?, ?, ?)`
    ).run(ADMIN_ID, ADMIN_ID, pw.hash, pw.salt, pw.algo, ADMIN_AVATAR_ID);
    return;
  }

  if (!existing.password_hash || !existing.password_salt) {
    const pw = hashPassword(ADMIN_DEFAULT_PASSWORD);
    db.prepare(
      `UPDATE users
       SET is_admin = 1,
           password_hash = ?,
           password_salt = ?,
           password_algo = ?,
           progress_chapter = CASE WHEN progress_chapter < 11 THEN 11 ELSE progress_chapter END,
           progress_page = CASE WHEN progress_page < 1 THEN 1 ELSE progress_page END
       WHERE id = ?`
    ).run(pw.hash, pw.salt, pw.algo, ADMIN_ID);
    return;
  }

  if (!existing.is_admin) {
    db.prepare("UPDATE users SET is_admin = 1 WHERE id = ?").run(ADMIN_ID);
  }

  if (!existing.avatar_id || !isProfileAvatarId(existing.avatar_id)) {
    db.prepare("UPDATE users SET avatar_id = ? WHERE id = ?").run(ADMIN_AVATAR_ID, ADMIN_ID);
  }
}

function ensureAuthBootstrap(db = getDb()) {
  const done = db.prepare("SELECT value FROM app_meta WHERE key = ?").get(AUTH_BOOTSTRAP_KEY) as
    | { value: string }
    | undefined;

  if (done?.value === "1") return;

  ensureAdmin(db);
  db.prepare("DELETE FROM users WHERE id <> ?").run(ADMIN_ID);
  db.prepare(
    `INSERT INTO app_meta (key, value, updated_at)
     VALUES (?, '1', datetime('now'))
     ON CONFLICT(key) DO UPDATE SET value = '1', updated_at = datetime('now')`
  ).run(AUTH_BOOTSTRAP_KEY);
}

function ensureAvatarBackfill(db = getDb()) {
  db.prepare("UPDATE users SET avatar_id = ? WHERE id = ? AND (avatar_id IS NULL OR avatar_id = '')").run(
    ADMIN_AVATAR_ID,
    ADMIN_ID
  );
  db.prepare("UPDATE users SET avatar_id = ? WHERE id <> ? AND (avatar_id IS NULL OR avatar_id = '')").run(
    DEFAULT_USER_AVATAR_ID,
    ADMIN_ID
  );
}

function ensureUserDataState(db = getDb()) {
  ensureAdmin(db);
  ensureAuthBootstrap(db);
  ensureAvatarBackfill(db);
}

export function initializeUserAuthState() {
  const db = getDb();
  ensureUserDataState(db);
}

export function listUsers(): UserProfile[] {
  const db = getDb();
  ensureUserDataState(db);
  const rows = db.prepare("SELECT * FROM users ORDER BY name ASC").all() as UserRow[];
  return rows.map(toProfile);
}

export function getUser(id: string): UserProfile | null {
  try {
    const db = getDb();
    ensureUserDataState(db);
    const cleanId = normalizeUserId(id);
    const row = db.prepare("SELECT * FROM users WHERE id = ?").get(cleanId) as UserRow | undefined;
    return row ? toProfile(row) : null;
  } catch (e) {
    console.error("getUser failed", e);
    return null;
  }
}

export function createUserAccount(input: { name: string; password: string; avatarId?: string }): UserProfile {
  const db = getDb();
  ensureUserDataState(db);

  const user = sanitizeUserName(input.name);
  const password = sanitizePassword(input.password);
  const avatarId = sanitizeAvatarId(input.avatarId);

  if (user.id === ADMIN_ID) {
    throw new Error("Admin account already exists. Please log in.");
  }

  const existing = db.prepare("SELECT id FROM users WHERE id = ?").get(user.id) as { id: string } | undefined;
  if (existing) {
    throw new Error("Account already exists. Please log in.");
  }

  const pw = hashPassword(password);
  db.prepare(
    `INSERT INTO users (
      id, name, is_admin, progress_chapter, progress_page, password_hash, password_salt, password_algo, avatar_id
    ) VALUES (?, ?, 0, 1, 1, ?, ?, ?, ?)`
  ).run(user.id, user.name.toUpperCase(), pw.hash, pw.salt, pw.algo, avatarId);

  return getUser(user.id)!;
}

export function verifyUserPassword(id: string, password: string): boolean {
  const db = getDb();
  ensureUserDataState(db);

  const cleanId = normalizeUserId(id);
  const cleanPassword = sanitizePassword(password);

  const row = db.prepare("SELECT password_hash, password_salt FROM users WHERE id = ?").get(cleanId) as
    | Pick<UserRow, "password_hash" | "password_salt">
    | undefined;

  if (!row) return false;
  return verifyPassword(cleanPassword, row.password_salt, row.password_hash);
}

export function authenticateUserAccount(input: { name: string; password: string }): UserProfile | null {
  const db = getDb();
  ensureUserDataState(db);

  const user = sanitizeUserName(input.name);
  const ok = verifyUserPassword(user.id, input.password);
  if (!ok) return null;

  return getUser(user.id);
}

export function deleteUser(id: string) {
  const db = getDb();
  ensureUserDataState(db);

  const cleanId = normalizeUserId(id);
  if (cleanId === ADMIN_ID) throw new Error("Admin cannot be deleted.");

  db.prepare("DELETE FROM users WHERE id = ?").run(cleanId);
}

export function setCurrentChapter(id: string, progress: UserProgress) {
  const db = getDb();
  ensureUserDataState(db);

  const cleanId = normalizeUserId(id);

  const chapter = Math.max(1, Math.min(11, Number(progress.chapter) || 1));
  const page = Math.max(1, Number(progress.page) || 1);

  const current = db
    .prepare("SELECT progress_chapter, progress_page FROM users WHERE id = ?")
    .get(cleanId) as { progress_chapter: number; progress_page: number } | undefined;

  if (!current) return;

  const currentChapter = Number(current.progress_chapter) || 1;
  const currentPage = Number(current.progress_page) || 1;

  const nextChapter = Math.max(currentChapter, chapter);
  const nextPage = chapter < currentChapter ? currentPage : page;

  db.prepare(`UPDATE users SET progress_chapter = ?, progress_page = ? WHERE id = ?`).run(
    nextChapter,
    nextPage,
    cleanId
  );
}
