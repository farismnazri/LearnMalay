"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { UiLang } from "@/lib/chapters";
import { BackgroundAudioControls } from "@/components/game/BackgroundAudio";
import IconActionLink from "@/components/navigation/IconActionLink";
import StylizedTitle from "@/components/game/StylizedTitle";
import { isMinigameUnlocked, MINIGAME_PREREQUISITES } from "@/lib/minigameUnlocks";
import { getCurrentUser, type UserProfile } from "@/lib/userStore";
import {
  ARAH_JALAN_COMMAND_LABELS,
  ARAH_JALAN_COMMAND_ORDER,
  ARAH_JALAN_PLAY_HELPER,
} from "@/lib/arahJalan/items";

const UI_LANG_KEY = "learnMalay.uiLang.v1";
const AKU2_IDLE_SRC = "/assets/characters/popup-trio.webp";

type Translated = { ms: string; en: string; es: string };

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

function pickCommandSecondary(
  label: Translated,
  lang: UiLang,
) {
  if (lang === "es") return label.es;
  return label.en;
}

export default function ArahJalanIntroPage() {
  const [lang, setLang] = useState<UiLang>(() => readUiLang());
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

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

  function pickLang(next: UiLang) {
    setLang(next);
    writeUiLang(next);
  }

  const requiredChapter = MINIGAME_PREREQUISITES["arah-jalan"];
  const unlocked = isMinigameUnlocked(user, "arah-jalan");

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
          <div className="mt-6 flex flex-col gap-3 phone-lg:flex-row">
            <Link href="/user" className="touch-target rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow">
              Go to Login
            </Link>
            <Link href="/minigames" className="touch-target rounded-xl bg-white px-4 py-2 text-sm font-bold shadow">
              Back to Mini Games
            </Link>
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
          <div className="mt-6 flex flex-col gap-3 phone-lg:flex-row">
            <Link href="/map" className="touch-target rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow">
              Go to Map
            </Link>
            <Link href="/minigames" className="touch-target rounded-xl bg-white px-4 py-2 text-sm font-bold shadow">
              Back to Mini Games
            </Link>
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

  const subtitle: Translated = {
    ms: "Susun arahan belok dan jalan terus untuk sampai ke destinasi.",
    en: "Queue turn and forward commands to reach the destination.",
    es: "Ordena comandos de giro y avance para llegar al destino.",
  };

  return (
    <main className="chapter-page-shell relative min-h-screen overflow-x-hidden app-page-pad">
      <div className="chapter-viewport-bg" aria-hidden="true">
        <div className="chapter-viewport-bg-image" />
        <div className="chapter-viewport-bg-fade" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl space-y-5 phone-lg:space-y-6">
        <div className="flex flex-col gap-3 tablet:flex-row tablet:items-end tablet:justify-between tablet:gap-4">
          <div>
            <StylizedTitle title={title} />
            <p className="mt-2 max-w-xl text-sm font-semibold text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">
              {pick(subtitle, lang)}
            </p>
            <p className="mt-1 max-w-xl text-xs font-bold text-[#f8e7b6]">
              {pick(ARAH_JALAN_PLAY_HELPER, lang)}
            </p>
          </div>

          <div className="w-full rounded-2xl bg-white/90 p-4 shadow tablet:min-w-[19rem] tablet:w-auto">
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
              <IconActionLink href="/minigames/arah-jalan/play" kind="start-game" tooltip="Start Game" />
              <IconActionLink href="/minigames/highscores" kind="highscores" tooltip="High Scores" />
              <IconActionLink href="/map" kind="map" tooltip="Back to Map" />
              <IconActionLink href="/minigames" kind="minigames" tooltip="Back to Mini Games" />
              <BackgroundAudioControls variant="icon" />
            </div>
          </div>
        </div>

        <section className="rounded-3xl bg-white/92 p-4 shadow-xl phone-lg:p-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <Image src={AKU2_IDLE_SRC} alt="Learn Malay helpers" width={149} height={120} className="drop-shadow" priority />
            <div className="text-xl font-extrabold">
              {lang === "ms" ? "Cara main" : lang === "en" ? "How to play" : "Como jugar"}
            </div>
            <div className="max-w-3xl text-sm font-semibold opacity-80">
              {lang === "ms"
                ? "Pilih arahan dalam Bahasa Melayu, pastikan arahan terakhir ialah 'Sampai', kemudian tekan Run."
                : lang === "en"
                ? "Pick commands in Malay, make sure the last command is 'Sampai', then press Run."
                : "Elige comandos en malayo, asegúrate de terminar con 'Sampai' y luego pulsa Run."}
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-[#d9c98f] bg-[#fff7df] p-4">
            <div className="text-xs font-black uppercase tracking-wide text-[#6f5a19]">
              {lang === "ms" ? "Set arahan" : lang === "en" ? "Command set" : "Conjunto de comandos"}
            </div>
            <ol className="mt-2 grid gap-2 phone-lg:grid-cols-2">
              {ARAH_JALAN_COMMAND_ORDER.map((commandId, idx) => {
                const label = ARAH_JALAN_COMMAND_LABELS[commandId];
                return (
                  <li key={commandId} className="rounded-xl border border-[#e3d2a4] bg-white px-3 py-2 text-sm font-black text-[#3e2e00]">
                    <span className="mr-2 text-xs opacity-65">{idx + 1}.</span>
                    {label.ms}
                    <span className="ml-2 text-xs font-bold opacity-65">{pickCommandSecondary(label, lang)}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      </div>
    </main>
  );
}
