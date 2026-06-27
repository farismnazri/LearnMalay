import type { UserProfile } from "./userStoreTypes";

const FINAL_CHAPTER = 11;

type ChapterRevisionInfo = {
  id: number;
  revision: number;
};

export function getCompletedChapterRevision(user: UserProfile | null, chapterId: number) {
  return user?.completedChapterRevisions?.[String(chapterId)] ?? 0;
}

export function hasChapterUpdate(user: UserProfile | null, chapter: ChapterRevisionInfo) {
  if (!user) return false;
  const completed = chapter.id === FINAL_CHAPTER
    ? user.progress.chapter >= FINAL_CHAPTER
    : user.progress.chapter > chapter.id;
  if (!completed) return false;
  const completedRevision = getCompletedChapterRevision(user, chapter.id);
  return completedRevision > 0 && completedRevision < chapter.revision;
}
