"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { UiLang } from "@/lib/chapters";
import { getCurrentUser, type UserProfile } from "@/lib/userStore";
import { isMinigameUnlocked, MINIGAME_PREREQUISITES } from "@/lib/minigameUnlocks";
import { MAKAN_APA_ITEMS, type MakanApaItem } from "@/lib/makanApa/items";
import { addHighScore } from "@/lib/highscores";
import { BackgroundAudioControls } from "@/components/game/BackgroundAudio";
import IconActionLink from "@/components/navigation/IconActionLink";

const UI_LANG_KEY = "learnMalay.uiLang.v1";
const MAKAN_APA_DIFFICULTY_KEY = "learnMalay.makanApa.difficulty.v1";
const AKU2_IDLE_SRC = "/assets/characters/Akuaku_idle.png";
const AKU2_SALAH_SRC = "/assets/characters/Akuaku_Salah.webp";
const MAX_LIVES = 5;

type Translated = { ms: string; en: string; es: string };

type GameStatus = "idle" | "wrong" | "correct" | "gameover" | "win";
type MakanApaDifficulty = "easy" | "hard";

function readUiLang(): UiLang {
  if (typeof window === "undefined") return "ms";
  const v = window.localStorage.getItem(UI_LANG_KEY);
  return v === "en" || v === "es" || v === "ms" ? v : "ms";
}

function writeUiLang(lang: UiLang) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(UI_LANG_KEY, lang);
}

function readDifficulty(): MakanApaDifficulty {
  if (typeof window === "undefined") return "easy";
  const v = window.localStorage.getItem(MAKAN_APA_DIFFICULTY_KEY);
  return v === "hard" || v === "easy" ? v : "easy";
}

function writeDifficulty(next: MakanApaDifficulty) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MAKAN_APA_DIFFICULTY_KEY, next);
}

function pick(tr: Translated, lang: UiLang) {
  return lang === "ms" ? tr.ms : lang === "en" ? tr.en : tr.es;
}

function normalizeAnswer(v: string) {
  return v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function isCorrectTypedAnswer(input: string, item: MakanApaItem) {
  const normalized = normalizeAnswer(input);
  if (!normalized) return false;

  return (
    normalizeAnswer(item.name.ms) === normalized ||
    normalizeAnswer(item.name.en) === normalized ||
    normalizeAnswer(item.name.es) === normalized
  );
}

function formatDuration(ms: number) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function optionIdsForQuestion(correctId: string): string[] {
  const others = shuffle(MAKAN_APA_ITEMS.map((i) => i.id).filter((id) => id !== correctId)).slice(0, 3);
  return shuffle([correctId, ...others]);
}

export default function MakanApaPlayPage() {
  const [lang, setLang] = useState<UiLang>("ms");
  const [difficulty, setDifficulty] = useState<MakanApaDifficulty>("easy");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [deck, setDeck] = useState<MakanApaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [optionIds, setOptionIds] = useState<string[]>([]);
  const [eliminatedOptionIds, setEliminatedOptionIds] = useState<string[]>([]);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [lives, setLives] = useState(MAX_LIVES);
  const [status, setStatus] = useState<GameStatus>("idle");
  const [locked, setLocked] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [wrongPopupVisible, setWrongPopupVisible] = useState(false);
  const [wrongPopupFade, setWrongPopupFade] = useState(false);

  const itemById = useMemo(() => new Map(MAKAN_APA_ITEMS.map((i) => [i.id, i])), []);
  const startedAtRef = useRef<number>(Date.now());
  const recordedRef = useRef(false);
  const wrongPopupTimers = useRef<number[]>([]);

  useEffect(() => {
    let alive = true;
    setLang(readUiLang());
    setDifficulty(readDifficulty());
    getCurrentUser()
      .then((u) => {
        if (alive) setUser(u);
      })
      .finally(() => {
        if (alive) setLoadingUser(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  const requiredChapter = MINIGAME_PREREQUISITES["makan-apa"];
  const unlocked = isMinigameUnlocked(user, "makan-apa");

  function startNewGame() {
    wrongPopupTimers.current.forEach((timer) => window.clearTimeout(timer));
    wrongPopupTimers.current = [];
    const nextDeck = shuffle(MAKAN_APA_ITEMS);
    setDeck(nextDeck);
    setCurrentIndex(0);
    setSolvedCount(0);
    setSubmissionCount(0);
    setTypedAnswer("");
    setLives(MAX_LIVES);
    setStatus("idle");
    setLocked(false);
    setElapsedMs(0);
    setWrongPopupVisible(false);
    setWrongPopupFade(false);
    startedAtRef.current = Date.now();
    recordedRef.current = false;
    setEliminatedOptionIds([]);
    if (nextDeck[0]) {
      setOptionIds(optionIdsForQuestion(nextDeck[0].id));
    } else {
      setOptionIds([]);
    }
  }

  useEffect(() => {
    if (!user || !unlocked) return;
    startNewGame();
  }, [user, unlocked]);

  function pickLang(next: UiLang) {
    setLang(next);
    writeUiLang(next);
  }

  function pickDifficulty(next: MakanApaDifficulty) {
    setDifficulty(next);
    writeDifficulty(next);
    startNewGame();
  }

  const current = deck[currentIndex] ?? null;
  const canPlay = Boolean(current) && status !== "gameover" && status !== "win";

  useEffect(() => {
    if (deck.length === 0) return;
    if (status === "gameover" || status === "win") return;

    const id = window.setInterval(() => {
      setElapsedMs(Date.now() - startedAtRef.current);
    }, 250);

    return () => window.clearInterval(id);
  }, [deck.length, status]);

  useEffect(() => {
    return () => {
      wrongPopupTimers.current.forEach((timer) => window.clearTimeout(timer));
      wrongPopupTimers.current = [];
    };
  }, []);

  function recordGameOverOnce(snapshot: {
    solved: number;
    submissions: number;
    timeMs: number;
    lives: number;
  }) {
    if (recordedRef.current) return;
    recordedRef.current = true;

    const totalQuestions = deck.length || MAKAN_APA_ITEMS.length;
    const accuracy = totalQuestions > 0 ? (snapshot.solved / totalQuestions) * 100 : 0;

    void addHighScore("makan-apa", {
      name: user?.name ?? "GUEST",
      avatarId: user?.avatarId,
      accuracy,
      timeMs: snapshot.timeMs,
      meta: {
        result: "gameover",
        difficulty,
        attempts: snapshot.solved,
        solvedCount: snapshot.solved,
        submissions: snapshot.submissions,
        totalQuestions,
        lives: snapshot.lives,
      },
    });
  }

  function nextQuestion() {
    const nextIndex = currentIndex + 1;
    setTypedAnswer("");
    if (nextIndex >= deck.length) {
      setElapsedMs(Date.now() - startedAtRef.current);
      setStatus("win");
      setLocked(true);
      return;
    }

    setCurrentIndex(nextIndex);
    setEliminatedOptionIds([]);
    setOptionIds(optionIdsForQuestion(deck[nextIndex].id));
    setStatus("idle");
    setLocked(false);
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

  function chooseOption(optionId: string) {
    if (!current || !canPlay || locked || difficulty !== "easy") return;
    if (eliminatedOptionIds.includes(optionId)) return;

    const nextSubmissions = submissionCount + 1;
    setSubmissionCount(nextSubmissions);

    if (optionId === current.id) {
      setSolvedCount((prev) => prev + 1);
      setStatus("correct");
      setLocked(true);
      window.setTimeout(nextQuestion, 350);
      return;
    }

    setEliminatedOptionIds((prev) => [...prev, optionId]);
    triggerWrongPopup();

    setLives((prev) => {
      const next = prev - 1;
      if (next <= 0) {
        const timeNow = Date.now() - startedAtRef.current;
        setElapsedMs(timeNow);
        setStatus("gameover");
        setLocked(true);
        recordGameOverOnce({
          solved: solvedCount,
          submissions: nextSubmissions,
          timeMs: timeNow,
          lives: 0,
        });
        return 0;
      }
      setStatus("wrong");
      return next;
    });
  }

  function submitTypedAnswer() {
    if (!current || !canPlay || locked || difficulty !== "hard") return;
    if (!typedAnswer.trim()) return;

    const nextSubmissions = submissionCount + 1;
    setSubmissionCount(nextSubmissions);

    if (isCorrectTypedAnswer(typedAnswer, current)) {
      setSolvedCount((prev) => prev + 1);
      setTypedAnswer("");
      setStatus("correct");
      setLocked(true);
      window.setTimeout(nextQuestion, 350);
      return;
    }

    setTypedAnswer("");
    triggerWrongPopup();
    setLives((prev) => {
      const next = prev - 1;
      if (next <= 0) {
        const timeNow = Date.now() - startedAtRef.current;
        setElapsedMs(timeNow);
        setStatus("gameover");
        setLocked(true);
        recordGameOverOnce({
          solved: solvedCount,
          submissions: nextSubmissions,
          timeMs: timeNow,
          lives: 0,
        });
        return 0;
      }
      setStatus("wrong");
      return next;
    });
  }

  if (loadingUser) return null;

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-200 via-sky-200 to-amber-200 app-page-pad">
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
      <main className="min-h-screen bg-gradient-to-b from-emerald-200 via-sky-200 to-amber-200 app-page-pad">
        <div className="mx-auto max-w-xl rounded-2xl bg-white/85 p-6 shadow">
          <h1 className="crash-text crash-outline-fallback text-5xl font-black">LOCKED</h1>
          <p className="mt-4 text-sm font-semibold text-black/70">
            Complete Chapter {requiredChapter} first to play Makan Apa?.
          </p>
          <div className="mt-6 flex gap-3">
            <IconActionLink href="/map" kind="map" tooltip="Back to Map" />
            <IconActionLink href="/minigames" kind="minigames" tooltip="Back to Mini Games" />
          </div>
        </div>
      </main>
    );
  }

  const title = lang === "ms" ? "MAKAN\nAPA?" : lang === "en" ? "WHAT TO\nEAT?" : "¿QUE\nCOMER?";

  const labels: Record<string, Translated> = {
    lives: { ms: "Nyawa", en: "Lives", es: "Vidas" },
    question: { ms: "Soalan", en: "Question", es: "Pregunta" },
    answered: { ms: "Betul Dijawab", en: "Answered", es: "Respondidas" },
    time: { ms: "Masa", en: "Time", es: "Tiempo" },
    mode: { ms: "Mod", en: "Mode", es: "Modo" },
    easy: { ms: "Mudah", en: "Easy", es: "Facil" },
    hard: { ms: "Sukar", en: "Hard", es: "Dificil" },
    chooseEasy: { ms: "Pilih jawapan yang betul.", en: "Choose the correct answer.", es: "Elige la respuesta correcta." },
    chooseHard: {
      ms: "Taip nama makanan yang betul.",
      en: "Type the correct dish name.",
      es: "Escribe el nombre correcto del plato.",
    },
    wrongEasy: {
      ms: "Salah. Pilihan itu sudah dikunci. Cuba jawapan lain.",
      en: "Wrong. That option is now locked. Try another answer.",
      es: "Incorrecto. Esa opcion ya esta bloqueada. Prueba otra respuesta.",
    },
    wrongHard: {
      ms: "Salah. Nyawa berkurang satu. Cuba lagi.",
      en: "Wrong. You lost 1 life. Try again.",
      es: "Incorrecto. Perdiste 1 vida. Intenta otra vez.",
    },
    correct: { ms: "Betul!", en: "Correct!", es: "¡Correcto!" },
    gameover: { ms: "Nyawa habis. Cuba lagi!", en: "No lives left. Try again!", es: "Sin vidas. ¡Intenta otra vez!" },
    win: { ms: "Tahniah! Anda habis semua soalan!", en: "Congrats! You finished all questions!", es: "¡Felicidades! ¡Terminaste todas las preguntas!" },
    answerHint: {
      ms: "Contoh: Nasi Lemak",
      en: "Example: Nasi Lemak",
      es: "Ejemplo: Nasi Lemak",
    },
    submit: { ms: "Semak", en: "Submit", es: "Enviar" },
  };

  const instruction = difficulty === "easy" ? labels.chooseEasy : labels.chooseHard;
  const wrongFeedback = difficulty === "easy" ? labels.wrongEasy : labels.wrongHard;

  return (
    <main className="relative min-h-screen bg-cover bg-center app-page-pad">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative mx-auto max-w-5xl space-y-4 phone-lg:space-y-6">
        <div className="flex flex-col gap-3 tablet:flex-row tablet:items-end tablet:justify-between tablet:gap-4">
          <div>
            <h1 className="crash-text crash-outline-fallback whitespace-pre-line text-5xl font-black leading-none phone-lg:text-6xl">{title}</h1>
            <p className="mt-2 text-sm font-semibold text-white/90">{pick(instruction, lang)}</p>
          </div>

          <div className="w-full rounded-2xl bg-white/90 p-3 shadow phone-lg:p-4 tablet:w-auto">
            <div className="mb-3">
              <BackgroundAudioControls />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:border-r sm:border-black/10 sm:pr-4">
                <div className="text-xs font-black opacity-70">{pick(labels.mode, lang)}</div>
                <div className="mt-1 flex gap-2">
                  <button
                    onClick={() => pickDifficulty("easy")}
                    className={`touch-target rounded-full px-3 py-1 text-xs font-black shadow ${difficulty === "easy" ? "bg-amber-300" : "bg-white"}`}
                  >
                    {pick(labels.easy, lang)}
                  </button>
                  <button
                    onClick={() => pickDifficulty("hard")}
                    className={`touch-target rounded-full px-3 py-1 text-xs font-black shadow ${difficulty === "hard" ? "bg-amber-300" : "bg-white"}`}
                  >
                    {pick(labels.hard, lang)}
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[11px] font-black opacity-70">{pick(labels.question, lang)}</div>
                    <div className="text-3xl font-black leading-none phone-lg:text-4xl sm:text-3xl">
                      {Math.min(currentIndex + 1, deck.length)} / {deck.length || 0}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-black opacity-70">{pick(labels.answered, lang)}</div>
                    <div className="text-3xl font-black leading-none phone-lg:text-4xl sm:text-3xl">
                      {solvedCount} / {deck.length || 0}
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-[11px] font-black opacity-70">{pick(labels.time, lang)}</div>
                  <div className="text-3xl font-black leading-none phone-lg:text-4xl sm:text-3xl">{formatDuration(elapsedMs)}</div>
                </div>
              </div>

              <div className="sm:pl-4">
                <div className="text-xs font-black opacity-70">{pick(labels.lives, lang)}</div>
                <div className="mt-1 flex items-center gap-1">
                  {Array.from({ length: MAX_LIVES }).map((_, i) => (
                    <Image
                      key={`life-${i}`}
                      src={AKU2_IDLE_SRC}
                      alt="life"
                      width={36}
                      height={36}
                      className={[
                        "h-10 w-10 drop-shadow",
                        i < lives ? "opacity-100" : "opacity-25 grayscale",
                      ].join(" ")}
                      priority
                    />
                  ))}
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => pickLang("ms")}
                    className={`touch-target rounded-full px-3 py-1 text-xs font-black shadow ${lang === "ms" ? "bg-amber-300" : "bg-white"}`}
                  >
                    BM
                  </button>
                  <button
                    onClick={() => pickLang("en")}
                    className={`touch-target rounded-full px-3 py-1 text-xs font-black shadow ${lang === "en" ? "bg-amber-300" : "bg-white"}`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => pickLang("es")}
                    className={`touch-target rounded-full px-3 py-1 text-xs font-black shadow ${lang === "es" ? "bg-amber-300" : "bg-white"}`}
                  >
                    ES
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <IconActionLink
                    onClick={startNewGame}
                    kind="restart"
                    tooltip={lang === "ms" ? "Main Semula" : lang === "en" ? "Restart" : "Reiniciar"}
                  />
                  <Link href="/minigames/makan-apa" className="rounded-xl bg-white px-3 py-2 text-xs font-bold shadow">
                    {lang === "ms" ? "Info Game" : lang === "en" ? "Game Info" : "Info del Juego"}
                  </Link>
                  <IconActionLink href="/minigames" kind="minigames" tooltip="Back to Mini Games" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {current && (
          <section className="rounded-3xl bg-white/92 p-4 shadow-xl phone-lg:p-5 sm:p-6">
            <div className="mx-auto mb-4 flex w-full max-w-4xl justify-center phone-lg:mb-5">
              <div className="overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow">
                <Image
                  src={current.imageSrc}
                  alt={pick(current.name, lang)}
                  width={820}
                  height={520}
                  className="h-auto max-h-[44vh] w-full max-w-[820px] rounded-xl object-contain phone-lg:max-h-[48vh]"
                  priority
                />
              </div>
            </div>

            {difficulty === "easy" ? (
              <div className="mx-auto grid max-w-4xl gap-2 phone-lg:gap-3 sm:grid-cols-2">
                {optionIds.map((optionId) => {
                  const option = itemById.get(optionId);
                  if (!option) return null;
                  const disabled = eliminatedOptionIds.includes(optionId) || status === "gameover" || status === "win";

                  return (
                    <button
                      key={optionId}
                      onClick={() => chooseOption(optionId)}
                      disabled={disabled || locked}
                      className={[
                        "touch-target min-h-[3rem] rounded-2xl border px-4 py-3 text-left text-base font-black shadow transition phone-lg:text-lg",
                        disabled
                          ? "cursor-not-allowed border-black/10 bg-gray-300 text-gray-500"
                          : "border-black/15 bg-amber-100 hover:bg-amber-200 active:scale-[0.99]",
                      ].join(" ")}
                    >
                      {pick(option.name, lang)}
                    </button>
                  );
                })}
              </div>
            ) : (
              <form
                className="mx-auto max-w-2xl"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitTypedAnswer();
                }}
              >
                <div className="text-center text-sm font-black opacity-80">{pick(labels.chooseHard, lang)}</div>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <input
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    disabled={status === "gameover" || status === "win" || locked}
                    placeholder={pick(labels.answerHint, lang)}
                    className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-base font-bold outline-none focus:border-amber-400 disabled:opacity-60 phone-lg:text-lg"
                  />
                  <button
                    type="submit"
                    disabled={status === "gameover" || status === "win" || locked || !typedAnswer.trim()}
                    className="touch-target rounded-xl bg-amber-300 px-4 py-3 text-sm font-black shadow hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {pick(labels.submit, lang)}
                  </button>
                </div>
              </form>
            )}

            <div className="mt-4 min-h-7 text-center text-sm font-black">
              {status === "wrong" && <span className="text-red-700">{pick(wrongFeedback, lang)}</span>}
              {status === "correct" && <span className="text-emerald-700">{pick(labels.correct, lang)}</span>}
              {status === "gameover" && <span className="text-red-700">{pick(labels.gameover, lang)}</span>}
              {status === "win" && <span className="text-emerald-700">{pick(labels.win, lang)}</span>}
            </div>
          </section>
        )}
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
