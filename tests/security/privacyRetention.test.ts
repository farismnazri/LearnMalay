import assert from "node:assert/strict";
import test from "node:test";

import { getCollections, type ActivityEventDocument, type SessionDocument } from "../../src/server/db.ts";
import { inspectPrivacyRetention, runPrivacyRetention } from "../../src/server/privacyRetention.ts";
import { GET as runPrivacyRetentionCron } from "../../app/api/cron/privacy-retention/route.ts";

test("retention selects only expired sessions and activity older than 90 days, and is idempotent", async () => {
  process.env.MONGODB_URI = "";
  const now = new Date("2026-09-20T00:00:00.000Z");
  const { sessions, activityEvents } = await getCollections();
  const oldSession: SessionDocument = {
    id: crypto.randomUUID(), user_id: "RETENTION_A", created_at: 1, last_seen_at: 1,
    expires_at: now.getTime() - 1,
  };
  const validSession: SessionDocument = {
    id: crypto.randomUUID(), user_id: "RETENTION_B", created_at: 1, last_seen_at: 1,
    expires_at: now.getTime() + 1,
  };
  const oldEvent: ActivityEventDocument = {
    id: crypto.randomUUID(), user_id: "RETENTION_A", event_type: "minigame_started",
    timestamp: "2026-06-01T00:00:00.000Z", minigame_id: "numbers",
  };
  const recentEvent: ActivityEventDocument = {
    id: crypto.randomUUID(), user_id: "RETENTION_B", event_type: "minigame_started",
    timestamp: "2026-09-19T00:00:00.000Z", minigame_id: "numbers",
  };
  const boundaryEvent: ActivityEventDocument = {
    id: crypto.randomUUID(), user_id: "RETENTION_BOUNDARY", event_type: "minigame_started",
    timestamp: "2026-06-22T00:00:00.000Z", minigame_id: "numbers",
  };
  await sessions.insertOne(oldSession);
  await sessions.insertOne(validSession);
  await activityEvents.insertOne(oldEvent);
  await activityEvents.insertOne(recentEvent);
  await activityEvents.insertOne(boundaryEvent);

  const preview = await inspectPrivacyRetention(now);
  assert.equal(preview.expiredSessionSampleCount, 1);
  assert.equal(preview.expiredEventSampleCount, 1);
  assert.equal((await sessions.findOne({ id: oldSession.id }))?.id, oldSession.id);

  const first = await runPrivacyRetention(now);
  assert.equal(first.selectedSessions, 1);
  assert.equal(first.selectedEvents, 1);
  assert.equal(await sessions.findOne({ id: oldSession.id }), null);
  assert.equal(await activityEvents.findOne({ id: oldEvent.id }), null);
  assert.equal((await sessions.findOne({ id: validSession.id }))?.id, validSession.id);
  assert.equal((await activityEvents.findOne({ id: recentEvent.id }))?.id, recentEvent.id);
  assert.equal((await activityEvents.findOne({ id: boundaryEvent.id }))?.id, boundaryEvent.id);

  const second = await runPrivacyRetention(now);
  assert.equal(second.selectedSessions, 0);
  assert.equal(second.selectedEvents, 0);
});

test("privacy-retention cron rejects missing and incorrect authentication", async () => {
  const previousSecret = process.env.CRON_SECRET;
  try {
    delete process.env.CRON_SECRET;
    const unconfigured = await runPrivacyRetentionCron(new Request("http://localhost/api/cron/privacy-retention", {
      headers: { authorization: "Bearer any-value" },
    }));
    assert.equal(unconfigured.status, 401);

    process.env.CRON_SECRET = "privacy-retention-test-secret";
    const missing = await runPrivacyRetentionCron(new Request("http://localhost/api/cron/privacy-retention"));
    assert.equal(missing.status, 401);
    assert.deepEqual(await missing.json(), { ok: false });

    const incorrect = await runPrivacyRetentionCron(new Request("http://localhost/api/cron/privacy-retention", {
      headers: { authorization: "Bearer wrong-secret" },
    }));
    assert.equal(incorrect.status, 401);
    assert.deepEqual(await incorrect.json(), { ok: false });
  } finally {
    if (previousSecret === undefined) delete process.env.CRON_SECRET;
    else process.env.CRON_SECRET = previousSecret;
  }
});

test("privacy-retention cron fails closed in production without MONGODB_URI", async () => {
  const previousSecret = process.env.CRON_SECRET;
  const previousMongoUri = process.env.MONGODB_URI;
  const previousNodeEnv = process.env.NODE_ENV;
  process.env.CRON_SECRET = "privacy-retention-test-secret";
  delete process.env.MONGODB_URI;
  process.env.NODE_ENV = "production";
  try {
    const response = await runPrivacyRetentionCron(new Request("http://localhost/api/cron/privacy-retention", {
      headers: { authorization: "Bearer privacy-retention-test-secret" },
    }));
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { ok: false });
  } finally {
    if (previousSecret === undefined) delete process.env.CRON_SECRET;
    else process.env.CRON_SECRET = previousSecret;
    if (previousMongoUri === undefined) delete process.env.MONGODB_URI;
    else process.env.MONGODB_URI = previousMongoUri;
    if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousNodeEnv;
  }
});

test("authenticated privacy-retention cron is bounded by the cutoff and idempotent", async () => {
  const previousSecret = process.env.CRON_SECRET;
  const previousMongoUri = process.env.MONGODB_URI;
  process.env.CRON_SECRET = "privacy-retention-test-secret";
  process.env.MONGODB_URI = "";
  const { sessions, activityEvents } = await getCollections();
  const oldEvent: ActivityEventDocument = {
    id: crypto.randomUUID(), user_id: "CRON_OLD", event_type: "minigame_started",
    timestamp: "2000-01-01T00:00:00.000Z", minigame_id: "numbers",
  };
  const recentEvent: ActivityEventDocument = {
    id: crypto.randomUUID(), user_id: "CRON_RECENT", event_type: "minigame_started",
    timestamp: new Date().toISOString(), minigame_id: "numbers",
  };
  const expiredSession: SessionDocument = {
    id: crypto.randomUUID(), user_id: "CRON_OLD", created_at: 1, last_seen_at: 1, expires_at: 1,
  };
  const validSession: SessionDocument = {
    id: crypto.randomUUID(), user_id: "CRON_RECENT", created_at: 1, last_seen_at: 1,
    expires_at: Date.now() + 86_400_000,
  };
  await activityEvents.insertOne(oldEvent);
  await activityEvents.insertOne(recentEvent);
  await sessions.insertOne(expiredSession);
  await sessions.insertOne(validSession);

  const request = () => new Request("http://localhost/api/cron/privacy-retention", {
    headers: { authorization: `Bearer ${process.env.CRON_SECRET}` },
  });

  try {
    const first = await runPrivacyRetentionCron(request());
    assert.equal(first.status, 200);
    const firstBody = await first.json() as { ok: boolean; selectedEvents: number; selectedSessions: number };
    assert.equal(firstBody.ok, true);
    assert.equal(JSON.stringify(firstBody).includes("privacy-retention-test-secret"), false);
    assert.ok(firstBody.selectedEvents >= 1);
    assert.ok(firstBody.selectedSessions >= 1);
    assert.equal(await activityEvents.findOne({ id: oldEvent.id }), null);
    assert.equal(await sessions.findOne({ id: expiredSession.id }), null);
    assert.equal((await activityEvents.findOne({ id: recentEvent.id }))?.id, recentEvent.id);
    assert.equal((await sessions.findOne({ id: validSession.id }))?.id, validSession.id);

    const second = await runPrivacyRetentionCron(request());
    assert.equal(second.status, 200);
    const secondBody = await second.json() as { ok: boolean; selectedEvents: number; selectedSessions: number };
    assert.equal(secondBody.ok, true);
    assert.equal(secondBody.selectedEvents, 0);
    assert.equal(secondBody.selectedSessions, 0);
    assert.equal((await activityEvents.findOne({ id: recentEvent.id }))?.id, recentEvent.id);
    assert.equal((await sessions.findOne({ id: validSession.id }))?.id, validSession.id);
  } finally {
    if (previousSecret === undefined) delete process.env.CRON_SECRET;
    else process.env.CRON_SECRET = previousSecret;
    if (previousMongoUri === undefined) delete process.env.MONGODB_URI;
    else process.env.MONGODB_URI = previousMongoUri;
  }
});
