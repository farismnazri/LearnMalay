import assert from "node:assert/strict";
import test from "node:test";

import { recordActivityEvent } from "../src/server/activityRepo.ts";
import { getCollections, type UserDocument } from "../src/server/db.ts";

const USER_ID = "ACTIVITY_REPO_TEST";

test("activity events persist, deduplicate, and throttle last-active writes", { concurrency: false }, async () => {
  const collections = await getCollections();
  const user: UserDocument = {
    id: USER_ID,
    name: "Activity Test",
    avatar_id: "bada",
    avatar_migration_version: 1,
    is_admin: false,
    progress_chapter: 1,
    progress_page: 1,
    completed_chapter_revisions: {},
    chapter_progression_version: 2,
    password_hash: null,
    password_salt: null,
    password_algo: null,
  };
  await collections.users.insertOne(user);

  try {
    const first = await recordActivityEvent({
      userId: USER_ID,
      eventId: "30000000-0000-4000-8000-000000000001",
      type: "minigame_started",
      minigameId: "numbers",
      timestamp: new Date("2026-08-22T09:00:00.000Z"),
    });
    const duplicate = await recordActivityEvent({
      userId: USER_ID,
      eventId: "30000000-0000-4000-8000-000000000001",
      type: "minigame_started",
      minigameId: "numbers",
      timestamp: new Date("2026-08-22T09:01:00.000Z"),
    });
    await recordActivityEvent({
      userId: USER_ID,
      eventId: "30000000-0000-4000-8000-000000000002",
      type: "chapter_started",
      chapterId: 1,
      timestamp: new Date("2026-08-22T09:02:00.000Z"),
    });

    assert.deepEqual(first, { saved: true });
    assert.deepEqual(duplicate, { saved: false });
    assert.equal((await collections.activityEvents.find({ user_id: USER_ID }).toArray()).length, 2);
    assert.equal((await collections.users.findOne({ id: USER_ID }))?.last_active_at, "2026-08-22T09:00:00.000Z");

    await recordActivityEvent({
      userId: USER_ID,
      eventId: "30000000-0000-4000-8000-000000000003",
      type: "chapter_started",
      chapterId: 1,
      timestamp: new Date("2026-08-22T09:06:00.000Z"),
    });
    assert.equal((await collections.users.findOne({ id: USER_ID }))?.last_active_at, "2026-08-22T09:06:00.000Z");
  } finally {
    await collections.activityEvents.deleteMany({ user_id: USER_ID });
    await collections.users.deleteOne({ id: USER_ID });
  }
});
