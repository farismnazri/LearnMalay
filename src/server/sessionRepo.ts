import { randomBytes } from "node:crypto";
import { getCollections, type SessionDocument } from "./db";

function normalizeUserId(id: string) {
  return id.trim().toUpperCase();
}

function normalizeSessionId(id: string) {
  return id.trim();
}

function nowMs() {
  return Date.now();
}

function buildSession(userId: string, ttlSeconds: number): SessionDocument {
  const now = nowMs();
  return {
    id: randomBytes(32).toString("hex"),
    user_id: normalizeUserId(userId),
    created_at: now,
    last_seen_at: now,
    expires_at: now + ttlSeconds * 1000,
  };
}

export async function createSession(userId: string, ttlSeconds: number): Promise<SessionDocument> {
  const { sessions } = await getCollections();
  const session = buildSession(userId, ttlSeconds);
  await sessions.insertOne(session);
  return session;
}

export async function getSession(sessionId: string): Promise<SessionDocument | null> {
  const cleanId = normalizeSessionId(sessionId);
  if (!cleanId) return null;

  const { sessions } = await getCollections();
  const session = await sessions.findOne({ id: cleanId });
  if (!session) return null;

  if (session.expires_at <= nowMs()) {
    await sessions.deleteOne({ id: cleanId });
    return null;
  }

  return session;
}

export async function touchSession(sessionId: string): Promise<void> {
  const cleanId = normalizeSessionId(sessionId);
  if (!cleanId) return;

  const { sessions } = await getCollections();
  await sessions.updateOne({ id: cleanId }, { $set: { last_seen_at: nowMs() } });
}

export async function deleteSession(sessionId: string): Promise<void> {
  const cleanId = normalizeSessionId(sessionId);
  if (!cleanId) return;

  const { sessions } = await getCollections();
  await sessions.deleteOne({ id: cleanId });
}

export async function deleteSessionsForUser(userId: string): Promise<void> {
  const cleanId = normalizeUserId(userId);
  if (!cleanId) return;

  const { sessions } = await getCollections();
  await sessions.deleteMany({ user_id: cleanId });
}
