"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BackgroundAudioControls } from "@/components/game/BackgroundAudio";
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
  const [ackOpen, setAckOpen] = useState(false);

  useEffect(() => {
    getCurrentUser().then((u) => setUser(u));
  }, []);

  const canStart = useMemo(() => Boolean(user), [user]);

  const wl = useMemo(() => {
    const chapter = user?.progress.chapter ?? 1;
    return chapterToWorldLevel(chapter);
  }, [user]);
  const plankBgStyle = { backgroundImage: "url('/assets/borders/woodplankuser.webp')" };

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

      <div className="safe-corner-top-right absolute z-20 rounded-2xl bg-white/85 p-3 shadow backdrop-blur">
        <BackgroundAudioControls />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center px-4 pb-[max(1.5rem,var(--safe-area-bottom))] pt-[max(6.5rem,var(--safe-area-top))] text-center phone-lg:px-6 phone-lg:pt-[max(8rem,var(--safe-area-top))]">
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
            className="relative mx-auto mt-7 flex w-full max-w-[820px] items-center justify-center overflow-hidden rounded-2xl bg-[length:50%_100%] bg-center bg-no-repeat px-3 py-4 shadow-xl phone-lg:px-4 phone-lg:py-5"
            style={plankBgStyle}
          >
            <div className="absolute inset-0 bg-[#000000]/0" />
            <div className="relative z-10 flex w-full items-center justify-center gap-3">
              <Image
                src={getProfileAvatarSrc(user?.avatarId)}
                alt="User icon"
                width={56}
                height={56}
                className="h-11 w-11 rounded-full border-2 border-[#f2cc87]/80 bg-white/95 object-cover shadow-lg phone-lg:h-12 phone-lg:w-12"
              />

              <div className="min-w-0 text-left text-[#000000]">
                <div className="truncate text-sm font-black tracking-wide phone-lg:text-base">
                  {user ? user.name : "NO USER SELECTED"}
                </div>
                <div className="mt-1 text-[11px] font-black tracking-[0.16em] text-[#000000] phone-lg:text-xs">
                  WORLD {user ? wl.world : "-"}   LEVEL {user ? wl.level : "-"}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-6 flex w-full max-w-[980px] flex-col items-stretch justify-center gap-3 phone-lg:mt-8 phone-lg:flex-row phone-lg:items-start phone-lg:gap-4">
          <button
            type="button"
            onClick={() => void handleStart()}
            disabled={starting}
            className={[
              "touch-target-comfort relative w-full transition duration-150 phone-lg:w-[46%] phone-lg:max-w-[430px]",
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
            className="touch-target-comfort relative w-full transition duration-150 hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.985] phone-lg:w-[46%] phone-lg:max-w-[430px]"
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

      <footer className="absolute bottom-[max(1.25rem,var(--safe-area-bottom))] left-0 right-0 z-10 px-4 text-center">
        <p className="text-xs font-black tracking-[0.22em] text-[#f8efcb]/88">By FN for NF ❤︎</p>

        <div className="mx-auto mt-2 w-full max-w-[56rem]">
          <div className="rounded-2xl bg-[#efe2bf]/82 shadow-[0_8px_20px_rgba(11,30,20,0.2)] ring-1 ring-[#203428]/30 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setAckOpen((open) => !open)}
              aria-expanded={ackOpen}
              aria-controls="title-screen-acknowledgement"
              className="w-full px-2 py-2 text-center text-[10px] font-medium leading-[1.45] text-[#2c392f] transition duration-200 active:scale-[0.995] sm:px-3 sm:text-[10.5px] md:px-4 md:text-[11px] md:leading-[1.35] md:whitespace-nowrap"
            >
              Acknowledgement: This app and its lesson flow were inspired by Bahasa Melayu untuk
              Penutur Asing: Tahap Asas by Yusmaniza Mohd Yusoff.
            </button>

            <div
              id="title-screen-acknowledgement"
              className={[
                "grid px-4 transition-[grid-template-rows,opacity,padding] duration-300 ease-out",
                ackOpen ? "grid-rows-[1fr] pb-3 opacity-100" : "grid-rows-[0fr] pb-0 opacity-0",
              ].join(" ")}
            >
              <div className="overflow-hidden">
                <div className="border-t border-[#7d8d75]/35 pt-2 text-[11px] leading-[1.5] text-[#2f3f34]/90">
                  Acknowledgement: This app was developed independently as a supplementary practice
                  tool for Malay learners. Its lesson flow was inspired by Bahasa Melayu untuk
                  Penutur Asing: Tahap Asas by Yusmaniza Mohd Yusoff. All rights to the original
                  book, its contents, and its teaching materials remain with the respective author
                  and publisher. This app is not affiliated with, endorsed by, or published by
                  them. Users are encouraged to refer to the original author and source material
                  here:{" "}
                  <a
                    href="https://anyflip.com/qivri/smcl/basic"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-[#214e37] underline decoration-[#b4882a] decoration-2 underline-offset-2"
                  >
                    View the original publication
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
