"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const KEY_MUTED = "learnMalay.audioMuted.v1";
const KEY_VOL = "learnMalay.audioVol.v1";
const AUDIO_SETTINGS_EVENT = "learnMalay.audioSettings.v1";

type AudioSettings = {
  muted: boolean;
  vol: number;
};

function clampVolume(v: number) {
  return Math.min(1, Math.max(0, v));
}

function readMuted() {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(KEY_MUTED) === "1";
}

function readVol() {
  if (typeof window === "undefined") return 0.5;
  const v = Number(window.localStorage.getItem(KEY_VOL));
  return Number.isFinite(v) ? clampVolume(v) : 0.5;
}

function readSettings(): AudioSettings {
  return { muted: readMuted(), vol: readVol() };
}

function writeSettings(settings: AudioSettings) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY_MUTED, settings.muted ? "1" : "0");
  window.localStorage.setItem(KEY_VOL, String(settings.vol));
}

function dispatchSettings(settings: AudioSettings) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<AudioSettings>(AUDIO_SETTINGS_EVENT, { detail: settings }));
}

export function setBackgroundAudioSettings(settings: AudioSettings) {
  const normalized = { muted: settings.muted, vol: clampVolume(settings.vol) };
  writeSettings(normalized);
  dispatchSettings(normalized);
}

export function BackgroundAudioControls({ className = "" }: { className?: string }) {
  const [settings, setSettings] = useState<AudioSettings>({ muted: true, vol: 0.5 });

  useEffect(() => {
    setSettings(readSettings());

    const onSettings = (event: Event) => {
      const detail = (event as CustomEvent<AudioSettings>).detail;
      if (!detail) {
        setSettings(readSettings());
        return;
      }
      setSettings({ muted: !!detail.muted, vol: clampVolume(detail.vol) });
    };

    window.addEventListener(AUDIO_SETTINGS_EVENT, onSettings as EventListener);
    return () => {
      window.removeEventListener(AUDIO_SETTINGS_EVENT, onSettings as EventListener);
    };
  }, []);

  function setMuted(nextMuted: boolean) {
    const next = { muted: nextMuted, vol: settings.vol };
    setSettings(next);
    setBackgroundAudioSettings(next);
  }

  function setVol(nextVol: number) {
    const next = { muted: settings.muted, vol: clampVolume(nextVol) };
    setSettings(next);
    setBackgroundAudioSettings(next);
  }

  return (
    <div className={["flex items-center gap-2", className].join(" ")}>
      <button
        type="button"
        onClick={() => setMuted(!settings.muted)}
        title={settings.muted ? "Unmute music" : "Mute music"}
        aria-label={settings.muted ? "Unmute music" : "Mute music"}
        className={[
          "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow transition active:scale-[0.98]",
          settings.muted ? "opacity-60 grayscale" : "",
        ].join(" ")}
      >
        <Image
          src="/assets/borders/IconsButtons_Mute.svg"
          alt=""
          aria-hidden="true"
          width={28}
          height={28}
          className="h-7 w-7 object-contain"
        />
      </button>

      <div className="group flex items-center">
        <button
          type="button"
          title="Volume"
          aria-label="Volume"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow transition active:scale-[0.98]"
        >
          <Image
            src="/assets/borders/IconsButtons_Volume.svg"
            alt=""
            aria-hidden="true"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
        </button>

        <div className="ml-0 w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-24 group-hover:opacity-100 group-focus-within:ml-2 group-focus-within:w-24 group-focus-within:opacity-100">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={settings.vol}
            onChange={(e) => setVol(Number(e.target.value))}
            className="w-24 accent-amber-400"
            aria-label="Volume slider"
          />
        </div>
      </div>
    </div>
  );
}

export default function BackgroundAudio({
  src = "/assets/audio/bgm.m4a",
  showControls = true,
}: {
  src?: string;
  showControls?: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [settings, setSettings] = useState<AudioSettings>({ muted: true, vol: 0.5 });

  useEffect(() => {
    setSettings(readSettings());
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.loop = true;
    a.volume = settings.vol;
    a.muted = settings.muted;

    writeSettings(settings);
  }, [settings]);

  useEffect(() => {
    const onSettings = (event: Event) => {
      const detail = (event as CustomEvent<AudioSettings>).detail;
      if (!detail) {
        setSettings(readSettings());
        return;
      }
      setSettings({ muted: !!detail.muted, vol: clampVolume(detail.vol) });
    };

    window.addEventListener(AUDIO_SETTINGS_EVENT, onSettings as EventListener);
    return () => {
      window.removeEventListener(AUDIO_SETTINGS_EVENT, onSettings as EventListener);
    };
  }, []);

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
    <>
      <audio ref={audioRef} src={src} preload="auto" />
      {showControls ? (
        <div className="fixed bottom-4 left-4 z-[60] rounded-2xl bg-white/85 p-3 shadow backdrop-blur">
          <BackgroundAudioControls />
        </div>
      ) : null}
    </>
  );
}
