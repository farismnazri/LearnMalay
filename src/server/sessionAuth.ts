import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { UserProfile } from "@/lib/userStoreTypes";
import { getUser } from "./userRepo";
import { createSession, deleteSession, getSession, touchSession } from "./sessionRepo";

export const SESSION_COOKIE_NAME = "learnMalay.sessionId";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days
const LEGACY_COOKIE_NAME = "learnMalay.currentUserId";

const IS_PROD = process.env.NODE_ENV === "production";

export function applySessionCookie(res: NextResponse, sessionId: string) {
  res.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: sessionId,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
    sameSite: "lax",
    httpOnly: true,
    secure: IS_PROD,
  });
  res.cookies.set({
    name: LEGACY_COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    secure: IS_PROD,
  });
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    httpOnly: true,
    secure: IS_PROD,
  });
  res.cookies.set({
    name: LEGACY_COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    secure: IS_PROD,
  });
}

export async function readSessionIdFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE_NAME)?.value?.trim();
  return value ? value : null;
}

export async function getSessionUser(): Promise<{
  sessionId: string | null;
  user: UserProfile | null;
}> {
  const sessionId = await readSessionIdFromCookie();
  if (!sessionId) return { sessionId: null, user: null };

  const session = await getSession(sessionId);
  if (!session) return { sessionId, user: null };

  const user = await getUser(session.user_id);
  if (!user) {
    await deleteSession(sessionId);
    return { sessionId, user: null };
  }

  await touchSession(sessionId);
  return { sessionId, user };
}

export async function startSessionForUser(res: NextResponse, userId: string): Promise<string> {
  const session = await createSession(userId, SESSION_MAX_AGE_SECONDS);
  applySessionCookie(res, session.id);
  return session.id;
}
