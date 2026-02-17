"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { UiLang } from "@/lib/chapters";
import IconActionLink from "@/components/navigation/IconActionLink";
import { getCurrentUser, type UserProfile } from "@/lib/userStore";
import { isMinigameUnlocked, MINIGAME_PREREQUISITES } from "@/lib/minigameUnlocks";

const UI_LANG_KEY = "learnMalay.uiLang.v1";
const AKU2_IDLE_SRC = "/assets/characters/Akuaku_idle.png";

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

export default function CurrencyIntroPage() {
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

  const requiredChapter = MINIGAME_PREREQUISITES.currency;
  const unlocked = isMinigameUnlocked(user, "currency");

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
            Complete Chapter {requiredChapter} first to play Currency.
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
      ? "WANG\nMALAYSIA"
      : lang === "en"
      ? "MALAYSIAN\nCURRENCY"
      : "MONEDA\nMALASIA";

  const subtitle: Translated = {
    ms: "Belajar menggunakan wang Malaysia dalam kehidupan seharian.",
    en: "Learn to use Malaysian currency in everyday transactions.",
    es: "Aprende a usar la moneda malasia en transacciones cotidianas.",
  };

  const howToPlay: Translated = {
    ms: "Cara main",
    en: "How to play",
    es: "Cómo jugar",
  };

  const instructions: Translated = {
    ms: "Pilih wang untuk bayar jumlah yang betul. Dalam tahap lebih tinggi, anda perlu kira baki kembalian juga!",
    en: "Select money to pay the correct amount. In higher levels, you'll need to calculate change too!",
    es: "Selecciona dinero para pagar la cantidad correcta. ¡En niveles más altos, también necesitarás calcular el cambio!",
  };

  const buyerMode: Translated = {
    ms: "Mod Pembeli: Bayar harga yang tepat",
    en: "Buyer Mode: Pay the exact price",
    es: "Modo Comprador: Paga el precio exacto",
  };

  const cashierMode: Translated = {
    ms: "Mod Juruwang: Kira dan pulangkan baki",
    en: "Cashier Mode: Calculate and return change",
    es: "Modo Cajero: Calcula y devuelve el cambio",
  };

  return (
    <main className="relative min-h-screen bg-cover bg-center px-6 py-10">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative mx-auto max-w-4xl space-y-6">
        {/* header row */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="crash-text crash-outline-fallback whitespace-pre-line text-6xl font-black leading-none">
              {title}
            </h1>

            <p className="mt-2 max-w-xl text-sm font-semibold text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">
              {pick(subtitle, lang)}
            </p>
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
              <IconActionLink href="/minigames/currency/play" kind="start-game" tooltip="Start Game" />
              <IconActionLink href="/minigames" kind="minigames" tooltip="Back to Mini Games" />
              <IconActionLink href="/map" kind="map" tooltip="Back to Map" />
            </div>
          </div>
        </div>

        {/* How to play */}
        <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
          <div className="flex flex-col items-center gap-2 text-center">
            <Image src={AKU2_IDLE_SRC} alt="AkuAku" width={120} height={120} className="drop-shadow" priority />
            <div className="text-xl font-extrabold">{pick(howToPlay, lang)}</div>
            <div className="max-w-2xl text-sm font-semibold opacity-80">
              {pick(instructions, lang)}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-emerald-50 p-4">
              <div className="text-sm font-black">{pick(buyerMode, lang)}</div>
              <div className="mt-2 text-xs font-semibold opacity-70">
                {lang === "ms"
                  ? "Klik wang untuk tambah ke pembayaran anda."
                  : lang === "en"
                  ? "Click money to add to your payment."
                  : "Haz clic en el dinero para agregar a tu pago."}
              </div>
            </div>

            <div className="rounded-2xl bg-amber-50 p-4">
              <div className="text-sm font-black">{pick(cashierMode, lang)}</div>
              <div className="mt-2 text-xs font-semibold opacity-70">
                {lang === "ms"
                  ? "Kira baki yang perlu dipulangkan kepada pelanggan."
                  : lang === "en"
                  ? "Calculate the change to return to the customer."
                  : "Calcula el cambio que debes devolver al cliente."}
              </div>
            </div>
          </div>
        </section>

        {/* Currency reference */}
        <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
          <div className="text-xl font-extrabold">
            {lang === "ms" ? "Wang Malaysia" : lang === "en" ? "Malaysian Currency" : "Moneda Malasia"}
          </div>
          <div className="mt-2 text-sm font-semibold opacity-70">
            {lang === "ms"
              ? "Nota: RM1, RM5, RM10, RM20, RM50, RM100 • Syiling: 5 sen, 10 sen, 20 sen, 50 sen"
              : lang === "en"
              ? "Notes: RM1, RM5, RM10, RM20, RM50, RM100 • Coins: 5 sen, 10 sen, 20 sen, 50 sen"
              : "Billetes: RM1, RM5, RM10, RM20, RM50, RM100 • Monedas: 5 sen, 10 sen, 20 sen, 50 sen"}
          </div>

          <div className="mt-4 rounded-2xl bg-black/5 p-4">
            <div className="text-xs font-black opacity-60">
              {lang === "ms" ? "FAKTA" : lang === "en" ? "FACT" : "DATO"}
            </div>
            <div className="mt-1 text-sm font-semibold">
              {lang === "ms"
                ? "100 sen = RM1. Malaysia menggunakan sistem perpuluhan untuk wang."
                : lang === "en"
                ? "100 sen = RM1. Malaysia uses a decimal system for currency."
                : "100 sen = RM1. Malasia usa un sistema decimal para la moneda."}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
