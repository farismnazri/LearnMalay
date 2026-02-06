import { NextResponse } from "next/server";
import { listUsers, upsertUser, deleteUser } from "@/server/userRepo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(listUsers());
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { name?: string } | null;
  if (!body?.name) return NextResponse.json({ error: "name required" }, { status: 400 });

  try {
    const profile = upsertUser({ id: body.name.trim().toUpperCase(), name: body.name.trim() });
    return NextResponse.json(profile);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "unable to upsert" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  deleteUser(id);
  return NextResponse.json({ ok: true });
}
