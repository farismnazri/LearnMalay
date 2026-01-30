"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getCurrentUser,
  setCurrentUserId,
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

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const chapters = useMemo(() => buildChapters(), []);
  const currentChapter = user?.progress.chapter ?? 0;

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-200 via-sky-200 to-amber-200 px-6 py-10">
        <div className="mx-auto max-w-xl rounded-2xl bg-white/80 p-6 shadow">
          <h1 className="crash-text crash-outline-fallback text-5xl font-black">
            WORLD MAP
          </h1>
          <p className="mt-4 text-sm font-semibold text-black/70">
            You need to select a user first.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/user"
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow"
            >
              Go to Select User
            </Link>
            <Link
              href="/"
              className="rounded-xl bg-white px-4 py-2 text-sm font-bold shadow"
            >
              Back to Title
            </Link>
          </div>
        </div>
      </main>
    );
  }

  function selectChapter(chapter: number) {
    const userId = user?.id;
    if (!userId) return;

    const raw = window.localStorage.getItem("learnMalay.users.v1");
    if (!raw) return;

    const users = JSON.parse(raw) as Record<string, UserProfile>;
    const u = users[userId];
    if (!u) return;

    u.progress.chapter = chapter;
    users[userId] = u;

    window.localStorage.setItem("learnMalay.users.v1", JSON.stringify(users));

    setCurrentUserId(userId);
    setUser({ ...u });

    router.push(`/chapter/${chapter}`);
  }

  const isAdmin = Boolean(user.isAdmin);
  const maxUnlockedChapter = isAdmin ? 11 : currentChapter;

  return (
    <main
      className="relative min-h-screen bg-cover bg-center px-6 py-10"
      style={{
        backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative mx-auto max-w-5xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="crash-text crash-outline-fallback text-6xl font-black">
              WORLD MAP
            </h1>
            <p className="mt-2 text-sm font-semibold text-white/90">
              User: <span className="font-bold">{user.name}</span>
              {isAdmin && (
                <span className="ml-2 rounded-full bg-red-600 px-2 py-1 text-xs font-black text-white">
                  ADMIN
                </span>
              )}{" "}
              • Current Chapter: <span className="font-bold">{currentChapter}</span>
            </p>
          </div>

          {/* TOP RIGHT BUTTONS */}
          <div className="flex gap-2">
            <Link
              href="/minigames"
              className="rounded-xl bg-amber-300 px-4 py-2 text-sm font-black shadow transition hover:scale-[1.01] active:scale-[0.98]"
            >
              Mini Games
            </Link>

            <Link
              href="/"
              className="rounded-xl bg-white/80 px-4 py-2 text-sm font-bold shadow transition hover:scale-[1.01] active:scale-[0.98]"
            >
              Back
            </Link>
          </div>
        </div>

        {[1, 2, 3].map((w) => {
          const worldChapters = chapters.filter((c) => c.world === w);

          return (
            <section key={w} className="mt-10">
              <h2 className="crash-text crash-outline-fallback text-4xl font-black">
                WORLD {w}
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {worldChapters.map((c) => {
                  const unlocked = c.chapter <= maxUnlockedChapter;
                  const isCurrent = c.chapter === currentChapter;

                  return (
                    <button
                      key={c.chapter}
                      disabled={!unlocked}
                      onClick={() => selectChapter(c.chapter)}
                      className={[
                        "rounded-2xl p-5 text-left shadow-xl transition",
                        "active:scale-[0.98]",
                        unlocked
                          ? "hover:scale-[1.01]"
                          : "cursor-not-allowed opacity-50",
                        isCurrent ? "bg-amber-300" : "bg-white/85",
                      ].join(" ")}
                      title={
                        unlocked
                          ? `Go to Chapter ${c.chapter}`
                          : `Locked until you reach Chapter ${c.chapter}`
                      }
                    >
                      <div className="text-xs font-semibold opacity-70">
                        CHAPTER
                      </div>
                      <div className="mt-1 text-2xl font-extrabold">
                        {c.chapter}
                      </div>
                      <div className="mt-2 text-sm font-semibold opacity-70">
                        World {c.world} • Level {c.level}
                      </div>

                      {isCurrent && (
                        <div className="mt-3 inline-block rounded-full bg-black/10 px-3 py-1 text-xs font-bold">
                          CURRENT
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