"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { UiLang } from "@/lib/chapters";
import { addHighScore } from "@/lib/highscores";
import {
  SHOPPING_DIFFICULTIES,
  SHOPPING_ITEMS_BY_THEME,
  SHOPPING_THEMES,
  type ShoppingDifficultyId,
  type ShoppingItem,
  type ShoppingThemeId,
} from "@/lib/misiMembeli/items";
import { isMinigameUnlocked, MINIGAME_PREREQUISITES } from "@/lib/minigameUnlocks";
import { getCurrentUser, type ProfileAvatarId, type UserProfile } from "@/lib/userStore";
import { BackgroundAudioControls } from "@/components/game/BackgroundAudio";
import IconActionLink from "@/components/navigation/IconActionLink";

const UI_LANG_KEY = "learnMalay.uiLang.v1";
const AKU2_IDLE_SRC = "/assets/characters/Akuaku_idle.png";
const AKU2_SALAH_SRC = "/assets/characters/Akuaku_Salah.webp";
const MAX_LIVES = 5;

const EASY_CONFIG = SHOPPING_DIFFICULTIES.easy;
const MEDIUM_CONFIG = SHOPPING_DIFFICULTIES.medium;
const HARD_CONFIG = SHOPPING_DIFFICULTIES.hard;

type Translated = { ms: string; en: string; es: string };

type SpotSlot = { x: number; y: number; size: number };
type ThemeRegion = { xMin: number; xMax: number; yMin: number; yMax: number };

type BoardEntry = {
  item: ShoppingItem;
  slot: SpotSlot;
};

type ShoppingRound = {
  listItems: ShoppingItem[];
  boardEntries: BoardEntry[];
  sceneTopThemeId: ShoppingThemeId;
  sceneBottomThemeId?: ShoppingThemeId;
};

type FeedbackTone = "ok" | "bad" | "warn";

type FeedbackState = {
  tone: FeedbackTone;
  text: string;
};

const SINGLE_SPOT_SLOTS: SpotSlot[] = [
  { x: 12, y: 16, size: 90 },
  { x: 28, y: 20, size: 84 },
  { x: 46, y: 17, size: 92 },
  { x: 64, y: 22, size: 88 },
  { x: 82, y: 18, size: 86 },
  { x: 20, y: 44, size: 94 },
  { x: 38, y: 50, size: 90 },
  { x: 56, y: 46, size: 88 },
  { x: 74, y: 52, size: 94 },
  { x: 14, y: 76, size: 88 },
  { x: 34, y: 82, size: 90 },
  { x: 54, y: 78, size: 88 },
  { x: 74, y: 84, size: 92 },
];

const TOP_SPOT_SLOTS: SpotSlot[] = [
  { x: 14, y: 12, size: 88 },
  { x: 33, y: 15, size: 84 },
  { x: 52, y: 18, size: 90 },
  { x: 70, y: 14, size: 86 },
  { x: 24, y: 35, size: 92 },
  { x: 46, y: 38, size: 88 },
  { x: 68, y: 34, size: 90 },
];

const BOTTOM_SPOT_SLOTS: SpotSlot[] = [
  { x: 16, y: 62, size: 88 },
  { x: 36, y: 66, size: 92 },
  { x: 56, y: 64, size: 88 },
  { x: 76, y: 68, size: 92 },
  { x: 26, y: 86, size: 88 },
  { x: 50, y: 84, size: 90 },
  { x: 72, y: 86, size: 88 },
];

const HARD_THEME_REGIONS: Record<ShoppingThemeId, ThemeRegion> = {
  "buah-sayur": { xMin: 12, xMax: 40, yMin: 14, yMax: 38 },
  "daging-laut": { xMin: 60, xMax: 88, yMin: 14, yMax: 38 },
  "barangan-kering": { xMin: 12, xMax: 40, yMin: 62, yMax: 86 },
  "peti-sejuk": { xMin: 60, xMax: 88, yMin: 62, yMax: 86 },
};

function createGridSlots(
  xStart: number,
  xEnd: number,
  yStart: number,
  yEnd: number,
  cols: number,
  rows: number,
  size: number
) {
  const slots: SpotSlot[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = cols === 1 ? (xStart + xEnd) / 2 : xStart + ((xEnd - xStart) * col) / (cols - 1);
      const y = rows === 1 ? (yStart + yEnd) / 2 : yStart + ((yEnd - yStart) * row) / (rows - 1);
      slots.push({ x, y, size });
    }
  }
  return slots;
}

function buildRandomThemeSlots(region: ThemeRegion, count: number): SpotSlot[] {
  if (count <= 0) return [];

  // Use shuffled grid slots so hard mode stays scrambled but icons don't overlap.
  const padding = 2.2;
  const xStart = region.xMin + padding;
  const xEnd = region.xMax - padding;
  const yStart = region.yMin + padding;
  const yEnd = region.yMax - padding;

  const cols = count >= 10 ? 4 : count >= 7 ? 3 : 2;
  const rows = Math.max(1, Math.ceil(count / cols));

  const baseSize = rows >= 3 ? 36 : rows === 2 ? 44 : 50;
  const sizeMin = Math.max(32, baseSize - 2);
  const sizeMax = Math.min(52, baseSize + 2);

  const templateSlots = shuffle(createGridSlots(xStart, xEnd, yStart, yEnd, cols, rows, baseSize));
  return templateSlots.slice(0, count).map((slot) => ({
    x: slot.x,
    y: slot.y,
    size: Math.floor(sizeMin + Math.random() * (sizeMax - sizeMin + 1)),
  }));
}

function readUiLang(): UiLang {
  if (typeof window === "undefined") return "ms";
  const v = window.localStorage.getItem(UI_LANG_KEY);
  return v === "en" || v === "es" || v === "ms" ? v : "ms";
}

function writeUiLang(lang: UiLang) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(UI_LANG_KEY, lang);
}

function pick(tr: Translated, lang: UiLang) {
  return lang === "ms" ? tr.ms : lang === "en" ? tr.en : tr.es;
}

function formatDuration(ms: number) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildEasyRound(themeId: ShoppingThemeId): ShoppingRound {
  const pool = SHOPPING_ITEMS_BY_THEME[themeId];
  const shuffled = shuffle(pool);
  const listItems = shuffled.slice(0, EASY_CONFIG.targetCount);

  const remaining = shuffled.slice(EASY_CONFIG.targetCount);
  const decoyCount = Math.min(
    EASY_CONFIG.visibleCount - EASY_CONFIG.targetCount,
    Math.max(0, remaining.length)
  );
  const decoys = shuffle(remaining).slice(0, decoyCount);

  const boardItems = shuffle([...listItems, ...decoys]);
  const slots = shuffle(SINGLE_SPOT_SLOTS).slice(0, boardItems.length);

  return {
    listItems,
    boardEntries: boardItems.map((item, idx) => ({ item, slot: slots[idx] })),
    sceneTopThemeId: themeId,
  };
}

function buildMediumRound(): ShoppingRound {
  const themeIds = shuffle(SHOPPING_THEMES.map((theme) => theme.id));
  const topThemeId = themeIds[0] ?? "buah-sayur";
  const bottomThemeId = themeIds[1] ?? "daging-laut";

  const topPool = shuffle(SHOPPING_ITEMS_BY_THEME[topThemeId]);
  const bottomPool = shuffle(SHOPPING_ITEMS_BY_THEME[bottomThemeId]);

  const topTargetCount = Math.random() < 0.5 ? 4 : 3;
  const bottomTargetCount = MEDIUM_CONFIG.targetCount - topTargetCount;

  const topTargets = topPool.slice(0, topTargetCount);
  const bottomTargets = bottomPool.slice(0, bottomTargetCount);
  const listItems = shuffle([...topTargets, ...bottomTargets]);

  const topTargetSet = new Set(topTargets.map((item) => item.id));
  const bottomTargetSet = new Set(bottomTargets.map((item) => item.id));
  const topRemaining = topPool.filter((item) => !topTargetSet.has(item.id));
  const bottomRemaining = bottomPool.filter((item) => !bottomTargetSet.has(item.id));

  const topVisibleCount = Math.ceil(MEDIUM_CONFIG.visibleCount / 2);
  const bottomVisibleCount = MEDIUM_CONFIG.visibleCount - topVisibleCount;

  const topDecoys = shuffle(topRemaining).slice(
    0,
    Math.max(0, topVisibleCount - topTargets.length)
  );
  const bottomDecoys = shuffle(bottomRemaining).slice(
    0,
    Math.max(0, bottomVisibleCount - bottomTargets.length)
  );

  const topBoardItems = shuffle([...topTargets, ...topDecoys]).slice(0, topVisibleCount);
  const bottomBoardItems = shuffle([...bottomTargets, ...bottomDecoys]).slice(0, bottomVisibleCount);

  const topSlots = shuffle(TOP_SPOT_SLOTS).slice(0, topBoardItems.length);
  const bottomSlots = shuffle(BOTTOM_SPOT_SLOTS).slice(0, bottomBoardItems.length);

  return {
    listItems,
    boardEntries: [
      ...topBoardItems.map((item, idx) => ({ item, slot: topSlots[idx] })),
      ...bottomBoardItems.map((item, idx) => ({ item, slot: bottomSlots[idx] })),
    ],
    sceneTopThemeId: topThemeId,
    sceneBottomThemeId: bottomThemeId,
  };
}

function buildHardRound(): ShoppingRound {
  const allItems = SHOPPING_THEMES.flatMap((theme) => SHOPPING_ITEMS_BY_THEME[theme.id]);
  const listItems = shuffle(allItems).slice(0, HARD_CONFIG.targetCount);

  const boardEntries: BoardEntry[] = [];
  for (const theme of SHOPPING_THEMES) {
    const themeItems = shuffle(SHOPPING_ITEMS_BY_THEME[theme.id]);
    const themeSlots = buildRandomThemeSlots(HARD_THEME_REGIONS[theme.id], themeItems.length);
    for (let idx = 0; idx < themeItems.length; idx++) {
      boardEntries.push({ item: themeItems[idx], slot: themeSlots[idx] });
    }
  }

  return {
    listItems,
    boardEntries,
    sceneTopThemeId: "buah-sayur",
    sceneBottomThemeId: "peti-sejuk",
  };
}

function buildRound(difficulty: ShoppingDifficultyId, themeId: ShoppingThemeId) {
  if (difficulty === "hard") return buildHardRound();
  if (difficulty === "medium") return buildMediumRound();
  return buildEasyRound(themeId);
}

function getThemeById(themeId: ShoppingThemeId) {
  return SHOPPING_THEMES.find((theme) => theme.id === themeId) ?? SHOPPING_THEMES[0];
}

function isCorrectSelection(listItems: ShoppingItem[], selectedSet: Set<string>) {
  if (selectedSet.size !== listItems.length) return false;
  for (const item of listItems) {
    if (!selectedSet.has(item.id)) return false;
  }
  return true;
}

export default function MisiMembeliPlayPage() {
  const initialThemeId: ShoppingThemeId = SHOPPING_THEMES[0]?.id ?? "buah-sayur";
  const initialDifficulty: ShoppingDifficultyId = "easy";

  const [lang, setLang] = useState<UiLang>(() => readUiLang());
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [playerName, setPlayerName] = useState("Guest");
  const [playerAvatarId, setPlayerAvatarId] = useState<ProfileAvatarId | undefined>(undefined);

  const [difficulty, setDifficulty] = useState<ShoppingDifficultyId>(initialDifficulty);
  const [themeId, setThemeId] = useState<ShoppingThemeId>(initialThemeId);
  const [round, setRound] = useState<ShoppingRound>(() => buildRound(initialDifficulty, initialThemeId));
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [lives, setLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [wrongRounds, setWrongRounds] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [checkedRound, setCheckedRound] = useState(false);
  const [wrongSelectedIds, setWrongSelectedIds] = useState<string[]>([]);
  const [wrongPopupVisible, setWrongPopupVisible] = useState(false);
  const [wrongPopupFade, setWrongPopupFade] = useState(false);

  const startedAtRef = useRef<number>(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const recordedRef = useRef(false);
  const wrongPopupTimers = useRef<number[]>([]);

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const wrongSelectedSet = useMemo(() => new Set(wrongSelectedIds), [wrongSelectedIds]);

  const currentTopTheme = useMemo(() => getThemeById(round.sceneTopThemeId), [round.sceneTopThemeId]);
  const currentBottomTheme = useMemo(
    () => (round.sceneBottomThemeId ? getThemeById(round.sceneBottomThemeId) : null),
    [round.sceneBottomThemeId]
  );

  useEffect(() => {
    let alive = true;
    getCurrentUser()
      .then((u) => {
        if (!alive) return;
        setUser(u);
        if (u?.name) setPlayerName(u.name);
        setPlayerAvatarId(u?.avatarId);
      })
      .finally(() => {
        if (alive) setLoadingUser(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const timer = window.setInterval(() => {
      setElapsedMs(Date.now() - startedAtRef.current);
    }, 250);

    return () => window.clearInterval(timer);
  }, [gameOver]);

  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => {
      setFeedback(null);
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [feedback]);

  useEffect(() => {
    return () => {
      wrongPopupTimers.current.forEach((timer) => window.clearTimeout(timer));
      wrongPopupTimers.current = [];
    };
  }, []);

  function pickLang(next: UiLang) {
    setLang(next);
    writeUiLang(next);
  }

  function startNewRound(nextThemeId = themeId, nextDifficulty = difficulty) {
    setSelectedIds([]);
    setCheckedRound(false);
    setWrongSelectedIds([]);
    setRound(buildRound(nextDifficulty, nextThemeId));
  }

  function switchTheme(nextThemeId: ShoppingThemeId) {
    if (gameOver) return;
    if (difficulty !== "easy") return;
    setThemeId(nextThemeId);
    setFeedback(null);
    startNewRound(nextThemeId, difficulty);
  }

  function switchDifficulty(nextDifficulty: ShoppingDifficultyId) {
    if (difficulty === nextDifficulty) return;

    setDifficulty(nextDifficulty);
    setFeedback(null);
    recordedRef.current = false;

    setLives(MAX_LIVES);
    setScore(0);
    setAttempts(0);
    setWrongRounds(0);
    setGameOver(false);
    setSelectedIds([]);
    setCheckedRound(false);
    setWrongSelectedIds([]);

    startedAtRef.current = Date.now();
    setElapsedMs(0);

    setRound(buildRound(nextDifficulty, themeId));
  }

  function toggleItem(itemId: string) {
    if (gameOver) return;
    setSelectedIds((prev) => {
      if (prev.includes(itemId)) return prev.filter((id) => id !== itemId);

      const maxSelectable = round.listItems.length;
      if (prev.length >= maxSelectable) {
        setFeedback({
          tone: "warn",
          text:
            lang === "ms"
              ? `Maksimum ${maxSelectable} item sahaja boleh dipilih.`
              : lang === "en"
              ? `You can only select up to ${maxSelectable} items.`
              : `Solo puedes seleccionar hasta ${maxSelectable} articulos.`,
        });
        return prev;
      }
      return [...prev, itemId];
    });
  }

  function clearSelection() {
    if (gameOver) return;
    setSelectedIds([]);
  }

  function triggerWrongPopup() {
    wrongPopupTimers.current.forEach((timer) => window.clearTimeout(timer));
    wrongPopupTimers.current = [];
    setWrongPopupVisible(true);
    setWrongPopupFade(false);
    wrongPopupTimers.current.push(
      window.setTimeout(() => setWrongPopupFade(true), 900),
      window.setTimeout(() => setWrongPopupVisible(false), 1200),
    );
  }

  function recordScoreOnce(snapshot: {
    attempts: number;
    score: number;
    wrongRounds: number;
    timeMs: number;
    difficulty: ShoppingDifficultyId;
    sceneTopThemeId: ShoppingThemeId;
    sceneBottomThemeId?: ShoppingThemeId;
    itemsPerRound: number;
  }) {
    if (recordedRef.current) return;
    recordedRef.current = true;

    const accuracy = snapshot.attempts > 0 ? (snapshot.score / snapshot.attempts) * 100 : 0;

    void addHighScore("misi-membeli", {
      name: playerName,
      avatarId: playerAvatarId,
      accuracy,
      timeMs: snapshot.timeMs,
      meta: {
        difficulty: snapshot.difficulty,
        sceneTopThemeId: snapshot.sceneTopThemeId,
        sceneBottomThemeId: snapshot.sceneBottomThemeId,
        attempts: snapshot.attempts,
        correctRounds: snapshot.score,
        wrongRounds: snapshot.wrongRounds,
        lives: 0,
        itemsPerRound: snapshot.itemsPerRound,
      },
    }).catch((error) => {
      console.error("Failed to save Misi Membeli highscore", error);
    });
  }

  function onCheckout() {
    if (gameOver) return;

    if (selectedIds.length < round.listItems.length) {
      setFeedback({
        tone: "warn",
        text:
          lang === "ms"
            ? `Pilih tepat ${round.listItems.length} item dahulu sebelum Bayar.`
            : lang === "en"
            ? `Select exactly ${round.listItems.length} items before Check Out.`
            : `Selecciona exactamente ${round.listItems.length} articulos antes de pagar.`,
      });
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    const targetSet = new Set(round.listItems.map((item) => item.id));
    const wrongIds = selectedIds.filter((id) => !targetSet.has(id));
    const revealWrongSelections = difficulty === "easy";

    setCheckedRound(true);
    setWrongSelectedIds(revealWrongSelections ? wrongIds : []);

    const correct = isCorrectSelection(round.listItems, selectedSet);

    if (correct) {
      const nextScore = score + 1;
      setScore(nextScore);
      setFeedback({
        tone: "ok",
        text:
          lang === "ms"
            ? "Betul! Senarai baru dijana."
            : lang === "en"
            ? "Correct! New list generated."
            : "Correcto. Nueva lista generada.",
      });
      startNewRound();
      return;
    }

    const nextWrongRounds = wrongRounds + 1;
    const nextLives = lives - 1;

    triggerWrongPopup();
    setWrongRounds(nextWrongRounds);
    setLives(nextLives);

    if (nextLives <= 0) {
      const timeNow = Date.now() - startedAtRef.current;

      setGameOver(true);
      setFeedback({
        tone: "bad",
        text:
          lang === "ms"
            ? "Permainan tamat. Skor disimpan."
            : lang === "en"
            ? "Game over. Score saved."
            : "Fin del juego. Puntuacion guardada.",
      });

      recordScoreOnce({
        attempts: nextAttempts,
        score,
        wrongRounds: nextWrongRounds,
        timeMs: timeNow,
        difficulty,
        sceneTopThemeId: round.sceneTopThemeId,
        sceneBottomThemeId: round.sceneBottomThemeId,
        itemsPerRound: round.listItems.length,
      });

      return;
    }

    setFeedback({
      tone: "bad",
      text:
        difficulty === "easy"
          ? lang === "ms"
            ? "Salah. Nyawa berkurang 1. Item merah ialah pilihan salah."
            : lang === "en"
            ? "Wrong. You lost 1 life. Red items are incorrect selections."
            : "Incorrecto. Perdiste 1 vida. Los articulos en rojo son selecciones incorrectas."
          : lang === "ms"
          ? "Salah. Nyawa berkurang 1. Cuba ubah pilihan dan tekan Bayar semula."
          : lang === "en"
          ? "Wrong. You lost 1 life. Adjust your picks and try Check Out again."
          : "Incorrecto. Perdiste 1 vida. Ajusta tu seleccion y vuelve a pagar.",
    });
  }

  function restartRun() {
    recordedRef.current = false;

    setLives(MAX_LIVES);
    setScore(0);
    setAttempts(0);
    setWrongRounds(0);
    setGameOver(false);
    setFeedback(null);
    setSelectedIds([]);
    setCheckedRound(false);
    setWrongSelectedIds([]);

    startedAtRef.current = Date.now();
    setElapsedMs(0);

    setRound(buildRound(difficulty, themeId));
  }

  const requiredChapter = MINIGAME_PREREQUISITES["misi-membeli"];
  const unlocked = isMinigameUnlocked(user, "misi-membeli");

  if (loadingUser) return null;

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-200 via-sky-200 to-amber-200 px-6 py-10">
        <div className="mx-auto max-w-xl rounded-2xl bg-white/85 p-6 shadow">
          <h1 className="crash-text crash-outline-fallback text-5xl font-black">MINI GAMES</h1>
          <p className="mt-4 text-sm font-semibold text-black/70">Select a user first to play this minigame.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/user" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow">
              Go to Login
            </Link>
            <IconActionLink href="/minigames" kind="minigames" tooltip="Back to Mini Games" />
          </div>
        </div>
      </main>
    );
  }

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-200 via-sky-200 to-amber-200 px-6 py-10">
        <div className="mx-auto max-w-xl rounded-2xl bg-white/85 p-6 shadow">
          <h1 className="crash-text crash-outline-fallback text-5xl font-black">LOCKED</h1>
          <p className="mt-4 text-sm font-semibold text-black/70">
            Complete Chapter {requiredChapter} first to play Misi Membeli.
          </p>
          <div className="mt-6 flex gap-3">
            <IconActionLink href="/map" kind="map" tooltip="Back to Map" />
            <IconActionLink href="/minigames" kind="minigames" tooltip="Back to Mini Games" />
          </div>
        </div>
      </main>
    );
  }

  const title =
    lang === "ms"
      ? "MISI\nMEMBELI"
      : lang === "en"
      ? "SHOPPING\nMISSION"
      : "MISION\nDE COMPRAS";

  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#081d14] px-6 py-8">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="crash-text crash-outline-fallback whitespace-pre-line text-6xl font-black leading-none text-[#ffe070]">
              {title}
            </h1>
            <div className="mt-2 text-sm font-semibold text-white/85">
              {lang === "ms"
                ? difficulty === "easy"
                  ? "Mudah: 1 tema, 5 item, tekan Bayar untuk semak. Urutan item tidak penting."
                  : difficulty === "medium"
                  ? "Sederhana: 2 tema rawak, 7 item. Tema 1 di atas, tema 2 di bawah."
                  : "Sukar: semua tema dipaparkan serentak, 10 item setiap pusingan."
                : lang === "en"
                ? difficulty === "easy"
                  ? "Easy: 1 theme, 5 items, press Check Out to validate. Item order does not matter."
                  : difficulty === "medium"
                  ? "Medium: 2 random themes, 7 items. Theme 1 on top, theme 2 at the bottom."
                  : "Hard: all themes shown at once, 10 items per round."
                : difficulty === "easy"
                ? "Facil: 1 tema, 5 articulos, pulsa Pagar para validar. El orden no importa."
                : difficulty === "medium"
                ? "Media: 2 temas aleatorios, 7 articulos. Tema 1 arriba, tema 2 abajo."
                : "Dificil: todos los temas en pantalla al mismo tiempo, 10 articulos por ronda."}
            </div>
          </div>

          <div className="rounded-2xl bg-white/90 p-4 shadow-xl">
            <div className="mb-3">
              <BackgroundAudioControls />
            </div>

            <div className="text-xs font-black opacity-70">LANGUAGE</div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => pickLang("ms")}
                className={`rounded-full px-3 py-1 text-xs font-black shadow ${lang === "ms" ? "bg-amber-300" : "bg-white"}`}
              >
                BM
              </button>
              <button
                onClick={() => pickLang("en")}
                className={`rounded-full px-3 py-1 text-xs font-black shadow ${lang === "en" ? "bg-amber-300" : "bg-white"}`}
              >
                EN
              </button>
              <button
                onClick={() => pickLang("es")}
                className={`rounded-full px-3 py-1 text-xs font-black shadow ${lang === "es" ? "bg-amber-300" : "bg-white"}`}
              >
                ES
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/minigames/misi-membeli" className="rounded-xl bg-white px-3 py-2 text-xs font-bold shadow">
                Intro
              </Link>
              <IconActionLink href="/minigames" kind="minigames" tooltip="Back to Mini Games" />
              <IconActionLink
                onClick={restartRun}
                kind="restart"
                tooltip={lang === "ms" ? "Main Semula" : lang === "en" ? "Restart" : "Reiniciar"}
              />
            </div>
          </div>
        </div>

        <section className="mt-6 grid gap-5 lg:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-[#d8cb98]/65 bg-[#fff5d8]/92 p-5 shadow-xl">
            <div className="text-[11px] font-black uppercase tracking-wide text-[#5a450d]/65">Difficulty</div>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => switchDifficulty("easy")}
                className={[
                  "rounded-full border px-3 py-1 text-xs font-black shadow",
                  difficulty === "easy"
                    ? "border-[#e4b94b] bg-[#ffd447] text-[#402f00]"
                    : "border-[#d8cc9a]/80 bg-white/90 text-[#6d5d2f] hover:bg-[#ffefbf]",
                ].join(" ")}
              >
                Easy
              </button>
              <button
                type="button"
                onClick={() => switchDifficulty("medium")}
                className={[
                  "rounded-full border px-3 py-1 text-xs font-black shadow",
                  difficulty === "medium"
                    ? "border-[#e4b94b] bg-[#ffd447] text-[#402f00]"
                    : "border-[#d8cc9a]/80 bg-white/90 text-[#6d5d2f] hover:bg-[#ffefbf]",
                ].join(" ")}
              >
                Medium
              </button>
              <button
                type="button"
                onClick={() => switchDifficulty("hard")}
                className={[
                  "rounded-full border px-3 py-1 text-xs font-black shadow",
                  difficulty === "hard"
                    ? "border-[#e4b94b] bg-[#ffd447] text-[#402f00]"
                    : "border-[#d8cc9a]/80 bg-white/90 text-[#6d5d2f] hover:bg-[#ffefbf]",
                ].join(" ")}
              >
                Hard
              </button>
            </div>

            <div className="mt-5 text-[11px] font-black uppercase tracking-wide text-[#5a450d]/65">Theme</div>
            {difficulty === "easy" ? (
              <div className="mt-2 grid gap-2">
                {SHOPPING_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => switchTheme(theme.id)}
                    disabled={gameOver}
                    className={[
                      "rounded-xl border px-3 py-2 text-left text-xs font-black shadow",
                      theme.id === themeId
                        ? "border-[#e2b44d] bg-[#ffde72] text-[#452f00]"
                        : "border-[#d6ca98]/75 bg-white/90 text-[#2d421d] hover:bg-[#ffefbf]",
                      gameOver ? "opacity-60" : "",
                    ].join(" ")}
                  >
                    {pick(theme.label, lang)}
                  </button>
                ))}
              </div>
            ) : difficulty === "medium" ? (
              <div className="mt-2 space-y-2 rounded-2xl border border-[#d6ca98]/75 bg-white/90 p-3 text-xs font-black text-[#2d421d]">
                <div>
                  {lang === "ms" ? "Atas:" : lang === "en" ? "Top:" : "Arriba:"} {pick(currentTopTheme.label, lang)}
                </div>
                <div>
                  {lang === "ms" ? "Bawah:" : lang === "en" ? "Bottom:" : "Abajo:"}{" "}
                  {currentBottomTheme ? pick(currentBottomTheme.label, lang) : "-"}
                </div>
                <div className="text-[11px] font-semibold opacity-75">
                  {lang === "ms"
                    ? "Tema dipilih secara rawak setiap pusingan."
                    : lang === "en"
                    ? "Themes are randomized every round."
                    : "Los temas se eligen al azar en cada ronda."}
                </div>
              </div>
            ) : (
              <div className="mt-2 space-y-2 rounded-2xl border border-[#d6ca98]/75 bg-white/90 p-3 text-xs font-black text-[#2d421d]">
                {SHOPPING_THEMES.map((theme) => (
                  <div key={theme.id}>• {pick(theme.label, lang)}</div>
                ))}
                <div className="text-[11px] font-semibold opacity-75">
                  {lang === "ms"
                    ? "Semua tema dipaparkan serentak setiap pusingan."
                    : lang === "en"
                    ? "All themes are shown every round."
                    : "Todos los temas se muestran en cada ronda."}
                </div>
              </div>
            )}

            <div className="mt-5 text-[11px] font-black uppercase tracking-wide text-[#5a450d]/65">
              {lang === "ms"
                ? `Senarai beli (${round.listItems.length} item)`
                : lang === "en"
                ? `Shopping list (${round.listItems.length} items)`
                : `Lista de compra (${round.listItems.length} articulos)`}
            </div>
            <ul className="mt-2 space-y-2">
              {round.listItems.map((item) => {
                const selectedFromList = selectedSet.has(item.id);
                const removableFromList = checkedRound && selectedFromList && !gameOver;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (removableFromList) toggleItem(item.id);
                    }}
                    disabled={!removableFromList}
                    className={[
                      "flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm font-bold",
                      removableFromList
                        ? "border-[#8fb8d8] bg-[#eaf4ff] text-[#1f3e59] hover:bg-[#dceeff]"
                        : "border-[#d8cc9a]/70 bg-white/80 text-[#314625]",
                      !removableFromList ? "cursor-default" : "",
                    ].join(" ")}
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-black/20 bg-white text-xs font-black">
                      {removableFromList ? "x" : "•"}
                    </span>
                    <span>{pick(item.label, lang)}</span>
                  </button>
                );
              })}
            </ul>

            <div className="mt-5 rounded-2xl border border-[#d4c68f]/70 bg-[#f7edc4]/85 p-3">
              <div className="grid grid-cols-2 gap-2 text-xs font-bold text-[#2f421f]">
                <div>{lang === "ms" ? "Skor" : lang === "en" ? "Score" : "Puntuacion"}: {score}</div>
                <div>
                  {lang === "ms" ? "Ketepatan" : lang === "en" ? "Accuracy" : "Precision"}: {accuracy}%
                </div>
                <div>{lang === "ms" ? "Cuba" : lang === "en" ? "Attempts" : "Intentos"}: {attempts}</div>
                <div>
                  {lang === "ms" ? "Masa" : lang === "en" ? "Time" : "Tiempo"}: {formatDuration(elapsedMs)}
                </div>
              </div>

              <div className="mt-3 text-[11px] font-black uppercase tracking-wide text-[#5a450d]/65">
                {lang === "ms" ? "Nyawa" : lang === "en" ? "Lives" : "Vidas"}
              </div>
              <div className="mt-1 flex items-center gap-1">
                {Array.from({ length: MAX_LIVES }).map((_, idx) => (
                  <Image
                    key={idx}
                    src={AKU2_IDLE_SRC}
                    alt="life"
                    width={36}
                    height={36}
                    className={["h-10 w-10 drop-shadow", idx < lives ? "opacity-100" : "opacity-25 grayscale"].join(" ")}
                    priority
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={clearSelection}
                disabled={gameOver}
                className="rounded-xl border border-[#d5ca98]/75 bg-white px-3 py-2 text-xs font-black text-[#2f451f] shadow disabled:opacity-60"
              >
                {lang === "ms" ? "Kosongkan" : lang === "en" ? "Clear" : "Limpiar"}
              </button>

              <button
                type="button"
                onClick={onCheckout}
                disabled={gameOver}
                className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-black text-white shadow hover:bg-emerald-500 disabled:opacity-60"
              >
                {lang === "ms" ? "Bayar" : lang === "en" ? "Check Out" : "Pagar"}
              </button>
            </div>
          </aside>

          <div className="space-y-3">
            <div className="rounded-3xl border border-[#d7ca96]/45 bg-[#153525]/78 p-3 text-xs font-black tracking-wide text-[#e9f5d8] shadow-xl">
              {lang === "ms"
                ? difficulty === "easy"
                  ? `Tema semasa: ${pick(currentTopTheme.label, lang)} | Dipilih: ${selectedIds.length}`
                  : difficulty === "medium"
                  ? `Tema atas: ${pick(currentTopTheme.label, lang)} | Tema bawah: ${currentBottomTheme ? pick(currentBottomTheme.label, lang) : "-"} | Dipilih: ${selectedIds.length}`
                  : `Semua tema aktif | Dipilih: ${selectedIds.length}`
                : lang === "en"
                ? difficulty === "easy"
                  ? `Current theme: ${pick(currentTopTheme.label, lang)} | Selected: ${selectedIds.length}`
                  : difficulty === "medium"
                  ? `Top theme: ${pick(currentTopTheme.label, lang)} | Bottom theme: ${currentBottomTheme ? pick(currentBottomTheme.label, lang) : "-"} | Selected: ${selectedIds.length}`
                  : `All themes active | Selected: ${selectedIds.length}`
                : difficulty === "easy"
                ? `Tema actual: ${pick(currentTopTheme.label, lang)} | Seleccionados: ${selectedIds.length}`
                : difficulty === "medium"
                ? `Tema arriba: ${pick(currentTopTheme.label, lang)} | Tema abajo: ${currentBottomTheme ? pick(currentBottomTheme.label, lang) : "-"} | Seleccionados: ${selectedIds.length}`
                : `Todos los temas activos | Seleccionados: ${selectedIds.length}`}
            </div>

            <section className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-[#d8cb98]/70 bg-[#202014]/70 shadow-[0_20px_45px_rgba(0,0,0,0.35)]">
              {difficulty === "easy" ? (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${currentTopTheme.sceneSrc}')` }}
                />
              ) : difficulty === "medium" ? (
                <>
                  <div
                    className="absolute inset-x-0 top-0 h-1/2 bg-cover bg-center"
                    style={{ backgroundImage: `url('${currentTopTheme.sceneSrc}')` }}
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-cover bg-center"
                    style={{ backgroundImage: `url('${currentBottomTheme?.sceneSrc ?? currentTopTheme.sceneSrc}')` }}
                  />
                  <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-white/40" />
                </>
              ) : (
                <>
                  <div
                    className="absolute left-0 top-0 h-1/2 w-1/2 bg-cover bg-center"
                    style={{ backgroundImage: `url('${getThemeById("buah-sayur").sceneSrc}')` }}
                  />
                  <div
                    className="absolute right-0 top-0 h-1/2 w-1/2 bg-cover bg-center"
                    style={{ backgroundImage: `url('${getThemeById("daging-laut").sceneSrc}')` }}
                  />
                  <div
                    className="absolute bottom-0 left-0 h-1/2 w-1/2 bg-cover bg-center"
                    style={{ backgroundImage: `url('${getThemeById("barangan-kering").sceneSrc}')` }}
                  />
                  <div
                    className="absolute bottom-0 right-0 h-1/2 w-1/2 bg-cover bg-center"
                    style={{ backgroundImage: `url('${getThemeById("peti-sejuk").sceneSrc}')` }}
                  />

                  <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-white/45" />
                  <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-white/45" />

                  <div className="absolute left-2 top-2 rounded-full bg-black/50 px-2 py-1 text-[10px] font-black tracking-wide text-white">
                    {pick(getThemeById("buah-sayur").label, lang)}
                  </div>
                  <div className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-1 text-[10px] font-black tracking-wide text-white">
                    {pick(getThemeById("daging-laut").label, lang)}
                  </div>
                  <div className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-1 text-[10px] font-black tracking-wide text-white">
                    {pick(getThemeById("barangan-kering").label, lang)}
                  </div>
                  <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-1 text-[10px] font-black tracking-wide text-white">
                    {pick(getThemeById("peti-sejuk").label, lang)}
                  </div>
                </>
              )}
              <div className="absolute inset-0 bg-black/20" />

              {round.boardEntries.map((entry) => {
                const selected = selectedSet.has(entry.item.id);
                const wrongSelected = checkedRound && selected && wrongSelectedSet.has(entry.item.id);
                return (
                  <button
                    key={entry.item.id}
                    type="button"
                    onClick={() => toggleItem(entry.item.id)}
                    disabled={gameOver}
                    style={{
                      left: `${entry.slot.x}%`,
                      top: `${entry.slot.y}%`,
                      width: `${entry.slot.size}px`,
                      height: `${entry.slot.size}px`,
                    }}
                    className={[
                      "absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-white/90 p-1 shadow-lg transition",
                      wrongSelected
                        ? "border-rose-500 ring-4 ring-rose-300"
                        : selected
                        ? "border-amber-500 ring-4 ring-amber-300"
                        : "border-white/70 hover:scale-105 hover:border-amber-300",
                      gameOver ? "opacity-60" : "",
                    ].join(" ")}
                  >
                    <Image
                      src={entry.item.iconSrc}
                      alt={pick(entry.item.label, lang)}
                      width={entry.slot.size - 8}
                      height={entry.slot.size - 8}
                      className="h-full w-full rounded-xl object-cover"
                    />
                  </button>
                );
              })}

              {gameOver && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/58 p-6">
                  <div className="w-full max-w-md rounded-3xl bg-white p-5 text-center shadow-2xl">
                    <div className="text-2xl font-black text-[#2f1f04]">
                      {lang === "ms" ? "Permainan Tamat" : lang === "en" ? "Game Over" : "Fin del Juego"}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-[#3b4f2b]">
                      {lang === "ms"
                        ? `Skor akhir: ${score} | Ketepatan: ${accuracy}% | Masa: ${formatDuration(elapsedMs)}`
                        : lang === "en"
                        ? `Final score: ${score} | Accuracy: ${accuracy}% | Time: ${formatDuration(elapsedMs)}`
                        : `Puntuacion final: ${score} | Precision: ${accuracy}% | Tiempo: ${formatDuration(elapsedMs)}`}
                    </div>
                    <div className="mt-4 flex justify-center gap-2">
                      <IconActionLink
                        onClick={restartRun}
                        kind="restart"
                        tooltip={lang === "ms" ? "Main Semula" : lang === "en" ? "Restart" : "Reiniciar"}
                      />
                      <IconActionLink href="/minigames" kind="minigames" tooltip="Back to Mini Games" />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {feedback && (
              <div
                className={[
                  "rounded-2xl border p-3 text-sm font-black shadow",
                  feedback.tone === "ok"
                    ? "border-emerald-300 bg-emerald-100 text-emerald-900"
                    : feedback.tone === "warn"
                    ? "border-amber-300 bg-amber-100 text-amber-900"
                    : "border-rose-300 bg-rose-100 text-rose-900",
                ].join(" ")}
              >
                {feedback.text}
              </div>
            )}

            <div className="rounded-2xl border border-[#d8cb98]/70 bg-[#fff4d5]/95 p-3 text-xs font-semibold text-[#3f3c22]">
              {lang === "ms"
                ? difficulty === "easy"
                  ? "Pilih item pada scene (maksimum 5) dalam apa-apa urutan. Keputusan hanya disemak bila tekan Bayar. Jika salah, item merah ialah item yang perlu dibuang."
                  : difficulty === "medium"
                  ? "Pilih item pada scene (maksimum 7) dalam apa-apa urutan. Untuk tahap sederhana, sistem tidak beritahu item mana yang betul atau salah."
                  : "Tahap sukar memaparkan semua tema dan semua item yang tersedia. Pilih 10 item daripada senarai dan semak hanya melalui butang Bayar."
                : lang === "en"
                ? difficulty === "easy"
                  ? "Select items on the scene (maximum 5) in any order. Validation only happens when you press Check Out. If wrong, red items are the ones to remove."
                  : difficulty === "medium"
                  ? "Select items on the scene (maximum 7) in any order. In medium mode, the game will not reveal which items are right or wrong."
                  : "Hard mode shows all themes and all available items. Pick 10 list items and validate only with Check Out."
                : difficulty === "easy"
                ? "Selecciona articulos en la escena (maximo 5) en cualquier orden. La validacion solo ocurre al pulsar Pagar. Si esta mal, los articulos rojos son los que debes quitar."
                : difficulty === "medium"
                ? "Selecciona articulos en la escena (maximo 7) en cualquier orden. En nivel medio, el juego no indica cuales son correctos o incorrectos."
                : "El nivel dificil muestra todos los temas y todos los articulos disponibles. Elige 10 de la lista y valida solo con Pagar."}
            </div>
          </div>
        </section>
      </div>

      {wrongPopupVisible && (
        <div
          className={[
            "pointer-events-none fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300",
            wrongPopupFade ? "opacity-0" : "opacity-100",
          ].join(" ")}
        >
          <Image src={AKU2_SALAH_SRC} alt="Wrong answer" width={180} height={180} className="animate-bounce drop-shadow-lg" priority />
        </div>
      )}
    </main>
  );
}
