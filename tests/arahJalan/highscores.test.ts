import test from "node:test";
import assert from "node:assert/strict";
import type { ScoreEntry } from "../../src/lib/highscoresTypes.ts";
import { isValidHighscoreGameId } from "../../src/lib/highscoresTypes.ts";
import { resolveArahJalanStreakAfterMistake } from "../../src/lib/arahJalan/streakScoring.ts";
import { compareArahJalanHighscoreRows } from "../../src/lib/highscoreRanking.ts";

function scoreEntry(overrides: Partial<ScoreEntry>): ScoreEntry {
  return {
    id: "score",
    name: "Player",
    score: 1,
    accuracy: 100,
    timeMs: 1000,
    dateISO: "2026-01-01T00:00:00.000Z",
    meta: { difficulty: "easy" },
    ...overrides,
  };
}

test("arah-jalan is accepted as a highscore game id", () => {
  assert.equal(isValidHighscoreGameId("arah-jalan"), true);
});

test("Arah Jalan streak scoring does not save zero-streak mistakes", () => {
  assert.deepEqual(resolveArahJalanStreakAfterMistake(0), {
    scoreToSave: null,
    nextCurrentStreak: 0,
  });
});

test("Arah Jalan streak scoring saves positive streaks and resets current streak", () => {
  assert.deepEqual(resolveArahJalanStreakAfterMistake(4), {
    scoreToSave: 4,
    nextCurrentStreak: 0,
  });
});

test("Arah Jalan ranking prioritizes highest streak first", () => {
  const five = scoreEntry({ id: "five", score: 5, meta: { difficulty: "easy" } });
  const four = scoreEntry({ id: "four", score: 4, meta: { difficulty: "hard" } });

  assert.equal(compareArahJalanHighscoreRows(five, four, { allDifficulties: true }) < 0, true);
});

test("Arah Jalan ranking uses hard-over-easy only in all-difficulty view", () => {
  const easyFast = scoreEntry({
    id: "easy-fast",
    score: 5,
    timeMs: 1000,
    meta: { difficulty: "easy" },
  });
  const hardSlow = scoreEntry({
    id: "hard-slow",
    score: 5,
    timeMs: 2000,
    meta: { difficulty: "hard" },
  });

  assert.equal(compareArahJalanHighscoreRows(easyFast, hardSlow, { allDifficulties: true }) > 0, true);
  assert.equal(compareArahJalanHighscoreRows(easyFast, hardSlow, { allDifficulties: false }) < 0, true);
});
