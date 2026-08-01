import assert from "node:assert/strict";
import test from "node:test";
import { compareHighscoreRows, leaderboardPartitionKey } from "../../src/lib/highscoreRanking.ts";
import type { GameId, RunResultV2, ScoreEntry } from "../../src/lib/highscoresTypes.ts";
import { getCollections } from "../../src/server/db.ts";
import { addHighScore, clearHighScores, listHighScores } from "../../src/server/highscoreRepo.ts";
let sequence = 0;
function runId() { sequence += 1; return `00000000-0000-4000-8000-${String(sequence).padStart(12, "0")}`; }
function run(overrides: Partial<RunResultV2> = {}): RunResultV2 {
  return {
    runId: runId(), scoreVersion: 2, outcome: "completed", competitive: true,
    accuracy: 100, timeMs: 1000, attempts: 10, correct: 10, mistakes: 0, hints: 0,
    difficulty: "easy", ...overrides,
  };
}

test("v2 payload shapes cover every game profile", () => {
  const cases: Array<[GameId, RunResultV2]> = [
    ["numbers", run()],
    ["word-match", run({ difficulty: undefined, targetLanguage: "en" })],
    ["wordsearch", run({ difficulty: "hard", theme: "all" })],
    ["currency", run({ difficulty: "ultra", mode: "cashier" })],
    ["makan-apa", run({ difficulty: "hard" })],
    ["misi-membeli", run({ outcome: "failed", score: 4, averageCorrectResponseTimeMs: 800, difficulty: "medium", correct: 4, attempts: 5, mistakes: 1, accuracy: 80 })],
    ["arah-jalan", run({ outcome: "failed", score: 4, averageCorrectResponseTimeMs: 800, difficulty: "hard", correct: 4, attempts: 5, mistakes: 1, accuracy: 80 })],
  ];
  for (const [, payload] of cases) assert.equal(payload.scoreVersion, 2);
});

test("partitions keep different fairness settings separate", () => {
  assert.notEqual(
    leaderboardPartitionKey("currency", { difficulty: "easy", mode: "buyer" }),
    leaderboardPartitionKey("currency", { difficulty: "hard", mode: "buyer" }),
  );
  assert.notEqual(
    leaderboardPartitionKey("wordsearch", { difficulty: "hard", theme: "all" }),
    leaderboardPartitionKey("wordsearch", { difficulty: "hard", theme: "food" }),
  );
});

test("shared comparators use the published ordered criteria", () => {
  const entry = (overrides: Partial<ScoreEntry>): ScoreEntry => ({
    id: runId(), name: "Test", accuracy: 100, timeMs: 1000, dateISO: "2026-01-01T00:00:00.000Z", scoreVersion: 2, competitive: true,
    attempts: 10, correct: 10, mistakes: 0, hints: 0, difficulty: "easy", ...overrides,
  });
  assert.ok(compareHighscoreRows("numbers", entry({ accuracy: 100 }), entry({ accuracy: 99 })) < 0);
  assert.ok(compareHighscoreRows("wordsearch", entry({ hints: 0 }), entry({ hints: 1 })) < 0);
  assert.ok(compareHighscoreRows("misi-membeli", entry({ score: 4, correct: 4, attempts: 5, mistakes: 1, accuracy: 80, averageCorrectResponseTimeMs: 600 }), entry({ score: 3, correct: 3, attempts: 4, mistakes: 1, accuracy: 75, averageCorrectResponseTimeMs: 500 })) < 0);
});

test("repository retains every run and limits only the query-time leaderboard", { concurrency: false }, async () => {
  await clearHighScores();
  const user = { id: "RETENTION_TEST", name: "Retention Test", avatarId: "crash" };
  const first = run({ difficulty: "easy", timeMs: 9000 });
  await addHighScore("numbers", first, user);
  for (let index = 0; index < 21; index += 1) {
    await addHighScore("numbers", run({ difficulty: "easy", timeMs: 1000 + index }), user);
  }
  const personalBest = run({ difficulty: "easy", timeMs: 500 });
  await addHighScore("numbers", personalBest, user);
  const historyAttempt = run({ difficulty: "easy", outcome: "failed", competitive: false, attempts: 1, correct: 0, mistakes: 1, accuracy: 0 });
  await addHighScore("numbers", historyAttempt, user);
  await addHighScore("currency", run({ difficulty: "easy", mode: "buyer" }), user);
  await addHighScore("currency", run({ difficulty: "medium", mode: "buyer" }), user);
  await addHighScore("currency", run({ difficulty: "hard", mode: "cashier" }), user);
  await addHighScore("currency", run({ difficulty: "ultra", mode: "cashier" }), user);
  await addHighScore("wordsearch", run({ difficulty: "hard", theme: "all" }), user);
  await addHighScore("wordsearch", run({ difficulty: "hard", theme: "food" }), user);
  await addHighScore("word-match", run({ difficulty: undefined, targetLanguage: "en" }), user);
  await addHighScore("word-match", run({ difficulty: undefined, targetLanguage: "es" }), user);

  const collections = await getCollections();
  await collections.highscores.insertOne({
    id: "legacy-v1-score", game_id: "numbers", name: "Legacy", avatar_id: null,
    accuracy: 50, time_ms: 4000, date_iso: "2025-01-01T00:00:00.000Z", meta_json: null,
    difficulty_weight: 0, created_at: "2025-01-01T00:00:00.000Z",
  });

  const all = await listHighScores();
  assert.equal(all.numbers.filter((entry) => entry.scoreVersion === 2 && entry.competitive).length, 23);
  assert.equal(all.numbers.some((entry) => entry.id === first.runId), true, "older personal run is retained");
  assert.equal(all.numbers.some((entry) => entry.id === personalBest.runId), true, "new personal best is retained alongside history");
  assert.equal(all.numbers.some((entry) => entry.id === historyAttempt.runId && entry.competitive === false), true);
  assert.equal(all.numbers.some((entry) => entry.id === "legacy-v1-score" && entry.scoreVersion === undefined), true);
  assert.equal(all.currency.length, 4, "difficulty and mode partitions remain independent");
  assert.equal(all.wordsearch.length, 2, "themes remain independent");
  assert.equal(all["word-match"].length, 2, "target languages remain independent");

  const limited = await listHighScores({ leaderboardLimitPerPartition: 20 });
  assert.equal(limited.numbers.filter((entry) => entry.scoreVersion === 2 && entry.competitive).length, 20);
  assert.equal(limited.numbers.some((entry) => entry.id === historyAttempt.runId), true, "history remains queryable");
  assert.equal(limited.numbers.some((entry) => entry.id === "legacy-v1-score"), true, "legacy history remains queryable");

  const duplicate = await addHighScore("numbers", personalBest, user);
  assert.equal(duplicate.duplicate, true);
  const afterDuplicate = await listHighScores();
  assert.equal(afterDuplicate.numbers.length, all.numbers.length, "retry neither adds nor removes records");
  await clearHighScores();
});
