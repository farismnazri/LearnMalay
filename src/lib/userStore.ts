"use client";

import useSWR from "swr";
import { ADMIN_ID, type UserProfile, type UserProgress } from "./userStoreTypes";

let cachedUser: UserProfile | null = null;

const CURRENT_COOKIE = "learnMalay.currentUserId";

function setCookieClient(name: string, value: string, maxAgeSec: number) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSec}; SameSite=Lax`;
}

function clearCookieClient(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
}

function readCookieClient(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1] ?? "") : null;
}

// Simple fetcher helpers for client-side calls to /api
const fetchJson = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(url, init);
  const text = await res.text().catch(() => "");
  if (!res.ok) {
    console.error(`Request to ${url} failed`, res.status, text);
    return null as T;
  }
  if (!text) return null as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`Invalid JSON from ${url}`);
  }
};

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
      isAdmin: true,
      progress: { chapter: 11, page: 1 },
    });
  }
  if (cachedUser) {
    const match = users.find((u) => u.id === cachedUser.id);
    if (match) cachedUser = match;
  }
  return users;
}

export async function getCurrentUser(): Promise<UserProfile | null> {
  if (cachedUser) return cachedUser;
  try {
    const fromApi = await fetchJson<UserProfile | null>("/api/users/current");
    if (fromApi) {
      cachedUser = fromApi;
      return fromApi;
    }
  } catch {
    // ignore
  }

  // Fallback: read cookie client-side and map to known users
  if (typeof window !== "undefined") {
    const id = readCookieClient(CURRENT_COOKIE);
    if (id) {
      const users = await listUsers().catch(() => []) as UserProfile[];
      const match = users.find((u) => u.id === id) ?? null;
      if (match) cachedUser = match;
      return match;
    }
  }
  return null;
}

export function getCachedUser() {
  return cachedUser;
}

export async function setCurrentUserId(id: string) {
  setCookieClient(CURRENT_COOKIE, id, 60 * 60 * 24 * 365 * 5);
  try {
    const res = await fetchJson<UserProfile | null>("/api/users/current", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res) {
      cachedUser = res;
    } else {
      const users = await listUsers().catch(() => []) as UserProfile[];
      const match = users.find((u) => u.id === id) ?? null;
      if (match) cachedUser = match;
    }
  } catch (e) {
    console.error(e);
  }
}

export async function clearCurrentUserId() {
  clearCookieClient(CURRENT_COOKIE);
  cachedUser = null;
  try {
    await fetchJson("/api/users/current", { method: "DELETE" });
  } catch (e) {
    console.error(e);
  }
}

export async function upsertUser(name: string): Promise<UserProfile> {
  const clean = name.trim();
  if (!clean) throw new Error("Name is empty");

  return fetchJson<UserProfile>("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: clean }),
  });
}

export async function deleteUser(id: string) {
  await fetchJson("/api/users?id=" + encodeURIComponent(id), { method: "DELETE" });
}

export async function updateProgress(id: string, progress: UserProgress) {
  await fetchJson("/api/users/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, progress }),
  });
}

export { ADMIN_ID, type UserProfile, type UserProgress };
