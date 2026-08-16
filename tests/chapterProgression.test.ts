import assert from "node:assert/strict";
import test from "node:test";
import { chapter01 } from "../src/lib/chapters/chapter-01.ts";
import { chapter02 } from "../src/lib/chapters/chapter-02.ts";
import { chapter03 } from "../src/lib/chapters/chapter-03.ts";
import { chapter04 } from "../src/lib/chapters/chapter-04.ts";
import { chapter05 } from "../src/lib/chapters/chapter-05.ts";
import { chapter06 } from "../src/lib/chapters/chapter-06.ts";
import { chapter07 } from "../src/lib/chapters/chapter-07.ts";
import { chapter08 } from "../src/lib/chapters/chapter-08.ts";
import { chapter09 } from "../src/lib/chapters/chapter-09.ts";
import { chapter10 } from "../src/lib/chapters/chapter-10.ts";
import { chapter11 } from "../src/lib/chapters/chapter-11.ts";
import {
  getChatTurnRequirement,
  getNextRequiredProgressChapter,
  hasCompletedChapterRequirement,
  migrateLegacyCompletedChapterRevisions,
  migrateLegacyProgressChapter,
  MINIGAME_PREREQUISITE_CHAPTERS,
  MINIGAME_UNLOCK_CHAPTER_IDS,
  WORLD_CHAPTER_IDS,
} from "../src/lib/chapterProgression.ts";

const CHAPTERS = [chapter01, chapter02, chapter03, chapter04, chapter05, chapter06, chapter07, chapter08, chapter09, chapter10, chapter11];

function chatLengths(chapterId: number) {
  return CHAPTERS.find((chapter) => chapter.id === chapterId)?.pages
    .filter((page) => page.kind === "chat")
    .map((page) => page.messages.length) ?? [];
}

test("canonical chapter order and world boundaries follow the new progression", () => {
  assert.deepEqual(
    CHAPTERS.map((chapter) => [chapter.id, chapter.title.ms]),
    [
      [1, "Sapaan"],
      [2, "Makanan & Kuih-muih"],
      [3, "Keluarga"],
      [4, "Masa\n& Arah Jalan"],
      [5, "Nombor / Wang / Alamat"],
      [6, "Alam Sekitar & Cuaca"],
      [7, "Kaunter"],
      [8, "Perayaan di Malaysia"],
      [9, "Pekerjaan di Sekitar Kita"],
      [10, "Permainan Tradisional"],
      [11, "Cuti-Cuti Umum di Malaysia"],
    ],
  );
  assert.deepEqual(WORLD_CHAPTER_IDS[1], [1, 2, 3, 4]);
  assert.deepEqual(WORLD_CHAPTER_IDS[2], [5, 6, 7, 8]);
});

test("chat turn requirements are based on world, including moved food and counter lessons", () => {
  assert.equal(getChatTurnRequirement(2), 8);
  assert.equal(getChatTurnRequirement(4), 8);
  assert.equal(getChatTurnRequirement(5), 10);
  assert.equal(getChatTurnRequirement(7), 10);
  assert.deepEqual(chatLengths(2), [8, 8]);
  assert.deepEqual(chatLengths(7), [10, 10, 10]);

  for (const chapter of CHAPTERS.filter((item) => item.id <= 8)) {
    for (const length of chatLengths(chapter.id)) {
      assert.equal(length, getChatTurnRequirement(chapter.id), `Chapter ${chapter.id} chat length`);
    }
  }
});

test("minigames use the canonical unlock chapters, including the map markers", () => {
  assert.deepEqual(MINIGAME_PREREQUISITE_CHAPTERS, {
    numbers: 5,
    "word-match": 1,
    wordsearch: 3,
    currency: 5,
    "makan-apa": 2,
    "misi-membeli": 11,
    "arah-jalan": 4,
  });
  assert.deepEqual([...MINIGAME_UNLOCK_CHAPTER_IDS].sort((a, b) => a - b), [1, 2, 3, 4, 5, 11]);

  assert.equal(hasCompletedChapterRequirement(1, MINIGAME_PREREQUISITE_CHAPTERS["word-match"]), false);
  assert.equal(hasCompletedChapterRequirement(2, MINIGAME_PREREQUISITE_CHAPTERS["word-match"]), true);
  assert.equal(hasCompletedChapterRequirement(2, MINIGAME_PREREQUISITE_CHAPTERS["makan-apa"]), false);
  assert.equal(hasCompletedChapterRequirement(3, MINIGAME_PREREQUISITE_CHAPTERS["makan-apa"]), true);
  assert.equal(hasCompletedChapterRequirement(3, MINIGAME_PREREQUISITE_CHAPTERS.wordsearch), false);
  assert.equal(hasCompletedChapterRequirement(4, MINIGAME_PREREQUISITE_CHAPTERS.wordsearch), true);
  assert.equal(hasCompletedChapterRequirement(4, MINIGAME_PREREQUISITE_CHAPTERS["arah-jalan"]), false);
  assert.equal(hasCompletedChapterRequirement(5, MINIGAME_PREREQUISITE_CHAPTERS["arah-jalan"]), true);
  assert.equal(hasCompletedChapterRequirement(5, MINIGAME_PREREQUISITE_CHAPTERS.numbers), false);
  assert.equal(hasCompletedChapterRequirement(5, MINIGAME_PREREQUISITE_CHAPTERS.currency), false);
  assert.equal(hasCompletedChapterRequirement(6, MINIGAME_PREREQUISITE_CHAPTERS.numbers), true);
  assert.equal(hasCompletedChapterRequirement(6, MINIGAME_PREREQUISITE_CHAPTERS.currency), true);
  assert.equal(hasCompletedChapterRequirement(10, MINIGAME_PREREQUISITE_CHAPTERS["misi-membeli"]), false);
  assert.equal(hasCompletedChapterRequirement(11, MINIGAME_PREREQUISITE_CHAPTERS["misi-membeli"]), true);

  assert.equal(hasCompletedChapterRequirement(1, MINIGAME_PREREQUISITE_CHAPTERS.numbers, true), true);
  assert.equal(hasCompletedChapterRequirement(1, MINIGAME_PREREQUISITE_CHAPTERS.currency, true), true);
});

test("legacy completion records map by content identity and preserve prerequisite gaps", () => {
  assert.deepEqual(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(migrateLegacyProgressChapter),
    [1, 2, 2, 2, 2, 2, 2, 8, 9, 10, 11],
  );
  assert.deepEqual(
    migrateLegacyCompletedChapterRevisions({ "2": 4, "3": 5, "7": 2 }),
    { "2": 2, "3": 4, "7": 5 },
  );

  const completedOldFamily = migrateLegacyCompletedChapterRevisions({ "1": 1, "2": 4 });
  assert.equal(migrateLegacyProgressChapter(3), 2);
  assert.deepEqual(completedOldFamily, { "1": 1, "3": 4 });
  assert.equal(completedOldFamily["2"], undefined);
  assert.equal(
    getNextRequiredProgressChapter(3, { ...completedOldFamily, "2": 1 }),
    4,
  );

  const completedOldFood = migrateLegacyCompletedChapterRevisions({ "1": 1, "2": 4, "7": 2 });
  assert.equal(migrateLegacyProgressChapter(8), 8);
  assert.equal(completedOldFood["2"], 2);
  assert.equal(completedOldFood["3"], 4);

  const partialOldFood = migrateLegacyCompletedChapterRevisions({ "1": 1, "2": 4, "3": 5, "4": 1, "5": 1, "6": 1 });
  assert.equal(migrateLegacyProgressChapter(7), 2);
  assert.equal(partialOldFood["2"], undefined);
});

test("a fully completed legacy learner remains fully completed after chapter reordering", () => {
  // This is a genuine pre-migration 11/11 learner: old Ch2 was Family, old
  // Ch3 was Counters, and old Ch7 was Food. Distinct revisions make identity
  // preservation observable after their numeric IDs move.
  const legacyProgressChapter = 11;
  const legacyCompletedChapterRevisions = {
    "1": 101,
    "2": 102,
    "3": 103,
    "4": 104,
    "5": 105,
    "6": 106,
    "7": 107,
    "8": 108,
    "9": 109,
    "10": 110,
    "11": 111,
  };

  const migratedProgressChapter = migrateLegacyProgressChapter(legacyProgressChapter);
  const migratedCompletedChapterRevisions = migrateLegacyCompletedChapterRevisions(
    legacyCompletedChapterRevisions,
  );

  assert.equal(migratedProgressChapter, 11);
  assert.deepEqual(migratedCompletedChapterRevisions, {
    "1": 101,
    "2": 107, // old Ch7 Food
    "3": 102, // old Ch2 Family
    "4": 104,
    "5": 105,
    "6": 106,
    "7": 103, // old Ch3 Counters
    "8": 108,
    "9": 109,
    "10": 110,
    "11": 111,
  });
  assert.deepEqual(
    Object.keys(migratedCompletedChapterRevisions).map(Number).sort((a, b) => a - b),
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  );
  assert.equal(
    getNextRequiredProgressChapter(migratedProgressChapter, migratedCompletedChapterRevisions),
    11,
  );
});
