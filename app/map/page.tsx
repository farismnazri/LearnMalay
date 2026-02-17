"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import IconActionLink from "@/components/navigation/IconActionLink";
import { getProfileAvatarSrc } from "@/lib/profileAvatars";
import {
  getCurrentUser,
  type UserProfile,
} from "@/lib/userStore";

type ChapterCard = {
  chapter: number; // 1..11
  world: number; // 1..3
  level: number; // 1..4 or 1..3
};

function chapterToWorldLevel(chapter: number) {
  if (chapter <= 4) return { world: 1, level: chapter };
  if (chapter <= 8) return { world: 2, level: chapter - 4 };
  return { world: 3, level: chapter - 8 };
}

function buildChapters(): ChapterCard[] {
  const items: ChapterCard[] = [];
  for (let c = 1; c <= 11; c++) {
    const wl = chapterToWorldLevel(c);
    items.push({ chapter: c, world: wl.world, level: wl.level });
  }
  return items;
}

export default function MapPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    getCurrentUser()
      .then((u) => {
        if (alive) setUser(u);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/user");
    }
  }, [loading, user, router]);

  const chapters = useMemo(() => buildChapters(), []);
  const currentChapter = user?.progress.chapter ?? 0;

  if (!user && loading) {
    return null; // no flash
  }

  if (!user && !loading) return null;

  function selectChapter(chapter: number) {
    router.push(`/chapter/${chapter}`);
  }

  if (!user) return null;

  const isAdmin = Boolean(user.isAdmin);
  const totalChapters = chapters.length;
  const unlockedCount = isAdmin
    ? totalChapters
    : chapters.filter((c) => c.chapter <= currentChapter).length;
  const completionPct = Math.round((unlockedCount / totalChapters) * 100);

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#081d14] px-6 py-10"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(255,220,88,0.16)_0%,rgba(255,220,88,0.03)_35%,transparent_52%),radial-gradient(circle_at_85%_18%,rgba(126,197,88,0.2)_0%,rgba(126,197,88,0.04)_38%,transparent_58%),linear-gradient(180deg,rgba(6,20,14,0.48)_0%,rgba(9,30,20,0.62)_42%,rgba(10,35,23,0.72)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background:repeating-linear-gradient(0deg,rgba(0,0,0,0.18)_0px,rgba(0,0,0,0.18)_1px,transparent_2px,transparent_4px)]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-cover bg-center bg-no-repeat p-5 shadow-[0_20px_55px_rgba(0,0,0,0.45)]"
            style={{ backgroundImage: "url('/assets/borders/Worldmap.png')" }}
          >
            <div className="absolute inset-0 bg-[#1b2f20]/38" />
            <div className="relative z-10 pl-3 sm:pl-4">
              <div className="flex items-center gap-4">
                <Image
                  src={getProfileAvatarSrc(user.avatarId)}
                  alt={`${user.name} avatar`}
                  width={60}
                  height={60}
                  className="h-14 w-14 rounded-full border-2 border-[#f8da72]/75 bg-white/95 object-cover shadow-lg"
                />

                <div className="min-w-0">
                  <h1 className="crash-text crash-outline-fallback text-5xl leading-none font-black text-[#ffde66] drop-shadow-[0_3px_0_rgba(0,0,0,0.45)]">
                    WORLD MAP
                  </h1>
                  <p className="mt-1 text-sm font-bold text-[#eef8da]">
                    Explorer: <span className="text-[#ffe98e]">{user.name}</span> • Current Chapter:{" "}
                    <span className="text-[#ffe98e]">{currentChapter}</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#b8d98a]/60 bg-[#2f5f34]/70 px-3 py-1 text-[11px] font-black tracking-wide text-[#eff9dc]">
                  UNLOCKED {unlockedCount}/{totalChapters}
                </span>
                <span className="rounded-full border border-[#f0d487]/60 bg-[#72531e]/60 px-3 py-1 text-[11px] font-black tracking-wide text-[#fff0bf]">
                  {completionPct}% COMPLETE
                </span>
                {isAdmin && (
                  <span className="rounded-full border border-rose-300/70 bg-rose-100 px-3 py-1 text-[11px] font-black tracking-wide text-rose-900">
                    ADMIN MODE
                  </span>
                )}
              </div>

              <div className="mt-3 mx-1 h-2.5 w-[calc(100%-2rem)] overflow-hidden rounded-full bg-black/35">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#88cb58] via-[#c8d95f] to-[#ffd74c]"
                  style={{ width: `${Math.max(4, completionPct)}%` }}
                />
              </div>
            </div>
          </div>

          {/* TOP RIGHT BUTTONS */}
          <div className="flex gap-3 pt-1">
            <IconActionLink
              href="/minigames"
              kind="minigames"
              tooltip="Go to Mini Games"
              iconClassName="brightness-0 invert"
            />
            <IconActionLink href="/" kind="home" tooltip="Back to Home" iconClassName="brightness-0 invert" />
          </div>
        </div>

        {[1, 2, 3].map((w) => {
          const worldChapters = chapters.filter((c) => c.world === w);

          return (
            <section key={w} className="mt-10">
              <div className="inline-flex items-center gap-2 rounded-2xl border border-[#d5e6ba]/50 bg-[#173728]/70 px-4 py-2 shadow-lg backdrop-blur-md">
                <h2 className="crash-text crash-outline-fallback text-4xl font-black leading-none text-[#ffd65b]">
                  WORLD {w}
                </h2>
                <span className="rounded-full border border-[#bdd89d]/60 bg-[#305f34]/80 px-3 py-1 text-[11px] font-black text-[#ecf6d9]">
                  {worldChapters.filter((c) => user.isAdmin || user.progress.chapter >= c.chapter).length}/
                  {worldChapters.length} OPEN
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {worldChapters.map((c) => {
                  const unlocked = user.isAdmin || user.progress.chapter >= c.chapter;
                  const isCurrent = c.chapter === currentChapter;
                  const lockHint = c.chapter === 1 ? "Start here" : `Finish Chapter ${c.chapter - 1}`;

                  return (
                    <button
                      key={c.chapter}
                      disabled={!unlocked}
                      onClick={() => selectChapter(c.chapter)}
                      className={[
                        "group relative overflow-hidden rounded-3xl border p-5 text-left shadow-xl transition-all duration-200",
                        "active:scale-[0.98] focus:outline-none",
                        unlocked
                          ? "hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(0,0,0,0.28)]"
                          : "cursor-not-allowed",
                        isCurrent
                          ? "border-[#e8c04f]/90 bg-gradient-to-br from-[#ffde64] via-[#ffd04d] to-[#f7bf3d] text-[#2f2606]"
                          : unlocked
                          ? "border-[#dfd29f]/70 bg-[#fff6d8]/92 text-[#23331c]"
                          : "border-[#88aa7b]/35 bg-[#173828]/70 text-[#dbebcf]/85",
                      ].join(" ")}
                      title={
                        unlocked
                          ? `Go to Chapter ${c.chapter}`
                          : `Locked until you reach Chapter ${c.chapter}`
                      }
                    >
                      <div className="text-xs font-black opacity-65">
                        CHAPTER
                      </div>
                      <div className="mt-1 text-3xl font-black leading-none">
                        {c.chapter}
                      </div>
                      <div className="mt-2 text-sm font-bold opacity-80">
                        World {c.world} • Level {c.level}
                      </div>

                      {isCurrent && (
                        <div className="mt-3 inline-block rounded-full border border-black/20 bg-black/10 px-3 py-1 text-xs font-black">
                          CURRENT
                        </div>
                      )}

                      {unlocked && !isCurrent && (
                        <div className="mt-3 inline-block rounded-full border border-[#b9cf7e]/75 bg-[#3f6d37]/90 px-3 py-1 text-xs font-black text-[#eef8d7]">
                          OPEN
                        </div>
                      )}

                      {!unlocked && (
                        <div className="mt-3 inline-flex flex-col rounded-2xl border border-[#9eb88c]/40 bg-black/25 px-3 py-2">
                          <span className="text-[11px] font-black tracking-wide text-[#ffe18f]">LOCKED</span>
                          <span className="mt-0.5 text-[11px] font-semibold text-[#e4f0d4]">{lockHint}</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
