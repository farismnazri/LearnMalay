import { NextResponse } from "next/server";
import { ADMIN_ID } from "@/lib/userStoreTypes";
import { verifyUserPassword } from "@/server/userRepo";
import { getSessionUser } from "@/server/sessionAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { password?: string } | null;
  if (typeof body?.password !== "string") {
    return NextResponse.json({ error: "password required" }, { status: 400 });
  }

  try {
    const { user } = await getSessionUser();
    if (!user?.isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const ok = await verifyUserPassword(ADMIN_ID, body.password);
    return NextResponse.json({ ok });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(error, "unable to verify password") },
      { status: 400 }
    );
  }
}
