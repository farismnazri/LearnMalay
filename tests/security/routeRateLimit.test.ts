import test from "node:test";
import assert from "node:assert/strict";
import { checkRouteRateLimit } from "../../src/server/routeRateLimit.ts";

function buildReq() {
  return new Request("http://localhost:3000/api/highscores", {
    method: "POST",
    headers: {
      host: "localhost:3000",
      "x-forwarded-for": "127.0.0.1",
    },
  });
}

test("allows requests until max hits and then limits", () => {
  const scope = `rate-limit-test-${Date.now()}`;
  const req = buildReq();

  const first = checkRouteRateLimit({
    scope,
    req,
    subject: "USER1",
    windowMs: 60_000,
    maxHits: 2,
  });
  assert.equal(first.limited, false);

  const second = checkRouteRateLimit({
    scope,
    req,
    subject: "USER1",
    windowMs: 60_000,
    maxHits: 2,
  });
  assert.equal(second.limited, false);

  const third = checkRouteRateLimit({
    scope,
    req,
    subject: "USER1",
    windowMs: 60_000,
    maxHits: 2,
  });
  assert.equal(third.limited, true);
  assert.equal(third.retryAfterSeconds > 0, true);
});

test("uses subject in limiter key to isolate users", () => {
  const scope = `rate-limit-subject-test-${Date.now()}`;
  const req = buildReq();

  const userA1 = checkRouteRateLimit({
    scope,
    req,
    subject: "USER_A",
    windowMs: 60_000,
    maxHits: 1,
  });
  assert.equal(userA1.limited, false);

  const userB1 = checkRouteRateLimit({
    scope,
    req,
    subject: "USER_B",
    windowMs: 60_000,
    maxHits: 1,
  });
  assert.equal(userB1.limited, false);
});

