"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { UiLang } from "@/lib/chapters";
import {
  CURRENCY_ITEMS,
  DIFFICULTIES,
  SHOP_ITEMS,
  formatRM,
  type DifficultyKey,
} from "@/lib/currency/items";
import { addHighScore } from "@/lib/highscores";
import { getCurrentUser, type ProfileAvatarId, type UserProfile } from "@/lib/userStore";
import { isMinigameUnlocked, MINIGAME_PREREQUISITES } from "@/lib/minigameUnlocks";
import IconActionLink from "@/components/navigation/IconActionLink";

const UI_LANG_KEY = "learnMalay.uiLang.v1";
const AKU2_IDLE_SRC = "/assets/characters/Akuaku_idle.png";
const AKU2_BETUL_SRC = "/assets/characters/Akuaku_Betul.webp";
const AKU2_SALAH_SRC = "/assets/characters/Akuaku_Salah.webp";
const AKU2_IDLE_POPUP_SIZE = 140;
const AKU2_BETUL_POPUP_SIZE = 400;
const MAX_LIVES = 5;

function readUiLang(): UiLang {
  if (typeof window === "undefined") return "ms";
  const v = window.localStorage.getItem(UI_LANG_KEY);
  return v === "en" || v === "es" || v === "ms" ? v : "ms";
}

function writeUiLang(lang: UiLang) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(UI_LANG_KEY, lang);
}

function formatDuration(ms: number) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

type Translated = { ms: string; en: string; es: string };
function pick(tr: Translated, lang: UiLang) {
  return lang === "ms" ? tr.ms : lang === "en" ? tr.en : tr.es;
}

function isPositivePopupText(text: string | null) {
  if (!text) return false;
  return /betul|correct|correcto|tahniah|congrats|felicidades|menang|you win|ganaste/i.test(text);
}

type GameMode = "buyer" | "cashier";

type SelectedCurrency = {
  itemId: string;
  count: number;
};

type HardBuyerPhase = "selecting" | "verify" | "resolved";
type PaymentPlan = {
  total: number;
  overpay: number;
  overpayRatio: number;
  coinCount: number;
  noteCount: number;
  pieceCount: number;
  score: number;
};

const HARD_COIN_MULTIPLIER_BASE = 70;
const HARD_COIN_MULTIPLIER_MIN = 0.008;
const HARD_COIN_MULTIPLIER_MAX = 0.3;
const ULTRA_MAX_CHANGE = 3000;
const SCORE_EPSILON = 1e-9;

const BM_UNITS = [
  "sifar",
  "satu",
  "dua",
  "tiga",
  "empat",
  "lima",
  "enam",
  "tujuh",
  "lapan",
  "sembilan",
];

function normalizeMalayCurrencyText(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\bdan\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function bmNumberToWords(n: number): string {
  const value = Math.max(0, Math.floor(n));
  if (value < 10) return BM_UNITS[value];
  if (value === 10) return "sepuluh";
  if (value === 11) return "sebelas";
  if (value < 20) return `${BM_UNITS[value - 10]} belas`;
  if (value < 100) {
    const tensWords = ["", "", "dua puluh", "tiga puluh", "empat puluh", "lima puluh", "enam puluh", "tujuh puluh", "lapan puluh", "sembilan puluh"];
    const tens = Math.floor(value / 10);
    const ones = value % 10;
    return ones === 0 ? tensWords[tens] : `${tensWords[tens]} ${BM_UNITS[ones]}`;
  }
  if (value === 100) return "seratus";
  if (value < 200) return `seratus ${bmNumberToWords(value - 100)}`;
  if (value < 1000) {
    const hundreds = Math.floor(value / 100);
    const rest = value % 100;
    return rest === 0
      ? `${BM_UNITS[hundreds]} ratus`
      : `${BM_UNITS[hundreds]} ratus ${bmNumberToWords(rest)}`;
  }
  if (value === 1000) return "seribu";
  if (value < 2000) return `seribu ${bmNumberToWords(value - 1000)}`;
  if (value < 1_000_000) {
    const thousands = Math.floor(value / 1000);
    const rest = value % 1000;
    return rest === 0
      ? `${bmNumberToWords(thousands)} ribu`
      : `${bmNumberToWords(thousands)} ribu ${bmNumberToWords(rest)}`;
  }
  if (value < 1_000_000_000) {
    const millions = Math.floor(value / 1_000_000);
    const rest = value % 1_000_000;
    return rest === 0
      ? `${bmNumberToWords(millions)} juta`
      : `${bmNumberToWords(millions)} juta ${bmNumberToWords(rest)}`;
  }
  return String(value);
}

function senToMalayCurrencyWords(sen: number): string {
  const ringgit = Math.floor(sen / 100);
  const cents = sen % 100;
  const parts: string[] = [];
  if (ringgit > 0) parts.push(`${bmNumberToWords(ringgit)} ringgit`);
  if (cents > 0) parts.push(`${bmNumberToWords(cents)} sen`);
  if (parts.length === 0) return "sifar sen";
  return parts.join(" ");
}

function buildMalayCurrencyAnswerSet(sen: number): Set<string> {
  const canonical = senToMalayCurrencyWords(sen);
  const variants = new Set<string>([normalizeMalayCurrencyText(canonical)]);
  variants.add(normalizeMalayCurrencyText(canonical.replace(" ringgit ", " ringgit dan ")));
  variants.add(normalizeMalayCurrencyText(canonical.replace("satu ringgit", "seringgit")));
  return variants;
}

function roundToNearest(value: number, nearest: number): number {
  return Math.round(value / nearest) * nearest;
}

function randomPrice(min: number, max: number, roundTo: number): number {
  const raw = Math.floor(Math.random() * (max - min + 1)) + min;
  return roundToNearest(raw, roundTo);
}

function sampleOne<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffled<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function findClosestPayableAtOrAbove(target: number, denominationValues: number[]): number {
  const values = Array.from(new Set(denominationValues.filter((v) => v > 0))).sort((a, b) => a - b);
  if (values.length === 0) return target;

  const maxValue = values[values.length - 1];
  let limit = target + maxValue * 2;

  while (limit <= target + 50000) {
    const reachable = new Uint8Array(limit + 1);
    reachable[0] = 1;

    for (let sum = 0; sum <= limit; sum++) {
      if (!reachable[sum]) continue;
      for (const v of values) {
        const next = sum + v;
        if (next <= limit) reachable[next] = 1;
      }
    }

    for (let candidate = target; candidate <= limit; candidate++) {
      if (reachable[candidate]) return candidate;
    }

    limit += maxValue * 2;
  }

  return target;
}

function getHardCoinMultiplier(target: number): number {
  const raw = HARD_COIN_MULTIPLIER_BASE / Math.max(target, 1);
  return Math.min(HARD_COIN_MULTIPLIER_MAX, Math.max(HARD_COIN_MULTIPLIER_MIN, raw));
}

function computeHardPaymentScore(overpay: number, target: number, coinCount: number): number {
  const safeTarget = Math.max(target, 1);
  const overpayRatio = overpay / safeTarget;
  return overpayRatio + coinCount * getHardCoinMultiplier(target);
}

function compareSumState(
  a: { coinCount: number; noteCount: number; pieceCount: number },
  b: { coinCount: number; noteCount: number; pieceCount: number }
): number {
  if (a.coinCount !== b.coinCount) return a.coinCount - b.coinCount;
  if (a.pieceCount !== b.pieceCount) return a.pieceCount - b.pieceCount;
  return a.noteCount - b.noteCount;
}

function comparePaymentPlan(a: PaymentPlan, b: PaymentPlan): number {
  if (Math.abs(a.score - b.score) > SCORE_EPSILON) return a.score - b.score;
  if (Math.abs(a.overpayRatio - b.overpayRatio) > SCORE_EPSILON) return a.overpayRatio - b.overpayRatio;
  if (a.coinCount !== b.coinCount) return a.coinCount - b.coinCount;
  if (a.pieceCount !== b.pieceCount) return a.pieceCount - b.pieceCount;
  return a.total - b.total;
}

function sumSelection(selection: SelectedCurrency[]): number {
  return selection.reduce((sum, sel) => {
    const item = CURRENCY_ITEMS.find((c) => c.id === sel.itemId);
    return sum + (item?.value ?? 0) * sel.count;
  }, 0);
}

function getSelectedPaymentPlan(selection: SelectedCurrency[], target: number): PaymentPlan {
  const stats = selection.reduce(
    (acc, sel) => {
      const item = CURRENCY_ITEMS.find((c) => c.id === sel.itemId);
      if (!item) return acc;

      acc.total += item.value * sel.count;
      acc.pieceCount += sel.count;
      if (item.type === "coin") acc.coinCount += sel.count;
      if (item.type === "note") acc.noteCount += sel.count;
      return acc;
    },
    { total: 0, coinCount: 0, noteCount: 0, pieceCount: 0 }
  );

  const overpay = Math.max(0, stats.total - target);
  const overpayRatio = overpay / Math.max(target, 1);
  return {
    ...stats,
    overpay,
    overpayRatio,
    score: computeHardPaymentScore(overpay, target, stats.coinCount),
  };
}

function buildUltraPaymentBreakdown(price: number): SelectedCurrency[] {
  const allValues = CURRENCY_ITEMS.map((item) => item.value);
  const notesDesc = CURRENCY_ITEMS.filter((item) => item.type === "note").sort((a, b) => b.value - a.value);
  const coinsDesc = CURRENCY_ITEMS.filter((item) => item.type === "coin").sort((a, b) => b.value - a.value);
  const desired = price + (Math.floor(Math.random() * 12) + 1) * 50;
  const payable = findClosestPayableAtOrAbove(desired, allValues);
  const targetTotal = Math.max(payable, price + 50);
  const selected: SelectedCurrency[] = [];
  let remaining = targetTotal;

  for (const item of [...notesDesc, ...coinsDesc]) {
    if (remaining <= 0) break;
    const count = Math.floor(remaining / item.value);
    if (count > 0) {
      selected.push({ itemId: item.id, count });
      remaining -= count * item.value;
    }
  }

  if (remaining > 0) {
    const coin5 = CURRENCY_ITEMS.find((item) => item.id === "coin-5");
    if (coin5) {
      const count = Math.ceil(remaining / coin5.value);
      if (count > 0) {
        selected.push({ itemId: coin5.id, count });
      }
    }
  }

  return selected;
}

function findPreferredHardPaymentPlan(target: number, items: typeof CURRENCY_ITEMS): PaymentPlan | null {
  if (items.length === 0) return null;
  const maxDenom = Math.max(...items.map((i) => i.value));
  const limit = target + Math.max(3000, maxDenom * 2);

  type SumState = { coinCount: number; noteCount: number; pieceCount: number };
  const bestAtSum: Array<SumState | null> = Array.from({ length: limit + 1 }, () => null);
  bestAtSum[0] = { coinCount: 0, noteCount: 0, pieceCount: 0 };

  for (let sum = 0; sum <= limit; sum++) {
    const base = bestAtSum[sum];
    if (!base) continue;

    for (const item of items) {
      const next = sum + item.value;
      if (next > limit) continue;

      const candidate: SumState = {
        coinCount: base.coinCount + (item.type === "coin" ? 1 : 0),
        noteCount: base.noteCount + (item.type === "note" ? 1 : 0),
        pieceCount: base.pieceCount + 1,
      };
      const current = bestAtSum[next];
      if (!current || compareSumState(candidate, current) < 0) {
        bestAtSum[next] = candidate;
      }
    }
  }

  let bestPlan: PaymentPlan | null = null;
  for (let total = target; total <= limit; total++) {
    const state = bestAtSum[total];
    if (!state) continue;

    const overpay = total - target;
    const candidate: PaymentPlan = {
      total,
      overpay,
      overpayRatio: overpay / Math.max(target, 1),
      coinCount: state.coinCount,
      noteCount: state.noteCount,
      pieceCount: state.pieceCount,
      score: computeHardPaymentScore(overpay, target, state.coinCount),
    };

    if (!bestPlan || comparePaymentPlan(candidate, bestPlan) < 0) {
      bestPlan = candidate;
    }
  }

  return bestPlan;
}

function makeWrongChange(expectedChange: number, step: number): number {
  const safeStep = Math.max(step, 1);
  const delta = safeStep * (Math.random() < 0.5 ? 1 : 2);
  const higher = expectedChange + delta;
  const lower = Math.max(0, expectedChange - delta);

  if (expectedChange === 0) return higher;
  if (Math.random() < 0.5 && lower !== expectedChange) return lower;
  return higher;
}

function buildHardRoundDenominations(target: number, poolIds: string[]): string[] {
  const poolItems = poolIds
    .map((id) => CURRENCY_ITEMS.find((c) => c.id === id))
    .filter((x): x is (typeof CURRENCY_ITEMS)[number] => Boolean(x));

  if (poolItems.length <= 2) return poolItems.map((i) => i.id);

  const noteItems = poolItems.filter((i) => i.type === "note");
  const coinItems = poolItems.filter((i) => i.type === "coin");

  for (let attempt = 0; attempt < 40; attempt++) {
    const selected = new Set<string>();

    const mustHaveNote = sampleOne(noteItems);
    if (mustHaveNote) selected.add(mustHaveNote.id);

    if (coinItems.length > 0 && Math.random() < 0.8) {
      const maybeCoin = sampleOne(coinItems);
      if (maybeCoin) selected.add(maybeCoin.id);
    }

    const maxPick = Math.min(5, poolItems.length);
    const minPick = Math.min(3, maxPick);
    const wantCount = minPick + Math.floor(Math.random() * (maxPick - minPick + 1));

    for (const item of shuffled(poolItems)) {
      if (selected.size >= wantCount) break;
      selected.add(item.id);
    }

    const pickedIds = Array.from(selected);
    const pickedValues = pickedIds
      .map((id) => CURRENCY_ITEMS.find((c) => c.id === id)?.value ?? 0)
      .filter((v) => v > 0);

    const closestPayable = findClosestPayableAtOrAbove(target, pickedValues);
    const bestPlan = findPreferredHardPaymentPlan(
      target,
      pickedIds
        .map((id) => CURRENCY_ITEMS.find((c) => c.id === id))
        .filter((x): x is (typeof CURRENCY_ITEMS)[number] => Boolean(x))
    );
    if (
      closestPayable >= target &&
      closestPayable - target <= 2000 &&
      bestPlan &&
      bestPlan.overpay <= 2000
    ) {
      return pickedIds;
    }
  }

  return poolItems.map((i) => i.id);
}

export default function CurrencyPlayPage() {
  const [lang, setLang] = useState<UiLang>(() => readUiLang());
  const [difficulty, setDifficulty] = useState<DifficultyKey>("easy");
  const [mode, setMode] = useState<GameMode>("buyer");

  const [lives, setLives] = useState(MAX_LIVES);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const [attempts, setAttempts] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const startedAtRef = useRef<number>(Date.now());
  const [elapsedMs, setElapsedMs] = useState(0);
  const recordedRef = useRef(false);

  const [playerName, setPlayerName] = useState("Guest");
  const [playerAvatarId, setPlayerAvatarId] = useState<ProfileAvatarId | undefined>(undefined);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [targetPrice, setTargetPrice] = useState(0);
  const [itemName, setItemName] = useState({ ms: "", en: "", es: "" });
  const [selectedCurrency, setSelectedCurrency] = useState<SelectedCurrency[]>([]);
  const [hardRoundDenominationIds, setHardRoundDenominationIds] = useState<string[] | null>(null);
  const [ultraAnswer, setUltraAnswer] = useState("");
  const [ultraExpectedSen, setUltraExpectedSen] = useState<number | null>(null);
  const [ultraPaidBreakdown, setUltraPaidBreakdown] = useState<SelectedCurrency[]>([]);
  
  // For cashier mode
  const [customerPayment, setCustomerPayment] = useState(0);

  const [feedback, setFeedback] = useState<null | { ok: boolean; msg: string }>(null);
  const [hardBuyerPhase, setHardBuyerPhase] = useState<HardBuyerPhase>("selecting");
  const [submittedTotal, setSubmittedTotal] = useState<number | null>(null);
  const [expectedChangeForCheck, setExpectedChangeForCheck] = useState<number | null>(null);
  const [cashierGivenChange, setCashierGivenChange] = useState<number | null>(null);
  const [cashierChangeIsCorrect, setCashierChangeIsCorrect] = useState<boolean | null>(null);
  const [popupText, setPopupText] = useState<string | null>(null);
  const [popupFade, setPopupFade] = useState(false);
  const popupTimers = useRef<number[]>([]);
  const popupIsPositive = isPositivePopupText(popupText);
  const popupAvatarSrc = useMemo(
    () => (isPositivePopupText(popupText) ? AKU2_BETUL_SRC : AKU2_SALAH_SRC),
    [popupText]
  );
  const popupAvatarSize = popupIsPositive ? AKU2_BETUL_POPUP_SIZE : AKU2_IDLE_POPUP_SIZE;

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
    const id = window.setInterval(() => {
      if (!gameOver && !gameWon) setElapsedMs(Date.now() - startedAtRef.current);
    }, 250);
    return () => window.clearInterval(id);
  }, [gameOver, gameWon]);

  useEffect(() => {
    return () => {
      popupTimers.current.forEach((t) => window.clearTimeout(t));
      popupTimers.current = [];
    };
  }, []);

  const diffConfig = DIFFICULTIES[difficulty];
  const isUltra = difficulty === "ultra";
  const effectiveMode: GameMode = isUltra ? "cashier" : mode;
  const activeDenominationIds = useMemo(() => {
    if (difficulty === "hard" && effectiveMode === "cashier") {
      const noteIds = CURRENCY_ITEMS.filter((item) => item.type === "note").map((item) => item.id);
      const configuredCoinIds = diffConfig.availableDenominations.filter((id) =>
        CURRENCY_ITEMS.find((item) => item.id === id)?.type === "coin"
      );
      return [...noteIds, ...configuredCoinIds];
    }
    if (difficulty === "hard" && effectiveMode === "buyer" && hardRoundDenominationIds && hardRoundDenominationIds.length > 0) {
      return hardRoundDenominationIds;
    }
    return diffConfig.availableDenominations;
  }, [difficulty, effectiveMode, hardRoundDenominationIds, diffConfig.availableDenominations]);
  const availableCurrency = useMemo(
    () =>
      CURRENCY_ITEMS.filter((item) =>
        activeDenominationIds.includes(item.id)
      ).sort((a, b) => b.value - a.value),
    [activeDenominationIds]
  );
  const denominationValues = useMemo(
    () => availableCurrency.map((item) => item.value),
    [availableCurrency]
  );
  const smallestDenomination = useMemo(() => {
    if (denominationValues.length === 0) return 5;
    return Math.min(...denominationValues);
  }, [denominationValues]);
  const isHardBuyer = difficulty === "hard" && effectiveMode === "buyer";
  const isLockedForInput = gameOver || gameWon || (isHardBuyer && hardBuyerPhase !== "selecting");
  const shouldHideRunningTotal = isHardBuyer && hardBuyerPhase === "selecting";

  function triggerPopup(text: string) {
    popupTimers.current.forEach((t) => window.clearTimeout(t));
    popupTimers.current = [];

    setPopupText(text);
    setPopupFade(false);

    popupTimers.current.push(
      window.setTimeout(() => setPopupFade(true), 1200),
      window.setTimeout(() => setPopupText(null), 1500)
    );
  }

  function recordScoreOnce(
    result: "win" | "gameover",
    snapshot: {
      attempts: number;
      correctCount: number;
      wrongCount: number;
      lives: number;
      timeMs: number;
    }
  ) {
    if (recordedRef.current) return;
    recordedRef.current = true;

    const acc = snapshot.attempts > 0 ? (snapshot.correctCount / snapshot.attempts) * 100 : 0;

    addHighScore("currency", {
      name: playerName,
      avatarId: playerAvatarId,
      accuracy: acc,
      timeMs: snapshot.timeMs,
      meta: {
        result,
        mode: effectiveMode,
        difficulty,
        attempts: snapshot.attempts,
        correct: snapshot.correctCount,
        wrong: snapshot.wrongCount,
        lives: snapshot.lives,
      },
    });
  }

  function finishCorrectRound(attemptSnapshot: number, message?: string) {
    const nextCorrect = correctCount + 1;
    setCorrectCount(nextCorrect);

    setFeedback({
      ok: true,
      msg: message ?? (lang === "ms" ? "Betul!" : lang === "en" ? "Correct!" : "¡Correcto!"),
    });

    triggerPopup(lang === "ms" ? "Betul!" : lang === "en" ? "Correct!" : "¡Correcto!");

    if (nextCorrect >= 10) {
      const timeNow = Date.now() - startedAtRef.current;
      recordScoreOnce("win", {
        attempts: attemptSnapshot,
        correctCount: nextCorrect,
        wrongCount,
        lives,
        timeMs: timeNow,
      });

      setGameWon(true);
      triggerPopup(
        lang === "ms" ? "Tahniah! Anda menang!" : lang === "en" ? "You win!" : "¡Ganaste!"
      );
      return;
    }

    if (isHardBuyer) {
      setHardBuyerPhase("resolved");
      return;
    }

    setTimeout(() => newRound(), 800);
  }

  function finishWrongRound(attemptSnapshot: number, message: string) {
    const nextWrong = wrongCount + 1;
    setWrongCount(nextWrong);

    const nextLives = lives - 1;
    setLives(nextLives);

    setFeedback({ ok: false, msg: message });
    triggerPopup(lang === "ms" ? "Salah" : lang === "en" ? "Wrong" : "Incorrecto");

    if (nextLives <= 0) {
      const timeNow = Date.now() - startedAtRef.current;
      recordScoreOnce("gameover", {
        attempts: attemptSnapshot,
        correctCount,
        wrongCount: nextWrong,
        lives: 0,
        timeMs: timeNow,
      });

      setGameOver(true);
      triggerPopup(
        lang === "ms"
          ? "Permainan tamat"
          : lang === "en"
          ? "Game over"
          : "Fin del juego"
      );
      return;
    }

    if (isHardBuyer) {
      setHardBuyerPhase("resolved");
      return;
    }

    setTimeout(() => newRound(), 1500);
  }

  function newRound() {
    const { priceRange, roundTo } = diffConfig;
    const price = randomPrice(priceRange.min, priceRange.max, roundTo);
    setTargetPrice(price);
    if (difficulty === "hard" && effectiveMode === "buyer") {
      setHardRoundDenominationIds(
        buildHardRoundDenominations(price, diffConfig.availableDenominations)
      );
    } else {
      setHardRoundDenominationIds(null);
    }

    const randomItem = SHOP_ITEMS[Math.floor(Math.random() * SHOP_ITEMS.length)];
    setItemName(randomItem.name);

    setSelectedCurrency([]);
    setFeedback(null);
    setHardBuyerPhase("selecting");
    setSubmittedTotal(null);
    setExpectedChangeForCheck(null);
    setCashierGivenChange(null);
    setCashierChangeIsCorrect(null);
    setUltraAnswer("");
    setUltraExpectedSen(null);
    setUltraPaidBreakdown([]);

    if (isUltra) {
      let paidBreakdown: SelectedCurrency[] = [];
      let paidTotal = 0;

      for (let i = 0; i < 30; i++) {
        paidBreakdown = buildUltraPaymentBreakdown(price);
        paidTotal = sumSelection(paidBreakdown);
        if (paidTotal > price && paidTotal - price <= ULTRA_MAX_CHANGE) break;
      }

      if (paidTotal <= price || paidTotal - price > ULTRA_MAX_CHANGE) {
        paidBreakdown = buildUltraPaymentBreakdown(Math.max(50, price - 150));
        paidTotal = sumSelection(paidBreakdown);
      }

      const change = Math.max(5, paidTotal - price);
      setUltraPaidBreakdown(paidBreakdown);
      setCustomerPayment(price + change);
      setUltraExpectedSen(change);
      return;
    }

    // For cashier mode: generate customer payment (overpay by small amount)
    if (effectiveMode === "cashier") {
      const overpay = Math.ceil((price + 100) / 100) * 100; // round up to nearest ringgit + extra
      setCustomerPayment(overpay);
    } else {
      setCustomerPayment(0);
    }
  }

  useEffect(() => {
    if (!gameOver && !gameWon) {
      newRound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty, mode]);

  const totalSelected = useMemo(
    () => sumSelection(selectedCurrency),
    [selectedCurrency]
  );

  function addCurrency(itemId: string) {
    if (isLockedForInput) return;

    setSelectedCurrency((prev) => {
      const existing = prev.find((s) => s.itemId === itemId);
      if (existing) {
        return prev.map((s) => (s.itemId === itemId ? { ...s, count: s.count + 1 } : s));
      }
      return [...prev, { itemId, count: 1 }];
    });
  }

  function removeCurrency(itemId: string) {
    if (isLockedForInput) return;

    setSelectedCurrency((prev) => {
      const existing = prev.find((s) => s.itemId === itemId);
      if (!existing || existing.count <= 1) {
        return prev.filter((s) => s.itemId !== itemId);
      }
      return prev.map((s) => (s.itemId === itemId ? { ...s, count: s.count - 1 } : s));
    });
  }

  function clearSelection() {
    if (isLockedForInput) return;
    setSelectedCurrency([]);
  }

  function verifyHardChange(playerSaysCorrect: boolean) {
    if (!isHardBuyer || hardBuyerPhase !== "verify") return;
    if (cashierChangeIsCorrect === null || expectedChangeForCheck === null || cashierGivenChange === null) return;

    const userAnswerIsCorrect = playerSaysCorrect === cashierChangeIsCorrect;

    if (userAnswerIsCorrect) {
      const verifyMsg =
        cashierChangeIsCorrect
          ? lang === "ms"
            ? "Betul, baki yang diberi adalah tepat."
            : lang === "en"
            ? "Correct, the change given is accurate."
            : "Correcto, el cambio entregado es correcto."
          : lang === "ms"
          ? "Betul, baki yang diberi memang salah."
          : lang === "en"
          ? "Correct, the change given is indeed wrong."
          : "Correcto, el cambio entregado sí está mal.";

      finishCorrectRound(attempts, verifyMsg);
      return;
    }

    const verifyWrongMsg =
      cashierChangeIsCorrect
        ? lang === "ms"
          ? `Salah. Baki sebenarnya betul: ${formatRM(expectedChangeForCheck)}.`
          : lang === "en"
          ? `Wrong. The change is actually correct: ${formatRM(expectedChangeForCheck)}.`
          : `Incorrecto. El cambio sí era correcto: ${formatRM(expectedChangeForCheck)}.`
        : lang === "ms"
        ? `Salah. Baki sepatutnya ${formatRM(expectedChangeForCheck)}, tetapi juruwang beri ${formatRM(cashierGivenChange)}.`
        : lang === "en"
        ? `Wrong. Correct change is ${formatRM(expectedChangeForCheck)}, but cashier gave ${formatRM(cashierGivenChange)}.`
        : `Incorrecto. El cambio correcto es ${formatRM(expectedChangeForCheck)}, pero el cajero dio ${formatRM(cashierGivenChange)}.`;

    finishWrongRound(attempts, verifyWrongMsg);
  }

  function nextHardRound() {
    if (!isHardBuyer || hardBuyerPhase !== "resolved" || gameOver || gameWon) return;
    newRound();
  }

  function submit() {
    if (gameOver || gameWon) return;
    if (isHardBuyer && hardBuyerPhase !== "selecting") return;

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (isUltra) {
      const expectedSen = ultraExpectedSen ?? Math.max(0, customerPayment - targetPrice);
      const accepted = buildMalayCurrencyAnswerSet(expectedSen);
      const typed = normalizeMalayCurrencyText(ultraAnswer);
      const canonical = senToMalayCurrencyWords(expectedSen);

      if (accepted.has(typed)) {
        finishCorrectRound(
          nextAttempts,
          lang === "ms"
            ? "Betul! Sebutan anda tepat."
            : lang === "en"
            ? "Correct! Your Malay amount is accurate."
            : "Correcto. Tu respuesta en malayo es precisa."
        );
        return;
      }

      finishWrongRound(
        nextAttempts,
        lang === "ms"
          ? `Salah. Jawapan yang betul: "${canonical}".`
          : lang === "en"
          ? `Wrong. Correct phrase: "${canonical}".`
          : `Incorrecto. Frase correcta: "${canonical}".`
      );
      return;
    }

    if (isHardBuyer) {
      const submittedPlan = getSelectedPaymentPlan(selectedCurrency, targetPrice);
      const bestPlan = findPreferredHardPaymentPlan(targetPrice, availableCurrency);
      setSubmittedTotal(submittedPlan.total);

      if (!bestPlan) {
        finishWrongRound(
          nextAttempts,
          lang === "ms"
            ? "Salah. Tiada kombinasi bayaran yang sah untuk soalan ini."
            : lang === "en"
            ? "Wrong. No valid payment combination for this question."
            : "Incorrecto. No hay combinación de pago válida para esta pregunta."
        );
        return;
      }

      if (submittedPlan.total < targetPrice) {
        const msg =
          lang === "ms"
            ? `Salah. Bayaran tidak cukup (${formatRM(submittedPlan.total)}). Tambah sekurang-kurangnya ${formatRM(targetPrice - submittedPlan.total)}.`
            : lang === "en"
            ? `Wrong. Payment is not enough (${formatRM(submittedPlan.total)}). Add at least ${formatRM(targetPrice - submittedPlan.total)}.`
            : `Incorrecto. El pago no es suficiente (${formatRM(submittedPlan.total)}). Añade al menos ${formatRM(targetPrice - submittedPlan.total)}.`;
        finishWrongRound(nextAttempts, msg);
        return;
      }

      if (comparePaymentPlan(submittedPlan, bestPlan) !== 0) {
        const coinMultiplier = getHardCoinMultiplier(targetPrice);
        const msg =
          lang === "ms"
            ? `Salah. Mod sukar guna skor = (lebihan/harga) + (bilangan syiling x ${coinMultiplier.toFixed(3)}). Bayaran terbaik: ${formatRM(bestPlan.total)}.`
            : lang === "en"
            ? `Wrong. Hard mode score = (overpay/price) + (coin count x ${coinMultiplier.toFixed(3)}). Best payment: ${formatRM(bestPlan.total)}.`
            : `Incorrecto. Puntuacion dificil = (exceso/precio) + (cantidad de monedas x ${coinMultiplier.toFixed(3)}). Mejor pago: ${formatRM(bestPlan.total)}.`;
        finishWrongRound(nextAttempts, msg);
        return;
      }

      const expectedChange = submittedPlan.total - targetPrice;
      const shouldGiveCorrectChange = Math.random() < 0.5;
      const shownChange = shouldGiveCorrectChange
        ? expectedChange
        : makeWrongChange(expectedChange, smallestDenomination);

      setExpectedChangeForCheck(expectedChange);
      setCashierGivenChange(shownChange);
      setCashierChangeIsCorrect(shouldGiveCorrectChange);
      setHardBuyerPhase("verify");
      setFeedback({
        ok: true,
        msg:
          lang === "ms"
            ? `Juruwang beri baki ${formatRM(shownChange)}. Adakah baki ini betul?`
            : lang === "en"
            ? `Cashier gives ${formatRM(shownChange)} as change. Is this correct?`
            : `El cajero da ${formatRM(shownChange)} de cambio. ¿Es correcto?`,
      });
      triggerPopup(lang === "ms" ? "Semak baki" : lang === "en" ? "Check change" : "Revisa cambio");
      return;
    }

    let isCorrect = false;

    if (effectiveMode === "buyer") {
      // Buyer mode: must pay exact amount
      isCorrect = totalSelected === targetPrice;
    } else {
      // Cashier mode: must return correct change
      const expectedChange = customerPayment - targetPrice;
      isCorrect = totalSelected === expectedChange;
    }

    if (isCorrect) {
      finishCorrectRound(nextAttempts);
      return;
    }

    const expectedMsg =
      effectiveMode === "buyer"
        ? `${lang === "ms" ? "Jumlah betul: " : lang === "en" ? "Correct amount: " : "Cantidad correcta: "}${formatRM(targetPrice)}`
        : `${lang === "ms" ? "Baki betul: " : lang === "en" ? "Correct change: " : "Cambio correcto: "}${formatRM(customerPayment - targetPrice)}`;

    finishWrongRound(
      nextAttempts,
      `${lang === "ms" ? "Salah. " : lang === "en" ? "Wrong. " : "Incorrecto. "}${expectedMsg}`
    );
  }

  function restart() {
    recordedRef.current = false;
    setGameOver(false);
    setGameWon(false);

    setLives(MAX_LIVES);
    setAttempts(0);
    setCorrectCount(0);
    setWrongCount(0);

    startedAtRef.current = Date.now();
    setElapsedMs(0);

    newRound();
  }

  function pickLang(next: UiLang) {
    setLang(next);
    writeUiLang(next);
  }

  const title =
    lang === "ms" ? "WANG\nMALAYSIA" : lang === "en" ? "MALAYSIAN\nCURRENCY" : "MONEDA\nMALASIA";

  const requiredChapter = MINIGAME_PREREQUISITES.currency;
  const unlocked = isMinigameUnlocked(user, "currency");

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
            Complete Chapter {requiredChapter} first to play Currency.
          </p>
          <div className="mt-6 flex gap-3">
            <IconActionLink href="/map" kind="map" tooltip="Back to Map" />
            <IconActionLink href="/minigames" kind="minigames" tooltip="Back to Mini Games" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-cover bg-center px-6 py-10">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/backgrounds/worldbackground.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="crash-text crash-outline-fallback whitespace-pre-line text-6xl font-black leading-none">
              {title}
            </h1>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {/* Stats */}
            <div className="rounded-2xl bg-white/85 p-4 shadow">
              <div className="text-xs font-black opacity-70">
                {pick({ ms: "STATUS", en: "STATUS", es: "ESTADO" }, lang)}
              </div>

              <div className="mt-2 space-y-2 text-sm font-semibold">
                <div>
                  <div className="text-[11px] font-black opacity-60">
                    {lang === "ms" ? "NYAWA" : lang === "en" ? "LIVES" : "VIDAS"}
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    {Array.from({ length: MAX_LIVES }).map((_, i) => (
                      <Image
                        key={i}
                        src={AKU2_IDLE_SRC}
                        alt="life"
                        width={40}
                        height={40}
                        className={[
                          "h-14 w-14 drop-shadow",
                          i < lives ? "opacity-100" : "opacity-25 grayscale",
                        ].join(" ")}
                        priority
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[11px] font-black opacity-60">
                      {lang === "ms" ? "BETUL" : lang === "en" ? "CORRECT" : "CORRECTAS"}
                    </div>
                    <div className="mt-1 font-extrabold">{correctCount}/10</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-black opacity-60">
                      {lang === "ms" ? "MASA" : lang === "en" ? "TIME" : "TIEMPO"}
                    </div>
                    <div className="mt-1 font-extrabold">{formatDuration(elapsedMs)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="rounded-2xl bg-white/85 p-4 shadow">
              <div className="text-xs font-black opacity-70">LANG</div>

              <div className="mt-2 flex gap-2">
                {(["ms", "en", "es"] as UiLang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => pickLang(l)}
                    className={`rounded-full px-3 py-1 text-xs font-black shadow ${lang === l ? "bg-amber-300" : "bg-white"}`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={restart}
                  className="rounded-xl bg-white px-3 py-2 text-xs font-bold shadow"
                >
                  Restart
                </button>
                <IconActionLink href="/minigames" kind="minigames" tooltip="Back to Mini Games" />
                <IconActionLink href="/map" kind="map" tooltip="Back to Map" />
              </div>
            </div>
          </div>
        </div>

        {/* Difficulty & Mode Selection */}
        <section className="mt-6 rounded-3xl bg-white/90 p-4 shadow-xl">
          <div className="flex flex-wrap items-center gap-6">
            {/* Difficulty */}
            <div>
              <div className="text-xs font-black opacity-60">
                {lang === "ms" ? "TAHAP" : lang === "en" ? "DIFFICULTY" : "DIFICULTAD"}
              </div>
              <div className="mt-2 flex gap-2">
                {(Object.keys(DIFFICULTIES) as DifficultyKey[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setDifficulty(d);
                      if (d === "ultra") setMode("cashier");
                      restart();
                    }}
                    className={[
                      "rounded-full px-3 py-1 text-xs font-black shadow",
                      difficulty === d ? "bg-amber-300" : "bg-white",
                    ].join(" ")}
                  >
                    {pick(DIFFICULTIES[d].label, lang)}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode */}
            <div>
              <div className="text-xs font-black opacity-60">
                {lang === "ms" ? "MOD" : lang === "en" ? "MODE" : "MODO"}
              </div>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => {
                    if (isUltra) return;
                    setMode("buyer");
                    restart();
                  }}
                  disabled={isUltra}
                  className={[
                    "rounded-full px-3 py-1 text-xs font-black shadow",
                    effectiveMode === "buyer" ? "bg-emerald-300" : "bg-white",
                    isUltra ? "opacity-40 cursor-not-allowed" : "",
                  ].join(" ")}
                >
                  {lang === "ms" ? "Pembeli" : lang === "en" ? "Buyer" : "Comprador"}
                </button>
                <button
                  onClick={() => {
                    setMode("cashier");
                    restart();
                  }}
                  className={[
                    "rounded-full px-3 py-1 text-xs font-black shadow",
                    effectiveMode === "cashier" ? "bg-emerald-300" : "bg-white",
                  ].join(" ")}
                >
                  {lang === "ms" ? "Juruwang" : lang === "en" ? "Cashier" : "Cajero"}
                </button>
              </div>
              {isUltra && (
                <div className="mt-2 text-[11px] font-semibold opacity-70">
                  {lang === "ms"
                    ? "Ultra menggunakan mod juruwang dengan jawapan bertulis."
                    : lang === "en"
                    ? "Ultra uses cashier mode with written answers."
                    : "Ultra usa modo cajero con respuesta escrita."}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Game Area */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Left: Scenario */}
          <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
            <div className="text-xl font-extrabold">
              {effectiveMode === "buyer"
                ? lang === "ms"
                  ? "Anda Membeli"
                  : lang === "en"
                  ? "You're Buying"
                  : "Estás Comprando"
                : lang === "ms"
                ? "Anda Juruwang"
                : lang === "en"
                ? "You're the Cashier"
                : "Eres el Cajero"}
            </div>

            <div className="mt-4 rounded-2xl bg-black/5 p-4">
              <div className="text-sm font-black">{pick(itemName, lang)}</div>
              <div className="mt-2 text-3xl font-extrabold">{formatRM(targetPrice)}</div>

              {effectiveMode === "cashier" && (
                <div className="mt-3 rounded-xl bg-amber-100/70 p-3">
                  <div className="text-xs font-black opacity-60">
                    {lang === "ms" ? "PELANGGAN BAYAR" : lang === "en" ? "CUSTOMER PAYS" : "CLIENTE PAGA"}
                  </div>
                  <div className="mt-1 text-2xl font-extrabold">{formatRM(customerPayment)}</div>
                  <div className="mt-2 text-xs font-semibold opacity-70">
                    {lang === "ms"
                      ? "Kira baki yang perlu dipulangkan."
                      : lang === "en"
                      ? "Calculate the change to return."
                      : "Calcula el cambio a devolver."}
                  </div>

                  {isUltra && ultraPaidBreakdown.length > 0 && (
                    <div className="mt-3 rounded-lg bg-white/70 p-2">
                      <div className="text-[11px] font-black opacity-60">
                        {lang === "ms" ? "GABUNGAN TUNAI DIBAYAR" : lang === "en" ? "CASH COMBINATION PAID" : "COMBINACION DE EFECTIVO PAGADO"}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {ultraPaidBreakdown.map((sel) => {
                          const item = CURRENCY_ITEMS.find((c) => c.id === sel.itemId);
                          if (!item) return null;
                          return (
                            <span key={sel.itemId} className="rounded-full bg-white px-2 py-1 text-[11px] font-black shadow-sm">
                              {pick(item.label, lang)} x{sel.count}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Your selection */}
            <div className="mt-4 rounded-2xl bg-emerald-50 p-4">
              <div className="text-xs font-black opacity-60">
                {isUltra
                  ? lang === "ms"
                    ? "TAIP BAKI (BM)"
                    : lang === "en"
                    ? "TYPE CHANGE (MALAY)"
                    : "ESCRIBE CAMBIO (MALAYO)"
                  : effectiveMode === "buyer"
                  ? lang === "ms"
                    ? "ANDA BAYAR"
                    : lang === "en"
                    ? "YOU PAY"
                    : "PAGAS"
                  : lang === "ms"
                  ? "ANDA PULANG"
                  : lang === "en"
                  ? "YOU RETURN"
                  : "DEVUELVES"}
              </div>
              {isUltra ? (
                <>
                  <div className="mt-1 text-2xl font-extrabold">{formatRM(ultraExpectedSen ?? Math.max(0, customerPayment - targetPrice))}</div>
                  <div className="mt-2 text-xs font-semibold opacity-70">
                    {lang === "ms"
                      ? "Tulis baki dalam Bahasa Melayu. Contoh: sepuluh ringgit dua puluh sen."
                      : lang === "en"
                      ? "Write the change in Malay words. Example: sepuluh ringgit dua puluh sen."
                      : "Escribe el cambio en palabras en malayo. Ejemplo: sepuluh ringgit dua puluh sen."}
                  </div>
                  <input
                    type="text"
                    value={ultraAnswer}
                    onChange={(e) => setUltraAnswer(e.target.value)}
                    disabled={gameOver || gameWon}
                    placeholder={lang === "ms" ? "contoh: sepuluh ringgit dua puluh sen" : "e.g. sepuluh ringgit dua puluh sen"}
                    className="mt-3 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-emerald-400 disabled:opacity-60"
                  />
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={submit}
                      disabled={gameOver || gameWon}
                      className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white shadow hover:bg-emerald-500 disabled:opacity-50"
                    >
                      {lang === "ms" ? "Semak" : lang === "en" ? "Check" : "Comprobar"}
                    </button>
                    <button
                      onClick={() => setUltraAnswer("")}
                      disabled={gameOver || gameWon}
                      className="rounded-xl bg-white px-4 py-2 text-sm font-bold shadow hover:bg-rose-100 disabled:opacity-50"
                    >
                      {lang === "ms" ? "Kosongkan" : lang === "en" ? "Clear" : "Limpiar"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-1 text-2xl font-extrabold">
                    {shouldHideRunningTotal
                      ? "RM_._ _"
                      : formatRM(submittedTotal ?? totalSelected)}
                  </div>

                  {difficulty === "hard" && hardBuyerPhase === "selecting" && (
                    <div className="mt-2 text-xs font-semibold opacity-70">
                      {lang === "ms"
                        ? "Mod sukar: jumlah bayaran disembunyikan sehingga anda tekan Semak."
                        : lang === "en"
                        ? "Hard mode: payment total is hidden until you press Check."
                        : "Modo dificil: el total del pago se oculta hasta que pulses Comprobar."}
                    </div>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedCurrency.map((sel) => {
                      const item = CURRENCY_ITEMS.find((c) => c.id === sel.itemId);
                      if (!item) return null;

                      return (
                        <button
                          key={sel.itemId}
                          onClick={() => removeCurrency(sel.itemId)}
                          disabled={isLockedForInput}
                          className="rounded-xl bg-white px-3 py-2 text-xs font-black shadow hover:bg-rose-100 disabled:opacity-50"
                          title="Click to remove"
                        >
                          {pick(item.label, lang)} x{sel.count}
                        </button>
                      );
                    })}
                  </div>

                  {isHardBuyer && hardBuyerPhase === "verify" ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => verifyHardChange(true)}
                        disabled={gameOver || gameWon}
                        className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white shadow hover:bg-emerald-500 disabled:opacity-50"
                      >
                        {lang === "ms" ? "Baki Betul" : lang === "en" ? "Change Correct" : "Cambio Correcto"}
                      </button>
                      <button
                        onClick={() => verifyHardChange(false)}
                        disabled={gameOver || gameWon}
                        className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-black text-white shadow hover:bg-rose-500 disabled:opacity-50"
                      >
                        {lang === "ms" ? "Baki Salah" : lang === "en" ? "Change Wrong" : "Cambio Incorrecto"}
                      </button>
                    </div>
                  ) : isHardBuyer && hardBuyerPhase === "resolved" ? (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={nextHardRound}
                        disabled={gameOver || gameWon}
                        className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-black text-white shadow hover:bg-amber-400 disabled:opacity-50"
                      >
                        {lang === "ms" ? "Soalan Seterusnya" : lang === "en" ? "Next Question" : "Siguiente Pregunta"}
                      </button>
                    </div>
                  ) : (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={submit}
                        disabled={gameOver || gameWon}
                        className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white shadow hover:bg-emerald-500 disabled:opacity-50"
                      >
                        {lang === "ms" ? "Semak" : lang === "en" ? "Check" : "Comprobar"}
                      </button>
                      <button
                        onClick={clearSelection}
                        disabled={isLockedForInput}
                        className="rounded-xl bg-white px-4 py-2 text-sm font-bold shadow hover:bg-rose-100 disabled:opacity-50"
                      >
                        {lang === "ms" ? "Kosongkan" : lang === "en" ? "Clear" : "Limpiar"}
                      </button>
                    </div>
                  )}

                  {isHardBuyer && hardBuyerPhase !== "selecting" && cashierGivenChange !== null && (
                    <div className="mt-4 rounded-xl bg-amber-100/80 p-3">
                      <div className="text-xs font-black opacity-60">
                        {lang === "ms" ? "BAKI DIBERI JURUWANG" : lang === "en" ? "CASHIER GIVES CHANGE" : "CAMBIO QUE DA EL CAJERO"}
                      </div>
                      <div className="mt-1 text-xl font-extrabold">{formatRM(cashierGivenChange)}</div>
                    </div>
                  )}
                </>
              )}

              {feedback && (
                <div
                  className={[
                    "mt-4 rounded-2xl p-3 text-sm font-semibold",
                    feedback.ok ? "bg-emerald-100/80" : "bg-rose-100/80",
                  ].join(" ")}
                >
                  {feedback.msg}
                </div>
              )}
            </div>
          </section>

          {/* Right: Available Currency */}
          <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
            <div className="text-xl font-extrabold">
              {isUltra
                ? lang === "ms"
                  ? "Ultra: Tulis Baki"
                  : lang === "en"
                  ? "Ultra: Write Change"
                  : "Ultra: Escribe Cambio"
                : lang === "ms"
                ? "Wang Tersedia"
                : lang === "en"
                ? "Available Money"
                : "Dinero Disponible"}
            </div>

            {isUltra ? (
              <div className="mt-4 rounded-2xl bg-black/5 p-4 text-sm font-semibold opacity-80">
                <div>
                  {lang === "ms"
                    ? "Lihat harga barang, jumlah dibayar pelanggan, dan baki."
                    : lang === "en"
                    ? "Use the item price, customer payment, and change amount shown."
                    : "Usa el precio, el pago del cliente y el cambio mostrado."}
                </div>
                <div className="mt-2">
                  {lang === "ms"
                    ? "Tugas anda: taip baki dalam Bahasa Melayu dengan ejaan penuh."
                    : lang === "en"
                    ? "Your task: type the change amount in full Malay words."
                    : "Tu tarea: escribir el cambio en malayo con palabras completas."}
                </div>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-3">
                {availableCurrency.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => addCurrency(item.id)}
                    disabled={isLockedForInput}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-white p-3 shadow transition hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50"
                  >
                    <Image
                      src={item.imagePath}
                      alt={pick(item.label, lang)}
                      width={item.type === "note" ? 200 : 100}
                      height={item.type === "note" ? 100 : 100}
                      className="mx-auto h-auto w-full object-contain drop-shadow-sm"
                    />
                    {difficulty !== "hard" && (
                      <div className="mt-2 text-center text-sm font-black opacity-70">
                        {pick(item.label, lang)}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Game Over / Win */}
        {(gameOver || gameWon) && (
          <section
            className={[
              "mt-6 rounded-3xl p-6 shadow-xl",
              gameWon ? "bg-emerald-100/90" : "bg-rose-100/90",
            ].join(" ")}
          >
            <div className="text-2xl font-black">
              {gameWon
                ? lang === "ms"
                  ? "Tahniah! Anda menang!"
                  : lang === "en"
                  ? "Congrats! You won!"
                  : "¡Felicidades! ¡Ganaste!"
                : lang === "ms"
                ? "Permainan tamat"
                : lang === "en"
                ? "Game Over"
                : "Fin del juego"}
            </div>

            <div className="mt-2 text-sm font-semibold opacity-90">
              {lang === "ms" ? "Betul" : lang === "en" ? "Correct" : "Correctas"}: {correctCount}/10 •{" "}
              {lang === "ms" ? "Masa" : lang === "en" ? "Time" : "Tiempo"}: {formatDuration(elapsedMs)}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={restart}
                className="rounded-xl bg-white px-4 py-2 text-sm font-black shadow"
              >
                {lang === "ms" ? "Main semula" : lang === "en" ? "Restart" : "Reiniciar"}
              </button>
              <IconActionLink href="/minigames" kind="minigames" tooltip="Back to Mini Games" />
            </div>
          </section>
        )}
      </div>

      {/* Popup */}
      {popupText && (
        <div
          className={[
            "pointer-events-none fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300",
            popupFade ? "opacity-0" : "opacity-100",
          ].join(" ")}
        >
          <div className="flex flex-col items-center gap-0">
            <Image
              src={popupAvatarSrc}
              alt="AkuAku"
              width={popupAvatarSize}
              height={popupAvatarSize}
              className="animate-bounce drop-shadow-lg"
              priority
            />
            {!popupIsPositive && (
              <div className="text-center text-lg font-black text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">
                {popupText}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
