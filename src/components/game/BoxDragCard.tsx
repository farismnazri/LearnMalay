"use client";

import { useEffect, useState } from "react";
import type { CSSProperties, DragEvent } from "react";
import type { BoxDragNode, BoxDragPage, Translated, UiLang } from "@/lib/chapters";

type BoxDragCardProps = {
  page: BoxDragPage;
  lang: UiLang;
};

export default function BoxDragCard({ page, lang }: BoxDragCardProps) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  useEffect(() => {
    setPlaced({});
    setChecked(false);
    setSelectedOptionId(null);
  }, [page.id]);

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

  function onDrop(e: DragEvent, nodeId: string) {
    e.preventDefault();
    const optionId = e.dataTransfer.getData("text/plain");
    if (!optionId) return;
    placeOption(nodeId, optionId);
  }

  function placeOption(nodeId: string, optionId: string) {
    setPlaced((prev) => ({ ...prev, [nodeId]: optionId }));
    setSelectedOptionId(null);
  }

  function onTapNode(nodeId: string) {
    if (selectedOptionId) {
      placeOption(nodeId, selectedOptionId);
      return;
    }
    clear(nodeId);
  }

  function clear(nodeId: string) {
    setPlaced((prev) => {
      const copy = { ...prev };
      delete copy[nodeId];
      return copy;
    });
  }

  function isCorrect(nodeId: string, correctOptionId?: string) {
    if (!correctOptionId) return false;
    return placed[nodeId] === correctOptionId;
  }

  function posStyle(node: BoxDragNode): CSSProperties {
    if (typeof node.xPct === "number" && typeof node.yPct === "number") {
      return { left: `${node.xPct}%`, top: `${node.yPct}%` };
    }

    switch (node.position) {
      case "topLeft":
        return { left: "25%", top: "18%" };
      case "topRight":
        return { left: "75%", top: "18%" };
      case "bottomLeft":
        return { left: "18%", top: "78%" };
      case "bottomCenter":
        return { left: "50%", top: "78%" };
      case "bottomRight":
        return { left: "82%", top: "78%" };
      default:
        return { left: "50%", top: "50%" };
    }
  }

  function nodeClass(shape: BoxDragNode["shape"], ok: boolean | null, hasValue: boolean) {
    const base =
      "absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center shadow font-extrabold text-xs phone-lg:text-sm tablet:text-[15px] xl:text-base";
    const shapeCls = shape === "oval" ? "rounded-full" : "rounded-2xl";
    const fill = hasValue ? "bg-amber-100" : "bg-white";
    const border = ok === null ? "border-2 border-black/20" : ok ? "border-2 border-emerald-500" : "border-2 border-red-500";
    const size = page.compact
      ? "w-[88px] h-[46px] phone-lg:w-[106px] phone-lg:h-[52px] tablet:w-[118px] tablet:h-[56px] xl:w-[145px] xl:h-[60px] px-2 phone-lg:px-3"
      : "w-[136px] h-[54px] phone-lg:w-[170px] phone-lg:h-[62px] tablet:w-[210px] tablet:h-[72px] xl:w-[260px] xl:h-[80px] px-2 phone-lg:px-4";

    return [base, shapeCls, fill, border, size].join(" ");
  }

  const VB_W = 1000;
  const VB_H = 600;

  function pxX(pct: number) {
    return (pct / 100) * VB_W;
  }
  function pxY(pct: number) {
    return (pct / 100) * VB_H;
  }

  return (
    <section className="rounded-3xl bg-white/90 p-4 shadow-xl phone-lg:p-5 tablet:p-6">
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
            ? "Pilihan dipilih. Ketik kotak sasaran untuk meletakkan jawapan."
            : lang === "en"
            ? "Option selected. Tap a target box to place the answer."
            : "Opción seleccionada. Pulsa una casilla objetivo para colocar la respuesta."}
        </div>
      )}

      <div className="mt-2 tablet:mt-5">
        <div className="relative mx-auto w-full max-w-7xl rounded-3xl bg-white/70 p-3 shadow phone-lg:p-4 tablet:p-5 xl:p-6">
          <div className="relative w-full overflow-x-auto">
            <div
              className={[
                "relative",
                page.compact
                  ? "min-w-[700px] aspect-[5/4] phone-lg:min-w-[740px] phone-lg:aspect-[16/11] tablet:min-w-[740px] tablet:aspect-[16/10] xl:min-w-[1100px] xl:aspect-[21/9]"
                  : "min-w-[620px] aspect-[4/3] phone-lg:min-w-[720px] tablet:min-w-[820px] tablet:aspect-[7/5] xl:min-w-[900px] xl:aspect-video",
              ].join(" ")}
            >
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="rgba(0,0,0,0.55)" />
                  </marker>
                </defs>

                {page.lines && page.lines.length > 0 ? (
                  page.lines.map((ln, i) => (
                    <line
                      key={i}
                      x1={pxX(ln.x1)}
                      y1={pxY(ln.y1)}
                      x2={pxX(ln.x2)}
                      y2={pxY(ln.y2)}
                      stroke="rgba(0,0,0,0.55)"
                      strokeWidth="3"
                      markerEnd={ln.arrow ? "url(#arrow)" : undefined}
                    />
                  ))
                ) : (
                  <>
                    <line x1="310" y1="120" x2="690" y2="120" stroke="rgba(0,0,0,0.55)" strokeWidth="3" />
                    <line x1="500" y1="120" x2="500" y2="260" stroke="rgba(0,0,0,0.55)" strokeWidth="3" />
                    <line x1="200" y1="260" x2="800" y2="260" stroke="rgba(0,0,0,0.55)" strokeWidth="3" />
                    <line x1="200" y1="260" x2="200" y2="390" stroke="rgba(0,0,0,0.55)" strokeWidth="3" markerEnd="url(#arrow)" />
                    <line x1="500" y1="260" x2="500" y2="390" stroke="rgba(0,0,0,0.55)" strokeWidth="3" markerEnd="url(#arrow)" />
                    <line x1="800" y1="260" x2="800" y2="390" stroke="rgba(0,0,0,0.55)" strokeWidth="3" markerEnd="url(#arrow)" />
                  </>
                )}
              </svg>

              {page.nodes.map((node) => {
                const style = posStyle(node);

                if (node.fixedText) {
                  return (
                    <div key={node.id} style={style} className={nodeClass(node.shape, null, true)}>
                      <div>
                        <div className="text-sm phone-lg:text-base sm:text-lg">{node.fixedText.ms}</div>
                        {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{tr(node.fixedText)}</div>}
                      </div>
                    </div>
                  );
                }

                const chosenId = placed[node.id];
                const chosen = page.options.find((o) => o.id === chosenId);
                const ok = checked ? isCorrect(node.id, node.correctOptionId) : null;

                return (
                  <div
                    key={node.id}
                    style={style}
                    onDragOver={allowDrop}
                    onDrop={(e) => onDrop(e, node.id)}
                    onClick={() => onTapNode(node.id)}
                    className={nodeClass(node.shape, ok, !!chosen)}
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
                    <div>
                      <div className="text-sm phone-lg:text-base sm:text-lg">{chosen ? chosen.ms : "—"}</div>
                      {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{chosen ? tr(chosen) : "—"}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 text-xs font-semibold opacity-70">
            {lang === "ms"
              ? "Seret atau ketik pilihan ke tempat yang betul. Ketik pada kotak untuk kosongkan."
              : lang === "en"
              ? "Drag or tap options into the correct places. Tap a box to clear it."
              : "Arrastra o toca las opciones en el lugar correcto. Pulsa una casilla para borrarla."}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
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
        </div>
      </div>
    </section>
  );
}
