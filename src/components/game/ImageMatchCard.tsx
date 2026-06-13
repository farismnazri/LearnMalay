"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ImageMatchPage, Translated, UiLang } from "@/lib/chapters";

function tr(text: Translated, lang: UiLang) {
  return lang === "en" ? text.en : lang === "es" ? text.es : text.ms;
}

export default function ImageMatchCard({ page, lang }: { page: ImageMatchPage; lang: UiLang }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const options = useMemo(() => [...page.items].reverse(), [page.items]);
  const correctCount = page.items.filter((item) => answers[item.id] === item.id).length;
  const complete = correctCount === page.items.length;

  return (
    <section className="rounded-3xl border-4 border-[#2b160a] bg-[#ffe48a] p-4 shadow-[0_10px_0_rgba(0,0,0,0.35)] sm:p-5">
      <h2 className="text-2xl font-black text-[#2b160a]">{page.title.ms}</h2>
      {lang !== "ms" && <p className="text-sm font-bold text-[#2b160a]/70">{tr(page.title, lang)}</p>}
      <p className="mt-2 text-sm font-extrabold text-[#2b160a]/80">{tr(page.instructions, lang)}</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {page.items.map((item) => {
          const isCorrect = answers[item.id] === item.id;
          const isWrong = checked && answers[item.id] && !isCorrect;
          return (
            <article
              key={item.id}
              className={[
                "overflow-hidden rounded-2xl border-[3px] bg-[#fff8df] p-3 shadow-[0_5px_0_rgba(0,0,0,0.22)]",
                checked && isCorrect ? "border-emerald-700" : isWrong ? "border-red-700" : "border-[#2b160a]",
              ].join(" ")}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white">
                <Image src={item.imageSrc} alt={tr(item.imageAlt, lang)} fill className="object-cover" />
              </div>
              <select
                aria-label={tr(item.imageAlt, lang)}
                value={answers[item.id] ?? ""}
                onChange={(event) => {
                  setAnswers((current) => ({ ...current, [item.id]: event.target.value }));
                  setChecked(false);
                }}
                className="mt-3 min-h-11 w-full rounded-xl border-2 border-[#2b160a] bg-white px-3 py-2 text-sm font-black text-[#2b160a]"
              >
                <option value="">{lang === "ms" ? "Pilih perkataan" : lang === "en" ? "Choose a word" : "Elige una palabra"}</option>
                {options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.answer.ms}{lang === "ms" ? "" : ` — ${tr(option.answer, lang)}`}
                  </option>
                ))}
              </select>
            </article>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setChecked(true)}
          className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-black text-white shadow"
        >
          {lang === "ms" ? "Semak" : lang === "en" ? "Check" : "Comprobar"}
        </button>
        {checked && (
          <p className={`text-sm font-black ${complete ? "text-emerald-800" : "text-red-800"}`}>
            {complete
              ? lang === "ms"
                ? "Betul! Semua gambar dipadankan."
                : lang === "en"
                ? "Correct! All images are matched."
                : "¡Correcto! Todas las imágenes están emparejadas."
              : `${correctCount} / ${page.items.length}`}
          </p>
        )}
      </div>
    </section>
  );
}
