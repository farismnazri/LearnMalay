import type { ProfileAvatarId } from "./profileAvatars";

export type GameId =
  | "numbers"
  | "word-match"
  | "wordsearch"
  | "currency"
  | "makan-apa"
  | "misi-membeli"
  | "arah-jalan";

export const VALID_HIGHSCORE_GAME_IDS = [
  "numbers",
  "word-match",
  "wordsearch",
  "currency",
  "makan-apa",
  "misi-membeli",
  "arah-jalan",
] as const satisfies readonly GameId[];

export function isValidHighscoreGameId(value: unknown): value is GameId {
  return typeof value === "string" && VALID_HIGHSCORE_GAME_IDS.includes(value as GameId);
}

export type ScoreEntry = {
  id: string;
  name: string;
  avatarId?: ProfileAvatarId;
  score?: number;
  accuracy: number; // 0..100
  timeMs: number;
  dateISO: string;
  meta?: Record<string, unknown>;
};

export type HighscoreStore = Record<GameId, ScoreEntry[]>;
