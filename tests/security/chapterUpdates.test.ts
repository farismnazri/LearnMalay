import assert from "node:assert/strict";
import test from "node:test";
import { chapter01 } from "../../src/lib/chapters/chapter-01.ts";
import { hasChapterUpdate } from "../../src/lib/chapterUpdates.ts";
import type { UserProfile } from "../../src/lib/userStoreTypes.ts";

function userAt(progressChapter: number, completedRevision?: number): UserProfile {
  return {
    id: "TEST",
    name: "TEST",
    avatarId: "crash",
    role: "user",
    progress: { chapter: progressChapter, page: 1 },
    completedChapterRevisions:
      completedRevision === undefined ? {} : { "1": completedRevision },
  };
}

test("update badge requires a completed chapter and an older recorded revision", () => {
  const updatedChapter = { ...chapter01, revision: 2 };

  assert.equal(hasChapterUpdate(userAt(1, 1), updatedChapter), false);
  assert.equal(hasChapterUpdate(userAt(2), updatedChapter), false);
  assert.equal(hasChapterUpdate(userAt(2, 1), updatedChapter), true);
  assert.equal(hasChapterUpdate(userAt(2, 2), updatedChapter), false);
});

test("viewing state alone cannot clear a chapter update", () => {
  const updatedChapter = { ...chapter01, revision: 2 };
  const user = userAt(2, 1);

  assert.equal(hasChapterUpdate(user, updatedChapter), true);
  assert.equal(hasChapterUpdate(user, updatedChapter), true);
  assert.equal(user.completedChapterRevisions["1"], 1);
});
