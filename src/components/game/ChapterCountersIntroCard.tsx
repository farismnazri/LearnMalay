"use client";

import Image from "next/image";

import type { ChapterPage, ChapterSection, Translated, UiLang } from "@/lib/chapters";

function tr(text: Translated, lang: UiLang) {
  return lang === "en" ? text.en : lang === "es" ? text.es : text.ms;
}

type ListSection = Extract<ChapterSection, { kind: "list" }>;

const SECTION_META = {
  "kaunter-utama": {
    badge: { ms: "Guna selalu", en: "Use often", es: "Usa a menudo" },
    iconBg: "bg-[#ffb11a]",
    iconFg: "text-white",
    cardGrid: "lg:grid-cols-3",
    cardSize: "large" as const,
  },
  "kaunter-tambahan": {
    badge: { ms: "Kenal juga", en: "Know these too", es: "Conoce estos también" },
    iconBg: "bg-[#8b5be3]",
    iconFg: "text-white",
    cardGrid: "lg:grid-cols-4",
    cardSize: "small" as const,
  },
} satisfies Record<
  string,
  {
    badge: Translated;
    iconBg: string;
    iconFg: string;
    cardGrid: string;
    cardSize: "large" | "small";
  }
>;

const ESSENTIAL_CARD_TONES = [
  {
    border: "border-[#f0b64d]",
    badge: "bg-[#ff8a00]",
    iconWrap: "bg-[#ff9d08]",
    glow: "from-[#fff5dd] via-[#fff7ee] to-[#fff4dd]",
    accent: "text-[#f4d98e]",
    art: "sparkle",
  },
  {
    border: "border-[#82aff8]",
    badge: "bg-[#3d82f1]",
    iconWrap: "bg-[#2f7bf0]",
    glow: "from-[#eef5ff] via-[#f8fbff] to-[#edf5ff]",
    accent: "text-[#d6e8ff]",
    art: "swirl",
  },
  {
    border: "border-[#89c86d]",
    badge: "bg-[#55a93d]",
    iconWrap: "bg-[#59b13e]",
    glow: "from-[#f2fbeb] via-[#f9fdf4] to-[#eef9e7]",
    accent: "text-[#d4efc4]",
    art: "burst",
  },
] as const;

const ADDITIONAL_CARD_TONES = [
  { border: "border-[#8ad3d5]", badge: "bg-[#8456d8]", iconWrap: "bg-[#24b4ac]", tint: "from-[#f4ffff] to-[#effbff]" },
  { border: "border-[#ccb0f3]", badge: "bg-[#8456d8]", iconWrap: "bg-[#7d50ea]", tint: "from-[#fbf7ff] to-[#f7f1ff]" },
  { border: "border-[#efb3d5]", badge: "bg-[#8456d8]", iconWrap: "bg-[#e14d8e]", tint: "from-[#fff7fc] to-[#fff2f9]" },
  { border: "border-[#d8b9f1]", badge: "bg-[#8456d8]", iconWrap: "bg-[#8cc72d]", tint: "from-[#fcf9ff] to-[#f9f3ff]" },
] as const;

export default function ChapterCountersIntroCard({
  page,
  lang,
}: {
  page: Extract<ChapterPage, { kind: "intro" }>;
  lang: UiLang;
}) {
  const sections = page.sections.filter((section): section is ListSection => section.kind === "list");

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,255,255,0.9))] p-4 shadow-[0_18px_40px_rgba(13,33,61,0.25)] backdrop-blur-sm sm:p-6">
      <div className="grid gap-6">
        {sections.map((section, sectionIndex) => {
          const meta = section.id === "kaunter-utama" ? SECTION_META["kaunter-utama"] : SECTION_META["kaunter-tambahan"];
          const isEssential = meta.cardSize === "large";

          return (
            <section
              key={section.id}
              className={[
                "rounded-[1.7rem] border px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_24px_rgba(116,90,168,0.12)] sm:px-5",
                sectionIndex === 0 ? "border-transparent bg-transparent p-0 shadow-none" : "border-[#e5d8f9] bg-[rgba(252,247,255,0.92)]",
              ].join(" ")}
            >
              <div className="flex flex-wrap items-center gap-3">
                <div className={`grid h-10 w-10 place-items-center rounded-full ${meta.iconBg} ${meta.iconFg} shadow-[0_6px_14px_rgba(0,0,0,0.12)]`}>
                  <SectionStar />
                </div>
                <h2 className="text-[1.75rem] font-black tracking-[-0.03em] text-[#1f1f26]">{tr(section.title, lang)}</h2>
                <span
                  className={[
                    "inline-flex items-center rounded-full border px-3 py-1 text-sm font-black",
                    section.id === "kaunter-utama"
                      ? "border-[#ff9d4a] bg-[#fff4eb] text-[#ff6d00]"
                      : "border-[#bda3ec] bg-[#f5efff] text-[#7b57d1]",
                  ].join(" ")}
                >
                  {tr(meta.badge, lang)}
                </span>
              </div>

              <div className={`mt-5 grid gap-4 ${isEssential ? "md:grid-cols-2" : "sm:grid-cols-2"} ${meta.cardGrid}`}>
                {section.items.map((item, index) => {
                  const essentialTone = ESSENTIAL_CARD_TONES[index % ESSENTIAL_CARD_TONES.length];
                  const additionalTone = ADDITIONAL_CARD_TONES[index % ADDITIONAL_CARD_TONES.length];
                  const borderClass = isEssential ? essentialTone.border : additionalTone.border;
                  const badgeClass = isEssential ? essentialTone.badge : additionalTone.badge;
                  const iconWrapClass = isEssential ? essentialTone.iconWrap : additionalTone.iconWrap;
                  const backgroundClass = isEssential ? essentialTone.glow : additionalTone.tint;
                  const alt = item.imageAlt ? tr(item.imageAlt, lang) : tr(item, lang);
                  const label = tr(item, lang);
                  const [titleMs, bodyMs = ""] = item.ms.split(" — ");

                  return (
                    <article
                      key={item.id}
                      className={[
                        "relative overflow-hidden rounded-[1.65rem] border bg-gradient-to-br shadow-[0_10px_25px_rgba(40,40,68,0.08)]",
                        borderClass,
                        isEssential ? `${backgroundClass} min-h-[208px] px-6 py-5` : `${backgroundClass} min-h-[168px] px-5 py-4`,
                      ].join(" ")}
                    >
                      <div className={`absolute left-4 top-4 grid ${isEssential ? "h-10 w-10 text-xl" : "h-9 w-9 text-lg"} place-items-center rounded-full ${badgeClass} font-black text-white shadow-[0_6px_14px_rgba(0,0,0,0.15)]`}>
                        {index + 1}
                      </div>

                      {isEssential ? (
                        <EssentialCardDecor art={essentialTone.art} accentClass={essentialTone.accent} />
                      ) : (
                        <SmallCardDecor accentClass={additionalTone.border} />
                      )}

                      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                        <div
                          className={[
                            "grid place-items-center rounded-full text-white shadow-[0_10px_20px_rgba(0,0,0,0.12)]",
                            iconWrapClass,
                            isEssential ? "h-20 w-20" : "h-16 w-16",
                          ].join(" ")}
                        >
                          {item.imageSrc ? (
                            <Image
                              src={item.imageSrc}
                              alt={alt}
                              width={isEssential ? 46 : 38}
                              height={isEssential ? 46 : 38}
                              className={isEssential ? "h-11 w-11 object-contain" : "h-9 w-9 object-contain"}
                              draggable={false}
                            />
                          ) : null}
                        </div>

                        <div className={isEssential ? "mt-5 max-w-[16rem]" : "mt-4 max-w-[16rem]"}>
                          <div className={`${isEssential ? "text-[1.02rem]" : "text-[0.98rem]"} font-black leading-tight text-[#1f1f26]`}>
                            {titleMs}
                          </div>
                          <div className={`mt-2 ${isEssential ? "text-[0.95rem]" : "text-[0.92rem]"} font-semibold leading-snug text-[#23232b]`}>
                            — {bodyMs}
                          </div>
                          {lang !== "ms" && (
                            <div className="mt-3 text-xs font-bold leading-snug text-[#4e4d5a]/75">{label}</div>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}

function SectionStar() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M10 1.8l2.33 4.73 5.22.76-3.77 3.67.89 5.19L10 13.7l-4.67 2.45.89-5.19L2.45 7.29l5.22-.76L10 1.8Z" />
    </svg>
  );
}

function EssentialCardDecor({
  art,
  accentClass,
}: {
  art: "sparkle" | "swirl" | "burst";
  accentClass: string;
}) {
  if (art === "sparkle") {
    return (
      <>
        <span className={`absolute right-8 top-[4.6rem] text-[2.1rem] ${accentClass}`}>★</span>
        <span className={`absolute left-10 top-16 text-sm ${accentClass}`}>✦</span>
        <span className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-white/35 blur-xl" />
        <span className="absolute bottom-2 right-8 h-16 w-24 rounded-full bg-white/25 blur-2xl" />
      </>
    );
  }

  if (art === "swirl") {
    return (
      <>
        <span className={`absolute right-8 top-8 text-[3rem] ${accentClass} opacity-70`}>◜</span>
        <span className={`absolute right-12 top-20 text-[2.5rem] ${accentClass} opacity-70`}>◝</span>
        <span className="absolute bottom-3 left-8 h-12 w-28 rounded-full bg-white/30 blur-2xl" />
      </>
    );
  }

  return (
    <>
      <span className={`absolute right-10 top-16 text-2xl ${accentClass}`}>✳</span>
      <span className={`absolute left-8 top-[6.2rem] text-xl ${accentClass}`}>✳</span>
      <span className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-white/30 blur-xl" />
      <span className="absolute bottom-2 right-12 h-12 w-20 rounded-full bg-white/20 blur-xl" />
    </>
  );
}

function SmallCardDecor({ accentClass }: { accentClass: string }) {
  return (
    <>
      <span className={`absolute right-4 top-4 h-8 w-8 rounded-full border bg-white/20 ${accentClass}`} />
      <span className="absolute bottom-0 right-0 h-16 w-16 rounded-full bg-white/20 blur-xl" />
    </>
  );
}
