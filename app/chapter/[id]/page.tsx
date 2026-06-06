"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import BoxDragCard from "@/components/game/BoxDragCard";
import ChatCard from "@/components/game/ChatCard";
import DragFillCard from "@/components/game/DragFillCard";
import FamilyCard from "@/components/game/FamilyCard";
import FigureCard from "@/components/game/FigureCard";
import FoodIntroCard from "@/components/game/FoodIntroCard";
import { BackgroundAudioControls } from "@/components/game/BackgroundAudio";
import ChapterTitleHeader from "@/components/game/ChapterTitleHeader";
import IconActionLink from "@/components/navigation/IconActionLink";

import AkuAkuPopup from "@/components/game/AkuAkuPopup";

import TableCard from "@/components/game/TableCard";
import TickCard from "@/components/game/TickCard";
import TypeInCard from "@/components/game/TypeInCard";
import WordSearchCard from "@/components/game/WordSearchCard";
import CrosswordCard from "@/components/game/CrosswordCard";

import { chapter01Intro } from "@/lib/akuAku/chapter-01";
import { chapter02Intro } from "@/lib/akuAku/chapter-02";
import { chapter03Intro } from "@/lib/akuAku/chapter-03";
import { chapter04Intro } from "@/lib/akuAku/chapter-04";
import { chapter05Intro } from "@/lib/akuAku/chapter-05";
import { chapter06Intro } from "@/lib/akuAku/chapter-06";
import { chapter07Intro } from "@/lib/akuAku/chapter-07";
import { chapter08Intro } from "@/lib/akuAku/chapter-08";
import { chapter09Intro } from "@/lib/akuAku/chapter-09";
import { chapter10Intro } from "@/lib/akuAku/chapter-10";
import { chapter11Intro } from "@/lib/akuAku/chapter-11";

import { getCurrentUser, updateProgress, type UserProfile } from "@/lib/userStore";
import { getProfileAvatarSrc } from "@/lib/profileAvatars";
import { canPersistProgress, canUnlockEverything } from "@/lib/userCapabilities";
import { isChapterUnlocked } from "@/lib/minigameUnlocks";

// IMPORTANT: pull types from the same place as chapters (avoid broken /types imports)
import {
  MAX_CHAPTER_ID,
  MIN_CHAPTER_ID,
  chapter01,
  chapter02,
  chapter03,
  chapter04,
  chapter05,
  chapter06,
  chapter07,
  chapter08,
  chapter09,
  chapter10,
  chapter11,
  type UiLang,
  type ChapterPage,
  type ChapterSection,
  type Translated,
} from "@/lib/chapters";

const MAX_CHAPTERS = MAX_CHAPTER_ID;
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

export default function ChapterPage() {
  const params = useParams<{ id?: string }>();
  const chapterId =
    typeof params.id === "string" && /^\d+$/.test(params.id)
      ? Number.parseInt(params.id, 10)
      : Number.NaN;
  const hasValidChapterId =
    Number.isInteger(chapterId) && chapterId >= MIN_CHAPTER_ID && chapterId <= MAX_CHAPTERS;

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [lang, setLang] = useState<UiLang>("ms");

  // Aku-Aku intro popup state
  const [showIntro, setShowIntro] = useState(true);

  // Page flow
  const [pageIdx, setPageIdx] = useState(0);
  const [markingDone, setMarkingDone] = useState(false);

  useEffect(() => {
    let alive = true;
    getCurrentUser()
      .then((u) => {
        if (alive) setUser(u);
      })
      .finally(() => {
        if (alive) setLoadingUser(false);
      });
    setLang(readUiLang());
    return () => {
      alive = false;
    };
  }, []);

  // Reset intro + page index when navigating to different chapter
  useEffect(() => {
    setShowIntro(true);
    setPageIdx(0);
  }, [chapterId]);

  const content = useMemo(() => {
    if (chapterId === 1) return chapter01;
    if (chapterId === 2) return chapter02;
    if (chapterId === 3) return chapter03;
    if (chapterId === 4) return chapter04;
    if (chapterId === 5) return chapter05;
    if (chapterId === 6) return chapter06;
    if (chapterId === 7) return chapter07;
    if (chapterId === 8) return chapter08;
    if (chapterId === 9) return chapter09;
    if (chapterId === 10) return chapter10;
    if (chapterId === 11) return chapter11;
    return null;
  }, [chapterId]);

  const introDialogs = useMemo(() => {
    if (chapterId === 1) return chapter01Intro;
    if (chapterId === 2) return chapter02Intro;
    if (chapterId === 3) return chapter03Intro;
    if (chapterId === 4) return chapter04Intro;
    if (chapterId === 5) return chapter05Intro;
    if (chapterId === 6) return chapter06Intro;
    if (chapterId === 7) return chapter07Intro;
    if (chapterId === 8) return chapter08Intro;
    if (chapterId === 9) return chapter09Intro;
    if (chapterId === 10) return chapter10Intro;
    if (chapterId === 11) return chapter11Intro;
    return [];
  }, [chapterId]);

  function pickLang(next: UiLang) {
    setLang(next);
    writeUiLang(next);
  }

  if (!user && loadingUser) {
    return null; // no flash, rely on cached user
  }

  if (!user && !loadingUser) {
    return (
      <main className="min-h-screen app-page-pad">
        <div className="mx-auto max-w-xl rounded-2xl bg-white/90 p-6 shadow">
          <div className="text-xl font-extrabold">No user selected</div>
          <p className="mt-2 text-sm opacity-70">Select a user to continue.</p>
          <div className="mt-5 flex gap-3">
            <Link className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow" href="/user">
              Select User
            </Link>
            <IconActionLink href="/map" kind="map" tooltip="Back to Map" iconClassName="brightness-0" />
          </div>
        </div>
      </main>
    );
  }

  if (!user) return null;

  const canSaveProgress = canPersistProgress(user) && !canUnlockEverything(user);
  const chapterUnlocked = hasValidChapterId && isChapterUnlocked(user, chapterId);

  if (!hasValidChapterId) {
    return (
      <main className="min-h-screen app-page-pad">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white/90 p-6 shadow">
          <div className="text-xl font-extrabold">Invalid chapter</div>
          <p className="mt-2 text-sm opacity-70">This chapter link is invalid.</p>
          <div className="mt-5">
            <IconActionLink href="/map" kind="map" tooltip="Back to Map" iconClassName="brightness-0" />
          </div>
        </div>
      </main>
    );
  }

  if (!chapterUnlocked) {
    const previousChapter = Math.max(MIN_CHAPTER_ID, chapterId - 1);
    return (
      <main className="min-h-screen app-page-pad">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white/90 p-6 shadow">
          <div className="text-xl font-extrabold">Chapter locked</div>
          <p className="mt-2 text-sm opacity-70">
            Finish Chapter {previousChapter} first to unlock Chapter {chapterId}.
          </p>
          <div className="mt-5">
            <IconActionLink href="/map" kind="map" tooltip="Back to Map" iconClassName="brightness-0" />
          </div>
        </div>
      </main>
    );
  }

  if (!content) {
    return (
      <main className="min-h-screen app-page-pad">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white/90 p-6 shadow">
          <div className="text-xl font-extrabold">Chapter {chapterId}</div>
          <p className="mt-2 text-sm opacity-70">Content not wired yet.</p>
          <div className="mt-5">
            <IconActionLink href="/map" kind="map" tooltip="Back to Map" iconClassName="brightness-0" />
          </div>
        </div>
      </main>
    );
  }

  const titleMs = content.title.ms.toUpperCase();
  const titleTrans = lang === "ms" ? "" : lang === "en" ? content.title.en : content.title.es;

  const pages = content.pages ?? [];
  const totalPages = pages.length;

  const safeIdx = Math.min(Math.max(pageIdx, 0), Math.max(totalPages - 1, 0));
  const currentPage = (pages[safeIdx] as ChapterPage | undefined) ?? undefined;

  const isLastPage = totalPages > 0 && safeIdx === totalPages - 1;

  const isFinalChapter = chapterId >= MAX_CHAPTERS;
  const nextChapter = Math.min(MAX_CHAPTERS, chapterId + 1);
  const alreadyUnlockedNext = isFinalChapter || user.progress.chapter >= nextChapter;

  async function markChapterDone() {
    if (!isLastPage) return;
    if (!canSaveProgress) return;
    if (isFinalChapter) return;
    if (markingDone) return;
    if (!user) return;

    const nextProgress = {
      chapter: Math.max(user.progress.chapter, nextChapter),
      page: 1,
    };

    try {
      setMarkingDone(true);
      const updatedUser = await updateProgress(user.id, nextProgress);
      setUser(updatedUser);
    } finally {
      setMarkingDone(false);
    }
  }

  function nextPage() {
    setPageIdx((v) => Math.min(Math.max(totalPages - 1, 0), v + 1));
  }

  function prevPage() {
    setPageIdx((v) => Math.max(0, v - 1));
  }

  // IMPORTANT: define renderPage BEFORE return, not inside JSX
  const renderPage = (page: ChapterPage) => {
    switch (page.kind) {
      case "intro":
        return page.sections.map((s) => <SectionCard key={s.id} section={s} lang={lang} />);
      case "pronounCards":
        return (
          <PronounLessonCard
            page={page}
            lang={lang}
            userAvatarSrc={getProfileAvatarSrc(user.avatarId)}
            userName={user.name}
          />
        );
      case "table":
        return <TableCard page={page} lang={lang} />;
      case "family":
        return <FamilyCard page={page} lang={lang} />;
      case "chat":
        return (
          <ChatCard
            page={page}
            lang={lang}
            userName={user.name}
            userAvatarSrc={getProfileAvatarSrc(user.avatarId)}
          />
        );
      case "dragfill":
        return <DragFillCard page={page} lang={lang} />;
      case "typein":
        return <TypeInCard page={page} lang={lang} />;
      case "boxdrag":
        return <BoxDragCard page={page} lang={lang} />;
      case "wordsearch":
        return <WordSearchCard page={page} lang={lang} />;
      case "crossword":
        return <CrosswordCard key={page.id} page={page} lang={lang} />;
      case "tick":
        return <TickCard page={page} lang={lang} />;
      case "figure":
        return <FigureCard page={page} lang={lang} />;
      case "foodintro":
        return <FoodIntroCard page={page} lang={lang} />;
      default:
        return null;
    }
  };

  return (
    <main className="chapter-page-shell relative min-h-screen overflow-x-hidden bg-[#0a2014] app-page-pad">
      <div className="chapter-viewport-bg" aria-hidden="true">
        <div className="chapter-viewport-bg-image" />
        <div className="chapter-viewport-bg-fade" />
      </div>

      <AkuAkuPopup
        open={showIntro && introDialogs.length > 0}
        onClose={() => setShowIntro(false)}
        dialogs={introDialogs}
        title="Aku-Aku"
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* top bar */}
        <div className="grid items-start gap-4 md:grid-cols-[minmax(0,1fr)_16rem] md:gap-5 lg:grid-cols-[minmax(0,1fr)_16.5rem]">
          <div className="min-w-0 md:pr-1">
            <ChapterTitleHeader chapterId={content.id} title={titleMs} />

            {lang !== "ms" && <div className="mt-1 text-lg font-extrabold text-white/90">{titleTrans}</div>}

            {totalPages > 0 && (
              <div className="mt-2 text-sm font-semibold text-white/80">
                Page {safeIdx + 1} / {totalPages}
              </div>
            )}
          </div>

          {/* user card */}
          <div className="w-full max-w-sm rounded-2xl bg-white/85 p-3 shadow md:w-64 md:max-w-none md:justify-self-end">

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => pickLang("ms")}
                className={`touch-target rounded-full px-3 py-1 text-sm font-black shadow ${lang === "ms" ? "bg-amber-300" : "bg-white"}`}
              >
                BM
              </button>
              <button
                onClick={() => pickLang("en")}
                className={`touch-target rounded-full px-3 py-1 text-sm font-black shadow ${lang === "en" ? "bg-amber-300" : "bg-white"}`}
              >
                EN
              </button>
              <button
                onClick={() => pickLang("es")}
                className={`touch-target rounded-full px-3 py-1 text-sm font-black shadow ${lang === "es" ? "bg-amber-300" : "bg-white"}`}
              >
                ES
              </button>
            </div>

            <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2">
              <button
                onClick={() => setShowIntro(true)}
                className="touch-target rounded-xl bg-amber-300 px-2.5 py-2 text-xs font-black shadow"
                title="Show Aku-Aku intro again"
              >
                Replay Intro
              </button>

              <BackgroundAudioControls
                className="[&>button]:h-9 [&>button]:w-9"
                buttonClassName="rounded-none bg-transparent p-0 shadow-none"
              />

              <IconActionLink
                href="/map"
                kind="map"
                tooltip="Back to Map"
                className="justify-self-end"
                iconClassName="h-9 w-9 brightness-0"
              />
            </div>

            {/* page navigation */}
            {totalPages > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={prevPage}
                  disabled={safeIdx === 0}
                  className="touch-target rounded-xl bg-white px-3 py-2 text-sm font-bold shadow disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={nextPage}
                  disabled={safeIdx >= totalPages - 1}
                  className="touch-target rounded-xl bg-emerald-600 px-3 py-2 text-sm font-black text-white shadow disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="mt-8 grid gap-5">
          {!currentPage ? (
            <div className="rounded-3xl bg-white/90 p-6 shadow-xl">No pages yet.</div>
          ) : (
            renderPage(currentPage)
          )}
        </div>

        {/* CHAPTER COMPLETE CTA */}
        {canSaveProgress && totalPages > 0 && isLastPage && !isFinalChapter && (
          <section className="mt-5 rounded-3xl bg-white/90 p-6 shadow-xl">
            <div className="text-xs font-black opacity-60">{lang === "ms" ? "SELESAI" : lang === "en" ? "DONE" : "LISTO"}</div>

            <div className="mt-2 text-2xl font-extrabold">
              {lang === "ms"
                ? "Anda sudah sampai ke akhir bab!"
                : lang === "en"
                ? "You reached the end of the chapter!"
                : "¡Llegaste al final del capítulo!"}
            </div>

            <div className="mt-2 text-sm font-semibold opacity-70">
              {alreadyUnlockedNext
                ? lang === "ms"
                  ? "Bab seterusnya sudah dibuka."
                  : lang === "en"
                  ? "Next chapter is already unlocked."
                  : "El siguiente capítulo ya está desbloqueado."
                : lang === "ms"
                ? "Tekan butang di bawah untuk buka bab seterusnya."
                : lang === "en"
                ? "Press the button below to unlock the next chapter."
                : "Pulsa el botón para desbloquear el siguiente capítulo."}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={markChapterDone}
                disabled={alreadyUnlockedNext || !canSaveProgress || markingDone}
                className={[
                  "rounded-xl px-4 py-2 text-sm font-black shadow",
                  alreadyUnlockedNext ? "bg-white opacity-60" : "bg-emerald-600 text-white hover:bg-emerald-500",
                ].join(" ")}
              >
                {alreadyUnlockedNext
                  ? lang === "ms"
                    ? "Sudah dibuka"
                    : lang === "en"
                    ? "Already unlocked"
                    : "Ya desbloqueado"
                  : lang === "ms"
                  ? "Tanda siap (buka bab seterusnya)"
                  : lang === "en"
                  ? "Mark as done (unlock next)"
                  : "Marcar como hecho (desbloquear siguiente)"}
                {markingDone ? "..." : ""}
              </button>

              <IconActionLink
                href="/map"
                kind="map"
                tooltip={lang === "ms" ? "Kembali ke Peta" : lang === "en" ? "Back to Map" : "Volver al Mapa"}
                iconClassName="brightness-0"
              />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

/* ---------------------------
   SECTION CARD
---------------------------- */
function SectionCard({ section, lang }: { section: ChapterSection; lang: UiLang }) {
  if (section.kind === "comic") {
    return <ComicSectionCard section={section} lang={lang} />;
  }

  const L = {
    question: lang === "ms" ? "SOALAN" : lang === "en" ? "QUESTION" : "PREGUNTA",
    answer: lang === "ms" ? "JAWAPAN" : lang === "en" ? "ANSWER" : "RESPUESTA",
  };

  const titleTrans = lang === "en" ? section.title.en : lang === "es" ? section.title.es : section.title.ms;
  const isImageCardList =
    section.kind === "list" && section.items.some((it) => typeof it.imageSrc === "string" && it.imageSrc.length > 0);

  return (
    <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
      <div className="text-2xl font-extrabold">{section.title.ms}</div>
      {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{titleTrans}</div>}

      {section.kind === "pairs" ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {section.pairs.map((p) => {
            const qTrans = lang === "en" ? p.q.en : lang === "es" ? p.q.es : p.q.ms;
            const aTrans = lang === "en" ? p.a.en : lang === "es" ? p.a.es : p.a.ms;

            return (
              <div key={p.id} className="rounded-2xl bg-black/5 p-4">
                <div className="text-xs font-black opacity-60">{L.question}</div>
                <div className="text-lg font-extrabold">{p.q.ms}</div>
                {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{qTrans}</div>}

                <div className="mt-3 text-xs font-black opacity-60">{L.answer}</div>
                <div className="text-lg font-extrabold">{p.a.ms}</div>
                {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{aTrans}</div>}
              </div>
            );
          })}
        </div>
      ) : isImageCardList ? (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((it) => {
            const t = lang === "en" ? it.en : lang === "es" ? it.es : it.ms;
            const label = it.cardLabel
              ? lang === "en"
                ? it.cardLabel.en
                : lang === "es"
                ? it.cardLabel.es
                : it.cardLabel.ms
              : "";
            const alt = it.imageAlt
              ? lang === "en"
                ? it.imageAlt.en
                : lang === "es"
                ? it.imageAlt.es
                : it.imageAlt.ms
              : it.ms;

            return (
              <li
                key={it.id}
                className="overflow-hidden rounded-3xl border-4 border-black/15 bg-[#0c2b27] shadow-[0_10px_0_rgba(0,0,0,0.2)]"
              >
                <div className="relative aspect-[4/3] w-full">
                  {it.imageSrc && (
                    <Image
                      src={it.imageSrc}
                      alt={alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  )}
                  {label && (
                    <div className="absolute left-3 top-3 rounded-full bg-[#ffcf33] px-3 py-1 text-xs font-black uppercase tracking-wide text-black shadow">
                      {label}
                    </div>
                  )}
                </div>
                <div className="border-t-4 border-black/10 bg-[#0c2b27] px-4 py-3 text-white">
                  <div className="text-base font-extrabold leading-tight">{it.ms}</div>
                  {lang !== "ms" && <div className="mt-0.5 text-xs font-semibold text-white/85">{t}</div>}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {section.items.map((it) => {
            const t = lang === "en" ? it.en : lang === "es" ? it.es : it.ms;
            return (
              <li key={it.id} className="rounded-2xl bg-black/5 p-4">
                <div className="text-lg font-extrabold">{it.ms}</div>
                {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{t}</div>}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function tr(text: Translated, lang: UiLang) {
  return lang === "en" ? text.en : lang === "es" ? text.es : text.ms;
}

function PronounLessonCard({
  page,
  lang,
  userAvatarSrc,
  userName,
}: {
  page: Extract<ChapterPage, { kind: "pronounCards" }>;
  lang: UiLang;
  userAvatarSrc: string;
  userName: string;
}) {
  return (
    <section className="overflow-hidden rounded-[1.25rem] border-4 border-[#2b160a] bg-[#ffe48a] p-3 shadow-[0_10px_0_rgba(0,0,0,0.35)] sm:p-4 md:p-5">
      <div className="flex items-center gap-3 border-b-4 border-[#2b160a]/25 pb-3">
        <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl border-4 border-[#2b160a] bg-[#ffcf55] shadow-[inset_0_-7px_0_rgba(0,0,0,0.13),0_4px_0_rgba(0,0,0,0.2)]">
          <Image
            src={userAvatarSrc}
            alt={`${userName} avatar`}
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
            draggable={false}
          />
        </div>
        <div className="min-w-0">
          <div className="text-2xl font-black leading-tight text-[#2b160a]">{tr(page.title, lang)}</div>
          <div className="mt-1 text-sm font-extrabold leading-snug text-[#2b160a]/75">{tr(page.helper, lang)}</div>
        </div>
      </div>

      <div className="mt-4 grid gap-4">
        {page.sections.map((section) => (
          <section
            key={section.id}
            className="rounded-2xl border-[3px] border-[#25140c] bg-[#fff4cf] p-3 shadow-[inset_0_0_0_4px_rgba(255,255,255,0.22),0_6px_0_rgba(0,0,0,0.22)] sm:p-4"
          >
            <div className="flex items-center gap-2">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border-[3px] border-[#25140c] bg-white shadow-[0_3px_0_rgba(0,0,0,0.18)]">
                <Image
                  src={section.iconSrc}
                  alt={tr(section.iconAlt, lang)}
                  width={36}
                  height={36}
                  className="h-8 w-8 object-contain"
                  draggable={false}
                />
              </div>
              <h2 className="text-xl font-black leading-tight text-[#25140c]">{tr(section.label, lang)}</h2>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {section.cards.map((card) => (
                <article
                  key={card.id}
                  className="flex min-w-0 flex-col rounded-2xl border-[3px] border-[#25140c] bg-[#f4ead7] p-2 shadow-[0_5px_0_rgba(0,0,0,0.23)]"
                >
                  <div className="rounded-xl border-2 border-[#25140c]/20 bg-white/75 px-3 py-2">
                    <div className="text-lg font-black leading-tight text-[#25140c]">{tr(card.title, lang)}</div>
                    <div className="mt-0.5 text-sm font-extrabold leading-snug text-[#25140c]/70">{tr(card.description, lang)}</div>
                  </div>

                  <div className="relative mt-2 aspect-[4/3] overflow-hidden rounded-xl bg-[#fff7df]">
                    <Image
                      src={card.imageSrc}
                      alt={tr(card.imageAlt, lang)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                      className="object-contain"
                      draggable={false}
                    />
                  </div>

                  <div className="mt-2 grid flex-1 content-start gap-2">
                    {card.info && (
                      <div className="rounded-lg border-2 border-[#25140c]/30 bg-[#fff1b3] px-2.5 py-2 text-xs font-black leading-snug text-[#25140c]/80">
                        {tr(card.info, lang)}
                      </div>
                    )}
                    {lang !== "ms" && card.translation && (
                      <div className="rounded-lg border-2 border-[#25140c]/25 bg-white px-2.5 py-2 text-sm font-extrabold leading-snug text-[#25140c]/75">
                        {lang === "en" ? card.translation.en : card.translation.es}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function ComicSectionCard({
  section,
  lang,
}: {
  section: Extract<ChapterSection, { kind: "comic" }>;
  lang: UiLang;
}) {
  const titleTrans = tr(section.title, lang);
  const iconLabel = tr(section.iconSlot.label, lang);
  const iconAlt = section.iconSlot.imageAlt ? tr(section.iconSlot.imageAlt, lang) : iconLabel;
  const hasArtworkPanels = section.panels.some((panel) => Boolean(panel.imageSrc));
  const panelGridClass =
    section.id === "berpisah"
      ? "sm:grid-cols-2"
      : section.id === "penghargaan"
      ? "justify-items-center md:grid-cols-1"
      : section.panels.length >= 4
      ? hasArtworkPanels
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 xl:grid-cols-4"
      : section.panels.length === 1
      ? "md:grid-cols-1"
      : "md:grid-cols-2";
  const iconTone =
    section.iconSlot.variant === "bye"
      ? "bg-[#a9d7ff]"
      : section.iconSlot.variant === "thanks"
      ? "bg-[#f8c1d4]"
      : "bg-[#ffcf55]";

  return (
    <section className="overflow-hidden rounded-[1.25rem] border-4 border-[#2b160a] bg-[#ffe48a] p-3 shadow-[0_10px_0_rgba(0,0,0,0.35)] sm:p-4 md:p-5">
      <div className="flex items-center gap-3 border-b-4 border-[#2b160a]/25 pb-3">
        <div
          className={[
            "grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-4 border-[#2b160a]",
            "text-center text-[0.6rem] font-black uppercase leading-none text-[#2b160a]",
            "shadow-[inset_0_-7px_0_rgba(0,0,0,0.13),0_4px_0_rgba(0,0,0,0.2)] [overflow-wrap:anywhere]",
            iconTone,
          ].join(" ")}
          aria-label={iconLabel}
        >
          {section.iconSlot.imageSrc ? (
            <Image src={section.iconSlot.imageSrc} alt={iconAlt} width={48} height={48} className="h-12 w-12 object-contain" />
          ) : (
            iconLabel
          )}
        </div>
        <div className="min-w-0">
          <div className="text-2xl font-black leading-tight text-[#2b160a]">{section.title.ms}</div>
          {lang !== "ms" && <div className="mt-1 text-sm font-extrabold text-[#2b160a]/70">{titleTrans}</div>}
        </div>
      </div>

      <div className={`mt-4 grid gap-4 ${panelGridClass}`}>
        {section.panels.map((panel) => (
          <ComicPanel key={panel.id} panel={panel} sectionId={section.id} lang={lang} />
        ))}
      </div>
    </section>
  );
}

function ComicPanel({
  panel,
  sectionId,
  lang,
}: {
  panel: Extract<ChapterSection, { kind: "comic" }>["panels"][number];
  sectionId: string;
  lang: UiLang;
}) {
  if (panel.imageSrc) {
    const fallbackAlt = panel.kind === "conversation" ? panel.bubbles.map((bubble) => bubble.text.ms).join(" / ") : panel.phrase.ms;
    const imageAlt = panel.imageAlt ? tr(panel.imageAlt, lang) : fallbackAlt;
    const imageSizes =
      sectionId === "berpisah"
        ? "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 480px"
        : "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 480px";
    const articleClass =
      sectionId === "penghargaan"
        ? "w-full max-w-[30rem]"
        : "";

    return (
      <article className={`relative overflow-hidden rounded-2xl border-[3px] border-[#25140c] bg-[#f4ead7] p-2 shadow-[inset_0_0_0_4px_rgba(255,255,255,0.22),0_6px_0_rgba(0,0,0,0.25)] ${articleClass}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#f4ead7]">
          <Image
            src={panel.imageSrc}
            alt={imageAlt}
            fill
            sizes={imageSizes}
            className="object-contain"
          />
        </div>
        {"hint" in panel && panel.hint && (
          <div className="mt-2 rounded-lg border-2 border-[#25140c]/20 bg-[#fff4cf] px-2.5 py-2 text-center text-xs font-extrabold leading-snug text-[#25140c]/75 sm:text-[0.8rem]">
            {tr(panel.hint, lang)}
          </div>
        )}
      </article>
    );
  }

  return (
    <article className="relative flex min-h-[14rem] flex-col overflow-hidden rounded-2xl border-[3px] border-[#25140c] bg-[#75c7d8] p-4 shadow-[inset_0_0_0_4px_rgba(255,255,255,0.22),0_6px_0_rgba(0,0,0,0.25)]">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.24)_0_12%,transparent_12%_50%,rgba(0,0,0,0.05)_50%_62%,transparent_62%)] bg-[length:38px_38px]"
        aria-hidden="true"
      />

      {panel.kind === "conversation" ? (
        <>
          {panel.caption && <div className="relative z-10 mb-2 text-xs font-black uppercase text-[#25140c]/70">{tr(panel.caption, lang)}</div>}
          <div className="relative z-10 grid flex-1 content-start gap-4 pb-12">
            {panel.bubbles.map((bubble) => (
              <SpeechBubble key={bubble.id} side={bubble.side} text={bubble.text} lang={lang} />
            ))}
          </div>
          <MascotPlaceholders />
        </>
      ) : (
        <>
          <div className="relative z-10 flex flex-1 items-center justify-center pb-10">
            <div className="max-w-[15rem] rounded-[1.15rem] border-[3px] border-[#25140c] bg-white px-4 py-3 text-center shadow-[0_5px_0_rgba(0,0,0,0.22)]">
              <div className="text-xl font-black leading-tight text-[#25140c]">{panel.phrase.ms}</div>
              {lang !== "ms" && <div className="mt-1 text-sm font-extrabold leading-snug text-[#25140c]/70">{tr(panel.phrase, lang)}</div>}
            </div>
          </div>
          {panel.hint && (
            <div className="relative z-10 rounded-xl border-2 border-[#25140c]/45 bg-[#fff1b3] px-3 py-2 text-sm font-extrabold leading-snug text-[#25140c]/80">
              {tr(panel.hint, lang)}
            </div>
          )}
          <MascotPlaceholders />
        </>
      )}
    </article>
  );
}

function SpeechBubble({ side, text, lang }: { side: "left" | "right"; text: Translated; lang: UiLang }) {
  const isRight = side === "right";

  return (
    <div
      className={[
        "relative max-w-[88%] rounded-[1.15rem] border-[3px] border-[#25140c] px-4 py-3 shadow-[0_5px_0_rgba(0,0,0,0.22)]",
        isRight ? "ml-auto bg-[#fff1b3]" : "mr-auto bg-white",
      ].join(" ")}
    >
      <div className="text-xl font-black leading-tight text-[#25140c]">{text.ms}</div>
      {lang !== "ms" && <div className="mt-1 text-sm font-extrabold leading-snug text-[#25140c]/70">{tr(text, lang)}</div>}
      <span
        className={[
          "absolute -bottom-2 h-4 w-4 rotate-45 border-b-[3px] border-[#25140c]",
          isRight
            ? "right-7 border-r-[3px] bg-[#fff1b3]"
            : "left-7 border-l-[3px] bg-white",
        ].join(" ")}
        aria-hidden="true"
      />
    </div>
  );
}

function MascotPlaceholders() {
  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-3 z-0 flex items-end justify-between" aria-hidden="true">
      <div className="grid h-14 w-14 place-items-center rounded-full border-[3px] border-[#25140c] bg-[#f15b2a] text-lg font-black text-white shadow-[inset_0_-7px_0_rgba(0,0,0,0.18)]">
        A
      </div>
      <div className="grid h-14 w-14 place-items-center rounded-full border-[3px] border-[#25140c] bg-[#2258a7] text-lg font-black text-white shadow-[inset_0_-7px_0_rgba(0,0,0,0.18)]">
        B
      </div>
    </div>
  );
}
