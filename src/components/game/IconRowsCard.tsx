"use client";

import Image from "next/image";
import type { ChapterIconRowsPage, Translated, UiLang } from "@/lib/chapters";

function tr(text: Translated, lang: UiLang) {
  return lang === "en" ? text.en : lang === "es" ? text.es : text.ms;
}

export default function IconRowsCard({ page, lang }: { page: ChapterIconRowsPage; lang: UiLang }) {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border-4 border-[#2b160a] bg-[#ffe48a] p-3 shadow-[0_10px_0_rgba(0,0,0,0.35)] phone-lg:p-4 sm:p-5">
      <div className="rounded-2xl border-[3px] border-[#2b160a] bg-[#ffcf55] px-4 py-3 shadow-[inset_0_-6px_0_rgba(0,0,0,0.1),0_4px_0_rgba(0,0,0,0.2)]">
        <h2 className="text-xl font-black leading-tight text-[#2b160a] phone-lg:text-2xl">{page.title.ms}</h2>
        {lang !== "ms" && <p className="mt-1 text-sm font-extrabold text-[#2b160a]/70">{tr(page.title, lang)}</p>}
      </div>

      <div className="mt-4 grid gap-3">
        {page.rows.map((row) => (
          <article
            key={row.id}
            className="grid grid-cols-[4.75rem_minmax(0,1fr)] items-center gap-3 rounded-2xl border-[3px] border-[#2b160a] bg-[#fff8df] p-3 shadow-[inset_0_0_0_3px_rgba(255,255,255,0.45),0_5px_0_rgba(0,0,0,0.22)] phone-lg:grid-cols-[5.5rem_minmax(0,1fr)] phone-lg:gap-4 phone-lg:p-4"
          >
            <div className="grid aspect-square place-items-center rounded-2xl border-[3px] border-[#2b160a] bg-white/90 p-1.5 shadow-[inset_0_-5px_0_rgba(0,0,0,0.06),0_3px_0_rgba(0,0,0,0.18)]">
              <Image
                src={row.iconSrc}
                alt={tr(row.iconAlt, lang)}
                width={88}
                height={88}
                className="h-full w-full object-contain"
                draggable={false}
              />
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-black leading-tight text-[#25140c] phone-lg:text-lg">{row.name.ms}</h3>
              {lang !== "ms" && <p className="mt-0.5 text-xs font-extrabold leading-snug text-[#25140c]/65">{tr(row.name, lang)}</p>}

              <p className="mt-1.5 text-sm font-extrabold leading-snug text-[#25140c]/85 phone-lg:text-base">{row.description.ms}</p>
              {lang !== "ms" && <p className="mt-0.5 text-xs font-semibold leading-snug text-[#25140c]/65">{tr(row.description, lang)}</p>}

              {row.example && (
                <div className="mt-2 rounded-lg border-2 border-[#2b160a]/20 bg-[#ffefae] px-2.5 py-1.5 text-xs font-black leading-snug text-[#25140c]/75">
                  <p>{row.example.ms}</p>
                  {lang !== "ms" && <p className="mt-0.5 font-semibold opacity-75">{tr(row.example, lang)}</p>}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
