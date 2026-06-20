"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

const DISMISSED_KEY = "learnMalay.addToHomeScreenPrompt.dismissed.v1";

function isStandaloneMode() {
  const nav = navigator as Navigator & { standalone?: boolean };
  return window.matchMedia("(display-mode: standalone)").matches || nav.standalone === true;
}

function isLikelyIphoneSafari() {
  const ua = navigator.userAgent;
  const isIphone = /\biPhone\b/i.test(ua);
  const isMobileSafari = /\bMobile\/\S+\sSafari\//i.test(ua);
  const isOtherIosBrowser = /\b(CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo|Instagram|FBAN|FBAV)\b/i.test(ua);

  return isIphone && isMobileSafari && !isOtherIosBrowser;
}

function wasDismissed() {
  try {
    return window.localStorage.getItem(DISMISSED_KEY) === "1";
  } catch {
    return true;
  }
}

function rememberDismissed() {
  try {
    window.localStorage.setItem(DISMISSED_KEY, "1");
  } catch {
    // Ignore storage failures; the prompt can still be dismissed for this render.
  }
}

function InlineIcon({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <span className="mx-0.5 inline-flex h-[1.15em] w-[1.15em] translate-y-[0.16em] items-center justify-center text-[#4c321f]">
      <svg
        aria-label={label}
        role="img"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-full w-full"
      >
        {children}
      </svg>
    </span>
  );
}

function ShareIcon() {
  return (
    <InlineIcon label="Share">
      <path d="M12 3v12" />
      <path d="m7 8 5-5 5 5" />
      <path d="M5 12v7h14v-7" />
    </InlineIcon>
  );
}

function AddIcon() {
  return (
    <InlineIcon label="Add to Home Screen">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </InlineIcon>
  );
}

function MoreIcon() {
  return (
    <InlineIcon label="More">
      <circle cx="5" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </InlineIcon>
  );
}

export default function AddToHomeScreenPrompt() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (wasDismissed() || isStandaloneMode() || !isLikelyIphoneSafari()) return;
    setVisible(true);
  }, []);

  function dismiss() {
    rememberDismissed();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-[calc(var(--safe-area-bottom)+0.75rem)] left-[max(0.75rem,var(--safe-area-left))] right-[max(0.75rem,var(--safe-area-right))] z-50"
    >
      <div className="pointer-events-auto relative mx-auto max-w-[22rem] pt-5">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss Add to Home Screen hint"
          className="absolute right-[-10px] top-[-5px] z-20 flex h-11 w-11 items-start justify-center bg-transparent pt-0.5 text-base font-black leading-none text-[#f3d390] drop-shadow-[0_1px_1px_rgba(47,29,18,0.95)] transition hover:brightness-110 active:scale-95"
        >
          ×
        </button>

        <aside
          role="status"
          aria-live="polite"
          className="rounded-2xl border-2 border-[#5d391d] bg-[#f3d390]/95 px-3 py-2 text-[#2f1d12] shadow-[0_6px_0_rgba(60,35,16,0.78),0_12px_24px_rgba(0,0,0,0.3)] ring-2 ring-[#ffe5a8]/75 backdrop-blur"
        >
          <h2 className="mb-1 text-center text-sm font-black leading-tight text-[#2f1d12]">
            Add to Home Screen
          </h2>
          <p className="text-xs font-bold leading-tight">
            Learn Malay works better like an app on iPhone.
          </p>
          <p className="mt-0.5 text-[11px] font-semibold leading-tight text-[#4c321f]">
            Tap <ShareIcon /> Share, then Add to Home Screen <AddIcon />.
            <br />
            If needed, tap <MoreIcon /> More first.
          </p>
        </aside>
      </div>
    </div>
  );
}
