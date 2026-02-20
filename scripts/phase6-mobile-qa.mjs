#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import process from "node:process";
import { chromium, devices } from "playwright";

function parseArgs(argv) {
  const out = {
    baseUrl: "http://127.0.0.1:3300",
    out: "reports/phase6-mobile-qa.json",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--base-url" && argv[i + 1]) {
      out.baseUrl = argv[i + 1];
      i += 1;
      continue;
    }
    if (arg === "--out" && argv[i + 1]) {
      out.out = argv[i + 1];
      i += 1;
    }
  }

  return out;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function bodyText(page) {
  return (await page.locator("body").innerText()).replace(/\s+/g, " ").trim();
}

async function expectText(page, pattern, context) {
  const text = await bodyText(page);
  assert(pattern.test(text), `${context}: missing expected text ${pattern}`);
}

async function expectUnlocked(page, context) {
  const text = await bodyText(page);
  assert(!/select a user first/i.test(text), `${context}: user gate shown`);
  assert(!/\blocked\b|\blocked:/i.test(text), `${context}: locked gate shown`);
  assert(!/\bLOCKED\b/i.test(text), `${context}: locked heading shown`);
}

async function goAndCheck(page, path, expectedRegex) {
  await page.goto(path, { waitUntil: "networkidle" });
  await expectUnlocked(page, path);
  await expectText(page, expectedRegex, path);
}

async function samplePerf(page, route, durationMs = 3000) {
  await page.goto(route, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const raf = await page.evaluate(async (dur) => {
    const start = performance.now();
    let prev = start;
    let frames = 0;
    let longFrames = 0;

    await new Promise((resolve) => {
      const tick = (ts) => {
        frames += 1;
        const delta = ts - prev;
        if (delta > 34) longFrames += 1;
        prev = ts;
        if (ts - start >= dur) {
          resolve();
          return;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });

    const elapsed = performance.now() - start;
    const avgFps = frames * 1000 / Math.max(elapsed, 1);
    const longFramePct = frames > 0 ? (longFrames / frames) * 100 : 0;
    return {
      durationMs: Math.round(elapsed),
      frames,
      longFrames,
      avgFps: Number(avgFps.toFixed(2)),
      longFramePct: Number(longFramePct.toFixed(2)),
    };
  }, durationMs);

  const clickLatencyMs = await page.evaluate(async () => {
    const button = document.querySelector("button:not([disabled])");
    if (!button) return null;
    const t0 = performance.now();
    button.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    return Number((performance.now() - t0).toFixed(2));
  });

  return {
    route,
    ...raf,
    clickLatencyMs,
    pass: raf.avgFps >= 28 && raf.longFramePct <= 45,
  };
}

async function closeAkuAkuPopupIfPresent(page) {
  const popupRoot = page.locator("div.fixed.inset-0.z-50");
  const hasPopup = await popupRoot.first().isVisible().catch(() => false);
  if (!hasPopup) return;

  for (let i = 0; i < 20; i += 1) {
    const closeBtn = popupRoot.getByRole("button", { name: /^Close$/i }).first();
    if (await closeBtn.isVisible().catch(() => false)) {
      await closeBtn.click();
      await popupRoot.first().waitFor({ state: "hidden", timeout: 5000 }).catch(() => {});
      return;
    }

    const nextBtn = popupRoot.getByRole("button", { name: /^Next$/i }).first();
    if (await nextBtn.isVisible().catch(() => false)) {
      await nextBtn.click();
      await page.waitForTimeout(80);
      continue;
    }

    break;
  }
}

async function createContext(browser, profile) {
  const preset = devices[profile.device];
  if (!preset) throw new Error(`Missing Playwright device preset: ${profile.device}`);

  const portrait = preset.viewport;
  const viewport = profile.landscape
    ? { width: portrait.height, height: portrait.width }
    : { ...portrait };

  const context = await browser.newContext({
    ...preset,
    viewport,
  });

  await context.addInitScript(() => {
    window.localStorage.setItem("learnMalay.uiLang.v1", "en");
  });

  return context;
}

async function runFlowForProfile(browser, baseUrl, profile) {
  const context = await createContext(browser, profile);
  const page = await context.newPage();

  const runId = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  const userName = `QA_${profile.id}_${runId}`.slice(0, 31);
  const password = "QaPass123";

  const result = {
    profile: {
      id: profile.id,
      label: profile.label,
      device: profile.device,
      orientation: profile.landscape ? "landscape" : "portrait",
    },
    user: userName,
    checks: {
      createAccount: false,
      login: false,
      mapProgression: false,
      chapterCompletionUnlock: false,
      minigames: false,
      performance: false,
    },
    performance: [],
    notes: [],
    pass: false,
  };

  try {
    const createRes = await context.request.post(`${baseUrl}/api/users`, {
      data: {
        name: userName,
        password,
      },
    });
    assert(createRes.ok(), `user bootstrap failed: ${createRes.status()}`);
    result.checks.createAccount = true;

    await context.request.delete(`${baseUrl}/api/users/current`);

    await page.goto(`${baseUrl}/user`, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /^Login$/i }).first().click();
    await page.getByPlaceholder("Enter your username").fill(userName);
    await page.getByPlaceholder("Enter your password").fill(password);
    await page.getByRole("button", { name: /^Login$/i }).last().click();

    await page.waitForURL("**/map", { timeout: 15000 });
    await page.getByText(/Current Chapter:/i).first().waitFor({ timeout: 15000 });
    await expectText(page, /Current Chapter:/i, "map after login");
    result.checks.login = true;

    await page.goto(`${baseUrl}/chapter/1`, { waitUntil: "networkidle" });
    await closeAkuAkuPopupIfPresent(page);

    const nextButton = page.locator("button.rounded-xl.bg-emerald-600.px-3.py-2.text-xs.font-black");
    for (let i = 0; i < 80; i += 1) {
      if (await nextButton.isDisabled()) break;
      await nextButton.click();
      await page.waitForTimeout(120);
    }

    const markDoneBtn = page.getByRole("button", {
      name: /Mark as done \(unlock next\)|Already unlocked/i,
    });
    await markDoneBtn.waitFor({ timeout: 10000 });

    const markText = await markDoneBtn.innerText();
    if (!/Already unlocked/i.test(markText)) {
      await markDoneBtn.click();
      await page.waitForTimeout(400);
    }

    await page.goto(`${baseUrl}/map`, { waitUntil: "networkidle" });
    await expectText(page, /Current Chapter:\s*2/i, "map after chapter 1 complete");
    result.checks.mapProgression = true;
    result.checks.chapterCompletionUnlock = true;

    await page.goto(`${baseUrl}/user`, { waitUntil: "networkidle" });
    const switchUserBtn = page.getByRole("button", { name: /Switch User/i });
    if (await switchUserBtn.isVisible().catch(() => false)) {
      await switchUserBtn.click();
    }
    await page.getByRole("button", { name: /^Login$/i }).first().click();
    await page.getByPlaceholder("Enter your username").fill("ADMIN");
    await page.getByPlaceholder("Enter your password").fill("admin");
    await page.getByRole("button", { name: /^Login$/i }).last().click();
    await page.getByPlaceholder("Admin password").fill("admin");
    await page.getByRole("button", { name: /Login as Admin/i }).click();
    await page.waitForURL("**/map", { timeout: 15000 });

    await page.goto(`${baseUrl}/minigames`, { waitUntil: "networkidle" });
    await expectText(page, /Current progress:\s*Chapter\s*11|ADMIN MODE/i, "minigames hub progress");

    const routeChecks = [
      { path: "/minigames/numbers", expected: /NUMBERS|NOMBOR|NÚMEROS/i },
      { path: "/minigames/numbers/play", expected: /NUMBER GAME|NOMBOR|JUEGO DE/i },
      { path: "/minigames/word-match", expected: /WORD MATCH|PADAN|EMPAREJAR/i },
      { path: "/minigames/word-match/play", expected: /WORD MATCH|PADAN|EMPAREJAR/i },
      { path: "/minigames/wordsearch", expected: /WORD SEARCH|CARI|SOPA/i },
      { path: "/minigames/currency", expected: /CURRENCY|WANG|MONEDA/i },
      { path: "/minigames/currency/play", expected: /MALAYSIAN|WANG|MONEDA/i },
      { path: "/minigames/makan-apa", expected: /WHAT TO EAT|MAKAN|COMER/i },
      { path: "/minigames/makan-apa/play", expected: /WHAT TO EAT|MAKAN|COMER/i },
      { path: "/minigames/misi-membeli", expected: /SHOPPING MISSION|MISI|MISION/i },
      { path: "/minigames/misi-membeli/play", expected: /SHOPPING MISSION|MISI|MISION/i },
      { path: "/minigames/highscores", expected: /HIGH SCORES/i },
    ];

    for (const check of routeChecks) {
      await goAndCheck(page, `${baseUrl}${check.path}`, check.expected);
    }
    result.checks.minigames = true;

    const perfRoutes = [
      `${baseUrl}/minigames/misi-membeli/play`,
      `${baseUrl}/minigames/wordsearch`,
      `${baseUrl}/chapter/7`,
    ];

    for (const route of perfRoutes) {
      const perf = await samplePerf(page, route);
      result.performance.push(perf);
    }

    result.checks.performance = result.performance.every((entry) => entry.pass);
    if (!result.checks.performance) {
      result.notes.push("One or more perf samples fell below threshold (avgFps >= 28 and longFramePct <= 45).");
    }

    result.pass = Object.values(result.checks).every(Boolean);
  } catch (error) {
    result.pass = false;
    result.notes.push(error instanceof Error ? error.message : String(error));
  } finally {
    await context.close();
  }

  return result;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const profiles = [
    { id: "ios_p", label: "iPhone 12 portrait", device: "iPhone 12", landscape: false },
    { id: "ios_l", label: "iPhone 12 landscape", device: "iPhone 12", landscape: true },
    { id: "android_p", label: "Pixel 5 portrait", device: "Pixel 5", landscape: false },
    { id: "android_l", label: "Pixel 5 landscape", device: "Pixel 5", landscape: true },
  ];

  const browser = await chromium.launch({ headless: true });
  const startedAt = new Date().toISOString();

  const results = [];
  try {
    for (const profile of profiles) {
      console.log(`Running QA: ${profile.label}`);
      const res = await runFlowForProfile(browser, args.baseUrl, profile);
      results.push(res);
    }
  } finally {
    await browser.close();
  }

  const summary = {
    startedAt,
    finishedAt: new Date().toISOString(),
    baseUrl: args.baseUrl,
    profileCount: results.length,
    passCount: results.filter((r) => r.pass).length,
    failCount: results.filter((r) => !r.pass).length,
    checks: {
      createAccount: results.every((r) => r.checks.createAccount),
      login: results.every((r) => r.checks.login),
      mapProgression: results.every((r) => r.checks.mapProgression),
      chapterCompletionUnlock: results.every((r) => r.checks.chapterCompletionUnlock),
      minigames: results.every((r) => r.checks.minigames),
      performance: results.every((r) => r.checks.performance),
    },
    results,
  };

  const outPath = args.out;
  const slash = outPath.lastIndexOf("/");
  if (slash !== -1) {
    await mkdir(outPath.slice(0, slash), { recursive: true });
  }
  await writeFile(outPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");

  console.log(`Wrote QA report: ${outPath}`);

  if (summary.failCount > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
