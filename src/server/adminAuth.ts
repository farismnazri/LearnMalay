import { NextResponse } from "next/server";

import { isAdmin } from "@/lib/userCapabilities";
import type { UserProfile } from "@/lib/userStoreTypes";
import { checkRouteRateLimit, GENERIC_ROUTE_RATE_LIMIT_MESSAGE } from "./routeRateLimit";
import { clearSessionCookie, getSessionUser } from "./sessionAuth";

const ADMIN_READ_WINDOW_MS = 60_000;
const ADMIN_READ_MAX_HITS = 120;

export async function requireAdminApi(
  req: Request,
  scope: string
): Promise<{ user: UserProfile; response: null } | { user: null; response: NextResponse }> {
  const { sessionId, user } = await getSessionUser();
  if (!user) {
    const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (sessionId) clearSessionCookie(response);
    return { user: null, response };
  }
  if (!isAdmin(user)) {
    return {
      user: null,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  const rateLimit = checkRouteRateLimit({
    scope,
    req,
    subject: user.id,
    windowMs: ADMIN_READ_WINDOW_MS,
    maxHits: ADMIN_READ_MAX_HITS,
  });
  if (rateLimit.limited) {
    const response = NextResponse.json({ error: GENERIC_ROUTE_RATE_LIMIT_MESSAGE }, { status: 429 });
    response.headers.set("Retry-After", String(rateLimit.retryAfterSeconds));
    return { user: null, response };
  }

  return { user, response: null };
}
