import type { GameId } from "./highscoresTypes";

export type ClientActivityEvent =
  | { eventId: string; type: "chapter_started"; chapterId: number }
  | { eventId: string; type: "minigame_started"; minigameId: GameId };
