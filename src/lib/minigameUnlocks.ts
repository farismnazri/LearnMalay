import type { UserProfile } from "./userStoreTypes";
import { canUnlockEverything } from "./userCapabilities";
import { hasCompletedChapterRequirement, MINIGAME_PREREQUISITE_CHAPTERS } from "./chapterProgression";

export type UnlockableMinigameId =
  | "numbers"
  | "word-match"
  | "wordsearch"
  | "currency"
  | "makan-apa"
  | "misi-membeli"
  | "arah-jalan";

export const MINIGAME_PREREQUISITES: Record<UnlockableMinigameId, number> = MINIGAME_PREREQUISITE_CHAPTERS;

export const MINIGAME_UNLOCK_ORDER: UnlockableMinigameId[] = [
  "word-match",
  "makan-apa",
  "wordsearch",
  "arah-jalan",
  "numbers",
  "currency",
  "misi-membeli",
];

export function isChapterUnlocked(user: UserProfile | null, chapter: number) {
  if (!user) return false;
  if (canUnlockEverything(user)) return true;
  return user.progress.chapter >= chapter;
}

export function hasCompletedChapter(user: UserProfile | null, chapter: number) {
  if (!user) return false;
  return hasCompletedChapterRequirement(user.progress.chapter, chapter, canUnlockEverything(user));
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
