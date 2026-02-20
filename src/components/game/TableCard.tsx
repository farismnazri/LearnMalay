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
            className={item.className ?? "h-14 w-auto object-contain"}
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
        <div className="text-sm font-extrabold phone-lg:text-base">{line.ms}</div>
        {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{sub}</div>}
      </div>
    );
  }

  function renderHeader(label: Translated) {
    const sub = lang === "ms" ? "" : tr(lang, label);
    return (
      <div className="leading-tight">
        <div className="text-xs font-black phone-lg:text-sm">{label.ms}</div>
        {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{sub}</div>}
      </div>
    );
  }

  const firstColKey = page.columns?.[0]?.key;

  return (
    <section className="rounded-3xl bg-white/90 p-4 shadow-xl phone-lg:p-5 sm:p-6">
      <div className="text-xl font-extrabold phone-lg:text-2xl">{page.title.ms}</div>
      {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{titleSub}</div>}

      {page.leadCard && (
        <article className="mt-4 rounded-2xl bg-white/95 p-3 shadow phone-lg:p-4">
          <div className="text-sm font-black tracking-wide">{page.leadCard.heading.ms}</div>
          {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{tr(lang, page.leadCard.heading)}</div>}

          <p className="mt-2 whitespace-pre-line text-xs font-extrabold phone-lg:text-sm">{page.leadCard.body.ms}</p>
          {lang !== "ms" && <p className="mt-1 whitespace-pre-line text-xs font-semibold opacity-70">{tr(lang, page.leadCard.body)}</p>}
        </article>
      )}

      <div className="mt-5 space-y-3 tablet:hidden">
        {page.rows.map((r, rowIdx) => (
          <article key={r.id} className="rounded-2xl border border-black/10 bg-white/95 p-3 shadow-sm">
            <div className="mb-2 text-[11px] font-black tracking-wide opacity-60">
              {lang === "ms" ? "BARIS" : lang === "en" ? "ROW" : "FILA"} {rowIdx + 1}
            </div>

            <div className="space-y-2">
              {page.columns.map((c) => {
                const items = r.cells?.[c.key] ?? [];
                const isFirst = c.key === firstColKey;

                return (
                  <div
                    key={`${r.id}-${c.key}-mobile`}
                    className={[
                      "rounded-xl border border-black/10 p-2",
                      isFirst ? "bg-amber-100/60" : "bg-white",
                    ].join(" ")}
                  >
                    <div className="leading-tight">
                      <div className="text-[11px] font-black uppercase tracking-wide opacity-70">{c.label.ms}</div>
                      {lang !== "ms" && <div className="text-[11px] font-semibold opacity-60">{tr(lang, c.label)}</div>}
                    </div>

                    <div className="mt-1 space-y-1">
                      {items.length === 0 ? (
                        <div className="text-xs font-semibold opacity-40">—</div>
                      ) : (
                        items.map(renderCellItem)
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 hidden overflow-x-auto tablet:block">
        <table className="w-full min-w-[680px] border-separate border-spacing-0 overflow-hidden rounded-2xl leading-tight">
          <thead>
            <tr className="bg-amber-200">
              {page.columns.map((c) => {
                const isFirst = c.key === firstColKey;
                return (
                  <th
                    key={c.key}
                    className={[
                      "border border-black/10 p-2 text-left align-top",
                      isFirst ? "sticky left-0 z-[2] bg-amber-200" : "",
                    ].join(" ")}
                  >
                    {renderHeader(c.label)}
                  </th>
                );
              })}
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
                          ? "sticky left-0 z-[1] border border-black/10 bg-amber-100/90 p-2 align-middle"
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
