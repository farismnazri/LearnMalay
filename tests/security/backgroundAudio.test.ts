import test from "node:test";
import assert from "node:assert/strict";
import { BACKGROUND_TRACKS, getBackgroundAudioSrc } from "../../src/lib/backgroundAudio.ts";

test("maps routes to the four Learn Malay OST tracks", () => {
  assert.equal(getBackgroundAudioSrc("/"), BACKGROUND_TRACKS.main);
  assert.equal(getBackgroundAudioSrc("/map"), BACKGROUND_TRACKS.main);
  assert.equal(getBackgroundAudioSrc("/user"), BACKGROUND_TRACKS.main);
  assert.equal(getBackgroundAudioSrc("/chapter/7"), BACKGROUND_TRACKS.learning);
  assert.equal(getBackgroundAudioSrc("/minigames"), BACKGROUND_TRACKS.minigames);
  assert.equal(getBackgroundAudioSrc("/minigames/numbers/play"), BACKGROUND_TRACKS.minigames);
  assert.equal(getBackgroundAudioSrc("/minigames/highscores"), BACKGROUND_TRACKS.triumph);
});

test("routes sharing a category resolve to the same source", () => {
  assert.equal(getBackgroundAudioSrc("/"), getBackgroundAudioSrc("/map"));
  assert.equal(
    getBackgroundAudioSrc("/minigames/makan-apa"),
    getBackgroundAudioSrc("/minigames/makan-apa/play")
  );
});
