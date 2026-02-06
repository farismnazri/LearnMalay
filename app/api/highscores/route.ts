import { NextResponse } from "next/server";
import { addHighScore, clearHighScores, listHighScores } from "@/server/highscoreRepo";
import type { GameId, ScoreEntry } from "@/lib/highscoresTypes";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(listHighScores());
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { gameId?: GameId; entry?: Partial<ScoreEntry> } | null;
  if (!body?.gameId || !body.entry) return NextResponse.json({ error: "gameId and entry required" }, { status: 400 });

  addHighScore(body.gameId, body.entry as any);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const gameId = searchParams.get("gameId") as GameId | null;
  clearHighScores(gameId ?? undefined);
  return NextResponse.json({ ok: true });
}
