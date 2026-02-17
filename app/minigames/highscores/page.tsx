"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { GameId, ScoreEntry } from "@/lib/highscores";
import { clearHighScores, loadHighScores } from "@/lib/highscores";
import IconActionLink from "@/components/navigation/IconActionLink";
import { getProfileAvatarSrc, type ProfileAvatarId } from "@/lib/profileAvatars";
import { ADMIN_ID, getCurrentUser, listUsers, verifyAdminPassword } from "@/lib/userStore";

const ALL_USERS = "__ALL__";
const ALL_DIFFICULTIES = "__ALL_DIFFICULTIES__";
type NumberDifficulty = "easy" | "medium" | "hard" | "ultrahard";
type NumbersDifficultyFilter = typeof ALL_DIFFICULTIES | NumberDifficulty | "unknown";

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

function scoreDifficulty(s: ScoreEntry): NumberDifficulty | "unknown" {
  const meta = (s.meta ?? {}) as Record<string, unknown>;
  const d = meta.difficulty;
  return d === "easy" || d === "medium" || d === "hard" || d === "ultrahard" ? d : "unknown";
}

function difficultyRank(d: NumberDifficulty | "unknown") {
  if (d === "ultrahard") return 4;
  if (d === "hard") return 3;
  if (d === "medium") return 2;
  if (d === "easy") return 1;
  return 0;
}

function difficultyLabel(d: NumbersDifficultyFilter) {
  if (d === ALL_DIFFICULTIES) return "All difficulties";
  if (d === "ultrahard") return "Ultra Hard";
  if (d === "hard") return "Hard";
  if (d === "medium") return "Medium";
  if (d === "easy") return "Easy";
  return "Unknown";
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
  const [gameId, setGameId] = useState<GameId>("numbers");

  const [me, setMe] = useState<Awaited<ReturnType<typeof getCurrentUser>>>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [store, setStore] = useState<Record<GameId, ScoreEntry[]>>({
    numbers: [],
    "word-match": [],
    wordsearch: [],
    currency: [],
    "makan-apa": [],
    "misi-membeli": [],
  });
  const [users, setUsers] = useState<Awaited<ReturnType<typeof listUsers>>>([]);

  const [userFilter, setUserFilter] = useState<string>(ALL_USERS);
  const [difficultyFilter, setDifficultyFilter] = useState<NumbersDifficultyFilter>(ALL_DIFFICULTIES);

  useEffect(() => {
    async function load() {
      const [u, s, cur] = await Promise.all([listUsers(), loadHighScores(), getCurrentUser()]);
      setUsers(u);
      setStore(s);
      setMe(cur);
      setIsAdmin(Boolean(cur?.id === ADMIN_ID || cur?.isAdmin));
      setUserFilter(cur?.name ?? ALL_USERS);
    }
    void load();
  }, []);

  // --- admin modal state ---
  const [pwOpen, setPwOpen] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState<string | null>(null);

  const baseRows: ScoreEntry[] = useMemo(() => store[gameId] ?? [], [store, gameId]);

  const avatarByName = useMemo(() => {
    const byName = new Map<string, ProfileAvatarId>();
    for (const user of users) {
      byName.set(user.name.toUpperCase(), user.avatarId);
    }
    return byName;
  }, [users]);

  // Build dropdown options = users + any names already in highscores (e.g., Guest)
  const userOptions = useMemo(() => {
    const s = new Set<string>();

    for (const u of users) if (u.name) s.add(u.name);
    for (const r of baseRows) if (r.name) s.add(r.name);

    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [users, baseRows]);

  const filteredRows = useMemo(() => {
    const byUser = userFilter === ALL_USERS ? baseRows : baseRows.filter((r) => r.name === userFilter);
    if (gameId !== "numbers" || difficultyFilter === ALL_DIFFICULTIES) return byUser;
    return byUser.filter((r) => scoreDifficulty(r) === difficultyFilter);
  }, [baseRows, userFilter, gameId, difficultyFilter]);

  // Sort by Activities first, then Accuracy, then Time
  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((a, b) => {
      if (gameId === "numbers") {
        const diff = difficultyRank(scoreDifficulty(b)) - difficultyRank(scoreDifficulty(a));
        if (diff !== 0) return diff;
      }
      const act = activityCount(b) - activityCount(a);
      if (act !== 0) return act;

      if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
      if (a.timeMs !== b.timeMs) return a.timeMs - b.timeMs;
      return b.dateISO.localeCompare(a.dateISO);
    });
  }, [filteredRows, gameId]);

  function pickGame(next: GameId) {
    setGameId(next);
    setDifficultyFilter(ALL_DIFFICULTIES);
  }

  function showMine() {
    if (!me?.name) return;
    setUserFilter(me.name);
  }

  function requestClear() {
    setPw("");
    setPwError(null);
    setPwOpen(true);
  }

  async function confirmClear() {
    if (!isAdmin) {
      setPwError("Admin only.");
      return;
    }

    const ok = await verifyAdminPassword(pw);
    if (!ok) {
      setPwError("Wrong admin password.");
      return;
    }

    await clearHighScores(gameId);
    const next = await loadHighScores();
    setStore(next);

    setPwOpen(false);
    setPw("");
    setPwError(null);
  }

  const activeUserLabel = userFilter === ALL_USERS ? "All users" : userFilter;
  const showDifficultyFilter = gameId === "numbers";
  const showDifficultyColumn = gameId === "numbers";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#081d14] px-6 py-10">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,220,88,0.16)_0%,rgba(255,220,88,0.03)_35%,transparent_52%),radial-gradient(circle_at_85%_18%,rgba(126,197,88,0.2)_0%,rgba(126,197,88,0.04)_38%,transparent_58%),linear-gradient(180deg,rgba(6,20,14,0.52)_0%,rgba(9,30,20,0.64)_42%,rgba(10,35,23,0.76)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background:repeating-linear-gradient(0deg,rgba(0,0,0,0.18)_0px,rgba(0,0,0,0.18)_1px,transparent_2px,transparent_4px)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="w-full max-w-3xl rounded-3xl border border-[#c7deaa]/45 bg-[#153525]/75 p-5 shadow-[0_20px_55px_rgba(0,0,0,0.45)] backdrop-blur-md">
            <div className="flex items-center gap-4">
              <Image
                src={getProfileAvatarSrc(me?.avatarId)}
                alt="Current user avatar"
                width={60}
                height={60}
                className="h-14 w-14 rounded-full border-2 border-[#f8da72]/75 bg-white/95 object-cover shadow-lg"
              />
              <div>
                <h1 className="crash-text crash-outline-fallback text-6xl font-black leading-none text-[#ffde66] drop-shadow-[0_3px_0_rgba(0,0,0,0.45)]">
                  HIGH SCORES
                </h1>
                <p className="mt-1 text-sm font-semibold text-[#eaf6d8]/95">
                  Filter by minigame and player.
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#bdd89f]/60 bg-[#2f5f34]/75 px-3 py-1 text-[11px] font-black tracking-wide text-[#f2fbdc]">
                Showing {sortedRows.length} of {baseRows.length}
              </span>
              <span className="rounded-full border border-[#f0d487]/60 bg-[#72531e]/65 px-3 py-1 text-[11px] font-black tracking-wide text-[#fff0bf]">
                User: {activeUserLabel}
              </span>
              {showDifficultyFilter && (
                <span className="rounded-full border border-[#d6cb95]/70 bg-[#fff2c9] px-3 py-1 text-[11px] font-black tracking-wide text-[#4f3a00]">
                  Difficulty: {difficultyLabel(difficultyFilter)}
                </span>
              )}
              {isAdmin && (
                <span className="rounded-full border border-rose-300/70 bg-rose-100 px-3 py-1 text-[11px] font-black tracking-wide text-rose-900">
                  ADMIN
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 rounded-2xl border border-[#bfd9a0]/45 bg-[#173728]/70 p-2 shadow-xl backdrop-blur-md">
            <IconActionLink
              href="/minigames"
              kind="minigames"
              tooltip="Back to Mini Games"
              iconClassName="brightness-0 invert"
            />

            {isAdmin && (
              <button
                type="button"
                onClick={requestClear}
                className="rounded-xl border border-rose-300/65 bg-rose-100 px-4 py-2 text-xs font-black text-rose-900 shadow hover:bg-rose-200"
              >
                Clear this game
              </button>
            )}
          </div>
        </div>

        <section className="mt-8 rounded-3xl border border-[#d2c68f]/55 bg-[#fff5d8]/93 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.25)]">
          {/* Controls row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="mr-2 text-xs font-black tracking-wide opacity-65">GAME</div>

              <button
                type="button"
                onClick={() => pickGame("numbers")}
                className={[
                  "rounded-full border px-4 py-2 text-xs font-black shadow transition",
                  gameId === "numbers"
                    ? "border-[#e6bc56] bg-[#ffd447] text-[#3f2f00]"
                    : "border-[#d8cd99]/70 bg-white/90 text-[#273d1e] hover:bg-[#ffefbf]",
                ].join(" ")}
              >
                Numbers
              </button>

              <button
                type="button"
                onClick={() => pickGame("word-match")}
                className={[
                  "rounded-full border px-4 py-2 text-xs font-black shadow transition",
                  gameId === "word-match"
                    ? "border-[#e6bc56] bg-[#ffd447] text-[#3f2f00]"
                    : "border-[#d8cd99]/70 bg-white/90 text-[#273d1e] hover:bg-[#ffefbf]",
                ].join(" ")}
              >
                Word Match
              </button>

              <button
                type="button"
                onClick={() => pickGame("wordsearch")}
                className={[
                  "rounded-full border px-4 py-2 text-xs font-black shadow transition",
                  gameId === "wordsearch"
                    ? "border-[#e6bc56] bg-[#ffd447] text-[#3f2f00]"
                    : "border-[#d8cd99]/70 bg-white/90 text-[#273d1e] hover:bg-[#ffefbf]",
                ].join(" ")}
              >
                Wordsearch
              </button>

              <button
                type="button"
                onClick={() => pickGame("currency")}
                className={[
                  "rounded-full border px-4 py-2 text-xs font-black shadow transition",
                  gameId === "currency"
                    ? "border-[#e6bc56] bg-[#ffd447] text-[#3f2f00]"
                    : "border-[#d8cd99]/70 bg-white/90 text-[#273d1e] hover:bg-[#ffefbf]",
                ].join(" ")}
              >
                Currency
              </button>

              <button
                type="button"
                onClick={() => pickGame("makan-apa")}
                className={[
                  "rounded-full border px-4 py-2 text-xs font-black shadow transition",
                  gameId === "makan-apa"
                    ? "border-[#e6bc56] bg-[#ffd447] text-[#3f2f00]"
                    : "border-[#d8cd99]/70 bg-white/90 text-[#273d1e] hover:bg-[#ffefbf]",
                ].join(" ")}
              >
                Makan Apa
              </button>

              <button
                type="button"
                onClick={() => pickGame("misi-membeli")}
                className={[
                  "rounded-full border px-4 py-2 text-xs font-black shadow transition",
                  gameId === "misi-membeli"
                    ? "border-[#e6bc56] bg-[#ffd447] text-[#3f2f00]"
                    : "border-[#d8cd99]/70 bg-white/90 text-[#273d1e] hover:bg-[#ffefbf]",
                ].join(" ")}
              >
                Misi Membeli
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="text-xs font-black tracking-wide opacity-65">USER</div>

              <select
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                className="rounded-xl border border-[#d5c98e]/70 bg-white/90 px-3 py-2 text-xs font-black text-[#243a1c] shadow outline-none focus:border-[#e7bf56]"
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
                className="rounded-xl border border-[#d8cc95]/70 bg-white/90 px-3 py-2 text-xs font-black text-[#273d1e] shadow hover:bg-[#ffefbf]"
              >
                My scores
              </button>
            </div>

            {showDifficultyFilter && (
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-xs font-black tracking-wide opacity-65">DIFFICULTY</div>
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value as NumbersDifficultyFilter)}
                  className="rounded-xl border border-[#d5c98e]/70 bg-white/90 px-3 py-2 text-xs font-black text-[#243a1c] shadow outline-none focus:border-[#e7bf56]"
                >
                  <option value={ALL_DIFFICULTIES}>All difficulties</option>
                  <option value="ultrahard">Ultra Hard</option>
                  <option value="hard">Hard</option>
                  <option value="medium">Medium</option>
                  <option value="easy">Easy</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            )}
          </div>

          <div className="mt-3 text-xs font-semibold text-[#2c431f]/75">
            {showDifficultyFilter
              ? "Ranked by difficulty first (Ultra Hard > Hard > Medium > Easy), then activities, accuracy, and time."
              : "Ranked by activities, then accuracy, then time."}
          </div>

          <div className="mt-5 overflow-x-auto rounded-2xl border border-[#d7cb98]/70 shadow">
            <table className="w-full min-w-[860px] border-separate border-spacing-0 overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-[#f4ce63] via-[#ffd95b] to-[#f4c94e]">
                  <th className="border border-black/10 p-4 text-left align-top">
                    <div className="text-xs font-black text-[#4f3a00]/80">#</div>
                  </th>
                  <th className="border border-black/10 p-4 text-left align-top">
                    <div className="text-xs font-black text-[#4f3a00]/80">NAME</div>
                  </th>
                  <th className="border border-black/10 p-4 text-left align-top">
                    <div className="text-xs font-black text-[#4f3a00]/80">ACTIVITIES</div>
                  </th>
                  {showDifficultyColumn && (
                    <th className="border border-black/10 p-4 text-left align-top">
                      <div className="text-xs font-black text-[#4f3a00]/80">DIFFICULTY</div>
                    </th>
                  )}
                  <th className="border border-black/10 p-4 text-left align-top">
                    <div className="text-xs font-black text-[#4f3a00]/80">ACCURACY</div>
                  </th>
                  <th className="border border-black/10 p-4 text-left align-top">
                    <div className="text-xs font-black text-[#4f3a00]/80">TIME</div>
                  </th>
                  <th className="border border-black/10 p-4 text-left align-top">
                    <div className="text-xs font-black text-[#4f3a00]/80">DATE</div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedRows.length === 0 ? (
                  <tr className="bg-white/95">
                    <td className="border border-black/10 p-6" colSpan={showDifficultyColumn ? 7 : 6}>
                      <div className="text-sm font-semibold text-[#2d431e]/70">
                        No scores for this filter yet.
                      </div>
                    </td>
                  </tr>
                ) : (
                  sortedRows.map((r, idx) => (
                    <tr key={r.id} className={idx % 2 === 0 ? "bg-white/95" : "bg-[#fff7df]/95"}>
                      <td className="border border-black/10 p-4 align-top">
                        <div className="text-sm font-black text-[#2f2606]">{idx + 1}</div>
                      </td>

                      <td className="border border-black/10 p-4 align-top">
                        <div className="flex items-center gap-3">
                          <Image
                            src={getProfileAvatarSrc(r.avatarId ?? avatarByName.get(r.name.toUpperCase()))}
                            alt={`${r.name} avatar`}
                            width={34}
                            height={34}
                            className="h-[34px] w-[34px] rounded-full border border-black/10 bg-white object-cover shadow"
                          />
                          <div className="text-sm font-black text-[#273d1e]">{r.name}</div>
                        </div>
                      </td>

                      <td className="border border-black/10 p-4 align-top">
                        <div className="text-sm font-black text-[#273d1e]">{activityCount(r)}</div>
                      </td>

                      {showDifficultyColumn && (
                        <td className="border border-black/10 p-4 align-top">
                          <div className="text-sm font-black text-[#273d1e]">{difficultyLabel(scoreDifficulty(r))}</div>
                        </td>
                      )}

                      <td className="border border-black/10 p-4 align-top">
                        <div className="text-sm font-black text-[#273d1e]">{Math.round(r.accuracy)}%</div>
                      </td>

                      <td className="border border-black/10 p-4 align-top">
                        <div className="text-sm font-black text-[#273d1e]">{formatDuration(r.timeMs)}</div>
                      </td>

                      <td className="border border-black/10 p-4 align-top">
                        <div className="text-sm font-semibold text-[#2d431e]/80">{formatDate(r.dateISO)}</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-2xl border border-[#cfbf86]/60 bg-[#f8ecbf]/80 p-4">
            <div className="text-xs font-black tracking-wide text-[#5a450b]/70">SCORING</div>
            <div className="mt-1 text-sm font-semibold text-[#4a3a10]/75">
              {showDifficultyFilter
                ? "Difficulty (higher) first, then activities (higher), accuracy (higher), and time (lower)."
                : "Ranked by activities (higher), then accuracy (higher), then time (lower)."}
            </div>
          </div>
        </section>
      </div>

      {/* Admin password modal */}
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
              onChange={(e) => {
                setPw(e.target.value);
                setPwError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") void confirmClear();
                if (e.key === "Escape") setPwOpen(false);
              }}
              className="mt-4 w-full rounded-2xl border border-[#f2d07a]/55 bg-[#fff5d8] px-4 py-3 text-sm font-bold text-[#3f2c00] shadow outline-none placeholder:text-[#9b8154] focus:border-[#ffd447]"
              placeholder="Admin password"
            />

            {pwError && (
              <div className="mt-3 rounded-2xl border border-rose-300/70 bg-rose-100 p-3 text-sm font-semibold text-rose-900">
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
                className="rounded-xl border border-[#f0d495]/65 bg-[#5f401a]/80 px-4 py-2 text-xs font-black text-[#fff6db]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void confirmClear()}
                className="rounded-xl bg-rose-200 px-4 py-2 text-xs font-black text-rose-900 shadow hover:bg-rose-300"
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
