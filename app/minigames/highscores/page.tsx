"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import IconActionLink from "@/components/navigation/IconActionLink";
import {
  HIGHSCORE_GAME_CONFIG,
  highscoreAttempts,
  highscoreColumnsForRows,
  highscoreDifficulty,
  highscoreDifficultyLabel,
  highscoreMode,
  highscoreNumericScore,
  highscoreTheme,
  highscoreWords,
  sortHighscoreRows,
  type HighscoreColumnDefinition,
} from "@/lib/highscoreRanking";
import type { GameId, ScoreEntry } from "@/lib/highscores";
import { clearHighScores, loadHighScores } from "@/lib/highscores";
import { getProfileAvatarSrc, type ProfileAvatarId } from "@/lib/profileAvatars";
import { canManageUsers, canResetHighscores, isAdmin, isDemo } from "@/lib/userCapabilities";
import { getCurrentUser, listUsers, verifyAdminPassword } from "@/lib/userStore";

const ALL_USERS = "__ALL__";
const ALL_DIFFICULTIES = "__ALL_DIFFICULTIES__";
const DISPLAY_LIMIT = 20;

const GAMES: Array<{ id: GameId; label: string }> = [
  { id: "numbers", label: "Numbers" },
  { id: "word-match", label: "Word Match" },
  { id: "wordsearch", label: "Wordsearch" },
  { id: "currency", label: "Currency" },
  { id: "makan-apa", label: "Makan Apa" },
  { id: "misi-membeli", label: "Misi Membeli" },
  { id: "arah-jalan", label: "Arah Jalan" },
];

const FILTER_DIFFICULTIES: Partial<Record<GameId, readonly string[]>> = {
  numbers: ["ultrahard", "hard", "medium", "easy", "unknown"],
  wordsearch: ["hard", "medium", "easy", "unknown"],
  "arah-jalan": ["hard", "easy", "unknown"],
};

function formatDuration(ms: number) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function formatLabel(value: string | undefined) {
  if (!value) return "—";
  if (value === "ultrahard") return "Ultra Hard";
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function columnValue(gameId: GameId, row: ScoreEntry, column: HighscoreColumnDefinition, rank: number) {
  if (column.key === "rank") return rank;
  if (column.key === "username") return row.name;
  if (column.key === "accuracy") return `${Math.round(row.accuracy)}%`;
  if (column.key === "time") return formatDuration(row.timeMs);
  if (column.key === "difficulty") return highscoreDifficultyLabel(row) ?? "—";
  if (column.key === "attempts") return highscoreAttempts(gameId, row) ?? "—";
  if (column.key === "streak") return highscoreNumericScore(row);
  if (column.key === "theme") return formatLabel(highscoreTheme(row));
  if (column.key === "mode") return formatLabel(highscoreMode(row));
  if (column.key === "words") return highscoreWords(row) ?? "—";
  return formatDate(row.dateISO);
}

export default function HighScoresPage() {
  const [gameId, setGameId] = useState<GameId>("numbers");
  const [me, setMe] = useState<Awaited<ReturnType<typeof getCurrentUser>>>(null);
  const [store, setStore] = useState<Record<GameId, ScoreEntry[]>>({
    numbers: [],
    "word-match": [],
    wordsearch: [],
    currency: [],
    "makan-apa": [],
    "misi-membeli": [],
    "arah-jalan": [],
  });
  const [users, setUsers] = useState<Awaited<ReturnType<typeof listUsers>>>([]);
  const [userFilter, setUserFilter] = useState(ALL_USERS);
  const [difficultyFilter, setDifficultyFilter] = useState(ALL_DIFFICULTIES);
  const [pwOpen, setPwOpen] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const [scores, currentUser] = await Promise.all([loadHighScores(), getCurrentUser()]);
      const knownUsers = canManageUsers(currentUser) ? await listUsers().catch(() => []) : [];
      setUsers(knownUsers);
      setStore(scores);
      setMe(currentUser);
      setUserFilter(currentUser?.name ?? ALL_USERS);
    }
    void load();
  }, []);

  const allRows = useMemo(() => store[gameId] ?? [], [store, gameId]);
  const avatarByName = useMemo(() => {
    const avatars = new Map<string, ProfileAvatarId | null>();
    for (const user of users) avatars.set(user.name.toUpperCase(), user.avatarId);
    return avatars;
  }, [users]);
  const userOptions = useMemo(() => {
    const names = new Set<string>();
    if (me?.name) names.add(me.name);
    for (const user of users) if (user.name) names.add(user.name);
    for (const row of allRows) if (row.name) names.add(row.name);
    return Array.from(names).sort((a, b) => a.localeCompare(b));
  }, [allRows, me, users]);

  const difficultyOptions = FILTER_DIFFICULTIES[gameId];
  const filteredRows = useMemo(() => {
    const byUser = userFilter === ALL_USERS ? allRows : allRows.filter((row) => row.name === userFilter);
    if (!difficultyOptions || difficultyFilter === ALL_DIFFICULTIES) return byUser;
    return byUser.filter((row) => (highscoreDifficulty(row) ?? "unknown") === difficultyFilter);
  }, [allRows, difficultyFilter, difficultyOptions, userFilter]);
  const rankedRows = useMemo(() => sortHighscoreRows(gameId, filteredRows), [filteredRows, gameId]);
  const displayedRows = useMemo(() => rankedRows.slice(0, DISPLAY_LIMIT), [rankedRows]);
  const columns = useMemo(() => highscoreColumnsForRows(gameId, filteredRows), [filteredRows, gameId]);
  const detailColumns = columns.filter((column) => !["rank", "username", "date"].includes(column.key));

  function pickGame(next: GameId) {
    setGameId(next);
    setDifficultyFilter(ALL_DIFFICULTIES);
  }

  function requestClear() {
    setPw("");
    setPwError(null);
    setPwOpen(true);
  }

  async function confirmClear() {
    if (!canResetHighscores(me)) {
      setPwError("Admin only.");
      return;
    }
    if (!(await verifyAdminPassword(pw))) {
      setPwError("Wrong admin password.");
      return;
    }
    await clearHighScores(gameId);
    setStore(await loadHighScores());
    setPwOpen(false);
    setPw("");
    setPwError(null);
  }

  const activeUserLabel = userFilter === ALL_USERS ? "All users" : userFilter;

  return (
    <main className="chapter-page-shell relative min-h-screen overflow-x-hidden app-page-pad">
      <div className="chapter-viewport-bg" aria-hidden="true">
        <div className="chapter-viewport-bg-image" />
        <div className="chapter-viewport-bg-fade" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 tablet:flex-row tablet:items-start tablet:justify-between">
          <div className="w-full max-w-3xl rounded-3xl border border-[#c7deaa]/45 bg-[#153525]/75 p-4 shadow-[0_20px_55px_rgba(0,0,0,0.45)] backdrop-blur-md phone-lg:p-5">
            <div className="flex items-center gap-4">
              <Image
                src={getProfileAvatarSrc(me?.avatarId)}
                alt="Current user avatar"
                width={60}
                height={60}
                className="h-14 w-14 rounded-full border-2 border-[#f8da72]/75 bg-white/95 object-cover shadow-lg"
              />
              <div>
                <h1 className="crash-text crash-outline-fallback text-5xl font-black leading-none text-[#ffde66] drop-shadow-[0_3px_0_rgba(0,0,0,0.45)] phone-lg:text-6xl">
                  HIGH SCORES
                </h1>
                <p className="mt-1 text-sm font-semibold text-[#eaf6d8]/95">Filter by minigame and player.</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#bdd89f]/60 bg-[#2f5f34]/75 px-3 py-1 text-[11px] font-black tracking-wide text-[#f2fbdc]">
                Showing {displayedRows.length} of {filteredRows.length}
              </span>
              <span className="rounded-full border border-[#f0d487]/60 bg-[#72531e]/65 px-3 py-1 text-[11px] font-black tracking-wide text-[#fff0bf]">
                User: {activeUserLabel}
              </span>
              {difficultyOptions && (
                <span className="rounded-full border border-[#d6cb95]/70 bg-[#fff2c9] px-3 py-1 text-[11px] font-black tracking-wide text-[#4f3a00]">
                  Difficulty: {difficultyFilter === ALL_DIFFICULTIES ? "All difficulties" : formatLabel(difficultyFilter)}
                </span>
              )}
              {isAdmin(me) && (
                <span className="rounded-full border border-rose-300/70 bg-rose-100 px-3 py-1 text-[11px] font-black tracking-wide text-rose-900">ADMIN</span>
              )}
              {isDemo(me) && (
                <span className="rounded-full border border-[#f7d87f]/80 bg-[#fff2c7] px-3 py-1 text-[11px] font-black tracking-wide text-[#5c4500]">DEMO</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 rounded-2xl border border-[#bfd9a0]/45 bg-[#173728]/70 p-2 shadow-xl backdrop-blur-md">
            <IconActionLink href="/minigames" kind="minigames" tooltip="Back to Mini Games" iconClassName="brightness-0 invert" />
            {canResetHighscores(me) && (
              <button
                type="button"
                onClick={requestClear}
                className="touch-target rounded-xl border border-rose-300/65 bg-rose-100 px-4 py-2 text-xs font-black text-rose-900 shadow hover:bg-rose-200"
              >
                Clear this game
              </button>
            )}
          </div>
        </div>

        <section className="mt-4 rounded-3xl border border-[#d2c68f]/55 bg-[#fff5d8]/93 p-4 shadow-[0_16px_36px_rgba(0,0,0,0.25)] phone-lg:mt-8 phone-lg:p-6">
          <div className="space-y-4">
            <div>
              <div className="mb-2 text-xs font-black tracking-wide opacity-65">GAME</div>
              <div className="overflow-x-auto pb-1">
                <div className="flex min-w-max items-center gap-2 pr-1">
                  {GAMES.map((game) => (
                    <button
                      key={game.id}
                      type="button"
                      onClick={() => pickGame(game.id)}
                      className={[
                        "touch-target rounded-full border px-4 py-2 text-xs font-black shadow transition",
                        gameId === game.id
                          ? "border-[#e6bc56] bg-[#ffd447] text-[#3f2f00]"
                          : "border-[#d8cd99]/70 bg-white/90 text-[#273d1e] hover:bg-[#ffefbf]",
                      ].join(" ")}
                    >
                      {game.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="text-xs font-black tracking-wide opacity-65">USER</div>
              <select
                value={userFilter}
                onChange={(event) => setUserFilter(event.target.value)}
                className="touch-target rounded-xl border border-[#d5c98e]/70 bg-white/90 px-3 py-2 text-xs font-black text-[#243a1c] shadow outline-none focus:border-[#e7bf56]"
              >
                <option value={ALL_USERS}>All users</option>
                {userOptions.map((name) => <option key={name} value={name}>{name}</option>)}
              </select>
              <button
                type="button"
                onClick={() => me?.name && setUserFilter(me.name)}
                className="touch-target rounded-xl border border-[#d8cc95]/70 bg-white/90 px-3 py-2 text-xs font-black text-[#273d1e] shadow hover:bg-[#ffefbf]"
              >
                My scores
              </button>
            </div>

            {difficultyOptions && (
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-xs font-black tracking-wide opacity-65">DIFFICULTY</div>
                <select
                  value={difficultyFilter}
                  onChange={(event) => setDifficultyFilter(event.target.value)}
                  className="touch-target rounded-xl border border-[#d5c98e]/70 bg-white/90 px-3 py-2 text-xs font-black text-[#243a1c] shadow outline-none focus:border-[#e7bf56]"
                >
                  <option value={ALL_DIFFICULTIES}>All difficulties</option>
                  {difficultyOptions.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>{formatLabel(difficulty)}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="mt-3 text-xs font-semibold text-[#2c431f]/75">
            {HIGHSCORE_GAME_CONFIG[gameId].scoringDescription}
          </div>

          <div className="mt-5 space-y-3 tablet:hidden">
            {displayedRows.length === 0 ? (
              <div className="rounded-2xl border border-[#d7cb98]/70 bg-white/95 p-4 text-sm font-semibold text-[#2d431e]/70 shadow">
                No scores for this filter yet.
              </div>
            ) : displayedRows.map((row, index) => (
              <article key={row.id} className="rounded-2xl border border-[#d7cb98]/70 bg-white/95 p-3 shadow">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Image
                      src={getProfileAvatarSrc(row.avatarId ?? avatarByName.get(row.name.toUpperCase()))}
                      alt={`${row.name} avatar`}
                      width={34}
                      height={34}
                      className="h-[34px] w-[34px] rounded-full border border-black/10 bg-white object-cover shadow"
                    />
                    <div className="text-sm font-black text-[#273d1e]">{row.name}</div>
                  </div>
                  <div className="rounded-full bg-[#ffe9a8] px-2 py-1 text-[11px] font-black text-[#4f3a00]">#{index + 1}</div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold text-[#2f421f]">
                  {detailColumns.map((column) => (
                    <div key={column.key}>{column.label}: {columnValue(gameId, row, column, index + 1)}</div>
                  ))}
                </div>
                <div className="mt-2 text-xs font-semibold text-[#2d431e]/80">{formatDate(row.dateISO)}</div>
              </article>
            ))}
          </div>

          <div className="mt-5 hidden overflow-x-auto rounded-2xl border border-[#d7cb98]/70 shadow tablet:block">
            <table className="w-full min-w-[760px] border-separate border-spacing-0 overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-[#f4ce63] via-[#ffd95b] to-[#f4c94e]">
                  {columns.map((column) => (
                    <th key={column.key} className="border border-black/10 p-4 text-left align-top">
                      <div className="text-xs font-black text-[#4f3a00]/80">{column.key === "rank" ? "#" : column.label.toUpperCase()}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayedRows.length === 0 ? (
                  <tr className="bg-white/95">
                    <td className="border border-black/10 p-6" colSpan={columns.length}>
                      <div className="text-sm font-semibold text-[#2d431e]/70">No scores for this filter yet.</div>
                    </td>
                  </tr>
                ) : displayedRows.map((row, index) => (
                  <tr key={row.id} className={index % 2 === 0 ? "bg-white/95" : "bg-[#fff7df]/95"}>
                    {columns.map((column) => (
                      <td key={column.key} className="border border-black/10 p-4 align-top">
                        {column.key === "username" ? (
                          <div className="flex items-center gap-3">
                            <Image
                              src={getProfileAvatarSrc(row.avatarId ?? avatarByName.get(row.name.toUpperCase()))}
                              alt={`${row.name} avatar`}
                              width={34}
                              height={34}
                              className="h-[34px] w-[34px] rounded-full border border-black/10 bg-white object-cover shadow"
                            />
                            <div className="text-sm font-black text-[#273d1e]">{row.name}</div>
                          </div>
                        ) : (
                          <div className={column.key === "date" ? "text-sm font-semibold text-[#2d431e]/80" : "text-sm font-black text-[#273d1e]"}>
                            {columnValue(gameId, row, column, index + 1)}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-2xl border border-[#cfbf86]/60 bg-[#f8ecbf]/80 p-4">
            <div className="text-xs font-black tracking-wide text-[#5a450b]/70">SCORING</div>
            <div className="mt-1 text-sm font-semibold text-[#4a3a10]/75">
              {HIGHSCORE_GAME_CONFIG[gameId].scoringDescription}
            </div>
          </div>
        </section>
      </div>

      {pwOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            onClick={() => {
              setPwOpen(false);
              setPw("");
              setPwError(null);
            }}
          />
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#e6c35f]/45 bg-[#3f2a0d] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#ffe083]/25 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-14 -left-8 h-32 w-32 rounded-full bg-[#9bcf62]/25 blur-2xl" />
            <div className="relative text-xs font-black uppercase tracking-[0.25em] text-[#f7e6b4]/90">Admin Auth</div>
            <div className="relative mt-2 text-2xl font-black text-[#fff6db]">Admin approval required</div>
            <div className="relative mt-1 text-sm font-semibold text-[#faebc6]/85">
              Enter the admin password to clear <span className="font-black">{gameId}</span> highscores.
            </div>
            <input
              autoFocus
              type="password"
              value={pw}
              onChange={(event) => {
                setPw(event.target.value);
                setPwError(null);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") void confirmClear();
                if (event.key === "Escape") setPwOpen(false);
              }}
              className="mt-4 w-full rounded-2xl border border-[#f2d07a]/55 bg-[#fff5d8] px-4 py-3 text-sm font-bold text-[#3f2c00] shadow outline-none placeholder:text-[#9b8154] focus:border-[#ffd447]"
              placeholder="Admin password"
            />
            {pwError && <div className="mt-3 rounded-2xl border border-rose-300/70 bg-rose-100 p-3 text-sm font-semibold text-rose-900">{pwError}</div>}
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setPwOpen(false);
                  setPw("");
                  setPwError(null);
                }}
                className="rounded-xl border border-[#f0d495]/65 bg-[#5f401a]/80 px-4 py-2 text-xs font-black text-[#fff6db]"
              >
                Cancel
              </button>
              <button type="button" onClick={() => void confirmClear()} className="rounded-xl bg-rose-200 px-4 py-2 text-xs font-black text-rose-900 shadow hover:bg-rose-300">
                Confirm clear
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
