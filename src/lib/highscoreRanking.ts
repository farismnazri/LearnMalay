import type { GameId, ScoreEntry } from "./highscoresTypes.ts";

export type ArahJalanDifficulty = "easy" | "hard";
export type ArahJalanDifficultyFilter = "__ALL_DIFFICULTIES__" | ArahJalanDifficulty | "unknown";
const number = (value: unknown, fallback = 0) => typeof value === "number" && Number.isFinite(value) ? value : fallback;

export function highscoreNumericScore(entry: ScoreEntry) { return number(entry.score); }
export function arahJalanDifficulty(entry: ScoreEntry): ArahJalanDifficulty | "unknown" {
  const difficulty = entry.difficulty ?? (entry.meta as Record<string, unknown> | undefined)?.difficulty;
  return difficulty === "easy" || difficulty === "hard" ? difficulty : "unknown";
}
export function arahJalanDifficultyRank(difficulty: ArahJalanDifficulty | "unknown") {
  return difficulty === "hard" ? 2 : difficulty === "easy" ? 1 : 0;
}
function newestFirst(a: ScoreEntry, b: ScoreEntry) { return b.dateISO.localeCompare(a.dateISO); }
function fixedCompletionCompare(a: ScoreEntry, b: ScoreEntry) {
  if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
  if (a.timeMs !== b.timeMs) return a.timeMs - b.timeMs;
  if (number(a.mistakes) !== number(b.mistakes)) return number(a.mistakes) - number(b.mistakes);
  if (number(a.hints) !== number(b.hints)) return number(a.hints) - number(b.hints);
  return newestFirst(a, b);
}
function wordsearchCompare(a: ScoreEntry, b: ScoreEntry) {
  if (number(a.hints) !== number(b.hints)) return number(a.hints) - number(b.hints);
  if (number(a.mistakes) !== number(b.mistakes)) return number(a.mistakes) - number(b.mistakes);
  if (a.timeMs !== b.timeMs) return a.timeMs - b.timeMs;
  return newestFirst(a, b);
}
function survivalCompare(a: ScoreEntry, b: ScoreEntry) {
  if (highscoreNumericScore(b) !== highscoreNumericScore(a)) return highscoreNumericScore(b) - highscoreNumericScore(a);
  if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
  const aTime = number(a.averageCorrectResponseTimeMs, Number.MAX_SAFE_INTEGER);
  const bTime = number(b.averageCorrectResponseTimeMs, Number.MAX_SAFE_INTEGER);
  if (aTime !== bTime) return aTime - bTime;
  if (a.timeMs !== b.timeMs) return a.timeMs - b.timeMs;
  if (number(a.mistakes) !== number(b.mistakes)) return number(a.mistakes) - number(b.mistakes);
  return newestFirst(a, b);
}
export function isCompetitiveV2(entry: ScoreEntry) { return entry.scoreVersion === 2 && entry.competitive === true; }
export function leaderboardPartitionKey(gameId: GameId, entry: Partial<Pick<ScoreEntry, "difficulty" | "mode" | "targetLanguage" | "theme">>) {
  const value = (input: string | undefined) => input ?? "__default__";
  if (gameId === "word-match") return `${gameId}:language=${value(entry.targetLanguage)}`;
  if (gameId === "wordsearch") return `${gameId}:difficulty=${value(entry.difficulty)}:theme=${value(entry.theme)}`;
  if (gameId === "currency") return `${gameId}:difficulty=${value(entry.difficulty)}:mode=${value(entry.mode)}`;
  return `${gameId}:difficulty=${value(entry.difficulty)}`;
}
export function compareHighscoreRows(gameId: GameId, a: ScoreEntry, b: ScoreEntry) {
  if (gameId === "wordsearch") return wordsearchCompare(a, b);
  if (gameId === "misi-membeli" || gameId === "arah-jalan") return survivalCompare(a, b);
  return fixedCompletionCompare(a, b);
}
export function compareArahJalanHighscoreRows(a: ScoreEntry, b: ScoreEntry, options: { allDifficulties: boolean }) {
  const scoreRank = highscoreNumericScore(b) - highscoreNumericScore(a);
  if (scoreRank !== 0) return scoreRank;
  if (options.allDifficulties) {
    const rank = arahJalanDifficultyRank(arahJalanDifficulty(b)) - arahJalanDifficultyRank(arahJalanDifficulty(a));
    if (rank !== 0) return rank;
  }
  return survivalCompare(a, b);
}
