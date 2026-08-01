"use client";

import useSWR from "swr";
import type { GameId, HighscoreRun, HighscoreSaveResult, HighscoreStore, ScoreEntry } from "./highscoresTypes";

export class HighscoreRequestError extends Error {
  constructor(public readonly status: number, message: string) { super(message); this.name = "HighscoreRequestError"; }
}
const fetchJson = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(url, init);
  const text = await res.text().catch(() => "");
  let payload: unknown = null;
  if (text) {
    try { payload = JSON.parse(text); } catch { throw new HighscoreRequestError(res.status, `Invalid JSON from ${url}`); }
  }
  if (!res.ok) {
    const message = typeof payload === "object" && payload && "error" in payload && typeof payload.error === "string"
      ? payload.error : `Request to ${url} failed (${res.status})`;
    throw new HighscoreRequestError(res.status, message);
  }
  return payload as T;
};
export function useHighscores() { return useSWR<HighscoreStore>("/api/highscores", fetchJson, { revalidateOnFocus: false }); }
export async function loadHighScores(): Promise<HighscoreStore> { return fetchJson("/api/highscores"); }
export async function addHighScore(gameId: GameId, run: HighscoreRun): Promise<HighscoreSaveResult> {
  const request = () => fetchJson<HighscoreSaveResult>("/api/highscores", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ gameId, run }), keepalive: true,
  });
  try {
    return await request();
  } catch (error) {
    // The same runId makes this safe for transient network/server failures.
    if (error instanceof HighscoreRequestError && error.status >= 400 && error.status < 500) throw error;
    await new Promise((resolve) => window.setTimeout(resolve, 250));
    return request();
  }
}
export async function clearHighScores(gameId?: GameId) { return fetchJson("/api/highscores" + (gameId ? `?gameId=${encodeURIComponent(gameId)}` : ""), { method: "DELETE" }); }
export function createRunId() { return crypto.randomUUID(); }
export type { GameId, HighscoreRun, ScoreEntry };
