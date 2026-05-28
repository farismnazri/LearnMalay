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
import { getSessionUser } from "@/server/sessionAuth";
import { canResetHighscores, canSaveHighscores } from "@/lib/userCapabilities";

export const runtime = "nodejs";

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

  const { user } = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canSaveHighscores(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

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
  const { user } = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canResetHighscores(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const gameId = searchParams.get("gameId") as GameId | null;
  await clearHighScores(gameId ?? undefined);
  return NextResponse.json({ ok: true });
}
