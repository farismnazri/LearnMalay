import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUser, initializeUserAuthState, verifyUserPassword } from "@/server/userRepo";

const COOKIE_NAME = "learnMalay.currentUserId";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 5; // 5 years

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

async function readCurrentId(): Promise<string | null> {
  const cookieStore = await cookies();
  const c = cookieStore.get(COOKIE_NAME)?.value;
  return c ?? null;
}

export async function GET() {
  try {
    await initializeUserAuthState();
    const id = await readCurrentId();
    if (!id) return NextResponse.json(null);
    const user = await getUser(id);
    return NextResponse.json(user ?? null);
  } catch (error: unknown) {
    console.error("GET /api/users/current failed", error);
    return NextResponse.json(null);
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as { id?: string; password?: string } | null;
    if (!body?.id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const userId = body.id.trim().toUpperCase();
    const currentId = await readCurrentId();
    const allowByPassword =
      typeof body.password === "string" && (await verifyUserPassword(userId, body.password));
    const allowByExistingSession = currentId === userId;

    if (!allowByPassword && !allowByExistingSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUser(userId);
    if (!user) return NextResponse.json({ error: "user not found" }, { status: 404 });

    const res = NextResponse.json(user);
    res.headers.append(
      "Set-Cookie",
      `${COOKIE_NAME}=${encodeURIComponent(user.id)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
    );
    return res;
  } catch (error: unknown) {
    console.error("POST /api/users/current failed", error);
    return NextResponse.json(
      { error: getErrorMessage(error, "server error") },
      { status: 500 }
    );
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
  } catch (error: unknown) {
    console.error("DELETE /api/users/current failed", error);
    return NextResponse.json(
      { error: getErrorMessage(error, "server error") },
      { status: 500 }
    );
  }
}
