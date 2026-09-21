import { runPrivacyRetention } from "../../../../src/server/privacyRetention.ts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return json({ ok: false }, 401);
  }

  if (process.env.NODE_ENV === "production" && !process.env.MONGODB_URI?.trim()) {
    return json({ ok: false }, 503);
  }

  try {
    const result = await runPrivacyRetention();
    return json({ ok: true, ...result });
  } catch {
    console.error("Privacy retention cron failed");
    return json({ ok: false }, 500);
  }
}
