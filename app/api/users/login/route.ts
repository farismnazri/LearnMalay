import { NextResponse } from "next/server";
import { authenticateUserAccount } from "@/server/userRepo";
import { startSessionForUser } from "@/server/sessionAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { name?: string; password?: string } | null;
  if (!body?.name || typeof body.password !== "string") {
    return NextResponse.json({ error: "name and password required" }, { status: 400 });
  }

  try {
    const profile = await authenticateUserAccount({ name: body.name, password: body.password });
    if (!profile) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    const res = NextResponse.json(profile);
    await startSessionForUser(res, profile.id);
    return res;
  } catch (error: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(error, "unable to login") },
      { status: 400 }
    );
  }
}
