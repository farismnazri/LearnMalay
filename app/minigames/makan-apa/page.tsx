"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { UiLang } from "@/lib/chapters";
import { BackgroundAudioControls } from "@/components/game/BackgroundAudio";
import IconActionLink from "@/components/navigation/IconActionLink";
import { getCurrentUser, type UserProfile } from "@/lib/userStore";
import { isMinigameUnlocked, MINIGAME_PREREQUISITES } from "@/lib/minigameUnlocks";

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

export default function MakanApaIntroPage() {
  const [lang, setLang] = useState<UiLang>("ms");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    let alive = true;
    setLang(readUiLang());
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

  const requiredChapter = MINIGAME_PREREQUISITES["makan-apa"];
  const unlocked = isMinigameUnlocked(user, "makan-apa");

  if (loadingUser) return null;

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-200 via-sky-200 to-amber-200 px-6 py-10">
        <div className="mx-auto max-w-xl rounded-2xl bg-white/85 p-6 shadow">
          <h1 className="crash-text crash-outline-fallback text-5xl font-black">MINI GAMES</h1>
          <p className="mt-4 text-sm font-semibold text-black/70">Select a user first to play this minigame.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/user" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow">
              Go to Login
            </Link>
            <Link href="/minigames" className="rounded-xl bg-white px-4 py-2 text-sm font-bold shadow">
              Back to Mini Games
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-200 via-sky-200 to-amber-200 px-6 py-10">
        <div className="mx-auto max-w-xl rounded-2xl bg-white/85 p-6 shadow">
          <h1 className="crash-text crash-outline-fallback text-5xl font-black">LOCKED</h1>
          <p className="mt-4 text-sm font-semibold text-black/70">
            Complete Chapter {requiredChapter} first to play Makan Apa?.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/map" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow">
              Go to Map
            </Link>
            <Link href="/minigames" className="rounded-xl bg-white px-4 py-2 text-sm font-bold shadow">
              Back to Mini Games
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const title =
    lang === "ms"
      ? "MAKAN\nAPA?"
      : lang === "en"
      ? "WHAT TO\nEAT?"
      : "¿QUE\nCOMER?";

  const subtitle: Translated = {
    ms: "Teka nama makanan berdasarkan gambar. Anda ada 5 nyawa.",
    en: "Guess the food name from the picture. You have 5 lives.",
    es: "Adivina el nombre de la comida por la imagen. Tienes 5 vidas.",
  };

  const instructions: Translated = {
    ms: "Pilih 1 daripada 4 jawapan. Jika salah, nyawa berkurang dan pilihan itu menjadi kelabu. Terus cuba hingga jawapan betul atau nyawa habis.",
    en: "Choose 1 of 4 answers. If wrong, you lose a life and that option turns gray. Keep trying until correct or you run out of lives.",
    es: "Elige 1 de 4 respuestas. Si fallas, pierdes una vida y esa opcion se vuelve gris. Sigue intentando hasta acertar o quedarte sin vidas.",
  };

  return (
    <main className="relative min-h-screen bg-cover bg-center px-6 py-10">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative mx-auto max-w-4xl space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="crash-text crash-outline-fallback whitespace-pre-line text-6xl font-black leading-none">{title}</h1>
            <p className="mt-2 max-w-xl text-sm font-semibold text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">
              {pick(subtitle, lang)}
            </p>
          </div>

          <div className="rounded-2xl bg-white/85 p-4 shadow">
            <div className="mb-3">
              <BackgroundAudioControls />
            </div>

            <div className="text-xs font-black opacity-70">LANGUAGE</div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => pickLang("ms")}
                className={`rounded-full px-3 py-1 text-xs font-black shadow ${lang === "ms" ? "bg-amber-300" : "bg-white"}`}
              >
                BM
              </button>
              <button
                onClick={() => pickLang("en")}
                className={`rounded-full px-3 py-1 text-xs font-black shadow ${lang === "en" ? "bg-amber-300" : "bg-white"}`}
              >
                EN
              </button>
              <button
                onClick={() => pickLang("es")}
                className={`rounded-full px-3 py-1 text-xs font-black shadow ${lang === "es" ? "bg-amber-300" : "bg-white"}`}
              >
                ES
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <IconActionLink href="/minigames/makan-apa/play" kind="start-game" tooltip="Start Game" />
              <IconActionLink href="/minigames" kind="minigames" tooltip="Back to Mini Games" />
              <IconActionLink href="/map" kind="map" tooltip="Back to Map" />
            </div>
          </div>
        </div>

        <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
          <div className="flex flex-col items-center gap-2 text-center">
            <Image src={AKU2_IDLE_SRC} alt="AkuAku" width={120} height={120} className="drop-shadow" priority />
            <div className="text-xl font-extrabold">
              {lang === "ms" ? "Cara main" : lang === "en" ? "How to play" : "Como jugar"}
            </div>
            <div className="max-w-2xl text-sm font-semibold opacity-80">{pick(instructions, lang)}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
