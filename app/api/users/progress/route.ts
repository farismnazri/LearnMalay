import { NextResponse } from "next/server";
import { setCurrentChapter, getUser } from "@/server/userRepo";
import { getSessionUser } from "@/server/sessionAuth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { id?: string; progress?: { chapter: number; page: number } } | null;
  if (!body?.id || !body.progress) return NextResponse.json({ error: "id and progress required" }, { status: 400 });

  const { user: actor } = await getSessionUser();
  if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const targetId = body.id.trim().toUpperCase();
  const actorId = actor.id.trim().toUpperCase();
  const canUpdate = Boolean(actor.isAdmin) || actorId === targetId;
  if (!canUpdate) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const user = await getUser(targetId);
  if (!user) return NextResponse.json({ error: "user not found" }, { status: 404 });

  await setCurrentChapter(targetId, body.progress);
  const updatedUser = await getUser(targetId);
  if (!updatedUser) return NextResponse.json({ error: "user not found" }, { status: 404 });
  return NextResponse.json(updatedUser);
}
