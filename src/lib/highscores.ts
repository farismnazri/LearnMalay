// src/lib/highscores.ts
export type GameId = "numbers" | "word-match" | "wordsearch";

export type ScoreEntry = {
  id: string;
  name: string;
  accuracy: number; // 0..100
  timeMs: number;
  dateISO: string;
  meta?: Record<string, unknown>;
};

type Store = Record<GameId, ScoreEntry[]>;

const KEY = "learnMalay.highscores.v1";
const MAX_PER_GAME = 20;

function safeParse(json: string | null): Store | null {
  if (!json) return null;
  try {
    const v = JSON.parse(json) as unknown;
    if (!v || typeof v !== "object") return null;

    const obj = v as Partial<Store>;
    return {
      numbers: Array.isArray(obj.numbers) ? obj.numbers : [],
      "word-match": Array.isArray(obj["word-match"]) ? obj["word-match"] : [],
      wordsearch: Array.isArray(obj.wordsearch) ? obj.wordsearch : [],
    };
  } catch {
    return null;
  }
}

function sortScores(a: ScoreEntry, b: ScoreEntry) {
  if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy; // desc
  if (a.timeMs !== b.timeMs) return a.timeMs - b.timeMs; // asc
  return b.dateISO.localeCompare(a.dateISO); // newest first
}

function uid() {
  // works in modern browsers; fallback if needed
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function loadHighScores(): Store {
  if (typeof window === "undefined") return { numbers: [], "word-match": [] };
  return safeParse(window.localStorage.getItem(KEY)) ?? { numbers: [], "word-match": [] };
}

export function saveHighScores(store: Store) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(store));
}

export function addHighScore(gameId: GameId, entry: Omit<ScoreEntry, "id" | "dateISO"> & Partial<Pick<ScoreEntry, "id" | "dateISO">>) {
  const store = loadHighScores();
  const full: ScoreEntry = {
    id: entry.id ?? uid(),
    dateISO: entry.dateISO ?? new Date().toISOString(),
    name: entry.name,
    accuracy: Math.max(0, Math.min(100, entry.accuracy)),
    timeMs: Math.max(0, entry.timeMs),
    meta: entry.meta,
  };

  const merged = [...store[gameId], full].sort(sortScores).slice(0, MAX_PER_GAME);
  const next: Store = { ...store, [gameId]: merged };

  saveHighScores(next);
  return next;
}

export function clearHighScores(gameId?: GameId) {
  if (typeof window === "undefined") return;
  if (!gameId) {
    window.localStorage.removeItem(KEY);
    return;
  }
  const store = loadHighScores();
  store[gameId] = [];
  saveHighScores(store);
}
