"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, type UserProfile } from "@/lib/userStore";


function chapterToWorldLevel(chapter: number) {
  // chapter = book "Tema" index (1-based)
  if (chapter <= 4) return { world: 1, level: chapter };
  if (chapter <= 8) return { world: 2, level: chapter - 4 };
  return { world: 3, level: Math.max(1, Math.min(3, chapter - 8)) };
}


export default function TitleScreen() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    getCurrentUser().then((u) => setUser(u));
  }, []);

  const canStart = useMemo(() => Boolean(user), [user]);

  const wl = useMemo(() => {
    const chapter = user?.progress.chapter ?? 1;
    return chapterToWorldLevel(chapter);
  }, [user]);

  async function handleStart() {
    if (starting) return;
    try {
      setStarting(true);
      const current = await getCurrentUser();
      router.push(current ? "/map" : "/user");
    } finally {
      setStarting(false);
    }
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/backgrounds/mainpagebackground.jpg')",
      }}
    >
      {/* subtle scanlines (behind UI) */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20 [background:repeating-linear-gradient(0deg,rgba(0,0,0,0.10)_0px,rgba(0,0,0,0.10)_1px,transparent_2px,transparent_4px)]" />

      {/* TOP-RIGHT USER CARD */}
      <div className="absolute right-6 top-6 z-10 rounded-2xl bg-black/45 p-4 text-left shadow-xl backdrop-blur">
        <div className="text-xs font-semibold text-white/70">PROFILE</div>

        <div className="mt-2 space-y-1 text-sm text-white">
          <div className="flex gap-2">
            <span className="w-16 text-white/70">Name:</span>
            <span className="font-bold">{user ? user.name : "—"}</span>
          </div>

          <div className="flex gap-2">
            <span className="w-16 text-white/70">World:</span>
            <span className="font-bold">{user ? wl.world : "—"}</span>
          </div>

          <div className="flex gap-2">
            <span className="w-16 text-white/70">Level:</span>
            <span className="font-bold">{user ? wl.level : "—"}</span>
          </div>
        </div>

        {!user && (
          <div className="mt-3 text-xs font-semibold text-amber-200">
            Select a user to start.
          </div>
        )}
      </div>

      {/* UI content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 px-6 text-center">
        <header className="space-y-3">
          <h1 className="crash-text crash-outline-fallback text-9xl font-black leading-none">
            LEARN MALAY
          </h1>
        </header>

        <section className="flex w-full max-w-sm flex-col gap-4">
          <button
            type="button"
            onClick={() => void handleStart()}
            disabled={starting}
            className={[
              "w-full rounded-3xl px-6 py-5 text-3xl font-extrabold shadow-xl transition",
              "active:scale-[0.97] hover:scale-[1.02]",
              starting ? "cursor-wait bg-orange-500/70 opacity-80" : "bg-orange-500",
            ].join(" ")}
            title={canStart ? "Continue to map" : "Go to login / create user"}
          >
            <span className="crash-text crash-outline-fallback">{starting ? "..." : "START"}</span>
          </button>

          <Link
            href="/user"
            className="w-full rounded-3xl bg-amber-300 px-6 py-5 text-3xl font-extrabold shadow-xl transition active:scale-[0.97] hover:scale-[1.02]"
          >
            <span className="crash-text crash-outline-fallback">SELECT USER</span>
          </Link>
        </section>
      </div>

      <footer className="absolute bottom-6 left-0 right-0 z-10 text-center">
        <p className="crash-text crash-outline-fallback text-lg font-extrabold">
          By Faris Nazri
        </p>
      </footer>
    </main>
  );
}
