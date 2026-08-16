export const BACKGROUND_TRACKS = {
  main: "/assets/audio/learn-malay-ost-01-main-theme.m4a",
  learning: "/assets/audio/learn-malay-ost-02-learning-calm.m4a",
  minigames: "/assets/audio/learn-malay-ost-03-minigames.m4a",
  triumph: "/assets/audio/learn-malay-ost-04-highscore-triumph.m4a",
} as const;

export function getBackgroundAudioSrc(pathname: string | null): string {
  const path = pathname ?? "/";
  if (path === "/minigames/highscores" || path.startsWith("/minigames/highscores/")) {
    return BACKGROUND_TRACKS.triumph;
  }
  if (path === "/minigames" || path.startsWith("/minigames/")) {
    return BACKGROUND_TRACKS.minigames;
  }
  if (path.startsWith("/chapter/")) {
    return BACKGROUND_TRACKS.learning;
  }
  return BACKGROUND_TRACKS.main;
}
