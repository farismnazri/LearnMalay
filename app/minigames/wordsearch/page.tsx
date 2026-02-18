"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { UiLang } from "@/lib/chapters";
import { BackgroundAudioControls } from "@/components/game/BackgroundAudio";
import WordSearchCard from "@/components/game/WordSearchCard";
import IconActionLink from "@/components/navigation/IconActionLink";
import { WORD_ITEMS, CATEGORY_LABELS, type WordCategory } from "@/lib/wordMatch/items";
import { addHighScore } from "@/lib/highscores";
import { getCurrentUser, type ProfileAvatarId, type UserProfile } from "@/lib/userStore";
import { isMinigameUnlocked, MINIGAME_PREREQUISITES } from "@/lib/minigameUnlocks";

const UI_LANG_KEY = "learnMalay.uiLang.v1";
const AKU2_SALAH_SRC = "/assets/characters/Akuaku_Salah.webp";

const DIFFICULTIES = {
  easy: { size: 10, count: 5, label: { ms: "Mudah", en: "Easy", es: "Fácil" } },
  medium: { size: 15, count: 7, label: { ms: "Sederhana", en: "Medium", es: "Media" } },
  hard: { size: 30, count: 10, label: { ms: "Sukar", en: "Hard", es: "Difícil" } },
} as const;

type DifficultyKey = keyof typeof DIFFICULTIES;

function readUiLang(): UiLang {
  if (typeof window === "undefined") return "ms";
  const v = window.localStorage.getItem(UI_LANG_KEY);
  return v === "en" || v === "es" || v === "ms" ? v : "ms";
}

function writeUiLang(lang: UiLang) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(UI_LANG_KEY, lang);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function WordSearchMiniGame() {
  const [lang, setLang] = useState<UiLang>("ms");
  const [difficulty, setDifficulty] = useState<DifficultyKey>("easy");
  const [theme, setTheme] = useState<WordCategory | "all">("all");
  const [seed, setSeed] = useState(0);
  const [startTs, setStartTs] = useState<number | null>(null);
  const [finishedTs, setFinishedTs] = useState<number | null>(null);
  const [tick, setTick] = useState(0);
  const [showAllSeq, setShowAllSeq] = useState(0);
  const [saved, setSaved] = useState(false);
  const [wrongPopupVisible, setWrongPopupVisible] = useState(false);
  const [wrongPopupFade, setWrongPopupFade] = useState(false);
  const [playerName, setPlayerName] = useState("Player");
  const [playerAvatarId, setPlayerAvatarId] = useState<ProfileAvatarId | undefined>(undefined);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const saveLock = useRef(false);
  const wrongPopupTimers = useRef<number[]>([]);

  useEffect(() => {
    setLang(readUiLang());
    getCurrentUser().then((u) => {
      setUser(u);
      if (u?.name) setPlayerName(u.name);
      setPlayerAvatarId(u?.avatarId);
    }).finally(() => {
      setLoadingUser(false);
    });
  }, []);
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 500);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    return () => {
      wrongPopupTimers.current.forEach((timer) => window.clearTimeout(timer));
      wrongPopupTimers.current = [];
    };
  }, []);

  const pool = useMemo(() => {
    const list = theme === "all" ? WORD_ITEMS : WORD_ITEMS.filter((w) => w.category === theme);
    return list.slice(0, 50); // cap at ~50 words
  }, [theme]);

  const selectedTargets = useMemo(() => {
    const { count } = DIFFICULTIES[difficulty];
    const picks = shuffle(pool).slice(0, Math.min(count, pool.length));
    return picks.map((w) => ({
      id: w.id,
      word: w.bm.toUpperCase().replace(/\s+/g, ""),
      label: { ms: w.bm, en: w.en, es: w.es },
    }));
  }, [pool, difficulty, seed]);

  const pageData = useMemo(
    () => ({
      id: `ws-minigame-${seed}`,
      kind: "wordsearch" as const,
      title: {
        ms: "Cari Perkataan (Mini Game)",
        en: "Wordsearch (Mini Game)",
        es: "Sopa de letras (Mini Juego)",
      },
      instructions: {
        ms: `Cari ${selectedTargets.length} perkataan. Pilih tahap & tema, kemudian tekan Regenerate untuk grid baharu.`,
        en: `Find ${selectedTargets.length} words. Choose difficulty & theme, then hit Regenerate for a fresh grid.`,
        es: `Encuentra ${selectedTargets.length} palabras. Elige dificultad y tema y pulsa Regenerate para otro tablero.`,
      },
      targets: selectedTargets,
      allowDiagonal: true,
      allowReverse: true,
      autoGenerate: true,
      size: DIFFICULTIES[difficulty].size,
    }),
    [selectedTargets, difficulty, seed]
  );

  const themeOptions: Array<{ id: WordCategory | "all"; label: string }> = [
    { id: "all", label: lang === "ms" ? "Semua" : lang === "en" ? "All" : "Todos" },
    ...Object.entries(CATEGORY_LABELS).map(([id, t]) => ({
      id: id as WordCategory,
      label: t[lang],
    })),
  ];

  function pickLang(next: UiLang) {
    setLang(next);
    writeUiLang(next);
  }

  function regen() {
    setSeed((s) => s + 1);
    setStartTs(Date.now());
    setFinishedTs(null);
    setSaved(false);
    setShowAllSeq((s) => s + 1); // clear highlights
    saveLock.current = false;
  }

  function handleProgress(found: number, total: number) {
    if (found === 0) setStartTs((prev) => prev ?? Date.now());
  }

  function handleComplete() {
    if (saved || saveLock.current) return; // avoid duplicate saves
    saveLock.current = true;
    const now = Date.now();
    const started = startTs ?? now;
    const elapsed = now - started;
    setFinishedTs(now);
    setSaved(true);
    addHighScore("wordsearch", {
      name: playerName,
      avatarId: playerAvatarId,
      accuracy: 100,
      timeMs: elapsed,
      meta: { difficulty, theme, words: selectedTargets.length },
    });
  }

  function triggerWrongPopup() {
    wrongPopupTimers.current.forEach((timer) => window.clearTimeout(timer));
    wrongPopupTimers.current = [];
    setWrongPopupVisible(true);
    setWrongPopupFade(false);
    wrongPopupTimers.current.push(
      window.setTimeout(() => setWrongPopupFade(true), 900),
      window.setTimeout(() => setWrongPopupVisible(false), 1200),
    );
  }

  const elapsedMs = finishedTs
    ? finishedTs - (startTs ?? finishedTs)
    : startTs
    ? Date.now() - startTs
    : 0;

  function fmt(ms: number) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const secs = s % 60;
    return `${m.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  const requiredChapter = MINIGAME_PREREQUISITES.wordsearch;
  const unlocked = isMinigameUnlocked(user, "wordsearch");

  if (loadingUser) return null;

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-200 via-sky-200 to-amber-200 px-6 py-10">
        <div className="mx-auto max-w-xl rounded-2xl bg-white/85 p-6 shadow">
          <h1 className="crash-text crash-outline-fallback text-5xl font-black">MINI GAMES</h1>
          <p className="mt-4 text-sm font-semibold text-black/70">Select a user first to play this minigame.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/user" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow">
              Go to Login
            </Link>
            <IconActionLink href="/minigames" kind="minigames" tooltip="Back to Mini Games" />
          </div>
        </div>
      </main>
    );
  }

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-200 via-sky-200 to-amber-200 px-6 py-10">
        <div className="mx-auto max-w-xl rounded-2xl bg-white/85 p-6 shadow">
          <h1 className="crash-text crash-outline-fallback text-5xl font-black">LOCKED</h1>
          <p className="mt-4 text-sm font-semibold text-black/70">
            Complete Chapter {requiredChapter} first to play Wordsearch.
          </p>
          <div className="mt-6 flex gap-3">
            <IconActionLink href="/map" kind="map" tooltip="Back to Map" />
            <IconActionLink href="/minigames" kind="minigames" tooltip="Back to Mini Games" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-cover bg-center px-6 py-10">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative mx-auto max-w-5xl space-y-6">
        {/* header row */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="crash-text crash-outline-fallback whitespace-pre-line text-6xl font-black leading-none">
              {lang === "ms" ? "CARI\nPERKATAAN" : lang === "en" ? "WORD\nSEARCH" : "SOPA\nDE LETRAS"}
            </h1>
            <p className="mt-2 text-sm font-semibold text-white/90 drop-shadow">
              {lang === "ms"
                ? "Pilih tahap, pilih tema, dan dapatkan grid baharu setiap kali."
                : lang === "en"
                ? "Pick a difficulty and theme, get a fresh grid every time."
                : "Elige dificultad y tema; obtén un tablero nuevo cada vez."}
            </p>
          </div>

          <div className="rounded-2xl bg-white/85 p-4 shadow">
            <div className="mb-3">
              <BackgroundAudioControls />
            </div>

            <div className="text-xs font-black opacity-70">LANGUAGE</div>
            <div className="mt-2 flex gap-2">
              {(["ms", "en", "es"] as UiLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => pickLang(l)}
                  className={`rounded-full px-3 py-1 text-xs font-black shadow ${lang === l ? "bg-amber-300" : "bg-white"}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <IconActionLink href="/minigames" kind="minigames" tooltip="Back to Mini Games" />
              <IconActionLink href="/map" kind="map" tooltip="Back to Map" />
            </div>
          </div>
        </div>

        {/* controls */}
        <section className="rounded-3xl bg-white/90 p-4 shadow-xl">
          <div className="flex flex-wrap gap-4">
            <div>
              <div className="text-xs font-black opacity-60">{lang === "ms" ? "TAHAP" : lang === "en" ? "DIFFICULTY" : "DIFICULTAD"}</div>
              <div className="mt-2 flex gap-2">
                {(Object.keys(DIFFICULTIES) as DifficultyKey[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setDifficulty(d);
                      setSeed((s) => s + 1);
                    }}
                    className={[
                      "rounded-full px-3 py-1 text-xs font-black shadow",
                      difficulty === d ? "bg-amber-300" : "bg-white",
                    ].join(" ")}
                  >
                    {DIFFICULTIES[d].label[lang]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-black opacity-60">{lang === "ms" ? "TEMA" : lang === "en" ? "THEME" : "TEMA"}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {themeOptions.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id as any);
                      setSeed((s) => s + 1);
                    }}
                    className={[
                      "rounded-full px-3 py-1 text-xs font-black shadow",
                      theme === t.id ? "bg-emerald-200" : "bg-white",
                    ].join(" ")}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-end gap-2">
              <IconActionLink
                onClick={regen}
                kind="restart"
                tooltip={lang === "ms" ? "Jana Semula Grid" : lang === "en" ? "Regenerate Grid" : "Regenerar Cuadricula"}
              />
              <button
                onClick={() => {
                  setShowAllSeq((s) => s + 1);
                  setFinishedTs(Date.now());
                  setSaved(true); // do not save highscore when revealing
                }}
                className="rounded-xl bg-white px-4 py-2 text-xs font-bold shadow hover:bg-amber-100"
              >
                Show Answers
              </button>
              <div className="ml-3 rounded-xl bg-black/5 px-3 py-2 text-xs font-black">
                ⏱ {fmt(elapsedMs)} {finishedTs ? "(Done)" : ""}
              </div>
            </div>
          </div>
        </section>

        {/* game */}
        <WordSearchCard
          page={pageData as any}
          lang={lang}
          onProgress={(found) => handleProgress(found, selectedTargets.length)}
          onComplete={handleComplete}
          onWrong={triggerWrongPopup}
          showAllTrigger={showAllSeq}
        />
      </div>

      {wrongPopupVisible && (
        <div
          className={[
            "pointer-events-none fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300",
            wrongPopupFade ? "opacity-0" : "opacity-100",
          ].join(" ")}
        >
          <Image src={AKU2_SALAH_SRC} alt="Wrong answer" width={180} height={180} className="animate-bounce drop-shadow-lg" priority />
        </div>
      )}
    </main>
  );
}
