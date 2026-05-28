import { getCollections, type HighscoreDocument } from "./db";
import type { GameId, ScoreEntry } from "@/lib/highscoresTypes";
import { isProfileAvatarId } from "@/lib/profileAvatars";

const NUMBERS_DIFFICULTY_WEIGHT: Record<string, number> = {
  ultrahard: 4,
  hard: 3,
  medium: 2,
  easy: 1,
};

const MAX_HIGHSCORE_TIME_MS = 21_600_000; // 6 hours
const MAX_HIGHSCORE_META_BYTES = 2048;
const MAX_HIGHSCORE_NAME_LENGTH = 64;
const MAX_HIGHSCORE_COUNTER = 1_000_000;
const MAX_HIGHSCORE_LEVEL = 1_000;
const MAX_HIGHSCORE_WORD_COUNT = 200;
const MAX_HIGHSCORE_ITEMS_PER_ROUND = 100;

const SCORE_RESULTS = ["win", "gameover"] as const;
const NUMBERS_DIFFICULTIES = ["easy", "medium", "hard", "ultrahard"] as const;
const WORDSEARCH_DIFFICULTIES = ["easy", "medium", "hard"] as const;
const WORD_MATCH_CATEGORIES = ["colors", "food", "places", "verbs", "greetings"] as const;
const CURRENCY_MODES = ["buyer", "cashier"] as const;
const CURRENCY_DIFFICULTIES = ["easy", "medium", "hard", "ultra"] as const;
const MAKAN_APA_DIFFICULTIES = ["easy", "hard"] as const;
const MISI_DIFFICULTIES = ["easy", "medium", "hard"] as const;
const MISI_THEME_IDS = ["buah-sayur", "daging-laut", "barangan-kering", "peti-sejuk"] as const;

export class HighscoreValidationError extends Error {
  constructor(message = "Invalid highscore payload") {
    super(message);
    this.name = "HighscoreValidationError";
  }
}

type IncomingScoreEntry = Omit<ScoreEntry, "id" | "dateISO"> & Partial<Pick<ScoreEntry, "id" | "dateISO">>;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function hasOnlyAllowedKeys(obj: Record<string, unknown>, allowed: readonly string[]) {
  return Object.keys(obj).every((key) => allowed.includes(key));
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function assertFiniteNumberInRange(value: unknown, min: number, max: number) {
  return isFiniteNumber(value) && value >= min && value <= max;
}

function assertIntegerInRange(value: unknown, min: number, max: number) {
  return Number.isInteger(value) && assertFiniteNumberInRange(value, min, max);
}

function assertEnum<T extends readonly string[]>(value: unknown, allowed: T): value is T[number] {
  return typeof value === "string" && allowed.includes(value as T[number]);
}

function assertSimpleMetaValues(meta: Record<string, unknown>) {
  for (const value of Object.values(meta)) {
    const primitive =
      value === null ||
      typeof value === "string" ||
      typeof value === "boolean" ||
      (typeof value === "number" && Number.isFinite(value));
    if (!primitive) return false;
  }
  return true;
}

function normalizeMetaForNumbers(meta: Record<string, unknown>) {
  const allowed = ["result", "difficulty", "level", "totalCorrect", "totalWrong", "attempts", "lives"] as const;
  if (!hasOnlyAllowedKeys(meta, allowed)) throw new HighscoreValidationError();

  if (!assertEnum(meta.result, SCORE_RESULTS)) throw new HighscoreValidationError();
  if (!assertEnum(meta.difficulty, NUMBERS_DIFFICULTIES)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.level, 1, MAX_HIGHSCORE_LEVEL)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.totalCorrect, 0, MAX_HIGHSCORE_COUNTER)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.totalWrong, 0, MAX_HIGHSCORE_COUNTER)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.attempts, 0, MAX_HIGHSCORE_COUNTER)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.lives, 0, 99)) throw new HighscoreValidationError();
  return meta;
}

function normalizeMetaForWordMatch(meta: Record<string, unknown>) {
  const allowed = ["result", "level", "category", "attempts", "matches", "mistakes", "lives"] as const;
  if (!hasOnlyAllowedKeys(meta, allowed)) throw new HighscoreValidationError();

  if (!assertEnum(meta.result, SCORE_RESULTS)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.level, 1, MAX_HIGHSCORE_LEVEL)) throw new HighscoreValidationError();
  if (!assertEnum(meta.category, WORD_MATCH_CATEGORIES)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.attempts, 0, MAX_HIGHSCORE_COUNTER)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.matches, 0, MAX_HIGHSCORE_COUNTER)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.mistakes, 0, MAX_HIGHSCORE_COUNTER)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.lives, 0, 99)) throw new HighscoreValidationError();
  return meta;
}

function normalizeMetaForWordsearch(meta: Record<string, unknown>) {
  const allowed = ["difficulty", "theme", "words"] as const;
  if (!hasOnlyAllowedKeys(meta, allowed)) throw new HighscoreValidationError();

  if (!assertEnum(meta.difficulty, WORDSEARCH_DIFFICULTIES)) throw new HighscoreValidationError();
  if (meta.theme !== "all" && !assertEnum(meta.theme, WORD_MATCH_CATEGORIES)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.words, 1, MAX_HIGHSCORE_WORD_COUNT)) throw new HighscoreValidationError();
  return meta;
}

function normalizeMetaForCurrency(meta: Record<string, unknown>) {
  const allowed = ["result", "mode", "difficulty", "attempts", "correct", "wrong", "lives"] as const;
  if (!hasOnlyAllowedKeys(meta, allowed)) throw new HighscoreValidationError();

  if (!assertEnum(meta.result, SCORE_RESULTS)) throw new HighscoreValidationError();
  if (!assertEnum(meta.mode, CURRENCY_MODES)) throw new HighscoreValidationError();
  if (!assertEnum(meta.difficulty, CURRENCY_DIFFICULTIES)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.attempts, 0, MAX_HIGHSCORE_COUNTER)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.correct, 0, MAX_HIGHSCORE_COUNTER)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.wrong, 0, MAX_HIGHSCORE_COUNTER)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.lives, 0, 99)) throw new HighscoreValidationError();
  return meta;
}

function normalizeMetaForMakanApa(meta: Record<string, unknown>) {
  const allowed = ["result", "difficulty", "attempts", "solvedCount", "submissions", "totalQuestions", "lives"] as const;
  if (!hasOnlyAllowedKeys(meta, allowed)) throw new HighscoreValidationError();

  if (!assertEnum(meta.result, SCORE_RESULTS)) throw new HighscoreValidationError();
  if (!assertEnum(meta.difficulty, MAKAN_APA_DIFFICULTIES)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.attempts, 0, MAX_HIGHSCORE_COUNTER)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.solvedCount, 0, MAX_HIGHSCORE_COUNTER)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.submissions, 0, MAX_HIGHSCORE_COUNTER)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.totalQuestions, 1, MAX_HIGHSCORE_COUNTER)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.lives, 0, 99)) throw new HighscoreValidationError();
  return meta;
}

function normalizeMetaForMisiMembeli(meta: Record<string, unknown>) {
  const allowed = [
    "difficulty",
    "sceneTopThemeId",
    "sceneBottomThemeId",
    "attempts",
    "correctRounds",
    "wrongRounds",
    "lives",
    "itemsPerRound",
  ] as const;
  if (!hasOnlyAllowedKeys(meta, allowed)) throw new HighscoreValidationError();

  if (!assertEnum(meta.difficulty, MISI_DIFFICULTIES)) throw new HighscoreValidationError();
  if (!assertEnum(meta.sceneTopThemeId, MISI_THEME_IDS)) throw new HighscoreValidationError();
  if (
    typeof meta.sceneBottomThemeId !== "undefined" &&
    !assertEnum(meta.sceneBottomThemeId, MISI_THEME_IDS)
  ) {
    throw new HighscoreValidationError();
  }
  if (!assertIntegerInRange(meta.attempts, 0, MAX_HIGHSCORE_COUNTER)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.correctRounds, 0, MAX_HIGHSCORE_COUNTER)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.wrongRounds, 0, MAX_HIGHSCORE_COUNTER)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.lives, 0, 99)) throw new HighscoreValidationError();
  if (!assertIntegerInRange(meta.itemsPerRound, 1, MAX_HIGHSCORE_ITEMS_PER_ROUND)) {
    throw new HighscoreValidationError();
  }
  return meta;
}

function normalizeHighscoreMeta(gameId: GameId, rawMeta: unknown): Record<string, unknown> | undefined {
  if (typeof rawMeta === "undefined") return undefined;
  if (!isPlainObject(rawMeta)) throw new HighscoreValidationError();
  if (!assertSimpleMetaValues(rawMeta)) throw new HighscoreValidationError();

  const normalized =
    gameId === "numbers"
      ? normalizeMetaForNumbers(rawMeta)
      : gameId === "word-match"
      ? normalizeMetaForWordMatch(rawMeta)
      : gameId === "wordsearch"
      ? normalizeMetaForWordsearch(rawMeta)
      : gameId === "currency"
      ? normalizeMetaForCurrency(rawMeta)
      : gameId === "makan-apa"
      ? normalizeMetaForMakanApa(rawMeta)
      : normalizeMetaForMisiMembeli(rawMeta);

  const serialized = JSON.stringify(normalized);
  if (!serialized || Buffer.byteLength(serialized, "utf8") > MAX_HIGHSCORE_META_BYTES) {
    throw new HighscoreValidationError();
  }

  return normalized;
}

export function normalizeIncomingHighscoreEntry(gameId: GameId, rawEntry: unknown): IncomingScoreEntry {
  if (!isPlainObject(rawEntry)) throw new HighscoreValidationError();

  const allowedEntryKeys = ["id", "dateISO", "name", "avatarId", "accuracy", "timeMs", "meta"] as const;
  if (!hasOnlyAllowedKeys(rawEntry, allowedEntryKeys)) throw new HighscoreValidationError();

  if (typeof rawEntry.name !== "string") throw new HighscoreValidationError();
  const cleanName = rawEntry.name.trim();
  if (!cleanName || cleanName.length > MAX_HIGHSCORE_NAME_LENGTH) throw new HighscoreValidationError();

  const accuracy = rawEntry.accuracy;
  const timeMs = rawEntry.timeMs;
  if (typeof accuracy !== "number" || !assertFiniteNumberInRange(accuracy, 0, 100)) {
    throw new HighscoreValidationError();
  }
  if (typeof timeMs !== "number" || !assertIntegerInRange(timeMs, 0, MAX_HIGHSCORE_TIME_MS)) {
    throw new HighscoreValidationError();
  }

  const cleanAvatarId =
    typeof rawEntry.avatarId === "string" && isProfileAvatarId(rawEntry.avatarId) ? rawEntry.avatarId : undefined;
  const cleanMeta = normalizeHighscoreMeta(gameId, rawEntry.meta);

  return {
    name: cleanName,
    avatarId: cleanAvatarId,
    accuracy,
    timeMs,
    meta: cleanMeta,
  };
}

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
    "makan-apa": [],
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
  const safeEntry = normalizeIncomingHighscoreEntry(gameId, entry);

  const full: ScoreEntry = {
    id: entry.id ?? crypto.randomUUID(),
    dateISO: entry.dateISO ?? new Date().toISOString(),
    name: safeEntry.name,
    avatarId: safeEntry.avatarId,
    accuracy: safeEntry.accuracy,
    timeMs: safeEntry.timeMs,
    meta: safeEntry.meta,
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
