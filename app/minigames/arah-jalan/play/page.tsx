"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { UiLang } from "@/lib/chapters";
import { BackgroundAudioControls } from "@/components/game/BackgroundAudio";
import StylizedTitle from "@/components/game/StylizedTitle";
import IconActionLink from "@/components/navigation/IconActionLink";
import { isMinigameUnlocked, MINIGAME_PREREQUISITES } from "@/lib/minigameUnlocks";
import { getCurrentUser, type UserProfile } from "@/lib/userStore";
import {
  ARAH_JALAN_COMMAND_LABELS,
  ARAH_JALAN_COMMAND_ORDER,
  ARAH_JALAN_EASY_MAP,
  ARAH_JALAN_MISSION_PREFIX,
  ARAH_JALAN_PLAY_HELPER,
} from "@/lib/arahJalan/items";
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

const UI_LANG_KEY = "learnMalay.uiLang.v1";
const AKU2_IDLE_SRC = "/assets/characters/Akuaku_idle.png";
const MAX_QUEUE_LENGTH = 16;
const STEP_DELAY_MS = 460;

type Translated = { ms: string; en: string; es: string };
type FeedbackTone = "ok" | "bad" | "warn";
type FeedbackState = { tone: FeedbackTone; text: string };
type RoadSegment = { id: string; from: ArahJalanNode; to: ArahJalanNode };

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

function facingAngle(facing: Facing) {
  switch (facing) {
    case "north":
      return 0;
    case "east":
      return 90;
    case "south":
      return 180;
    case "west":
      return 270;
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

function buildRoadSegments(): RoadSegment[] {
  const out: RoadSegment[] = [];
  const seen = new Set<string>();

  for (const [fromId, directions] of Object.entries(ARAH_JALAN_EASY_MAP.connections)) {
    const fromNode = ARAH_JALAN_EASY_MAP.nodes[fromId];
    if (!fromNode) continue;

    for (const toId of Object.values(directions)) {
      if (!toId) continue;
      const toNode = ARAH_JALAN_EASY_MAP.nodes[toId];
      if (!toNode) continue;

      const key = [fromId, toId].sort().join("--");
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ id: key, from: fromNode, to: toNode });
    }
  }

  return out;
}

function buildMissionText(destination: ArahJalanNode, lang: UiLang) {
  if (lang === "ms") return `${ARAH_JALAN_MISSION_PREFIX.ms} ${destination.label.ms}.`;
  if (lang === "en") return `${ARAH_JALAN_MISSION_PREFIX.en} the ${destination.label.en}.`;
  return `${ARAH_JALAN_MISSION_PREFIX.es} ${destination.label.es}.`;
}

export default function ArahJalanPlayPage() {
  const [lang, setLang] = useState<UiLang>(() => readUiLang());
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [scenario, setScenario] = useState<ArahJalanScenario>(() => pickRandomScenario(ARAH_JALAN_EASY_MAP));
  const [playerState, setPlayerState] = useState<ArahJalanState>(() => ({
    nodeId: scenario.startNodeId,
    facing: scenario.startFacing,
  }));

  const [queue, setQueue] = useState<ArahJalanCommandId[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [lastResult, setLastResult] = useState<ArahJalanRunResult | null>(null);

  const [runs, setRuns] = useState(0);
  const [wins, setWins] = useState(0);
  const [fails, setFails] = useState(0);

  const runTimersRef = useRef<number[]>([]);
  const roads = useMemo(() => buildRoadSegments(), []);

  const startNode = ARAH_JALAN_EASY_MAP.nodes[scenario.startNodeId];
  const destinationNode = ARAH_JALAN_EASY_MAP.nodes[scenario.destinationNodeId];
  const playerNode = ARAH_JALAN_EASY_MAP.nodes[playerState.nodeId];

  const requiredChapter = MINIGAME_PREREQUISITES["arah-jalan"];
  const unlocked = isMinigameUnlocked(user, "arah-jalan");

  const secondaryHelperLang: UiLang = lang === "es" ? "es" : "en";
  const missionMs = destinationNode ? `${ARAH_JALAN_MISSION_PREFIX.ms} ${destinationNode.label.ms}.` : "";
  const missionSecondary = destinationNode ? buildMissionText(destinationNode, secondaryHelperLang) : "";

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
    return () => {
      for (const timer of runTimersRef.current) window.clearTimeout(timer);
      runTimersRef.current = [];
    };
  }, []);

  function clearTimers() {
    for (const timer of runTimersRef.current) window.clearTimeout(timer);
    runTimersRef.current = [];
  }

  function startScenario(nextScenario = pickRandomScenario(ARAH_JALAN_EASY_MAP)) {
    clearTimers();
    setScenario(nextScenario);
    setQueue([]);
    setPlayerState({
      nodeId: nextScenario.startNodeId,
      facing: nextScenario.startFacing,
    });
    setLastResult(null);
    setFeedback(null);
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

    const result = simulateArahJalanRun(ARAH_JALAN_EASY_MAP, scenario, queue);
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
          startScenario();
          setIsRunning(false);
        }, 1200);
        runTimersRef.current.push(nextTimer);
      } else {
        setFails((v) => v + 1);
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#081d14] app-page-pad">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative mx-auto max-w-7xl space-y-4 phone-lg:space-y-6">
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
                  {lang === "ms" ? "Peta Mudah Tetap" : lang === "en" ? "Fixed Easy Map" : "Mapa fijo fácil"}
                </div>
                <div className="text-sm font-black text-[#4a380b]">
                  {lang === "ms"
                    ? "Kiri: Barat • Kanan: Timur • Atas: Utara • Bawah: Selatan"
                    : lang === "en"
                    ? "Left: West • Right: East • Up: North • Down: South"
                    : "Izquierda: Oeste • Derecha: Este • Arriba: Norte • Abajo: Sur"}
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

            <div className="relative overflow-hidden rounded-2xl border border-[#d6c48d] bg-[#e8e8e8] p-2">
              <svg viewBox="0 0 100 90" className="h-[420px] w-full phone-lg:h-[520px]">
                <rect x={0} y={0} width={100} height={90} fill="#cfd2d6" />
                <rect x={2} y={2} width={96} height={86} fill="#d8dade" stroke="#a9adb4" strokeWidth={0.8} />

                <g stroke="#6e7580" strokeWidth={5.2} strokeLinecap="round">
                  {roads.map((road) => (
                    <line
                      key={road.id}
                      x1={road.from.x}
                      y1={road.from.y}
                      x2={road.to.x}
                      y2={road.to.y}
                    />
                  ))}
                </g>

                {destinationNode && (
                  <g>
                    <circle
                      cx={destinationNode.x}
                      cy={destinationNode.y}
                      r={6.6}
                      fill="none"
                      stroke="#f8c94a"
                      strokeWidth={1.6}
                    />
                    <circle
                      cx={destinationNode.x}
                      cy={destinationNode.y}
                      r={8.8}
                      fill="none"
                      stroke="#7f5f0a"
                      strokeDasharray="1.2 1.4"
                      strokeWidth={0.8}
                    />
                  </g>
                )}

                {Object.values(ARAH_JALAN_EASY_MAP.nodes).map((node) => (
                  <g key={node.id}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.isLandmark ? 3.8 : 3}
                      fill={node.isLandmark ? "#f9f2dc" : "#f2f4f6"}
                      stroke="#4a4f57"
                      strokeWidth={0.8}
                    />
                    <text
                      x={node.x}
                      y={node.y - 5.3}
                      textAnchor="middle"
                      fontSize={2.3}
                      fontWeight={800}
                      fill="#2b3138"
                    >
                      {node.label.ms}
                    </text>
                  </g>
                ))}

                {playerNode && (
                  <g transform={`translate(${playerNode.x} ${playerNode.y}) rotate(${facingAngle(playerState.facing)})`}>
                    <circle cx={0} cy={0} r={3.6} fill="#ffffff" stroke="#1f2937" strokeWidth={0.9} />
                    <polygon points="0,-6.6 4.2,4.6 -4.2,4.6" fill="#ef4444" stroke="#111827" strokeWidth={0.7} />
                  </g>
                )}
              </svg>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-[#d8c790]/75 bg-[#fff5d7]/95 p-4 shadow-xl">
              <div className="text-[11px] font-black uppercase tracking-wide text-[#6e5918]/70">
                {lang === "ms" ? "Misi" : lang === "en" ? "Mission" : "Misión"}
              </div>
              <div className="mt-1 text-base font-black text-[#3d2d00]">{missionMs}</div>
              <div className="mt-1 text-xs font-bold text-[#6b5415]">{missionSecondary}</div>

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
                      <div className="text-[10px] font-semibold opacity-75">{commandSecondaryLabel(commandId, lang)}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-[#d8c790]/75 bg-[#fff5d7]/95 p-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-black uppercase tracking-wide text-[#6e5918]/70">
                  {lang === "ms" ? "Queue Arahan" : lang === "en" ? "Command Queue" : "Cola de comandos"}
                </div>
                <div className="text-[11px] font-black text-[#6b5415]">
                  {queue.length}/{MAX_QUEUE_LENGTH}
                </div>
              </div>

              {queue.length === 0 ? (
                <div className="mt-2 rounded-xl border border-dashed border-[#d6c590] bg-white/75 p-3 text-xs font-semibold text-[#7a6840]">
                  {lang === "ms"
                    ? "Belum ada arahan."
                    : lang === "en"
                    ? "No commands yet."
                    : "Aún no hay comandos."}
                </div>
              ) : (
                <ol className="mt-2 max-h-44 space-y-1.5 overflow-auto pr-1">
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
              )}

              <div className="mt-3 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={runQueue}
                  disabled={isRunning || queue.length === 0}
                  className={[
                    "touch-target rounded-xl border px-3 py-2 text-xs font-black shadow",
                    isRunning || queue.length === 0
                      ? "cursor-not-allowed border-[#d9cea7] bg-[#ece7d8] text-[#807159]"
                      : "border-[#3a7a35] bg-[#65b559] text-white hover:bg-[#5aac4e]",
                  ].join(" ")}
                >
                  Run
                </button>
                <button
                  type="button"
                  onClick={undoCommand}
                  disabled={isRunning || queue.length === 0}
                  className={[
                    "touch-target rounded-xl border px-3 py-2 text-xs font-black shadow",
                    isRunning || queue.length === 0
                      ? "cursor-not-allowed border-[#d9cea7] bg-[#ece7d8] text-[#807159]"
                      : "border-[#d1bc82] bg-white text-[#5a430b] hover:bg-[#fff0c7]",
                  ].join(" ")}
                >
                  Undo
                </button>
                <button
                  type="button"
                  onClick={clearQueue}
                  disabled={isRunning || queue.length === 0}
                  className={[
                    "touch-target rounded-xl border px-3 py-2 text-xs font-black shadow",
                    isRunning || queue.length === 0
                      ? "cursor-not-allowed border-[#d9cea7] bg-[#ece7d8] text-[#807159]"
                      : "border-[#d1bc82] bg-white text-[#5a430b] hover:bg-[#fff0c7]",
                  ].join(" ")}
                >
                  Clear
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
                <div>
                  {lang === "ms" ? "Skor" : lang === "en" ? "Score" : "Puntuación"}:{" "}
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
