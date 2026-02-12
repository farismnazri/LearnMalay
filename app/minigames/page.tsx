"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getCurrentUser, type UserProfile } from "@/lib/userStore";
import { getProfileAvatarSrc } from "@/lib/profileAvatars";
import type { UiLang } from "@/lib/chapters";
import {
  getLatestUnlockedMinigameId,
  hasCompletedChapter,
} from "@/lib/minigameUnlocks";

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

type MiniGame = {
  id: "numbers" | "word-match" | "wordsearch" | "currency" | "misi-membeli";
  title: Translated;
  desc: Translated;
  href: string;
  requiredChapter: number;
  backgroundSrc: string;
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
    requiredChapter: 1,
    backgroundSrc: "/assets/backgrounds/Nombor.webp",
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
    requiredChapter: 2,
    backgroundSrc: "/assets/backgrounds/PadanPerkataan.webp",
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
    requiredChapter: 3,
    backgroundSrc: "/assets/backgrounds/CariPerkataan.webp",
  },
  {
    id: "currency",
    title: { ms: "Wang Malaysia", en: "Malaysian Currency", es: "Moneda Malasia" },
    desc: {
      ms: "Belajar bayar dan kira baki dengan wang Malaysia.",
      en: "Practice paying and returning change with Malaysian money.",
      es: "Practica pagar y devolver cambio con moneda malasia.",
    },
    href: "/minigames/currency",
    requiredChapter: 5,
    backgroundSrc: "/assets/backgrounds/WangMalaysia.webp",
  },
  {
    id: "misi-membeli",
    title: { ms: "Misi Membeli", en: "Shopping Mission", es: "Misión de Compras" },
    desc: {
      ms: "Cari item dalam scene pasar dan bayar ikut senarai.",
      en: "Find market items on scene and check out with your list.",
      es: "Encuentra artículos en la escena del mercado y paga con tu lista.",
    },
    href: "/minigames/misi-membeli",
    requiredChapter: 11,
    backgroundSrc: "/assets/backgrounds/misi_membeli.webp",
  },
];

function Badge({ text, tone }: { text: string; tone: "new" | "locked" }) {
  const cls =
    tone === "new"
      ? "border border-[#e7bf56]/80 bg-[#ffdc68] text-[#3f2f00]"
      : "border border-[#8ab06f]/45 bg-[#1f422d]/90 text-[#dff0cb]";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-black tracking-wide ${cls}`}>{text}</span>;
}

function lockMessage(lang: UiLang, requiredChapter: number, hasUser: boolean) {
  if (!hasUser) {
    return lang === "ms"
      ? "Pilih pengguna dahulu untuk lihat akses minigame."
      : lang === "en"
      ? "Select a user first to view minigame access."
      : "Selecciona un usuario primero para ver el acceso a minijuegos.";
  }

  return lang === "ms"
    ? `Kunci: Selesaikan Bab ${requiredChapter} dahulu untuk main.`
    : lang === "en"
    ? `Locked: Complete Chapter ${requiredChapter} first to play.`
    : `Bloqueado: Completa primero el Capítulo ${requiredChapter} para jugar.`;
}

function GameCard({
  g,
  lang,
  user,
  latestUnlockedId,
}: {
  g: MiniGame;
  lang: UiLang;
  user: UserProfile | null;
  latestUnlockedId: MiniGame["id"] | null;
}) {
  const unlocked = hasCompletedChapter(user, g.requiredChapter);
  const isLatestNew = unlocked && latestUnlockedId === g.id;
  const hasUser = Boolean(user);
  const isDisabled = !unlocked;

  const badgeText = isLatestNew
    ? "NEW"
    : isDisabled
    ? lang === "ms"
      ? "LOCKED"
      : lang === "en"
      ? "LOCKED"
      : "BLOQUEADO"
    : null;

  const inner = (
    <div
      className={[
        "relative aspect-square overflow-hidden rounded-3xl border shadow-xl transition-all duration-200",
        "border-[#d6c992]/80 text-[#22341b]",
        isDisabled
          ? "cursor-not-allowed opacity-90"
          : "hover:-translate-y-0.5 hover:border-[#e0b64f] hover:shadow-[0_16px_30px_rgba(0,0,0,0.28)] active:scale-[0.99]",
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-0 bg-cover bg-center",
          isDisabled ? "grayscale" : "",
        ].join(" ")}
        style={{ backgroundImage: `url('${g.backgroundSrc}')` }}
      />
      {isDisabled && <div className="absolute inset-0 bg-[#10210f]/55" />}
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
      {badgeText && (
        <div className="absolute right-4 top-4 z-20">
          <Badge text={badgeText} tone={isLatestNew ? "new" : "locked"} />
        </div>
      )}

      <div
        className={[
          "absolute inset-x-0 bottom-0 z-10 p-4",
          isDisabled ? "bg-[#203521] text-[#e9f6d7]" : "bg-[#f6eed3] text-[#22341b]",
        ].join(" ")}
      >
        <div className="text-2xl font-black leading-tight">{pick(g.title, lang)}</div>
        <div className="mt-2 inline-flex rounded-full border border-black/15 bg-black/10 px-3 py-1 text-xs font-black">
          {lang === "ms"
            ? `Prasyarat: Bab ${g.requiredChapter}`
            : lang === "en"
            ? `Prerequisite: Chapter ${g.requiredChapter}`
            : `Requisito: Capítulo ${g.requiredChapter}`}
        </div>
        {isDisabled && (
          <div className="mt-2 text-xs font-black text-[#d4e7be]">
            {lockMessage(lang, g.requiredChapter, hasUser)}
          </div>
        )}
      </div>
    </div>
  );

  if (isDisabled) return <div>{inner}</div>;
  return (
    <Link href={g.href} className="block">
      {inner}
    </Link>
  );
}

export default function MiniGamesHubPage() {
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

  const latestUnlockedId = useMemo(() => getLatestUnlockedMinigameId(user), [user]);

  const title: Translated = { ms: "Mini Games", en: "Mini Games", es: "Mini Juegos" };
  const subtitle: Translated = {
    ms: "Pilih permainan untuk latihan.",
    en: "Choose a game to practice.",
    es: "Elige un juego para practicar.",
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#081d14] px-6 py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[100svh]">
        <div
          className="absolute inset-0 bg-top bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')",
            backgroundSize: "100% auto",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,220,88,0.16)_0%,rgba(255,220,88,0.03)_35%,transparent_52%),radial-gradient(circle_at_85%_18%,rgba(126,197,88,0.2)_0%,rgba(126,197,88,0.04)_38%,transparent_58%),linear-gradient(180deg,rgba(6,20,14,0.48)_0%,rgba(9,30,20,0.66)_58%,rgba(10,35,23,0.98)_100%)]" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-20 [background:repeating-linear-gradient(0deg,rgba(0,0,0,0.18)_0px,rgba(0,0,0,0.18)_1px,transparent_2px,transparent_4px)]" />

      <div className="relative z-10 mx-auto max-w-5xl space-y-6">
        {/* header row */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="w-full max-w-2xl rounded-3xl border border-[#c7deaa]/45 bg-[#153525]/75 p-5 shadow-[0_20px_55px_rgba(0,0,0,0.45)] backdrop-blur-md">
            <div className="flex items-center gap-4">
              <Image
                src={getProfileAvatarSrc(user?.avatarId)}
                alt="Player avatar"
                width={60}
                height={60}
                className="h-14 w-14 rounded-full border-2 border-[#f8da72]/75 bg-white/95 object-cover shadow-lg"
              />
              <div>
                <h1 className="crash-text crash-outline-fallback text-6xl font-black leading-none text-[#ffde66] drop-shadow-[0_3px_0_rgba(0,0,0,0.45)]">
                  {title.ms.toUpperCase()}
                </h1>
                {lang !== "ms" && <div className="mt-1 text-lg font-black text-[#f3f7e8]">{pick(title, lang)}</div>}
              </div>
            </div>

            <div className="mt-3 text-sm font-semibold text-[#eef8da]/90">
              {subtitle.ms}
              {lang !== "ms" && <span className="opacity-80"> • {pick(subtitle, lang)}</span>}
            </div>
            {!loadingUser && user && (
              <div className="mt-3 inline-flex rounded-full border border-[#bdd89f]/60 bg-[#2f5f34]/75 px-3 py-1 text-xs font-black tracking-wide text-[#f2fbdc]">
                {lang === "ms"
                  ? `Kemajuan semasa: Bab ${user.progress.chapter}`
                  : lang === "en"
                  ? `Current progress: Chapter ${user.progress.chapter}`
                  : `Progreso actual: Capítulo ${user.progress.chapter}`}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-[#c6dca8]/45 bg-[#163726]/75 p-4 shadow-xl backdrop-blur-md">
            <div className="text-xs font-black tracking-wide text-[#eff8db]/85">LANGUAGE</div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => pickLang("ms")}
                className={`rounded-full px-3 py-1 text-xs font-black shadow ${lang === "ms" ? "bg-[#ffd447] text-[#3f2f00]" : "bg-[#f7f2dc] text-[#1f3519]"}`}
              >
                BM
              </button>
              <button
                onClick={() => pickLang("en")}
                className={`rounded-full px-3 py-1 text-xs font-black shadow ${lang === "en" ? "bg-[#ffd447] text-[#3f2f00]" : "bg-[#f7f2dc] text-[#1f3519]"}`}
              >
                EN
              </button>
              <button
                onClick={() => pickLang("es")}
                className={`rounded-full px-3 py-1 text-xs font-black shadow ${lang === "es" ? "bg-[#ffd447] text-[#3f2f00]" : "bg-[#f7f2dc] text-[#1f3519]"}`}
              >
                ES
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href="/map"
                className="rounded-xl border border-[#bcd7a1]/55 bg-[#274d32]/85 px-3 py-2 text-xs font-black text-[#f2fae1] shadow hover:bg-[#315f3d]"
              >
                Back to Map
              </Link>
              <Link
                href="/minigames/highscores"
                className="rounded-xl bg-gradient-to-r from-[#ffd447] to-[#ffbf3f] px-3 py-2 text-xs font-black text-[#3f2e00] shadow hover:brightness-105"
              >
                High Scores
              </Link>
            </div>
          </div>
        </div>

        {/* game grid */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {GAMES.map((g) => (
            <GameCard key={g.id} g={g} lang={lang} user={user} latestUnlockedId={latestUnlockedId} />
          ))}
        </section>
      </div>
    </main>
  );
}
