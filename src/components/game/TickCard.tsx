"use client";

import { useMemo, useState } from "react";
import AkuAkuPopup from "@/components/game/AkuAkuPopup";
import type { ChapterPage, UiLang } from "@/lib/chapters";

type TickPage = Extract<ChapterPage, { kind: "tick" }>;

export default function TickCard({
  page,
  lang,
}: {
  page: TickPage;
  lang: UiLang;
}) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  // Aku-Aku "Why" popup state
  const [whyOpen, setWhyOpen] = useState(false);
  const [whyDialogs, setWhyDialogs] = useState<any[]>([]);

  const L = useMemo(
    () => ({
      pick: lang === "ms" ? "TANDAKAN" : lang === "en" ? "TICK" : "MARCA",
      submit: lang === "ms" ? "HANTAR" : lang === "en" ? "SUBMIT" : "ENVIAR",
      why: lang === "ms" ? "Kenapa?" : lang === "en" ? "Why?" : "¿Por qué?",
      correct: lang === "ms" ? "BETUL" : lang === "en" ? "CORRECT" : "CORRECTO",
      wrong: lang === "ms" ? "SALAH" : lang === "en" ? "WRONG" : "INCORRECTO",
    }),
    [lang]
  );

  function t(x: { ms: string; en: string; es: string }) {
    if (lang === "ms") return { main: x.ms, sub: "" };
    return { main: x.ms, sub: lang === "en" ? x.en : x.es };
  }

  function toggle(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function reset() {
  setSelected({});
  setSubmitted(false);
  setWhyOpen(false);
  setWhyDialogs([]);
}

  return (
    <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
      {/* Aku-Aku Why popup */}
      <AkuAkuPopup
        open={whyOpen}
        onClose={() => setWhyOpen(false)}
        dialogs={whyDialogs}
        title="Aku-Aku"
      />

      <div className="text-2xl font-extrabold">{page.title.ms}</div>
      {lang !== "ms" && (
        <div className="text-sm font-semibold opacity-70">
          {lang === "en" ? page.title.en : page.title.es}
        </div>
      )}

      <div className="mt-3 rounded-2xl bg-black/5 p-4">
        <div className="text-sm font-extrabold">{page.instructions.ms}</div>
        {lang !== "ms" && (
          <div className="text-xs font-semibold opacity-70">
            {lang === "en" ? page.instructions.en : page.instructions.es}
          </div>
        )}
      </div>

      <div className="mt-5 space-y-3">
        {page.items.map((it) => {
          const v = Boolean(selected[it.id]); // user ticked?
          const isRight = v === it.correct;

          const { main, sub } = t(it.text);

          return (
            <div key={it.id} className="rounded-2xl bg-white p-4 shadow">
              <div className="flex items-start justify-between gap-3">
                <div className="pr-3">
                  <div className="text-base font-extrabold">{main}</div>
                  {lang !== "ms" && (
                    <div className="text-xs font-semibold opacity-70">{sub}</div>
                  )}
                </div>

                <button
                  onClick={() => toggle(it.id)}
                  className={[
                    "shrink-0 rounded-xl px-4 py-2 text-xs font-black shadow transition active:scale-[0.98]",
                    v ? "bg-emerald-600 text-white" : "bg-white",
                  ].join(" ")}
                  title={L.pick}
                >
                  {v ? "✓" : "○"}
                </button>
              </div>

              {submitted && (
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div
                    className={[
                      "rounded-full px-3 py-1 text-xs font-black",
                      isRight ? "bg-emerald-100 text-emerald-900" : "bg-red-100 text-red-900",
                    ].join(" ")}
                  >
                    {isRight ? L.correct : L.wrong}
                  </div>

                  {!isRight && (
                    <button
                      onClick={() => {
                        setWhyDialogs([
                          {
                            id: `why-${it.id}`,
                            ms: it.why.ms,
                            en: it.why.en,
                            es: it.why.es,
                          },
                        ]);
                        setWhyOpen(true);
                      }}
                      className="rounded-xl bg-white px-3 py-2 text-xs font-black shadow"
                    >
                      {L.why}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

        <div className="mt-6 flex items-center justify-end gap-2">
        <button
            onClick={reset}
            className="rounded-xl bg-white px-4 py-2 text-sm font-black shadow transition active:scale-[0.98]"
        >
            {lang === "ms" ? "RESET" : lang === "en" ? "RESET" : "REINICIAR"}
        </button>

        <button
            onClick={() => setSubmitted(true)}
            className="rounded-xl bg-amber-300 px-4 py-2 text-sm font-black shadow transition active:scale-[0.98]"
        >
            {L.submit}
        </button>
        </div>
    </section>
  );
}