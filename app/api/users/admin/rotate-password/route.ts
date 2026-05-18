import { NextResponse } from "next/server";
import { ADMIN_ID } from "@/lib/userStoreTypes";
import {
  checkAuthRateLimit,
  GENERIC_AUTH_FAILURE_MESSAGE,
  GENERIC_RATE_LIMIT_MESSAGE,
  logAdminAudit,
  recordAuthFailure,
  recordAuthSuccess,
} from "@/server/authSecurity";
import { rotateAdminPasswordFromEnv, verifyUserPassword } from "@/server/userRepo";
import { clearSessionCookie, getSessionUser } from "@/server/sessionAuth";
import { deleteSessionsForUser } from "@/server/sessionRepo";
import { canRotateAdminPassword } from "@/lib/userCapabilities";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { currentPassword?: string } | null;
  if (typeof body?.currentPassword !== "string") {
    return NextResponse.json({ error: "currentPassword required" }, { status: 400 });
  }

  const rateLimit = checkAuthRateLimit("users-admin-rotate-password", req, ADMIN_ID);
  if (rateLimit.limited) {
    const res = NextResponse.json({ error: GENERIC_RATE_LIMIT_MESSAGE }, { status: 429 });
    res.headers.set("Retry-After", String(rateLimit.retryAfterSeconds));
    logAdminAudit({
      action: "rotate-admin-password",
      success: false,
      req,
      actorId: ADMIN_ID,
      targetUserId: ADMIN_ID,
      reason: "rate_limited",
    });
    return res;
  }

  try {
    const { user } = await getSessionUser();
    if (!user || !canRotateAdminPassword(user)) {
      recordAuthFailure(rateLimit.key);
      logAdminAudit({
        action: "rotate-admin-password",
        success: false,
        req,
        actorId: user?.id ?? null,
        targetUserId: ADMIN_ID,
        reason: "not_admin_session",
      });
      return NextResponse.json({ error: GENERIC_AUTH_FAILURE_MESSAGE }, { status: 401 });
    }

    const verified = await verifyUserPassword(ADMIN_ID, body.currentPassword);
    if (!verified) {
      recordAuthFailure(rateLimit.key);
      logAdminAudit({
        action: "rotate-admin-password",
        success: false,
        req,
        actorId: user.id,
        targetUserId: ADMIN_ID,
        reason: "invalid_credentials",
      });
      return NextResponse.json({ error: GENERIC_AUTH_FAILURE_MESSAGE }, { status: 401 });
    }

    const result = await rotateAdminPasswordFromEnv();
    await deleteSessionsForUser(ADMIN_ID);
    recordAuthSuccess(rateLimit.key);
    logAdminAudit({
      action: "rotate-admin-password",
      success: true,
      req,
      actorId: user.id,
      targetUserId: ADMIN_ID,
      reason: result.rotated ? "rotated" : "no_change",
    });

    const res = NextResponse.json({ ok: true, rotated: result.rotated, reauthRequired: true });
    clearSessionCookie(res);
    return res;
  } catch {
    recordAuthFailure(rateLimit.key);
    logAdminAudit({
      action: "rotate-admin-password",
      success: false,
      req,
      actorId: ADMIN_ID,
      targetUserId: ADMIN_ID,
      reason: "server_error",
    });
    return NextResponse.json({ error: GENERIC_AUTH_FAILURE_MESSAGE }, { status: 401 });
  }
}
