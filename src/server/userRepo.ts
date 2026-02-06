import { getDb } from "./db";
import { ADMIN_ID, type UserProfile, type UserProgress } from "@/lib/userStoreTypes";

type UserRow = {
  id: string;
  name: string;
  is_admin: number;
  progress_chapter: number;
  progress_page: number;
};

function toProfile(row: UserRow): UserProfile {
  return {
    id: row.id,
    name: row.name,
    isAdmin: Boolean(row.is_admin),
    progress: {
      chapter: Number(row.progress_chapter) || 1,
      page: Number(row.progress_page) || 1,
    },
  };
}

function ensureAdmin(db = getDb()) {
  const exists = db.prepare("SELECT 1 FROM users WHERE id = ?").get(ADMIN_ID);
  if (exists) return;
  db.prepare(
    `INSERT INTO users (id, name, is_admin, progress_chapter, progress_page)
     VALUES (?, ?, 1, 11, 1)`
  ).run(ADMIN_ID, ADMIN_ID);
}

export function listUsers(): UserProfile[] {
  const db = getDb();
  ensureAdmin(db);
  const rows = db.prepare("SELECT * FROM users ORDER BY name ASC").all() as UserRow[];
  return rows.map(toProfile);
}

export function getUser(id: string): UserProfile | null {
  try {
    const db = getDb();
    ensureAdmin(db);
    const row = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as UserRow | undefined;
    return row ? toProfile(row) : null;
  } catch (e) {
    console.error("getUser failed", e);
    return null;
  }
}

export function upsertUser(profile: { id: string; name: string; isAdmin?: boolean }): UserProfile {
  const db = getDb();
  const cleanId = profile.id.trim().toUpperCase();
  const name = profile.name.trim();
  if (!cleanId || !name) throw new Error("Name is required");

  const existing = getUser(cleanId);
  if (existing) return existing;

  const isAdmin = profile.isAdmin === true || cleanId === ADMIN_ID;

  db.prepare(
    `INSERT INTO users (id, name, is_admin, progress_chapter, progress_page)
     VALUES (?, ?, ?, 1, 1)`
  ).run(cleanId, name.toUpperCase(), isAdmin ? 1 : 0);

  return getUser(cleanId)!;
}

export function deleteUser(id: string) {
  const db = getDb();
  db.prepare("DELETE FROM users WHERE id = ?").run(id);
}

export function setCurrentChapter(id: string, progress: UserProgress) {
  const db = getDb();
  db.prepare(
    `UPDATE users SET progress_chapter = ?, progress_page = ? WHERE id = ?`
  ).run(progress.chapter, progress.page, id);
}
