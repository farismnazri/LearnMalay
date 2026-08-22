import { NextResponse } from "next/server";

import { getAdminOverview } from "@/server/adminAnalyticsRepo";
import { requireAdminApi } from "@/server/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const auth = await requireAdminApi(req, "admin-analytics-read");
  if (auth.response) return auth.response;
  return NextResponse.json(await getAdminOverview());
}
