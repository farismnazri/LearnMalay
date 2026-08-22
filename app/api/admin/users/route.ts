import { NextResponse } from "next/server";

import { listAdminUsers } from "@/server/adminAnalyticsRepo";
import { requireAdminApi } from "@/server/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const auth = await requireAdminApi(req, "admin-users-read");
  if (auth.response) return auth.response;
  const search = new URL(req.url).searchParams.get("q") ?? "";
  return NextResponse.json(await listAdminUsers(search.slice(0, 64)));
}
