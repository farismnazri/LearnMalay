import type { ProfileAvatarId } from "./profileAvatars.ts";

export type GameId =
  | "numbers"
  | "word-match"
  | "wordsearch"
  | "currency"
  | "makan-apa"
  | "misi-membeli"
  | "arah-jalan";

export const VALID_HIGHSCORE_GAME_IDS = [
  "numbers", "word-match", "wordsearch", "currency", "makan-apa", "misi-membeli", "arah-jalan",
] as const satisfies readonly GameId[];

export function isValidHighscoreGameId(value: unknown): value is GameId {
  return typeof value === "string" && VALID_HIGHSCORE_GAME_IDS.includes(value as GameId);
}

export type RunOutcome = "completed" | "failed" | "abandoned";

export type RunResultV2 = {
  runId: string;
  scoreVersion: 2;
  outcome: RunOutcome;
  competitive: boolean;
  accuracy: number;
  timeMs: number;
  attempts: number;
  correct: number;
  mistakes: number;
  hints: number;
  difficulty?: string;
  mode?: string;
  targetLanguage?: "en" | "es";
  theme?: string;
  score?: number;
  averageCorrectResponseTimeMs?: number;
  meta?: Record<string, string | number | boolean | null>;
};

export type HighscoreSaveResult = {
  ok: true;
  saved: boolean;
  duplicate: boolean;
  competitive: boolean;
  reason?: "history" | "saved" | "duplicate";
};

export type ScoreEntry = {
  id: string;
  name: string;
  avatarId?: ProfileAvatarId;
  score?: number;
  accuracy: number;
  timeMs: number;
  dateISO: string;
  meta?: Record<string, unknown>;
  runId?: string;
  scoreVersion?: 2;
  userId?: string;
  outcome?: RunOutcome;
  competitive?: boolean;
  attempts?: number;
  correct?: number;
  mistakes?: number;
  hints?: number;
  difficulty?: string;
  mode?: string;
  targetLanguage?: "en" | "es";
  theme?: string;
  averageCorrectResponseTimeMs?: number;
};

export type HighscoreStore = Record<GameId, ScoreEntry[]>;
