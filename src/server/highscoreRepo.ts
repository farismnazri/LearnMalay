import { getCollections, type HighscoreDocument } from "./db.ts";
import { compareHighscoreRows, leaderboardPartitionKey } from "../lib/highscoreRanking.ts";
import type { GameId, HighscoreSaveResult, RunResultV2, ScoreEntry } from "../lib/highscoresTypes.ts";
import { isProfileAvatarId } from "../lib/profileAvatars.ts";

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
  constructor(message = "Invalid highscore payload") { super(message); this.name = "HighscoreValidationError"; }
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value) && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
const finite = (value: unknown, min: number, max: number) => typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;
const integer = (value: unknown, min: number, max: number) => Number.isInteger(value) && finite(value, min, max);
const enumValue = (value: unknown, allowed: readonly string[]) => typeof value === "string" && allowed.includes(value);
function allowedKeys(value: Record<string, unknown>, allowed: readonly string[]) { return Object.keys(value).every((key) => allowed.includes(key)); }
function simpleMeta(value: unknown): value is Record<string, string | number | boolean | null> {
  if (!isObject(value)) return false;
  return Object.values(value).every((v) => v === null || typeof v === "string" || typeof v === "boolean" || (typeof v === "number" && Number.isFinite(v)));
}

function validateSettings(gameId: GameId, run: RunResultV2) {
  if (gameId !== "word-match" && !enumValue(run.difficulty, DIFFICULTIES[gameId] ?? [])) throw new HighscoreValidationError();
  if (gameId === "word-match" && !enumValue(run.targetLanguage, ["en", "es"])) throw new HighscoreValidationError();
  if (gameId === "wordsearch" && !enumValue(run.theme, WORDSEARCH_THEMES)) throw new HighscoreValidationError();
  if (gameId === "currency" && !enumValue(run.mode, ["buyer", "cashier"])) throw new HighscoreValidationError();
}

export function normalizeIncomingHighscoreRun(gameId: GameId, value: unknown): RunResultV2 {
  if (!isObject(value)) throw new HighscoreValidationError();
  const allowed = ["runId", "scoreVersion", "outcome", "competitive", "accuracy", "timeMs", "attempts", "correct", "mistakes", "hints", "difficulty", "mode", "targetLanguage", "theme", "score", "averageCorrectResponseTimeMs", "meta"];
  if (!allowedKeys(value, allowed)) throw new HighscoreValidationError();
  if (typeof value.runId !== "string" || !UUID_RE.test(value.runId)) throw new HighscoreValidationError();
  if (value.scoreVersion !== 2 || !enumValue(value.outcome, ["completed", "failed", "abandoned"]) || typeof value.competitive !== "boolean") throw new HighscoreValidationError();
  if (!finite(value.accuracy, 0, 100) || !integer(value.timeMs, 0, MAX_TIME_MS)) throw new HighscoreValidationError();
  if (!integer(value.attempts, 0, MAX_COUNTER) || !integer(value.correct, 0, MAX_COUNTER) || !integer(value.mistakes, 0, MAX_COUNTER) || !integer(value.hints, 0, MAX_COUNTER)) throw new HighscoreValidationError();
  const attempts = value.attempts as number;
  const correct = value.correct as number;
  const mistakes = value.mistakes as number;
  if (correct > attempts || mistakes > attempts) throw new HighscoreValidationError();
  if (typeof value.meta !== "undefined") {
    if (!simpleMeta(value.meta) || Buffer.byteLength(JSON.stringify(value.meta), "utf8") > MAX_META_BYTES) throw new HighscoreValidationError();
  }
  const run = value as unknown as RunResultV2;
  validateSettings(gameId, run);
  const expectedCompetitive = FIXED_GAMES.has(gameId)
    ? run.outcome === "completed"
    : SURVIVAL_GAMES.has(gameId) && run.outcome === "failed" && run.correct > 0 && integer(run.score, 1, MAX_COUNTER);
  if (run.competitive !== expectedCompetitive) throw new HighscoreValidationError();
  if (SURVIVAL_GAMES.has(gameId)) {
    if (run.competitive && (!integer(run.score, 1, MAX_COUNTER) || !integer(run.averageCorrectResponseTimeMs, 0, MAX_TIME_MS))) throw new HighscoreValidationError();
  } else if (typeof run.score !== "undefined" || typeof run.averageCorrectResponseTimeMs !== "undefined") {
    throw new HighscoreValidationError();
  }
  return run;
}

function rowToEntry(row: HighscoreDocument): ScoreEntry {
  const meta = row.meta_json ? JSON.parse(row.meta_json) as Record<string, unknown> : undefined;
  return {
    id: row.id, runId: row.score_version === 2 ? row.id : undefined, scoreVersion: row.score_version === 2 ? 2 : undefined,
    userId: row.user_id ?? undefined, name: row.name, avatarId: row.avatar_id && isProfileAvatarId(row.avatar_id) ? row.avatar_id : undefined,
    score: typeof (row as HighscoreDocument & { score?: unknown }).score === "number" ? (row as HighscoreDocument & { score: number }).score : undefined,
    accuracy: Number(row.accuracy), timeMs: Number(row.time_ms), dateISO: row.date_iso, meta,
    outcome: row.outcome === "completed" || row.outcome === "failed" || row.outcome === "abandoned" ? row.outcome : undefined,
    competitive: row.competitive === true, attempts: row.attempts ?? undefined, correct: row.correct ?? undefined,
    mistakes: row.mistakes ?? undefined, hints: row.hints ?? undefined, difficulty: row.difficulty ?? undefined,
    mode: row.mode ?? undefined, targetLanguage: row.target_language === "en" || row.target_language === "es" ? row.target_language : undefined,
    theme: row.theme ?? undefined, averageCorrectResponseTimeMs: row.average_correct_response_time_ms ?? undefined,
  };
}

export async function listHighScores(options: { leaderboardLimitPerPartition?: number } = {}): Promise<Record<GameId, ScoreEntry[]>> {
  const { highscores } = await getCollections();
  const rows = await highscores.find({}).toArray();
  const store: Record<GameId, ScoreEntry[]> = { numbers: [], "word-match": [], wordsearch: [], currency: [], "makan-apa": [], "misi-membeli": [], "arah-jalan": [] };
  for (const row of rows) if (row.game_id in store) store[row.game_id as GameId].push(rowToEntry(row));
  for (const gameId of Object.keys(store) as GameId[]) {
    const competitive = store[gameId].filter((entry) => entry.scoreVersion === 2 && entry.competitive);
    const history = store[gameId].filter((entry) => !(entry.scoreVersion === 2 && entry.competitive));
    competitive.sort((a, b) => compareHighscoreRows(gameId, a, b));
    history.sort((a, b) => b.dateISO.localeCompare(a.dateISO));
    if (options.leaderboardLimitPerPartition) {
      const limit = options.leaderboardLimitPerPartition;
      const retained = new Map<string, number>();
      store[gameId] = competitive.filter((entry) => {
        const partition = leaderboardPartitionKey(gameId, entry);
        const count = retained.get(partition) ?? 0;
        retained.set(partition, count + 1);
        return count < limit;
      });
    } else {
      store[gameId] = competitive;
    }
    store[gameId].push(...history);
  }
  return store;
}

export async function addHighScore(gameId: GameId, run: RunResultV2, user: { id: string; name: string; avatarId?: string }): Promise<HighscoreSaveResult> {
  const safe = normalizeIncomingHighscoreRun(gameId, run);
  const { highscores } = await getCollections();
  const existing = await highscores.findOne({ id: safe.runId });
  if (existing) {
    if (existing.user_id && existing.user_id !== user.id) throw new HighscoreValidationError();
    return { ok: true, saved: false, duplicate: true, competitive: existing.competitive === true, reason: "duplicate" };
  }
  const entry: ScoreEntry = {
    id: safe.runId, runId: safe.runId, scoreVersion: 2, userId: user.id, name: user.name, avatarId: user.avatarId as ScoreEntry["avatarId"],
    score: safe.score, accuracy: safe.accuracy, timeMs: safe.timeMs, dateISO: new Date().toISOString(), meta: safe.meta,
    outcome: safe.outcome, competitive: safe.competitive, attempts: safe.attempts, correct: safe.correct, mistakes: safe.mistakes,
    hints: safe.hints, difficulty: safe.difficulty, mode: safe.mode, targetLanguage: safe.targetLanguage, theme: safe.theme,
    averageCorrectResponseTimeMs: safe.averageCorrectResponseTimeMs,
  };
  const doc: HighscoreDocument & { score?: number | null } = {
    id: entry.id, game_id: gameId, name: entry.name, avatar_id: entry.avatarId ?? null, user_id: user.id, score_version: 2,
    competitive: entry.competitive, outcome: entry.outcome, partition_key: leaderboardPartitionKey(gameId, entry),
    score: entry.score ?? null, accuracy: entry.accuracy, time_ms: entry.timeMs, attempts: entry.attempts, correct: entry.correct,
    mistakes: entry.mistakes, hints: entry.hints, difficulty: entry.difficulty ?? null, mode: entry.mode ?? null,
    target_language: entry.targetLanguage ?? null, theme: entry.theme ?? null, average_correct_response_time_ms: entry.averageCorrectResponseTimeMs ?? null,
    date_iso: entry.dateISO, meta_json: entry.meta ? JSON.stringify(entry.meta) : null, difficulty_weight: 0, created_at: entry.dateISO,
  };
  await highscores.insertOne(doc);
  return { ok: true, saved: true, duplicate: false, competitive: Boolean(entry.competitive), reason: entry.competitive ? "saved" : "history" };
}

export async function clearHighScores(gameId?: GameId) {
  const { highscores } = await getCollections();
  await highscores.deleteMany(gameId ? { game_id: gameId } : {});
}
