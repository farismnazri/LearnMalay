import type { WordSearchTarget } from "@/lib/chapters/types";

const WORDSEARCH_SEPARATOR_RE = /[\s\-_–—/]+/g;
const WORDSEARCH_SEPARATOR_CHAR_RE = /[\s\-_–—/]/;
const WORDSEARCH_LETTER_RE = /^\p{L}+$/u;

export function normalizeWordSearchWord(raw: string) {
  return raw.trim().toUpperCase().replace(WORDSEARCH_SEPARATOR_RE, "");
}

export function hasWordSearchSeparator(raw: string) {
  return WORDSEARCH_SEPARATOR_CHAR_RE.test(raw);
}

export function isSingleWordSearchEntry(raw: string) {
  const trimmed = raw.trim();
  if (!trimmed || hasWordSearchSeparator(trimmed)) return false;
  const normalized = normalizeWordSearchWord(trimmed);
  return Boolean(normalized) && WORDSEARCH_LETTER_RE.test(normalized);
}

export function isValidWordSearchWord(
  raw: string,
  maxSize: number,
  options?: { singleWordOnly?: boolean }
) {
  const trimmed = raw.trim();
  if (!trimmed) return false;
  if (options?.singleWordOnly && hasWordSearchSeparator(trimmed)) return false;

  const normalized = normalizeWordSearchWord(trimmed);
  if (!normalized || normalized.length > maxSize) return false;

  return WORDSEARCH_LETTER_RE.test(normalized);
}

export function targetWords(target: WordSearchTarget) {
  return "words" in target ? target.words : [target.word];
}

