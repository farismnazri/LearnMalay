"use client";

import { useEffect, useMemo, useState } from "react";
import AkuAkuFeedbackPopup from "@/components/game/AkuAkuFeedbackPopup";
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

function isWordSeparatorChar(ch: string) {
  return /[\s\-_–—/]/.test(ch);
}

function findWordPathInGrid(grid: string[][], rawWord: string, allowDiagonal: boolean): Cell[] | null {
  const target = normWord(rawWord);
  if (!target) return null;

  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  if (!rows || !cols) return null;

  const dirs: Array<[number, number]> = [
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

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      for (const [dr, dc] of dirs) {
        let idx = 0;
        const cells: Cell[] = [];

        let rr = r;
        let cc = c;
        while (rr >= 0 && rr < rows && cc >= 0 && cc < cols) {
          const ch = String(grid[rr]?.[cc] ?? "").toUpperCase();
          cells.push({ r: rr, c: cc });

          if (isWordSeparatorChar(ch)) {
            // Don't allow reveal paths that start with a separator.
            if (idx === 0) break;
          } else {
            if (ch !== target[idx]) break;
            idx += 1;
            if (idx === target.length) return cells;
          }

          rr += dr;
          cc += dc;
        }
      }
    }
  }

  return null;
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
  const { grid } = useMemo(() => {
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

    function tryGenerate(words: string[]): { grid: string[][] } {
      const gridArr = Array.from({ length: size }, () => Array.from({ length: size }, () => ""));
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
          // Reveal paths are derived from the final grid when needed.
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

      return { grid: gridArr };
    }

    // If grid provided, parse; else auto-generate
    const parsed = parseGrid(g);
    if (parsed.length > 0 && parsed[0].length > 0) return { grid: parsed };

    const words = (page.targets ?? [])
      .flatMap((t: any) => ("words" in t ? t.words : [t.word]))
      .map((w: string) => normWord(w))
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
  const [revealedCellKeys, setRevealedCellKeys] = useState<Set<string>>(() => new Set());
  const [showFoundOverlay, setShowFoundOverlay] = useState(false);
  const [lastShowAll, setLastShowAll] = useState<number | undefined>(() => showAllTrigger);

  const revealSolutions = useMemo(() => {
    const byTarget: Record<string, Cell[]> = {};
    const allCellKeys = new Set<string>();

    for (const t of targets) {
      let firstPath: Cell[] | null = null;

      for (const rawWord of t.words) {
        const path = findWordPathInGrid(grid, rawWord, allowDiagonal);
        if (!path) continue;
        if (!firstPath) firstPath = path;
        path.forEach((cell) => allCellKeys.add(keyOf(cell)));
      }

      if (firstPath) byTarget[t.id] = firstPath;
    }

    return { byTarget, allCellKeys };
  }, [grid, targets, allowDiagonal]);

  // reset state when page changes (e.g., regenerate)
  useEffect(() => {
    setStart(null);
    setFound({});
    setRevealedCellKeys(new Set());
    setShowFoundOverlay(false);
    setLastShowAll(showAllTrigger);
  }, [page.id, page.grid, page.targets, showAllTrigger]);

  const locked = useMemo(() => {
    const s = new Set<string>();
    Object.values(found).forEach((cells) => cells.forEach((c) => s.add(keyOf(c))));
    revealedCellKeys.forEach((k) => s.add(k));
    return s;
  }, [found, revealedCellKeys]);

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
    setStart(null);
    setRevealedCellKeys(new Set(revealSolutions.allCellKeys));
    setFound((prev) => {
      const next = { ...prev, ...revealSolutions.byTarget };
      onProgress?.(Object.keys(next).length, targets.length);
      return next;
    });
    // showing answers should not call onComplete that saves highscores; gate it by a prop
  }, [showAllTrigger, lastShowAll, revealSolutions, targets.length, onProgress]);

  // fire initial progress on mount/update
  useEffect(() => {
    onProgress?.(Object.keys(found).length, targets.length);
  }, [found, targets.length, onProgress]);

  const gridCols = grid[0]?.length ?? 0;
  const cellRem =
    gridCols >= 18 ? 1.85 : gridCols >= 15 ? 2.05 : gridCols >= 12 ? 2.25 : 2.5;
  const cellTextClass = gridCols >= 15 ? "text-xs" : "text-sm";

  return (
    <section className="rounded-3xl bg-white/90 p-4 shadow-xl phone-lg:p-5 sm:p-6">
      <div className="text-xl font-extrabold phone-lg:text-2xl">{page.title?.ms ?? "Word Search"}</div>
      {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{titleTrans}</div>}

      <div className="mt-3 text-sm font-semibold opacity-70">
        {page.instructions?.ms ?? ""}
        {lang !== "ms" && <div className="mt-1 text-xs font-semibold opacity-70">{instTrans}</div>}
      </div>

      <div className="mt-6 grid gap-4 phone-lg:gap-6 lg:grid-cols-[1fr_320px]">
        {/* GRID */}
        <div className="rounded-2xl bg-white/70 p-3 shadow phone-lg:p-4">
          {!grid.length ? (
            <div className="text-sm font-semibold opacity-70">
              No grid found on this page. Add <code className="font-mono">grid</code> to your wordsearch page data.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div
                className="inline-grid gap-1"
                style={{
                  gridTemplateColumns: `repeat(${gridCols}, minmax(${cellRem}rem, ${cellRem}rem))`,
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
                          "aspect-square w-full rounded-lg border font-black shadow-sm transition",
                          cellTextClass,
                          isLocked ? "border-emerald-500 bg-emerald-200" : "border-black/10 bg-white hover:bg-amber-50",
                          isStart ? "ring-2 ring-amber-500" : "",
                        ].join(" ")}
                        title="Tap start, then tap end"
                      >
                        {ch}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}

          <div className="mt-3 text-xs font-semibold opacity-70">
            {lang === "ms"
              ? "Cara main: Tap huruf mula, kemudian tap huruf akhir (garis lurus)."
              : lang === "en"
              ? "How to play: Tap a start letter, then tap an end letter (straight line)."
              : "Cómo jugar: Toca una letra inicial y luego la final (línea recta)."}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setStart(null);
                setFound({});
                setRevealedCellKeys(new Set());
              }}
              className="touch-target rounded-xl bg-white px-4 py-2 text-sm font-bold shadow"
            >
              {lang === "ms" ? "Reset" : lang === "en" ? "Reset" : "Reiniciar"}
            </button>
          </div>
        </div>

        {/* TARGET LIST */}
        <div className="rounded-2xl bg-white/70 p-3 shadow phone-lg:p-4">
          <div className="text-xs font-black opacity-60">
            {lang === "ms"
              ? `CARI ${targets.length} PERKATAAN`
              : lang === "en"
              ? `FIND ${targets.length} WORDS`
              : `ENCUENTRA ${targets.length} PALABRAS`}
          </div>

          <div className="mt-3 grid gap-2 phone-lg:grid-cols-2 lg:grid-cols-1">
            {targets.map((t) => {
              const done = !!found[t.id];
              return (
                <div
                  key={t.id}
                  className={[
                    "rounded-xl px-3 py-2 text-[13px] font-extrabold shadow-sm phone-lg:text-sm",
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
      <AkuAkuFeedbackPopup
        open={showFoundOverlay}
        variant="fullscreen"
        src="/assets/characters/Akuaku_Betul.webp"
        alt="Aku Aku"
        animation="pulse"
        widthClassName="w-[240px] phone-lg:w-[280px] tablet:w-[300px]"
        imageClassName="drop-shadow-xl"
      />
    </section>
  );
}
