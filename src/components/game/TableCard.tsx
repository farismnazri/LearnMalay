"use client";

import Image from "next/image";
import type {
  ChapterTablePage,
  TableCellItem,
  TableImageCell,
  TableTextCell,
  Translated,
  UiLang,
} from "@/lib/chapters/types";

function tr(lang: UiLang, t: Translated) {
  return lang === "ms" ? t.ms : lang === "en" ? t.en : t.es;
}

function isImageCell(item: TableCellItem): item is TableImageCell {
  return typeof item === "object" && item !== null && (item as Record<string, unknown>).kind === "image";
}

function HighlightedText({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight) return text;
  const index = text.toLocaleLowerCase().indexOf(highlight.toLocaleLowerCase());
  if (index < 0) return text;

  return (
    <>
      {text.slice(0, index)}
      <strong className="rounded bg-amber-200 px-0.5">{text.slice(index, index + highlight.length)}</strong>
      {text.slice(index + highlight.length)}
    </>
  );
}

export default function TableCard({ page, lang }: { page: ChapterTablePage; lang: UiLang }) {
  const titleSub = lang === "ms" ? "" : tr(lang, page.title);
  const isOccupationTable = page.id === "c9-p3-jenis-pekerjaan";

  if (page.id === "c4-p2-waktu-harian") {
    return (
      <section className="rounded-3xl bg-white/95 p-4 shadow-xl sm:p-6">
        <h2 className="text-2xl font-black">{page.title.ms}</h2>
        {lang !== "ms" && <p className="text-sm font-bold opacity-65">{titleSub}</p>}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {page.rows.map((row) => {
            const image = row.cells.gambar?.find(isImageCell);
            const textItems = (row.cells.waktu ?? []).filter((item): item is TableTextCell => !isImageCell(item));
            const name = textItems[0];
            const range = textItems[1];
            if (!image || !name || !range) return null;
            return (
              <article key={row.id} className="overflow-hidden rounded-2xl border-2 border-black/10 bg-[#fff8df] p-3 shadow">
                <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-xl bg-white p-2">
                  <Image src={image.src} alt={tr(lang, image.alt)} width={image.w ?? 360} height={image.h ?? 240} className="h-full w-full object-contain" />
                </div>
                <div className="mt-3 text-center">
                  <h3 className="text-lg font-black">{name.ms}</h3>
                  {lang !== "ms" && <p className="text-xs font-bold opacity-65">{tr(lang, name)}</p>}
                  <p className="mt-2 rounded-xl bg-amber-100 px-2 py-2 text-xs font-black">{range.ms}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
  }

  if (page.id === "c4-p5-masa-dalam-ayat") {
    const tones = [
      { card: "bg-blue-100", title: "text-blue-700", example: "bg-blue-50" },
      { card: "bg-emerald-100", title: "text-emerald-700", example: "bg-emerald-50" },
      { card: "bg-amber-100", title: "text-amber-700", example: "bg-amber-50" },
    ];

    return (
      <div className="grid gap-4">
        <section className="rounded-3xl bg-white/95 p-4 shadow-xl sm:p-6">
          <h2 className="text-2xl font-black">{page.title.ms}</h2>
          {lang !== "ms" && <p className="text-sm font-bold opacity-65">{titleSub}</p>}
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {page.rows.map((row, index) => {
              const focusItems = row.cells.fokus ?? [];
              const icon = focusItems.find(isImageCell);
              const focus = focusItems.find((item): item is TableTextCell => !isImageCell(item));
              if (!focus) return null;
              return (
                <article key={row.id} className={`rounded-2xl border border-black/5 p-4 text-center shadow-sm ${tones[index].card}`}>
                  {icon && <Image src={icon.src} alt={tr(lang, icon.alt)} width={72} height={72} className="mx-auto mb-2 h-14 w-14 object-contain" />}
                  <h3 className={`text-2xl font-black ${tones[index].title}`}>{focus.ms}</h3>
                  {lang !== "ms" && <p className="mt-1 text-xs font-bold opacity-65">{tr(lang, focus)}</p>}
                </article>
              );
            })}
          </div>
        </section>

        {page.rows.map((row, index) => {
          const focusItems = row.cells.fokus ?? [];
          const icon = focusItems.find(isImageCell);
          const focus = focusItems.find((item): item is TableTextCell => !isImageCell(item));
          const examples = row.cells.contoh ?? [];
          if (!focus) return null;
          return (
            <section key={row.id} className="rounded-3xl bg-white/95 p-4 shadow-xl sm:p-6">
              <div className="flex items-center gap-3">
                {icon && <Image src={icon.src} alt={tr(lang, icon.alt)} width={56} height={56} className="h-12 w-12 object-contain" />}
                <h3 className={`text-2xl font-black ${tones[index].title}`}>{focus.ms}</h3>
              </div>
              <div className="mt-3 grid gap-2">
                {examples.map((example, exampleIndex) => {
                  if (isImageCell(example)) return null;
                  const secondary = tr(lang, example);
                  return (
                    <article key={`${row.id}-${exampleIndex}`} className={`rounded-2xl px-4 py-4 text-center ${tones[index].example}`}>
                      <p className="text-sm font-extrabold sm:text-base">
                        <HighlightedText text={example.ms} highlight={example.highlight?.ms} />
                      </p>
                      {lang !== "ms" && (
                        <p className="mt-1 text-xs font-semibold opacity-65">
                          <HighlightedText text={secondary} highlight={example.highlight ? tr(lang, example.highlight) : undefined} />
                        </p>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}

        {page.leadCard && (
          <section className="rounded-3xl border-2 border-amber-300/70 bg-[#fff4cf] p-4 shadow-xl sm:p-5">
            <h3 className="text-base font-black">{tr(lang, page.leadCard.heading)}</h3>
            <p className="mt-1 text-sm font-bold opacity-75">{tr(lang, page.leadCard.body)}</p>
          </section>
        )}
      </div>
    );
  }

  if (page.id === "c4-p6-kata-arah") {
    const visualRows = page.rows.slice(0, 4);
    const terusRow = page.rows[4];
    return (
      <section className="rounded-3xl bg-white/95 p-4 shadow-xl sm:p-6">
        <h2 className="text-2xl font-black">{page.title.ms}</h2>
        {lang !== "ms" && <p className="text-sm font-bold opacity-65">{titleSub}</p>}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {visualRows.map((row) => {
            const image = row.cells.gambar?.find(isImageCell);
            const word = row.cells.kata?.find((item): item is TableTextCell => !isImageCell(item));
            if (!image || !word) return null;
            return (
              <article key={row.id} className="overflow-hidden rounded-2xl border-2 border-black/10 bg-[#fff8df] p-3 shadow">
                <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-xl bg-white p-2">
                  <Image src={image.src} alt={tr(lang, image.alt)} width={image.w ?? 360} height={image.h ?? 240} className="h-full w-full object-contain" />
                </div>
                <h3 className="mt-3 text-center text-xl font-black">{word.ms}</h3>
                {lang !== "ms" && <p className="text-center text-xs font-bold opacity-65">{tr(lang, word)}</p>}
              </article>
            );
          })}
        </div>
        {terusRow && (
          <div className="mt-4 rounded-2xl border-2 border-emerald-300 bg-emerald-100 px-4 py-4 text-center text-emerald-950 shadow">
            <div className="text-3xl font-black">→</div>
            <div className="text-xl font-black">terus</div>
            {lang !== "ms" && <div className="text-xs font-bold opacity-65">{lang === "en" ? "straight" : "recto"}</div>}
          </div>
        )}
      </section>
    );
  }

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
    const line = item as TableTextCell;
    const sub = lang === "ms" ? "" : tr(lang, line);
    const highlight = line.highlight ? tr(lang, line.highlight) : undefined;

    return (
      <div key={`${line.ms}-${idx}`} className="leading-tight">
        <div className="text-sm font-extrabold phone-lg:text-base">
          <HighlightedText text={line.ms} highlight={line.highlight?.ms} />
        </div>
        {lang !== "ms" && (
          <div className="text-xs font-semibold opacity-70">
            <HighlightedText text={sub} highlight={highlight} />
          </div>
        )}
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

                    <div className={["mt-1 space-y-1", isOccupationTable ? "text-center" : ""].join(" ")}>
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
                      className={[
                        isFirst
                          ? "sticky left-0 z-[1] border border-black/10 bg-amber-100/90 p-2"
                          : "border border-black/10 p-2",
                        isOccupationTable ? "align-middle text-center" : isFirst ? "align-middle" : "align-top",
                      ].join(" ")}
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
