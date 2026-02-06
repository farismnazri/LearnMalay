"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { UiLang } from "@/lib/chapters";

const UI_LANG_KEY = "learnMalay.uiLang.v1";

function readUiLang(): UiLang {
  if (typeof window === "undefined") return "ms";
  const v = window.localStorage.getItem(UI_LANG_KEY);
  return v === "en" || v === "es" || v === "ms" ? v : "ms";
}

function writeUiLang(lang: UiLang) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(UI_LANG_KEY, lang);
}

type Translated = { ms: string; en: string; es: string };
function pick(tr: Translated, lang: UiLang) {
  return lang === "ms" ? tr.ms : lang === "en" ? tr.en : tr.es;
}

type GameStatus = "ready" | "beta" | "building";

type MiniGame = {
  id: string;
  title: Translated;
  desc: Translated;
  href?: string; // only for clickable games
  status: GameStatus;
  badge?: Translated; // optional label
};

const GAMES: MiniGame[] = [
  {
    id: "numbers",
    title: { ms: "Nombor", en: "Numbers", es: "Números" },
    desc: {
      ms: "Tulis nombor dalam Bahasa Melayu. Ada tahap + nyawa.",
      en: "Type numbers in Malay. Levels + lives.",
      es: "Escribe números en malayo. Niveles + vidas.",
    },
    href: "/minigames/numbers",
    status: "ready",
    badge: { ms: "SIAP", en: "READY", es: "LISTO" },
  },
  {
    id: "word-match",
    title: { ms: "Padan Perkataan", en: "Word Match", es: "Emparejar palabras" },
    desc: {
      ms: "Padankan BM dengan EN/ES. Pantas dan menyeronokkan.",
      en: "Match BM with EN/ES. Fast and fun.",
      es: "Empareja BM con EN/ES. Rápido y divertido.",
    },
    href: "/minigames/word-match",
    status: "beta",
    badge: { ms: "BARU", en: "NEW", es: "NUEVO" },
  },
  {
    id: "wordsearch",
    title: { ms: "Cari Perkataan", en: "Wordsearch", es: "Sopa de letras" },
    desc: {
      ms: "Cari perkataan dalam grid. Pilih tahap & tema.",
      en: "Find words in a grid. Choose difficulty & theme.",
      es: "Encuentra palabras en una cuadrícula. Elige dificultad y tema.",
    },
    href: "/minigames/wordsearch",
    status: "beta",
    badge: { ms: "BARU", en: "NEW", es: "NUEVO" },
  },

  // Future (greyed out)
  {
    id: "listen-tap",
    title: { ms: "Dengar & Tekan", en: "Listen & Tap", es: "Escucha y toca" },
    desc: {
      ms: "Dengar audio, pilih jawapan betul.",
      en: "Hear audio, tap the correct answer.",
      es: "Escucha audio y elige la respuesta.",
    },
    status: "building",
    badge: { ms: "BINA", en: "BUILDING", es: "EN CONSTRUCCIÓN" },
  },
  {
    id: "sentence-build",
    title: { ms: "Susun Ayat", en: "Sentence Builder", es: "Construir frases" },
    desc: {
      ms: "Susun perkataan jadi ayat yang betul.",
      en: "Arrange words into a correct sentence.",
      es: "Ordena palabras para formar una frase.",
    },
    status: "building",
    badge: { ms: "BINA", en: "BUILDING", es: "EN CONSTRUCCIÓN" },
  },
  {
    id: "time-clock",
    title: { ms: "Masa & Jam", en: "Time & Clock", es: "Hora y reloj" },
    desc: {
      ms: "Baca jam dan tulis ‘pukul…’.",
      en: "Read the clock and write ‘pukul…’.",
      es: "Lee el reloj y escribe ‘pukul…’.",
    },
    status: "building",
    badge: { ms: "BINA", en: "BUILDING", es: "EN CONSTRUCCIÓN" },
  },
];

function Badge({ text, status }: { text: string; status: GameStatus }) {
  const cls =
    status === "ready"
      ? "bg-emerald-200 text-emerald-950"
      : status === "beta"
      ? "bg-amber-200 text-amber-950"
      : "bg-zinc-200 text-zinc-800";
  return <span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-black ${cls}`}>{text}</span>;
}

function GameCard({ g, lang }: { g: MiniGame; lang: UiLang }) {
  const isDisabled = g.status === "building" || !g.href;

  const inner = (
    <div
      className={[
        "relative rounded-3xl bg-white/90 p-5 shadow-xl transition",
        isDisabled ? "opacity-55 grayscale" : "hover:scale-[1.01] active:scale-[0.99]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xl font-extrabold">{pick(g.title, lang)}</div>
          <div className="mt-1 text-sm font-semibold opacity-80">{pick(g.desc, lang)}</div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {g.badge && <Badge text={pick(g.badge, lang)} status={g.status} />}
          <Image
            src="/assets/characters/Akuaku_idle.png"
            alt="AkuAku"
            width={44}
            height={44}
            className="drop-shadow"
            priority={false}
          />
        </div>
      </div>

      {isDisabled && (
        <div className="mt-4 rounded-2xl bg-black/5 p-3 text-xs font-black opacity-70">
          {lang === "ms" ? "SEDANG DIBINA" : lang === "en" ? "BUILDING" : "EN CONSTRUCCIÓN"}
        </div>
      )}
    </div>
  );

  if (isDisabled) return <div>{inner}</div>;
  return (
    <Link href={g.href!} className="block">
      {inner}
    </Link>
  );
}

export default function MiniGamesHubPage() {
  const [lang, setLang] = useState<UiLang>("ms");

  useEffect(() => setLang(readUiLang()), []);

  function pickLang(next: UiLang) {
    setLang(next);
    writeUiLang(next);
  }

  const title: Translated = { ms: "Mini Games", en: "Mini Games", es: "Mini Juegos" };
  const subtitle: Translated = {
    ms: "Pilih permainan untuk latihan.",
    en: "Choose a game to practice.",
    es: "Elige un juego para practicar.",
  };

  return (
    <main
      className="relative min-h-screen bg-cover bg-center px-6 py-10"
      style={{ backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative mx-auto max-w-5xl space-y-6">
        {/* header row */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="crash-text crash-outline-fallback text-6xl font-black leading-none">
              {title.ms.toUpperCase()}
            </h1>
            {lang !== "ms" && <div className="mt-1 text-lg font-extrabold text-white/90">{pick(title, lang)}</div>}
            <div className="mt-2 text-sm font-semibold text-white/85">
              {subtitle.ms}
              {lang !== "ms" && <span className="opacity-70"> • {pick(subtitle, lang)}</span>}
            </div>
          </div>

          <div className="rounded-2xl bg-white/85 p-4 shadow">
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
              <Link href="/map" className="rounded-xl bg-white px-3 py-2 text-xs font-bold shadow">
                Back to Map
              </Link>
              <Link
              href="minigames/highscores"
              className="rounded-xl bg-white px-3 py-2 text-xs font-bold shadow hover:bg-amber-100"
              >
                High Scores
              </Link>

            </div>
          </div>
        </div>

        {/* game grid */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((g) => (
            <GameCard key={g.id} g={g} lang={lang} />
          ))}
        </section>
      </div>
    </main>
  );
}
