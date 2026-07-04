import type { ScoreEntry } from "./highscoresTypes";

export type ArahJalanDifficulty = "easy" | "hard";
export type ArahJalanDifficultyFilter = "__ALL_DIFFICULTIES__" | ArahJalanDifficulty | "unknown";

export function highscoreNumericScore(entry: ScoreEntry) {
  return typeof entry.score === "number" && Number.isFinite(entry.score) ? entry.score : 0;
}

export function arahJalanDifficulty(entry: ScoreEntry): ArahJalanDifficulty | "unknown" {
  const meta = (entry.meta ?? {}) as Record<string, unknown>;
  const difficulty = meta.difficulty;
  return difficulty === "easy" || difficulty === "hard" ? difficulty : "unknown";
}

export function arahJalanDifficultyRank(difficulty: ArahJalanDifficulty | "unknown") {
  if (difficulty === "hard") return 2;
  if (difficulty === "easy") return 1;
  return 0;
}

export function compareArahJalanHighscoreRows(
  a: ScoreEntry,
  b: ScoreEntry,
  options: { allDifficulties: boolean },
) {
  const scoreRank = highscoreNumericScore(b) - highscoreNumericScore(a);
  if (scoreRank !== 0) return scoreRank;

  if (options.allDifficulties) {
    const difficultyRank =
      arahJalanDifficultyRank(arahJalanDifficulty(b)) - arahJalanDifficultyRank(arahJalanDifficulty(a));
    if (difficultyRank !== 0) return difficultyRank;
  }

  if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
  if (a.timeMs !== b.timeMs) return a.timeMs - b.timeMs;
  return b.dateISO.localeCompare(a.dateISO);
}
