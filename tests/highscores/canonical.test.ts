import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  HIGHSCORE_GAME_CONFIG,
  compareHighscoreRows,
  highscoreAttempts,
  highscoreColumnsForRows,
  limitHighscoreRows,
  sortHighscoreRows,
} from "../../src/lib/highscoreRanking.ts";
import type { GameId, HighscoreRun, ScoreEntry } from "../../src/lib/highscoresTypes.ts";
import { VALID_HIGHSCORE_GAME_IDS } from "../../src/lib/highscoresTypes.ts";
import { getCollections } from "../../src/server/db.ts";
import { addHighScore, clearHighScores, listHighScores } from "../../src/server/highscoreRepo.ts";

let sequence = 0;
function runId() {
  sequence += 1;
  return `00000000-0000-4000-8000-${String(sequence).padStart(12, "0")}`;
}

function run(overrides: Partial<HighscoreRun> = {}): HighscoreRun {
  return {
    runId: runId(),
    outcome: "completed",
    accuracy: 100,
    timeMs: 1000,
    attempts: 10,
    correct: 10,
    mistakes: 0,
    hints: 0,
    difficulty: "easy",
    ...overrides,
  };
}

function entry(overrides: Partial<ScoreEntry> = {}): ScoreEntry {
  return {
    id: runId(),
    name: "Test",
    accuracy: 100,
    timeMs: 1000,
    dateISO: "2026-01-01T00:00:00.000Z",
    attempts: 10,
    difficulty: "easy",
    ...overrides,
  };
}

test("canonical payload shapes cover every game without a schema version", () => {
  const cases: Array<[GameId, HighscoreRun]> = [
    ["numbers", run()],
    ["word-match", run({ difficulty: undefined, targetLanguage: "en" })],
    ["wordsearch", run({ difficulty: "hard", theme: "all" })],
    ["currency", run({ difficulty: "ultra", mode: "cashier" })],
    ["makan-apa", run({ difficulty: "hard" })],
    ["misi-membeli", run({ outcome: "failed", score: 4, averageCorrectResponseTimeMs: 800, difficulty: "medium" })],
    ["arah-jalan", run({ outcome: "failed", score: 4, averageCorrectResponseTimeMs: 800, difficulty: "hard" })],
  ];
  for (const [, payload] of cases) {
    assert.equal("scoreVersion" in payload, false);
    assert.equal("competitive" in payload, false);
  }
});

test("accuracy-based games rank quality before speed and context", () => {
  const perfectSlow = entry({ accuracy: 100, timeMs: 20 * 60_000, difficulty: "easy" });
  const imperfectFast = entry({ accuracy: 99, timeMs: 60_000, difficulty: "hard" });
  assert.ok(compareHighscoreRows("numbers", perfectSlow, imperfectFast) < 0);
  assert.ok(compareHighscoreRows("word-match", perfectSlow, imperfectFast) < 0);

  const faster = entry({ accuracy: 100, timeMs: 60_000 });
  const slower = entry({ accuracy: 100, timeMs: 70_000 });
  assert.ok(compareHighscoreRows("numbers", faster, slower) < 0);
  assert.ok(compareHighscoreRows("wordsearch", entry({ timeMs: 68_000 }), entry({ timeMs: 72_000 })) < 0);
});

test("attempts and newest date are deterministic later tie-breakers", () => {
  const fewerAttempts = entry({ attempts: 8 });
  const moreAttempts = entry({ attempts: 9 });
  assert.ok(compareHighscoreRows("word-match", fewerAttempts, moreAttempts) < 0);

  const older = entry({ id: "older", dateISO: "2026-01-01T00:00:00.000Z" });
  const newer = entry({ id: "newer", dateISO: "2026-01-02T00:00:00.000Z" });
  for (const gameId of VALID_HIGHSCORE_GAME_IDS) {
    const left = gameId === "arah-jalan" ? { ...older, score: 5 } : older;
    const right = gameId === "arah-jalan" ? { ...newer, score: 5 } : newer;
    assert.ok(compareHighscoreRows(gameId, right, left) < 0, gameId);
  }
});

test("Arah Jalan ranks streak then elapsed time and never configures Accuracy", () => {
  const higherStreak = entry({ score: 5, timeMs: 5000 });
  const lowerStreak = entry({ score: 4, timeMs: 1000 });
  assert.ok(compareHighscoreRows("arah-jalan", higherStreak, lowerStreak) < 0);

  const fast = entry({ score: 5, timeMs: 1000, difficulty: "easy" });
  const slow = entry({ score: 5, timeMs: 2000, difficulty: "hard" });
  assert.ok(compareHighscoreRows("arah-jalan", fast, slow) < 0);
  assert.equal(HIGHSCORE_GAME_CONFIG["arah-jalan"].columns.some((column) => column.key === "accuracy"), false);
});

test("display configuration is explicit for every supported game", () => {
  const expected: Record<GameId, string[]> = {
    numbers: ["rank", "username", "accuracy", "time", "difficulty", "attempts", "date"],
    "word-match": ["rank", "username", "accuracy", "time", "attempts", "date"],
    wordsearch: ["rank", "username", "accuracy", "time", "difficulty", "theme", "words", "date"],
    currency: ["rank", "username", "accuracy", "time", "difficulty", "mode", "attempts", "date"],
    "makan-apa": ["rank", "username", "accuracy", "time", "difficulty", "attempts", "date"],
    "misi-membeli": ["rank", "username", "accuracy", "time", "difficulty", "attempts", "date"],
    "arah-jalan": ["rank", "username", "streak", "time", "difficulty", "date"],
  };
  const row = entry({ meta: { theme: "food", words: 10, submissions: 12, mode: "buyer" } });
  for (const gameId of VALID_HIGHSCORE_GAME_IDS) {
    assert.deepEqual(highscoreColumnsForRows(gameId, [row]).map((column) => column.key), expected[gameId], gameId);
  }
});

test("legacy Makan Apa submissions are the genuine attempts value", () => {
  const legacy = entry({ attempts: undefined, meta: { attempts: 7, solvedCount: 7, submissions: 11 } });
  assert.equal(highscoreAttempts("makan-apa", legacy), 11);
});

test("repository preserves canonical rows, equal scores, and unversioned future writes", { concurrency: false }, async () => {
  await clearHighScores();
  const user = { id: "CANONICAL_TEST", name: "Same Player", avatarId: "crash" };
  const first = run({ timeMs: 2000 });
  const second = run({ timeMs: 2000 });
  await addHighScore("numbers", first, user);
  await addHighScore("numbers", second, user);

  const duplicate = await addHighScore("numbers", first, user);
  assert.deepEqual(duplicate, { ok: true, saved: false, duplicate: true });

  const collections = await getCollections();
  const rawNew = await collections.highscores.findOne({ id: first.runId });
  assert.ok(rawNew);
  assert.equal("score_version" in rawNew, false);
  assert.equal("competitive" in rawNew, false);
  assert.equal("partition_key" in rawNew, false);

  const legacyDocument = {
    id: "legacy-v1-score",
    game_id: "numbers",
    name: "Legacy",
    avatar_id: null,
    accuracy: 50,
    time_ms: 4000,
    date_iso: "2025-01-01T00:00:00.000Z",
    meta_json: JSON.stringify({ difficulty: "easy", attempts: 4 }),
    difficulty_weight: 1,
    created_at: "2025-01-01T00:00:00.000Z",
  };
  await collections.highscores.insertOne(legacyDocument);
  const markedDocument = {
    ...legacyDocument,
    id: "marked-score",
    name: "Marked",
    score_version: 2,
    competitive: true,
    partition_key: "numbers:difficulty=easy",
  };
  await collections.highscores.insertOne(markedDocument);

  const firstRead = await listHighScores();
  const secondRead = await listHighScores();
  assert.equal(firstRead.numbers.filter((row) => row.id === first.runId || row.id === second.runId).length, 2);
  assert.equal(firstRead.numbers.filter((row) => row.id === "legacy-v1-score").length, 1);
  assert.equal(firstRead.numbers.filter((row) => row.id === "marked-score").length, 1);
  assert.deepEqual(secondRead.numbers.map((row) => row.id), firstRead.numbers.map((row) => row.id));
  assert.deepEqual(await collections.highscores.findOne({ id: "legacy-v1-score" }), legacyDocument);
  await clearHighScores();
});

test("display limits do not trim storage", { concurrency: false }, async () => {
  await clearHighScores();
  const user = { id: "RETENTION_TEST", name: "Retention Test", avatarId: "crash" };
  for (let index = 0; index < 25; index += 1) {
    await addHighScore("numbers", run({ timeMs: 1000 + index }), user);
  }
  const all = await listHighScores();
  const limited = await listHighScores({ leaderboardLimitPerGame: 20 });
  const collections = await getCollections();
  assert.equal(all.numbers.length, 25);
  assert.equal(limited.numbers.length, 20);
  assert.equal((await collections.highscores.find({ game_id: "numbers" }).toArray()).length, 25);
  assert.deepEqual(limitHighscoreRows("numbers", all.numbers, 20).map((row) => row.id), limited.numbers.map((row) => row.id));
  await clearHighScores();
});

test("repository and UI helper use identical ordering for every game", () => {
  for (const gameId of VALID_HIGHSCORE_GAME_IDS) {
    const rows = [
      entry({ id: `${gameId}-low`, accuracy: 90, timeMs: 500, score: 4 }),
      entry({ id: `${gameId}-slow`, accuracy: 100, timeMs: 2000, score: 5 }),
      entry({ id: `${gameId}-fast`, accuracy: 100, timeMs: 1000, score: 5 }),
    ];
    const repositoryOrder = [...rows].sort((a, b) => compareHighscoreRows(gameId, a, b));
    assert.deepEqual(sortHighscoreRows(gameId, rows).map((row) => row.id), repositoryOrder.map((row) => row.id), gameId);
    assert.deepEqual(rows.map((row) => row.id), [`${gameId}-low`, `${gameId}-slow`, `${gameId}-fast`], `${gameId} input mutated`);
  }
});

test("leaderboard source contains no version or hidden-history UI", async () => {
  const source = await readFile(new URL("../../app/minigames/highscores/page.tsx", import.meta.url), "utf8");
  for (const forbidden of ["scoreVersion", "isCompetitiveV2", "Legacy", "History", "Show history", "Hide history", "No v2 results"]) {
    assert.equal(source.includes(forbidden), false, forbidden);
  }
});
