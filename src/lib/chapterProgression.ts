export const CHAPTER_PROGRESSION_VERSION = 2;

export const LEGACY_TO_CURRENT_CHAPTER_ID: Readonly<Record<number, number>> = {
  1: 1,
  2: 3,
  3: 7,
  4: 4,
  5: 5,
  6: 6,
  7: 2,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
};

export const WORLD_CHAPTER_IDS = {
  1: [1, 2, 3, 4],
  2: [5, 6, 7, 8],
  3: [9, 10, 11],
} as const;

export const MINIGAME_PREREQUISITE_CHAPTERS = {
  numbers: 5,
  "word-match": 2,
  wordsearch: 3,
  currency: 5,
  "makan-apa": 2,
  "misi-membeli": 11,
  "arah-jalan": 4,
} as const;

export function getChapterWorldLevel(chapterId: number) {
  if (WORLD_CHAPTER_IDS[1].includes(chapterId as never)) return { world: 1, level: chapterId };
  if (WORLD_CHAPTER_IDS[2].includes(chapterId as never)) return { world: 2, level: chapterId - 4 };
  return { world: 3, level: Math.max(1, Math.min(3, chapterId - 8)) };
}

export function getChatTurnRequirement(chapterId: number) {
  return getChapterWorldLevel(chapterId).world === 1 ? 8 : 10;
}

export function hasCompletedChapterRequirement(
  progressChapter: number,
  requiredChapter: number,
  unlockEverything = false,
) {
  if (unlockEverything) return true;
  return requiredChapter === 11 ? progressChapter >= 11 : progressChapter > requiredChapter;
}

export function migrateLegacyProgressChapter(legacyProgressChapter: number) {
  const legacyCompleted = new Set<number>();
  for (let chapterId = 1; chapterId < legacyProgressChapter; chapterId += 1) {
    legacyCompleted.add(LEGACY_TO_CURRENT_CHAPTER_ID[chapterId] ?? chapterId);
  }

  let completedPrefixLength = 0;
  while (legacyCompleted.has(completedPrefixLength + 1)) {
    completedPrefixLength += 1;
  }

  return Math.min(11, completedPrefixLength + 1);
}

export function migrateLegacyCompletedChapterRevisions(revisions: Record<string, number>) {
  const migrated: Record<string, number> = {};
  for (const [legacyChapterId, revision] of Object.entries(revisions)) {
    const chapterId = Number(legacyChapterId);
    const currentChapterId = LEGACY_TO_CURRENT_CHAPTER_ID[chapterId] ?? chapterId;
    migrated[String(currentChapterId)] = revision;
  }
  return migrated;
}
