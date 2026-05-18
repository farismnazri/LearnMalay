"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import BoxDragCard from "@/components/game/BoxDragCard";
import ChatCard from "@/components/game/ChatCard";
import DragFillCard from "@/components/game/DragFillCard";
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

// IMPORTANT: pull types from the same place as chapters (avoid broken /types imports)
import {
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
} from "@/lib/chapters";

const MAX_CHAPTERS = 11;
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
  const chapterId = Number(params.id ?? "0");

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
      case "table":
        return <TableCard page={page} lang={lang} />;
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
    <main className="relative min-h-screen overflow-x-hidden bg-[#0a2014] app-page-pad">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[100svh]">
        <div
          className="absolute inset-0 bg-top bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')",
            backgroundSize: "100% auto",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.36)_58%,rgba(10,32,20,0.98)_100%)]" />
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
  const L = {
    question: lang === "ms" ? "SOALAN" : lang === "en" ? "QUESTION" : "PREGUNTA",
    answer: lang === "ms" ? "JAWAPAN" : lang === "en" ? "ANSWER" : "RESPUESTA",
  };

  const titleTrans = lang === "en" ? section.title.en : lang === "es" ? section.title.es : section.title.ms;

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
