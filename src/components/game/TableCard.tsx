"use client";

import Image from "next/image";
import type {
  ChapterTablePage,
  TableCellItem,
  TableImageCell,
  Translated,
  UiLang,
} from "@/lib/chapters/types";

function tr(lang: UiLang, t: Translated) {
  return lang === "ms" ? t.ms : lang === "en" ? t.en : t.es;
}

function isImageCell(item: TableCellItem): item is TableImageCell {
  return typeof item === "object" && item !== null && "kind" in item && (item as any).kind === "image";
}

export default function TableCard({ page, lang }: { page: ChapterTablePage; lang: UiLang }) {
  const titleSub = lang === "ms" ? "" : tr(lang, page.title);

  function renderCellItem(item: TableCellItem, idx: number) {
    // ---------- image cell ----------
    if (isImageCell(item)) {
      const w = item.w ?? 220;
      const h = item.h ?? 140;

      return (
        <div key={`${item.src}-${idx}`} className="flex items-center justify-center p-0 leading-none">
          <Image
            src={item.src}
            alt={tr(lang, item.alt)}
            width={w}
            height={h}
            className={item.className ?? "h-12 w-auto object-contain"}
            draggable={false}
          />
        </div>
      );
    }

    // ---------- text cell (Translated) ----------
    const line = item as Translated;
    const sub = lang === "ms" ? "" : tr(lang, line);

    return (
      <div key={`${line.ms}-${idx}`} className="leading-tight">
        <div className="text-base font-extrabold">{line.ms}</div>
        {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{sub}</div>}
      </div>
    );
  }

  function renderHeader(label: Translated) {
    const sub = lang === "ms" ? "" : tr(lang, label);
    return (
      <div className="leading-tight">
        <div className="text-sm font-black">{label.ms}</div>
        {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{sub}</div>}
      </div>
    );
  }

  const firstColKey = page.columns?.[0]?.key;

  return (
    <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
      <div className="text-2xl font-extrabold">{page.title.ms}</div>
      {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{titleSub}</div>}

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[760px] border-separate border-spacing-0 overflow-hidden rounded-2xl leading-tight">
          <thead>
            <tr className="bg-amber-200">
              {page.columns.map((c) => (
                <th key={c.key} className="border border-black/10 p-2 text-left align-top">
                  {renderHeader(c.label)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {page.rows.map((r) => (
              <tr key={r.id} className="bg-white/95">
                {page.columns.map((c) => {
                  const items = r.cells?.[c.key] ?? [];
                  const isFirst = c.key === firstColKey;

                  return (
                    <td
                      key={`${r.id}-${c.key}`}
                      className={
                        isFirst
                          ? "border border-black/10 bg-amber-100/70 p-2 align-middle"
                          : "border border-black/10 p-2 align-top"
                      }
                    >
                      {/* Make image rows tight: reduce vertical spacing */}
                      <div className="space-y-1">
                        {items.length === 0 ? (
                          <div className="text-xs font-semibold opacity-40">—</div>
                        ) : (
                          items.map(renderCellItem)
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
