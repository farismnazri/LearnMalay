"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { UiLang } from "@/lib/chapters";
import {
  CATEGORY_LABELS,
  WORD_ITEMS,
  type WordCategory,
  type WordItem,
} from "@/lib/wordMatch/items";

import { addHighScore } from "@/lib/highscores";
import { getCurrentUser } from "@/lib/userStore";

const UI_LANG_KEY = "learnMalay.uiLang.v1";
const AKU2_IDLE_SRC = "/assets/characters/Akuaku_idle.png";
const MAX_LIVES = 5;

function readUiLang(): UiLang {
  if (typeof window === "undefined") return "ms";
  const v = window.localStorage.getItem(UI_LANG_KEY);
  return v === "en" || v === "es" || v === "ms" ? v : "ms";
}
function writeUiLang(lang: UiLang) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(UI_LANG_KEY, lang);
}
function formatDuration(ms: number) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
type Translated = { ms: string; en: string; es: string };
function pick(tr: Translated, lang: UiLang) {
  return lang === "ms" ? tr.ms : lang === "en" ? tr.en : tr.es;
}

type Level = {
  id: string;
  category: WordCategory;
  pairs: number;
};

const LEVELS: Level[] = [
  { id: "L1", category: "colors", pairs: 6 },
  { id: "L2", category: "food", pairs: 6 },
  { id: "L3", category: "places", pairs: 6 },
  { id: "L4", category: "verbs", pairs: 8 },
  { id: "L5", category: "greetings", pairs: 8 },
];

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function targetLangFromUi(lang: UiLang): "en" | "es" {
  return lang === "es" ? "es" : "en";
}

export default function WordMatchPlayPage() {
  // timer (single source of truth)
  const startedAtRef = useRef<number>(Date.now());
  const [elapsedMs, setElapsedMs] = useState(0);

  // record once per run
  const recordedRef = useRef(false);

  const [lang, setLang] = useState<UiLang>("ms");

  // progress
  const [levelIdx, setLevelIdx] = useState(0);
  const level = LEVELS[levelIdx];
  const isFinalLevel = levelIdx === LEVELS.length - 1;

  const trLang = useMemo(() => targetLangFromUi(lang), [lang]);

  const itemsForLevel = useMemo(
    () => WORD_ITEMS.filter((x) => x.category === level.category),
    [level.category]
  );

  // round board
  const [roundItems, setRoundItems] = useState<WordItem[]>([]);
  const [rightItems, setRightItems] = useState<WordItem[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const matchedSet = useMemo(() => new Set(matchedPairIds), [matchedPairIds]);

  const [selectedBmId, setSelectedBmId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  // lives + end states
  const [lives, setLives] = useState(MAX_LIVES);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // stats
  const [attempts, setAttempts] = useState(0);
  const [matches, setMatches] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  // Aku2 popup
  const [popupText, setPopupText] = useState<string | null>(null);
  const [popupFade, setPopupFade] = useState(false);
  const popupTimers = useRef<number[]>([]);

  const canPlay = !gameOver && !gameWon;

  useEffect(() => {
    setLang(readUiLang());
  }, []);

  // timer tick (stop when game ends)
  useEffect(() => {
    const id = window.setInterval(() => {
      if (canPlay) setElapsedMs(Date.now() - startedAtRef.current);
    }, 250);

    return () => window.clearInterval(id);
  }, [canPlay]);

  useEffect(() => {
    return () => {
      popupTimers.current.forEach((t) => window.clearTimeout(t));
      popupTimers.current = [];
    };
  }, []);

  function recordScoreOnce(result: "win" | "gameover", snapshot: { attempts: number; matches: number; mistakes: number; lives: number; level: number; timeMs: number; category: WordCategory }) {
    if (recordedRef.current) return;
    recordedRef.current = true;

    const name = getCurrentUser()?.name ?? "Guest";

    const acc = snapshot.attempts > 0 ? (snapshot.matches / snapshot.attempts) * 100 : 0;

    addHighScore("word-match", {
      name,
      accuracy: acc,
      timeMs: snapshot.timeMs,
      meta: {
        result,
        level: snapshot.level,
        category: snapshot.category,
        attempts: snapshot.attempts,
        matches: snapshot.matches,
        mistakes: snapshot.mistakes,
        lives: snapshot.lives,
      },
    });
  }

  function triggerPopup(text: string) {
    popupTimers.current.forEach((t) => window.clearTimeout(t));
    popupTimers.current = [];

    setPopupText(text);
    setPopupFade(false);

    popupTimers.current.push(
      window.setTimeout(() => setPopupFade(true), 1200),
      window.setTimeout(() => setPopupText(null), 1500)
    );
  }

  function newRound() {
    const chosen = shuffle(itemsForLevel).slice(0, level.pairs);
    setRoundItems(chosen);
    setRightItems(shuffle(chosen));

    setMatchedPairIds([]);
    setSelectedBmId(null);
    setSelectedRightId(null);
    setLocked(false);
  }

  // rebuild board when level/lang changes
  useEffect(() => {
    if (!canPlay) return;
    newRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelIdx, trLang]);

  const rightText = (it: WordItem) => (trLang === "en" ? it.en : it.es);

  function pickLang(next: UiLang) {
    setLang(next);
    writeUiLang(next);
  }

  function onPickBm(pairId: string) {
    if (!canPlay || locked) return;
    if (matchedSet.has(pairId)) return;
    setSelectedBmId(pairId);
  }

  function onPickRight(pairId: string) {
    if (!canPlay || locked) return;
    if (matchedSet.has(pairId)) return;

    if (!selectedBmId) {
      triggerPopup(lang === "ms" ? "Pilih BM dulu." : lang === "en" ? "Pick BM first." : "Elige BM primero.");
      return;
    }

    setSelectedRightId(pairId);

    // snapshot attempt now (avoid async setState timing issues)
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    const ok = pairId === selectedBmId;

    if (ok) {
      const nextMatches = matches + 1;
      setMatches(nextMatches);

      const nextMatchedCount = matchedSet.has(pairId)
        ? matchedPairIds.length
        : matchedPairIds.length + 1;

      setMatchedPairIds((prev) => (prev.includes(pairId) ? prev : [...prev, pairId]));

      triggerPopup(lang === "ms" ? "Betul!" : lang === "en" ? "Correct!" : "¡Correcto!");

      setSelectedBmId(null);
      setSelectedRightId(null);

      // round cleared?
      if (nextMatchedCount >= roundItems.length) {
        setLocked(true);

        if (isFinalLevel) {
          // record immediately with exact time
          const timeNow = Date.now() - startedAtRef.current;
          recordScoreOnce("win", {
            attempts: nextAttempts,
            matches: nextMatches,
            mistakes,
            lives,
            level: levelIdx + 1,
            timeMs: timeNow,
            category: level.category,
          });

          window.setTimeout(() => {
            setGameWon(true);
            triggerPopup(lang === "ms" ? "Tahniah! Anda menang!" : lang === "en" ? "Congrats! You won!" : "¡Felicidades! ¡Ganaste!");
          }, 450);
        } else {
          window.setTimeout(() => {
            setLevelIdx((i) => i + 1);
            setLocked(false);
          }, 450);
        }
      }

      return;
    }

    // mismatch
    const nextMistakes = mistakes + 1;
    setMistakes(nextMistakes);

    triggerPopup(lang === "ms" ? "Salah." : lang === "en" ? "Wrong." : "Mal.");

    setSelectedBmId(null);
    setSelectedRightId(null);

    const nextLives = lives - 1;
    setLives(nextLives);

    if (nextLives <= 0) {
      const timeNow = Date.now() - startedAtRef.current;

      recordScoreOnce("gameover", {
        attempts: nextAttempts,
        matches,
        mistakes: nextMistakes,
        lives: 0,
        level: levelIdx + 1,
        timeMs: timeNow,
        category: level.category,
      });

      window.setTimeout(() => {
        setGameOver(true);
        triggerPopup(lang === "ms" ? "Maaf… permainan tamat." : lang === "en" ? "Sorry… game over." : "Lo siento… fin del juego.");
      }, 150);
    }
  }

  function restart() {
    recordedRef.current = false;

    setGameOver(false);
    setGameWon(false);
    setLocked(false);

    setLives(MAX_LIVES);
    setAttempts(0);
    setMatches(0);
    setMistakes(0);

    startedAtRef.current = Date.now();
    setElapsedMs(0);

    setLevelIdx(0);

    setPopupText(null);
    setPopupFade(false);

    // board will rebuild via useEffect(levelIdx, trLang)
    setMatchedPairIds([]);
    setSelectedBmId(null);
    setSelectedRightId(null);
  }

  const levelLabel = useMemo(() => {
    const cat = CATEGORY_LABELS[level.category];
    return {
      ms: `Tahap ${levelIdx + 1}: ${cat.ms}`,
      en: `Level ${levelIdx + 1}: ${cat.en}`,
      es: `Nivel ${levelIdx + 1}: ${cat.es}`,
    };
  }, [level.category, levelIdx]);

  const summary = useMemo(() => {
    const acc = attempts > 0 ? Math.round((matches / attempts) * 100) : 0;
    return {
      ms: `Tahap: ${levelIdx + 1} • Betul: ${matches}/${attempts} (${acc}%) • Salah: ${mistakes} • Masa: ${formatDuration(elapsedMs)}`,
      en: `Level: ${levelIdx + 1} • Correct: ${matches}/${attempts} (${acc}%) • Mistakes: ${mistakes} • Time: ${formatDuration(elapsedMs)}`,
      es: `Nivel: ${levelIdx + 1} • Aciertos: ${matches}/${attempts} (${acc}%) • Errores: ${mistakes} • Tiempo: ${formatDuration(elapsedMs)}`,
    };
  }, [attempts, elapsedMs, levelIdx, matches, mistakes]);

  const title =
    lang === "ms"
      ? "PADAN\nPERKATAAN"
      : lang === "en"
      ? "WORD\nMATCH"
      : "EMPAREJAR\nPALABRAS";

  return (
    <main
      className="relative min-h-screen bg-cover bg-center px-6 py-10"
      style={{ backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative mx-auto max-w-5xl">
        
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="crash-text crash-outline-fallback whitespace-pre-line text-7xl font-black leading-none">
              {title}
            </h1>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/85 p-4 shadow">
              <div className="text-xs font-black opacity-70">
                {pick(levelLabel, lang)} • {lang === "ms" ? "Masa" : lang === "en" ? "Time" : "Tiempo"}:{" "}
                {formatDuration(elapsedMs)}
              </div>

              <div className="mt-2 space-y-2 text-sm font-semibold">
                <div>
                  <div className="text-[11px] font-black opacity-60">
                    {lang === "ms" ? "NYAWA" : lang === "en" ? "LIVES" : "VIDAS"}
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    {Array.from({ length: MAX_LIVES }).map((_, i) => (
                      <Image
                        key={i}
                        src={AKU2_IDLE_SRC}
                        alt="life"
                        width={40}
                        height={40}
                        className={["h-14 w-14 drop-shadow", i < lives ? "opacity-100" : "opacity-25 grayscale"].join(" ")}
                        priority
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[11px] font-black opacity-60">
                      {lang === "ms" ? "PADANAN" : lang === "en" ? "MATCHES" : "ACIERTOS"}
                    </div>
                    <div className="mt-1 font-extrabold">{matches}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-black opacity-60">
                      {lang === "ms" ? "CUBAAN" : lang === "en" ? "ATTEMPTS" : "INTENTOS"}
                    </div>
                    <div className="mt-1 font-extrabold">{attempts}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/85 p-4 shadow">
              <div className="text-xs font-black opacity-70">LANG</div>

              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => pickLang("ms")}
                  className={`rounded-full px-3 py-1 text-xs font-black shadow ${lang === "ms" ? "bg-amber-300" : "bg-white"}`}
                >
                  BM
                </button>
                <button
                  onClick={() => pickLang("en")}
                  className={`rounded-full px-3 py-1 text-xs font-black shadow ${lang === "en" ? "bg-amber-300" : "bg-white"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => pickLang("es")}
                  className={`rounded-full px-3 py-1 text-xs font-black shadow ${lang === "es" ? "bg-amber-300" : "bg-white"}`}
                >
                  ES
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Link href="/minigames" className="rounded-xl bg-white px-3 py-2 text-xs font-bold shadow">
                  Back to Mini Games
                </Link>
                <button type="button" onClick={restart} className="rounded-xl bg-white px-3 py-2 text-xs font-bold shadow">
                  Restart
                </button>
                <Link href="/map" className="rounded-xl bg-white px-3 py-2 text-xs font-bold shadow">
                  Back to Map
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8 rounded-3xl bg-white/90 p-6 shadow-xl">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <div className="text-center text-xs font-black opacity-60">BM</div>
              {roundItems.map((it) => {
                const isMatched = matchedSet.has(it.id);
                const isSelected = selectedBmId === it.id;

                return (
                  <button
                    key={it.id}
                    type="button"
                    onClick={() => onPickBm(it.id)}
                    disabled={!canPlay || locked || isMatched}
                    className={[
                      "w-full rounded-2xl px-4 py-4 text-left shadow transition bg-white/80",
                      isSelected ? "ring-4 ring-amber-300" : "hover:bg-white",
                      isMatched ? "opacity-40 grayscale" : "",
                      !canPlay ? "opacity-60" : "active:scale-[0.99]",
                    ].join(" ")}
                  >
                    <div className="text-[11px] font-black opacity-60">BM</div>
                    <div className="mt-1 text-lg font-extrabold">{it.bm}</div>
                  </button>
                );
              })}
            </div>

            <div className="space-y-3">
              <div className="text-center text-xs font-black opacity-60">{trLang.toUpperCase()}</div>
              {rightItems.map((it) => {
                const isMatched = matchedSet.has(it.id);
                const isSelected = selectedRightId === it.id;

                return (
                  <button
                    key={it.id}
                    type="button"
                    onClick={() => onPickRight(it.id)}
                    disabled={!canPlay || locked || isMatched}
                    className={[
                      "w-full rounded-2xl px-4 py-4 text-left shadow transition bg-white/80",
                      isSelected ? "ring-4 ring-amber-300" : "hover:bg-white",
                      isMatched ? "opacity-40 grayscale" : "",
                      !canPlay ? "opacity-60" : "active:scale-[0.99]",
                    ].join(" ")}
                  >
                    <div className="text-[11px] font-black opacity-60">{trLang.toUpperCase()}</div>
                    <div className="mt-1 text-lg font-extrabold">{rightText(it)}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {(gameOver || gameWon) && (
            <div className={["mt-5 rounded-2xl p-5", gameWon ? "bg-emerald-100/80" : "bg-rose-100/80"].join(" ")}>
              <div className="text-sm font-black">
                {gameWon
                  ? lang === "ms"
                    ? "Tahniah! Anda menang!"
                    : lang === "en"
                    ? "Congrats! You won!"
                    : "¡Felicidades! ¡Ganaste!"
                  : lang === "ms"
                  ? "Permainan tamat"
                  : lang === "en"
                  ? "Game Over"
                  : "Fin del juego"}
              </div>

              <div className="mt-2 text-sm font-semibold opacity-90">{pick(summary, lang)}</div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={restart} className="rounded-xl bg-white px-4 py-2 text-sm font-black shadow">
                  {lang === "ms" ? "Main semula" : lang === "en" ? "Restart" : "Reiniciar"}
                </button>
                <Link href="/minigames" className="rounded-xl bg-white px-4 py-2 text-sm font-black shadow">
                  {lang === "ms" ? "Menu" : lang === "en" ? "Menu" : "Menú"}
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>

      {popupText && (
        <div
          className={[
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-300",
            popupFade ? "opacity-0" : "opacity-100",
          ].join(" ")}
        >
          <div className="flex flex-col items-center gap-0">
            <Image src={AKU2_IDLE_SRC} alt="AkuAku" width={140} height={140} className="animate-bounce drop-shadow-lg" priority />
            <div className="text-center text-lg font-black text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">
              {popupText}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
