"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BackgroundAudioControls } from "@/components/game/BackgroundAudio";
import IconActionLink from "@/components/navigation/IconActionLink";
import StylizedTitle from "@/components/game/StylizedTitle";
import { getProfileAvatarSrc } from "@/lib/profileAvatars";
import {
  chapter01,
  chapter02,
  chapter03,
  chapter04,
  chapter05,
  chapter06,
  chapter07,
  chapter08,
  chapter09,
  chapter10,
  chapter11,
} from "@/lib/chapters";
import {
  getCurrentUser,
  type UserProfile,
} from "@/lib/userStore";
import { isChapterUnlocked, MINIGAME_PREREQUISITES } from "@/lib/minigameUnlocks";
import { isAdmin, isDemo } from "@/lib/userCapabilities";

type ChapterCard = {
  chapter: number; // 1..11
  world: number; // 1..3
  level: number; // 1..4 or 1..3
  theme: string;
};

const CHAPTERS_WITH_MINIGAME_UNLOCK = new Set<number>(
  Object.values(MINIGAME_PREREQUISITES),
);

function chapterToWorldLevel(chapter: number) {
  if (chapter <= 4) return { world: 1, level: chapter };
  if (chapter <= 8) return { world: 2, level: chapter - 4 };
  return { world: 3, level: chapter - 8 };
}

function buildChapters(): ChapterCard[] {
  const chapterThemes = new Map<number, string>([
    [chapter01.id, chapter01.title.ms],
    [chapter02.id, chapter02.title.ms],
    [chapter03.id, chapter03.title.ms],
    [chapter04.id, chapter04.title.ms],
    [chapter05.id, chapter05.title.ms],
    [chapter06.id, chapter06.title.ms],
    [chapter07.id, chapter07.title.ms],
    [chapter08.id, chapter08.title.ms],
    [chapter09.id, chapter09.title.ms],
    [chapter10.id, chapter10.title.ms],
    [chapter11.id, chapter11.title.ms],
  ]);

  const items: ChapterCard[] = [];
  for (let c = 1; c <= 11; c++) {
    const wl = chapterToWorldLevel(c);
    items.push({
      chapter: c,
      world: wl.world,
      level: wl.level,
      theme: chapterThemes.get(c) ?? "",
    });
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

  const isAdminMode = isAdmin(user);
  const isDemoMode = isDemo(user);
  const totalChapters = chapters.length;
  const unlockedCount = chapters.filter((c) => isChapterUnlocked(user, c.chapter)).length;
  const completionPct = Math.round((unlockedCount / totalChapters) * 100);

  return (
    <main className="chapter-page-shell relative min-h-screen overflow-x-hidden app-page-pad">
      <div className="chapter-viewport-bg" aria-hidden="true">
        <div className="chapter-viewport-bg-image" />
        <div className="chapter-viewport-bg-fade" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="flex flex-wrap items-start justify-between gap-2.5 phone-lg:gap-3">
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-cover bg-center bg-no-repeat p-3.5 shadow-[0_20px_55px_rgba(0,0,0,0.45)] phone-lg:p-4 xl:p-5"
            style={{ backgroundImage: "url('/assets/borders/Worldmap.png')" }}
          >
            <div className="absolute inset-0 bg-[#1b2f20]/38" />
            <div className="relative z-10 pl-1 phone-lg:pl-2.5 sm:pl-3">
              <div className="mx-1 w-[calc(100%-2rem)]">
                <div className="flex items-center justify-between gap-2.5 phone-lg:gap-3">
                  <div className="flex min-w-0 flex-1 items-center gap-2.5 phone-lg:gap-3">
                    <Image
                      src={getProfileAvatarSrc(user.avatarId)}
                      alt={`${user.name} avatar`}
                      width={60}
                      height={60}
                      className="h-14 w-14 rounded-full border-2 border-[#f8da72]/75 bg-white/95 object-cover shadow-lg"
                    />

                    <div className="min-w-0">
                      <StylizedTitle title="WORLD MAP" />
                      <p className="mt-1 text-xs font-bold text-[#eef8da] phone-lg:text-sm">
                        Explorer: <span className="text-[#ffe98e]">{user.name}</span> • Current Chapter:{" "}
                        <span className="text-[#ffe98e]">{currentChapter}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex min-h-[66px] items-center justify-center rounded-xl border border-[#88a967]/80 bg-gradient-to-b from-[#4f733a]/95 via-[#345c34]/95 to-[#274a2d]/95 px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-2px_0_rgba(0,0,0,0.2)] phone-lg:min-h-[74px] phone-lg:px-5">
                    <span className="whitespace-nowrap text-xl font-black leading-none tracking-wide text-[#fff7d6] phone-lg:text-2xl">
                      {unlockedCount}/{totalChapters}
                    </span>
                  </div>
                </div>

                <div className="mt-2 flex justify-end">
                  {isAdminMode && (
                    <span className="rounded-full border border-rose-300/70 bg-rose-100 px-3 py-0.5 text-[11px] font-black tracking-wide text-rose-900">
                      ADMIN MODE
                    </span>
                  )}
                  {isDemoMode && (
                    <span className="rounded-full border border-[#f7d87f]/80 bg-[#fff2c7] px-3 py-0.5 text-[11px] font-black tracking-wide text-[#5c4500]">
                      DEMO MODE
                    </span>
                  )}
                </div>

                <div className="mt-2.5 flex items-center gap-2">
                  <span className="inline-flex h-5 min-w-[44px] items-center justify-center rounded-md border border-[#3f642c] bg-[#6f9f3f] px-2 text-[11px] font-black leading-none text-[#fff7d6] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                    {completionPct}%
                  </span>
                  <div className="relative h-5 flex-1 overflow-hidden rounded-md border border-[#3f642c] bg-[#f4edcf]">
                    <div
                      className="h-full rounded-[5px] bg-[#6f9f3f]"
                      style={{ width: `${completionPct}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TOP RIGHT CONTROLS */}
          <div className="w-full rounded-2xl border border-[#c6dca8]/45 bg-[#163726]/75 p-3 shadow-xl backdrop-blur-md md:w-auto md:shrink-0 xl:p-4">
            <div className="mb-2.5">
              <BackgroundAudioControls />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 md:flex md:gap-3">
              <IconActionLink
                href="/minigames"
                kind="minigames"
                tooltip="Go to Mini Games"
                iconClassName="brightness-0 invert"
              />
              <IconActionLink href="/" kind="home" tooltip="Back to Home" iconClassName="brightness-0 invert" />
            </div>
          </div>
        </div>

        {[1, 2, 3].map((w) => {
          const worldChapters = chapters.filter((c) => c.world === w);

          return (
            <section key={w} className={w === 1 ? "mt-5 phone-lg:mt-6 xl:mt-8" : "mt-3 phone-lg:mt-4 xl:mt-5"}>
              {w !== 1 && (
                <div className="mb-3 mt-3 phone-lg:mb-4 phone-lg:mt-4">
                  <div
                    className="ml-[3.4rem] h-px w-[calc(100%-3.4rem)] bg-gradient-to-r from-transparent via-[#f5da8e]/50 to-transparent shadow-[0_0_3px_rgba(245,218,142,0.18)] phone-lg:ml-[3.7rem] phone-lg:w-[calc(100%-3.7rem)]"
                    aria-hidden
                  />
                </div>
              )}
              <div className="flex items-stretch gap-2.5 phone-lg:gap-3">
                <div className="flex w-11 shrink-0 items-center justify-center rounded-2xl border border-[#d5e6ba]/50 bg-[#173728]/70 px-1 py-2 shadow-lg backdrop-blur-md phone-lg:w-12">
                  <div className="flex -rotate-90 items-center gap-2 whitespace-nowrap">
                    <h2 className="crash-text crash-outline-fallback text-xl font-black leading-none text-[#ffd65b] phone-lg:text-2xl">
                      WORLD {w}
                    </h2>
                    <span className="rounded-full border border-[#bdd89d]/60 bg-[#305f34]/80 px-2 py-0.5 text-[10px] font-black text-[#ecf6d9] phone-lg:text-[11px]">
                      {worldChapters.filter((c) => isChapterUnlocked(user, c.chapter)).length}/
                      {worldChapters.length} OPEN
                    </span>
                  </div>
                </div>

                <div className="grid flex-1 grid-cols-1 gap-2.5 phone-lg:gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-4">
                {worldChapters.map((c) => {
                  const unlocked = isChapterUnlocked(user, c.chapter);
                  const isCurrent = c.chapter === currentChapter;
                  const lockHint = c.chapter === 1 ? "Start here" : `Finish Chapter ${c.chapter - 1}`;
                  const unlocksMinigame = CHAPTERS_WITH_MINIGAME_UNLOCK.has(c.chapter);

                  return (
                    <button
                      key={c.chapter}
                      disabled={!unlocked}
                      onClick={() => selectChapter(c.chapter)}
                      className={[
                        "group relative overflow-hidden rounded-3xl border px-3 py-2.5 text-center shadow-xl transition-all duration-200 phone-lg:px-3.5 phone-lg:py-3 xl:p-3.5",
                        "flex min-h-[172px] flex-col items-center phone-lg:min-h-[182px] xl:min-h-[198px]",
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
                      {unlocksMinigame && (
                        <span
                          className={[
                            "pointer-events-none absolute right-2.5 top-2.5 inline-flex h-10 w-10 items-center justify-center opacity-50 transition-opacity duration-150 group-hover:opacity-75 group-focus-visible:opacity-75",
                          ].join(" ")}
                          role="img"
                          aria-label="Completing this chapter unlocks a minigame"
                          title="Completing this chapter unlocks a minigame"
                        >
                          <Image
                            src="/assets/borders/IconsButtons_Minigames.svg"
                            alt=""
                            aria-hidden="true"
                            width={40}
                            height={40}
                            className={[
                              "h-9 w-9 object-contain",
                              isCurrent
                                ? "[filter:brightness(0)_saturate(100%)_invert(28%)_sepia(56%)_saturate(1957%)_hue-rotate(356deg)_brightness(95%)_contrast(91%)]"
                                : "[filter:brightness(0)_saturate(100%)_invert(26%)_sepia(17%)_saturate(1169%)_hue-rotate(72deg)_brightness(90%)_contrast(89%)]",
                            ].join(" ")}
                          />
                        </span>
                      )}
                      <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center">
                        <div
                          className={[
                            "rounded-full border px-3 py-1 text-[10px] font-black tracking-[0.14em] uppercase",
                            isCurrent
                              ? "border-black/20 bg-black/10 text-[#2f2606]/80"
                              : unlocked
                              ? "border-[#c3cf8f] bg-[#f1f7d8] text-[#556045]"
                              : "border-[#97b286]/45 bg-black/20 text-[#d8e8cd]/85",
                          ].join(" ")}
                        >
                          CHAPTER {c.chapter}
                        </div>
                        <div className="mt-2.5 text-[1.5rem] font-black leading-tight phone-lg:text-[1.62rem] xl:mt-3 xl:text-[1.8rem]">
                          {c.theme}
                        </div>
                        <div
                          className={[
                            "mt-2 h-px w-24",
                            isCurrent
                              ? "bg-black/20"
                              : unlocked
                              ? "bg-[#22301b]/15"
                              : "bg-[#d7e7cf]/25",
                          ].join(" ")}
                          aria-hidden
                        />
                      </div>
                      <div className="mt-2 flex w-full justify-center xl:mt-2.5">
                        {isCurrent && (
                          <div className="inline-block rounded-full border border-black/20 bg-black/10 px-3.5 py-0.5 text-[11px] font-black tracking-wide xl:px-4 xl:py-1 xl:text-xs">
                            CURRENT
                          </div>
                        )}

                        {unlocked && !isCurrent && (
                          <div className="inline-block rounded-full border border-[#b9cf7e]/75 bg-[#3f6d37]/90 px-3.5 py-0.5 text-[11px] font-black tracking-wide text-[#eef8d7] xl:px-4 xl:py-1 xl:text-xs">
                            OPEN
                          </div>
                        )}

                        {!unlocked && (
                          <div className="inline-flex rounded-2xl border border-[#9eb88c]/40 bg-black/25 px-3 py-1.5 text-center">
                            <span className="text-[10px] font-bold tracking-wide text-[#e4f0d4] phone-lg:text-[11px]">
                              <span className="font-black text-[#ffe18f]">LOCKED:</span> {lockHint}
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
