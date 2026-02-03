"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { GameId, ScoreEntry } from "@/lib/highscores";
import { clearHighScores, loadHighScores } from "@/lib/highscores";

import { getCurrentUser, listUsers, ADMIN_ID } from "@/lib/userStore";

// If you already have this constant elsewhere, import it instead.
// e.g. import { ADMIN_PASSWORD } from "@/lib/admin";
const ADMIN_PASSWORD = "admin";

const ALL_USERS = "__ALL__";

function activityCount(s: ScoreEntry) {
  const meta = (s.meta ?? {}) as Record<string, unknown>;

  const a =
    typeof meta.attempts === "number"
      ? meta.attempts
      : typeof meta.totalAttempts === "number"
      ? meta.totalAttempts
      : typeof meta.totalCorrect === "number" && typeof meta.totalWrong === "number"
      ? meta.totalCorrect + meta.totalWrong
      : 0;

  return Number.isFinite(a) ? a : 0;
}

function formatDuration(ms: number) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function HighScoresPage() {
  const me = getCurrentUser();
  const isAdmin = me?.id === ADMIN_ID || me?.isAdmin === true;


  const [gameId, setGameId] = useState<GameId>("numbers");

  // Load scores once on first client render, and refresh when clearing
  const [store, setStore] = useState(() => loadHighScores());

  // Load known users once (from your userStore)
  const [users] = useState(() => listUsers());

  // Default filter: current user if exists, otherwise All
  const [userFilter, setUserFilter] = useState<string>(() => {
    const me = getCurrentUser();
    return me?.name ?? ALL_USERS;
  });

  // --- admin modal state ---
  const [pwOpen, setPwOpen] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState<string | null>(null);

  const baseRows: ScoreEntry[] = useMemo(() => store[gameId] ?? [], [store, gameId]);

  // Build dropdown options = users + any names already in highscores (e.g., Guest)
  const userOptions = useMemo(() => {
    const s = new Set<string>();

    for (const u of users) if (u.name) s.add(u.name);
    for (const r of baseRows) if (r.name) s.add(r.name);

    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [users, baseRows]);

  const filteredRows = useMemo(() => {
    if (userFilter === ALL_USERS) return baseRows;
    return baseRows.filter((r) => r.name === userFilter);
  }, [baseRows, userFilter]);

  // ✅ Sort by Activities first, then Accuracy, then Time
  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((a, b) => {
      const act = activityCount(b) - activityCount(a);
      if (act !== 0) return act;

      if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
      if (a.timeMs !== b.timeMs) return a.timeMs - b.timeMs;
      return b.dateISO.localeCompare(a.dateISO);
    });
  }, [filteredRows]);

  function showMine() {
    const me = getCurrentUser();
    if (!me?.name) return;
    setUserFilter(me.name);
  }

  function requestClear() {
    setPw("");
    setPwError(null);
    setPwOpen(true);
  }

    function confirmClear() {
    if (!isAdmin) {
        setPwError("Admin only.");
        return;
    }
    if (pw !== ADMIN_PASSWORD) {
        setPwError("Wrong admin password.");
        return;
    }

    clearHighScores(gameId);
    setStore(loadHighScores());

    setPwOpen(false);
    setPw("");
    setPwError(null);
    }


  return (
    <main
      className="relative min-h-screen bg-cover bg-center px-6 py-10"
      style={{ backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="crash-text crash-outline-fallback text-6xl font-black leading-none">
              HIGH SCORES
            </h1>
            <p className="mt-2 text-sm font-semibold text-white/90">
              Filter by minigame and player.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/minigames"
              className="rounded-xl bg-white/90 px-4 py-2 text-xs font-black shadow hover:bg-white"
            >
              Back to Mini Games
            </Link>

            {isAdmin && (
            <button
                type="button"
                onClick={requestClear}
                className="rounded-xl bg-rose-100/90 px-4 py-2 text-xs font-black shadow hover:bg-rose-100"
            >
                Clear this game
            </button>
            )}

          </div>
        </div>

        <section className="mt-8 rounded-3xl bg-white/90 p-6 shadow-xl">
          {/* Controls row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="mr-2 text-xs font-black opacity-60">GAME</div>

              <button
                type="button"
                onClick={() => setGameId("numbers")}
                className={[
                  "rounded-full px-4 py-2 text-xs font-black shadow transition",
                  gameId === "numbers" ? "bg-amber-300" : "bg-white hover:bg-amber-100",
                ].join(" ")}
              >
                Numbers
              </button>

              <button
                type="button"
                onClick={() => setGameId("word-match")}
                className={[
                  "rounded-full px-4 py-2 text-xs font-black shadow transition",
                  gameId === "word-match" ? "bg-amber-300" : "bg-white hover:bg-amber-100",
                ].join(" ")}
              >
                Word Match
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="text-xs font-black opacity-60">USER</div>

              <select
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-black shadow outline-none"
              >
                <option value={ALL_USERS}>All users</option>
                {userOptions.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={showMine}
                className="rounded-xl bg-white px-3 py-2 text-xs font-black shadow hover:bg-amber-100"
              >
                My scores
              </button>
            </div>
          </div>

          <div className="mt-3 text-xs font-semibold opacity-70">
            Showing {sortedRows.length} of {baseRows.length}
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[860px] border-separate border-spacing-0 overflow-hidden rounded-2xl">
              <thead>
                <tr className="bg-amber-200">
                  <th className="border border-black/10 p-4 text-left align-top">
                    <div className="text-xs font-black opacity-70">#</div>
                  </th>
                  <th className="border border-black/10 p-4 text-left align-top">
                    <div className="text-xs font-black opacity-70">NAME</div>
                  </th>
                  <th className="border border-black/10 p-4 text-left align-top">
                    <div className="text-xs font-black opacity-70">ACTIVITIES</div>
                  </th>
                  <th className="border border-black/10 p-4 text-left align-top">
                    <div className="text-xs font-black opacity-70">ACCURACY</div>
                  </th>
                  <th className="border border-black/10 p-4 text-left align-top">
                    <div className="text-xs font-black opacity-70">TIME</div>
                  </th>
                  <th className="border border-black/10 p-4 text-left align-top">
                    <div className="text-xs font-black opacity-70">DATE</div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedRows.length === 0 ? (
                  <tr className="bg-white/95">
                    <td className="border border-black/10 p-6" colSpan={6}>
                      <div className="text-sm font-semibold opacity-70">
                        No scores for this filter yet.
                      </div>
                    </td>
                  </tr>
                ) : (
                  sortedRows.map((r, idx) => (
                    <tr key={r.id} className="bg-white/95">
                      <td className="border border-black/10 p-4 align-top">
                        <div className="text-sm font-black">{idx + 1}</div>
                      </td>

                      <td className="border border-black/10 p-4 align-top">
                        <div className="text-sm font-extrabold">{r.name}</div>
                      </td>

                      <td className="border border-black/10 p-4 align-top">
                        <div className="text-sm font-extrabold">{activityCount(r)}</div>
                      </td>

                      <td className="border border-black/10 p-4 align-top">
                        <div className="text-sm font-extrabold">{Math.round(r.accuracy)}%</div>
                      </td>

                      <td className="border border-black/10 p-4 align-top">
                        <div className="text-sm font-extrabold">{formatDuration(r.timeMs)}</div>
                      </td>

                      <td className="border border-black/10 p-4 align-top">
                        <div className="text-sm font-semibold opacity-80">{formatDate(r.dateISO)}</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-2xl bg-black/5 p-4">
            <div className="text-xs font-black opacity-60">SCORING</div>
            <div className="mt-1 text-sm font-semibold opacity-70">
              Ranked by activities (higher), then accuracy (higher), then time (lower).
            </div>
          </div>
        </section>
      </div>

      {/* ✅ Admin password modal */}
      {pwOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => {
              setPwOpen(false);
              setPw("");
              setPwError(null);
            }}
          />
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="text-lg font-black">Admin approval required</div>
            <div className="mt-1 text-sm font-semibold opacity-70">
              Enter the admin password to clear <span className="font-black">{gameId}</span> highscores.
            </div>

            <input
              autoFocus
              type="password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                setPwError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirmClear();
                if (e.key === "Escape") setPwOpen(false);
              }}
              className="mt-4 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold shadow outline-none"
              placeholder="Admin password"
            />

            {pwError && (
              <div className="mt-3 rounded-2xl bg-rose-100 p-3 text-sm font-semibold text-rose-900">
                {pwError}
              </div>
            )}

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setPwOpen(false);
                  setPw("");
                  setPwError(null);
                }}
                className="rounded-xl bg-white px-4 py-2 text-xs font-black shadow hover:bg-black/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmClear}
                className="rounded-xl bg-rose-200 px-4 py-2 text-xs font-black shadow hover:bg-rose-300"
              >
                Confirm clear
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
