"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { UiLang } from "@/lib/chapters";
import { BackgroundAudioControls } from "@/components/game/BackgroundAudio";
import IconActionLink from "@/components/navigation/IconActionLink";
import { isMinigameUnlocked, MINIGAME_PREREQUISITES } from "@/lib/minigameUnlocks";
import { getCurrentUser, type UserProfile } from "@/lib/userStore";

const UI_LANG_KEY = "learnMalay.uiLang.v1";
const AKU2_IDLE_SRC = "/assets/characters/Akuaku_idle.png";

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

export default function MisiMembeliIntroPage() {
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

  const requiredChapter = MINIGAME_PREREQUISITES["misi-membeli"];
  const unlocked = isMinigameUnlocked(user, "misi-membeli");

  if (loadingUser) return null;

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-200 via-sky-200 to-amber-200 app-page-pad">
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
      <main className="min-h-screen bg-gradient-to-b from-emerald-200 via-sky-200 to-amber-200 app-page-pad">
        <div className="mx-auto max-w-xl rounded-2xl bg-white/85 p-6 shadow">
          <h1 className="crash-text crash-outline-fallback text-5xl font-black">LOCKED</h1>
          <p className="mt-4 text-sm font-semibold text-black/70">
            Complete Chapter {requiredChapter} first to play Misi Membeli.
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
      ? "MISI\nMEMBELI"
      : lang === "en"
      ? "SHOPPING\nMISSION"
      : "MISION\nDE COMPRAS";

  const subtitle: Translated = {
    ms: "Cari item pada scene, pilih yang ada dalam senarai, kemudian klik Bayar.",
    en: "Find items in the scene, pick what is on the list, then click Check Out.",
    es: "Encuentra articulos en la escena, selecciona los de la lista y pulsa Pagar.",
  };

  return (
    <main className="relative min-h-screen bg-cover bg-center app-page-pad">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative mx-auto max-w-5xl space-y-5 phone-lg:space-y-6">
        <div className="flex flex-col gap-3 tablet:flex-row tablet:items-end tablet:justify-between tablet:gap-4">
          <div>
            <h1 className="crash-text crash-outline-fallback whitespace-pre-line text-5xl font-black leading-none phone-lg:text-6xl">
              {title}
            </h1>
            <p className="mt-2 max-w-xl text-sm font-semibold text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">
              {pick(subtitle, lang)}
            </p>
          </div>

          <div className="w-full rounded-2xl bg-white/85 p-4 shadow tablet:w-auto">
            <div className="mb-3">
              <BackgroundAudioControls />
            </div>

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

            <div className="mt-3 grid grid-cols-3 gap-2 tablet:flex tablet:flex-wrap">
              <IconActionLink href="/minigames/misi-membeli/play" kind="start-game" tooltip="Start Game" />
              <IconActionLink href="/minigames" kind="minigames" tooltip="Back to Mini Games" />
              <IconActionLink href="/map" kind="map" tooltip="Back to Map" />
            </div>
          </div>
        </div>

        <section className="rounded-3xl bg-white/90 p-4 shadow-xl phone-lg:p-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <Image src={AKU2_IDLE_SRC} alt="AkuAku" width={120} height={120} className="drop-shadow" priority />
            <div className="text-xl font-extrabold">
              {lang === "ms" ? "Cara main" : lang === "en" ? "How to play" : "Como jugar"}
            </div>
            <div className="max-w-3xl text-sm font-semibold opacity-80">
              {lang === "ms"
                ? "Tahap Mudah: 1 tema, 5 item. Tahap Sederhana: 2 tema rawak, 7 item, scene atas+bawah. Tahap Sukar: semua tema + semua item pada skrin, senarai 10 item."
                : lang === "en"
                ? "Easy mode: 1 theme, 5 items. Medium mode: 2 random themes, 7 items, stacked top+bottom scene. Hard mode: all themes + all items on screen, 10-item list."
                : "Modo facil: 1 tema, 5 articulos. Modo medio: 2 temas aleatorios, 7 articulos, escena apilada arriba+abajo. Modo dificil: todos los temas + todos los articulos en pantalla, lista de 10."}
            </div>
          </div>

          <div className="mt-6 grid gap-3 phone-lg:grid-cols-2 tablet:grid-cols-3">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="text-xs font-black uppercase tracking-wide text-emerald-900/70">Easy</div>
              <div className="mt-1 text-sm font-black text-emerald-900">1 tema, 5 item</div>
              <div className="mt-1 text-xs font-semibold text-emerald-900/75">Available now</div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <div className="text-xs font-black uppercase tracking-wide text-amber-900/70">Medium</div>
              <div className="mt-1 text-sm font-black text-amber-900">2 tema, 7 item</div>
              <div className="mt-1 text-xs font-semibold text-amber-900/75">Available now</div>
            </div>

            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
              <div className="text-xs font-black uppercase tracking-wide text-rose-900/70">Hard</div>
              <div className="mt-1 text-sm font-black text-rose-900">Semua tema, 10 item</div>
              <div className="mt-1 text-xs font-semibold text-rose-900/75">Available now</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
