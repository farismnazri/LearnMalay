import { NextResponse } from "next/server";
import { setCurrentChapter, getUser } from "@/server/userRepo";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { id?: string; progress?: { chapter: number; page: number } } | null;
  if (!body?.id || !body.progress) return NextResponse.json({ error: "id and progress required" }, { status: 400 });

  const user = getUser(body.id);
  if (!user) return NextResponse.json({ error: "user not found" }, { status: 404 });

  setCurrentChapter(body.id, body.progress);
  const updatedUser = getUser(body.id);
  if (!updatedUser) return NextResponse.json({ error: "user not found" }, { status: 404 });
  return NextResponse.json(updatedUser);
}
