"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { UiLang } from "@/lib/chapters";
import Image from "next/image";

import { addHighScore } from "@/lib/highscores";
import { getCurrentUser } from "@/lib/userStore";

const name = getCurrentUser()?.name ?? "GUEST";

const UI_LANG_KEY = "learnMalay.uiLang.v1";

const AKU2_IDLE_SRC = "/assets/characters/Akuaku_idle.png"; // must match filename case in /public
const MAX_LIVES = 5;

function formatDuration(ms: number) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function readUiLang(): UiLang {
  if (typeof window === "undefined") return "ms";
  const v = window.localStorage.getItem(UI_LANG_KEY);
  return v === "en" || v === "es" || v === "ms" ? v : "ms";
}

function writeUiLang(lang: UiLang) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(UI_LANG_KEY, lang);
}


type Translated = { ms: string; en: string; es: string };
function pick(tr: Translated, lang: UiLang) {
  return lang === "ms" ? tr.ms : lang === "en" ? tr.en : tr.es;
}

function normalizeAnswer(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\s*\/\s*/g, "/"); // optional: "sifar / kosong" -> "sifar/kosong"
}

function digitWord(n: number): string {
  switch (n) {
    case 0: return "sifar";
    case 1: return "satu";
    case 2: return "dua";
    case 3: return "tiga";
    case 4: return "empat";
    case 5: return "lima";
    case 6: return "enam";
    case 7: return "tujuh";
    case 8: return "lapan";
    case 9: return "sembilan";
    default: return "";
  }
}

function msNumberWord(n: number): string {
  if (!Number.isFinite(n) || n < 0 || n > 9_999_999) return "";

  if (n === 0) return "sifar";
  if (n < 10) return digitWord(n);

  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${digitWord(n - 10)} belas`;

  if (n < 100) {
    const tens = Math.floor(n / 10);
    const ones = n % 10;
    const tensWord = `${digitWord(tens)} puluh`;
    return ones === 0 ? tensWord : `${tensWord} ${digitWord(ones)}`;
  }

  if (n < 1000) {
    const hundreds = Math.floor(n / 100);
    const rem = n % 100;
    const head = hundreds === 1 ? "seratus" : `${digitWord(hundreds)} ratus`;
    return rem === 0 ? head : `${head} ${msNumberWord(rem)}`;
  }

  if (n < 1_000_000) {
    const thousands = Math.floor(n / 1000);
    const rem = n % 1000;
    const head = thousands === 1 ? "seribu" : `${msNumberWord(thousands)} ribu`;
    return rem === 0 ? head : `${head} ${msNumberWord(rem)}`;
  }

  // 1,000,000 to 9,999,999
  const millions = Math.floor(n / 1_000_000);
  const rem = n % 1_000_000;

  // Use "satu juta" (and accept "sejuta" as alternative)
  const head = millions === 1 ? "satu juta" : `${msNumberWord(millions)} juta`;
  return rem === 0 ? head : `${head} ${msNumberWord(rem)}`;
}

/** Accept common variants so students don't get punished for "se-" vs "satu" forms. */
function msAcceptableAnswers(n: number): string[] {
  const base = msNumberWord(n);
  const out = new Set<string>();

  if (!base) return [];
  out.add(base);

  // 0: allow kosong too
  if (n === 0) out.add("kosong");

  // seratus <-> satu ratus
  out.add(base.replace(/\bseratus\b/g, "satu ratus"));

  // seribu <-> satu ribu
  out.add(base.replace(/\bseribu\b/g, "satu ribu"));

  // satu juta <-> sejuta (only where it makes sense)
  out.add(base.replace(/\bsatu juta\b/g, "sejuta"));

  // clean duplicates / unchanged
  return [...out].filter(Boolean);
}


type Level = {
  id: string;
  rangeLabel: Translated;
  min: number;
  max: number;
  requiredCorrect: number;
};

const LEVELS: Level[] = [
  {
    id: "1-10",
    rangeLabel: { ms: "Tahap 1 (Sa: 1–10)", en: "Level 1 (Ones: 1–10)", es: "Nivel 1 (Unidades: 1–10)" },
    min: 1,
    max: 10,
    requiredCorrect: 4,
  },
  {
    id: "11-20",
    rangeLabel: { ms: "Tahap 2 (Belasan: 11–20)", en: "Level 2 (Teens: 11–20)", es: "Nivel 2 (11–20)" },
    min: 11,
    max: 20,
    requiredCorrect: 4,
  },
  {
    id: "21-99",
    rangeLabel: { ms: "Tahap 3 (Puluh: 21–99)", en: "Level 3 (Tens: 21–99)", es: "Nivel 3 (Decenas: 21–99)" },
    min: 21,
    max: 99,
    requiredCorrect: 4,
  },
  {
    id: "100-999",
    rangeLabel: { ms: "Tahap 4 (Ratus: 100–999)", en: "Level 4 (Hundreds: 100–999)", es: "Nivel 4 (Centenas: 100–999)" },
    min: 100,
    max: 999,
    requiredCorrect: 4,
  },
  {
    id: "1k-9k",
    rangeLabel: { ms: "Tahap 5 (Ribu: 1,000–9,999)", en: "Level 5 (Thousands: 1,000–9,999)", es: "Nivel 5 (Miles: 1.000–9.999)" },
    min: 1_000,
    max: 9_999,
    requiredCorrect: 4,
  },
  {
    id: "10k-99k",
    rangeLabel: { ms: "Tahap 6 (Puluh Ribu: 10,000–99,999)", en: "Level 6 (Tens of thousands: 10,000–99,999)", es: "Nivel 6 (Decenas de miles: 10.000–99.999)" },
    min: 10_000,
    max: 99_999,
    requiredCorrect: 4,
  },
  {
    id: "100k-999k",
    rangeLabel: { ms: "Tahap 7 (Ratus Ribu: 100,000–999,999)", en: "Level 7 (Hundreds of thousands: 100,000–999,999)", es: "Nivel 7 (Centenas de miles: 100.000–999.999)" },
    min: 100_000,
    max: 999_999,
    requiredCorrect: 4,
  },
  {
    id: "1m-9m",
    rangeLabel: { ms: "Tahap 8 (Juta: 1,000,000–9,999,999)", en: "Level 8 (Millions: 1,000,000–9,999,999)", es: "Nivel 8 (Millones: 1.000.000–9.999.999)" },
    min: 1_000_000,
    max: 9_999_999,
    requiredCorrect: 4,
  },
];


function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function NumbersPlayPage() {

  const [lives, setLives] = useState(MAX_LIVES);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // stats
  const [attempts, setAttempts] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalWrong, setTotalWrong] = useState(0);

  // timer
  const startedAtRef = useRef<number>(Date.now());
  const [elapsedMs, setElapsedMs] = useState(0);

  // record highscore once per run
  const recordedRef = useRef(false);

  const [congratsText, setCongratsText] = useState<string | null>(null);
  const [congratsFade, setCongratsFade] = useState(false);

  const [lang, setLang] = useState<UiLang>("ms");

  const [levelIdx, setLevelIdx] = useState(0);
  const level = LEVELS[levelIdx];

  const [correctCount, setCorrectCount] = useState(0);
  const [n, setN] = useState<number>(() => randomInt(level.min, level.max));
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<null | { ok: boolean; msg: string }>(null);

  function recordScoreOnce(
    result: "win" | "gameover",
    snapshot?: { attempts: number; totalCorrect: number; totalWrong: number; lives: number; level: number; timeMs: number }
  ) {
    if (recordedRef.current) return;
    recordedRef.current = true;

  const name = (() => {
    try {
      return getCurrentUser()?.name ?? "GUEST";
    } catch {
      return "GUEST";
    }
  })();


    const a = snapshot?.attempts ?? attempts;
    const c = snapshot?.totalCorrect ?? totalCorrect;
    const w = snapshot?.totalWrong ?? totalWrong;
    const l = snapshot?.lives ?? lives;
    const lv = snapshot?.level ?? (levelIdx + 1);
    const tms = snapshot?.timeMs ?? elapsedMs;

    const accuracy = a > 0 ? (c / a) * 100 : 0;

    addHighScore("numbers", {
      name,
      accuracy,
      timeMs: tms,
      meta: { result, level: lv, totalCorrect: c, totalWrong: w, attempts: a, lives: l },
    });
  }

  const congratsTimers = useRef<number[]>([]);
useEffect(() => {
  return () => {
    congratsTimers.current.forEach((t) => window.clearTimeout(t));
    congratsTimers.current = [];
  };
}, []);

useEffect(() => {
  const id = window.setInterval(() => {
    if (!gameOver && !gameWon) setElapsedMs(Date.now() - startedAtRef.current);
  }, 250);

  return () => window.clearInterval(id);
}, [gameOver, gameWon]);


function triggerCongrats(text: string) {
  // clear any existing timers so repeated level-ups don't overlap weirdly
  congratsTimers.current.forEach((t) => window.clearTimeout(t));
  congratsTimers.current = [];

  setCongratsText(text);
  setCongratsFade(false);

  congratsTimers.current.push(
    window.setTimeout(() => setCongratsFade(true), 1200),
    window.setTimeout(() => setCongratsText(null), 1500)
  );
}

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setLang(readUiLang());
  }, []);

  // If level changes, refresh number + reset state
  useEffect(() => {
    setCorrectCount(0);
    setInput("");
    setFeedback(null);
    setN(randomInt(level.min, level.max));
    queueMicrotask(() => inputRef.current?.focus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelIdx]);

  const expected = useMemo(() => msNumberWord(n), [n]);
  const acceptable = useMemo(
    () => msAcceptableAnswers(n).map((s) => normalizeAnswer(s)),
    [n]
  );

  function nextNumber() {
    if (gameOver || gameWon) return;
    setInput("");
    setFeedback(null);
    setN(randomInt(level.min, level.max));
    queueMicrotask(() => inputRef.current?.focus());
  }

  function pickLang(next: UiLang) {
  setLang(next);
  writeUiLang(next);
}

function submit() {
  if (gameOver || gameWon) return;

  const got = normalizeAnswer(input);

  if (!got) {
    setFeedback({
      ok: false,
      msg:
        lang === "ms"
          ? "Isi jawapan dulu."
          : lang === "en"
          ? "Type an answer first."
          : "Escribe una respuesta.",
    });
    return;
  }

  // count attempt (only on non-empty submit)
  const nextAttempts = attempts + 1;
  setAttempts(nextAttempts);

  // ✅ correct
  if (acceptable.includes(got)) {
    const nextTotalCorrect = totalCorrect + 1;
    setTotalCorrect(nextTotalCorrect);

    const nextCorrect = correctCount + 1;
    setCorrectCount(nextCorrect);

    // completed level?
    if (nextCorrect >= level.requiredCorrect) {
      // not last level → level up
      if (levelIdx < LEVELS.length - 1) {
        setFeedback({
          ok: true,
          msg:
            lang === "ms"
              ? "Betul! Naik tahap!"
              : lang === "en"
              ? "Correct! Level up!"
              : "¡Correcto! ¡Subes de nivel!",
        });

        triggerCongrats(
          lang === "ms"
            ? "Tahniah! Naik tahap!"
            : lang === "en"
            ? "Congrats! Level up!"
            : "¡Felicidades! ¡Subes de nivel!"
        );

        setTimeout(() => setLevelIdx((i) => i + 1), 900);
        return; // ✅ IMPORTANT: stop here so it doesn't also run "Betul!" and nextNumber()
      }

      // last level → WIN
      setFeedback({
        ok: true,
        msg:
          lang === "ms"
            ? "Tahniah! Anda habis semua tahap."
            : lang === "en"
            ? "Congrats! You finished all levels."
            : "¡Felicidades! Terminaste todos los niveles.",
      });

      setGameWon(true);

      recordScoreOnce("win", {
        attempts: nextAttempts,
        totalCorrect: nextTotalCorrect,
        totalWrong,
        lives,
        level: levelIdx + 1,
        timeMs: elapsedMs,
      });

      triggerCongrats(
        lang === "ms" ? "ANDA MENANG!" : lang === "en" ? "YOU WIN!" : "¡GANASTE!"
      );

      return;
    }

    // correct but not finished level yet
    setFeedback({
      ok: true,
      msg: lang === "ms" ? "Betul!" : lang === "en" ? "Correct!" : "¡Correcto!",
    });
    setTimeout(() => nextNumber(), 250);
    return;
  }

  // ❌ wrong
  const nextTotalWrong = totalWrong + 1;
  setTotalWrong(nextTotalWrong);

  const nextLives = lives - 1;
  setLives(nextLives);

  if (nextLives <= 0) {
    setGameOver(true);

    recordScoreOnce("gameover", {
      attempts: nextAttempts,
      totalCorrect,
      totalWrong: nextTotalWrong,
      lives: 0,
      level: levelIdx + 1,
      timeMs: elapsedMs,
    });

    triggerCongrats(
      lang === "ms"
        ? "Aduh… nyawa habis."
        : lang === "en"
        ? "Oh no… out of lives."
        : "Oh no… te quedaste sin vidas."
    );

    setFeedback(null);
    return;
  }

  // still alive → show answer, keep same number
  setFeedback({
    ok: false,
    msg:
      lang === "ms"
        ? `Belum. Jawapan: ${expected}`
        : lang === "en"
        ? `Not yet. Answer: ${expected}`
        : `Aún no. Respuesta: ${expected}`,
  });

  queueMicrotask(() => inputRef.current?.select());
}



function restart() {
  recordedRef.current = false;
  setGameWon(false);
  setGameOver(false);

  setLives(MAX_LIVES);
  setAttempts(0);
  setTotalCorrect(0);
  setTotalWrong(0);

  startedAtRef.current = Date.now();
  setElapsedMs(0);

  setLevelIdx(0);
  setCorrectCount(0);
  setInput("");
  setFeedback(null);
  setN(randomInt(LEVELS[0].min, LEVELS[0].max));

  queueMicrotask(() => inputRef.current?.focus());
}


  return (
    <main
      className="relative min-h-screen bg-cover bg-center px-6 py-10"
      style={{ backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative mx-auto max-w-3xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
        {/* title row */}
        <div>
          <h1 className="crash-text crash-outline-fallback text-5xl font-black leading-none">
            {lang === "ms" ? "MAIN NOMBOR" : lang === "en" ? "NUMBER GAME" : "JUEGO DE NÚMEROS"}
          </h1>
        </div>

<div className="grid w-full gap-4 sm:grid-cols-2">
  {/* LEFT COLUMN: STATS */}
  <div className="rounded-2xl bg-white/85 p-4 shadow">
    {/* <div className="text-xs font-black opacity-70">
      {lang === "ms" ? "STATUS" : lang === "en" ? "STATUS" : "ESTADO"}
    </div> */}

    <div className="space-y-3 text-sm font-semibold">
      {/* Lives */}
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
              width={100}
              height={100}
              className={[
                "h-15.5 w-15.5 drop-shadow",
                i < lives ? "opacity-100" : "opacity-25 grayscale",
              ].join(" ")}
              priority
            />
          ))}
        </div>
      </div>

      {/* Level */}
      <div>
        <div className="text-[11px] font-black opacity-60">
          {lang === "ms" ? "TAHAP" : lang === "en" ? "LEVEL" : "NIVEL"}
        </div>
        <div className="mt-1 font-extrabold">{pick(level.rangeLabel, lang)}
        </div>
      </div>

      {/* Correct + Time */}
      <div>
        <div className="text-[11px] font-black opacity-60">
          {lang === "ms" ? "BETUL" : lang === "en" ? "CORRECT" : "CORRECTAS"}
          <span className="opacity-60"> • </span>
          {lang === "ms" ? "MASA" : lang === "en" ? "TIME" : "TIEMPO"}
        </div>

        <div className="mt-1 font-extrabold">
          {correctCount}/{level.requiredCorrect}
          <span className="opacity-60"> • </span>
          {formatDuration(elapsedMs)}
        </div>
      </div>
    </div>
  </div>

  {/* RIGHT COLUMN: LANG */}
  <div className="rounded-2xl bg-white/85 p-4 shadow">
    <div className="text-xs font-black opacity-70">LANG</div>

    <div className="mt-2 flex gap-2">
      <button
        onClick={() => pickLang("ms")}
        className={`rounded-full px-3 py-1 text-xs font-black shadow ${
          lang === "ms" ? "bg-amber-300" : "bg-white"
        }`}
      >
        BM
      </button>

      <button
        onClick={() => pickLang("en")}
        className={`rounded-full px-3 py-1 text-xs font-black shadow ${
          lang === "en" ? "bg-amber-300" : "bg-white"
        }`}
      >
        EN
      </button>

      <button
        onClick={() => pickLang("es")}
        className={`rounded-full px-3 py-1 text-xs font-black shadow ${
          lang === "es" ? "bg-amber-300" : "bg-white"
        }`}
      >
        ES
      </button>
    </div>

    <div className="mt-3 flex flex-wrap gap-2">
      <Link href="/minigames" className="rounded-xl bg-white px-3 py-2 text-xs font-bold shadow">
        Back to Mini Games
      </Link>

      <button
        type="button"
        onClick={restart}
        className="rounded-xl bg-white px-3 py-2 text-xs font-bold shadow"
      >
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
          <div className="text-xs font-black opacity-60">
            {lang === "ms" ? "TULIS DALAM BAHASA MELAYU" : lang === "en" ? "TYPE IN MALAY" : "ESCRIBE EN MALAYO"}
          </div>

          <div className="mt-4 rounded-2xl bg-black/5 p-6 text-center">
            <div className="text-6xl font-black">{n}</div>
          </div>

          <div className="mt-5">
            <label className="text-xs font-black opacity-60">
              {lang === "ms" ? "Jawapan" : lang === "en" ? "Answer" : "Respuesta"}
            </label>
            <input
              ref={inputRef}
              value={input}
              disabled={gameOver || gameWon}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
              className={[
                "mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-lg font-semibold shadow-sm outline-none",
                gameOver ? "opacity-60" : "",
              ].join(" ")}
              placeholder={lang === "ms" ? "" : lang === "en" ? "" : ""}
              autoComplete="off"
              spellCheck={false}
            />

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={submit}
                disabled={gameOver || gameWon}
                className={[
                  "rounded-2xl bg-amber-300 px-4 py-3 text-sm font-black shadow",
                  gameOver ? "opacity-60" : "hover:bg-amber-200",
                ].join(" ")}
              >
                {lang === "ms" ? "Semak" : lang === "en" ? "Check" : "Comprobar"}
              </button>

              <button
                type="button"
                onClick={nextNumber}
                disabled={gameOver || gameWon}
                className={[
                  "rounded-2xl bg-white px-4 py-3 text-sm font-black shadow",
                  gameOver ? "opacity-60" : "",
                ].join(" ")}
              >
                {lang === "ms" ? "Langkau" : lang === "en" ? "Skip" : "Saltar"}
              </button>
            </div>


            {feedback && (
              <div
                className={[
                  "mt-4 rounded-2xl p-4 text-sm font-semibold",
                  feedback.ok ? "bg-emerald-100/80" : "bg-rose-100/80",
                ].join(" ")}
              >
                {feedback.msg}
              </div>
            )}
          </div>
        </section>
      </div>
{congratsText && (
<div
  className={[
    "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-300",
    congratsFade ? "opacity-0" : "opacity-100",
  ].join(" ")}
>
<div className="flex flex-col items-center gap-0">
  <Image
    src={AKU2_IDLE_SRC}
    alt="AkuAku"
    width={140}
    height={140}
    className="animate-bounce drop-shadow-lg"
    priority
  />

  <div className="text-center text-lg font-black text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">
    {congratsText}
  </div>
</div>
  </div>
)}


    </main>
  );
}
