"use client";

import useSWR from "swr";
import { ADMIN_ID, type UserProfile, type UserProgress } from "./userStoreTypes";
import {
  ADMIN_AVATAR_ID,
  DEFAULT_USER_AVATAR_ID,
  type ProfileAvatarId,
} from "./profileAvatars";

let cachedUser: UserProfile | null = null;

type ApiErrorPayload = { error?: string };

function normalizeErrorMessage(raw: unknown, fallback: string) {
  if (typeof raw === "string" && raw.trim()) return raw.trim();
  return fallback;
}

const fetchJson = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(url, init);
  const text = await res.text().catch(() => "");

  let parsed: T | ApiErrorPayload | null = null;
  if (text) {
    try {
      parsed = JSON.parse(text) as T | ApiErrorPayload;
    } catch {
      if (!res.ok) throw new Error(`Request failed (${res.status}).`);
      throw new Error(`Invalid JSON from ${url}`);
    }
  }

  if (!res.ok) {
    const message = normalizeErrorMessage(
      (parsed as ApiErrorPayload | null)?.error ?? text,
      `Request failed (${res.status}).`
    );
    throw new Error(message);
  }

  return (parsed as T) ?? (null as T);
};

export function normalizeUserNameInput(rawName: string): string {
  return rawName
    .normalize("NFKC")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 32);
}

export function normalizePasswordInput(rawPassword: string): string {
  return rawPassword.normalize("NFKC").replace(/[\u0000-\u001F\u007F]/g, "").slice(0, 256);
}

// ---- React hooks ----
export function useUsers() {
  const { data, error, mutate, isLoading } = useSWR<UserProfile[]>("/api/users", fetchJson, {
    revalidateOnFocus: false,
  });

  return {
    users: data ?? [],
    loading: isLoading,
    error,
    refresh: () => mutate(),
  };
}

export function useCurrentUser() {
  return useSWR<UserProfile | null>("/api/users/current", fetchJson, {
    revalidateOnFocus: false,
  });
}

// ---- imperative helpers for convenience ----
export async function listUsers(): Promise<UserProfile[]> {
  const users = (await fetchJson<UserProfile[] | null>("/api/users")) ?? [];
  if (!users.find((u) => u.id === ADMIN_ID)) {
    users.unshift({
      id: ADMIN_ID,
      name: ADMIN_ID,
      avatarId: ADMIN_AVATAR_ID,
      isAdmin: true,
      progress: { chapter: 11, page: 1 },
    });
  }
  if (cachedUser) {
    const cached = cachedUser;
    const match = users.find((u) => u.id === cached.id);
    if (match) cachedUser = match;
  }
  return users;
}

export async function getCurrentUser(): Promise<UserProfile | null> {
  if (cachedUser) return cachedUser;
  try {
    const fromApi = await fetchJson<UserProfile | null>("/api/users/current");
    if (fromApi) cachedUser = fromApi;
    return fromApi;
  } catch {
    return null;
  }
}

export function getCachedUser() {
  return cachedUser;
}

export async function loginUser(name: string, password: string): Promise<UserProfile> {
  const profile = await fetchJson<UserProfile>("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: normalizeUserNameInput(name).trim(),
      password: normalizePasswordInput(password),
    }),
  });
  cachedUser = profile;
  return profile;
}

export async function registerUser(
  name: string,
  password: string,
  avatarId: ProfileAvatarId = DEFAULT_USER_AVATAR_ID
): Promise<UserProfile> {
  const profile = await fetchJson<UserProfile>("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: normalizeUserNameInput(name).trim(),
      password: normalizePasswordInput(password),
      avatarId,
    }),
  });
  cachedUser = profile;
  return profile;
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const res = await fetchJson<{ ok: boolean }>("/api/users/verify-admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: normalizePasswordInput(password) }),
  });
  return Boolean(res?.ok);
}

export async function setCurrentUserId(id: string, password?: string) {
  const res = await fetchJson<UserProfile>("/api/users/current", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, password }),
  });
  cachedUser = res;
  return res;
}

export async function clearCurrentUserId() {
  cachedUser = null;
  await fetchJson("/api/users/current", { method: "DELETE" });
}

export async function deleteUser(id: string) {
  await fetchJson("/api/users?id=" + encodeURIComponent(id), { method: "DELETE" });
}

export async function updateProgress(id: string, progress: UserProgress): Promise<UserProfile> {
  const profile = await fetchJson<UserProfile>("/api/users/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, progress }),
  });
  cachedUser = profile;
  return profile;
}

export { ADMIN_ID, type UserProfile, type UserProgress };
export { DEFAULT_USER_AVATAR_ID, type ProfileAvatarId };
