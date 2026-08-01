import type { GameId, ScoreEntry } from "./highscoresTypes.ts";

export type ArahJalanDifficulty = "easy" | "hard";
export type ArahJalanDifficultyFilter = "__ALL_DIFFICULTIES__" | ArahJalanDifficulty | "unknown";
export type HighscoreColumnKey =
  | "rank"
  | "username"
  | "accuracy"
  | "time"
  | "difficulty"
  | "attempts"
  | "date"
  | "streak"
  | "theme"
  | "words"
  | "mode";

export type HighscoreColumnDefinition = {
  key: HighscoreColumnKey;
  label: string;
  optional?: boolean;
};

export type HighscoreGameConfiguration = {
  columns: readonly HighscoreColumnDefinition[];
  scoringDescription: string;
};

const RANK = { key: "rank", label: "Rank" } as const;
const USERNAME = { key: "username", label: "Username" } as const;
const ACCURACY = { key: "accuracy", label: "Accuracy" } as const;
const TIME = { key: "time", label: "Time" } as const;
const DIFFICULTY = { key: "difficulty", label: "Difficulty" } as const;
const OPTIONAL_DIFFICULTY = { ...DIFFICULTY, optional: true } as const;
const ATTEMPTS = { key: "attempts", label: "Attempts" } as const;
const OPTIONAL_ATTEMPTS = { ...ATTEMPTS, optional: true } as const;
const DATE = { key: "date", label: "Date" } as const;

export const HIGHSCORE_GAME_CONFIG: Record<GameId, HighscoreGameConfiguration> = {
  numbers: {
    columns: [RANK, USERNAME, ACCURACY, TIME, DIFFICULTY, OPTIONAL_ATTEMPTS, DATE],
    scoringDescription: "Accuracy (higher), time (lower), difficulty (higher), attempts (lower), then newest.",
  },
  "word-match": {
    columns: [RANK, USERNAME, ACCURACY, TIME, ATTEMPTS, DATE],
    scoringDescription: "Accuracy (higher), time (lower), attempts (lower), then newest.",
  },
  wordsearch: {
    columns: [
      RANK,
      USERNAME,
      ACCURACY,
      TIME,
      OPTIONAL_DIFFICULTY,
      { key: "theme", label: "Theme", optional: true },
      { key: "words", label: "Words", optional: true },
      DATE,
    ],
    scoringDescription: "Accuracy (higher), time (lower), difficulty (higher), then newest.",
  },
  currency: {
    columns: [
      RANK,
      USERNAME,
      ACCURACY,
      TIME,
      OPTIONAL_DIFFICULTY,
      { key: "mode", label: "Mode", optional: true },
      OPTIONAL_ATTEMPTS,
      DATE,
    ],
    scoringDescription: "Accuracy (higher), time (lower), difficulty (higher), attempts (lower), then newest.",
  },
  "makan-apa": {
    columns: [RANK, USERNAME, ACCURACY, TIME, OPTIONAL_DIFFICULTY, OPTIONAL_ATTEMPTS, DATE],
    scoringDescription: "Accuracy (higher), time (lower), difficulty (higher), attempts (lower), then newest.",
  },
  "misi-membeli": {
    columns: [RANK, USERNAME, ACCURACY, TIME, OPTIONAL_DIFFICULTY, OPTIONAL_ATTEMPTS, DATE],
    scoringDescription: "Accuracy (higher), time (lower), difficulty (higher), attempts (lower), then newest.",
  },
  "arah-jalan": {
    columns: [RANK, USERNAME, { key: "streak", label: "Streak" }, TIME, OPTIONAL_DIFFICULTY, DATE],
    scoringDescription: "Streak (higher), time (lower), difficulty (higher), then newest.",
  },
};

const DIFFICULTY_ORDER: Partial<Record<GameId, readonly string[]>> = {
  numbers: ["easy", "medium", "hard", "ultrahard"],
  wordsearch: ["easy", "medium", "hard"],
  currency: ["easy", "medium", "hard", "ultra"],
  "makan-apa": ["easy", "hard"],
  "misi-membeli": ["easy", "medium", "hard"],
  "arah-jalan": ["easy", "hard"],
};

const finiteNumber = (value: unknown): number | undefined =>
  typeof value === "number" && Number.isFinite(value) ? value : undefined;

function metaValue(entry: ScoreEntry, key: string): unknown {
  return entry.meta && typeof entry.meta === "object" ? entry.meta[key] : undefined;
}

export function highscoreNumericScore(entry: ScoreEntry) {
  return finiteNumber(entry.score) ?? 0;
}

export function highscoreAttempts(gameId: GameId, entry: ScoreEntry): number | undefined {
  const current = finiteNumber(entry.attempts);
  if (current !== undefined) return current;
  if (gameId === "makan-apa") return finiteNumber(metaValue(entry, "submissions"));
  if (gameId === "wordsearch" || gameId === "arah-jalan") return undefined;
  return finiteNumber(metaValue(entry, "attempts"));
}

export function highscoreDifficulty(entry: ScoreEntry): string | undefined {
  const value = entry.difficulty ?? metaValue(entry, "difficulty");
  return typeof value === "string" && value ? value : undefined;
}

export function arahJalanDifficulty(entry: ScoreEntry): ArahJalanDifficulty | "unknown" {
  const difficulty = highscoreDifficulty(entry);
  return difficulty === "easy" || difficulty === "hard" ? difficulty : "unknown";
}

export function highscoreTheme(entry: ScoreEntry): string | undefined {
  const value = entry.theme ?? metaValue(entry, "theme");
  return typeof value === "string" && value ? value : undefined;
}

export function highscoreMode(entry: ScoreEntry): string | undefined {
  const value = entry.mode ?? metaValue(entry, "mode");
  return typeof value === "string" && value ? value : undefined;
}

export function highscoreWords(entry: ScoreEntry): number | undefined {
  return finiteNumber(metaValue(entry, "words"));
}

export function highscoreDifficultyLabel(entry: ScoreEntry): string | undefined {
  const difficulty = highscoreDifficulty(entry);
  if (!difficulty) return undefined;
  if (difficulty === "ultrahard") return "Ultra Hard";
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

function difficultyRank(gameId: GameId, entry: ScoreEntry) {
  const difficulty = highscoreDifficulty(entry);
  if (!difficulty) return 0;
  return (DIFFICULTY_ORDER[gameId]?.indexOf(difficulty) ?? -1) + 1;
}

function attemptsForRanking(gameId: GameId, entry: ScoreEntry) {
  return highscoreAttempts(gameId, entry) ?? Number.MAX_SAFE_INTEGER;
}

function newestFirst(a: ScoreEntry, b: ScoreEntry) {
  return b.dateISO.localeCompare(a.dateISO);
}

function stableIdentity(a: ScoreEntry, b: ScoreEntry) {
  return a.id.localeCompare(b.id);
}

function accuracyThenTime(a: ScoreEntry, b: ScoreEntry) {
  if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
  return a.timeMs - b.timeMs;
}

export function compareHighscoreRows(gameId: GameId, a: ScoreEntry, b: ScoreEntry) {
  if (gameId === "arah-jalan") {
    const streak = highscoreNumericScore(b) - highscoreNumericScore(a);
    if (streak !== 0) return streak;
    if (a.timeMs !== b.timeMs) return a.timeMs - b.timeMs;
  } else {
    const performance = accuracyThenTime(a, b);
    if (performance !== 0) return performance;
  }

  if (gameId !== "word-match") {
    const difficulty = difficultyRank(gameId, b) - difficultyRank(gameId, a);
    if (difficulty !== 0) return difficulty;
  }

  if (gameId !== "wordsearch" && gameId !== "arah-jalan") {
    const attempts = attemptsForRanking(gameId, a) - attemptsForRanking(gameId, b);
    if (attempts !== 0) return attempts;
  }

  const date = newestFirst(a, b);
  if (date !== 0) return date;
  return stableIdentity(a, b);
}

export function sortHighscoreRows(gameId: GameId, rows: readonly ScoreEntry[]) {
  return [...rows].sort((a, b) => compareHighscoreRows(gameId, a, b));
}

export function limitHighscoreRows(gameId: GameId, rows: readonly ScoreEntry[], limit: number) {
  return sortHighscoreRows(gameId, rows).slice(0, Math.max(0, limit));
}

function hasColumnValue(gameId: GameId, entry: ScoreEntry, key: HighscoreColumnKey) {
  if (key === "attempts") return highscoreAttempts(gameId, entry) !== undefined;
  if (key === "difficulty") return highscoreDifficulty(entry) !== undefined;
  if (key === "theme") return highscoreTheme(entry) !== undefined;
  if (key === "words") return highscoreWords(entry) !== undefined;
  if (key === "mode") return highscoreMode(entry) !== undefined;
  return true;
}

export function highscoreColumnsForRows(gameId: GameId, rows: readonly ScoreEntry[]) {
  return HIGHSCORE_GAME_CONFIG[gameId].columns.filter(
    (column) => !column.optional || rows.some((entry) => hasColumnValue(gameId, entry, column.key)),
  );
}
