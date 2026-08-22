import { NextResponse } from "next/server";

import { getAdminUserDetail } from "@/server/adminAnalyticsRepo";
import { requireAdminApi } from "@/server/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi(req, "admin-user-detail-read");
  if (auth.response) return auth.response;
  const { id } = await context.params;
  const detail = await getAdminUserDetail(id);
  if (!detail) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json(detail);
}
