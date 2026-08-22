import assert from "node:assert/strict";
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { once } from "node:events";
import net from "node:net";
import path from "node:path";
import process from "node:process";
import test from "node:test";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
let baseUrl = "";
let child: ChildProcessWithoutNullStreams | null = null;
let learnerId = "";
let learnerCookie = "";
let legacyLikeUserId = "";

test.before(async () => {
  const port = await openPort();
  baseUrl = `http://127.0.0.1:${port}`;
  child = spawn(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "start", "--", "--hostname", "127.0.0.1", "--port", String(port)], {
    cwd: ROOT,
    env: {
      ...process.env,
      NODE_ENV: "production",
      NEXT_TELEMETRY_DISABLED: "1",
      MONGODB_URI: "",
      LEARN_MALAY_ADMIN_PASSWORD: "admin-analytics-password",
      LEARN_MALAY_DEMO_PASSWORD: "demo-analytics-password",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let ready = false;
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/api/admin/analytics`);
      if (response.status === 401) {
        ready = true;
        break;
      }
    } catch {
      // Wait for the production server.
    }
    await delay(250);
  }
  if (!ready) throw new Error("admin analytics test app server did not start");

  learnerId = `ANALYTICS_USER_${Date.now()}`;
  const registration = await request("/api/users", {
    method: "POST",
    body: JSON.stringify({ name: learnerId, password: "test-password-123", avatarId: "bada" }),
  });
  assert.equal(registration.status, 200);
  learnerCookie = cookieFrom(registration);

  const login = await request("/api/users/login", {
    method: "POST",
    headers: { cookie: learnerCookie },
    body: JSON.stringify({ name: learnerId, password: "test-password-123" }),
  });
  assert.equal(login.status, 200);
  learnerCookie = cookieFrom(login);

  legacyLikeUserId = `ANALYTICS_LEGACY_${Date.now()}`;
  const legacyLikeRegistration = await request("/api/users", {
    method: "POST",
    body: JSON.stringify({ name: legacyLikeUserId, password: "test-password-123", avatarId: "hela" }),
  });
  assert.equal(legacyLikeRegistration.status, 200);
});

test.after(async () => {
  if (!child || child.exitCode !== null) return;
  child.kill("SIGTERM");
  await Promise.race([once(child, "exit"), delay(10_000)]);
  if (child.exitCode === null) child.kill("SIGKILL");
});

test("admin analytics APIs and pages reject unauthenticated, learner, and demo access", async () => {
  const unauthenticated = await fetch(`${baseUrl}/api/admin/analytics`);
  assert.equal(unauthenticated.status, 401);

  for (const endpoint of [
    "/api/admin/analytics",
    "/api/admin/users",
    `/api/admin/users/${encodeURIComponent(learnerId)}`,
  ]) {
    const response = await fetch(`${baseUrl}${endpoint}`, { headers: { cookie: learnerCookie } });
    assert.equal(response.status, 403, endpoint);
    const text = await response.text();
    assert.equal(text.includes("password_hash"), false);
    assert.equal(text.toLowerCase().includes("session"), false);
  }

  const demoLogin = await request("/api/users/login", {
    method: "POST",
    body: JSON.stringify({ name: "demomode", password: "demo-analytics-password" }),
  });
  assert.equal(demoLogin.status, 200);
  const demoResponse = await fetch(`${baseUrl}/api/admin/users`, { headers: { cookie: cookieFrom(demoLogin) } });
  assert.equal(demoResponse.status, 403);

  const learnerPage = await fetch(`${baseUrl}/admin`, {
    headers: { cookie: learnerCookie },
    redirect: "manual",
  });
  assert.equal(learnerPage.status, 307);
  assert.equal(learnerPage.headers.get("location"), "/user");
});

test("admin can retrieve overview, user list, and individual analytics", async () => {
  for (const [eventId, minigameId] of [
    ["40000000-0000-4000-8000-000000000001", "numbers"],
    ["40000000-0000-4000-8000-000000000002", "numbers"],
    ["40000000-0000-4000-8000-000000000003", "word-match"],
  ] as const) {
    const activity = await request("/api/activity", {
      method: "POST",
      headers: { cookie: learnerCookie },
      body: JSON.stringify({ eventId, type: "minigame_started", minigameId }),
    });
    assert.equal(activity.status, 200);
  }

  const completion = await request("/api/users/progress", {
    method: "POST",
    headers: { cookie: learnerCookie },
    body: JSON.stringify({
      id: learnerId,
      progress: { chapter: 2, page: 1 },
      completedChapterId: 1,
    }),
  });
  assert.equal(completion.status, 200);

  const highscore = await request("/api/highscores", {
    method: "POST",
    headers: { cookie: learnerCookie },
    body: JSON.stringify({
      gameId: "numbers",
      run: {
        runId: "50000000-0000-4000-8000-000000000001",
        outcome: "completed",
        accuracy: 100,
        timeMs: 1250,
        attempts: 10,
        correct: 10,
        mistakes: 0,
        hints: 0,
        difficulty: "easy",
      },
    }),
  });
  assert.equal(highscore.status, 200);

  const login = await request("/api/users/login", {
    method: "POST",
    body: JSON.stringify({ name: "admin", password: "admin-analytics-password" }),
  });
  assert.equal(login.status, 200);
  const cookie = cookieFrom(login);

  const overview = await fetch(`${baseUrl}/api/admin/analytics`, { headers: { cookie } });
  assert.equal(overview.status, 200);
  const overviewBody = await overview.json() as { metrics?: { totalUsers?: number }; chapterFunnel?: unknown[]; minigames?: unknown[] };
  assert.equal(typeof overviewBody.metrics?.totalUsers, "number");
  assert.equal(overviewBody.metrics?.totalUsers, 2);
  assert.equal((overviewBody as { metrics?: { totalMinigamePlays?: number } }).metrics?.totalMinigamePlays, 3);
  assert.equal((overviewBody as { metrics?: { totalChapterCompletions?: number } }).metrics?.totalChapterCompletions, 1);
  assert.equal((overviewBody as { metrics?: { totalHighscoreEntries?: number } }).metrics?.totalHighscoreEntries, 1);
  assert.equal(overviewBody.chapterFunnel?.length, 11);
  assert.equal(overviewBody.minigames?.length, 7);

  const users = await fetch(`${baseUrl}/api/admin/users?q=${encodeURIComponent(learnerId)}`, { headers: { cookie } });
  assert.equal(users.status, 200);
  const userRows = await users.json() as Array<{ id: string }>;
  assert.equal(userRows.length, 1);

  const detail = await fetch(`${baseUrl}/api/admin/users/${encodeURIComponent(userRows[0].id)}`, { headers: { cookie } });
  assert.equal(detail.status, 200);
  const detailText = await detail.text();
  assert.equal(detailText.includes("password_hash"), false);
  assert.equal(detailText.toLowerCase().includes("session"), false);
  const detailBody = JSON.parse(detailText) as {
    joinedAt?: string | null;
    lastLoginAt?: string | null;
    lastActiveAt?: string | null;
    minigamePlays?: number;
    highscoreEntries?: number;
    progress?: { chapters?: Array<{ id: number; firstCompletedAt: string | null }> };
  };
  assert.equal(typeof detailBody.joinedAt, "string");
  assert.equal(typeof detailBody.lastLoginAt, "string");
  assert.equal(typeof detailBody.lastActiveAt, "string");
  assert.equal(detailBody.minigamePlays, 3);
  assert.equal(detailBody.highscoreEntries, 1);
  assert.equal(typeof detailBody.progress?.chapters?.find((chapter) => chapter.id === 1)?.firstCompletedAt, "string");

  const legacyLikeDetail = await fetch(`${baseUrl}/api/admin/users/${encodeURIComponent(legacyLikeUserId)}`, { headers: { cookie } });
  assert.equal(legacyLikeDetail.status, 200);
  const legacyLikeBody = await legacyLikeDetail.json() as { lastLoginAt?: string | null; lastActiveAt?: string | null };
  assert.equal(legacyLikeBody.lastLoginAt, null);
  assert.equal(legacyLikeBody.lastActiveAt, null);

  const page = await fetch(`${baseUrl}/admin`, { headers: { cookie } });
  assert.equal(page.status, 200);
  assert.equal((await page.text()).includes("Learner activity at a glance"), true);
});

function request(pathname: string, init: RequestInit) {
  return fetch(`${baseUrl}${pathname}`, {
    ...init,
    headers: { origin: baseUrl, "content-type": "application/json", ...(init.headers ?? {}) },
  });
}

function cookieFrom(response: Response) {
  return response.headers.get("set-cookie")?.split(";", 1)[0] ?? "";
}

function openPort() {
  return new Promise<number>((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") return reject(new Error("port unavailable"));
      server.close((error) => error ? reject(error) : resolve(address.port));
    });
  });
}
