"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { AkuAkuDialog, AkuAkuLang } from "@/lib/akuAku/types.ts";

type Props = {
  open: boolean;
  onClose: () => void;
  dialogs: AkuAkuDialog[];
  title?: string;
};

const LANG_KEY = "learnMalay.akuAkuLang.v1";

function readLang(): AkuAkuLang {
  if (typeof window === "undefined") return "ms";
  const v = window.localStorage.getItem(LANG_KEY);
  if (v === "en" || v === "es" || v === "ms") return v;
  return "ms";
}

function writeLang(lang: AkuAkuLang) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LANG_KEY, lang);
}

export default function AkuAkuPopup({ open, onClose, dialogs, title }: Props) {
  const [idx, setIdx] = useState(0);
  const [lang, setLang] = useState<AkuAkuLang>("ms");

  useEffect(() => {
    setLang(readLang());
  }, []);

  useEffect(() => {
    if (open) setIdx(0);
  }, [open]);

  const total = dialogs.length;
  const current = useMemo(() => dialogs[idx], [dialogs, idx]);
  const isLast = idx >= total - 1;

  if (!open) return null;
  if (dialogs.length === 0) return null;

  const text =
    lang === "ms" ? current.ms : lang === "en" ? current.en : current.es;

  function pickLang(next: AkuAkuLang) {
    setLang(next);
    writeLang(next);
  }

return (
  <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
    <div
      className="absolute inset-0 bg-black/50"
      onClick={onClose}
      aria-hidden="true"
    />

    {/* WRAPPER: relative so the character can overlap */}
    <div className="relative w-full max-w-3xl">
      {/* CHARACTER (overlapping, bigger, left) */}
    <div className="pointer-events-none absolute -left-20 -top-10 z-10 sm:-left-[150px] sm:-top-[140px]">
        <Image
          src="/assets/characters/Akuaku_idle.png"
          alt="Aku-Aku"
          width={300}
          height={300}
          className="select-none drop-shadow-2xl"
          priority
        />
      </div>

      {/* CARD (shift right so text doesn't collide with character) */}
      <div className="relative rounded-3xl bg-white/90 p-5 pl-28 shadow-2xl backdrop-blur sm:pl-36">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-extrabold opacity-80">
              {title ?? "Aku-Aku"}
            </div>

            {/* Language buttons */}
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => pickLang("ms")}
                className={`rounded-full px-3 py-1 text-xs font-black shadow ${
                  lang === "ms" ? "bg-amber-300" : "bg-white"
                }`}
              >
                BM
              </button>
              <button
                onClick={() => pickLang("en")}
                className={`rounded-full px-3 py-1 text-xs font-black shadow ${
                  lang === "en" ? "bg-amber-300" : "bg-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => pickLang("es")}
                className={`rounded-full px-3 py-1 text-xs font-black shadow ${
                  lang === "es" ? "bg-amber-300" : "bg-white"
                }`}
              >
                ES
              </button>
            </div>
          </div>

          <div className="text-xs font-bold opacity-60">
            {idx + 1}/{total}
          </div>
        </div>

        <div className="mt-3 whitespace-pre-line text-sm font-semibold text-black/80">
          {text}
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          {idx > 0 && (
            <button
              onClick={() => setIdx((v) => Math.max(0, v - 1))}
              className="rounded-xl bg-white px-4 py-2 text-sm font-bold shadow transition active:scale-[0.98]"
            >
              Back
            </button>
          )}

          {!isLast ? (
            <button
              onClick={() => setIdx((v) => Math.min(total - 1, v + 1))}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow transition active:scale-[0.98]"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onClose}
              className="rounded-xl bg-amber-400 px-4 py-2 text-sm font-black shadow transition active:scale-[0.98]"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);
}