"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import StylizedTitle from "@/components/game/StylizedTitle";
import { ADVENTURE_LOG, type AdventureLogEntry } from "@/lib/adventureLog";
import { APP_VERSION_LABEL } from "@/lib/appVersion";
import type { Translated } from "@/lib/chapters";
import { isAdmin, isDemo } from "@/lib/userCapabilities";
import { getCurrentUser, type UserProfile } from "@/lib/userStore";

const DISPLAY_LANG = "en" as const;
type HighlightGroup = keyof AdventureLogEntry["highlights"];

const GROUP_LABELS: Record<HighlightGroup, Translated> = {
  added: { ms: "Ditambah", en: "Added", es: "Anadido" },
  changed: { ms: "Diubah", en: "Changed", es: "Cambiado" },
  fixed: { ms: "Dibaiki", en: "Fixed", es: "Corregido" },
};

const GROUP_ORDER: HighlightGroup[] = ["added", "changed", "fixed"];

function pick(text: Translated) {
  return text[DISPLAY_LANG];
}

export default function AdventureLogPage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    let alive = true;
    getCurrentUser().then((u) => {
      if (alive) setUser(u);
    });
    return () => {
      alive = false;
    };
  }, []);

  const releases = [...ADVENTURE_LOG].sort((a, b) => b.date.localeCompare(a.date));
  const showTechnicalNotes = isAdmin(user) || isDemo(user);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#081d14] app-page-pad text-[#f7f1d5]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(255,220,88,0.17)_0%,rgba(255,220,88,0.04)_36%,transparent_58%),radial-gradient(circle_at_84%_18%,rgba(126,197,88,0.16)_0%,rgba(126,197,88,0.04)_36%,transparent_56%),linear-gradient(180deg,rgba(6,20,14,0.52)_0%,rgba(9,30,20,0.7)_58%,rgba(10,35,23,0.9)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background:repeating-linear-gradient(0deg,rgba(0,0,0,0.2)_0px,rgba(0,0,0,0.2)_1px,transparent_2px,transparent_4px)]" />

      <div className="relative z-10 mx-auto max-w-4xl space-y-4 phone-lg:space-y-5">
        <header className="rounded-3xl border border-[#c6dca8]/45 bg-[#163726]/75 p-5 shadow-[0_20px_55px_rgba(0,0,0,0.45)] backdrop-blur-md">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#f6f3d8]/75">Learn Malay</p>
          <div className="mt-2">
            <StylizedTitle title="Adventure Log" />
          </div>
          <p className="mt-3 max-w-2xl text-sm font-semibold text-[#edf6db]/90">
            Public updates for chapters, features, minigames, and release improvements.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <Link
              href="/"
              className="inline-flex rounded-full border border-[#d7c06a]/70 bg-[#ffe08a] px-3 py-1 text-xs font-black tracking-wide text-[#3d2d00] shadow"
            >
              Back to Title
            </Link>
            <span className="inline-flex rounded-full border border-[#95b778]/60 bg-[#2b5635]/90 px-3 py-1 text-xs font-black tracking-wide text-[#f2f7de]">
              Current Version {APP_VERSION_LABEL}
            </span>
          </div>
        </header>

        <section className="space-y-3 phone-lg:space-y-4">
          {releases.map((release, index) => (
            <article
              key={`${release.version}-${release.date}`}
              className="rounded-3xl border border-[#dcd09c]/60 bg-[#f8f0d2]/95 p-4 text-[#23331c] shadow-[0_16px_38px_rgba(0,0,0,0.26)] phone-lg:p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#556045]/80">
                    {index === 0 ? "Latest Release" : "Previous Release"}
                  </p>
                  <h2 className="crash-text crash-outline-fallback mt-1 text-3xl font-black leading-none phone-lg:text-4xl">
                    v{release.version}
                  </h2>
                </div>
                <span className="inline-flex rounded-full border border-[#c7bb88]/75 bg-[#efe4bc] px-3 py-1 text-xs font-black tracking-wide text-[#4f5637]">
                  {release.date}
                </span>
              </div>

              <p className="mt-3 text-sm font-bold text-[#2f3b27]">{pick(release.headline)}</p>

              <div className="mt-4 grid gap-3">
                {GROUP_ORDER.map((group) => {
                  const items = release.highlights[group];
                  if (items.length === 0) return null;

                  return (
                    <section key={group}>
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#4f5a3a]">
                        {pick(GROUP_LABELS[group])}
                      </h3>
                      <ul className="mt-1.5 list-disc space-y-1.5 pl-4">
                        {items.map((item, idx) => (
                          <li key={`${group}-${idx}`} className="text-sm font-semibold text-[#2f3b27]">
                            {pick(item)}
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}

                {showTechnicalNotes && release.technicalNotes && release.technicalNotes.length > 0 && (
                  <section>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#4f5a3a]">
                      Technical Notes
                    </h3>
                    <ul className="mt-1.5 list-disc space-y-1.5 pl-4">
                      {release.technicalNotes.map((item, idx) => (
                        <li key={`technical-${idx}`} className="text-sm font-semibold text-[#2f3b27]">
                          {pick(item)}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
