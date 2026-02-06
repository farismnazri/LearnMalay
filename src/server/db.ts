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

function migrate(instance: Database.Database) {
  instance.exec(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      is_admin INTEGER NOT NULL DEFAULT 0,
      progress_chapter INTEGER NOT NULL DEFAULT 1,
      progress_page INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_users_name ON users(name);

    CREATE TABLE IF NOT EXISTS highscores (
      id TEXT PRIMARY KEY,
      game_id TEXT NOT NULL,
      name TEXT NOT NULL,
      accuracy REAL NOT NULL,
      time_ms INTEGER NOT NULL,
      date_iso TEXT NOT NULL,
      meta_json TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_highscores_game ON highscores(game_id);
    CREATE INDEX IF NOT EXISTS idx_highscores_sort ON highscores(game_id, accuracy DESC, time_ms ASC, date_iso DESC);
  `);
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
