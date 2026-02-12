import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createUserAccount, deleteUser, getUser, listUsers } from "@/server/userRepo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const COOKIE_NAME = "learnMalay.currentUserId";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 5; // 5 years

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export async function GET() {
  return NextResponse.json(await listUsers());
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { name?: string; password?: string; avatarId?: string } | null;
  if (!body?.name || typeof body.password !== "string") {
    return NextResponse.json({ error: "name and password required" }, { status: 400 });
  }

  try {
    const profile = await createUserAccount({
      name: body.name,
      password: body.password,
      avatarId: body.avatarId,
    });
    const res = NextResponse.json(profile);
    res.headers.append(
      "Set-Cookie",
      `${COOKIE_NAME}=${encodeURIComponent(profile.id)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
    );
    return res;
  } catch (error: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(error, "unable to create account") },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  try {
    const cookieStore = await cookies();
    const rawCurrentId = cookieStore.get(COOKIE_NAME)?.value ?? null;
    const currentId = rawCurrentId ? decodeURIComponent(rawCurrentId) : null;
    if (!currentId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const actor = await getUser(currentId);
    if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const targetId = id.trim().toUpperCase();
    const actorId = actor.id.trim().toUpperCase();
    const canDelete = Boolean(actor.isAdmin) || actorId === targetId;
    if (!canDelete) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await deleteUser(id);
    const res = NextResponse.json({ ok: true });
    if (actorId === targetId) {
      res.headers.append(
        "Set-Cookie",
        `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`
      );
    }
    return res;
  } catch (error: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(error, "unable to delete user") },
      { status: 400 }
    );
  }
}
