import { randomUUID } from "node:crypto";

import type { GameId } from "../lib/highscoresTypes.ts";
import { getCollections, type ActivityEventDocument, type ActivityEventType } from "./db.ts";

const ACTIVE_TOUCH_INTERVAL_MS = 5 * 60 * 1000;

function normalizeUserId(id: string) {
  return id.trim().toUpperCase();
}

function isDuplicateKeyError(error: unknown) {
  return Boolean(
    typeof error === "object" &&
      error &&
      "code" in error &&
      (error as { code?: number }).code === 11000
  );
}

export async function touchMeaningfulUserActivity(userId: string, timestamp = new Date()): Promise<void> {
  const { users } = await getCollections();
  const cleanId = normalizeUserId(userId);
  const row = await users.findOne({ id: cleanId }, { projection: { last_active_at: 1 } });
  if (!row) return;

  const previousMs = row.last_active_at ? Date.parse(row.last_active_at) : Number.NaN;
  if (Number.isFinite(previousMs) && timestamp.getTime() - previousMs < ACTIVE_TOUCH_INTERVAL_MS) return;

  await users.updateOne(
    { id: cleanId },
    { $set: { last_active_at: timestamp.toISOString() } }
  );
}

export async function recordSuccessfulLogin(userId: string, timestamp = new Date()): Promise<void> {
  const { users } = await getCollections();
  const cleanId = normalizeUserId(userId);
  const iso = timestamp.toISOString();
  await users.updateOne({ id: cleanId }, { $set: { last_login_at: iso } });
  await recordActivityEvent({ userId: cleanId, type: "login", timestamp, markActive: false });
}

export async function recordActivityEvent(input: {
  userId: string;
  type: ActivityEventType;
  eventId?: string;
  timestamp?: Date;
  chapterId?: number;
  minigameId?: GameId;
  markActive?: boolean;
}): Promise<{ saved: boolean }> {
  const { activityEvents } = await getCollections();
  const timestamp = input.timestamp ?? new Date();
  const document: ActivityEventDocument = {
    id: input.eventId ?? randomUUID(),
    user_id: normalizeUserId(input.userId),
    event_type: input.type,
    timestamp: timestamp.toISOString(),
    ...(input.chapterId === undefined ? {} : { chapter_id: input.chapterId }),
    ...(input.minigameId === undefined ? {} : { minigame_id: input.minigameId }),
  };

  try {
    await activityEvents.insertOne(document);
  } catch (error: unknown) {
    if (isDuplicateKeyError(error)) return { saved: false };
    throw error;
  }

  if (input.markActive !== false && input.type !== "login") {
    await touchMeaningfulUserActivity(document.user_id, timestamp);
  }
  return { saved: true };
}
