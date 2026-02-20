"use client";

import { useMemo, useRef, useState } from "react";
import type { CrosswordClue, CrosswordPage, Translated, UiLang } from "@/lib/chapters/types";

type GridCell = {
  r: number;
  c: number;
  solution: string;
  clueIds: string[];
  n?: number;
  given: boolean;
};

function tr(lang: UiLang, t: Translated) {
  return lang === "ms" ? t.ms : lang === "en" ? t.en : t.es;
}

function normAnswer(input: string) {
  return input.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function keyOf(r: number, c: number) {
  return `${r}:${c}`;
}

export default function CrosswordCard({
  page,
  lang,
}: {
  page: CrosswordPage;
  lang: UiLang;
}) {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const built = useMemo(() => {
    const clues = ((page.clues ?? []) as CrosswordClue[]).map((clue) => ({
      ...clue,
      answerNorm: normAnswer(clue.answer),
      revealedSet: new Set((clue.revealed ?? []).filter((idx) => Number.isInteger(idx) && idx >= 0)),
    }));

    const cells = new Map<string, GridCell>();
    const conflicts: string[] = [];
    let maxR = 0;
    let maxC = 0;

    for (const clue of clues) {
      for (let i = 0; i < clue.answerNorm.length; i++) {
        const ch = clue.answerNorm[i];
        const r = clue.row + (clue.dir === "down" ? i : 0);
        const c = clue.col + (clue.dir === "across" ? i : 0);
        const k = keyOf(r, c);
        const given = clue.revealedSet.has(i);
        maxR = Math.max(maxR, r);
        maxC = Math.max(maxC, c);

        const existing = cells.get(k);
        if (!existing) {
          cells.set(k, {
            r,
            c,
            solution: ch,
            clueIds: [clue.id],
            n: i === 0 ? clue.n : undefined,
            given,
          });
          continue;
        }

        if (existing.solution !== ch) {
          conflicts.push(
            `Conflict at (${r}, ${c}) between "${existing.solution}" and "${ch}" from clue ${clue.id}.`
          );
        }

        if (!existing.n && i === 0) existing.n = clue.n;
        existing.given = existing.given || given;
        if (!existing.clueIds.includes(clue.id)) existing.clueIds.push(clue.id);
      }
    }

    const rows = Math.max(page.rows ?? maxR + 1, maxR + 1);
    const cols = Math.max(page.cols ?? maxC + 1, maxC + 1);

    const across = clues
      .filter((c) => c.dir === "across")
      .sort((a, b) => a.n - b.n)
      .map((c) => ({
        id: c.id,
        n: c.n,
        clue: c.clue,
        answerNorm: c.answerNorm,
      }));

    const down = clues
      .filter((c) => c.dir === "down")
      .sort((a, b) => a.n - b.n)
      .map((c) => ({
        id: c.id,
        n: c.n,
        clue: c.clue,
        answerNorm: c.answerNorm,
      }));

    return { cells, rows, cols, across, down, conflicts };
  }, [page]);

  const { cells, rows, cols, across, down, conflicts } = built;

  const initialValues = useMemo(() => {
    const initial: Record<string, string> = {};
    cells.forEach((cell, key) => {
      if (cell.given) initial[key] = cell.solution;
    });
    return initial;
  }, [cells]);

  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [checked, setChecked] = useState(false);

  const stats = useMemo(() => {
    let totalEditable = 0;
    let filled = 0;
    let wrong = 0;

    cells.forEach((cell, key) => {
      if (cell.given) return;
      totalEditable += 1;
      const v = values[key] ?? "";
      if (v) filled += 1;
      if (v && v !== cell.solution) wrong += 1;
    });

    const solved = totalEditable > 0 && filled === totalEditable && wrong === 0;
    return { totalEditable, filled, wrong, solved };
  }, [cells, values]);

  function focusCell(r: number, c: number) {
    const ref = inputRefs.current[keyOf(r, c)];
    if (ref) ref.focus();
  }

  function focusNextEditable(r: number, c: number, dr: number, dc: number) {
    let rr = r + dr;
    let cc = c + dc;
    while (rr >= 0 && rr < rows && cc >= 0 && cc < cols) {
      const cell = cells.get(keyOf(rr, cc));
      if (cell && !cell.given) {
        focusCell(rr, cc);
        return;
      }
      rr += dr;
      cc += dc;
    }
  }

  function setInputValue(r: number, c: number, raw: string) {
    const k = keyOf(r, c);
    const cell = cells.get(k);
    if (!cell || cell.given) return;
    const next = normAnswer(raw).slice(0, 1);
    setValues((prev) => ({ ...prev, [k]: next }));
    if (next) focusNextEditable(r, c, 0, 1);
  }

  function resetBoard() {
    setValues(initialValues);
    setChecked(false);
  }

  function revealBoard() {
    const all: Record<string, string> = {};
    cells.forEach((cell, key) => {
      all[key] = cell.solution;
    });
    setValues(all);
    setChecked(false);
  }

  const titleTrans = lang === "ms" ? "" : lang === "en" ? page.title.en : page.title.es;
  const instTrans = lang === "ms" ? "" : lang === "en" ? page.instructions.en : page.instructions.es;

  return (
    <section className="rounded-3xl bg-white/90 p-4 shadow-xl phone-lg:p-5 sm:p-6">
      <div className="text-xl font-extrabold phone-lg:text-2xl">{page.title.ms}</div>
      {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{titleTrans}</div>}

      <div className="mt-3 text-sm font-semibold opacity-70">
        {page.instructions.ms}
        {lang !== "ms" && <div className="mt-1 text-xs font-semibold opacity-70">{instTrans}</div>}
      </div>

      {conflicts.length > 0 && (
        <div className="mt-3 rounded-xl bg-rose-100 px-3 py-2 text-xs font-semibold text-rose-700">
          Crossword config has overlapping letters that do not match. Check clue answers/positions.
        </div>
      )}

      <div className="mt-6 grid gap-4 phone-lg:gap-6 xl:grid-cols-[1fr_360px]">
        <div className="rounded-2xl bg-white/70 p-3 shadow phone-lg:p-4">
          <div className="overflow-x-auto">
            <div
              className="inline-grid gap-0.5 rounded-xl bg-black/15 p-2"
              style={{ gridTemplateColumns: `repeat(${cols}, minmax(2.75rem, 2.75rem))` }}
            >
              {Array.from({ length: rows }).map((_, r) =>
                Array.from({ length: cols }).map((_, c) => {
                  const k = keyOf(r, c);
                  const cell = cells.get(k);
                  if (!cell) return <div key={k} className="h-11 w-11" />;

                  const value = values[k] ?? "";
                  const wrong = checked && value && value !== cell.solution;
                  const solved = checked && value === cell.solution;

                  if (cell.given) {
                    return (
                      <div
                        key={k}
                        className="relative flex h-11 w-11 items-center justify-center border border-black/60 bg-amber-100 text-base font-black uppercase phone-lg:text-lg"
                      >
                        {cell.n !== undefined && (
                          <span className="absolute left-1 top-0.5 text-[10px] font-black leading-none">
                            {cell.n}
                          </span>
                        )}
                        {cell.solution}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={k}
                      className={[
                        "relative h-11 w-11 border border-black/60 bg-white",
                        wrong ? "bg-rose-100" : solved ? "bg-emerald-100" : "",
                      ].join(" ")}
                    >
                      {cell.n !== undefined && (
                        <span className="pointer-events-none absolute left-1 top-0.5 text-[10px] font-black leading-none">
                          {cell.n}
                        </span>
                      )}
                      <input
                        ref={(el) => {
                          inputRefs.current[k] = el;
                        }}
                        type="text"
                        inputMode="text"
                        autoComplete="off"
                        maxLength={1}
                        value={value}
                        onChange={(e) => setInputValue(r, c, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !value) {
                            focusNextEditable(r, c, 0, -1);
                            return;
                          }
                          if (e.key === "ArrowRight") {
                            e.preventDefault();
                            focusNextEditable(r, c, 0, 1);
                          } else if (e.key === "ArrowLeft") {
                            e.preventDefault();
                            focusNextEditable(r, c, 0, -1);
                          } else if (e.key === "ArrowDown") {
                            e.preventDefault();
                            focusNextEditable(r, c, 1, 0);
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            focusNextEditable(r, c, -1, 0);
                          }
                        }}
                        className="h-full w-full bg-transparent text-center text-base font-black uppercase outline-none phone-lg:text-lg"
                        aria-label={`Crossword cell row ${r + 1} col ${c + 1}`}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setChecked(true)}
              className="touch-target rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white shadow"
            >
              {lang === "ms" ? "Semak jawapan" : lang === "en" ? "Check answers" : "Comprobar respuestas"}
            </button>
            <button
              type="button"
              onClick={resetBoard}
              className="touch-target rounded-xl bg-white px-4 py-2 text-sm font-bold shadow"
            >
              {lang === "ms" ? "Reset" : lang === "en" ? "Reset" : "Reiniciar"}
            </button>
            <button
              type="button"
              onClick={revealBoard}
              className="touch-target rounded-xl bg-amber-300 px-4 py-2 text-sm font-black shadow"
            >
              {lang === "ms" ? "Tunjuk jawapan" : lang === "en" ? "Show answers" : "Mostrar respuestas"}
            </button>
          </div>

          <div className="mt-3 text-xs font-semibold opacity-70">
            {lang === "ms"
              ? `Diisi: ${stats.filled}/${stats.totalEditable}`
              : lang === "en"
              ? `Filled: ${stats.filled}/${stats.totalEditable}`
              : `Llenado: ${stats.filled}/${stats.totalEditable}`}
          </div>

          {checked && stats.wrong > 0 && (
            <div className="mt-2 text-xs font-semibold text-rose-700">
              {lang === "ms"
                ? `Masih ada ${stats.wrong} huruf yang salah.`
                : lang === "en"
                ? `${stats.wrong} letters are still incorrect.`
                : `Aun hay ${stats.wrong} letras incorrectas.`}
            </div>
          )}

          {stats.solved && (
            <div className="mt-2 text-sm font-black text-emerald-700">
              {lang === "ms"
                ? "Bagus! Silang kata selesai."
                : lang === "en"
                ? "Great! Crossword completed."
                : "Bien hecho. Crucigrama completado."}
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white/70 p-3 shadow phone-lg:p-4">
          <div className="text-xs font-black opacity-60">
            {lang === "ms" ? "PETUNJUK" : lang === "en" ? "CLUES" : "PISTAS"}
          </div>

          <div className="mt-3 text-sm font-black">{lang === "ms" ? "Melintang" : lang === "en" ? "Across" : "Horizontal"}</div>
          <div className="mt-2 space-y-2">
            {across.map((clue) => (
              <div key={clue.id} className="rounded-xl bg-white px-3 py-2 text-sm font-semibold shadow-sm">
                <div>{clue.n}. {clue.clue.ms}</div>
                {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{tr(lang, clue.clue)}</div>}
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm font-black">{lang === "ms" ? "Menegak" : lang === "en" ? "Down" : "Vertical"}</div>
          <div className="mt-2 space-y-2">
            {down.map((clue) => (
              <div key={clue.id} className="rounded-xl bg-white px-3 py-2 text-sm font-semibold shadow-sm">
                <div>{clue.n}. {clue.clue.ms}</div>
                {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{tr(lang, clue.clue)}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
