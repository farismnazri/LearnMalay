export type GameId = "numbers" | "word-match" | "wordsearch";

export type ScoreEntry = {
  id: string;
  name: string;
  accuracy: number; // 0..100
  timeMs: number;
  dateISO: string;
  meta?: Record<string, unknown>;
};

export type HighscoreStore = Record<GameId, ScoreEntry[]>;
