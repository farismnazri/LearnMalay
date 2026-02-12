"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import FigureCard from "@/components/game/FigureCard";

import AkuAkuPopup from "@/components/game/AkuAkuPopup";
import BackgroundAudio from "@/components/game/BackgroundAudio";

import TableCard from "@/components/game/TableCard";
import TickCard from "@/components/game/TickCard";
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
  const params = useParams();
  const chapterId = Number((params as any)?.id ?? "0");

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
      <main className="min-h-screen px-6 py-10">
        <div className="mx-auto max-w-xl rounded-2xl bg-white/90 p-6 shadow">
          <div className="text-xl font-extrabold">No user selected</div>
          <p className="mt-2 text-sm opacity-70">Select a user to continue.</p>
          <div className="mt-5 flex gap-3">
            <Link className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow" href="/user">
              Select User
            </Link>
            <Link className="rounded-xl bg-white px-4 py-2 text-sm font-bold shadow" href="/map">
              Back to Map
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!user) return null;

  const isAdmin = !!user.isAdmin;

  if (!content) {
    return (
      <main className="min-h-screen px-6 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white/90 p-6 shadow">
          <div className="text-xl font-extrabold">Chapter {chapterId}</div>
          <p className="mt-2 text-sm opacity-70">Content not wired yet.</p>
          <Link className="mt-5 inline-block rounded-xl bg-white px-4 py-2 text-sm font-bold shadow" href="/map">
            Back to Map
          </Link>
        </div>
      </main>
    );
  }

  // helper: world/level mapping
  const world = content.id <= 4 ? 1 : content.id <= 8 ? 2 : 3;
  const level = content.id <= 4 ? content.id : content.id <= 8 ? content.id - 4 : content.id - 8;

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
    if (isAdmin) return;
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
    // If your ChapterPage union doesn't include "wordsearch" yet, TS can complain.
    // This switch stays clean if your lib types are updated; otherwise it still runs fine.
    switch ((page as any).kind) {
      case "intro":
        return (page as any).sections.map((s: any) => <SectionCard key={s.id} section={s} lang={lang} />);
      case "table":
        return <TableCard page={page as any} lang={lang} />;
      case "chat":
        return (
          <ChatCard
            page={page as any}
            lang={lang}
            userName={user.name}
            userAvatarSrc={getProfileAvatarSrc(user.avatarId)}
          />
        );
      case "dragfill":
        return <DragFillCard page={page as any} lang={lang} />;
      case "typein":
        return <TypeInCard page={page as any} lang={lang} />;
      case "boxdrag":
        return <BoxDragCard page={page as any} lang={lang} />;
      case "wordsearch":
        return <WordSearchCard page={page as any} lang={lang} />;
      case "crossword":
        return <CrosswordCard key={(page as any).id} page={page as any} lang={lang} />;
      case "tick":
        return <TickCard page={page as any} lang={lang} />;
      case "figure":
        return <FigureCard page={page as any} lang={lang} />;
      default:
        return null;
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0a2014] px-6 py-10">
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

      <BackgroundAudio src="/assets/audio/bgm.m4a" />

      <AkuAkuPopup
        open={showIntro && introDialogs.length > 0}
        onClose={() => setShowIntro(false)}
        dialogs={introDialogs}
        title="Aku-Aku"
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* top bar */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="crash-text crash-outline-chapter text-7xl font-black leading-none whitespace-pre-line">
              {content.id === 5
                ? `CHAPTER 5 -\nNOMBOR,\nANGKA &\nALAMAT`
                : content.id === 6
                ? `CHAPTER 6 -\nALAM\nSEKITAR &\nCUACA`
                : content.id === 7
                ? "CHAPTER 7 - MAKANAN\n& KUIH-MUIH"
                : content.id === 8
                ? "CHAPTER 8 - PERAYAAN\nDI MALAYSIA"
                : `CHAPTER ${content.id} - ${titleMs}`}
            </div>

            {lang !== "ms" && <div className="mt-1 text-lg font-extrabold text-white/90">{titleTrans}</div>}

            {totalPages > 0 && (
              <div className="mt-2 text-sm font-semibold text-white/80">
                Page {safeIdx + 1} / {totalPages}
              </div>
            )}
          </div>

          {/* user card */}
          <div className="rounded-2xl bg-white/85 p-4 shadow">
            <div className="text-xs font-black opacity-70">PLAYER</div>
            <div className="text-lg font-extrabold">{user.name}</div>
            <div className="mt-1 text-xs font-semibold opacity-80">World: {world}</div>
            <div className="text-xs font-semibold opacity-80">Level: {level}</div>

            <div className="mt-3 flex gap-2">
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
              <button
                onClick={() => setShowIntro(true)}
                className="rounded-xl bg-amber-300 px-3 py-2 text-xs font-black shadow"
                title="Show Aku-Aku intro again"
              >
                Replay Intro
              </button>

              <Link href="/map" className="rounded-xl bg-white px-3 py-2 text-xs font-bold shadow">
                Back to Map
              </Link>
            </div>

            {/* page navigation */}
            {totalPages > 0 && (
              <div className="mt-3 flex gap-2">
                <button
                  onClick={prevPage}
                  disabled={safeIdx === 0}
                  className="rounded-xl bg-white px-3 py-2 text-xs font-bold shadow disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={nextPage}
                  disabled={safeIdx >= totalPages - 1}
                  className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-black text-white shadow disabled:opacity-50"
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
        {!isAdmin && totalPages > 0 && isLastPage && !isFinalChapter && (
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
                disabled={alreadyUnlockedNext || isAdmin || markingDone}
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

              <Link href="/map" className="rounded-xl bg-white px-4 py-2 text-sm font-bold shadow">
                {lang === "ms" ? "Kembali ke Peta" : lang === "en" ? "Back to Map" : "Volver al Mapa"}
              </Link>
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



/* ---------------------------
   CHAT CARD
---------------------------- */
function ChatCard({
  page,
  lang,
  userName,
  userAvatarSrc,
}: {
  page: any;
  lang: UiLang;
  userName: string;
  userAvatarSrc: string;
}) {
  const titleTrans = lang === "ms" ? "" : lang === "en" ? page.title.en : page.title.es;
  const contextTrans = !page.context ? "" : lang === "ms" ? "" : lang === "en" ? page.context.en : page.context.es;

  const youId = page.youId ?? "azman";
  const aku2Name = "Aku2";
  const aku2AvatarSrc = "/assets/characters/Akuaku_idle.png";

  function msgText(t: { ms: string; en: string; es: string }) {
    if (lang === "ms") return { main: t.ms, sub: "" };
    const sub = lang === "en" ? t.en : t.es;
    return { main: t.ms, sub };
  }

  function initials(name: string) {
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
  }

  return (
    <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
      <div className="text-2xl font-extrabold">{page.title.ms}</div>
      {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{titleTrans}</div>}

      {page.context && (
        <div className="mt-3 rounded-2xl bg-black/5 p-4">
          <div className="text-sm font-extrabold">{page.context.ms}</div>
          {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{contextTrans}</div>}
        </div>
      )}

      <div className="mt-5 space-y-3">
        {page.messages.map((m: any) => {
          const isYou = m.from === youId;
          const speakerNameMs = isYou ? userName : aku2Name;
          const speakerAvatar = isYou ? userAvatarSrc : aku2AvatarSrc;

          const { main, sub } = msgText(m.text);

          return (
            <div key={m.id} className={`flex items-end gap-2 ${isYou ? "justify-end" : "justify-start"}`}>
              {!isYou && (
                <div className="h-10 w-10 overflow-hidden rounded-full bg-white shadow">
                  {speakerAvatar ? (
                    <Image
                      src={speakerAvatar}
                      alt={speakerNameMs}
                      width={40}
                      height={40}
                      className="h-10 w-10 bg-[#fbf5df] object-contain p-0.5"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center text-xs font-black">
                      {initials(speakerNameMs) || "?"}
                    </div>
                  )}
                </div>
              )}

              <div
                className={[
                  "max-w-[78%] rounded-2xl px-4 py-3 shadow",
                  isYou ? "bg-amber-200 text-black" : "bg-white text-black",
                ].join(" ")}
              >
                <div className="text-[10px] font-black opacity-50">{speakerNameMs.toUpperCase()}</div>

                <div className="mt-1 whitespace-pre-line text-sm font-extrabold">{main}</div>
                {lang !== "ms" && <div className="mt-1 whitespace-pre-line text-xs font-semibold opacity-70">{sub}</div>}
              </div>

              {isYou && (
                <div className="h-10 w-10 overflow-hidden rounded-full bg-white shadow">
                  <Image src={userAvatarSrc} alt={userName} width={40} height={40} className="h-10 w-10 object-cover" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------------------
   DRAG FILL CARD
---------------------------- */
function DragFillCard({ page, lang }: { page: any; lang: UiLang }) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setPlaced({});
    setChecked(false);
  }, [page.id]);

  const L = {
    q: lang === "ms" ? "SOALAN" : lang === "en" ? "QUESTION" : "PREGUNTA",
    a: lang === "ms" ? "JAWAPAN" : lang === "en" ? "ANSWER" : "RESPUESTA",
  };

  const titleTrans = lang === "ms" ? "" : lang === "en" ? page.title.en : page.title.es;
  const instTrans = lang === "ms" ? "" : lang === "en" ? page.instructions.en : page.instructions.es;

  function tr(t: { ms: string; en: string; es: string }) {
    return lang === "ms" ? t.ms : lang === "en" ? t.en : t.es;
  }

  function onDragStart(e: React.DragEvent, optionId: string) {
    e.dataTransfer.setData("text/plain", optionId);
  }

  function allowDrop(e: React.DragEvent) {
    e.preventDefault();
  }

  function onDrop(e: React.DragEvent, blankId: string) {
    e.preventDefault();
    const optionId = e.dataTransfer.getData("text/plain");
    if (!optionId) return;
    setPlaced((prev) => ({ ...prev, [blankId]: optionId }));
  }

  function clearBlank(blankId: string) {
    setPlaced((prev) => {
      const copy = { ...prev };
      delete copy[blankId];
      return copy;
    });
  }

  function isCorrect(blankId: string, correct: string) {
    return placed[blankId] === correct;
  }

  function blankKey(itemId: string, slot: "q" | "a") {
    return `${itemId}-${slot}`;
  }

  function renderTextOrBlank(x: any, blankId: string) {
    if (x.kind === "text") {
      return (
        <div className="whitespace-pre-line text-sm font-extrabold">
          {x.text.ms}
          {lang !== "ms" && <div className="mt-1 text-xs font-semibold opacity-70">{tr(x.text)}</div>}
        </div>
      );
    }

    const chosenId = placed[blankId];
    const chosen = page.options.find((o: any) => o.id === chosenId);
    const ok = checked ? isCorrect(blankId, x.correctOptionId) : null;

    return (
      <div className="whitespace-pre-line text-sm font-extrabold">
        <span>{x.before.ms}</span>

        <span
          onDragOver={allowDrop}
          onDrop={(e) => onDrop(e, blankId)}
          onClick={() => clearBlank(blankId)}
          className={[
            "mx-2 inline-flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl border-2 px-3 py-2 align-middle",
            chosen ? "bg-amber-100" : "bg-white",
            ok === null ? "border-black/20" : ok ? "border-emerald-500" : "border-red-500",
          ].join(" ")}
          title="Drop here (click to clear)"
        >
          {chosen ? chosen.ms : "—"}
        </span>

        <span>{x.after.ms}</span>

        {lang !== "ms" && (
          <div className="mt-2 text-xs font-semibold opacity-70">
            {tr(x.before)}
            <span className="mx-2 inline-block min-w-[160px] rounded-lg bg-black/5 px-2 py-1 text-center">
              {chosen ? tr(chosen) : "—"}
            </span>
            {tr(x.after)}
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
      <div className="text-2xl font-extrabold">{page.title.ms}</div>
      {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{titleTrans}</div>}

      <div className="mt-3 text-sm font-semibold opacity-70">
        {page.instructions.ms}
        {lang !== "ms" && <div className="mt-1 text-xs font-semibold opacity-70">{instTrans}</div>}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {page.options.map((o: any) => (
          <div
            key={o.id}
            draggable
            onDragStart={(e) => onDragStart(e, o.id)}
            className="cursor-grab rounded-2xl bg-white px-4 py-2 text-sm font-black shadow active:cursor-grabbing"
            title="Drag me"
          >
            <div>{o.ms}</div>
            {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{tr(o)}</div>}
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {page.items.map((it: any) => {
          const qId = blankKey(it.id, "q");
          const aId = blankKey(it.id, "a");

          const qCorrect = it.q.kind === "blank" ? it.q.correctOptionId : null;
          const aCorrect = it.a.kind === "blank" ? it.a.correctOptionId : null;

          const qOk = checked && qCorrect ? isCorrect(qId, qCorrect) : null;
          const aOk = checked && aCorrect ? isCorrect(aId, aCorrect) : null;

          return (
            <div key={it.id} className="rounded-2xl bg-black/5 p-4">
              <div className="mb-3 text-xs font-black opacity-60">#{it.n}</div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/70 p-4">
                  <div className="text-xs font-black opacity-60">{L.q}</div>
                  <div className={qOk === null ? "" : qOk ? "rounded-xl p-2 ring-2 ring-emerald-400" : "rounded-xl p-2 ring-2 ring-red-400"}>
                    {renderTextOrBlank(it.q, qId)}
                  </div>
                </div>

                <div className="rounded-2xl bg-white/70 p-4">
                  <div className="text-xs font-black opacity-60">{L.a}</div>
                  <div className={aOk === null ? "" : aOk ? "rounded-xl p-2 ring-2 ring-emerald-400" : "rounded-xl p-2 ring-2 ring-red-400"}>
                    {renderTextOrBlank(it.a, aId)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button onClick={() => setChecked(true)} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white shadow">
          Check Answers
        </button>
        <button
          onClick={() => {
            setPlaced({});
            setChecked(false);
          }}
          className="rounded-xl bg-white px-4 py-2 text-sm font-bold shadow"
        >
          Reset
        </button>
      </div>
    </section>
  );
}

/* ---------------------------
   TYPE IN CARD
---------------------------- */
function TypeInCard({ page, lang }: { page: any; lang: UiLang }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const AKU_SRC = "/assets/characters/Akuaku_idle.png";

  useEffect(() => {
    setAnswers({});
    setChecked(false);
    setRevealed({});
  }, [page.id]);

  const titleTrans = lang === "ms" ? "" : lang === "en" ? page.title.en : page.title.es;
  const instTrans = lang === "ms" ? "" : lang === "en" ? page.instructions.en : page.instructions.es;

  function tr(t: { ms: string; en: string; es: string }) {
    return lang === "ms" ? t.ms : lang === "en" ? t.en : t.es;
  }

  function norm(s: string) {
    const x = s.trim();
    if (page.caseSensitive) return x;
    return x.toLowerCase().replace(/[-–—]/g, " ").replace(/\s+/g, " ");
  }

  function isCorrect(itemId: string, correct: string) {
    return norm(answers[itemId] ?? "") === norm(correct);
  }

  function setInput(itemId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [itemId]: value }));
    setRevealed((prev) => {
      if (!prev[itemId]) return prev;
      const copy = { ...prev };
      delete copy[itemId];
      return copy;
    });
  }

  return (
    <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
      <div className="text-2xl font-extrabold">{page.title.ms}</div>
      {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{titleTrans}</div>}

      <div className="mt-3 text-sm font-semibold opacity-70">
        {page.instructions.ms}
        {lang !== "ms" && <div className="mt-1 text-xs font-semibold opacity-70">{instTrans}</div>}
      </div>

      <div className="mt-6 space-y-3">
        {page.items.map((it: any) => {
          const ok = checked ? isCorrect(it.id, it.answer) : null;
          const showReveal = !!revealed[it.id];

          return (
            <div key={it.id} className="rounded-2xl bg-black/5 p-4">
              <div className="mb-2 text-xs font-black opacity-60">#{it.n}</div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {it.images ? (
                  <div className="flex w-full flex-wrap gap-2 sm:w-72">
                    {(it.images as any[]).map((img, idx) => (
                      <div
                        key={`${it.id}-img-${idx}`}
                        className="flex-1 min-w-[120px] overflow-hidden rounded-2xl border border-black/10 bg-white/80 p-2 shadow"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt ?? ""}
                          width={img.w ?? 320}
                          height={img.h ?? 200}
                          className={img.className ?? "w-full h-auto object-contain"}
                        />
                      </div>
                    ))}
                  </div>
                ) : it.image ? (
                  <div className="w-full sm:w-60 overflow-hidden rounded-2xl border border-black/10 bg-white/80 p-2 shadow">
                    <Image
                      src={it.image.src}
                      alt={it.image.alt ?? ""}
                      width={it.image.w ?? 320}
                      height={it.image.h ?? 200}
                      className={it.image.className ?? "w-full h-auto object-contain"}
                    />
                  </div>
                ) : (
                  <div className="text-lg font-extrabold">
                    <span className="inline-block rounded-xl bg-amber-100 px-3 py-2">{it.scrambled}</span>
                    <span className="mx-2 opacity-60">→</span>
                  </div>
                )}

                <input
                  value={answers[it.id] ?? ""}
                  onChange={(e) => setInput(it.id, e.target.value)}
                  placeholder="..."
                  className="min-w-0 flex-1 rounded-xl border-2 border-black/10 bg-white px-3 py-2 text-sm font-bold shadow"
                />

                {checked && (
                  <div className="flex items-center gap-2">
                    {ok ? (
                      <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-black text-white">
                        {lang === "ms" ? "BETUL" : lang === "en" ? "CORRECT" : "CORRECTO"}
                      </span>
                    ) : (
                      <>
                        <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white">
                          {lang === "ms" ? "SALAH" : lang === "en" ? "WRONG" : "INCORRECTO"}
                        </span>

                        <button
                          type="button"
                          onClick={() => setRevealed((p) => ({ ...p, [it.id]: true }))}
                          className="block cursor-pointer select-none bg-transparent transition hover:scale-[1.04] active:scale-[0.98]"
                          title={
                            lang === "ms"
                              ? "Klik untuk lihat jawapan"
                              : lang === "en"
                              ? "Click to reveal answer"
                              : "Clic para ver la respuesta"
                          }
                        >
                          <Image src={AKU_SRC} alt="AkuAku hint" width={44} height={44} className="h-11 w-11" />
                        </button>

                        {showReveal && (
                          <div className="ml-2 rounded-xl bg-amber-100 px-3 py-2 text-xs font-extrabold">
                            <div>
                              {lang === "ms" ? "Jawapan" : lang === "en" ? "Answer" : "Respuesta"}:{" "}
                              <span className="font-black">{it.answer}</span>
                            </div>
                            {it.meaning && lang !== "ms" && <div className="mt-1 opacity-70">{tr(it.meaning)}</div>}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>

              {checked && it.meaning && lang !== "ms" && (
                <div className="mt-2 text-xs font-semibold opacity-70">{tr(it.meaning)}</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button onClick={() => setChecked(true)} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white shadow">
          Check Answers
        </button>
        <button
          onClick={() => {
            setAnswers({});
            setChecked(false);
            setRevealed({});
          }}
          className="rounded-xl bg-white px-4 py-2 text-sm font-bold shadow"
        >
          Reset
        </button>
      </div>
    </section>
  );
}

/* ---------------------------
   BOX DRAG CARD
---------------------------- */
function BoxDragCard({ page, lang }: { page: any; lang: UiLang }) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setPlaced({});
    setChecked(false);
  }, [page.id]);

  const titleTrans = lang === "ms" ? "" : lang === "en" ? page.title.en : page.title.es;
  const instTrans = lang === "ms" ? "" : lang === "en" ? page.instructions.en : page.instructions.es;

  function tr(t: { ms: string; en: string; es: string }) {
    return lang === "ms" ? t.ms : lang === "en" ? t.en : t.es;
  }

  function onDragStart(e: React.DragEvent, optionId: string) {
    e.dataTransfer.setData("text/plain", optionId);
  }

  function allowDrop(e: React.DragEvent) {
    e.preventDefault();
  }

  function onDrop(e: React.DragEvent, nodeId: string) {
    e.preventDefault();
    const optionId = e.dataTransfer.getData("text/plain");
    if (!optionId) return;
    setPlaced((prev) => ({ ...prev, [nodeId]: optionId }));
  }

  function clear(nodeId: string) {
    setPlaced((prev) => {
      const copy = { ...prev };
      delete copy[nodeId];
      return copy;
    });
  }

  function isCorrect(nodeId: string, correctOptionId?: string) {
    if (!correctOptionId) return false;
    return placed[nodeId] === correctOptionId;
  }

  function posStyle(node: any): React.CSSProperties {
    if (typeof node.xPct === "number" && typeof node.yPct === "number") {
      return { left: `${node.xPct}%`, top: `${node.yPct}%` };
    }

    switch (node.position) {
      case "topLeft":
        return { left: "25%", top: "18%" };
      case "topRight":
        return { left: "75%", top: "18%" };
      case "bottomLeft":
        return { left: "18%", top: "78%" };
      case "bottomCenter":
        return { left: "50%", top: "78%" };
      case "bottomRight":
        return { left: "82%", top: "78%" };
      default:
        return { left: "50%", top: "50%" };
    }
  }

  function nodeClass(shape: "rect" | "oval", ok: boolean | null, hasValue: boolean) {
    const base =
      "absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center shadow font-extrabold text-sm sm:text-base";
    const shapeCls = shape === "oval" ? "rounded-full" : "rounded-2xl";
    const fill = hasValue ? "bg-amber-100" : "bg-white";
    const border = ok === null ? "border-2 border-black/20" : ok ? "border-2 border-emerald-500" : "border-2 border-red-500";
    const size = page.compact
      ? "w-[125px] h-[56px] sm:w-[145px] sm:h-[60px] px-3"
      : "w-[220px] h-[72px] sm:w-[260px] sm:h-[80px] px-4";

    return [base, shapeCls, fill, border, size].join(" ");
  }

  const VB_W = 1000;
  const VB_H = 600;

  function pxX(pct: number) {
    return (pct / 100) * VB_W;
  }
  function pxY(pct: number) {
    return (pct / 100) * VB_H;
  }

  return (
    <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
      <div className="text-2xl font-extrabold">{page.title.ms}</div>
      {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{titleTrans}</div>}

      <div className="mt-3 text-sm font-semibold opacity-70">
        {page.instructions.ms}
        {lang !== "ms" && <div className="mt-1 text-xs font-semibold opacity-70">{instTrans}</div>}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {page.options.map((o: any) => (
          <div
            key={o.id}
            draggable
            onDragStart={(e) => onDragStart(e, o.id)}
            className="cursor-grab rounded-2xl bg-white px-4 py-2 text-sm font-black shadow active:cursor-grabbing"
            title="Drag me"
          >
            <div>{o.ms}</div>
            {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{tr(o)}</div>}
          </div>
        ))}
      </div>

      <div className="mt-2 sm:mt-5">
        <div className="relative mx-auto w-full max-w-7xl rounded-3xl bg-white/70 p-6 shadow">
          <div className="relative w-full overflow-x-auto">
            <div
              className={`relative ${page.compact ? "min-w-[1100px]" : "min-w-[900px]"}`}
              style={{ aspectRatio: page.compact ? "21 / 9" : "16 / 9" }}
            >
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="rgba(0,0,0,0.55)" />
                  </marker>
                </defs>

                {page.lines && page.lines.length > 0 ? (
                  page.lines.map((ln: any, i: number) => (
                    <line
                      key={i}
                      x1={pxX(ln.x1)}
                      y1={pxY(ln.y1)}
                      x2={pxX(ln.x2)}
                      y2={pxY(ln.y2)}
                      stroke="rgba(0,0,0,0.55)"
                      strokeWidth="3"
                      markerEnd={ln.arrow ? "url(#arrow)" : undefined}
                    />
                  ))
                ) : (
                  <>
                    <line x1="310" y1="120" x2="690" y2="120" stroke="rgba(0,0,0,0.55)" strokeWidth="3" />
                    <line x1="500" y1="120" x2="500" y2="260" stroke="rgba(0,0,0,0.55)" strokeWidth="3" />
                    <line x1="200" y1="260" x2="800" y2="260" stroke="rgba(0,0,0,0.55)" strokeWidth="3" />
                    <line x1="200" y1="260" x2="200" y2="390" stroke="rgba(0,0,0,0.55)" strokeWidth="3" markerEnd="url(#arrow)" />
                    <line x1="500" y1="260" x2="500" y2="390" stroke="rgba(0,0,0,0.55)" strokeWidth="3" markerEnd="url(#arrow)" />
                    <line x1="800" y1="260" x2="800" y2="390" stroke="rgba(0,0,0,0.55)" strokeWidth="3" markerEnd="url(#arrow)" />
                  </>
                )}
              </svg>

              {page.nodes.map((node: any) => {
                const style = posStyle(node);

                if (node.fixedText) {
                  return (
                    <div key={node.id} style={style} className={nodeClass(node.shape, null, true)}>
                      <div>
                        <div className="text-base sm:text-lg">{node.fixedText.ms}</div>
                        {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{tr(node.fixedText)}</div>}
                      </div>
                    </div>
                  );
                }

                const chosenId = placed[node.id];
                const chosen = page.options.find((o: any) => o.id === chosenId);
                const ok = checked ? isCorrect(node.id, node.correctOptionId) : null;

                return (
                  <div
                    key={node.id}
                    style={style}
                    onDragOver={allowDrop}
                    onDrop={(e) => onDrop(e, node.id)}
                    onClick={() => clear(node.id)}
                    className={nodeClass(node.shape, ok, !!chosen)}
                    title="Drop here (click to clear)"
                  >
                    <div>
                      <div className="text-base sm:text-lg">{chosen ? chosen.ms : "—"}</div>
                      {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{chosen ? tr(chosen) : "—"}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 text-xs font-semibold opacity-70">
            {lang === "ms"
              ? "Seret perkataan ke tempat yang betul. Klik pada kotak untuk kosongkan."
              : lang === "en"
              ? "Drag the words into the correct places. Click a box to clear it."
              : "Arrastra las palabras al lugar correcto. Haz clic en una casilla para borrarla."}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => setChecked(true)} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white shadow">
              Check Answers
            </button>
            <button
              onClick={() => {
                setPlaced({});
                setChecked(false);
              }}
              className="rounded-xl bg-white px-4 py-2 text-sm font-bold shadow"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
