export type UserProgress = {
  chapter: number; // unlocked / current chapter (1..11)
  page: number;    // current page within that chapter (1..N)
};

export type UserProfile = {
  id: string;
  name: string;
  isAdmin?: boolean;
  progress: UserProgress;
};

const CURRENT_KEY = "learnMalay.currentUserId.v1";
const USERS_KEY = "learnMalay.users.v1";

export const ADMIN_ID = "ADMIN";

function assertClient() {
  if (typeof window === "undefined") {
    throw new Error("userStore: localStorage is only available in the browser.");
  }
}

function readUsers(): Record<string, UserProfile> {
  assertClient();
  const raw = window.localStorage.getItem(USERS_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, UserProfile>;
  } catch {
    return {};
  }
}

function writeUsers(users: Record<string, UserProfile>) {
  assertClient();
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUserId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(CURRENT_KEY);
}

export function setCurrentUserId(id: string) {
  assertClient();
  window.localStorage.setItem(CURRENT_KEY, id);
}

export function clearCurrentUserId() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CURRENT_KEY);
}

export function getCurrentUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  const id = getCurrentUserId();
  if (!id) return null;
  const users = readUsers();
  return users[id] ?? null;
}

export function listUsers(): UserProfile[] {
  if (typeof window === "undefined") return [];

  const users = readUsers();

  // Ensure ADMIN always exists (virtual -> persisted if missing)
  if (!users[ADMIN_ID]) {
    users[ADMIN_ID] = {
      id: ADMIN_ID,
      name: ADMIN_ID,
      isAdmin: true,
      progress: { chapter: 1, page: 1 },
    };
    writeUsers(users);
  } else {
    // If ADMIN exists from older saves but missing flags, repair it
    users[ADMIN_ID] = {
      ...users[ADMIN_ID],
      id: ADMIN_ID,
      name: ADMIN_ID,
      isAdmin: true,
      progress: users[ADMIN_ID].progress ?? { chapter: 11 },
    };
    writeUsers(users);
  }

  return Object.values(users).sort((a, b) => {
    if (a.isAdmin && !b.isAdmin) return -1;
    if (!a.isAdmin && b.isAdmin) return 1;
    return a.name.localeCompare(b.name);
  });
}

export function upsertUser(name: string): UserProfile {
  assertClient();

  const clean = name.trim().toUpperCase();
  if (!clean) throw new Error("upsertUser: name is empty.");

  const users = readUsers();
  if (users[clean]) return users[clean];

  const isAdmin = clean === ADMIN_ID;

  const created: UserProfile = {
    id: clean,
    name: clean,
    isAdmin,
    progress: { chapter: 1, page: 1 },
  };

  users[clean] = created;
  writeUsers(users);
  return created;
}

export function deleteUser(id: string) {
  assertClient();

  const users = readUsers();
  if (!users[id]) return;

  delete users[id];
  writeUsers(users);

  const current = getCurrentUserId();
  if (current === id) {
    clearCurrentUserId();
  }
}

export function updateProgress(id: string, progress: UserProgress) {
  assertClient();
  const users = readUsers();
  const u = users[id];
  if (!u) return;
  users[id] = { ...u, progress };
  writeUsers(users);
}