"use client";

import Image from "next/image";

import type {
  ChapterTablePage,
  TableCellItem,
  TableImageCell,
  TableTextCell,
  Translated,
  UiLang,
} from "@/lib/chapters/types";

function tr(text: Translated, lang: UiLang) {
  return lang === "en" ? text.en : lang === "es" ? text.es : text.ms;
}

function isImageCell(item: TableCellItem): item is TableImageCell {
  return typeof item === "object" && item !== null && (item as Record<string, unknown>).kind === "image";
}

function isTextCell(item: TableCellItem): item is TableTextCell {
  return !isImageCell(item);
}

function highlightPhrase(text: string, phrase: string) {
  const index = text.toLocaleLowerCase().indexOf(phrase.toLocaleLowerCase());
  if (index < 0) return text;

  return (
    <>
      {text.slice(0, index)}
      <span className="rounded-full bg-[#fff1a8] px-2 py-0.5 text-[#2b160a] shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)]">
        {text.slice(index, index + phrase.length)}
      </span>
      {text.slice(index + phrase.length)}
    </>
  );
}

const CARD_TONES = [
  {
    border: "border-[#f2b654]",
    badge: "bg-[#ff8c14]",
    iconWrap: "bg-[#ff9d08]",
    tint: "from-[#fff8e7] via-[#fffdf8] to-[#fff6e2]",
    ring: "ring-[#ffe0a9]",
  },
  {
    border: "border-[#84b1fa]",
    badge: "bg-[#3d82f1]",
    iconWrap: "bg-[#2f7bf0]",
    tint: "from-[#eff6ff] via-[#fbfdff] to-[#edf4ff]",
    ring: "ring-[#d5e7ff]",
  },
  {
    border: "border-[#95cf7d]",
    badge: "bg-[#54aa3d]",
    iconWrap: "bg-[#59b13e]",
    tint: "from-[#f4fcea] via-[#fbfef8] to-[#eef9e7]",
    ring: "ring-[#d7efc8]",
  },
  {
    border: "border-[#ccb0f3]",
    badge: "bg-[#8456d8]",
    iconWrap: "bg-[#7d50ea]",
    tint: "from-[#fbf7ff] via-[#fdfcff] to-[#f6f0ff]",
    ring: "ring-[#eadfff]",
  },
  {
    border: "border-[#efb3d5]",
    badge: "bg-[#e14d8e]",
    iconWrap: "bg-[#e14d8e]",
    tint: "from-[#fff7fc] via-[#fffdfd] to-[#fff1f8]",
    ring: "ring-[#ffd7e9]",
  },
  {
    border: "border-[#8ad3d5]",
    badge: "bg-[#1fb7af]",
    iconWrap: "bg-[#24b4ac]",
    tint: "from-[#f2ffff] via-[#fbffff] to-[#eefbfb]",
    ring: "ring-[#d6f4f3]",
  },
  {
    border: "border-[#d8b9f1]",
    badge: "bg-[#8456d8]",
    iconWrap: "bg-[#7d50ea]",
    tint: "from-[#fcf9ff] via-[#fefcff] to-[#f8f1ff]",
    ring: "ring-[#ecdefb]",
  },
  {
    border: "border-[#d7b8ef]",
    badge: "bg-[#9a62d6]",
    iconWrap: "bg-[#8e59dd]",
    tint: "from-[#fdf8ff] via-[#fffdfd] to-[#f8f0ff]",
    ring: "ring-[#efdffb]",
  },
] as const;

export default function ChapterCounterActionsCard({
  page,
  lang,
}: {
  page: ChapterTablePage;
  lang: UiLang;
}) {
  const note = page.leadCard ? tr(page.leadCard.body, lang) : "";
  const helper = page.leadCard ? tr(page.leadCard.heading, lang) : "";
  const highlight = lang === "en" ? "I want to" : lang === "es" ? "Quiero" : "Saya mahu";

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,255,255,0.9))] p-4 shadow-[0_18px_40px_rgba(13,33,61,0.25)] backdrop-blur-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[1.9rem] font-black tracking-[-0.03em] text-[#1f1f26]">{page.title.ms}</h2>
          {lang !== "ms" && <p className="mt-1 text-sm font-bold text-[#4f4e5a]/75">{tr(page.title, lang)}</p>}
        </div>
        <div className="inline-flex items-center rounded-full border border-[#ffbf6f] bg-[#fff4df] px-3 py-1 text-sm font-black text-[#ff7a00]">
          Saya mahu...
        </div>
      </div>

      {page.leadCard && (
        <div className="mt-4 rounded-[1.4rem] border border-[#f6d6a7] bg-[#fff9ef] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
          <div className="text-sm font-black text-[#9a5c00]">{helper}</div>
          <div className="mt-1 text-sm font-bold text-[#4b3b1f]">{note}</div>
        </div>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {page.rows.map((row, index) => {
          const tone = CARD_TONES[index % CARD_TONES.length];
          const icon = row.cells.icon?.find(isImageCell);
          const counter = row.cells.counter?.find(isTextCell);
          const sentence = row.cells.sentence?.find(isTextCell);
          if (!icon || !counter || !sentence) return null;

          return (
            <article
              key={row.id}
              className={[
                "relative overflow-hidden rounded-[1.65rem] border bg-gradient-to-br p-4 shadow-[0_10px_25px_rgba(40,40,68,0.08)]",
                "min-h-[220px]",
                tone.border,
                tone.tint,
              ].join(" ")}
            >
              <div className={`absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full ${tone.badge} text-lg font-black text-white shadow-[0_6px_14px_rgba(0,0,0,0.15)]`}>
                {index + 1}
              </div>
              <div className={`absolute right-5 top-5 h-10 w-10 rounded-full ring-8 ${tone.ring} bg-white/25`} />
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center gap-3 pt-8">
                  <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-full ${tone.iconWrap} text-white shadow-[0_10px_20px_rgba(0,0,0,0.12)]`}>
                    <Image
                      src={icon.src}
                      alt={tr(icon.alt, lang)}
                      width={38}
                      height={38}
                      className="h-9 w-9 object-contain"
                      draggable={false}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[1rem] font-black leading-tight text-[#1f1f26]">{counter.ms}</div>
                    {lang !== "ms" && <div className="mt-1 text-xs font-bold leading-snug text-[#4e4d5a]/75">{tr(counter, lang)}</div>}
                  </div>
                </div>

                <div className="mt-4 rounded-[1.25rem] border border-black/5 bg-white/78 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                  <div className="text-base font-black leading-snug text-[#25140c]">
                    {highlightPhrase(sentence.ms, "Saya mahu")}
                  </div>
                  {lang !== "ms" && (
                    <div className="mt-2 text-xs font-bold leading-snug text-[#4e4d5a]/75">
                      {highlightPhrase(tr(sentence, lang), highlight)}
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
