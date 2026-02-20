"use client";

import DomeGallery from "./DomeGallery";
import type { ChapterPage, Translated, UiLang } from "@/lib/chapters";

type FoodIntroPage = Extract<ChapterPage, { kind: "foodintro" }>;

function tr(text: Translated, lang: UiLang): string {
  if (lang === "en") return text.en;
  if (lang === "es") return text.es;
  return text.ms;
}

export default function FoodIntroCard({ page, lang }: { page: FoodIntroPage; lang: UiLang }) {
  const introTrans = lang === "ms" ? "" : tr(page.intro, lang);

  const galleryImages = page.galleryImages.map((image) => ({
    src: image.src,
    alt: tr(image.alt, lang),
  }));

  return (
    <section className="space-y-4 phone-lg:space-y-5">
      <div>
        <p className="whitespace-pre-line text-sm font-extrabold text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.85)] phone-lg:text-base sm:text-lg">
          {page.intro.ms}
        </p>
        {lang !== "ms" && (
          <p className="mt-2 whitespace-pre-line text-sm font-semibold text-white/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {introTrans}
          </p>
        )}
      </div>

      {page.sections.length > 0 && (
        <div className="grid gap-3 tablet:grid-cols-3">
          {page.sections.map((section) => (
            <article key={section.id} className="rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur-[2px]">
              <div className="text-sm font-black tracking-wide">{section.heading.ms}</div>
              {lang !== "ms" && <div className="text-xs font-semibold opacity-70">{tr(section.heading, lang)}</div>}

              <p className="mt-2 whitespace-pre-line text-sm font-extrabold">{section.body.ms}</p>
              {lang !== "ms" && <p className="mt-1 whitespace-pre-line text-xs font-semibold opacity-70">{tr(section.body, lang)}</p>}
            </article>
          ))}
        </div>
      )}

      <div className="h-[46vh] min-h-[320px] max-h-[560px] w-full phone-lg:h-[52vh] sm:h-[58vh] md:h-[64vh]">
        <DomeGallery
          images={galleryImages}
          fit={0.55}
          minRadius={220}
          maxVerticalRotationDeg={11}
          segments={24}
          dragDampening={5}
          grayscale={false}
          showOverlayEffects={false}
          autoRotate
          autoRotateSpeedDegPerSec={8}
          openedImageWidth="min(88vw, 380px)"
          openedImageHeight="min(88vw, 380px)"
        />
      </div>
    </section>
  );
}
