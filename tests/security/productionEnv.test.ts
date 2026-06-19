import assert from "node:assert/strict";
import test from "node:test";
import {
  ProductionEnvValidationError,
  assertValidProductionEnv,
  getProductionEnvValidationErrors,
} from "../../src/server/env.ts";

test("does not require production env vars outside production", () => {
  assert.deepEqual(getProductionEnvValidationErrors({ NODE_ENV: "development" }), []);
  assert.doesNotThrow(() => assertValidProductionEnv({ NODE_ENV: "development" }));
});

test("requires persistent storage and admin password in production", () => {
  const errors = getProductionEnvValidationErrors({ NODE_ENV: "production" });

  assert.deepEqual(errors, [
    "MONGODB_URI is required in production; in-memory storage is development-only.",
    "LEARN_MALAY_ADMIN_PASSWORD is required in production.",
  ]);
});

test("rejects insecure production password values", () => {
  const errors = getProductionEnvValidationErrors({
    NODE_ENV: "production",
    MONGODB_URI: "mongodb+srv://cluster.example/learnmalay",
    LEARN_MALAY_ADMIN_PASSWORD: "admin",
    LEARN_MALAY_DEMO_PASSWORD: "demomode",
  });

  assert.equal(
    errors.includes("LEARN_MALAY_ADMIN_PASSWORD must be at least 12 characters in production."),
    true
  );
  assert.equal(
    errors.includes("LEARN_MALAY_ADMIN_PASSWORD must not use a development/default password in production."),
    true
  );
  assert.equal(
    errors.includes("LEARN_MALAY_DEMO_PASSWORD must be at least 12 characters in production."),
    true
  );
  assert.equal(
    errors.includes("LEARN_MALAY_DEMO_PASSWORD must not use a development/default password in production."),
    true
  );
});

test("rejects unsupported MongoDB URI schemes in production", () => {
  const errors = getProductionEnvValidationErrors({
    NODE_ENV: "production",
    MONGODB_URI: "https://db.example/learnmalay",
    LEARN_MALAY_ADMIN_PASSWORD: "strong-admin-password",
  });

  assert.deepEqual(errors, ["MONGODB_URI must use the mongodb:// or mongodb+srv:// protocol."]);
});

test("accepts required production env without optional demo password", () => {
  assert.doesNotThrow(() =>
    assertValidProductionEnv({
      NODE_ENV: "production",
      MONGODB_URI: "mongodb+srv://cluster.example/learnmalay",
      LEARN_MALAY_ADMIN_PASSWORD: "strong-admin-password",
    })
  );
});

test("throws a clear grouped production validation error", () => {
  assert.throws(
    () => assertValidProductionEnv({ NODE_ENV: "production" }),
    (error: unknown) => {
      assert.equal(error instanceof ProductionEnvValidationError, true);
      assert.equal(String(error).includes("Invalid production environment:"), true);
      assert.equal(String(error).includes("MONGODB_URI is required in production"), true);
      assert.equal(String(error).includes("LEARN_MALAY_ADMIN_PASSWORD is required in production"), true);
      return true;
    }
  );
});
