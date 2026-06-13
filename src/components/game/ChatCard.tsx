"use client";

import Image from "next/image";
import type { ChapterChatPage, Translated, UiLang } from "@/lib/chapters";

const AKU_AKU_IDLE_SRC = "/assets/characters/Akuaku_idle.png";
const CURRENT_USERNAME_TOKEN = "{currentUsername}";

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
  const participantsById = new Map(page.participants.map((participant) => [participant.id, participant]));

  function resolvedUserName(textLang: UiLang) {
    const cleanUserName = userName.trim();
    if (cleanUserName) return cleanUserName;
    if (textLang === "en") return "Learner";
    if (textLang === "es") return "Estudiante";
    return "Pelajar";
  }

  function interpolate(text: string, textLang: UiLang) {
    return text.replaceAll(CURRENT_USERNAME_TOKEN, () => resolvedUserName(textLang));
  }

  function msgText(t: Translated) {
    const main = interpolate(t.ms, "ms");
    if (lang === "ms") return { main, sub: "" };
    return { main, sub: interpolate(lang === "en" ? t.en : t.es, lang) };
  }

  function tr(t: Translated) {
    return interpolate(lang === "ms" ? t.ms : lang === "en" ? t.en : t.es, lang);
  }

  const titleTrans = lang === "ms" ? "" : tr(page.title);
  const contextMain = page.context ? interpolate(page.context.ms, "ms") : "";
  const contextTrans = !page.context || lang === "ms" ? "" : tr(page.context);

  return (
    <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
      <div className="text-2xl font-extrabold">{interpolate(page.title.ms, "ms")}</div>
      {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{titleTrans}</div>}

      {page.context && (
        <div className="mt-3 rounded-2xl bg-black/5 p-4">
          <div className="text-sm font-extrabold">{contextMain}</div>
          {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{contextTrans}</div>}
        </div>
      )}

      <div className="mt-5 space-y-3">
        {page.messages.map((m) => {
          const speaker = participantsById.get(m.from);
          const isUser = m.from === "me";
          const isRight = isUser || speaker?.alignment === "learner-side";
          const isAux = speaker?.tone === "aux";
          const speakerName = isUser ? resolvedUserName(lang) : speaker ? tr(speaker.name) : "Speaker";

          const { main, sub } = msgText(m.text);

          return (
            <div key={m.id} className={`flex items-end gap-2 ${isRight ? "justify-end" : "justify-start"}`}>
              {!isRight && (
                <div className="h-10 w-10 overflow-hidden rounded-full bg-white shadow">
                  <Image
                    src={AKU_AKU_IDLE_SRC}
                    alt="Aku Aku"
                    width={40}
                    height={40}
                    className="h-10 w-10 bg-[#fbf5df] object-contain"
                  />
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
                    src={isUser ? userAvatarSrc : AKU_AKU_IDLE_SRC}
                    alt={isUser ? speakerName : "Aku Aku"}
                    width={40}
                    height={40}
                    className={`h-10 w-10 ${isUser ? "object-cover" : "bg-[#fbf5df] object-contain"}`}
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
