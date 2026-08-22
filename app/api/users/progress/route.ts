import { NextResponse } from "next/server";
import { setCurrentChapter, getUser } from "@/server/userRepo";
import { clearSessionCookie, getSessionUser } from "@/server/sessionAuth";
import { canPersistProgress, isAdmin, isDemo } from "@/lib/userCapabilities";
import { MAX_CHAPTER_ID, MIN_CHAPTER_ID, getChapterById } from "@/lib/chapters";
import { checkRouteRateLimit, GENERIC_ROUTE_RATE_LIMIT_MESSAGE } from "@/server/routeRateLimit";
import { enforceSameOriginMutation } from "@/server/requestSecurity";
import { recordActivityEvent, touchMeaningfulUserActivity } from "@/server/activityRepo";

export const runtime = "nodejs";

const MAX_PROGRESS_PAGE = 10_000;
const PROGRESS_UPDATE_WINDOW_MS = 60_000;
const PROGRESS_UPDATE_MAX_HITS = 30;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasOnlyKeys(obj: Record<string, unknown>, keys: readonly string[]) {
  return Object.keys(obj).every((key) => keys.includes(key));
}

function parseProgress(value: unknown): { chapter: number; page: number } | null {
  if (!isPlainObject(value) || !hasOnlyKeys(value, ["chapter", "page"])) return null;

  const { chapter, page } = value;
  if (typeof chapter !== "number" || !Number.isInteger(chapter)) return null;
  if (chapter < MIN_CHAPTER_ID || chapter > MAX_CHAPTER_ID) return null;

  if (typeof page !== "number" || !Number.isInteger(page)) return null;
  if (page < 1 || page > MAX_PROGRESS_PAGE) return null;
  return { chapter, page };
}

export async function POST(req: Request) {
  const csrf = enforceSameOriginMutation(req);
  if (csrf) return csrf;

  const body = (await req.json().catch(() => null)) as {
    id?: unknown;
    progress?: unknown;
    completedChapterId?: unknown;
  } | null;
  if (!isPlainObject(body) || !hasOnlyKeys(body, ["id", "progress", "completedChapterId"])) {
    return NextResponse.json({ error: "Invalid progress payload" }, { status: 400 });
  }
  if (typeof body.id !== "string" || !body.id.trim()) {
    return NextResponse.json({ error: "Invalid progress payload" }, { status: 400 });
  }

  const safeProgress = parseProgress(body.progress);
  if (!safeProgress) {
    return NextResponse.json({ error: "Invalid progress payload" }, { status: 400 });
  }
  const completedChapterId = body.completedChapterId;
  if (
    completedChapterId !== undefined &&
    (
      typeof completedChapterId !== "number" ||
      !Number.isInteger(completedChapterId) ||
      !getChapterById(completedChapterId)
    )
  ) {
    return NextResponse.json({ error: "Invalid progress payload" }, { status: 400 });
  }

  const { sessionId, user: actor } = await getSessionUser();
  if (!actor) {
    const res = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (sessionId) clearSessionCookie(res);
    return res;
  }

  const targetId = body.id.trim().toUpperCase();
  const actorId = actor.id.trim().toUpperCase();
  const canUpdate = isAdmin(actor) || actorId === targetId;
  if (!canUpdate) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const user = await getUser(targetId);
  if (!user) return NextResponse.json({ error: "user not found" }, { status: 404 });
  if (!canPersistProgress(actor) || isDemo(user)) return NextResponse.json(user);

  const rateLimit = checkRouteRateLimit({
    scope: "users-progress-update",
    req,
    subject: actor.id,
    windowMs: PROGRESS_UPDATE_WINDOW_MS,
    maxHits: PROGRESS_UPDATE_MAX_HITS,
  });
  if (rateLimit.limited) {
    const res = NextResponse.json({ error: GENERIC_ROUTE_RATE_LIMIT_MESSAGE }, { status: 429 });
    res.headers.set("Retry-After", String(rateLimit.retryAfterSeconds));
    return res;
  }

  // TODO(security): Proper anti-cheat progression should use a signed completion token
  // or a server-verifiable completion event per chapter run.
  if (!isAdmin(actor)) {
    const chapterDelta = safeProgress.chapter - user.progress.chapter;
    if (chapterDelta !== 0 && chapterDelta !== 1) {
      return NextResponse.json({ error: "Invalid progress payload" }, { status: 400 });
    }
    if (completedChapterId !== undefined && completedChapterId > user.progress.chapter) {
      return NextResponse.json({ error: "Invalid progress payload" }, { status: 400 });
    }
  }

  await setCurrentChapter(targetId, safeProgress, completedChapterId);
  if (completedChapterId !== undefined && user.completedChapterRevisions[String(completedChapterId)] === undefined) {
    await recordActivityEvent({
      userId: targetId,
      type: "chapter_completed",
      chapterId: completedChapterId,
    }).catch((activityError: unknown) => {
      console.error("Unable to record chapter completion activity", activityError);
    });
  } else {
    await touchMeaningfulUserActivity(targetId).catch((activityError: unknown) => {
      console.error("Unable to update meaningful activity timestamp", activityError);
    });
  }
  const updatedUser = await getUser(targetId);
  if (!updatedUser) return NextResponse.json({ error: "user not found" }, { status: 404 });
  return NextResponse.json(updatedUser);
}
