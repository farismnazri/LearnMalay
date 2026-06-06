"use client";

import Image from "next/image";
import type { ChapterFamilyPage, Translated, UiLang } from "@/lib/chapters/types";

function tr(lang: UiLang, text: Translated) {
  return lang === "ms" ? text.ms : lang === "en" ? text.en : text.es;
}

export default function FamilyCard({ page, lang }: { page: ChapterFamilyPage; lang: UiLang }) {
  const titleSub = lang === "ms" ? "" : tr(lang, page.title);
  const people = Object.fromEntries(page.people.map((person) => [person.id, person]));

  function portrait(personId: string, className: string) {
    const person = people[personId];

    return (
      <div className={`shrink-0 overflow-hidden rounded-full bg-amber-50 ${className}`}>
        <Image
          src={person.imageSrc}
          alt={tr(lang, person.imageAlt)}
          width={640}
          height={640}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  function label(personId: string) {
    return <div className="min-w-0 text-base font-black leading-tight text-amber-950">{tr(lang, people[personId].label)}</div>;
  }

  function compactCard(personId: string) {
    return (
      <article className="flex min-w-0 items-center justify-center gap-2 rounded-2xl border border-amber-300/80 bg-gradient-to-b from-amber-50 to-amber-100 p-2 shadow-sm">
        {portrait(personId, "h-14 w-14 sm:h-16 sm:w-16 lg:h-[min(4.25rem,7vw)] lg:w-[min(4.25rem,7vw)]")}
        {label(personId)}
      </article>
    );
  }

  function wideCard(personId: "bapa" | "ibu") {
    const person = people[personId];

    return (
      <article className="flex min-w-0 items-center gap-3 rounded-2xl border border-amber-300/80 bg-gradient-to-b from-amber-50 to-amber-100 p-2.5 shadow-sm">
        {portrait(personId, "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] lg:h-[min(4.75rem,8vw)] lg:w-[min(4.75rem,8vw)]")}
        <div className="min-w-0 flex-1">
          {label(personId)}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {person.alternativeNames?.map((name) => (
              <span
                key={name}
                className="min-w-14 rounded-full border border-amber-300 bg-white/85 px-2 py-1 text-center text-[11px] font-extrabold text-amber-950"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </article>
    );
  }

  function bottomCard(personId: string) {
    return (
      <article className="flex min-w-0 flex-col items-center justify-center rounded-2xl border border-amber-300/80 bg-gradient-to-b from-amber-50 to-amber-100 p-2 shadow-sm">
        {portrait(personId, "h-14 w-14 sm:h-16 sm:w-16 lg:h-[min(4rem,6.5vw)] lg:w-[min(4rem,6.5vw)]")}
        <div className="mt-1.5 text-center">{label(personId)}</div>
      </article>
    );
  }

  return (
    <section className="rounded-3xl bg-white/90 p-4 shadow-xl phone-lg:p-5 sm:p-6">
      <div className="text-xl font-extrabold phone-lg:text-2xl">{page.title.ms}</div>
      {lang !== "ms" && <div className="text-sm font-semibold opacity-70">{titleSub}</div>}

      <div className="mt-5 grid gap-5 lg:grid-cols-2 lg:items-stretch">
        <div className="aspect-square overflow-hidden rounded-3xl border border-amber-300/80 bg-amber-50 p-2 shadow-sm">
          <Image
            src={page.familyImageSrc}
            alt={tr(lang, page.familyImageAlt)}
            width={1200}
            height={1200}
            className="h-full w-full rounded-2xl object-cover"
            priority
          />
        </div>

        <div className="grid gap-3 lg:aspect-square lg:grid-rows-4">
          <div className="grid grid-cols-2 gap-3">
            {compactCard("datuk")}
            {compactCard("nenek")}
          </div>

          {wideCard("bapa")}
          {wideCard("ibu")}

          <div className="grid grid-cols-3 gap-3">
            {bottomCard("abang")}
            {bottomCard("kakak")}
            {bottomCard("saya")}
          </div>
        </div>
      </div>
    </section>
  );
}
