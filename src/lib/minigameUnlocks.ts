import type { UserProfile } from "./userStoreTypes";

const FINAL_CHAPTER = 11;

export type UnlockableMinigameId = "numbers" | "word-match" | "wordsearch" | "currency" | "misi-membeli";

export const MINIGAME_PREREQUISITES: Record<UnlockableMinigameId, number> = {
  numbers: 1,
  "word-match": 2,
  wordsearch: 3,
  currency: 5,
  "misi-membeli": 11,
};

export const MINIGAME_UNLOCK_ORDER: UnlockableMinigameId[] = [
  "numbers",
  "word-match",
  "wordsearch",
  "currency",
  "misi-membeli",
];

export function hasCompletedChapter(user: UserProfile | null, chapter: number) {
  if (!user) return false;
  if (user.isAdmin) return true;
  // Chapter 11 is the final chapter today, so there is no "chapter 12" progress marker.
  if (chapter === FINAL_CHAPTER) return user.progress.chapter >= FINAL_CHAPTER;
  return user.progress.chapter > chapter;
}

export function isMinigameUnlocked(user: UserProfile | null, gameId: UnlockableMinigameId) {
  return hasCompletedChapter(user, MINIGAME_PREREQUISITES[gameId]);
}

export function getLatestUnlockedMinigameId(user: UserProfile | null): UnlockableMinigameId | null {
  if (!user) return null;
  let latest: UnlockableMinigameId | null = null;
  for (const id of MINIGAME_UNLOCK_ORDER) {
    if (isMinigameUnlocked(user, id)) latest = id;
  }
  return latest;
}
