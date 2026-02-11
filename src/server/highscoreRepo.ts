import { getDb } from "./db";
import type { GameId, ScoreEntry } from "@/lib/highscoresTypes";
import { isProfileAvatarId } from "@/lib/profileAvatars";

type HighscoreRow = {
  id: string;
  game_id: string;
  name: string;
  accuracy: number;
  time_ms: number;
  date_iso: string;
  meta_json?: string | null;
  avatar_id?: string | null;
};

function rowToEntry(row: HighscoreRow): ScoreEntry {
  return {
    id: row.id,
    name: row.name,
    avatarId: row.avatar_id && isProfileAvatarId(row.avatar_id) ? row.avatar_id : undefined,
    accuracy: Number(row.accuracy),
    timeMs: Number(row.time_ms),
    dateISO: row.date_iso,
    meta: row.meta_json ? JSON.parse(row.meta_json) : undefined,
  };
}

export function listHighScores(): Record<GameId, ScoreEntry[]> {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM highscores ORDER BY game_id ASC, accuracy DESC, time_ms ASC, date_iso DESC")
    .all() as HighscoreRow[];

  const store: Record<GameId, ScoreEntry[]> = {
    numbers: [],
    "word-match": [],
    wordsearch: [],
    currency: [],
    "misi-membeli": [],
  };

  for (const r of rows) {
    if (store[r.game_id as GameId]) store[r.game_id as GameId].push(rowToEntry(r));
  }

  return store;
}

export function addHighScore(gameId: GameId, entry: Omit<ScoreEntry, "id" | "dateISO"> & Partial<Pick<ScoreEntry, "id" | "dateISO">>) {
  const db = getDb();

  const full: ScoreEntry = {
    id: entry.id ?? crypto.randomUUID(),
    dateISO: entry.dateISO ?? new Date().toISOString(),
    name: entry.name,
    avatarId: entry.avatarId && isProfileAvatarId(entry.avatarId) ? entry.avatarId : undefined,
    accuracy: Math.max(0, Math.min(100, entry.accuracy)),
    timeMs: Math.max(0, entry.timeMs),
    meta: entry.meta,
  };

  db.prepare(
    `INSERT INTO highscores (id, game_id, name, avatar_id, accuracy, time_ms, date_iso, meta_json)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    full.id,
    gameId,
    full.name,
    full.avatarId ?? null,
    full.accuracy,
    full.timeMs,
    full.dateISO,
    full.meta ? JSON.stringify(full.meta) : null
  );

  trimTop(gameId, 20);
}

export function clearHighScores(gameId?: GameId) {
  const db = getDb();
  if (!gameId) {
    db.prepare("DELETE FROM highscores").run();
    return;
  }
  db.prepare("DELETE FROM highscores WHERE game_id = ?").run(gameId);
}

function trimTop(gameId: GameId, max: number) {
  const db = getDb();
  db.prepare(
    `DELETE FROM highscores WHERE id IN (
      SELECT id FROM highscores
      WHERE game_id = ?
      ORDER BY accuracy DESC, time_ms ASC, date_iso DESC
      LIMIT -1 OFFSET ?
    )`
  ).run(gameId, max);
}
