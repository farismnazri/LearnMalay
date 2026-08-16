"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { getBackgroundAudioSrc } from "@/lib/backgroundAudio";

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

export function BackgroundAudioControls({
  className = "",
  buttonClassName = "",
  iconClassName = "",
  variant = "boxed",
}: {
  className?: string;
  buttonClassName?: string;
  iconClassName?: string;
  variant?: "boxed" | "icon";
}) {
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

  return (
    <div className={["flex items-center gap-2", className].join(" ")}>
      <button
        type="button"
        onClick={() => setMuted(!settings.muted)}
        title={settings.muted ? "Unmute music" : "Mute music"}
        aria-label={settings.muted ? "Unmute music" : "Mute music"}
        className={[
          variant === "icon"
            ? "group touch-target relative inline-flex h-9 w-9 items-center justify-center transition hover:-translate-y-0.5 focus-visible:outline-none active:scale-[0.98]"
            : "touch-target inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow transition active:scale-[0.98]",
          buttonClassName,
        ].join(" ")}
      >
        <Image
          src={settings.muted ? "/assets/borders/IconsButtons_Mute.svg" : "/assets/borders/IconsButtons_Volume.svg"}
          alt=""
          aria-hidden="true"
          width={28}
          height={28}
          className={[
            variant === "icon"
              ? "h-9 w-9 select-none object-contain drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]"
              : "h-7 w-7 object-contain",
            iconClassName,
          ].join(" ")}
        />
      </button>
    </div>
  );
}

export default function BackgroundAudio({
  src,
  showControls = true,
}: {
  src?: string;
  showControls?: boolean;
}) {
  const pathname = usePathname();
  const resolvedSrc = src ?? getBackgroundAudioSrc(pathname);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const settingsRef = useRef<AudioSettings>({ muted: true, vol: 0.5 });
  const [settings, setSettings] = useState<AudioSettings>({ muted: true, vol: 0.5 });

  const applyAudioSettings = useCallback((nextSettings: AudioSettings) => {
    const a = audioRef.current;
    if (!a) return;
    a.loop = true;
    a.volume = nextSettings.vol;
    a.muted = nextSettings.muted;
  }, []);

  const playIfEnabled = useCallback(
    async (nextSettings = settingsRef.current) => {
      if (nextSettings.muted) return;

      const a = audioRef.current;
      if (!a) return;

      applyAudioSettings(nextSettings);

      try {
        await a.play();
      } catch {
        // ignored (autoplay restrictions)
      }
    },
    [applyAudioSettings]
  );

  useEffect(() => {
    const nextSettings = readSettings();
    settingsRef.current = nextSettings;
    setSettings(nextSettings);
    applyAudioSettings(nextSettings);
  }, [applyAudioSettings]);

  useEffect(() => {
    settingsRef.current = settings;
    applyAudioSettings(settings);
    writeSettings(settings);
  }, [applyAudioSettings, settings]);

  useEffect(() => {
    const onSettings = (event: Event) => {
      const detail = (event as CustomEvent<AudioSettings>).detail;
      const nextSettings = detail
        ? { muted: !!detail.muted, vol: clampVolume(detail.vol) }
        : readSettings();

      settingsRef.current = nextSettings;
      setSettings(nextSettings);
      applyAudioSettings(nextSettings);
      void playIfEnabled(nextSettings);
    };

    window.addEventListener(AUDIO_SETTINGS_EVENT, onSettings as EventListener);
    return () => {
      window.removeEventListener(AUDIO_SETTINGS_EVENT, onSettings as EventListener);
    };
  }, [applyAudioSettings, playIfEnabled]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    if (settingsRef.current.muted) return;
    audio.load();
    void playIfEnabled(settingsRef.current);
  }, [playIfEnabled, resolvedSrc]);

  // Autoplay is blocked until user interacts; only start loading if music is enabled.
  useEffect(() => {
    const onFirstInteraction = () => {
      void playIfEnabled(settingsRef.current);
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };

    window.addEventListener("pointerdown", onFirstInteraction);
    window.addEventListener("keydown", onFirstInteraction);

    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
  }, [playIfEnabled]);

  return (
    <>
      <audio ref={audioRef} src={resolvedSrc} preload="none" />
      {showControls ? (
        <div className="safe-corner-bottom-left fixed z-[60] rounded-2xl bg-white/85 p-3 shadow backdrop-blur">
          <BackgroundAudioControls />
        </div>
      ) : null}
    </>
  );
}
