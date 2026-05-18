import { NextResponse } from "next/server";
import { ADMIN_ID } from "@/lib/userStoreTypes";
import { isAdmin } from "@/lib/userCapabilities";
import {
  checkAuthRateLimit,
  GENERIC_AUTH_FAILURE_MESSAGE,
  GENERIC_RATE_LIMIT_MESSAGE,
  logAdminAudit,
  recordAuthFailure,
  recordAuthSuccess,
} from "@/server/authSecurity";
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
    const passwordInput = typeof body.password === "string" ? body.password : null;
    const { sessionId, user: currentUser } = await getSessionUser();
    const usesPassword = passwordInput !== null;
    const rateLimit = usesPassword ? checkAuthRateLimit("users-current", req, userId) : null;
    if (rateLimit?.limited) {
      const res = NextResponse.json({ error: GENERIC_RATE_LIMIT_MESSAGE }, { status: 429 });
      res.headers.set("Retry-After", String(rateLimit.retryAfterSeconds));
      if (userId === ADMIN_ID) {
        logAdminAudit({
          action: "switch-user",
          success: false,
          req,
          actorId: currentUser?.id ?? null,
          targetUserId: userId,
          reason: "rate_limited",
        });
      }
      return res;
    }

    const allowByPassword = passwordInput ? await verifyUserPassword(userId, passwordInput) : false;
    const allowByExistingSession = currentUser?.id === userId;

    if (!allowByPassword && !allowByExistingSession) {
      if (rateLimit) {
        recordAuthFailure(rateLimit.key);
      }
      if (userId === ADMIN_ID) {
        logAdminAudit({
          action: "switch-user",
          success: false,
          req,
          actorId: currentUser?.id ?? null,
          targetUserId: userId,
          reason: "invalid_credentials",
        });
      }
      return NextResponse.json({ error: GENERIC_AUTH_FAILURE_MESSAGE }, { status: 401 });
    }

    const user = await getUser(userId);
    if (!user) {
      return NextResponse.json({ error: GENERIC_AUTH_FAILURE_MESSAGE }, { status: 401 });
    }

    if (rateLimit && allowByPassword) {
      recordAuthSuccess(rateLimit.key);
    }
    if (isAdmin(user)) {
      logAdminAudit({
        action: "switch-user",
        success: true,
        req,
        actorId: currentUser?.id ?? user.id,
        targetUserId: user.id,
      });
    }

    const res = NextResponse.json(user);
    await startSessionForUser(res, user.id);
    if (sessionId) {
      await deleteSession(sessionId);
    }
    return res;
  } catch (error: unknown) {
    console.error("POST /api/users/current failed", error);
    return NextResponse.json({ error: GENERIC_AUTH_FAILURE_MESSAGE }, { status: 401 });
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
