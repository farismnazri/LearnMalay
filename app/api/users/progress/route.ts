import { NextResponse } from "next/server";
import { setCurrentChapter, getUser } from "@/server/userRepo";
import { getSessionUser } from "@/server/sessionAuth";
import { canPersistProgress, isAdmin, isDemo } from "@/lib/userCapabilities";
import { MAX_CHAPTER_ID, MIN_CHAPTER_ID } from "@/lib/chapters";

export const runtime = "nodejs";

const MAX_PROGRESS_PAGE = 10_000;

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
  const body = (await req.json().catch(() => null)) as { id?: unknown; progress?: unknown } | null;
  if (!isPlainObject(body) || !hasOnlyKeys(body, ["id", "progress"])) {
    return NextResponse.json({ error: "Invalid progress payload" }, { status: 400 });
  }
  if (typeof body.id !== "string" || !body.id.trim()) {
    return NextResponse.json({ error: "Invalid progress payload" }, { status: 400 });
  }

  const safeProgress = parseProgress(body.progress);
  if (!safeProgress) {
    return NextResponse.json({ error: "Invalid progress payload" }, { status: 400 });
  }

  const { user: actor } = await getSessionUser();
  if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const targetId = body.id.trim().toUpperCase();
  const actorId = actor.id.trim().toUpperCase();
  const canUpdate = isAdmin(actor) || actorId === targetId;
  if (!canUpdate) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const user = await getUser(targetId);
  if (!user) return NextResponse.json({ error: "user not found" }, { status: 404 });
  if (!canPersistProgress(actor) || isDemo(user)) return NextResponse.json(user);

  // TODO(security): Proper anti-cheat progression should use a signed completion token
  // or a server-verifiable completion event per chapter run.
  if (!isAdmin(actor)) {
    const chapterDelta = safeProgress.chapter - user.progress.chapter;
    if (chapterDelta !== 0 && chapterDelta !== 1) {
      return NextResponse.json({ error: "Invalid progress payload" }, { status: 400 });
    }
  }

  await setCurrentChapter(targetId, safeProgress);
  const updatedUser = await getUser(targetId);
  if (!updatedUser) return NextResponse.json({ error: "user not found" }, { status: 404 });
  return NextResponse.json(updatedUser);
}
