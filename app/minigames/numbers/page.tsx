"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import Image from "next/image";

import AkuAkuPopup from "@/components/game/AkuAkuPopup";
import { getCurrentUser, type UserProfile } from "@/lib/userStore";
import { isMinigameUnlocked, MINIGAME_PREREQUISITES } from "@/lib/minigameUnlocks";

type UiLang = "ms" | "en" | "es";
type Translated = { ms: string; en: string; es: string };

type NumberRow = {
  n: number;
  word: Translated;
};

type NumberSet = {
  key: string;
  label: Translated; // tab label
  rows: NumberRow[];
};

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

function t(lang: UiLang, x: Translated) {
  return lang === "ms" ? x.ms : lang === "en" ? x.en : x.es;
}

function formatMsNumber(n: number) {
  // match your PDF style: spaces for thousands
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const PYRAMID_LAYERS: Array<{ key: string; width: string }> = [
  { key: "juta", width: "w-[45%]" },
  { key: "ratus_ribu", width: "w-[55%]" },
  { key: "puluh_ribu", width: "w-[65%]" },
  { key: "ribu", width: "w-[75%]" },
  { key: "ratus", width: "w-[85%]" },
  { key: "puluh", width: "w-[92%]" },
  { key: "belasan", width: "w-[96%]" },
  { key: "sa", width: "w-[100%]" },
];

const NUMBER_SETS: NumberSet[] = [
  {
    key: "sa",
    label: { ms: "Sa", en: "Ones", es: "Unidades" },
    rows: [
      { n: 0, word: { ms: "sifar / kosong", en: "zero", es: "cero" } },
      { n: 1, word: { ms: "satu", en: "one", es: "uno" } },
      { n: 2, word: { ms: "dua", en: "two", es: "dos" } },
      { n: 3, word: { ms: "tiga", en: "three", es: "tres" } },
      { n: 4, word: { ms: "empat", en: "four", es: "cuatro" } },
      { n: 5, word: { ms: "lima", en: "five", es: "cinco" } },
      { n: 6, word: { ms: "enam", en: "six", es: "seis" } },
      { n: 7, word: { ms: "tujuh", en: "seven", es: "siete" } },
      { n: 8, word: { ms: "lapan", en: "eight", es: "ocho" } },
      { n: 9, word: { ms: "sembilan", en: "nine", es: "nueve" } },
    ],
  },

  {
    key: "puluh",
    label: { ms: "Puluh", en: "Tens", es: "Decenas" },
    rows: [
      { n: 10, word: { ms: "sepuluh", en: "ten", es: "diez" } },
      { n: 20, word: { ms: "dua puluh", en: "twenty", es: "veinte" } },
      { n: 30, word: { ms: "tiga puluh", en: "thirty", es: "treinta" } },
      { n: 40, word: { ms: "empat puluh", en: "forty", es: "cuarenta" } },
      { n: 50, word: { ms: "lima puluh", en: "fifty", es: "cincuenta" } },
      { n: 60, word: { ms: "enam puluh", en: "sixty", es: "sesenta" } },
      { n: 70, word: { ms: "tujuh puluh", en: "seventy", es: "setenta" } },
      { n: 80, word: { ms: "lapan puluh", en: "eighty", es: "ochenta" } },
      { n: 90, word: { ms: "sembilan puluh", en: "ninety", es: "noventa" } },
    ],
  },

  {
    key: "belasan",
    label: { ms: "Belasan", en: "11–19", es: "11–19" },
    rows: [
      { n: 10, word: { ms: "sepuluh", en: "ten", es: "diez" } },
      { n: 11, word: { ms: "sebelas", en: "eleven", es: "once" } },
      { n: 12, word: { ms: "dua belas", en: "twelve", es: "doce" } },
      { n: 13, word: { ms: "tiga belas", en: "thirteen", es: "trece" } },
      { n: 14, word: { ms: "empat belas", en: "fourteen", es: "catorce" } },
      { n: 15, word: { ms: "lima belas", en: "fifteen", es: "quince" } },
      { n: 16, word: { ms: "enam belas", en: "sixteen", es: "dieciséis" } },
      { n: 17, word: { ms: "tujuh belas", en: "seventeen", es: "diecisiete" } },
      { n: 18, word: { ms: "lapan belas", en: "eighteen", es: "dieciocho" } },
      { n: 19, word: { ms: "sembilan belas", en: "nineteen", es: "diecinueve" } },
    ],
  },

  {
    key: "ratus",
    label: { ms: "Ratus", en: "Hundreds", es: "Centenas" },
    rows: [
      { n: 100, word: { ms: "seratus", en: "one hundred", es: "cien" } },
      { n: 200, word: { ms: "dua ratus", en: "two hundred", es: "doscientos" } },
      { n: 300, word: { ms: "tiga ratus", en: "three hundred", es: "trescientos" } },
      { n: 400, word: { ms: "empat ratus", en: "four hundred", es: "cuatrocientos" } },
      { n: 500, word: { ms: "lima ratus", en: "five hundred", es: "quinientos" } },
      { n: 600, word: { ms: "enam ratus", en: "six hundred", es: "seiscientos" } },
      { n: 700, word: { ms: "tujuh ratus", en: "seven hundred", es: "setecientos" } },
      { n: 800, word: { ms: "lapan ratus", en: "eight hundred", es: "ochocientos" } },
      { n: 900, word: { ms: "sembilan ratus", en: "nine hundred", es: "novecientos" } },
    ],
  },

  {
    key: "ribu",
    label: { ms: "Ribu", en: "Thousands", es: "Miles" },
    rows: [
      { n: 1000, word: { ms: "seribu / satu ribu", en: "one thousand", es: "mil" } },
      { n: 2000, word: { ms: "dua ribu", en: "two thousand", es: "dos mil" } },
      { n: 3000, word: { ms: "tiga ribu", en: "three thousand", es: "tres mil" } },
      { n: 4000, word: { ms: "empat ribu", en: "four thousand", es: "cuatro mil" } },
      { n: 5000, word: { ms: "lima ribu", en: "five thousand", es: "cinco mil" } },
      { n: 6000, word: { ms: "enam ribu", en: "six thousand", es: "seis mil" } },
      { n: 7000, word: { ms: "tujuh ribu", en: "seven thousand", es: "siete mil" } },
      { n: 8000, word: { ms: "lapan ribu", en: "eight thousand", es: "ocho mil" } },
      { n: 9000, word: { ms: "sembilan ribu", en: "nine thousand", es: "nueve mil" } },
    ],
  },

  {
    key: "puluh_ribu",
    label: { ms: "Puluh Ribu", en: "Tens of Thousands", es: "Decenas de Mil" },
    rows: [
      { n: 10000, word: { ms: "sepuluh ribu", en: "ten thousand", es: "diez mil" } },
      { n: 20000, word: { ms: "dua puluh ribu", en: "twenty thousand", es: "veinte mil" } },
      { n: 30000, word: { ms: "tiga puluh ribu", en: "thirty thousand", es: "treinta mil" } },
      { n: 40000, word: { ms: "empat puluh ribu", en: "forty thousand", es: "cuarenta mil" } },
      { n: 50000, word: { ms: "lima puluh ribu", en: "fifty thousand", es: "cincuenta mil" } },
      { n: 60000, word: { ms: "enam puluh ribu", en: "sixty thousand", es: "sesenta mil" } },
      { n: 70000, word: { ms: "tujuh puluh ribu", en: "seventy thousand", es: "setenta mil" } },
      { n: 80000, word: { ms: "lapan puluh ribu", en: "eighty thousand", es: "ochenta mil" } },
      { n: 90000, word: { ms: "sembilan puluh ribu", en: "ninety thousand", es: "noventa mil" } },
    ],
  },

  {
    key: "ratus_ribu",
    label: { ms: "Ratus Ribu", en: "Hundreds of Thousands", es: "Cientos de Mil" },
    rows: [
      { n: 100000, word: { ms: "seratus ribu", en: "one hundred thousand", es: "cien mil" } },
      { n: 200000, word: { ms: "dua ratus ribu", en: "two hundred thousand", es: "doscientos mil" } },
      { n: 300000, word: { ms: "tiga ratus ribu", en: "three hundred thousand", es: "trescientos mil" } },
      { n: 400000, word: { ms: "empat ratus ribu", en: "four hundred thousand", es: "cuatrocientos mil" } },
      { n: 500000, word: { ms: "lima ratus ribu", en: "five hundred thousand", es: "quinientos mil" } },
      { n: 600000, word: { ms: "enam ratus ribu", en: "six hundred thousand", es: "seiscientos mil" } },
      { n: 700000, word: { ms: "tujuh ratus ribu", en: "seven hundred thousand", es: "setecientos mil" } },
      { n: 800000, word: { ms: "lapan ratus ribu", en: "eight hundred thousand", es: "ochocientos mil" } },
      { n: 900000, word: { ms: "sembilan ratus ribu", en: "nine hundred thousand", es: "novecientos mil" } },
    ],
  },

  {
    key: "juta",
    label: { ms: "Juta", en: "Millions", es: "Millones" },
    rows: [
      { n: 1000000, word: { ms: "sejuta / satu juta", en: "one million", es: "un millón" } },
      { n: 2000000, word: { ms: "dua juta", en: "two million", es: "dos millones" } },
      { n: 3000000, word: { ms: "tiga juta", en: "three million", es: "tres millones" } },
      { n: 4000000, word: { ms: "empat juta", en: "four million", es: "cuatro millones" } },
      { n: 5000000, word: { ms: "lima juta", en: "five million", es: "cinco millones" } },
      { n: 6000000, word: { ms: "enam juta", en: "six million", es: "seis millones" } },
      { n: 7000000, word: { ms: "tujuh juta", en: "seven million", es: "siete millones" } },
      { n: 8000000, word: { ms: "lapan juta", en: "eight million", es: "ocho millones" } },
      { n: 9000000, word: { ms: "sembilan juta", en: "nine million", es: "nueve millones" } },
      { n: 10000000, word: { ms: "sepuluh juta", en: "ten million", es: "diez millones" } },
    ],
  },
];

export default function MiniGamesPage() {
  const [lang, setLang] = useState<UiLang>("ms");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [activeKey, setActiveKey] = useState<string>("sa");

  const [akuOpen, setAkuOpen] = useState(false);
  const [akuDialogs, setAkuDialogs] = useState<any[]>([]);

  function openAkuAkuPuluh() {
    setAkuDialogs([
      {
        id: "aku-puluh-21-29",
        ms:
          "Cara bina nombor 21–29:\n\n" +
          "Formula: [nombor] + [puluh]\n" +
          "20 = dua puluh\n" +
          "21 = dua puluh satu\n" +
          "22 = dua puluh dua\n" +
          "23 = dua puluh tiga\n" +
          "24 = dua puluh empat\n" +
          "25 = dua puluh lima\n" +
          "26 = dua puluh enam\n" +
          "27 = dua puluh tujuh\n" +
          "28 = dua puluh lapan\n" +
          "29 = dua puluh sembilan\n\n" +
          "Nota: Kalau nombor berakhir dengan 0 (contoh 20), sebut puluh sahaja (dua puluh).",
        en:
        "How to form 21–29:\n\n" +
        "Rule: [digits] + [tens]\n" +
        "20 = dua puluh (twenty)\n" +
        "21 = dua puluh satu (twenty-one)\n" +
        "22 = dua puluh dua (twenty-two)\n" +
        "23 = dua puluh tiga (twenty-three)\n" +
        "24 = dua puluh empat (twenty-four)\n" +
        "25 = dua puluh lima (twenty-five)\n" +
        "26 = dua puluh enam (twenty-six)\n" +
        "27 = dua puluh tujuh (twenty-seven)\n" +
        "28 = dua puluh lapan (twenty-eight)\n" +
        "29 = dua puluh sembilan (twenty-nine)\n\n" +
        "Note: If it ends with 0 (e.g., 20), you just say the tens (dua puluh).",

        es:
        "Cómo formar 21–29:\n\n" +
        "Regla: [dígito] + [decenas]\n" +
        "20 = dua puluh (veinte)\n" +
        "21 = dua puluh satu (veintiuno)\n" +
        "22 = dua puluh dua (veintidós)\n" +
        "23 = dua puluh tiga (veintitrés)\n" +
        "24 = dua puluh empat (veinticuatro)\n" +
        "25 = dua puluh lima (veinticinco)\n" +
        "26 = dua puluh enam (veintiséis)\n" +
        "27 = dua puluh tujuh (veintisiete)\n" +
        "28 = dua puluh lapan (veintiocho)\n" +
        "29 = dua puluh sembilan (veintinueve)\n\n" +
        "Nota: Si termina en 0 (p. ej., 20), solo dices las decenas (dua puluh).",
      },
    ]);

    setAkuOpen(true);
  }

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

  const activeSet = useMemo(
    () => NUMBER_SETS.find((s) => s.key === activeKey) ?? NUMBER_SETS[0],
    [activeKey]
  );

  const requiredChapter = MINIGAME_PREREQUISITES.numbers;
  const unlocked = isMinigameUnlocked(user, "numbers");

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
            Complete Chapter {requiredChapter} first to play Numbers.
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

  return (
    <main
      className="relative min-h-screen bg-cover bg-center px-6 py-10"
      style={{ backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')" }}
    >
      <AkuAkuPopup
        open={akuOpen}
        onClose={() => setAkuOpen(false)}
        dialogs={akuDialogs}
        title="Aku-Aku"
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="crash-text crash-outline-fallback text-6xl font-black">
              MINI GAMES
            </h1>
            <p className="mt-2 text-sm font-semibold text-white/90">
              Kenali Nombor • {t(lang, activeSet.label)}
            </p>
          </div>

          <div className="rounded-2xl bg-white/85 p-4 shadow">
            <div className="text-xs font-black opacity-70">LANG</div>
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

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* LEFT */}
          <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
            <div className="text-2xl font-extrabold">Sistem Nombor</div>
            <div className="mt-2 text-sm font-semibold opacity-70">
              Click the pyramid to change the table.
            </div>

            <div className="mt-5 rounded-2xl bg-black/5 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-2xl font-extrabold">{activeSet.label.ms}</div>
                  {lang !== "ms" && (
                    <div className="text-sm font-semibold opacity-70">
                      {t(lang, activeSet.label)}
                    </div>
                  )}
                </div>

                {activeKey === "puluh" && (
                <button
                    type="button"
                    onClick={openAkuAkuPuluh}
                    className="shrink-0 bg-transparent p-0 shadow-none outline-none"
                    title="Aku-Aku"
                    aria-label="Aku-Aku"
                >
                    <Image
                    src="/assets/characters/Akuaku_idle.png"
                    alt="Aku2"
                    width={100}
                    height={100}
                    className="block cursor-pointer select-none bg-transparent transition hover:scale-[1.5] active:scale-[0.01]"
                    priority
                    />
                </button>
                )}
              </div>

              <div className="mx-auto w-full max-w-md space-y-2">
                {PYRAMID_LAYERS.map(({ key, width }) => {
                  const set = NUMBER_SETS.find((s) => s.key === key);
                  if (!set) return null;

                  const isActive = key === activeKey;

                  return (
                    <button
                      key={key}
                      onClick={() => setActiveKey(key)}
                      className={[
                        "mx-auto block",
                        width,
                        "rounded-xl px-4 py-3 text-center shadow transition",
                        "active:scale-[0.99]",
                        isActive
                          ? "bg-amber-300"
                          : "bg-amber-200/80 hover:bg-amber-200",
                      ].join(" ")}
                      title={t(lang, set.label)}
                    >
                      <div className="text-sm font-black">{set.label.ms}</div>
                      {lang !== "ms" && (
                        <div className="text-xs font-semibold opacity-70">
                          {t(lang, set.label)}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-black/5 p-4">
              <div className="text-xs font-black opacity-60">SELECTED</div>
              <div className="mt-1 text-xl font-extrabold">{activeSet.label.ms}</div>
              {lang !== "ms" && (
                <div className="text-sm font-semibold opacity-70">{t(lang, activeSet.label)}</div>
              )}
            </div>
          </section>

          {/* RIGHT */}
          <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
            <div className="text-2xl font-extrabold">{activeSet.label.ms}</div>
            {lang !== "ms" && (
              <div className="text-sm font-semibold opacity-70">{t(lang, activeSet.label)}</div>
            )}

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[560px] border-separate border-spacing-0 overflow-hidden rounded-2xl">
                <thead>
                  <tr className="bg-amber-200">
                    <th className="border border-black/10 p-4 text-left align-top">
                      <div className="text-sm font-black">Nombor</div>
                    </th>
                    <th className="border border-black/10 p-4 text-left align-top">
                      <div className="text-sm font-black">Sebutan</div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {activeSet.rows.map((r) => (
                    <tr key={r.n} className="bg-white/95">
                      <td className="border border-black/10 p-4 align-top">
                        <div className="text-base font-extrabold">{formatMsNumber(r.n)}</div>
                      </td>

                      <td className="border border-black/10 p-4 align-top">
                        <div className="text-base font-extrabold">{r.word.ms}</div>
                        {lang !== "ms" && (
                          <div className="text-xs font-semibold opacity-70">{t(lang, r.word)}</div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {activeKey === "sa" && (
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
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
