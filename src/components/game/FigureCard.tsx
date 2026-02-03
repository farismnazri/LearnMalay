// src/components/game/FigureCard.tsx
"use client";

import type { FigurePage, UiLang } from "@/lib/chapters/types";


function t(lang: UiLang, tr: { ms: string; en: string; es: string }) {
  if (lang === "en") return tr.en;
  if (lang === "es") return tr.es;
  return tr.ms;
}

export default function FigureCard({ page, lang }: { page: FigurePage; lang: UiLang }) {
  const title = t(lang, page.title);
  const alt = t(lang, page.alt);
  const caption = page.caption ? t(lang, page.caption) : "";

  const maxW = page.maxWidthPx ? `${page.maxWidthPx}px` : "980px";

  return (
    <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
      <div className="text-xs font-black opacity-60">{lang === "ms" ? "GAMBAR" : lang === "en" ? "FIGURE" : "FIGURA"}</div>
      <div className="mt-2 text-2xl font-extrabold">{title}</div>

      <div className="mt-4">
        <div className="mx-auto w-full" style={{ maxWidth: maxW }}>
          <img
            src={page.imageSrc}
            alt={alt}
            className="w-full rounded-2xl border border-black/10 bg-white object-contain shadow"
            draggable={false}
          />
        </div>

        {caption ? (
          <div className="mx-auto mt-3 text-sm font-semibold opacity-70" style={{ maxWidth: maxW }}>
            {caption}
          </div>
        ) : null}
      </div>
    </section>
  );
}
