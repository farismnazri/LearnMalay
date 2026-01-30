"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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

type Layer = {
  id: string;
  label: Translated; // Malay label as "ms"
  meaning: Translated;
  example: Translated;
};

type Digit = {
  n: number;
  ms: string; // Malay word(s)
  en: string;
  es: string;
};

const LAYERS: Layer[] = [
  {
    id: "sa",
    label: { ms: "Sa", en: "Ones", es: "Unidades" },
    meaning: {
      ms: "Unit (1–9).",
      en: "Ones place (1–9).",
      es: "Unidad (1–9).",
    },
    example: { ms: "Contoh: 7", en: "Example: 7", es: "Ejemplo: 7" },
  },
  {
    id: "puluh",
    label: { ms: "Puluh", en: "Tens", es: "Decenas" },
    meaning: {
      ms: "Nilai tempat puluh (10, 20, 30…).",
      en: "Tens place (10, 20, 30…).",
      es: "Decenas (10, 20, 30…).",
    },
    example: { ms: "Contoh: 40", en: "Example: 40", es: "Ejemplo: 40" },
  },
  {
    id: "ratus",
    label: { ms: "Ratus", en: "Hundreds", es: "Centenas" },
    meaning: {
      ms: "Nilai tempat ratus (100, 200…).",
      en: "Hundreds (100, 200…).",
      es: "Centenas (100, 200…).",
    },
    example: { ms: "Contoh: 300", en: "Example: 300", es: "Ejemplo: 300" },
  },
  {
    id: "ribu",
    label: { ms: "Ribu", en: "Thousands", es: "Miles" },
    meaning: {
      ms: "Nilai tempat ribu (1,000; 2,000…).",
      en: "Thousands (1,000; 2,000…).",
      es: "Miles (1.000; 2.000…).",
    },
    example: { ms: "Contoh: 5,000", en: "Example: 5,000", es: "Ejemplo: 5.000" },
  },
  {
    id: "puluh-ribu",
    label: { ms: "Puluh Ribu", en: "Tens of thousands", es: "Decenas de miles" },
    meaning: {
      ms: "Nilai tempat puluh ribu (10,000; 20,000…).",
      en: "Tens of thousands (10,000; 20,000…).",
      es: "Decenas de miles (10.000; 20.000…).",
    },
    example: { ms: "Contoh: 70,000", en: "Example: 70,000", es: "Ejemplo: 70.000" },
  },
  {
    id: "ratus-ribu",
    label: { ms: "Ratus Ribu", en: "Hundreds of thousands", es: "Centenas de miles" },
    meaning: {
      ms: "Nilai tempat ratus ribu (100,000; 200,000…).",
      en: "Hundreds of thousands (100,000; 200,000…).",
      es: "Centenas de miles (100.000; 200.000…).",
    },
    example: { ms: "Contoh: 600,000", en: "Example: 600,000", es: "Ejemplo: 600.000" },
  },
  {
    id: "juta",
    label: { ms: "Juta", en: "Millions", es: "Millones" },
    meaning: {
      ms: "Nilai tempat juta (1,000,000…).",
      en: "Millions (1,000,000…).",
      es: "Millones (1.000.000…).",
    },
    example: { ms: "Contoh: 2,000,000", en: "Example: 2,000,000", es: "Ejemplo: 2.000.000" },
  },
];

const DIGITS: Digit[] = [
  { n: 0, ms: "sifar / kosong", en: "zero", es: "cero" },
  { n: 1, ms: "satu", en: "one", es: "uno" },
  { n: 2, ms: "dua", en: "two", es: "dos" },
  { n: 3, ms: "tiga", en: "three", es: "tres" },
  { n: 4, ms: "empat", en: "four", es: "cuatro" },
  { n: 5, ms: "lima", en: "five", es: "cinco" },
  { n: 6, ms: "enam", en: "six", es: "seis" },
  { n: 7, ms: "tujuh", en: "seven", es: "siete" },
  { n: 8, ms: "lapan", en: "eight", es: "ocho" },
  { n: 9, ms: "sembilan", en: "nine", es: "nueve" },
];

function pick(tr: Translated, lang: UiLang) {
  return lang === "ms" ? tr.ms : lang === "en" ? tr.en : tr.es;
}

export default function NumbersMiniGamePage() {
  const [lang, setLang] = useState<UiLang>("ms");
  const [activeLayerId, setActiveLayerId] = useState<string>("sa");

  useEffect(() => {
    setLang(readUiLang());
  }, []);

  function pickLang(next: UiLang) {
    setLang(next);
    writeUiLang(next);
  }

  const activeLayer = useMemo(
    () => LAYERS.find((x) => x.id === activeLayerId) ?? LAYERS[0],
    [activeLayerId]
  );

  const title: Translated = { ms: "Kenali Nombor", en: "Learn Numbers", es: "Conoce los números" };
  const subtitle: Translated = { ms: "Sistem Nombor", en: "Number system", es: "Sistema numérico" };

  return (
    <main
      className="relative min-h-screen bg-cover bg-center px-6 py-10"
      style={{ backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative mx-auto max-w-5xl">
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="crash-text crash-outline-fallback text-6xl font-black leading-none">
              {title.ms.toUpperCase()}
            </h1>
            {lang !== "ms" && (
              <div className="mt-1 text-lg font-extrabold text-white/90">{pick(title, lang)}</div>
            )}
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
                className={`rounded-full px-3 py-1 text-xs font-black shadow ${
                  lang === "ms" ? "bg-amber-300" : "bg-white"
                }`}
              >
                BM
              </button>
              <button
                onClick={() => pickLang("en")}
                className={`rounded-full px-3 py-1 text-xs font-black shadow ${
                  lang === "en" ? "bg-amber-300" : "bg-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => pickLang("es")}
                className={`rounded-full px-3 py-1 text-xs font-black shadow ${
                  lang === "es" ? "bg-amber-300" : "bg-white"
                }`}
              >
                ES
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href="/minigames/numbers/play"
                className="rounded-xl bg-amber-300 px-3 py-2 text-xs font-bold shadow hover:bg-amber-200"
              >
                Start Game
              </Link>

              <Link href="/minigames" className="rounded-xl bg-white px-3 py-2 text-xs font-bold shadow">
                Back to Mini Games
              </Link>

              <Link href="/map" className="rounded-xl bg-white px-3 py-2 text-xs font-bold shadow">
                Back to Map
              </Link>

            </div>
          </div>
        </div>

        {/* content */}
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {/* pyramid */}
          <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
            <div className="text-2xl font-extrabold">{subtitle.ms}</div>
            {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{pick(subtitle, lang)}</div>}

            <div className="mt-5 grid gap-4">
              {/* pyramid blocks */}
              <div className="rounded-2xl bg-black/5 p-4">
                <div className="mx-auto w-full max-w-md">
                  {/* top -> bottom in UI, but we want pyramid look: render reversed */}
                  {([...LAYERS].reverse() as Layer[]).map((layer, i) => {
                    const isActive = layer.id === activeLayerId;

                    // widths from top small to bottom large
                    const widths = ["w-[45%]", "w-[55%]", "w-[65%]", "w-[75%]", "w-[85%]", "w-[92%]", "w-[100%]"];
                    const wClass = widths[i] ?? "w-[100%]";

                    return (
                      <button
                        key={layer.id}
                        onClick={() => setActiveLayerId(layer.id)}
                        className={[
                          "mx-auto block",
                          wClass,
                          "rounded-xl px-4 py-3 text-center shadow transition",
                          "active:scale-[0.99]",
                          isActive ? "bg-amber-300" : "bg-amber-200/80 hover:bg-amber-200",
                        ].join(" ")}
                        title={pick(layer.label, lang)}
                      >
                        <div className="text-sm font-black">{layer.label.ms}</div>
                        {lang !== "ms" && (
                          <div className="text-xs font-semibold opacity-70">{pick(layer.label, lang)}</div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* details */}
              <div className="rounded-2xl bg-black/5 p-4">
                <div className="text-xs font-black opacity-60">SELECTED</div>
                <div className="mt-1 text-xl font-extrabold">{activeLayer.label.ms}</div>
                {lang !== "ms" && (
                  <div className="text-sm font-semibold opacity-70">{pick(activeLayer.label, lang)}</div>
                )}

                <div className="mt-3 text-sm font-semibold">
                  {activeLayer.meaning.ms}
                  {lang !== "ms" && <span className="opacity-70"> {pick(activeLayer.meaning, lang)}</span>}
                </div>

                <div className="mt-2 text-sm font-extrabold">
                  {activeLayer.example.ms}
                  {lang !== "ms" && <span className="opacity-70"> {pick(activeLayer.example, lang)}</span>}
                </div>
              </div>
            </div>
          </section>

          {/* digits */}
          <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
            <div className="text-2xl font-extrabold">Sa</div>
            {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{lang === "en" ? "Digits (0–9)" : "Dígitos (0–9)"}</div>}

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {DIGITS.map((d) => (
                <div key={d.n} className="rounded-2xl bg-black/5 p-4">
                  <div className="text-3xl font-black">{d.n}</div>
                  <div className="mt-1 text-base font-extrabold">{d.ms}</div>
                  {lang !== "ms" && (
                    <div className="text-xs font-semibold opacity-70">{lang === "en" ? d.en : d.es}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-amber-100/70 p-4">
              <div className="text-xs font-black opacity-60">
                {lang === "ms" ? "Nota" : lang === "en" ? "Note" : "Nota"}
              </div>
              <div className="mt-1 text-sm font-semibold">
                {lang === "ms"
                  ? "Untuk 0, anda boleh guna ‘sifar’ atau ‘kosong’."
                  : lang === "en"
                  ? "For 0, you can use either ‘sifar’ or ‘kosong’."
                  : "Para 0, puedes usar ‘sifar’ o ‘kosong’."}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}