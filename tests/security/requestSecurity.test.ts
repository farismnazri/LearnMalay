import test from "node:test";
import assert from "node:assert/strict";
import { isAllowedMutationOrigin } from "../../src/server/requestOriginPolicy.ts";

test("allows same-origin mutation request with Origin header", () => {
  const req = new Request("http://localhost:3000/api/users/progress", {
    method: "POST",
    headers: {
      origin: "http://localhost:3000",
      host: "localhost:3000",
    },
  });

  assert.equal(isAllowedMutationOrigin(req), true);
});

test("rejects cross-origin mutation request", () => {
  const req = new Request("http://localhost:3000/api/users/progress", {
    method: "POST",
    headers: {
      origin: "https://evil.example",
      host: "localhost:3000",
    },
  });

  assert.equal(isAllowedMutationOrigin(req), false);
});

test("allows forwarded same-origin requests behind proxy", () => {
  const req = new Request("http://internal.local/api/highscores", {
    method: "POST",
    headers: {
      origin: "https://learn-malay.example",
      "x-forwarded-proto": "https",
      "x-forwarded-host": "learn-malay.example",
    },
  });

  assert.equal(isAllowedMutationOrigin(req), true);
});

test("rejects missing Origin when sec-fetch-site is cross-site", () => {
  const req = new Request("http://localhost:3000/api/users/current", {
    method: "DELETE",
    headers: {
      host: "localhost:3000",
      "sec-fetch-site": "cross-site",
    },
  });

  assert.equal(isAllowedMutationOrigin(req), false);
});
