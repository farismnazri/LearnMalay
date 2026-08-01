"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { UiLang } from "@/lib/chapters";
import ArahJalanDynamicMap from "@/components/game/ArahJalanDynamicMap";
import { BackgroundAudioControls } from "@/components/game/BackgroundAudio";
import StylizedTitle from "@/components/game/StylizedTitle";
import IconActionLink from "@/components/navigation/IconActionLink";
import { isMinigameUnlocked, MINIGAME_PREREQUISITES } from "@/lib/minigameUnlocks";
import { getCurrentUser, type UserProfile } from "@/lib/userStore";
import { addHighScore, createRunId, loadHighScores } from "@/lib/highscores";
import { canSaveHighscores } from "@/lib/userCapabilities";
import {
  ARAH_JALAN_COMMAND_LABELS,
  ARAH_JALAN_COMMAND_ORDER,
  ARAH_JALAN_MISSION_PREFIX,
  ARAH_JALAN_PLAY_HELPER,
} from "@/lib/arahJalan/items";
import {
  ARAH_JALAN_DIFFICULTIES,
  ARAH_JALAN_DIFFICULTY_IDS,
  createRandomArahJalanBoard,
  type ArahJalanBoard,
  type ArahJalanDifficultyId,
} from "@/lib/arahJalan/board";
import {
  canAppendCommand,
  pickRandomScenario,
  simulateArahJalanRun,
  type ArahJalanCommandId,
  type ArahJalanFailureReason,
  type ArahJalanRunResult,
  type ArahJalanScenario,
  type ArahJalanState,
  type ArahJalanNode,
  type Facing,
} from "@/lib/arahJalan/engine";
import { resolveArahJalanStreakAfterMistake } from "@/lib/arahJalan/streakScoring";

const UI_LANG_KEY = "learnMalay.uiLang.v1";
const AKU2_IDLE_SRC = "/assets/characters/Akuaku_idle.png";
const MAX_QUEUE_LENGTH = 16;
const STEP_DELAY_MS = 460;

type Translated = { ms: string; en: string; es: string };
type FeedbackTone = "ok" | "bad" | "warn";
type FeedbackState = { tone: FeedbackTone; text: string };
type ArahJalanRound = {
  board: ArahJalanBoard;
  scenario: ArahJalanScenario;
};
type ActionIconKind = "run" | "undo" | "clear";

function readUiLang(): UiLang {
  if (typeof window === "undefined") return "ms";
  const v = window.localStorage.getItem(UI_LANG_KEY);
  return v === "en" || v === "es" || v === "ms" ? v : "ms";
}

function writeUiLang(lang: UiLang) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(UI_LANG_KEY, lang);
}

function pick(tr: Translated, lang: UiLang) {
  return lang === "ms" ? tr.ms : lang === "en" ? tr.en : tr.es;
}

function commandSecondaryLabel(commandId: ArahJalanCommandId, lang: UiLang) {
  const label = ARAH_JALAN_COMMAND_LABELS[commandId];
  return lang === "es" ? label.es : label.en;
}

function actionLabel(kind: ActionIconKind, lang: UiLang): string {
  if (kind === "run") {
    return lang === "ms" ? "Jalankan" : lang === "en" ? "Run" : "Ejecutar";
  }
  if (kind === "undo") {
    return lang === "ms"
      ? "Undur satu langkah"
      : lang === "en"
      ? "Undo one step"
      : "Deshacer un paso";
  }
  return lang === "ms" ? "Kosongkan arahan" : lang === "en" ? "Clear commands" : "Vaciar comandos";
}

function ActionIcon({ kind }: { kind: ActionIconKind }) {
  if (kind === "run") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5 fill-current">
        <path d="M8 5.5v13l10-6.5z" />
      </svg>
    );
  }
  if (kind === "undo") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 7H4v5" />
        <path d="M4 12c1.8-3.9 5.5-6 9.6-6 4.6 0 8.4 2.7 9.4 7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6" />
      <path d="M10 8v8" />
      <path d="M14 8v8" />
      <path d="M5 6h14" />
      <path d="M7 6l1 14h8l1-14" />
    </svg>
  );
}

function facingLabel(facing: Facing): Translated {
  switch (facing) {
    case "north":
      return { ms: "Utara", en: "North", es: "Norte" };
    case "east":
      return { ms: "Timur", en: "East", es: "Este" };
    case "south":
      return { ms: "Selatan", en: "South", es: "Sur" };
    case "west":
      return { ms: "Barat", en: "West", es: "Oeste" };
  }
}

function failureMessage(reason: ArahJalanFailureReason | null, lang: UiLang): string {
  if (reason === "move-no-road") {
    return lang === "ms"
      ? "Gagal: tiada jalan pada arah itu."
      : lang === "en"
      ? "Failed: there is no road in that direction."
      : "Fallo: no hay carretera en esa dirección.";
  }
  if (reason === "arrive-wrong-location") {
    return lang === "ms"
      ? "Gagal: arahan 'Sampai' dibuat di lokasi yang salah."
      : lang === "en"
      ? "Failed: 'Sampai' was used at the wrong location."
      : "Fallo: se usó 'Sampai' en la ubicación incorrecta.";
  }
  if (reason === "reached-destination-without-arrive") {
    return lang === "ms"
      ? "Gagal: anda sampai destinasi tetapi tidak tamat dengan 'Sampai'."
      : lang === "en"
      ? "Failed: you reached the destination but did not finish with 'Sampai'."
      : "Fallo: llegaste al destino pero no terminaste con 'Sampai'.";
  }
  if (reason === "queue-ended-not-destination") {
    return lang === "ms"
      ? "Gagal: laluan tamat di lokasi yang bukan destinasi."
      : lang === "en"
      ? "Failed: route ended at a non-destination node."
      : "Fallo: la ruta terminó en un nodo que no era el destino.";
  }
  return lang === "ms"
    ? "Gagal: arahan akhir mesti 'Sampai'."
    : lang === "en"
    ? "Failed: the final command must be 'Sampai'."
    : "Fallo: el comando final debe ser 'Sampai'.";
}

function buildMissionText(destination: ArahJalanNode, lang: UiLang) {
  if (lang === "ms") return `${ARAH_JALAN_MISSION_PREFIX.ms} ${destination.label.ms}.`;
  if (lang === "en") return `${ARAH_JALAN_MISSION_PREFIX.en} the ${destination.label.en}.`;
  return `${ARAH_JALAN_MISSION_PREFIX.es} ${destination.label.es}.`;
}

function createArahJalanRound(difficultyId: ArahJalanDifficultyId): ArahJalanRound {
  const board = createRandomArahJalanBoard(difficultyId);
  return {
    board,
    scenario: pickRandomScenario(board.graph),
  };
}

export default function ArahJalanPlayPage() {
  const [lang, setLang] = useState<UiLang>(() => readUiLang());
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [difficultyId, setDifficultyId] = useState<ArahJalanDifficultyId>("easy");
  const [round, setRound] = useState<ArahJalanRound>(() => createArahJalanRound("easy"));
  const [playerState, setPlayerState] = useState<ArahJalanState>(() => ({
    nodeId: round.scenario.startNodeId,
    facing: round.scenario.startFacing,
  }));

  const [queue, setQueue] = useState<ArahJalanCommandId[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [lastResult, setLastResult] = useState<ArahJalanRunResult | null>(null);

  const [runs, setRuns] = useState(0);
  const [wins, setWins] = useState(0);
  const [fails, setFails] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [sessionBestStreak, setSessionBestStreak] = useState(0);
  const [bestSavedStreak, setBestSavedStreak] = useState(0);

  const runTimersRef = useRef<number[]>([]);
  const runIdRef = useRef(0);
  const savedFailedRunIdsRef = useRef<Set<number>>(new Set());
  const currentStreakStartedAtRef = useRef<number | null>(null);
  const scenarioStartedAtRef = useRef(Date.now());
  const correctResponseTimeTotalRef = useRef(0);
  const correctResponseCountRef = useRef(0);
  const { board, scenario } = round;

  const startNode = board.graph.nodes[scenario.startNodeId];
  const destinationNode = board.graph.nodes[scenario.destinationNodeId];
  const playerNode = board.graph.nodes[playerState.nodeId];

  const requiredChapter = MINIGAME_PREREQUISITES["arah-jalan"];
  const unlocked = isMinigameUnlocked(user, "arah-jalan");

  const secondaryHelperLang: UiLang = lang === "es" ? "es" : "en";
  const missionMs = destinationNode ? `${ARAH_JALAN_MISSION_PREFIX.ms} ${destinationNode.label.ms}.` : "";
  const missionSecondary =
    lang === "ms" || !destinationNode ? "" : buildMissionText(destinationNode, secondaryHelperLang);

  useEffect(() => {
    let alive = true;
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

  useEffect(() => {
    if (!user?.name) return;

    let alive = true;
    loadHighScores()
      .then((store) => {
        if (!alive || !store) return;
        const mine = (store["arah-jalan"] ?? []).filter((entry) => entry.name === user.name);
        const best = mine.reduce((max, entry) => {
          const score = typeof entry.score === "number" && Number.isFinite(entry.score) ? entry.score : 0;
          return Math.max(max, score);
        }, 0);
        setBestSavedStreak(best);
      })
      .catch((error) => {
        console.error("Failed to load Arah Jalan highscores", error);
      });

    return () => {
      alive = false;
    };
  }, [user?.name]);

  useEffect(() => {
    return () => {
      for (const timer of runTimersRef.current) window.clearTimeout(timer);
      runTimersRef.current = [];
    };
  }, []);

  function clearTimers() {
    for (const timer of runTimersRef.current) window.clearTimeout(timer);
    runTimersRef.current = [];
  }

  function resetStreak() {
    setCurrentStreak(0);
    currentStreakStartedAtRef.current = null;
    correctResponseTimeTotalRef.current = 0;
    correctResponseCountRef.current = 0;
  }

  function startScenario(
    nextDifficultyId: ArahJalanDifficultyId = difficultyId,
    options: { resetStreak?: boolean } = {},
  ) {
    const shouldResetStreak = options.resetStreak ?? true;
    clearTimers();
    const nextRound = createArahJalanRound(nextDifficultyId);
    setRound(nextRound);
    setQueue([]);
    setPlayerState({
      nodeId: nextRound.scenario.startNodeId,
      facing: nextRound.scenario.startFacing,
    });
    setLastResult(null);
    setFeedback(null);
    if (shouldResetStreak) {
      if (currentStreak > 0) void saveEndedStreakOnce(++runIdRef.current, currentStreak, difficultyId, "abandoned");
      resetStreak();
    }
    scenarioStartedAtRef.current = Date.now();
  }

  function changeDifficulty(nextDifficultyId: ArahJalanDifficultyId) {
    if (isRunning || nextDifficultyId === difficultyId) return;
    setDifficultyId(nextDifficultyId);
    startScenario(nextDifficultyId, { resetStreak: true });
  }

  function pickLang(next: UiLang) {
    setLang(next);
    writeUiLang(next);
  }

  function appendCommand(commandId: ArahJalanCommandId) {
    if (isRunning) return;

    if (queue.length >= MAX_QUEUE_LENGTH) {
      setFeedback({
        tone: "warn",
        text:
          lang === "ms"
            ? `Maksimum ${MAX_QUEUE_LENGTH} arahan setiap pusingan.`
            : lang === "en"
            ? `Maximum ${MAX_QUEUE_LENGTH} commands per run.`
            : `Máximo ${MAX_QUEUE_LENGTH} comandos por ejecución.`,
      });
      return;
    }

    if (!canAppendCommand(queue, commandId)) {
      setFeedback({
        tone: "warn",
        text:
          lang === "ms"
            ? "Arahan 'Sampai' mesti yang terakhir."
            : lang === "en"
            ? "Command 'Sampai' must be the last command."
            : "El comando 'Sampai' debe ser el último.",
      });
      return;
    }

    setQueue((prev) => [...prev, commandId]);
    setFeedback(null);
  }

  function undoCommand() {
    if (isRunning) return;
    setQueue((prev) => prev.slice(0, -1));
    setFeedback(null);
  }

  function clearQueue() {
    if (isRunning) return;
    setQueue([]);
    setFeedback(null);
  }

  async function saveEndedStreakOnce(
    runId: number,
    streak: number,
    streakDifficultyId: ArahJalanDifficultyId,
    outcome: "failed" | "abandoned" = "failed",
  ) {
    const endedStreak = resolveArahJalanStreakAfterMistake(streak);
    const endedAt = Date.now();
    const startedAt = currentStreakStartedAtRef.current ?? endedAt;
    const correctResponseTimeTotal = correctResponseTimeTotalRef.current;
    const correctResponseCount = correctResponseCountRef.current;
    setCurrentStreak(endedStreak.nextCurrentStreak);
    currentStreakStartedAtRef.current = null;
    correctResponseTimeTotalRef.current = 0;
    correctResponseCountRef.current = 0;

    if (!endedStreak.scoreToSave || savedFailedRunIdsRef.current.has(runId)) return;
    savedFailedRunIdsRef.current.add(runId);

    setSessionBestStreak((best) => Math.max(best, endedStreak.scoreToSave ?? 0));
    if (!canSaveHighscores(user)) return;

    const timeMs = Math.min(21_600_000, Math.max(0, endedAt - startedAt));
    const averageCorrectResponseTimeMs = Math.round(
      correctResponseTimeTotal / Math.max(1, correctResponseCount)
    );

    try {
      await addHighScore("arah-jalan", {
      runId: createRunId(), outcome,
      score: endedStreak.scoreToSave,
      accuracy: (endedStreak.scoreToSave / (endedStreak.scoreToSave + 1)) * 100,
      timeMs,
      attempts: endedStreak.scoreToSave + 1, correct: endedStreak.scoreToSave, mistakes: 1, hints: 0,
      difficulty: streakDifficultyId, averageCorrectResponseTimeMs,
      });
      if (outcome === "failed") setBestSavedStreak((best) => Math.max(best, endedStreak.scoreToSave ?? 0));
    } catch (error) {
      savedFailedRunIdsRef.current.delete(runId);
      console.error("Failed to save Arah Jalan highscore", error);
    }
  }

  function runQueue() {
    if (isRunning) return;
    if (queue.length === 0) {
      setFeedback({
        tone: "warn",
        text:
          lang === "ms"
            ? "Tambah arahan dahulu sebelum tekan Run."
            : lang === "en"
            ? "Add commands before pressing Run."
            : "Agrega comandos antes de pulsar Run.",
      });
      return;
    }

    clearTimers();
    setIsRunning(true);
    setFeedback(null);
    setLastResult(null);

    const runId = ++runIdRef.current;
    const runStartedAt = Date.now();
    const result = simulateArahJalanRun(board.graph, scenario, queue);
    const startingState: ArahJalanState = {
      nodeId: scenario.startNodeId,
      facing: scenario.startFacing,
    };
    setPlayerState(startingState);

    result.steps.forEach((step, idx) => {
      const timer = window.setTimeout(() => {
        setPlayerState(step.to);
      }, (idx + 1) * STEP_DELAY_MS);
      runTimersRef.current.push(timer);
    });

    const finishTimer = window.setTimeout(() => {
      setLastResult(result);
      setRuns((v) => v + 1);
      if (result.success) {
        const nextStreak = currentStreak + 1;
        if (currentStreak === 0) currentStreakStartedAtRef.current = runStartedAt;
        correctResponseTimeTotalRef.current += Math.max(0, runStartedAt - scenarioStartedAtRef.current);
        correctResponseCountRef.current += 1;
        setCurrentStreak(nextStreak);
        setSessionBestStreak((best) => Math.max(best, nextStreak));
        setWins((v) => v + 1);
        setFeedback({
          tone: "ok",
          text:
            lang === "ms"
              ? "Berjaya! Laluan tepat. Misi baru dijana."
              : lang === "en"
              ? "Success! Correct route. New mission generated."
              : "¡Éxito! Ruta correcta. Nueva misión generada.",
        });

        const nextTimer = window.setTimeout(() => {
          startScenario(difficultyId, { resetStreak: false });
          setIsRunning(false);
        }, 1200);
        runTimersRef.current.push(nextTimer);
      } else {
        setFails((v) => v + 1);
        saveEndedStreakOnce(runId, currentStreak, difficultyId);
        setFeedback({
          tone: "bad",
          text: failureMessage(result.failureReason, lang),
        });
        setIsRunning(false);
      }
    }, Math.max(180, result.steps.length * STEP_DELAY_MS + 150));
    runTimersRef.current.push(finishTimer);
  }

  if (loadingUser) return null;

  if (!user) {
    return (
      <main className="chapter-page-shell relative min-h-screen overflow-x-hidden app-page-pad">
      <div className="chapter-viewport-bg" aria-hidden="true">
        <div className="chapter-viewport-bg-image" />
        <div className="chapter-viewport-bg-fade" />
      </div>
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
      <main className="chapter-page-shell relative min-h-screen overflow-x-hidden app-page-pad">
      <div className="chapter-viewport-bg" aria-hidden="true">
        <div className="chapter-viewport-bg-image" />
        <div className="chapter-viewport-bg-fade" />
      </div>
        <div className="mx-auto max-w-xl rounded-2xl bg-white/85 p-6 shadow">
          <h1 className="crash-text crash-outline-fallback text-5xl font-black">LOCKED</h1>
          <p className="mt-4 text-sm font-semibold text-black/70">
            Complete Chapter {requiredChapter} first to play Arah Jalan.
          </p>
          <div className="mt-6 flex gap-3">
            <IconActionLink href="/map" kind="map" tooltip="Back to Map" />
            <IconActionLink href="/minigames" kind="minigames" tooltip="Back to Mini Games" />
          </div>
        </div>
      </main>
    );
  }

  const title =
    lang === "ms"
      ? "ARAH\nJALAN"
      : lang === "en"
      ? "DIRECTION\nROUTE"
      : "RUTA\nDIRECCIONES";

  const winRate = runs > 0 ? Math.round((wins / runs) * 100) : 0;
  const bestAvailableStreak = Math.max(bestSavedStreak, sessionBestStreak, currentStreak);

  return (
    <main className="chapter-page-shell relative min-h-screen overflow-x-hidden overflow-y-auto app-page-pad">
      <div className="chapter-viewport-bg" aria-hidden="true">
        <div className="chapter-viewport-bg-image" />
        <div className="chapter-viewport-bg-fade" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-4 phone-lg:space-y-6">
        <div className="flex flex-col gap-3 tablet:flex-row tablet:items-end tablet:justify-between tablet:gap-4">
          <div>
            <StylizedTitle title={title} />
            <p className="mt-2 text-sm font-semibold text-[#fff4c7]">{pick(ARAH_JALAN_PLAY_HELPER, lang)}</p>
          </div>

          <div className="w-full rounded-2xl bg-white/90 p-3 shadow-xl phone-lg:p-4 tablet:w-auto">
            <div className="text-xs font-black opacity-70">LANGUAGE</div>
            <div className="mt-2 grid grid-cols-3 gap-2">
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

            <div className="mt-3 flex items-center gap-2">
              <Link href="/minigames/arah-jalan" className="rounded-xl bg-white px-3 py-2 text-xs font-bold shadow">
                Intro
              </Link>
              <IconActionLink
                onClick={() => startScenario()}
                kind="restart"
                tooltip={lang === "ms" ? "Misi Baharu" : lang === "en" ? "New Mission" : "Nueva Misión"}
                disabled={isRunning}
              />
              <IconActionLink href="/minigames/highscores" kind="highscores" tooltip="High Scores" />
              <IconActionLink href="/minigames" kind="minigames" tooltip="Back to Mini Games" />
              <BackgroundAudioControls variant="icon" />
            </div>
          </div>
        </div>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="rounded-3xl border border-[#d4c085]/70 bg-[#fff6db]/94 p-4 shadow-xl">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-[11px] font-black uppercase tracking-wide text-[#5d4a13]/70">
                  {lang === "ms" ? "Peta Dinamik" : lang === "en" ? "Dynamic Map" : "Mapa dinámico"}
                </div>
                <div className="text-sm font-black text-[#4a380b]">
                  {lang === "ms"
                    ? "Kiri: Barat • Kanan: Timur • Atas: Utara • Bawah: Selatan"
                    : lang === "en"
                    ? "Left: West • Right: East • Up: North • Down: South"
                    : "Izquierda: Oeste • Derecha: Este • Arriba: Norte • Abajo: Sur"}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {ARAH_JALAN_DIFFICULTY_IDS.map((id) => {
                    const difficulty = ARAH_JALAN_DIFFICULTIES[id];
                    const selected = difficultyId === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => changeDifficulty(id)}
                        disabled={isRunning || selected}
                        className={[
                          "touch-target rounded-full border px-3 py-1.5 text-xs font-black shadow-sm transition",
                          selected
                            ? "border-[#9b6a0c] bg-[#ffc94f] text-[#3d2d00]"
                            : "border-[#d6bd78] bg-white text-[#5a430b] hover:bg-[#fff0c7]",
                          isRunning ? "cursor-not-allowed opacity-70" : "",
                        ].join(" ")}
                      >
                        {pick(difficulty.label, lang)} · {difficulty.gridSize}x{difficulty.gridSize}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-[#d8c792] bg-[#fff5d5] px-2.5 py-1.5 text-xs font-black text-[#5b4510]">
                <Image src={AKU2_IDLE_SRC} alt="AkuAku" width={32} height={32} className="h-8 w-8" />
                {isRunning
                  ? lang === "ms"
                    ? "Bergerak..."
                    : lang === "en"
                    ? "Running..."
                    : "Ejecutando..."
                  : lang === "ms"
                  ? "Sedia"
                  : lang === "en"
                  ? "Ready"
                  : "Listo"}
              </div>
            </div>

            <ArahJalanDynamicMap
              board={board}
              playerState={playerState}
              destinationNodeId={scenario.destinationNodeId}
              stepDelayMs={STEP_DELAY_MS}
            />
          </div>

          <aside className="space-y-4 lg:sticky lg:top-3 lg:self-start">
            <div className="rounded-3xl border border-[#d8c790]/75 bg-[#fff5d7]/95 p-4 shadow-xl">
              <div className="text-[11px] font-black uppercase tracking-wide text-[#6e5918]/70">
                {lang === "ms" ? "Misi" : lang === "en" ? "Mission" : "Misión"}
              </div>
              <div className="mt-1 text-base font-black text-[#3d2d00]">{missionMs}</div>
              {missionSecondary ? <div className="mt-1 text-xs font-bold text-[#6b5415]">{missionSecondary}</div> : null}

              <div className="mt-3 space-y-2 rounded-2xl border border-[#e0d1a2] bg-white/80 p-3 text-xs font-black text-[#5f4a13]">
                <div>
                  {lang === "ms" ? "Mula" : lang === "en" ? "Start" : "Inicio"}:{" "}
                  <span className="text-[#3f2f00]">{startNode?.label.ms ?? "-"}</span>
                </div>
                <div>
                  {lang === "ms" ? "Hadap" : lang === "en" ? "Facing" : "Mirando"}:{" "}
                  <span className="text-[#3f2f00]">{pick(facingLabel(scenario.startFacing), lang)}</span>
                </div>
                <div>
                  {lang === "ms" ? "Destinasi" : lang === "en" ? "Destination" : "Destino"}:{" "}
                  <span className="text-[#3f2f00]">{destinationNode?.label.ms ?? "-"}</span>
                </div>
                <div>
                  {lang === "ms" ? "Posisi kini" : lang === "en" ? "Current node" : "Nodo actual"}:{" "}
                  <span className="text-[#3f2f00]">{playerNode?.label.ms ?? "-"}</span>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {ARAH_JALAN_COMMAND_ORDER.map((commandId) => {
                  const label = ARAH_JALAN_COMMAND_LABELS[commandId];
                  const disabled =
                    isRunning || queue.length >= MAX_QUEUE_LENGTH || !canAppendCommand(queue, commandId);
                  return (
                    <button
                      key={commandId}
                      type="button"
                      onClick={() => appendCommand(commandId)}
                      disabled={disabled}
                      className={[
                        "touch-target rounded-2xl border px-3 py-2 text-left shadow-sm transition",
                        disabled
                          ? "cursor-not-allowed border-[#d9cea7] bg-[#ece7d8] text-[#807159] opacity-80"
                          : "border-[#d7c58d] bg-white text-[#3f2f00] hover:bg-[#fff3cf] active:scale-[0.98]",
                      ].join(" ")}
                    >
                      <div className="text-xs font-black">{label.ms}</div>
                      {lang === "ms" ? null : (
                        <div className="text-[10px] font-semibold opacity-75">{commandSecondaryLabel(commandId, lang)}</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col rounded-3xl border border-[#d8c790]/75 bg-[#fff5d7]/95 p-4 shadow-xl lg:max-h-[72svh]">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-black uppercase tracking-wide text-[#6e5918]/70">
                  {lang === "ms" ? "Queue Arahan" : lang === "en" ? "Command Queue" : "Cola de comandos"}
                </div>
                <div className="text-[11px] font-black text-[#6b5415]">
                  {queue.length}/{MAX_QUEUE_LENGTH}
                </div>
              </div>

              <div className="relative mt-2 min-h-24 flex-1 overflow-hidden rounded-xl border border-[#e2d2a5] bg-white/75">
                {queue.length === 0 ? (
                  <div className="p-3 text-xs font-semibold text-[#7a6840]">
                    {lang === "ms"
                      ? "Belum ada arahan."
                      : lang === "en"
                      ? "No commands yet."
                      : "Aún no hay comandos."}
                  </div>
                ) : (
                  <>
                    <ol className="h-full max-h-[32svh] space-y-1.5 overflow-y-auto p-2.5 pr-2">
                      {queue.map((commandId, idx) => (
                        <li
                          key={`${commandId}-${idx}`}
                          className="rounded-xl border border-[#e2d2a5] bg-white px-2.5 py-2 text-xs font-black text-[#3f2f00]"
                        >
                          <span className="mr-1.5 opacity-65">{idx + 1}.</span>
                          {ARAH_JALAN_COMMAND_LABELS[commandId].ms}
                        </li>
                      ))}
                    </ol>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#fff0c7]/95 to-transparent" />
                  </>
                )}
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={runQueue}
                  disabled={isRunning || queue.length === 0}
                  aria-label={actionLabel("run", lang)}
                  title={actionLabel("run", lang)}
                  className={[
                    "touch-target flex items-center justify-center rounded-xl border px-3 py-2 text-xs font-black shadow",
                    isRunning || queue.length === 0
                      ? "cursor-not-allowed border-[#d9cea7] bg-[#ece7d8] text-[#807159]"
                      : "border-[#3a7a35] bg-[#65b559] text-white hover:bg-[#5aac4e]",
                  ].join(" ")}
                >
                  <ActionIcon kind="run" />
                </button>
                <button
                  type="button"
                  onClick={undoCommand}
                  disabled={isRunning || queue.length === 0}
                  aria-label={actionLabel("undo", lang)}
                  title={actionLabel("undo", lang)}
                  className={[
                    "touch-target flex items-center justify-center rounded-xl border px-3 py-2 text-xs font-black shadow",
                    isRunning || queue.length === 0
                      ? "cursor-not-allowed border-[#d9cea7] bg-[#ece7d8] text-[#807159]"
                      : "border-[#d1bc82] bg-white text-[#5a430b] hover:bg-[#fff0c7]",
                  ].join(" ")}
                >
                  <ActionIcon kind="undo" />
                </button>
                <button
                  type="button"
                  onClick={clearQueue}
                  disabled={isRunning || queue.length === 0}
                  aria-label={actionLabel("clear", lang)}
                  title={actionLabel("clear", lang)}
                  className={[
                    "touch-target flex items-center justify-center rounded-xl border px-3 py-2 text-xs font-black shadow",
                    isRunning || queue.length === 0
                      ? "cursor-not-allowed border-[#d9cea7] bg-[#ece7d8] text-[#807159]"
                      : "border-[#d1bc82] bg-white text-[#5a430b] hover:bg-[#fff0c7]",
                  ].join(" ")}
                >
                  <ActionIcon kind="clear" />
                </button>
              </div>

              {feedback && (
                <div
                  className={[
                    "mt-3 rounded-xl border px-3 py-2 text-xs font-bold",
                    feedback.tone === "ok"
                      ? "border-emerald-300 bg-emerald-100 text-emerald-900"
                      : feedback.tone === "bad"
                      ? "border-rose-300 bg-rose-100 text-rose-900"
                      : "border-amber-300 bg-amber-100 text-amber-900",
                  ].join(" ")}
                >
                  {feedback.text}
                </div>
              )}

              <div className="mt-3 rounded-2xl border border-[#e1d19f] bg-white/85 p-3 text-xs font-black text-[#5c4711]">
                <div className="mb-2 grid grid-cols-3 gap-2">
                  <div className="rounded-xl border border-[#e7ca69] bg-[#fff1b8] px-2 py-2 text-center shadow-sm">
                    <div className="text-[10px] uppercase tracking-wide text-[#70530a]/70">
                      {lang === "ms" ? "Streak kini" : lang === "en" ? "Current" : "Actual"}
                    </div>
                    <div className="text-lg text-[#382700]">{currentStreak}</div>
                  </div>
                  <div className="rounded-xl border border-[#d7c58d] bg-white px-2 py-2 text-center shadow-sm">
                    <div className="text-[10px] uppercase tracking-wide text-[#70530a]/70">
                      {lang === "ms" ? "Tersimpan" : lang === "en" ? "Saved" : "Guardado"}
                    </div>
                    <div className="text-lg text-[#382700]">{bestSavedStreak}</div>
                  </div>
                  <div className="rounded-xl border border-[#b9d88f] bg-[#ecffd7] px-2 py-2 text-center shadow-sm">
                    <div className="text-[10px] uppercase tracking-wide text-[#415d13]/70">
                      {lang === "ms" ? "Terbaik" : lang === "en" ? "Best" : "Mejor"}
                    </div>
                    <div className="text-lg text-[#243900]">{bestAvailableStreak}</div>
                  </div>
                </div>
                <div>
                  {lang === "ms" ? "Betul" : lang === "en" ? "Correct" : "Correctas"}:{" "}
                  <span className="text-[#382700]">{wins}</span>
                </div>
                <div>
                  {lang === "ms" ? "Cubaan" : lang === "en" ? "Runs" : "Intentos"}:{" "}
                  <span className="text-[#382700]">{runs}</span>
                </div>
                <div>
                  {lang === "ms" ? "Gagal" : lang === "en" ? "Fails" : "Fallos"}:{" "}
                  <span className="text-[#382700]">{fails}</span>
                </div>
                <div>
                  {lang === "ms" ? "Kadar berjaya" : lang === "en" ? "Win rate" : "Tasa de éxito"}:{" "}
                  <span className="text-[#382700]">{winRate}%</span>
                </div>
              </div>

              {lastResult && (
                <div className="mt-2 text-[11px] font-bold text-[#6c581d]">
                  {lang === "ms"
                    ? `Langkah dijalankan: ${lastResult.steps.length}`
                    : lang === "en"
                    ? `Executed steps: ${lastResult.steps.length}`
                    : `Pasos ejecutados: ${lastResult.steps.length}`}
                </div>
              )}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
