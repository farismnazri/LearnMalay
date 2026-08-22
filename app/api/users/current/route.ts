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
import { getUser, initializeUserAuthState, updateUserAvatar, verifyUserPassword } from "@/server/userRepo";
import {
  clearSessionCookie,
  getSessionUser,
  readSessionIdFromCookie,
  startSessionForUser,
} from "@/server/sessionAuth";
import { deleteSession } from "@/server/sessionRepo";
import { enforceSameOriginMutation } from "@/server/requestSecurity";
import { isProfileAvatarId } from "@/lib/profileAvatars";
import { checkRouteRateLimit, GENERIC_ROUTE_RATE_LIMIT_MESSAGE } from "@/server/routeRateLimit";
import { recordSuccessfulLogin } from "@/server/activityRepo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const AVATAR_UPDATE_WINDOW_MS = 60_000;
const AVATAR_UPDATE_MAX_HITS = 20;

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
  const csrf = enforceSameOriginMutation(req);
  if (csrf) return csrf;

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
      const res = NextResponse.json({ error: GENERIC_AUTH_FAILURE_MESSAGE }, { status: 401 });
      if (sessionId) clearSessionCookie(res);
      return res;
    }

    const user = await getUser(userId);
    if (!user) {
      const res = NextResponse.json({ error: GENERIC_AUTH_FAILURE_MESSAGE }, { status: 401 });
      if (sessionId) clearSessionCookie(res);
      return res;
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
    if (allowByPassword) {
      await recordSuccessfulLogin(user.id).catch((activityError: unknown) => {
        console.error("Unable to record login activity", activityError);
      });
    }
    if (sessionId) {
      await deleteSession(sessionId);
    }
    return res;
  } catch (error: unknown) {
    console.error("POST /api/users/current failed", error);
    return NextResponse.json({ error: GENERIC_AUTH_FAILURE_MESSAGE }, { status: 401 });
  }
}

export async function PATCH(req: Request) {
  const csrf = enforceSameOriginMutation(req);
  if (csrf) return csrf;

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (
    !body ||
    Array.isArray(body) ||
    Object.keys(body).length !== 1 ||
    !isProfileAvatarId(body.avatarId)
  ) {
    return NextResponse.json({ error: "Invalid avatar selected." }, { status: 400 });
  }

  const { sessionId, user } = await getSessionUser();
  if (!user) {
    const res = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (sessionId) clearSessionCookie(res);
    return res;
  }

  const rateLimit = checkRouteRateLimit({
    scope: "users-avatar-update",
    req,
    subject: user.id,
    windowMs: AVATAR_UPDATE_WINDOW_MS,
    maxHits: AVATAR_UPDATE_MAX_HITS,
  });
  if (rateLimit.limited) {
    const res = NextResponse.json({ error: GENERIC_ROUTE_RATE_LIMIT_MESSAGE }, { status: 429 });
    res.headers.set("Retry-After", String(rateLimit.retryAfterSeconds));
    return res;
  }

  try {
    await updateUserAvatar(user.id, body.avatarId);
    const updatedUser = await getUser(user.id);
    if (!updatedUser) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }
    return NextResponse.json(updatedUser);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(error, "unable to update avatar") },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request) {
  const csrf = enforceSameOriginMutation(req);
  if (csrf) return csrf;

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
