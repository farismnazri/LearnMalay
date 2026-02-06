import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUser } from "@/server/userRepo";

const COOKIE_NAME = "learnMalay.currentUserId";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 5; // 5 years

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function readCurrentId(): string | null {
  const c = cookies().get(COOKIE_NAME)?.value;
  return c ?? null;
}

export async function GET() {
  try {
    const id = readCurrentId();
    if (!id) return NextResponse.json(null);
    const user = getUser(id);
    return NextResponse.json(user ?? null);
  } catch (e: any) {
    console.error("GET /api/users/current failed", e);
    return NextResponse.json(null);
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as { id?: string } | null;
    if (!body?.id) return NextResponse.json({ error: "id required" }, { status: 400 });

    // Set cookie regardless; we'll return user data if available
    const user = getUser(body.id);
    const res = NextResponse.json(user ?? { ok: true, id: body.id });
    res.headers.append(
      "Set-Cookie",
      `${COOKIE_NAME}=${encodeURIComponent(body.id)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
    );
    return res;
  } catch (e: any) {
    console.error("POST /api/users/current failed", e?.stack || e);
    return NextResponse.json({ error: e?.message || "server error" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const res = NextResponse.json({ ok: true });
    res.headers.append(
      "Set-Cookie",
      `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`
    );
    return res;
  } catch (e: any) {
    console.error("DELETE /api/users/current failed", e?.stack || e);
    return NextResponse.json({ error: e?.message || "server error" }, { status: 500 });
  }
}
