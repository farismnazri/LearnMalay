import { NextResponse } from "next/server";

import { MAX_CHAPTER_ID, MIN_CHAPTER_ID } from "@/lib/chapters";
import { isValidHighscoreGameId } from "@/lib/highscoresTypes";
import { recordActivityEvent } from "@/server/activityRepo";
import { checkRouteRateLimit, GENERIC_ROUTE_RATE_LIMIT_MESSAGE } from "@/server/routeRateLimit";
import { enforceSameOriginMutation } from "@/server/requestSecurity";
import { clearSessionCookie, getSessionUser } from "@/server/sessionAuth";

export const runtime = "nodejs";

const ACTIVITY_WINDOW_MS = 60_000;
const ACTIVITY_MAX_HITS = 60;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(req: Request) {
  const csrf = enforceSameOriginMutation(req);
  if (csrf) return csrf;

  const { sessionId, user } = await getSessionUser();
  if (!user) {
    const res = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (sessionId) clearSessionCookie(res);
    return res;
  }

  const rateLimit = checkRouteRateLimit({
    scope: "activity-event",
    req,
    subject: user.id,
    windowMs: ACTIVITY_WINDOW_MS,
    maxHits: ACTIVITY_MAX_HITS,
  });
  if (rateLimit.limited) {
    const res = NextResponse.json({ error: GENERIC_ROUTE_RATE_LIMIT_MESSAGE }, { status: 429 });
    res.headers.set("Retry-After", String(rateLimit.retryAfterSeconds));
    return res;
  }

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!isPlainObject(body) || typeof body.eventId !== "string" || !UUID_RE.test(body.eventId)) {
    return NextResponse.json({ error: "Invalid activity event" }, { status: 400 });
  }

  if (
    body.type === "chapter_started" &&
    Object.keys(body).every((key) => ["eventId", "type", "chapterId"].includes(key)) &&
    Number.isInteger(body.chapterId) &&
    Number(body.chapterId) >= MIN_CHAPTER_ID &&
    Number(body.chapterId) <= MAX_CHAPTER_ID
  ) {
    const result = await recordActivityEvent({
      userId: user.id,
      eventId: body.eventId,
      type: "chapter_started",
      chapterId: Number(body.chapterId),
    });
    return NextResponse.json({ ok: true, ...result });
  }

  if (
    body.type === "minigame_started" &&
    Object.keys(body).every((key) => ["eventId", "type", "minigameId"].includes(key)) &&
    isValidHighscoreGameId(body.minigameId)
  ) {
    const result = await recordActivityEvent({
      userId: user.id,
      eventId: body.eventId,
      type: "minigame_started",
      minigameId: body.minigameId,
    });
    return NextResponse.json({ ok: true, ...result });
  }

  return NextResponse.json({ error: "Invalid activity event" }, { status: 400 });
}
