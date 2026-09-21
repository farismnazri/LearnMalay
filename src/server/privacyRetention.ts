import { rawActivityCutoff } from "../lib/privacyRetention.ts";
import { getCollections } from "./db.ts";

const BATCH_SIZE = 500;
const MAX_BATCHES_PER_COLLECTION = 20;

export async function inspectPrivacyRetention(now = new Date()) {
  const { sessions, activityEvents } = await getCollections();
  const sessionCutoffMs = now.getTime();
  const activityCutoffISO = rawActivityCutoff(now);
  const [expiredSessions, expiredEvents] = await Promise.all([
    sessions.find({ expires_at: { $lte: sessionCutoffMs } }, { projection: { id: 1 }, limit: BATCH_SIZE }).toArray(),
    activityEvents.find({ timestamp: { $lt: activityCutoffISO } }, { projection: { id: 1 }, limit: BATCH_SIZE }).toArray(),
  ]);
  return {
    sessionCutoffMs,
    activityCutoffISO,
    expiredSessionSampleCount: expiredSessions.length,
    expiredEventSampleCount: expiredEvents.length,
    sampleLimit: BATCH_SIZE,
  };
}

export async function runPrivacyRetention(now = new Date()) {
  const { sessions, activityEvents } = await getCollections();
  const sessionCutoffMs = now.getTime();
  const activityCutoffISO = rawActivityCutoff(now);
  let selectedSessions = 0;
  let selectedEvents = 0;
  let moreSessions = false;
  let moreEvents = false;

  for (let batch = 0; batch < MAX_BATCHES_PER_COLLECTION; batch += 1) {
    const rows = await sessions.find(
      { expires_at: { $lte: sessionCutoffMs } },
      { projection: { id: 1 }, sort: { expires_at: 1 }, limit: BATCH_SIZE },
    ).toArray();
    if (rows.length === 0) break;
    await sessions.deleteMany({ id: { $in: rows.map((row) => row.id) } });
    selectedSessions += rows.length;
    if (batch === MAX_BATCHES_PER_COLLECTION - 1 && rows.length === BATCH_SIZE) moreSessions = true;
  }

  for (let batch = 0; batch < MAX_BATCHES_PER_COLLECTION; batch += 1) {
    const rows = await activityEvents.find(
      { timestamp: { $lt: activityCutoffISO } },
      { projection: { id: 1 }, sort: { timestamp: 1 }, limit: BATCH_SIZE },
    ).toArray();
    if (rows.length === 0) break;
    await activityEvents.deleteMany({ id: { $in: rows.map((row) => row.id) } });
    selectedEvents += rows.length;
    if (batch === MAX_BATCHES_PER_COLLECTION - 1 && rows.length === BATCH_SIZE) moreEvents = true;
  }

  return { sessionCutoffMs, activityCutoffISO, selectedSessions, selectedEvents, moreSessions, moreEvents };
}
