"use client";

import Image from "next/image";
import Link from "next/link";

export type IconActionKind = "home" | "map" | "minigames" | "highscores" | "start-game" | "restart";

type IconActionBaseProps = {
  kind: IconActionKind;
  tooltip: string;
  className?: string;
  iconClassName?: string;
};

type IconActionLinkProps = IconActionBaseProps & {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type IconActionButtonProps = Omit<IconActionBaseProps, "href"> & {
  href?: never;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

type IconActionProps = IconActionLinkProps | IconActionButtonProps;

const ICONS: Record<
  IconActionKind,
  {
    src: string;
    width: number;
    height: number;
  }
> = {
  home: { src: "/assets/borders/IconsButtons_Home.svg", width: 36, height: 36 },
  map: { src: "/assets/borders/IconsButtons_Map.svg", width: 36, height: 36 },
  minigames: { src: "/assets/borders/IconsButtons_Minigames.svg", width: 36, height: 36 },
  highscores: { src: "/assets/borders/IconsButtons_Highscore.svg", width: 36, height: 36 },
  "start-game": { src: "/assets/borders/IconsButtons_StartGame.svg", width: 81, height: 36 },
  restart: { src: "/assets/borders/IconsButtons_Restart.svg", width: 117, height: 36 },
};

export default function IconActionLink({
  kind,
  tooltip,
  className = "",
  iconClassName = "",
  ...props
}: IconActionProps) {
  const icon = ICONS[kind];

  const rootClassName = [
    "group touch-target relative inline-flex items-center justify-center transition hover:-translate-y-0.5 focus-visible:outline-none",
    className,
  ].join(" ");

  const content = (
    <>
      <Image
        src={icon.src}
        alt=""
        aria-hidden="true"
        width={icon.width}
        height={icon.height}
        className={[
          "select-none object-contain drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]",
          iconClassName,
        ].join(" ")}
      />

      <span className="pointer-events-none absolute left-1/2 top-full z-30 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[11px] font-bold text-white opacity-0 shadow transition group-hover:opacity-100 group-focus-visible:opacity-100">
        {tooltip}
      </span>
    </>
  );

  if ("onClick" in props) {
    return (
      <button
        type={props.type ?? "button"}
        onClick={props.onClick}
        disabled={props.disabled}
        title={tooltip}
        aria-label={tooltip}
        className={[
          rootClassName,
          props.disabled ? "cursor-not-allowed opacity-55" : "",
        ].join(" ")}
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={props.href} title={tooltip} aria-label={tooltip} className={rootClassName}>
      {content}
    </Link>
  );
}
