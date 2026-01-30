"use client";

import { useEffect, useRef, useState } from "react";

const KEY_MUTED = "learnMalay.audioMuted.v1";
const KEY_VOL = "learnMalay.audioVol.v1";

function readMuted() {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(KEY_MUTED) === "1";
}

function readVol() {
  if (typeof window === "undefined") return 0.5;
  const v = Number(window.localStorage.getItem(KEY_VOL));
  return Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0.5;
}

export default function BackgroundAudio({
  src = "/assets/audio/bgm.mp3",
}: {
  src?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [vol, setVol] = useState(0.5);

  useEffect(() => {
    setMuted(readMuted());
    setVol(readVol());
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.loop = true;
    a.volume = vol;
    a.muted = muted;

    window.localStorage.setItem(KEY_MUTED, muted ? "1" : "0");
    window.localStorage.setItem(KEY_VOL, String(vol));
  }, [muted, vol]);

  // Autoplay is blocked until user interacts; this starts playback on first click/tap.
  useEffect(() => {
    const tryPlay = async () => {
      const a = audioRef.current;
      if (!a) return;
      try {
        await a.play();
      } catch {
        // ignored (autoplay restrictions)
      }
    };

    const onFirstInteraction = () => {
      tryPlay();
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };

    window.addEventListener("pointerdown", onFirstInteraction);
    window.addEventListener("keydown", onFirstInteraction);

    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-[60] rounded-2xl bg-white/85 p-3 shadow backdrop-blur">
      <audio ref={audioRef} src={src} preload="auto" />

      <div className="flex items-center gap-3">
        <button
          onClick={() => setMuted((m) => !m)}
          className="rounded-xl bg-white px-3 py-2 text-xs font-black shadow active:scale-[0.98]"
        >
          {muted ? "UNMUTE" : "MUTE"}
        </button>

        <div className="flex items-center gap-2">
          <div className="text-xs font-black opacity-70">VOL</div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={vol}
            onChange={(e) => setVol(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}