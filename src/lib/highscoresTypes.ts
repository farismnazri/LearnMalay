import type { ProfileAvatarId } from "./profileAvatars";

export type GameId = "numbers" | "word-match" | "wordsearch" | "currency" | "misi-membeli";

export type ScoreEntry = {
  id: string;
  name: string;
  avatarId?: ProfileAvatarId;
  accuracy: number; // 0..100
  timeMs: number;
  dateISO: string;
  meta?: Record<string, unknown>;
};

export type HighscoreStore = Record<GameId, ScoreEntry[]>;
