import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DEFAULT_DB_PATH = path.join(process.cwd(), "var", "learn-malay.db");

function resolveDbPath() {
  return process.env.LEARN_MALAY_DB_PATH || DEFAULT_DB_PATH;
}

let db: Database.Database | null = null;

function ensureDir(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function hasColumn(instance: Database.Database, table: string, column: string) {
  const rows = instance.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>;
  return rows.some((r) => r.name === column);
}

function addColumnIfMissing(
  instance: Database.Database,
  table: string,
  column: string,
  definition: string
) {
  if (hasColumn(instance, table, column)) return;
  instance.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
}

function migrate(instance: Database.Database) {
  instance.exec(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      avatar_id TEXT,
      is_admin INTEGER NOT NULL DEFAULT 0,
      progress_chapter INTEGER NOT NULL DEFAULT 1,
      progress_page INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_users_name ON users(name);

    CREATE TABLE IF NOT EXISTS app_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS highscores (
      id TEXT PRIMARY KEY,
      game_id TEXT NOT NULL,
      name TEXT NOT NULL,
      avatar_id TEXT,
      accuracy REAL NOT NULL,
      time_ms INTEGER NOT NULL,
      date_iso TEXT NOT NULL,
      meta_json TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_highscores_game ON highscores(game_id);
    CREATE INDEX IF NOT EXISTS idx_highscores_sort ON highscores(game_id, accuracy DESC, time_ms ASC, date_iso DESC);
  `);

  addColumnIfMissing(instance, "users", "password_hash", "TEXT");
  addColumnIfMissing(instance, "users", "password_salt", "TEXT");
  addColumnIfMissing(instance, "users", "password_algo", "TEXT");
  addColumnIfMissing(instance, "users", "avatar_id", "TEXT");
  addColumnIfMissing(instance, "highscores", "avatar_id", "TEXT");
}

export function getDb() {
  if (db) return db;

  const dbPath = resolveDbPath();
  ensureDir(dbPath);

  db = new Database(dbPath);
  migrate(db);

  return db;
}

export function resetDbForTests() {
  // Helper for tests/dev only. Not used in runtime but handy if needed.
  const dbPath = resolveDbPath();
  if (fs.existsSync(dbPath)) fs.rmSync(dbPath);
  db = null;
}
