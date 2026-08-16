import { sortHighscoreRows } from "../lib/highscoreRanking.ts";
import type { GameId, HighscoreRun, HighscoreSaveResult, ScoreEntry } from "../lib/highscoresTypes.ts";
import { isProfileAvatarId } from "../lib/profileAvatars.ts";
import { getCollections, type HighscoreDocument } from "./db.ts";

const MAX_TIME_MS = 21_600_000;
const MAX_COUNTER = 1_000_000;
const MAX_META_BYTES = 2048;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const FIXED_GAMES = new Set<GameId>(["numbers", "word-match", "wordsearch", "currency", "makan-apa"]);
const SURVIVAL_GAMES = new Set<GameId>(["misi-membeli", "arah-jalan"]);
const DIFFICULTIES: Record<string, readonly string[]> = {
  numbers: ["easy", "medium", "hard", "ultrahard"],
  wordsearch: ["easy", "medium", "hard"],
  currency: ["easy", "medium", "hard", "ultra"],
  "makan-apa": ["easy", "hard"],
  "misi-membeli": ["easy", "medium", "hard"],
  "arah-jalan": ["easy", "hard"],
};
const WORDSEARCH_THEMES = ["all", "colors", "food", "places", "verbs", "greetings"];

export class HighscoreValidationError extends Error {
  constructor(message = "Invalid highscore payload") {
    super(message);
    this.name = "HighscoreValidationError";
  }
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value) &&
  (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
const finite = (value: unknown, min: number, max: number) =>
  typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;
const integer = (value: unknown, min: number, max: number) => Number.isInteger(value) && finite(value, min, max);
const enumValue = (value: unknown, allowed: readonly string[]) => typeof value === "string" && allowed.includes(value);

function allowedKeys(value: Record<string, unknown>, allowed: readonly string[]) {
  return Object.keys(value).every((key) => allowed.includes(key));
}

function simpleMeta(value: unknown): value is Record<string, string | number | boolean | null> {
  if (!isObject(value)) return false;
  return Object.values(value).every(
    (item) => item === null || typeof item === "string" || typeof item === "boolean" || (typeof item === "number" && Number.isFinite(item)),
  );
}

function validateSettings(gameId: GameId, run: HighscoreRun) {
  if (gameId !== "word-match" && !enumValue(run.difficulty, DIFFICULTIES[gameId] ?? [])) {
    throw new HighscoreValidationError();
  }
  if (gameId === "word-match" && !enumValue(run.targetLanguage, ["en", "es"])) {
    throw new HighscoreValidationError();
  }
  if (gameId === "wordsearch" && !enumValue(run.theme, WORDSEARCH_THEMES)) {
    throw new HighscoreValidationError();
  }
  if (gameId === "currency" && !enumValue(run.mode, ["buyer", "cashier"])) {
    throw new HighscoreValidationError();
  }
}

export function normalizeIncomingHighscoreRun(gameId: GameId, value: unknown): HighscoreRun {
  if (!isObject(value)) throw new HighscoreValidationError();
  const allowed = [
    "runId",
    "outcome",
    "accuracy",
    "timeMs",
    "attempts",
    "correct",
    "mistakes",
    "hints",
    "difficulty",
    "mode",
    "targetLanguage",
    "theme",
    "score",
    "averageCorrectResponseTimeMs",
    "meta",
  ];
  if (!allowedKeys(value, allowed)) throw new HighscoreValidationError();
  if (typeof value.runId !== "string" || !UUID_RE.test(value.runId)) throw new HighscoreValidationError();
  if (!enumValue(value.outcome, ["completed", "failed", "abandoned"])) throw new HighscoreValidationError();
  if (!finite(value.accuracy, 0, 100) || !integer(value.timeMs, 0, MAX_TIME_MS)) {
    throw new HighscoreValidationError();
  }
  if (
    !integer(value.attempts, 0, MAX_COUNTER) ||
    !integer(value.correct, 0, MAX_COUNTER) ||
    !integer(value.mistakes, 0, MAX_COUNTER) ||
    !integer(value.hints, 0, MAX_COUNTER)
  ) {
    throw new HighscoreValidationError();
  }
  const attempts = value.attempts as number;
  const correct = value.correct as number;
  const mistakes = value.mistakes as number;
  if (correct > attempts || mistakes > attempts) throw new HighscoreValidationError();
  if (typeof value.meta !== "undefined") {
    if (!simpleMeta(value.meta) || Buffer.byteLength(JSON.stringify(value.meta), "utf8") > MAX_META_BYTES) {
      throw new HighscoreValidationError();
    }
  }

  const run = value as unknown as HighscoreRun;
  validateSettings(gameId, run);
  if (SURVIVAL_GAMES.has(gameId)) {
    if (!integer(run.score, 0, MAX_COUNTER)) throw new HighscoreValidationError();
    if (
      typeof run.averageCorrectResponseTimeMs !== "undefined" &&
      !integer(run.averageCorrectResponseTimeMs, 0, MAX_TIME_MS)
    ) {
      throw new HighscoreValidationError();
    }
    if ((run.score ?? 0) > 0 && !integer(run.averageCorrectResponseTimeMs, 0, MAX_TIME_MS)) {
      throw new HighscoreValidationError();
    }
  } else if (
    FIXED_GAMES.has(gameId) &&
    (typeof run.score !== "undefined" || typeof run.averageCorrectResponseTimeMs !== "undefined")
  ) {
    throw new HighscoreValidationError();
  }
  return run;
}

function rowToEntry(row: HighscoreDocument): ScoreEntry {
  const meta = row.meta_json ? (JSON.parse(row.meta_json) as Record<string, unknown>) : undefined;
  const rawScore = (row as HighscoreDocument & { score?: unknown }).score;
  return {
    id: row.id,
    userId: row.user_id ?? undefined,
    name: row.name,
    avatarId: row.avatar_id && isProfileAvatarId(row.avatar_id) ? row.avatar_id : undefined,
    score: typeof rawScore === "number" && Number.isFinite(rawScore) ? rawScore : undefined,
    accuracy: Number(row.accuracy),
    timeMs: Number(row.time_ms),
    dateISO: row.date_iso,
    meta,
    outcome:
      row.outcome === "completed" || row.outcome === "failed" || row.outcome === "abandoned"
        ? row.outcome
        : undefined,
    attempts: row.attempts ?? undefined,
    correct: row.correct ?? undefined,
    mistakes: row.mistakes ?? undefined,
    hints: row.hints ?? undefined,
    difficulty: row.difficulty ?? undefined,
    mode: row.mode ?? undefined,
    targetLanguage: row.target_language === "en" || row.target_language === "es" ? row.target_language : undefined,
    theme: row.theme ?? undefined,
    averageCorrectResponseTimeMs: row.average_correct_response_time_ms ?? undefined,
  };
}

function difficultyWeight(gameId: GameId, difficulty: string | undefined) {
  if (!difficulty) return 0;
  return (DIFFICULTIES[gameId]?.indexOf(difficulty) ?? -1) + 1;
}

export async function listHighScores(
  options: { leaderboardLimitPerGame?: number } = {},
): Promise<Record<GameId, ScoreEntry[]>> {
  const { highscores } = await getCollections();
  const rows = await highscores.find({}).toArray();
  const store: Record<GameId, ScoreEntry[]> = {
    numbers: [],
    "word-match": [],
    wordsearch: [],
    currency: [],
    "makan-apa": [],
    "misi-membeli": [],
    "arah-jalan": [],
  };
  for (const row of rows) {
    if (row.game_id in store) store[row.game_id as GameId].push(rowToEntry(row));
  }
  for (const gameId of Object.keys(store) as GameId[]) {
    const sorted = sortHighscoreRows(gameId, store[gameId]);
    store[gameId] = options.leaderboardLimitPerGame
      ? sorted.slice(0, options.leaderboardLimitPerGame)
      : sorted;
  }
  return store;
}

export async function addHighScore(
  gameId: GameId,
  run: HighscoreRun,
  user: { id: string; name: string; avatarId?: string | null },
): Promise<HighscoreSaveResult> {
  const safe = normalizeIncomingHighscoreRun(gameId, run);
  const { highscores } = await getCollections();
  const existing = await highscores.findOne({ id: safe.runId });
  if (existing) {
    if (existing.user_id && existing.user_id !== user.id) throw new HighscoreValidationError();
    return { ok: true, saved: false, duplicate: true };
  }

  const dateISO = new Date().toISOString();
  const doc: HighscoreDocument & { score?: number | null } = {
    id: safe.runId,
    game_id: gameId,
    name: user.name,
    avatar_id: typeof user.avatarId === "string" && isProfileAvatarId(user.avatarId) ? user.avatarId : null,
    user_id: user.id,
    outcome: safe.outcome,
    score: safe.score ?? null,
    accuracy: safe.accuracy,
    time_ms: safe.timeMs,
    attempts: safe.attempts,
    correct: safe.correct,
    mistakes: safe.mistakes,
    hints: safe.hints,
    difficulty: safe.difficulty ?? null,
    mode: safe.mode ?? null,
    target_language: safe.targetLanguage ?? null,
    theme: safe.theme ?? null,
    average_correct_response_time_ms: safe.averageCorrectResponseTimeMs ?? null,
    date_iso: dateISO,
    meta_json: safe.meta ? JSON.stringify(safe.meta) : null,
    difficulty_weight: difficultyWeight(gameId, safe.difficulty),
    created_at: dateISO,
  };
  await highscores.insertOne(doc);
  return { ok: true, saved: true, duplicate: false };
}

export async function clearHighScores(gameId?: GameId) {
  const { highscores } = await getCollections();
  await highscores.deleteMany(gameId ? { game_id: gameId } : {});
}
