import { NextResponse } from "next/server";
import { authenticateUserAccount } from "@/server/userRepo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE_NAME = "learnMalay.currentUserId";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 5; // 5 years

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
    res.headers.append(
      "Set-Cookie",
      `${COOKIE_NAME}=${encodeURIComponent(profile.id)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
    );
    return res;
  } catch (error: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(error, "unable to login") },
      { status: 400 }
    );
  }
}
