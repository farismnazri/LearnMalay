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
import { verifyUserPassword } from "@/server/userRepo";
import { getSessionUser } from "@/server/sessionAuth";
import { isAdmin } from "@/lib/userCapabilities";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { password?: string } | null;
  if (typeof body?.password !== "string") {
    return NextResponse.json({ error: "password required" }, { status: 400 });
  }

  const rateLimit = checkAuthRateLimit("users-verify-admin", req, ADMIN_ID);
  if (rateLimit.limited) {
    const res = NextResponse.json({ error: GENERIC_RATE_LIMIT_MESSAGE }, { status: 429 });
    res.headers.set("Retry-After", String(rateLimit.retryAfterSeconds));
    logAdminAudit({
      action: "verify-admin-password",
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
    if (!user || !isAdmin(user)) {
      recordAuthFailure(rateLimit.key);
      logAdminAudit({
        action: "verify-admin-password",
        success: false,
        req,
        actorId: user?.id ?? null,
        targetUserId: ADMIN_ID,
        reason: "not_admin_session",
      });
      return NextResponse.json({ error: GENERIC_AUTH_FAILURE_MESSAGE }, { status: 401 });
    }

    const ok = await verifyUserPassword(ADMIN_ID, body.password);
    if (!ok) {
      recordAuthFailure(rateLimit.key);
      logAdminAudit({
        action: "verify-admin-password",
        success: false,
        req,
        actorId: user.id,
        targetUserId: ADMIN_ID,
        reason: "invalid_credentials",
      });
      return NextResponse.json({ error: GENERIC_AUTH_FAILURE_MESSAGE }, { status: 401 });
    }

    recordAuthSuccess(rateLimit.key);
    logAdminAudit({
      action: "verify-admin-password",
      success: true,
      req,
      actorId: user.id,
      targetUserId: ADMIN_ID,
    });
    return NextResponse.json({ ok });
  } catch {
    recordAuthFailure(rateLimit.key);
    logAdminAudit({
      action: "verify-admin-password",
      success: false,
      req,
      actorId: ADMIN_ID,
      targetUserId: ADMIN_ID,
      reason: "server_error",
    });
    return NextResponse.json({ error: GENERIC_AUTH_FAILURE_MESSAGE }, { status: 401 });
  }
}
