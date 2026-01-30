"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import AkuAkuPopup from "@/components/game/AkuAkuPopup";
import { chapter01Intro } from "@/lib/akuAku/chapter-01";

import { getCurrentUser, type UserProfile } from "@/lib/userStore";
import { chapter01, type UiLang, type ChapterPage, type ChapterSection } from "@/lib/chapters";

import Image from "next/image";

import TickCard from "@/components/game/TickCard";

import BackgroundAudio from "@/components/game/BackgroundAudio";

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
  const [lang, setLang] = useState<UiLang>("ms");

  // Aku-Aku intro popup state
  const [showIntro, setShowIntro] = useState(true);

  // Page flow
  const [pageIdx, setPageIdx] = useState(0);

  useEffect(() => {
    setUser(getCurrentUser());
    setLang(readUiLang());
  }, []);

  // Reset intro + page index when navigating to different chapter
  useEffect(() => {
    setShowIntro(true);
    setPageIdx(0);
  }, [chapterId]);

  const content = useMemo(() => {
    if (chapterId === 1) return chapter01;
    return null;
  }, [chapterId]);

  const introDialogs = useMemo(() => {
    if (chapterId === 1) return chapter01Intro;
    return [];
  }, [chapterId]);

  function pickLang(next: UiLang) {
    setLang(next);
    writeUiLang(next);
  }

  if (!user) {
    return (
      <main className="min-h-screen px-6 py-10">
        <div className="mx-auto max-w-xl rounded-2xl bg-white/90 p-6 shadow">
          <div className="text-xl font-extrabold">No user selected</div>
          <p className="mt-2 text-sm opacity-70">Select a user to continue.</p>
          <div className="mt-5 flex gap-3">
            <Link
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow"
              href="/user"
            >
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

  // helper: world/level mapping (your rule)
  const world = content.id <= 4 ? 1 : content.id <= 8 ? 2 : 3;
  const level = content.id <= 4 ? content.id : content.id <= 8 ? content.id - 4 : content.id - 8;

  // Chapter title (big header)
  const titleMs = content.title.ms.toUpperCase();
  const titleTrans = lang === "ms" ? "" : lang === "en" ? content.title.en : content.title.es;

  // Current page
  const pages = content.pages ?? [];
  const totalPages = pages.length;
  const safeIdx = Math.min(Math.max(pageIdx, 0), Math.max(totalPages - 1, 0));
  const currentPage: ChapterPage | null = totalPages > 0 ? pages[safeIdx] : null;

  function nextPage() {
    setPageIdx((v) => Math.min(totalPages - 1, v + 1));
  }

  function prevPage() {
    setPageIdx((v) => Math.max(0, v - 1));
  }

  return (
    <main
      className="relative min-h-screen bg-cover bg-center px-6 py-10"
      style={{ backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')" }}
    >

    <BackgroundAudio src="/assets/audio/bgm.mp3" />
    
      {/* Aku-Aku Intro Popup */}
      <AkuAkuPopup
        open={showIntro && introDialogs.length > 0}
        onClose={() => setShowIntro(false)}
        dialogs={introDialogs}
        title="Aku-Aku"
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative mx-auto max-w-5xl">
        {/* top bar */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="crash-text crash-outline-fallback text-7xl font-black leading-none">
              CHAPTER {content.id} - {titleMs}
            </div>

            {lang !== "ms" && (
              <div className="mt-1 text-lg font-extrabold text-white/90">{titleTrans}</div>
            )}

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
        ) : currentPage.kind === "intro" ? (
            currentPage.sections.map((s) => <SectionCard key={s.id} section={s} lang={lang} />)
        ) : currentPage.kind === "table" ? (
            <TableCard page={currentPage} lang={lang} />
        ) : currentPage.kind === "chat" ? (
            <ChatCard page={currentPage} lang={lang} userName={user.name} />
        ) : currentPage.kind === "dragfill" ? (
            <DragFillCard page={currentPage} lang={lang} />
        ) : currentPage.kind === "tick" ? (
            <TickCard page={currentPage} lang={lang} />
        ) : null}
        </div>
      </div>
    </main>
  );
}

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

function TableCard({
  page,
  lang,
}: {
  page: Extract<ChapterPage, { kind: "table" }>;
  lang: UiLang;
}) {
  const titleTrans = lang === "ms" ? "" : lang === "en" ? page.title.en : page.title.es;

  function renderTranslatedLine(line: { ms: string; en: string; es: string }, idx: number) {
    const trans = lang === "ms" ? "" : lang === "en" ? line.en : line.es;

    return (
      <div key={`${line.ms}-${idx}`}>
        <div className="text-base font-extrabold">{line.ms}</div>
        {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{trans}</div>}
      </div>
    );
  }

  function renderHeader(label: { ms: string; en: string; es: string }) {
    const trans = lang === "ms" ? "" : lang === "en" ? label.en : label.es;
    return (
      <div>
        <div className="text-sm font-black">{label.ms}</div>
        {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{trans}</div>}
      </div>
    );
  }

  const firstColKey = page.columns?.[0]?.key;

  return (
    <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
      <div className="text-2xl font-extrabold">{page.title.ms}</div>
      {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{titleTrans}</div>}

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[760px] border-separate border-spacing-0 overflow-hidden rounded-2xl">
          <thead>
            <tr className="bg-amber-200">
              {page.columns.map((c) => (
                <th key={c.key} className="border border-black/10 p-4 text-left align-top">
                  {renderHeader(c.label)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {page.rows.map((r) => (
              <tr key={r.id} className="bg-white/95">
                {page.columns.map((c) => {
                  const lines = r.cells?.[c.key] ?? [];

                  const isFirst = c.key === firstColKey;
                  const tdClass = isFirst
                    ? "border border-black/10 bg-amber-100/70 p-4 align-top"
                    : "border border-black/10 p-4 align-top";

                  return (
                    <td key={`${r.id}-${c.key}`} className={tdClass}>
                      <div className="space-y-2">
                        {lines.length === 0 ? (
                          <div className="text-xs font-semibold opacity-40">—</div>
                        ) : (
                          lines.map(renderTranslatedLine)
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ChatCard({
  page,
  lang,
  userName,
}: {
  page: Extract<ChapterPage, { kind: "chat" }>;
  lang: UiLang;
  userName: string;
}) {
  const titleTrans = lang === "ms" ? "" : lang === "en" ? page.title.en : page.title.es;
  const contextTrans =
    !page.context
      ? ""
      : lang === "ms"
      ? ""
      : lang === "en"
      ? page.context.en
      : page.context.es;

  const youId = "azman"; // you/me
  const otherId = "ayub"; // bandicoot

  const other = page.participants.find((p) => p.id === otherId);
  const otherAvatar = other?.avatarSrc;

  function msgText(t: { ms: string; en: string; es: string }) {
    if (lang === "ms") return { main: t.ms, sub: "" };
    const sub = lang === "en" ? t.en : t.es;
    return { main: t.ms, sub };
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
        {page.messages.map((m) => {
          const isYou = m.from === youId;
          const { main, sub } = msgText(m.text);

          return (
            <div key={m.id} className={`flex items-end gap-2 ${isYou ? "justify-end" : "justify-start"}`}>
              {/* left avatar (bandicoot) */}
              {!isYou && (
                <div className="h-10 w-10 overflow-hidden rounded-full bg-white shadow">
                  {otherAvatar ? (
                    <Image
                      src={otherAvatar}
                      alt="Pak Cik Ayub"
                      width={40}
                      height={40}
                      className="h-10 w-10 object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center text-xs font-black">
                      AY
                    </div>
                  )}
                </div>
              )}

              {/* bubble */}
              <div
                className={[
                  "max-w-[78%] rounded-2xl px-4 py-3 shadow",
                  isYou ? "bg-amber-200 text-black" : "bg-white text-black",
                ].join(" ")}
              >
                {/* speaker tiny label (optional but cute) */}
                <div className="text-[10px] font-black opacity-50">
                  {isYou ? userName.toUpperCase() : (other?.name.ms ?? "PAK CIK AYUB").toUpperCase()}
                </div>

                <div className="mt-1 text-sm font-extrabold whitespace-pre-line">{main}</div>
                {lang !== "ms" && <div className="mt-1 text-xs font-semibold opacity-70 whitespace-pre-line">{sub}</div>}
              </div>

              {/* right spacer (keeps bubble alignment symmetrical) */}
              {isYou && <div className="h-10 w-10" />}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DragFillCard({
  page,
  lang,
}: {
  page: Extract<ChapterPage, { kind: "dragfill" }>;
  lang: UiLang;
}) {
  const [placed, setPlaced] = useState<Record<string, string>>({}); // blankId -> optionId
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

  function renderTextOrBlank(x: any, blankId: string) {
    if (x.kind === "text") {
      return (
        <div className="text-sm font-extrabold whitespace-pre-line">
          {x.text.ms}
          {lang !== "ms" && <div className="mt-1 text-xs font-semibold opacity-70">{tr(x.text)}</div>}
        </div>
      );
    }

    const chosenId = placed[blankId];
    const chosen = page.options.find((o) => o.id === chosenId);

    const ok = checked ? isCorrect(blankId, x.correctOptionId) : null;

    return (
      <div className="text-sm font-extrabold whitespace-pre-line">
        {/* Malay main line */}
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

        {/* Translation line only when not BM */}
        {lang !== "ms" && (
          <div className="mt-2 text-xs font-semibold opacity-70">
            {tr(x.before)}
            <span className="mx-2 inline-block min-w-[160px] text-center rounded-lg bg-black/5 px-2 py-1">
              {chosen ? tr(chosen) : "—"}
            </span>
            {tr(x.after)}
          </div>
        )}
      </div>
    );
  }

  // stable IDs for blanks
  function blankKey(itemId: string, slot: "q" | "a") {
    return `${itemId}-${slot}`;
  }

  return (
    <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
      <div className="text-2xl font-extrabold">{page.title.ms}</div>
      {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{titleTrans}</div>}

      <div className="mt-3 text-sm font-semibold opacity-70">
        {page.instructions.ms}
        {lang !== "ms" && <div className="mt-1 text-xs font-semibold opacity-70">{instTrans}</div>}
      </div>

      {/* draggable options */}
      <div className="mt-5 flex flex-wrap gap-2">
        {page.options.map((o) => (
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

      {/* QnA items */}
      <div className="mt-6 space-y-4">
        {page.items.map((it) => {
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
                  <div className={qOk === null ? "" : qOk ? "ring-2 ring-emerald-400 rounded-xl p-2" : "ring-2 ring-red-400 rounded-xl p-2"}>
                    {renderTextOrBlank(it.q, qId)}
                  </div>
                </div>

                <div className="rounded-2xl bg-white/70 p-4">
                  <div className="text-xs font-black opacity-60">{L.a}</div>
                  <div className={aOk === null ? "" : aOk ? "ring-2 ring-emerald-400 rounded-xl p-2" : "ring-2 ring-red-400 rounded-xl p-2"}>
                    {renderTextOrBlank(it.a, aId)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => setChecked(true)}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white shadow"
        >
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