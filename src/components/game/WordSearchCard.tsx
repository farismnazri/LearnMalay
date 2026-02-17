"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { UiLang, WordSearchPage, WordSearchTarget, Translated } from "@/lib/chapters/types";

type Cell = { r: number; c: number };

function tr(lang: UiLang, t: Translated) {
  return lang === "ms" ? t.ms : lang === "en" ? t.en : t.es;
}

function normWord(s: string) {
  return s
    .trim()
    .toUpperCase()
    .replace(/[\s\-_–—/]+/g, ""); // remove spaces, hyphens, slashes etc.
}

function sign(n: number) {
  return n === 0 ? 0 : n > 0 ? 1 : -1;
}

function isStraightLine(a: Cell, b: Cell, allowDiagonal: boolean) {
  const dr = b.r - a.r;
  const dc = b.c - a.c;

  // horizontal
  if (dr === 0 && dc !== 0) return true;
  // vertical
  if (dc === 0 && dr !== 0) return true;

  // diagonal
  if (allowDiagonal && Math.abs(dr) === Math.abs(dc) && dr !== 0) return true;

  return false;
}

function pathCells(a: Cell, b: Cell) {
  const dr = sign(b.r - a.r);
  const dc = sign(b.c - a.c);

  const cells: Cell[] = [];
  let r = a.r;
  let c = a.c;
  cells.push({ r, c });

  while (r !== b.r || c !== b.c) {
    r += dr;
    c += dc;
    cells.push({ r, c });
  }

  return cells;
}

function keyOf(cell: Cell) {
  return `${cell.r}:${cell.c}`;
}

export default function WordSearchCard({
  page,
  lang,
  onProgress,
  onComplete,
  onWrong,
  showAllTrigger,
}: {
  page: any; // keep flexible so ChapterPage union issues don’t explode
  lang: UiLang;
  onProgress?: (foundCount: number, total: number) => void;
  onComplete?: (foundCount: number, total: number) => void;
  onWrong?: () => void;
  showAllTrigger?: number; // when this value changes, reveal all answers
}) {
  const allowDiagonal = page.allowDiagonal ?? true;
  const allowReverse = page.allowReverse ?? true;
  const alphabet = (page.alphabet ?? "ABCDEFGHIJKLMNOPQRSTUVWXYZ").toUpperCase();

  // Generate or parse grid
  const { grid, placements } = useMemo(() => {
    const g = page.grid;
    const size = Math.max(6, Math.min(18, page.size ?? 12));

    function parseGrid(input: any): string[][] {
      if (Array.isArray(input) && Array.isArray(input[0])) {
        return (input as any[]).map((row) => row.map((ch: string) => String(ch).toUpperCase()));
      }
      if (Array.isArray(input) && typeof input[0] === "string") {
        return (input as string[]).map((row) => row.split("").map((ch) => ch.toUpperCase()));
      }
      if (typeof input === "string") {
        return input
          .split("\n")
          .map((row: string) => row.trim())
          .filter(Boolean)
          .map((row: string) => row.split("").map((ch) => ch.toUpperCase()));
      }
      return [];
    }

    function tryGenerate(words: string[]): { grid: string[][]; placements: Record<string, Cell[]> } {
      const gridArr = Array.from({ length: size }, () => Array.from({ length: size }, () => ""));
      const placements: Record<string, Cell[]> = {};
      const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];
      if (allowDiagonal) {
        dirs.push(
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1]
        );
      }

      function canPlace(r: number, c: number, dr: number, dc: number, w: string) {
        const endR = r + dr * (w.length - 1);
        const endC = c + dc * (w.length - 1);
        if (endR < 0 || endR >= size || endC < 0 || endC >= size) return false;
        for (let i = 0; i < w.length; i++) {
          const rr = r + dr * i;
          const cc = c + dc * i;
          const existing = gridArr[rr][cc];
          if (existing && existing !== w[i]) return false;
        }
        return true;
      }

      function placeWord(id: string, w: string) {
        const attempts = 200;
        for (let t = 0; t < attempts; t++) {
          const dir = dirs[Math.floor(Math.random() * dirs.length)];
          const dr = dir[0];
          const dc = dir[1];
          const r = Math.floor(Math.random() * size);
          const c = Math.floor(Math.random() * size);
          if (!canPlace(r, c, dr, dc, w)) continue;
          for (let i = 0; i < w.length; i++) {
            const rr = r + dr * i;
            const cc = c + dc * i;
            gridArr[rr][cc] = w[i];
          }
          return true;
        }
        return false;
      }

      words.forEach((w, idx) => {
        const word = allowReverse && Math.random() < 0.5 ? w.split("").reverse().join("") : w;
        const ok = placeWord(`w${idx}`, word);
        if (ok) {
          // placement already recorded by placeWord
        }
      });

      // fill blanks
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (!gridArr[r][c]) {
            gridArr[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
          }
        }
      }

      return { grid: gridArr, placements };
    }

    // If grid provided, parse; else auto-generate
    const parsed = parseGrid(g);
    if (parsed.length > 0 && parsed[0].length > 0) return { grid: parsed, placements: {} };

    const words = (page.targets ?? [])
      .flatMap((t: any) => ("words" in t ? t.words : [t.word]))
      .map((w: string) => w.toUpperCase().replace(/\s+/g, ""))
      .filter((w: string) => w.length <= size);
    return tryGenerate(words);
  }, [page.grid, page.size, page.targets, allowDiagonal, allowReverse, alphabet]);

  const targets = useMemo(() => {
    const raw: WordSearchTarget[] = (page.targets ?? []) as WordSearchTarget[];

    return raw.map((t) => {
      const words = "words" in t ? t.words : [t.word];
      const label = (t as any).label as Translated | undefined;
      const meaning = (t as any).meaning as Translated | undefined;

      // display: prefer label, else show the first word
      const displayMs = label?.ms ?? words[0] ?? "";
      const displayEn = label?.en ?? words[0] ?? "";
      const displayEs = label?.es ?? words[0] ?? "";

      return {
        id: t.id,
        words,
        display: { ms: displayMs, en: displayEn, es: displayEs } as Translated,
        meaning,
      };
    });
  }, [page.targets]);

  const [start, setStart] = useState<Cell | null>(null);
  const [found, setFound] = useState<Record<string, Cell[]>>({});
  const [showFoundOverlay, setShowFoundOverlay] = useState(false);
  const [lastShowAll, setLastShowAll] = useState<number | undefined>(undefined);

  // reset state when page changes (e.g., regenerate)
  useEffect(() => {
    setStart(null);
    setFound({});
    setShowFoundOverlay(false);
    setLastShowAll(undefined);
  }, [page.id, page.grid, page.targets]);

  const locked = useMemo(() => {
    const s = new Set<string>();
    Object.values(found).forEach((cells) => cells.forEach((c) => s.add(keyOf(c))));
    return s;
  }, [found]);

  function pulseFound() {
    setShowFoundOverlay(true);
    window.setTimeout(() => setShowFoundOverlay(false), 1000);
  }

  function formedWord(cells: Cell[]) {
    return cells.map((p) => grid[p.r]?.[p.c] ?? "").join("");
  }

  function onPick(cell: Cell) {
    if (!grid.length) return;

    // first click
    if (!start) {
      setStart(cell);
      return;
    }

    // second click
    const a = start;
    const b = cell;

    // same cell: reset
    if (a.r === b.r && a.c === b.c) {
      setStart(null);
      return;
    }

    if (!isStraightLine(a, b, allowDiagonal)) {
      setStart(cell); // treat as new start
      return;
    }

    const cells = pathCells(a, b);
    const w = formedWord(cells);
    const wNorm = normWord(w);
    const wRevNorm = normWord(w.split("").reverse().join(""));

    // try match any target not yet found
    const match = targets.find((t) => {
      if (found[t.id]) return false;
      return t.words.some((cand) => {
        const cNorm = normWord(cand);
        if (cNorm === wNorm) return true;
        if (allowReverse && cNorm === wRevNorm) return true;
        return false;
      });
    });

    if (!match) {
      onWrong?.();
      setStart(null);
      return;
    }

    setFound((prev) => {
      const next = { ...prev, [match.id]: cells };
      const total = targets.length;
      onProgress?.(Object.keys(next).length, total);
      if (Object.keys(next).length === total) {
        onComplete?.(total, total);
      }
      return next;
    });
    setStart(null);
    pulseFound();
  }

  const titleTrans = lang === "ms" ? "" : lang === "en" ? page.title?.en : page.title?.es;
  const instTrans = lang === "ms" ? "" : lang === "en" ? page.instructions?.en : page.instructions?.es;

  // handle show-all trigger
  useEffect(() => {
    if (showAllTrigger === undefined) return;
    if (lastShowAll === showAllTrigger) return;
    setLastShowAll(showAllTrigger);
    setFound(placements);
    onProgress?.(Object.keys(placements).length, targets.length);
    // showing answers should not call onComplete that saves highscores; gate it by a prop
  }, [showAllTrigger, lastShowAll, placements, targets.length, onProgress]);

  // fire initial progress on mount/update
  useEffect(() => {
    onProgress?.(Object.keys(found).length, targets.length);
  }, [found, targets.length, onProgress]);

  return (
    <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
      <div className="text-2xl font-extrabold">{page.title?.ms ?? "Word Search"}</div>
      {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{titleTrans}</div>}

      <div className="mt-3 text-sm font-semibold opacity-70">
        {page.instructions?.ms ?? ""}
        {lang !== "ms" && <div className="mt-1 text-xs font-semibold opacity-70">{instTrans}</div>}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* GRID */}
        <div className="rounded-2xl bg-white/70 p-4 shadow">
          {!grid.length ? (
            <div className="text-sm font-semibold opacity-70">
              No grid found on this page. Add <code className="font-mono">grid</code> to your wordsearch page data.
            </div>
          ) : (
            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${grid[0]?.length ?? 0}, minmax(0, 1fr))`,
              }}
            >
              {grid.map((row, r) =>
                row.map((ch, c) => {
                  const k = `${r}:${c}`;
                  const isStart = start?.r === r && start?.c === c;
                  const isLocked = locked.has(k);

                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => onPick({ r, c })}
                      className={[
                        "aspect-square rounded-lg border text-sm font-black shadow-sm transition",
                        isLocked ? "bg-emerald-200 border-emerald-500" : "bg-white border-black/10 hover:bg-amber-50",
                        isStart ? "ring-2 ring-amber-500" : "",
                      ].join(" ")}
                      title="Click start, then click end"
                    >
                      {ch}
                    </button>
                  );
                })
              )}
            </div>
          )}

          <div className="mt-3 text-xs font-semibold opacity-70">
            {lang === "ms"
              ? "Cara main: Klik huruf mula, kemudian klik huruf akhir (garis lurus)."
              : lang === "en"
              ? "How to play: Click a start letter, then click an end letter (straight line)."
              : "Cómo jugar: Haz clic en una letra inicial y luego en la final (línea recta)."}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setStart(null);
                setFound({});
              }}
              className="rounded-xl bg-white px-4 py-2 text-sm font-bold shadow"
            >
              {lang === "ms" ? "Reset" : lang === "en" ? "Reset" : "Reiniciar"}
            </button>
          </div>
        </div>

        {/* TARGET LIST */}
        <div className="rounded-2xl bg-white/70 p-4 shadow">
          <div className="text-xs font-black opacity-60">
            {lang === "ms"
              ? `CARI ${targets.length} PERKATAAN`
              : lang === "en"
              ? `FIND ${targets.length} WORDS`
              : `ENCUENTRA ${targets.length} PALABRAS`}
          </div>

          <div className="mt-3 space-y-2">
            {targets.map((t) => {
              const done = !!found[t.id];
              return (
                <div
                  key={t.id}
                  className={[
                    "rounded-xl px-3 py-2 text-sm font-extrabold shadow-sm",
                    done ? "bg-emerald-200" : "bg-white",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div>{t.display.ms}</div>
                      {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{tr(lang, t.display)}</div>}
                      {t.meaning && lang !== "ms" && (
                        <div className="mt-1 text-[11px] font-semibold opacity-60">{tr(lang, t.meaning)}</div>
                      )}
                    </div>

                    <div className="text-xs font-black opacity-70">{done ? "✓" : ""}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 text-xs font-semibold opacity-70">
            {Object.keys(found).length} / {targets.length}
          </div>
        </div>
      </div>

      {/* success overlay */}
      {showFoundOverlay && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 animate-pulse">
            <Image
              src="/assets/characters/Akuaku_idle.png"
              alt="Aku Aku"
              width={140}
              height={140}
              className="drop-shadow-xl"
              priority
            />
            <div className="rounded-full bg-emerald-600 px-4 py-1 text-sm font-black text-white shadow-lg">
              {lang === "ms" ? "Jumpa!" : lang === "en" ? "Found!" : "¡Encontrado!"}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
