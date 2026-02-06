"use client";

import useSWR from "swr";
import type { GameId, HighscoreStore, ScoreEntry } from "./highscoresTypes";

const fetchJson = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(url, init);
  const text = await res.text().catch(() => "");
  if (!res.ok) {
    console.error(`Request to ${url} failed`, res.status, text);
    return null as T;
  }
  if (!text) return null as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`Invalid JSON from ${url}`);
  }
};

export function useHighscores() {
  return useSWR<HighscoreStore>("/api/highscores", fetchJson, {
    revalidateOnFocus: false,
  });
}

export async function loadHighScores(): Promise<HighscoreStore> {
  return fetchJson("/api/highscores");
}

export async function addHighScore(
  gameId: GameId,
  entry: Omit<ScoreEntry, "id" | "dateISO"> & Partial<Pick<ScoreEntry, "id" | "dateISO">>
) {
  return fetchJson("/api/highscores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameId, entry }),
  });
}

export async function clearHighScores(gameId?: GameId) {
  return fetchJson("/api/highscores" + (gameId ? `?gameId=${encodeURIComponent(gameId)}` : ""), {
    method: "DELETE",
  });
}

export type { GameId, ScoreEntry };
