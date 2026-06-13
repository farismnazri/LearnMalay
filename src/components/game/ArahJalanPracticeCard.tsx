"use client";

import { useEffect, useRef, useState } from "react";
import type { ArahJalanPracticePage, Translated, UiLang } from "@/lib/chapters";
import {
  ARAH_JALAN_COMMAND_LABELS,
  ARAH_JALAN_COMMAND_ORDER,
  ARAH_JALAN_LESSON_MAP,
  ARAH_JALAN_LESSON_SCENARIO,
} from "@/lib/arahJalan/items";
import {
  canAppendCommand,
  simulateArahJalanRun,
  type ArahJalanCommandId,
  type ArahJalanState,
  type Facing,
} from "@/lib/arahJalan/engine";

const STEP_DELAY_MS = 520;

function tr(text: Translated, lang: UiLang) {
  return lang === "en" ? text.en : lang === "es" ? text.es : text.ms;
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

export default function ArahJalanPracticeCard({
  page,
  lang,
  onComplete,
}: {
  page: ArahJalanPracticePage;
  lang: UiLang;
  onComplete: () => void;
}) {
  const [queue, setQueue] = useState<ArahJalanCommandId[]>([]);
  const [feedback, setFeedback] = useState<"success" | "retry" | null>(null);
  const [completed, setCompleted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [playerState, setPlayerState] = useState<ArahJalanState>({
    nodeId: ARAH_JALAN_LESSON_SCENARIO.startNodeId,
    facing: ARAH_JALAN_LESSON_SCENARIO.startFacing,
  });
  const timersRef = useRef<number[]>([]);
  const playerNode = ARAH_JALAN_LESSON_MAP.nodes[playerState.nodeId];

  useEffect(() => {
    return () => {
      for (const timer of timersRef.current) window.clearTimeout(timer);
    };
  }, []);

  function clearTimers() {
    for (const timer of timersRef.current) window.clearTimeout(timer);
    timersRef.current = [];
  }

  function appendCommand(commandId: ArahJalanCommandId) {
    if (completed || isRunning || !canAppendCommand(queue, commandId)) return;
    setQueue((current) => [...current, commandId]);
    setFeedback(null);
  }

  function reset() {
    if (completed || isRunning) return;
    clearTimers();
    setQueue([]);
    setFeedback(null);
    setPlayerState({
      nodeId: ARAH_JALAN_LESSON_SCENARIO.startNodeId,
      facing: ARAH_JALAN_LESSON_SCENARIO.startFacing,
    });
  }

  function run() {
    if (completed || isRunning || queue.length === 0) return;
    clearTimers();
    const result = simulateArahJalanRun(ARAH_JALAN_LESSON_MAP, ARAH_JALAN_LESSON_SCENARIO, queue);
    setIsRunning(true);
    setFeedback(null);
    setPlayerState(result.start);

    result.steps.forEach((step, index) => {
      const timer = window.setTimeout(() => {
        setPlayerState(step.to);
      }, (index + 1) * STEP_DELAY_MS);
      timersRef.current.push(timer);
    });

    const finishTimer = window.setTimeout(() => {
      setIsRunning(false);
      if (result.success) {
        setCompleted(true);
        setFeedback("success");
        onComplete();
      } else {
        setFeedback("retry");
      }
    }, Math.max(STEP_DELAY_MS, (result.steps.length + 1) * STEP_DELAY_MS));
    timersRef.current.push(finishTimer);
  }

  return (
    <section className="rounded-3xl border-4 border-[#2b160a] bg-[#ffe48a] p-4 shadow-[0_10px_0_rgba(0,0,0,0.35)] sm:p-5">
      <h2 className="text-2xl font-black text-[#2b160a]">{page.title.ms}</h2>
      {lang !== "ms" && <p className="text-sm font-bold text-[#2b160a]/70">{tr(page.title, lang)}</p>}
      <p className="mt-2 text-sm font-extrabold text-[#2b160a]/80">{tr(page.instructions, lang)}</p>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-2xl border-[3px] border-[#2b160a] bg-[#d8dade] p-3 shadow-inner">
          <svg viewBox="0 0 100 80" className="h-auto w-full" aria-label="Easy route map">
            <rect x="2" y="2" width="96" height="76" rx="5" fill="#d8dade" stroke="#717780" strokeWidth="1" />
            <polyline points="18,20 70,20 70,62" fill="none" stroke="#6e7580" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="18" cy="20" r="7" fill="#fff4c7" stroke="#2b160a" strokeWidth="1.5" />
            <circle cx="70" cy="62" r="8" fill="#ffcf55" stroke="#2b160a" strokeWidth="1.5" />
            {playerNode && (
              <g
                style={{
                  transform: `translate(${playerNode.x}px, ${playerNode.y}px) rotate(${facingAngle(playerState.facing)}deg)`,
                  transformOrigin: "0 0",
                  transition: `transform ${STEP_DELAY_MS - 120}ms ease-in-out`,
                }}
              >
                <circle cx={0} cy={0} r={6.5} fill="#fff4c7" stroke="#2b160a" strokeWidth="1.5" />
                <polygon points="0,-8 6,7 -6,7" fill="#ef4444" stroke="#2b160a" strokeWidth="1" />
              </g>
            )}
            <text x="18" y="38" textAnchor="middle" fontSize="5" fontWeight="900" fill="#2b160a">MULA</text>
            <text x="70" y="76" textAnchor="middle" fontSize="5" fontWeight="900" fill="#2b160a">DESTINASI</text>
          </svg>
        </div>

        <div className="grid content-start gap-3 rounded-2xl border-[3px] border-[#2b160a] bg-[#fff8df] p-3">
          <div className="grid grid-cols-2 gap-2">
            {ARAH_JALAN_COMMAND_ORDER.map((commandId) => {
              const label = ARAH_JALAN_COMMAND_LABELS[commandId];
              return (
                <button
                  key={commandId}
                  type="button"
                  onClick={() => appendCommand(commandId)}
                  disabled={completed || isRunning || !canAppendCommand(queue, commandId)}
                  className="min-h-12 rounded-xl border-2 border-[#2b160a] bg-white px-2 py-2 text-left text-xs font-black shadow disabled:opacity-45"
                >
                  {label.ms}
                  {lang !== "ms" && <span className="block text-[10px] opacity-65">{tr(label, lang)}</span>}
                </button>
              );
            })}
          </div>

          <div className="min-h-20 whitespace-pre-line rounded-xl border-2 border-[#2b160a]/30 bg-white p-2 text-xs font-black">
            {queue.length === 0
              ? lang === "ms" ? "Bina arahan." : lang === "en" ? "Build the route." : "Crea la ruta."
              : queue.map((id, index) => `${index + 1}. ${ARAH_JALAN_COMMAND_LABELS[id].ms}`).join("\n")}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={reset} disabled={completed || isRunning} className="rounded-xl bg-white px-3 py-2 text-xs font-black shadow disabled:opacity-45">
              {lang === "ms" ? "Cuba semula" : lang === "en" ? "Reset" : "Reiniciar"}
            </button>
            <button type="button" onClick={run} disabled={completed || isRunning || queue.length === 0} className="rounded-xl bg-emerald-700 px-3 py-2 text-xs font-black text-white shadow disabled:opacity-45">
              {isRunning
                ? lang === "ms" ? "Bergerak..." : lang === "en" ? "Moving..." : "Moviendo..."
                : lang === "ms" ? "Jalankan" : lang === "en" ? "Execute" : "Ejecutar"}
            </button>
          </div>

          {feedback && (
            <div className={`rounded-xl px-3 py-2 text-sm font-black ${feedback === "success" ? "bg-emerald-200 text-emerald-900" : "bg-amber-200 text-amber-950"}`}>
              {feedback === "success"
                ? lang === "ms" ? "Berjaya! Anda sudah sampai. Tekan Next." : lang === "en" ? "Success! You arrived. Press Next." : "¡Éxito! Llegaste. Pulsa Next."
                : lang === "ms" ? "Belum tepat. Cuba semula tanpa penalti." : lang === "en" ? "Not quite. Try again with no penalty." : "Aún no. Inténtalo de nuevo sin penalización."}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
