import test from "node:test";
import assert from "node:assert/strict";
import {
  PROFILE_AVATARS,
  PROFILE_AVATAR_FALLBACK_SRC,
  getProfileAvatarSrc,
  resolveStoredProfileAvatar,
} from "../../src/lib/profileAvatars.ts";

test("current profile choices contain only the twelve Learn Malay icons", () => {
  assert.deepEqual(
    PROFILE_AVATARS.map((avatar) => avatar.id),
    ["bada", "hela", "jaja", "kancil", "kija", "kumba", "lada", "nyu", "raja", "rima", "rusi", "yaya"]
  );
});

test("legacy stored avatar resolves to a neutral fallback and requires migration", () => {
  const legacy = resolveStoredProfileAvatar("crash");
  assert.deepEqual(legacy, { avatarId: null, migrationRequired: true });
  assert.equal(getProfileAvatarSrc(legacy.avatarId), PROFILE_AVATAR_FALLBACK_SRC);

  const current = resolveStoredProfileAvatar("kija");
  assert.deepEqual(current, { avatarId: "kija", migrationRequired: false });
});
