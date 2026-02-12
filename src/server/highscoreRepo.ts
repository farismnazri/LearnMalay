import { getCollections, type HighscoreDocument } from "./db";
import type { GameId, ScoreEntry } from "@/lib/highscoresTypes";
import { isProfileAvatarId } from "@/lib/profileAvatars";

const NUMBERS_DIFFICULTY_WEIGHT: Record<string, number> = {
  ultrahard: 4,
  hard: 3,
  medium: 2,
  easy: 1,
};

function difficultyWeightFor(gameId: GameId, meta: ScoreEntry["meta"]): number {
  if (gameId !== "numbers") return 0;

  const raw = meta && typeof meta === "object" ? meta.difficulty : undefined;
  if (typeof raw !== "string") return 0;

  return NUMBERS_DIFFICULTY_WEIGHT[raw.toLowerCase()] ?? 0;
}

function rowToEntry(row: HighscoreDocument): ScoreEntry {
  return {
    id: row.id,
    name: row.name,
    avatarId: row.avatar_id && isProfileAvatarId(row.avatar_id) ? row.avatar_id : undefined,
    accuracy: Number(row.accuracy),
    timeMs: Number(row.time_ms),
    dateISO: row.date_iso,
    meta: row.meta_json ? (JSON.parse(row.meta_json) as Record<string, unknown>) : undefined,
  };
}

function sortSpec() {
  return {
    game_id: 1 as const,
    difficulty_weight: -1 as const,
    accuracy: -1 as const,
    time_ms: 1 as const,
    date_iso: -1 as const,
  };
}

export async function listHighScores(): Promise<Record<GameId, ScoreEntry[]>> {
  const { highscores } = await getCollections();
  const rows = await highscores.find({}, { sort: sortSpec() }).toArray();

  const store: Record<GameId, ScoreEntry[]> = {
    numbers: [],
    "word-match": [],
    wordsearch: [],
    currency: [],
    "misi-membeli": [],
  };

  for (const r of rows) {
    if (store[r.game_id as GameId]) {
      store[r.game_id as GameId].push(rowToEntry(r));
    }
  }

  return store;
}

export async function addHighScore(
  gameId: GameId,
  entry: Omit<ScoreEntry, "id" | "dateISO"> & Partial<Pick<ScoreEntry, "id" | "dateISO">>
): Promise<void> {
  const { highscores } = await getCollections();

  const full: ScoreEntry = {
    id: entry.id ?? crypto.randomUUID(),
    dateISO: entry.dateISO ?? new Date().toISOString(),
    name: entry.name,
    avatarId: entry.avatarId && isProfileAvatarId(entry.avatarId) ? entry.avatarId : undefined,
    accuracy: Math.max(0, Math.min(100, entry.accuracy)),
    timeMs: Math.max(0, entry.timeMs),
    meta: entry.meta,
  };

  await highscores.insertOne({
    id: full.id,
    game_id: gameId,
    name: full.name,
    avatar_id: full.avatarId ?? null,
    accuracy: full.accuracy,
    time_ms: full.timeMs,
    date_iso: full.dateISO,
    meta_json: full.meta ? JSON.stringify(full.meta) : null,
    difficulty_weight: difficultyWeightFor(gameId, full.meta),
    created_at: new Date().toISOString(),
  });

  await trimTop(gameId, 20);
}

export async function clearHighScores(gameId?: GameId): Promise<void> {
  const { highscores } = await getCollections();

  if (!gameId) {
    await highscores.deleteMany({});
    return;
  }

  await highscores.deleteMany({ game_id: gameId });
}

async function trimTop(gameId: GameId, max: number): Promise<void> {
  const { highscores } = await getCollections();

  const rowsToDelete = await highscores
    .find({ game_id: gameId }, { projection: { id: 1 }, sort: sortSpec(), skip: max })
    .toArray();

  if (rowsToDelete.length === 0) return;

  await highscores.deleteMany({
    id: {
      $in: rowsToDelete.map((row) => row.id),
    },
  });
}
