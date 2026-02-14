import { NextResponse } from "next/server";
import { getUser, initializeUserAuthState, verifyUserPassword } from "@/server/userRepo";
import {
  clearSessionCookie,
  getSessionUser,
  readSessionIdFromCookie,
  startSessionForUser,
} from "@/server/sessionAuth";
import { deleteSession } from "@/server/sessionRepo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export async function GET() {
  try {
    await initializeUserAuthState();
    const { sessionId, user } = await getSessionUser();
    if (user) return NextResponse.json(user);

    const res = NextResponse.json(null);
    if (sessionId) {
      clearSessionCookie(res);
    }
    return res;
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
    const { sessionId, user: currentUser } = await getSessionUser();
    const allowByPassword =
      typeof body.password === "string" && (await verifyUserPassword(userId, body.password));
    const allowByExistingSession = currentUser?.id === userId;

    if (!allowByPassword && !allowByExistingSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUser(userId);
    if (!user) return NextResponse.json({ error: "user not found" }, { status: 404 });

    const res = NextResponse.json(user);
    await startSessionForUser(res, user.id);
    if (sessionId) {
      await deleteSession(sessionId);
    }
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
    const sessionId = await readSessionIdFromCookie();
    if (sessionId) {
      await deleteSession(sessionId);
    }

    const res = NextResponse.json({ ok: true });
    clearSessionCookie(res);
    return res;
  } catch (error: unknown) {
    console.error("DELETE /api/users/current failed", error);
    return NextResponse.json(
      { error: getErrorMessage(error, "server error") },
      { status: 500 }
    );
  }
}
