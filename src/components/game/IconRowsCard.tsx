"use client";

import Image from "next/image";
import type { ChapterIconRowsPage, Translated, UiLang } from "@/lib/chapters";

function tr(text: Translated, lang: UiLang) {
  return lang === "en" ? text.en : lang === "es" ? text.es : text.ms;
}

export default function IconRowsCard({ page, lang }: { page: ChapterIconRowsPage; lang: UiLang }) {
  if (page.id === "c4-p1-masa") {
    const definition = page.rows[0];
    const units = page.rows.slice(1, 3);
    const week = page.rows[3];
    const days = page.rows.slice(4);

    return (
      <div className="grid gap-5">
        <section className="overflow-hidden rounded-[2rem] border-4 border-[#e7d4a7] bg-[#fffdf7]/95 p-4 shadow-[0_10px_0_rgba(0,0,0,0.25)] sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr_1fr] lg:divide-x-2 lg:divide-dashed lg:divide-amber-300/60">
            <article className="grid content-center justify-items-center gap-4 rounded-2xl bg-[#fff8e8] p-5 text-center">
              <h2 className="text-4xl font-black tracking-wide text-[#174b79]">MASA</h2>
              <div className="rounded-3xl bg-[#fff0c9] px-5 py-3 text-base font-black text-[#2b160a] shadow">
                {definition.description.ms}
              </div>
              {lang !== "ms" && <p className="text-sm font-bold text-[#2b160a]/65">{tr(definition.description, lang)}</p>}
            </article>

            {units.map((row, index) => (
              <article key={row.id} className="grid content-center justify-items-center gap-2 p-4 text-center">
                <Image src={row.iconSrc} alt={tr(row.iconAlt, lang)} width={112} height={112} className="h-24 w-24 object-contain" />
                <h3 className={`text-2xl font-black ${index === 0 ? "text-[#7046a8]" : "text-[#0878b9]"}`}>{row.name.ms.split("=")[0].trim()}</h3>
                <p className="text-xl font-black text-[#2b160a]">= {row.name.ms.split("=")[1]?.trim()}</p>
                {lang !== "ms" && <p className="text-xs font-bold text-[#2b160a]/65">{tr(row.name, lang)}</p>}
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border-4 border-[#d8d8c7] bg-[#fffdf7]/95 p-4 shadow-[0_10px_0_rgba(0,0,0,0.25)] sm:p-6">
          <div className="grid items-center gap-4 sm:grid-cols-[7rem_minmax(0,1fr)]">
            <div className="grid place-items-center rounded-2xl bg-[#fff0c9] p-3">
              <Image src={week.iconSrc} alt={tr(week.iconAlt, lang)} width={112} height={112} className="h-24 w-24 object-contain" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-[#21653d]">{week.name.ms}</h3>
              {lang !== "ms" && <p className="mt-1 text-sm font-bold text-[#21653d]/70">{tr(week.name, lang)}</p>}
              <p className="mt-2 text-sm font-extrabold text-[#2b160a]/75">{tr(week.description, lang)}</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 phone-lg:grid-cols-4 lg:grid-cols-7">
            {days.map((day) => {
              const isWeekend = day.id === "c4-day-sabtu" || day.id === "c4-day-ahad";
              return (
                <article
                  key={day.id}
                  className={[
                    "rounded-2xl border-2 px-2 py-3 text-center shadow-sm",
                    isWeekend
                      ? "border-emerald-300 bg-emerald-100 text-emerald-900"
                      : "border-black/10 bg-white text-[#2b160a]",
                  ].join(" ")}
                >
                  <div className="text-sm font-black">{day.name.ms}</div>
                  {lang !== "ms" && <div className="mt-0.5 text-[10px] font-bold opacity-65">{tr(day.name, lang)}</div>}
                </article>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

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
