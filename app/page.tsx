"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, type UserProfile } from "@/lib/userStore";
import { getProfileAvatarSrc } from "@/lib/profileAvatars";


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
  const plankBgStyle = { backgroundImage: "url('/assets/borders/woodplankuser.webp')" };
  const gapUnitPx = 30;
  const topGapPx = gapUnitPx * 7;

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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,221,111,0.2)_0%,rgba(255,221,111,0.06)_35%,transparent_58%),linear-gradient(180deg,rgba(6,20,14,0.24)_0%,rgba(8,24,17,0.55)_45%,rgba(9,23,18,0.76)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20 [background:repeating-linear-gradient(0deg,rgba(0,0,0,0.18)_0px,rgba(0,0,0,0.18)_1px,transparent_2px,transparent_4px)]" />

      <div
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center px-6 text-center"
        style={{ paddingTop: topGapPx }}
      >
        <header className="w-full">
          <Image
            src="/assets/titles/learnmalay_title.webp"
            alt="Learn Malay"
            width={1536}
            height={1024}
            priority
            className="title-drop-bounce mx-auto h-auto w-[min(86vw,720px)] select-none"
          />

          <div
            className="relative mx-auto flex w-full max-w-[820px] items-center justify-center overflow-hidden rounded-2xl bg-[length:50%_100%] bg-center bg-no-repeat px-4 py-5 shadow-xl"
            style={{ ...plankBgStyle, marginTop: gapUnitPx }}
          >
            <div className="absolute inset-0 bg-[#000000]/0" />
            <div className="relative z-10 flex w-full items-center justify-center gap-3">
              <Image
                src={getProfileAvatarSrc(user?.avatarId)}
                alt="User icon"
                width={56}
                height={56}
                className="h-12 w-12 rounded-full border-2 border-[#f2cc87]/80 bg-white/95 object-cover shadow-lg"
              />

              <div className="min-w-0 text-left text-[#000000]">
                <div className="truncate text-base font-black tracking-wide">{user ? user.name : "NO USER SELECTED"}</div>
                <div className="mt-1 text-xs font-black tracking-[0.16em] text-[#000000]">
                  WORLD {user ? wl.world : "-"}   LEVEL {user ? wl.level : "-"}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          className="flex w-full max-w-[980px] items-start justify-center gap-1 sm:gap--60"
          style={{ marginTop: 30 }}
        >
          <button
            type="button"
            onClick={() => void handleStart()}
            disabled={starting}
            className={[
              "relative w-[46%] max-w-[430px] transition duration-150",
              "active:scale-[0.985] hover:-translate-y-0.5 hover:brightness-105",
              starting ? "cursor-wait opacity-75" : "",
            ].join(" ")}
            title={canStart ? "Continue to map" : "Go to login / create user"}
            aria-label={starting ? "Loading" : "Start"}
          >
            <Image
              src="/assets/titles/Start_Title.webp"
              alt={starting ? "Loading" : "Start"}
              width={1536}
              height={1024}
              priority
              className="h-auto w-full select-none drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)]"
            />
          </button>

          <Link
            href="/user"
            className="relative w-[46%] max-w-[430px] transition duration-150 hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.985]"
            aria-label="Select User"
          >
            <Image
              src="/assets/titles/select_user.webp"
              alt="Select User"
              width={1536}
              height={1024}
              priority
              className="h-auto w-full select-none drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)]"
            />
          </Link>
        </section>
      </div>

      <footer className="absolute bottom-6 left-0 right-0 z-10 text-center">
        <p className="text-xs font-black tracking-[0.22em] text-[#f8efcb]/88">By Faris, dedicated to my wife, Natth</p>
      </footer>
    </main>
  );
}
