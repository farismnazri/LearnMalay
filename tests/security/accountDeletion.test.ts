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

test.before(async () => {
  const port = await openPort();
  baseUrl = `http://127.0.0.1:${port}`;
  child = spawn(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "start", "--", "--hostname", "127.0.0.1", "--port", String(port)], {
    cwd: ROOT,
    env: { ...process.env, NODE_ENV: "production", NEXT_TELEMETRY_DISABLED: "1", MONGODB_URI: "", LEARN_MALAY_ADMIN_PASSWORD: "admin-test-password" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try { if ((await fetch(`${baseUrl}/api/highscores`)).ok) return; } catch { /* wait */ }
    await delay(250);
  }
  throw new Error("account deletion test app server did not start");
});

test.after(async () => {
  if (!child || child.exitCode !== null) return;
  child.kill("SIGTERM");
  await Promise.race([once(child, "exit"), delay(10_000)]);
  if (child.exitCode === null) child.kill("SIGKILL");
});

test("deleting an account removes linked scores, activity, and every session while preserving others", async () => {
  const deletedName = `DELETE_${Date.now()}`;
  const keptName = `KEEP_${Date.now()}`;
  const deletedCookie = await register(deletedName);
  const keptCookie = await register(keptName);
  const secondSession = await request("/api/users/login", {
    method: "POST", body: JSON.stringify({ name: deletedName, password: "test-password-123" }),
  });
  assert.equal(secondSession.status, 200);
  const secondCookie = cookieFrom(secondSession);

  for (const [name, cookie] of [[deletedName, deletedCookie], [keptName, keptCookie]]) {
    const activity = await request("/api/activity", {
      method: "POST", headers: { cookie },
      body: JSON.stringify({ eventId: crypto.randomUUID(), type: "minigame_started", minigameId: "numbers" }),
    });
    assert.equal(activity.status, 200, name);
    const score = await request("/api/highscores", {
      method: "POST", headers: { cookie },
      body: JSON.stringify({ gameId: "numbers", run: {
        runId: crypto.randomUUID(), outcome: "completed", accuracy: 100, timeMs: 1000,
        attempts: 1, correct: 1, mistakes: 0, hints: 0, difficulty: "easy",
      } }),
    });
    assert.equal(score.status, 200, name);
  }

  const deleted = await request(`/api/users?id=${encodeURIComponent(deletedName)}`, {
    method: "DELETE", headers: { cookie: deletedCookie },
  });
  assert.equal(deleted.status, 200);
  assert.deepEqual(await deleted.json(), { ok: true });

  const scores = await fetch(`${baseUrl}/api/highscores`);
  const store = await scores.json() as { numbers: Array<{ name: string }> };
  assert.deepEqual(store.numbers.map((row) => row.name), [keptName]);

  for (const cookie of [deletedCookie, secondCookie]) {
    const current = await request("/api/users/current", { method: "GET", headers: { cookie } });
    assert.equal(await current.json(), null);
  }
  const keptCurrent = await request("/api/users/current", { method: "GET", headers: { cookie: keptCookie } });
  assert.equal((await keptCurrent.json() as { name: string }).name, keptName);

  const admin = await request("/api/users/login", {
    method: "POST", body: JSON.stringify({ name: "admin", password: "admin-test-password" }),
  });
  assert.equal(admin.status, 200);
  const adminCookie = cookieFrom(admin);
  const repeated = await request(`/api/users?id=${encodeURIComponent(deletedName)}`, {
    method: "DELETE", headers: { cookie: adminCookie },
  });
  assert.equal(repeated.status, 200);
  const overview = await request("/api/admin/analytics", { method: "GET", headers: { cookie: adminCookie } });
  const body = await overview.json() as { metrics: { totalMinigamePlays: number; totalHighscoreEntries: number } };
  assert.equal(body.metrics.totalMinigamePlays, 1);
  assert.equal(body.metrics.totalHighscoreEntries, 1);
  const detail = await request(`/api/admin/users/${encodeURIComponent(deletedName)}`, {
    method: "GET", headers: { cookie: adminCookie },
  });
  assert.equal(detail.status, 404);
});

async function register(name: string): Promise<string> {
  const response = await request("/api/users", {
    method: "POST", body: JSON.stringify({ name, password: "test-password-123", avatarId: "bada" }),
  });
  assert.equal(response.status, 200);
  return cookieFrom(response);
}

function cookieFrom(response: Response): string {
  const cookie = response.headers.get("set-cookie")?.split(";", 1)[0] ?? "";
  assert.ok(cookie.startsWith("learnMalay.sessionId="));
  return cookie;
}

function request(pathname: string, init: RequestInit): Promise<Response> {
  return fetch(`${baseUrl}${pathname}`, {
    ...init,
    headers: { origin: baseUrl, "content-type": "application/json", ...(init.headers ?? {}) },
  });
}

function openPort(): Promise<number> {
  return new Promise((resolve, reject) => {
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
