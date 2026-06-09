"use client";

import Image from "next/image";
import type { ChapterChatPage, Translated, UiLang } from "@/lib/chapters";

type ChatCardProps = {
  page: ChapterChatPage;
  lang: UiLang;
  userName: string;
  userAvatarSrc: string;
};

export default function ChatCard({
  page,
  lang,
  userName,
  userAvatarSrc,
}: ChatCardProps) {
  const titleTrans = lang === "ms" ? "" : lang === "en" ? page.title.en : page.title.es;
  const contextTrans = !page.context ? "" : lang === "ms" ? "" : lang === "en" ? page.context.en : page.context.es;

  const youId = page.youId ?? "azman";
  const participantsById = new Map(page.participants.map((participant) => [participant.id, participant]));

  function msgText(t: Translated) {
    if (lang === "ms") return { main: t.ms, sub: "" };
    const sub = lang === "en" ? t.en : t.es;
    return { main: t.ms, sub };
  }

  function tr(t: Translated) {
    return lang === "ms" ? t.ms : lang === "en" ? t.en : t.es;
  }

  function initials(name: string) {
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
  }

  return (
    <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
      <div className="text-2xl font-extrabold">{page.title.ms}</div>
      {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{titleTrans}</div>}

      {page.context && (
        <div className="mt-3 rounded-2xl bg-black/5 p-4">
          <div className="text-sm font-extrabold">{page.context.ms}</div>
          {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{contextTrans}</div>}
        </div>
      )}

      <div className="mt-5 space-y-3">
        {page.messages.map((m) => {
          const speaker = participantsById.get(m.from);
          const isRight = speaker?.side ? speaker.side === "right" : m.from === youId;
          const isAux = speaker?.tone === "aux";
          const speakerName = speaker ? tr(speaker.name) : m.from === youId ? userName : "Speaker";
          const speakerAvatar = speaker?.avatarSrc ?? (m.from === youId ? userAvatarSrc : undefined);

          const { main, sub } = msgText(m.text);

          return (
            <div key={m.id} className={`flex items-end gap-2 ${isRight ? "justify-end" : "justify-start"}`}>
              {!isRight && (
                <div className="h-10 w-10 overflow-hidden rounded-full bg-white shadow">
                  {speakerAvatar ? (
                    <Image
                      src={speakerAvatar}
                      alt={speakerName}
                      width={40}
                      height={40}
                      className="h-10 w-10 bg-[#fbf5df] object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center text-xs font-black">
                      {initials(speakerName) || "?"}
                    </div>
                  )}
                </div>
              )}

              <div
                className={[
                  "max-w-[78%] rounded-2xl px-4 py-3 shadow",
                  isAux ? "bg-sky-200/80 text-black" : isRight ? "bg-amber-200 text-black" : "bg-white text-black",
                ].join(" ")}
              >
                <div className="text-[10px] font-black opacity-50">{speakerName.toUpperCase()}</div>

                <div className="mt-1 whitespace-pre-line text-sm font-extrabold">{main}</div>
                {lang !== "ms" && <div className="mt-1 whitespace-pre-line text-xs font-semibold opacity-70">{sub}</div>}
              </div>

              {isRight && (
                <div className="h-10 w-10 overflow-hidden rounded-full bg-white shadow">
                  <Image
                    src={speakerAvatar ?? userAvatarSrc}
                    alt={speakerName}
                    width={40}
                    height={40}
                    className="h-10 w-10 object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
