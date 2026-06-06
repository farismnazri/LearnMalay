import type { ChapterContent } from "./chapters";
import type { UserProfile } from "./userStoreTypes";

const FINAL_CHAPTER = 11;

export function getCompletedChapterRevision(user: UserProfile | null, chapterId: number) {
  return user?.completedChapterRevisions?.[String(chapterId)] ?? 0;
}

export function hasChapterUpdate(user: UserProfile | null, chapter: ChapterContent) {
  if (!user) return false;
  const completed = chapter.id === FINAL_CHAPTER
    ? user.progress.chapter >= FINAL_CHAPTER
    : user.progress.chapter > chapter.id;
  if (!completed) return false;
  const completedRevision = getCompletedChapterRevision(user, chapter.id);
  return completedRevision > 0 && completedRevision < chapter.revision;
}
