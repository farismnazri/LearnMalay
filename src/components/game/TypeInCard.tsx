"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Translated, TypeInPage, UiLang } from "@/lib/chapters";

type TypeInCardProps = {
  page: TypeInPage;
  lang: UiLang;
};

export default function TypeInCard({ page, lang }: TypeInCardProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const AKU_SRC = "/assets/characters/popup-trio.webp";

  useEffect(() => {
    setAnswers({});
    setChecked(false);
    setRevealed({});
  }, [page.id]);

  const titleTrans = lang === "ms" ? "" : lang === "en" ? page.title.en : page.title.es;
  const instTrans = lang === "ms" ? "" : lang === "en" ? page.instructions.en : page.instructions.es;

  function tr(t: Translated) {
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
        {page.items.map((it) => {
          const ok = checked ? isCorrect(it.id, it.answer) : null;
          const showReveal = !!revealed[it.id];

          return (
            <div key={it.id} className="rounded-2xl bg-black/5 p-4">
              <div className="mb-2 text-xs font-black opacity-60">#{it.n}</div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {it.images ? (
                  <div className="flex w-full flex-wrap gap-2 sm:w-72">
                    {it.images.map((img, idx) => (
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
                          <Image src={AKU_SRC} alt="Learn Malay hint" width={55} height={44} className="h-11 w-11 object-contain" />
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
