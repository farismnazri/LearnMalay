"use client";

import { useEffect, useMemo, useState } from "react";
import AkuAkuFeedbackPopup from "@/components/game/AkuAkuFeedbackPopup";
import type { UiLang, WordSearchPage, WordSearchTarget, Translated } from "@/lib/chapters/types";
import { normalizeWordSearchWord, targetWords } from "@/lib/wordSearch";

type Cell = { r: number; c: number };
type FoundWordsByTarget = Record<string, Record<string, Cell[]>>;
type ResolvedTarget = {
  id: string;
  words: string[];
  normalizedWords: string[];
  display: Translated;
  meaning?: Translated;
};

function tr(lang: UiLang, t: Translated) {
  return lang === "ms" ? t.ms : lang === "en" ? t.en : t.es;
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
  const target = normalizeWordSearchWord(rawWord);
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

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function isTargetComplete(target: ResolvedTarget, foundWords: FoundWordsByTarget) {
  if (target.normalizedWords.length === 0) return false;
  const foundForTarget = foundWords[target.id] ?? {};
  return target.normalizedWords.every((word) => Boolean(foundForTarget[word]));
}

function countCompletedTargets(targets: ResolvedTarget[], foundWords: FoundWordsByTarget) {
  return targets.filter((target) => isTargetComplete(target, foundWords)).length;
}

export default function WordSearchCard({
  page,
  lang,
  onProgress,
  onComplete,
  onWrong,
  showAllTrigger,
}: {
  page: WordSearchPage;
  lang: UiLang;
  onProgress?: (foundCount: number, total: number) => void;
  onComplete?: (foundCount: number, total: number) => void;
  onWrong?: () => void;
  showAllTrigger?: number; // when this value changes, reveal all answers
}) {
  const allowDiagonal = page.allowDiagonal ?? true;
  const allowReverse = page.allowReverse ?? true;
  const alphabet = (page.alphabet ?? "ABCDEFGHIJKLMNOPQRSTUVWXYZ").toUpperCase();

  const targets = useMemo(() => {
    const raw: WordSearchTarget[] = (page.targets ?? []) as WordSearchTarget[];

    return raw
      .map((t) => {
        const words = targetWords(t);
        const withMeta = t as WordSearchTarget & { label?: Translated; meaning?: Translated };
        const label = withMeta.label;
        const meaning = withMeta.meaning;
        const normalizedWords = Array.from(
          new Set(words.map((word) => normalizeWordSearchWord(word)).filter(Boolean))
        );

        // display: prefer label, else show the first word
        const displayMs = label?.ms ?? words[0] ?? "";
        const displayEn = label?.en ?? words[0] ?? "";
        const displayEs = label?.es ?? words[0] ?? "";

        return {
          id: t.id,
          words,
          normalizedWords,
          display: { ms: displayMs, en: displayEn, es: displayEs } as Translated,
          meaning,
        };
      })
      .filter((target) => target.normalizedWords.length > 0);
  }, [page.targets]);

  // Generate or parse grid
  const { grid } = useMemo(() => {
    const g = page.grid;
    const size = Math.max(6, Math.min(18, page.size ?? 12));

    function parseGrid(input: unknown): string[][] {
      if (Array.isArray(input) && Array.isArray(input[0])) {
        return (input as unknown[][]).map((row) => row.map((ch) => String(ch).toUpperCase()));
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

    function buildEmptyGrid() {
      return Array.from({ length: size }, () => Array.from({ length: size }, () => ""));
    }

    function cloneGrid(gridArr: string[][]) {
      return gridArr.map((row) => [...row]);
    }

    function fillBlanks(gridArr: string[][]) {
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (!gridArr[r][c]) {
            gridArr[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
          }
        }
      }
    }

    function tryGenerate(words: string[]): { grid: string[][] } {
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

      function canPlace(gridArr: string[][], r: number, c: number, dr: number, dc: number, w: string) {
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

      function placeWord(gridArr: string[][], w: string) {
        const attempts = Math.max(250, size * size * 3);
        for (let t = 0; t < attempts; t++) {
          const dir = shuffle(dirs)[0];
          const dr = dir[0];
          const dc = dir[1];
          const r = Math.floor(Math.random() * size);
          const c = Math.floor(Math.random() * size);
          if (!canPlace(gridArr, r, c, dr, dc, w)) continue;
          for (let i = 0; i < w.length; i++) {
            const rr = r + dr * i;
            const cc = c + dc * i;
            gridArr[rr][cc] = w[i];
          }
          return true;
        }
        return false;
      }

      let bestGrid = buildEmptyGrid();
      let maxPlaced = -1;

      for (let boardAttempt = 0; boardAttempt < 80; boardAttempt++) {
        const gridArr = buildEmptyGrid();
        const orderedWords = shuffle(words).sort((a, b) => b.length - a.length || a.localeCompare(b));
        let placedCount = 0;
        let failed = false;

        for (const word of orderedWords) {
          const candidate = allowReverse && Math.random() < 0.5 ? word.split("").reverse().join("") : word;
          const ok = placeWord(gridArr, candidate);
          if (!ok) {
            failed = true;
            break;
          }
          placedCount += 1;
        }

        if (placedCount > maxPlaced) {
          bestGrid = cloneGrid(gridArr);
          maxPlaced = placedCount;
        }

        if (!failed && placedCount === words.length) {
          fillBlanks(gridArr);
          return { grid: gridArr };
        }
      }

      fillBlanks(bestGrid);
      return { grid: bestGrid };
    }

    // If grid provided, parse; else auto-generate
    const parsed = parseGrid(g);
    if (parsed.length > 0 && parsed[0].length > 0) return { grid: parsed };

    const words = Array.from(
      new Set(targets.flatMap((target) => target.normalizedWords).filter((word) => word.length <= size))
    );
    if (words.length === 0) return { grid: [] };

    return tryGenerate(words);
  }, [page.grid, page.size, targets, allowDiagonal, allowReverse, alphabet]);

  const [start, setStart] = useState<Cell | null>(null);
  const [foundWords, setFoundWords] = useState<FoundWordsByTarget>({});
  const [revealedCellKeys, setRevealedCellKeys] = useState<Set<string>>(() => new Set());
  const [showFoundOverlay, setShowFoundOverlay] = useState(false);
  const [lastShowAll, setLastShowAll] = useState<number | undefined>(() => showAllTrigger);

  const revealSolutions = useMemo(() => {
    const byTarget: FoundWordsByTarget = {};
    const allCellKeys = new Set<string>();

    for (const t of targets) {
      const foundForTarget: Record<string, Cell[]> = {};

      for (const word of t.normalizedWords) {
        const path = findWordPathInGrid(grid, word, allowDiagonal);
        if (!path) continue;
        foundForTarget[word] = path;
        path.forEach((cell) => allCellKeys.add(keyOf(cell)));
      }

      if (Object.keys(foundForTarget).length > 0) byTarget[t.id] = foundForTarget;
    }

    return { byTarget, allCellKeys };
  }, [grid, targets, allowDiagonal]);

  // reset state when page changes (e.g., regenerate)
  useEffect(() => {
    setStart(null);
    setFoundWords({});
    setRevealedCellKeys(new Set());
    setShowFoundOverlay(false);
    setLastShowAll(showAllTrigger);
  }, [page.id, page.grid, targets, showAllTrigger]);

  const locked = useMemo(() => {
    const s = new Set<string>();
    Object.values(foundWords).forEach((targetMatches) =>
      Object.values(targetMatches).forEach((cells) => cells.forEach((cell) => s.add(keyOf(cell))))
    );
    revealedCellKeys.forEach((k) => s.add(k));
    return s;
  }, [foundWords, revealedCellKeys]);

  const completedTargetCount = useMemo(
    () => countCompletedTargets(targets, foundWords),
    [targets, foundWords]
  );

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
    const wNorm = normalizeWordSearchWord(w);
    const wRevNorm = normalizeWordSearchWord(w.split("").reverse().join(""));

    let match: { targetId: string; word: string } | null = null;

    for (const target of targets) {
      const foundForTarget = foundWords[target.id] ?? {};
      for (const candidate of target.normalizedWords) {
        if (foundForTarget[candidate]) continue;
        if (candidate === wNorm || (allowReverse && candidate === wRevNorm)) {
          match = { targetId: target.id, word: candidate };
          break;
        }
      }
      if (match) break;
    }

    if (!match) {
      onWrong?.();
      setStart(null);
      return;
    }

    setFoundWords((prev) => {
      const next = {
        ...prev,
        [match.targetId]: {
          ...(prev[match.targetId] ?? {}),
          [match.word]: cells,
        },
      };
      const total = targets.length;
      const completed = countCompletedTargets(targets, next);
      onProgress?.(completed, total);
      if (completed === total) {
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
    setFoundWords(revealSolutions.byTarget);
    onProgress?.(countCompletedTargets(targets, revealSolutions.byTarget), targets.length);
    // showing answers should not call onComplete that saves highscores; gate it by a prop
  }, [showAllTrigger, lastShowAll, revealSolutions, targets, onProgress]);

  // fire initial progress on mount/update
  useEffect(() => {
    onProgress?.(completedTargetCount, targets.length);
  }, [completedTargetCount, targets.length, onProgress]);

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
              const foundForTarget = foundWords[t.id] ?? {};
              const foundWordCount = Object.keys(foundForTarget).length;
              const done = isTargetComplete(t, foundWords);
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

                    <div className="text-xs font-black opacity-70">
                      {done ? "✓" : t.normalizedWords.length > 1 && foundWordCount > 0 ? `${foundWordCount}/${t.normalizedWords.length}` : ""}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 text-xs font-semibold opacity-70">
            {completedTargetCount} / {targets.length}
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
