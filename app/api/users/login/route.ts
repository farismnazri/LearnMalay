import { NextResponse } from "next/server";
import { authenticateUserAccount } from "@/server/userRepo";
import {
  checkAuthRateLimit,
  GENERIC_AUTH_FAILURE_MESSAGE,
  GENERIC_RATE_LIMIT_MESSAGE,
  logAdminAudit,
  recordAuthFailure,
  recordAuthSuccess,
} from "@/server/authSecurity";
import { readSessionIdFromCookie, startSessionForUser } from "@/server/sessionAuth";
import { deleteSession } from "@/server/sessionRepo";
import { ADMIN_ID } from "@/lib/userStoreTypes";
import { isAdmin } from "@/lib/userCapabilities";
import { enforceSameOriginMutation } from "@/server/requestSecurity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const csrf = enforceSameOriginMutation(req);
  if (csrf) return csrf;

  const body = (await req.json().catch(() => null)) as { name?: string; password?: string } | null;
  if (!body?.name || typeof body.password !== "string") {
    return NextResponse.json({ error: "name and password required" }, { status: 400 });
  }

  const userId = body.name.trim().toUpperCase();
  const isAdminAttempt = userId === ADMIN_ID;
  const rateLimit = checkAuthRateLimit("users-login", req, userId);
  if (rateLimit.limited) {
    const res = NextResponse.json({ error: GENERIC_RATE_LIMIT_MESSAGE }, { status: 429 });
    res.headers.set("Retry-After", String(rateLimit.retryAfterSeconds));
    if (isAdminAttempt) {
      logAdminAudit({
        action: "login",
        success: false,
        req,
        actorId: userId,
        targetUserId: userId,
        reason: "rate_limited",
      });
    }
    return res;
  }

  try {
    const profile = await authenticateUserAccount({ name: body.name, password: body.password });
    if (!profile) {
      recordAuthFailure(rateLimit.key);
      if (isAdminAttempt) {
        logAdminAudit({
          action: "login",
          success: false,
          req,
          actorId: userId,
          targetUserId: userId,
          reason: "invalid_credentials",
        });
      }
      return NextResponse.json({ error: GENERIC_AUTH_FAILURE_MESSAGE }, { status: 401 });
    }

    recordAuthSuccess(rateLimit.key);
    if (isAdmin(profile)) {
      logAdminAudit({
        action: "login",
        success: true,
        req,
        actorId: profile.id,
        targetUserId: profile.id,
      });
    }
    const previousSessionId = await readSessionIdFromCookie();
    const res = NextResponse.json(profile);
    await startSessionForUser(res, profile.id);
    if (previousSessionId) {
      await deleteSession(previousSessionId);
    }
    return res;
  } catch {
    recordAuthFailure(rateLimit.key);
    if (isAdminAttempt) {
      logAdminAudit({
        action: "login",
        success: false,
        req,
        actorId: userId,
        targetUserId: userId,
        reason: "server_error",
      });
    }
    return NextResponse.json({ error: GENERIC_AUTH_FAILURE_MESSAGE }, { status: 401 });
  }
}
