"use client";

import Image from "next/image";
import type { ReactNode } from "react";

const AKUAKU_FEEDBACK_W = 1536;
const AKUAKU_FEEDBACK_H = 1024;

type Props = {
  open: boolean;
  src: string;
  alt?: string;
  fade?: boolean;
  variant?: "popup" | "fullscreen";
  widthClassName?: string;
  imageClassName?: string;
  wrapperClassName?: string;
  contentClassName?: string;
  animation?: "bounce" | "pulse" | "none";
  priority?: boolean;
  children?: ReactNode;
};

export default function AkuAkuFeedbackPopup({
  open,
  src,
  alt = "AkuAku",
  fade = false,
  variant = "popup",
  widthClassName = "w-[180px] phone-lg:w-[220px] tablet:w-[280px]",
  imageClassName = "",
  wrapperClassName = "",
  contentClassName = "",
  animation = "bounce",
  priority = true,
  children,
}: Props) {
  if (!open) return null;

  const wrapperBase =
    variant === "fullscreen"
      ? "pointer-events-none fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300"
      : "pointer-events-none fixed left-1/2 top-1/2 z-50 max-w-[92vw] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300";

  const animClass =
    animation === "bounce" ? "animate-bounce" : animation === "pulse" ? "animate-pulse" : "";

  return (
    <div className={[wrapperBase, fade ? "opacity-0" : "opacity-100", wrapperClassName].join(" ")}>
      <div className={["flex flex-col items-center gap-0", contentClassName].join(" ")}>
        <Image
          src={src}
          alt={alt}
          width={AKUAKU_FEEDBACK_W}
          height={AKUAKU_FEEDBACK_H}
          className={["h-auto", widthClassName, "drop-shadow-lg", animClass, imageClassName].join(" ")}
          priority={priority}
        />
        {children}
      </div>
    </div>
  );
}
