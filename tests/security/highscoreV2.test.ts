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
const COOKIE = "learnMalay.sessionId";
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
  throw new Error("highscore test app server did not start");
});

test.after(async () => {
  if (!child || child.exitCode !== null) return;
  child.kill("SIGTERM");
  await Promise.race([once(child, "exit"), delay(10_000)]);
  if (child.exitCode === null) child.kill("SIGKILL");
});

test("authenticated v2 requests save every game and deduplicate runId", async () => {
  const name = `HIGHSCORE_${Date.now()}`;
  const registration = await request("/api/users", { method: "POST", body: JSON.stringify({ name, password: "test-password-123", avatarId: "crash" }) });
  assert.equal(registration.status, 200);
  const cookie = registration.headers.get("set-cookie")?.split(";", 1)[0] ?? "";
  assert.ok(cookie.startsWith(`${COOKIE}=`));

  const cases = [
    ["numbers", { difficulty: "easy" }],
    ["word-match", { targetLanguage: "en", difficulty: undefined }],
    ["wordsearch", { difficulty: "easy", theme: "all" }],
    ["currency", { difficulty: "easy", mode: "buyer" }],
    ["makan-apa", { difficulty: "easy" }],
    ["misi-membeli", { difficulty: "easy", outcome: "failed", score: 2, correct: 2, attempts: 3, mistakes: 1, accuracy: 66.67, averageCorrectResponseTimeMs: 500 }],
    ["arah-jalan", { difficulty: "easy", outcome: "failed", score: 2, correct: 2, attempts: 3, mistakes: 1, accuracy: 66.67, averageCorrectResponseTimeMs: 500 }],
  ] as const;

  let firstRun: Record<string, unknown> | null = null;
  for (const [gameId, overrides] of cases) {
    const run = {
      runId: crypto.randomUUID(), scoreVersion: 2, outcome: "completed", competitive: true,
      accuracy: 100, timeMs: 1000, attempts: 10, correct: 10, mistakes: 0, hints: 0, ...overrides,
    };
    const response = await request("/api/highscores", { method: "POST", headers: { cookie }, body: JSON.stringify({ gameId, run }) });
    assert.equal(response.status, 200, gameId);
    const body = await response.json() as { saved?: boolean; duplicate?: boolean };
    assert.equal(body.saved, true, gameId);
    if (gameId === "numbers") firstRun = run;
  }

  const duplicate = await request("/api/highscores", { method: "POST", headers: { cookie }, body: JSON.stringify({ gameId: "numbers", run: firstRun }) });
  assert.equal(duplicate.status, 200);
  assert.deepEqual(await duplicate.json(), { ok: true, saved: false, duplicate: true, competitive: true, reason: "duplicate" });

  const nonAdminReset = await request("/api/highscores?gameId=numbers", { method: "DELETE", headers: { cookie } });
  assert.equal(nonAdminReset.status, 403);

  const adminLogin = await request("/api/users/login", { method: "POST", body: JSON.stringify({ name: "admin", password: "admin-test-password" }) });
  assert.equal(adminLogin.status, 200);
  const adminCookie = adminLogin.headers.get("set-cookie")?.split(";", 1)[0] ?? "";
  const adminReset = await request("/api/highscores?gameId=numbers", { method: "DELETE", headers: { cookie: adminCookie } });
  assert.equal(adminReset.status, 200);
  const afterReset = await request("/api/highscores", { method: "GET" });
  const store = await afterReset.json() as { numbers?: unknown[] };
  assert.deepEqual(store.numbers, []);
});

function request(pathname: string, init: RequestInit) {
  return fetch(`${baseUrl}${pathname}`, { ...init, headers: { origin: baseUrl, "content-type": "application/json", ...(init.headers ?? {}) } });
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
