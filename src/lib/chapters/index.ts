export * from "./types";
import { chapter01 } from "./chapter-01";
import { chapter02 } from "./chapter-02";
import { chapter03 } from "./chapter-03";
import { chapter04 } from "./chapter-04";
import { chapter05 } from "./chapter-05";
import { chapter06 } from "./chapter-06";
import { chapter07 } from "./chapter-07";
import { chapter08 } from "./chapter-08";
import { chapter09 } from "./chapter-09";
import { chapter10 } from "./chapter-10";
import { chapter11 } from "./chapter-11";

export const MIN_CHAPTER_ID = 1;
export const MAX_CHAPTER_ID = 11;
export { chapter01, chapter02, chapter03, chapter04, chapter05, chapter06, chapter07, chapter08, chapter09, chapter10, chapter11 };

export const CHAPTERS = [
  chapter01,
  chapter02,
  chapter03,
  chapter04,
  chapter05,
  chapter06,
  chapter07,
  chapter08,
  chapter09,
  chapter10,
  chapter11,
] as const;

export function getChapterById(id: number) {
  return CHAPTERS.find((chapter) => chapter.id === id) ?? null;
}
