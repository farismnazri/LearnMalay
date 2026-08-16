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
import { getChatTurnRequirement, hasCompletedChapterRequirement, migrateLegacyCompletedChapterRevisions, migrateLegacyProgressChapter, MINIGAME_PREREQUISITE_CHAPTERS, WORLD_CHAPTER_IDS } from "../src/lib/chapterProgression.ts";

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

test("minigames use the new canonical unlock chapters and privileged users remain unlocked", () => {
  assert.deepEqual(MINIGAME_PREREQUISITE_CHAPTERS, {
    numbers: 5,
    "word-match": 2,
    wordsearch: 3,
    currency: 5,
    "makan-apa": 2,
    "misi-membeli": 11,
    "arah-jalan": 4,
  });

  assert.equal(hasCompletedChapterRequirement(2, MINIGAME_PREREQUISITE_CHAPTERS["makan-apa"]), false);
  assert.equal(hasCompletedChapterRequirement(3, MINIGAME_PREREQUISITE_CHAPTERS["makan-apa"]), true);
  assert.equal(hasCompletedChapterRequirement(5, MINIGAME_PREREQUISITE_CHAPTERS.numbers), false);
  assert.equal(hasCompletedChapterRequirement(5, MINIGAME_PREREQUISITE_CHAPTERS.currency), false);
  assert.equal(hasCompletedChapterRequirement(6, MINIGAME_PREREQUISITE_CHAPTERS.numbers), true);
  assert.equal(hasCompletedChapterRequirement(6, MINIGAME_PREREQUISITE_CHAPTERS.currency), true);
  assert.equal(hasCompletedChapterRequirement(1, MINIGAME_PREREQUISITE_CHAPTERS.numbers, true), true);
  assert.equal(hasCompletedChapterRequirement(1, MINIGAME_PREREQUISITE_CHAPTERS.currency, true), true);
});

test("legacy sequential progress and revision records map by completed content, not old numeric IDs", () => {
  assert.deepEqual(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(migrateLegacyProgressChapter),
    [1, 2, 2, 2, 2, 2, 2, 8, 9, 10, 11],
  );
  assert.deepEqual(
    migrateLegacyCompletedChapterRevisions({ "2": 4, "3": 5, "7": 2 }),
    { "2": 2, "3": 4, "7": 5 },
  );
});
