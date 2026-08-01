"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getCurrentUser, type UserProfile } from "@/lib/userStore";
import { getProfileAvatarSrc } from "@/lib/profileAvatars";
import type { UiLang } from "@/lib/chapters";
import { BackgroundAudioControls } from "@/components/game/BackgroundAudio";
import IconActionLink from "@/components/navigation/IconActionLink";
import StylizedTitle from "@/components/game/StylizedTitle";
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
  id: "numbers" | "word-match" | "wordsearch" | "currency" | "makan-apa" | "misi-membeli" | "arah-jalan";
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
    id: "makan-apa",
    title: { ms: "Makan Apa?", en: "What to Eat?", es: "¿Que Comer?" },
    desc: {
      ms: "Teka nama makanan berdasarkan gambar. 5 nyawa, pilih jawapan yang betul.",
      en: "Guess the food name from images. 5 lives, choose the correct answer.",
      es: "Adivina el nombre de la comida por imagenes. 5 vidas, elige la respuesta correcta.",
    },
    href: "/minigames/makan-apa",
    requiredChapter: 7,
    backgroundSrc: "/assets/backgrounds/MakanApa.webp",
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
  {
    id: "arah-jalan",
    title: { ms: "Arah Jalan", en: "Directions", es: "Direcciones" },
    desc: {
      ms: "Susun arahan belok untuk sampai destinasi di peta tetap.",
      en: "Build turn commands to reach a destination on a fixed map.",
      es: "Construye comandos de giro para llegar al destino en un mapa fijo.",
    },
    href: "/minigames/arah-jalan",
    requiredChapter: 4,
    backgroundSrc: "/assets/backgrounds/ArahJalan.webp",
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
        "relative aspect-square overflow-hidden rounded-2xl border shadow-xl transition-all duration-200",
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
        <div className="absolute right-2.5 top-2.5 z-20">
          <Badge text={badgeText} tone={isLatestNew ? "new" : "locked"} />
        </div>
      )}

      <div
        className={[
          "absolute inset-x-0 bottom-0 z-10 p-2.5",
          isDisabled ? "bg-[#203521] text-[#e9f6d7]" : "bg-[#f6eed3] text-[#22341b]",
        ].join(" ")}
      >
        <div className="text-sm font-black leading-tight sm:text-base">{pick(g.title, lang)}</div>
        <div className="mt-1.5 inline-flex rounded-full border border-black/15 bg-black/10 px-2 py-1 text-[10px] font-black">
          {lang === "ms"
            ? `Prasyarat: Bab ${g.requiredChapter}`
            : lang === "en"
            ? `Prerequisite: Chapter ${g.requiredChapter}`
            : `Requisito: Capítulo ${g.requiredChapter}`}
        </div>
        {isDisabled && (
          <div className="mt-1 text-[10px] font-black leading-tight text-[#d4e7be]">
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

  useEffect(() => {
    let alive = true;
    getCurrentUser()
      .then((u) => {
        if (alive) setUser(u);
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

  return (
    <main className="chapter-page-shell relative min-h-screen overflow-x-hidden app-page-pad">
      <div className="chapter-viewport-bg" aria-hidden="true">
        <div className="chapter-viewport-bg-image" />
        <div className="chapter-viewport-bg-fade" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl space-y-5 phone-lg:space-y-6">
        {/* header row */}
        <div className="flex flex-col gap-3 tablet:flex-row tablet:items-start tablet:justify-between tablet:gap-4">
          <div className="min-w-0 rounded-3xl border border-[#c7deaa]/45 bg-[#153525]/75 p-5 shadow-[0_20px_55px_rgba(0,0,0,0.45)] backdrop-blur-md md:flex-1">
            <div className="flex items-center gap-4">
              <Image
                src={getProfileAvatarSrc(user?.avatarId)}
                alt="Player avatar"
                width={60}
                height={60}
                className="h-14 w-14 rounded-full border-2 border-[#f8da72]/75 bg-white/95 object-cover shadow-lg"
              />
              <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                <StylizedTitle title="Mini Games" />
                <div className="flex min-h-[58px] items-center justify-center rounded-xl border border-[#88a967]/80 bg-gradient-to-b from-[#4f733a]/95 via-[#345c34]/95 to-[#274a2d]/95 px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-2px_0_rgba(0,0,0,0.2)]">
                  <span className="whitespace-nowrap text-base font-black leading-none tracking-wide text-[#fff7d6] phone-lg:text-lg">
                    CHAPTER {user?.progress.chapter ?? "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full rounded-3xl border border-[#c6dca8]/45 bg-[#163726]/75 p-4 shadow-xl backdrop-blur-md tablet:w-auto tablet:shrink-0">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => pickLang("ms")}
                className={`touch-target rounded-full px-3 py-1 text-xs font-black shadow ${lang === "ms" ? "bg-[#ffd447] text-[#3f2f00]" : "bg-[#f7f2dc] text-[#1f3519]"}`}
              >
                BM
              </button>
              <button
                onClick={() => pickLang("en")}
                className={`touch-target rounded-full px-3 py-1 text-xs font-black shadow ${lang === "en" ? "bg-[#ffd447] text-[#3f2f00]" : "bg-[#f7f2dc] text-[#1f3519]"}`}
              >
                EN
              </button>
              <button
                onClick={() => pickLang("es")}
                className={`touch-target rounded-full px-3 py-1 text-xs font-black shadow ${lang === "es" ? "bg-[#ffd447] text-[#3f2f00]" : "bg-[#f7f2dc] text-[#1f3519]"}`}
              >
                ES
              </button>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <IconActionLink
                href="/map"
                kind="map"
                tooltip="Back to Map"
                iconClassName="brightness-0 invert"
              />
              <IconActionLink
                href="/minigames/highscores"
                kind="highscores"
                tooltip="High Scores"
                iconClassName="brightness-0 invert"
              />
              <BackgroundAudioControls
                variant="icon"
                iconClassName="brightness-0 invert"
              />
            </div>
          </div>
        </div>

        {/* game grid */}
        <section className="grid grid-cols-1 gap-3 phone-lg:grid-cols-2 tablet:grid-cols-3">
          {GAMES.map((g) => (
            <GameCard key={g.id} g={g} lang={lang} user={user} latestUnlockedId={latestUnlockedId} />
          ))}
        </section>
      </div>
    </main>
  );
}
