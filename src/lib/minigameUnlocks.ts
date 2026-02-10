import type { UserProfile } from "./userStoreTypes";

export type UnlockableMinigameId = "numbers" | "word-match" | "wordsearch" | "currency";

export const MINIGAME_PREREQUISITES: Record<UnlockableMinigameId, number> = {
  numbers: 1,
  "word-match": 2,
  wordsearch: 3,
  currency: 5,
};

export const MINIGAME_UNLOCK_ORDER: UnlockableMinigameId[] = [
  "numbers",
  "word-match",
  "wordsearch",
  "currency",
];

export function hasCompletedChapter(user: UserProfile | null, chapter: number) {
  if (!user) return false;
  if (user.isAdmin) return true;
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
