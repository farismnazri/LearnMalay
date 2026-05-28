import { NextResponse } from "next/server";
import {
  addHighScore,
  clearHighScores,
  HighscoreValidationError,
  listHighScores,
  normalizeIncomingHighscoreEntry,
} from "@/server/highscoreRepo";
import type { GameId } from "@/lib/highscoresTypes";
import { isValidHighscoreGameId } from "@/lib/highscoresTypes";
import { clearSessionCookie, getSessionUser } from "@/server/sessionAuth";
import { canResetHighscores, canSaveHighscores } from "@/lib/userCapabilities";
import { checkRouteRateLimit, GENERIC_ROUTE_RATE_LIMIT_MESSAGE } from "@/server/routeRateLimit";
import { enforceSameOriginMutation } from "@/server/requestSecurity";

export const runtime = "nodejs";

const HIGHSCORE_SUBMIT_WINDOW_MS = 60_000;
const HIGHSCORE_SUBMIT_MAX_HITS = 40;
const HIGHSCORE_RESET_WINDOW_MS = 60_000;
const HIGHSCORE_RESET_MAX_HITS = 10;

type IncomingBody = {
  gameId?: unknown;
  entry?: unknown;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasOnlyKeys(obj: Record<string, unknown>, keys: readonly string[]) {
  return Object.keys(obj).every((key) => keys.includes(key));
}

export async function GET() {
  return NextResponse.json(await listHighScores());
}

export async function POST(req: Request) {
  const csrf = enforceSameOriginMutation(req);
  if (csrf) return csrf;

  const body = (await req.json().catch(() => null)) as IncomingBody | null;
  if (!isPlainObject(body) || !hasOnlyKeys(body, ["gameId", "entry"])) {
    return NextResponse.json({ error: "Invalid highscore payload" }, { status: 400 });
  }
  if (!isValidHighscoreGameId(body.gameId)) {
    return NextResponse.json({ error: "Invalid highscore payload" }, { status: 400 });
  }
  if (!isPlainObject(body.entry) || !hasOnlyKeys(body.entry, ["name", "avatarId", "accuracy", "timeMs", "meta"])) {
    return NextResponse.json({ error: "Invalid highscore payload" }, { status: 400 });
  }

  const { sessionId, user } = await getSessionUser();
  if (!user) {
    const res = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (sessionId) clearSessionCookie(res);
    return res;
  }
  if (!canSaveHighscores(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const rateLimit = checkRouteRateLimit({
    scope: "highscores-submit",
    req,
    subject: user.id,
    windowMs: HIGHSCORE_SUBMIT_WINDOW_MS,
    maxHits: HIGHSCORE_SUBMIT_MAX_HITS,
  });
  if (rateLimit.limited) {
    const res = NextResponse.json({ error: GENERIC_ROUTE_RATE_LIMIT_MESSAGE }, { status: 429 });
    res.headers.set("Retry-After", String(rateLimit.retryAfterSeconds));
    return res;
  }

  try {
    const safeEntry = normalizeIncomingHighscoreEntry(body.gameId, {
      ...body.entry,
      name: user.name,
      avatarId: user.avatarId,
    });

    await addHighScore(body.gameId, safeEntry);
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    if (error instanceof HighscoreValidationError) {
      return NextResponse.json({ error: "Invalid highscore payload" }, { status: 400 });
    }
    console.error("POST /api/highscores failed", error);
    return NextResponse.json({ error: "Unable to save highscore" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const csrf = enforceSameOriginMutation(req);
  if (csrf) return csrf;

  const { sessionId, user } = await getSessionUser();
  if (!user) {
    const res = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (sessionId) clearSessionCookie(res);
    return res;
  }
  if (!canResetHighscores(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const rateLimit = checkRouteRateLimit({
    scope: "highscores-reset",
    req,
    subject: user.id,
    windowMs: HIGHSCORE_RESET_WINDOW_MS,
    maxHits: HIGHSCORE_RESET_MAX_HITS,
  });
  if (rateLimit.limited) {
    const res = NextResponse.json({ error: GENERIC_ROUTE_RATE_LIMIT_MESSAGE }, { status: 429 });
    res.headers.set("Retry-After", String(rateLimit.retryAfterSeconds));
    return res;
  }

  const { searchParams } = new URL(req.url);
  const gameId = searchParams.get("gameId") as GameId | null;
  await clearHighScores(gameId ?? undefined);
  return NextResponse.json({ ok: true });
}
