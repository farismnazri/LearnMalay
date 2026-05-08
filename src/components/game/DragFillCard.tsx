"use client";

import { useEffect, useState } from "react";
import type { DragEvent } from "react";
import type { DragFillPage, TextOrBlank, Translated, UiLang } from "@/lib/chapters";

type DragFillCardProps = {
  page: DragFillPage;
  lang: UiLang;
};

export default function DragFillCard({ page, lang }: DragFillCardProps) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  useEffect(() => {
    setPlaced({});
    setChecked(false);
    setSelectedOptionId(null);
  }, [page.id]);

  const L = {
    q: lang === "ms" ? "SOALAN" : lang === "en" ? "QUESTION" : "PREGUNTA",
    a: lang === "ms" ? "JAWAPAN" : lang === "en" ? "ANSWER" : "RESPUESTA",
  };

  const titleTrans = lang === "ms" ? "" : lang === "en" ? page.title.en : page.title.es;
  const instTrans = lang === "ms" ? "" : lang === "en" ? page.instructions.en : page.instructions.es;

  function tr(t: Translated) {
    return lang === "ms" ? t.ms : lang === "en" ? t.en : t.es;
  }

  function onDragStart(e: DragEvent, optionId: string) {
    e.dataTransfer.setData("text/plain", optionId);
  }

  function allowDrop(e: DragEvent) {
    e.preventDefault();
  }

  function onDrop(e: DragEvent, blankId: string) {
    e.preventDefault();
    const optionId = e.dataTransfer.getData("text/plain");
    if (!optionId) return;
    placeOption(blankId, optionId);
  }

  function placeOption(blankId: string, optionId: string) {
    setPlaced((prev) => ({ ...prev, [blankId]: optionId }));
    setSelectedOptionId(null);
  }

  function onTapBlank(blankId: string) {
    if (selectedOptionId) {
      placeOption(blankId, selectedOptionId);
      return;
    }
    clearBlank(blankId);
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

  function renderTextOrBlank(x: TextOrBlank, blankId: string) {
    if (x.kind === "text") {
      return (
        <div className="whitespace-pre-line text-sm font-extrabold">
          {x.text.ms}
          {lang !== "ms" && <div className="mt-1 text-xs font-semibold opacity-70">{tr(x.text)}</div>}
        </div>
      );
    }

    const chosenId = placed[blankId];
    const chosen = page.options.find((o) => o.id === chosenId);
    const ok = checked ? isCorrect(blankId, x.correctOptionId) : null;

    return (
      <div className="whitespace-pre-line text-sm font-extrabold">
        <span>{x.before.ms}</span>

        <button
          type="button"
          onDragOver={allowDrop}
          onDrop={(e) => onDrop(e, blankId)}
          onClick={() => onTapBlank(blankId)}
          className={[
            "touch-target mx-1 my-1 inline-flex min-w-[120px] cursor-pointer items-center justify-center rounded-xl border-2 px-3 py-2 align-middle phone-lg:min-w-[140px] sm:min-w-[160px]",
            chosen ? "bg-amber-100" : "bg-white",
            selectedOptionId ? "ring-2 ring-amber-300/80" : "",
            ok === null ? "border-black/20" : ok ? "border-emerald-500" : "border-red-500",
          ].join(" ")}
          title={
            selectedOptionId
              ? lang === "ms"
                ? "Letak pilihan pada tempat ini"
                : lang === "en"
                ? "Place selected option here"
                : "Colocar la opción seleccionada aquí"
              : lang === "ms"
              ? "Ketik untuk kosongkan"
              : lang === "en"
              ? "Tap to clear"
              : "Pulsa para borrar"
          }
        >
          {chosen ? chosen.ms : "—"}
        </button>

        <span>{x.after.ms}</span>

        {lang !== "ms" && (
          <div className="mt-2 text-xs font-semibold opacity-70">
            {tr(x.before)}
            <span className="mx-2 inline-block min-w-[120px] rounded-lg bg-black/5 px-2 py-1 text-center phone-lg:min-w-[140px] sm:min-w-[160px]">
              {chosen ? tr(chosen) : "—"}
            </span>
            {tr(x.after)}
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="rounded-3xl bg-white/90 p-4 shadow-xl phone-lg:p-5 sm:p-6">
      <div className="text-xl font-extrabold phone-lg:text-2xl">{page.title.ms}</div>
      {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{titleTrans}</div>}

      <div className="mt-3 text-sm font-semibold opacity-70">
        {page.instructions.ms}
        {lang !== "ms" && <div className="mt-1 text-xs font-semibold opacity-70">{instTrans}</div>}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {page.options.map((o) => (
          <button
            type="button"
            key={o.id}
            draggable
            onDragStart={(e) => onDragStart(e, o.id)}
            onClick={() => setSelectedOptionId((prev) => (prev === o.id ? null : o.id))}
            className={[
              "touch-target cursor-grab rounded-2xl bg-white px-4 py-2 text-sm font-black shadow active:cursor-grabbing",
              selectedOptionId === o.id ? "ring-2 ring-amber-400" : "",
            ].join(" ")}
            title={
              lang === "ms"
                ? "Seret atau ketik untuk pilih"
                : lang === "en"
                ? "Drag or tap to select"
                : "Arrastra o toca para seleccionar"
            }
          >
            <div>{o.ms}</div>
            {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{tr(o)}</div>}
          </button>
        ))}
      </div>

      {selectedOptionId && (
        <div className="mt-3 rounded-xl bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-900">
          {lang === "ms"
            ? "Pilihan dipilih. Ketik kotak kosong untuk letak perkataan."
            : lang === "en"
            ? "Option selected. Tap a blank slot to place it."
            : "Opción seleccionada. Pulsa un espacio en blanco para colocarla."}
        </div>
      )}

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
        <button onClick={() => setChecked(true)} className="touch-target rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white shadow">
          Check Answers
        </button>
        <button
          onClick={() => {
            setPlaced({});
            setChecked(false);
            setSelectedOptionId(null);
          }}
          className="touch-target rounded-xl bg-white px-4 py-2 text-sm font-bold shadow"
        >
          Reset
        </button>
      </div>
    </section>
  );
}
