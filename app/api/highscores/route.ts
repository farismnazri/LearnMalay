import { NextResponse } from "next/server";
import { addHighScore, clearHighScores, listHighScores } from "@/server/highscoreRepo";
import type { GameId, ScoreEntry } from "@/lib/highscoresTypes";
import { getSessionUser } from "@/server/sessionAuth";
import { canResetHighscores, canSaveHighscores } from "@/lib/userCapabilities";

export const runtime = "nodejs";

type IncomingBody = {
  gameId?: GameId;
  entry?: Omit<ScoreEntry, "id" | "dateISO"> & Partial<Pick<ScoreEntry, "id" | "dateISO">>;
};

export async function GET() {
  return NextResponse.json(await listHighScores());
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as IncomingBody | null;
  if (!body?.gameId || !body.entry) return NextResponse.json({ error: "gameId and entry required" }, { status: 400 });
  const { user } = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canSaveHighscores(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await addHighScore(body.gameId, {
    ...body.entry,
    name: user.name,
    avatarId: user.avatarId,
  });
  return NextResponse.json({ ok: true });
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
