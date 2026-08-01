import assert from "node:assert/strict";
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { once } from "node:events";
import net from "node:net";
import path from "node:path";
import process from "node:process";
import test from "node:test";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";
type JsonResponse = {
  status: number;
  headers: Headers;
  body: unknown;
  text: string;
};

type DevServer = {
  baseUrl: string;
  stop: () => Promise<void>;
};

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SESSION_COOKIE_NAME = "learnMalay.sessionId";
const PROGRESS_LIMIT_MAX_HITS = 30;

let server: DevServer | null = null;

test.before(async () => {
  server = await startAppServer();
});

test.after(async () => {
  if (server) await server.stop();
});

test("unauthenticated progress mutation is rejected with 401", async () => {
  const res = await requestJson("/api/users/progress", {
    method: "POST",
    headers: sameOriginHeaders(),
    body: JSON.stringify({
      id: "SOMEONE",
      progress: { chapter: 1, page: 1 },
    }),
  });

  assert.equal(res.status, 401);
  assert.equal(isSafeErrorShape(res.body), true);
});

test("unknown session cookie does not authenticate and is invalidated", async () => {
  const res = await requestJson("/api/users/progress", {
    method: "POST",
    headers: {
      ...sameOriginHeaders(),
      cookie: `${SESSION_COOKIE_NAME}=unknown-session-id`,
    },
    body: JSON.stringify({
      id: "SOMEONE",
      progress: { chapter: 1, page: 1 },
    }),
  });

  assert.equal(res.status, 401);
  assert.equal(isSafeErrorShape(res.body), true);

  const setCookies = getSetCookieHeaders(res.headers);
  assert.equal(setCookies.some((value) => value.startsWith(`${SESSION_COOKIE_NAME}=;`)), true);
});

test("cross-site mutating request is rejected by CSRF origin policy", async () => {
  const res = await requestJson("/api/highscores", {
    method: "POST",
    headers: {
      origin: "https://evil.example",
      "content-type": "application/json",
    },
    body: JSON.stringify(validHighscorePayload()),
  });

  assert.equal(res.status, 403);
  assert.deepEqual(res.body, { error: "Forbidden" });
});

test("missing origin with sec-fetch-site=cross-site is rejected for mutations", async () => {
  const res = await requestJson("/api/users/current", {
    method: "DELETE",
    headers: {
      "sec-fetch-site": "cross-site",
    },
  });

  assert.equal(res.status, 403);
  assert.deepEqual(res.body, { error: "Forbidden" });
});

test("read-only routes are not blocked by CSRF origin policy", async () => {
  const res = await requestJson("/api/highscores", {
    method: "GET",
    headers: {
      origin: "https://evil.example",
    },
  });

  assert.equal(res.status, 200);
  assert.equal(typeof res.body, "object");
});

test("chapter revision is recorded only by an explicit completion request", async () => {
  const user = await createUserAndSessionCookie();

  const progressOnly = await requestJson("/api/users/progress", {
    method: "POST",
    headers: {
      ...sameOriginHeaders(),
      cookie: user.sessionCookie,
    },
    body: JSON.stringify({
      id: user.id,
      progress: { chapter: 2, page: 1 },
    }),
  });

  assert.equal(progressOnly.status, 200);
  assert.deepEqual(readCompletedChapterRevisions(progressOnly.body), {});

  const completed = await requestJson("/api/users/progress", {
    method: "POST",
    headers: {
      ...sameOriginHeaders(),
      cookie: user.sessionCookie,
    },
    body: JSON.stringify({
      id: user.id,
      progress: { chapter: 2, page: 1 },
      completedChapterId: 1,
    }),
  });

  assert.equal(completed.status, 200);
  assert.deepEqual(readCompletedChapterRevisions(completed.body), { "1": 7 });
});

test("chapter completion cannot acknowledge a chapter that is still locked", async () => {
  const user = await createUserAndSessionCookie();
  const res = await requestJson("/api/users/progress", {
    method: "POST",
    headers: {
      ...sameOriginHeaders(),
      cookie: user.sessionCookie,
    },
    body: JSON.stringify({
      id: user.id,
      progress: { chapter: 1, page: 1 },
      completedChapterId: 2,
    }),
  });

  assert.equal(res.status, 400);
  assert.equal(isSafeErrorShape(res.body), true);
});

test("progress route enforces route-specific 429 contract after max hits", async () => {
  const user = await createUserAndSessionCookie();

  for (let i = 0; i < PROGRESS_LIMIT_MAX_HITS; i += 1) {
    const res = await requestJson("/api/users/progress", {
      method: "POST",
      headers: {
        ...sameOriginHeaders(),
        cookie: user.sessionCookie,
      },
      body: JSON.stringify({
        id: user.id,
        progress: { chapter: 1, page: 1 },
      }),
    });
    assert.equal(res.status, 200);
  }

  const limited = await requestJson("/api/users/progress", {
    method: "POST",
    headers: {
      ...sameOriginHeaders(),
      cookie: user.sessionCookie,
    },
    body: JSON.stringify({
      id: user.id,
      progress: { chapter: 1, page: 1 },
    }),
  });

  assert.equal(limited.status, 429);
  assert.equal(isSafeErrorShape(limited.body), true);

  const retryAfterRaw = limited.headers.get("retry-after");
  assert.notEqual(retryAfterRaw, null);
  assert.equal(Number.parseInt(retryAfterRaw ?? "", 10) > 0, true);
});

test("auth failure responses do not leak credentials or internal auth/session details", async () => {
  const password = `wrong-password-${Date.now()}`;
  const res = await requestJson("/api/users/login", {
    method: "POST",
    headers: sameOriginHeaders(),
    body: JSON.stringify({
      name: "admin",
      password,
    }),
  });

  assert.equal(res.status, 401);
  assert.equal(isSafeErrorShape(res.body), true);

  const lowered = res.text.toLowerCase();
  assert.equal(lowered.includes(password.toLowerCase()), false);
  assert.equal(lowered.includes("password_hash"), false);
  assert.equal(lowered.includes("password_salt"), false);
  assert.equal(lowered.includes("sessionid"), false);
  assert.equal(lowered.includes("stack"), false);
});

test("admin login and password verification use configured admin password", async () => {
  const login = await requestJson("/api/users/login", {
    method: "POST",
    headers: sameOriginHeaders(),
    body: JSON.stringify({
      name: "admin",
      password: "admin-test-password",
    }),
  });

  assert.equal(login.status, 200);
  assert.equal(readUserId(login.body), "ADMIN");

  const verify = await requestJson("/api/users/verify-admin", {
    method: "POST",
    headers: {
      ...sameOriginHeaders(),
      cookie: readSessionCookieFromResponse(login.headers),
    },
    body: JSON.stringify({
      password: "admin-test-password",
    }),
  });

  assert.equal(verify.status, 200);
  assert.deepEqual(verify.body, { ok: true });
});

test("unsafe signup usernames are rejected without starting a session", async () => {
  const res = await requestJson("/api/users", {
    method: "POST",
    headers: sameOriginHeaders(),
    body: JSON.stringify({
      name: "B_o_o_b",
      password: "test-password-123",
      avatarId: "crash",
    }),
  });

  assert.equal(res.status, 400);
  assert.equal(isSafeErrorShape(res.body), true);
  assert.equal(res.text.toLowerCase().includes("boob"), false);

  const setCookies = getSetCookieHeaders(res.headers);
  assert.equal(setCookies.some((value) => value.startsWith(`${SESSION_COOKIE_NAME}=`)), false);
});

function validHighscorePayload() {
  return {
    gameId: "numbers",
    run: {
      runId: crypto.randomUUID(),
      outcome: "completed",
      accuracy: 98.5,
      timeMs: 8000,
      attempts: 10,
      correct: 9,
      mistakes: 1,
      hints: 0,
      difficulty: "easy",
    },
  };
}

function sameOriginHeaders(): Record<string, string> {
  if (!server) throw new Error("server has not started");
  return {
    origin: server.baseUrl,
    "content-type": "application/json",
  };
}

async function requestJson(pathname: string, init: RequestInit): Promise<JsonResponse> {
  if (!server) throw new Error("server has not started");
  const res = await fetch(`${server.baseUrl}${pathname}`, {
    ...init,
    signal: AbortSignal.timeout(5000),
  });
  const text = await res.text();
  const body = parseJsonBody(text);
  return {
    status: res.status,
    headers: res.headers,
    body,
    text,
  };
}

function parseJsonBody(text: string): unknown {
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function isSafeErrorShape(body: unknown): boolean {
  if (typeof body !== "object" || body === null || Array.isArray(body)) return false;
  if (!Object.hasOwn(body, "error")) return false;
  const error = (body as { error?: unknown }).error;
  return typeof error === "string" && error.length > 0;
}

function getSetCookieHeaders(headers: Headers): string[] {
  const candidate = headers as Headers & { getSetCookie?: () => string[] };
  if (typeof candidate.getSetCookie === "function") {
    return candidate.getSetCookie();
  }

  const fallback = headers.get("set-cookie");
  return fallback ? [fallback] : [];
}

async function createUserAndSessionCookie(): Promise<{ id: string; sessionCookie: string }> {
  const uniqueName = `SECUSER_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
  const res = await requestJson("/api/users", {
    method: "POST",
    headers: sameOriginHeaders(),
    body: JSON.stringify({
      name: uniqueName,
      password: "test-password-123",
      avatarId: "crash",
    }),
  });

  assert.equal(res.status, 200);
  const id = readUserId(res.body);
  const sessionCookie = readSessionCookieFromResponse(res.headers);
  return { id, sessionCookie };
}

function readUserId(body: unknown): string {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    throw new Error("expected user object response");
  }
  const id = (body as { id?: unknown }).id;
  if (typeof id !== "string" || !id.trim()) throw new Error("user response did not include id");
  return id;
}

function readCompletedChapterRevisions(body: unknown): Record<string, number> {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    throw new Error("expected user object response");
  }
  const revisions = (body as { completedChapterRevisions?: unknown }).completedChapterRevisions;
  if (typeof revisions !== "object" || revisions === null || Array.isArray(revisions)) {
    throw new Error("user response did not include completed chapter revisions");
  }
  return revisions as Record<string, number>;
}

function readSessionCookieFromResponse(headers: Headers): string {
  const setCookies = getSetCookieHeaders(headers);
  for (const cookie of setCookies) {
    if (!cookie.startsWith(`${SESSION_COOKIE_NAME}=`)) continue;
    const pair = cookie.split(";", 1)[0];
    if (pair) return pair;
  }

  throw new Error(`expected ${SESSION_COOKIE_NAME} Set-Cookie header`);
}

async function startAppServer(): Promise<DevServer> {
  const port = await findOpenPort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const child = spawn(resolveNpmCommand(), ["run", "start", "--", "--hostname", "127.0.0.1", "--port", String(port)], {
    cwd: PROJECT_ROOT,
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: "1",
      NODE_ENV: "production",
      MONGODB_URI: "",
      MONGODB_DB_NAME: "",
      LEARN_MALAY_ADMIN_PASSWORD: "admin-test-password",
      LEARN_MALAY_DEMO_PASSWORD: "demo-test-password",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  const logBuffer: string[] = [];
  child.stdout.setEncoding("utf8");
  child.stderr.setEncoding("utf8");
  child.stdout.on("data", (chunk: string) => {
    logBuffer.push(chunk);
  });
  child.stderr.on("data", (chunk: string) => {
    logBuffer.push(chunk);
  });

  await waitForServerReady(baseUrl, child, logBuffer);

  return {
    baseUrl,
    stop: async () => {
      await stopChildProcess(child);
    },
  };
}

async function waitForServerReady(baseUrl: string, child: ChildProcessWithoutNullStreams, logBuffer: string[]) {
  const deadlineMs = Date.now() + 90_000;

  while (Date.now() < deadlineMs) {
    if (child.exitCode !== null) {
      throw new Error(`app server exited early with code ${child.exitCode}\n${logBuffer.join("")}`);
    }

    try {
      const res = await fetch(`${baseUrl}/api/highscores`, {
        method: "GET",
        signal: AbortSignal.timeout(1500),
      });
      if (res.status === 200) return;
    } catch {
      // Keep polling until timeout or success.
    }

    await delay(250);
  }

  throw new Error(`timed out waiting for dev server readiness\n${logBuffer.join("")}`);
}

function resolveNpmCommand() {
  return process.platform === "win32" ? "npm.cmd" : "npm";
}

async function stopChildProcess(child: ChildProcessWithoutNullStreams): Promise<void> {
  if (child.exitCode !== null) return;

  child.kill("SIGTERM");
  const gracefulExit = once(child, "exit");
  const timeout = delay(10_000).then(() => false);

  const exited = await Promise.race([gracefulExit.then(() => true), timeout]);
  if (exited) return;

  child.kill("SIGKILL");
  await once(child, "exit");
}

async function findOpenPort(): Promise<number> {
  return await new Promise<number>((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        server.close(() => reject(new Error("unable to determine open port")));
        return;
      }
      const port = address.port;
      server.close((error) => {
        if (error) reject(error);
        else resolve(port);
      });
    });
  });
}
