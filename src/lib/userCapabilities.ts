import { ADMIN_ID, DEMO_ID, type UserProfile, type UserRole } from "./userStoreTypes";

type RoleLike = Pick<UserProfile, "id" | "isAdmin"> & Partial<Pick<UserProfile, "role">>;

function normalizeUserId(id: string) {
  return id.trim().toUpperCase();
}

export function roleForUser(user: RoleLike | null | undefined): UserRole {
  if (!user) return "user";
  if (user.role === "admin" || user.role === "demo" || user.role === "user") return user.role;
  if (user.isAdmin) return "admin";

  const id = normalizeUserId(user.id);
  if (id === ADMIN_ID) return "admin";
  if (id === DEMO_ID) return "demo";
  return "user";
}

export function isAdmin(user: RoleLike | null | undefined) {
  return roleForUser(user) === "admin";
}

export function isDemo(user: RoleLike | null | undefined) {
  return roleForUser(user) === "demo";
}

export function canUnlockEverything(user: RoleLike | null | undefined) {
  const role = roleForUser(user);
  return role === "admin" || role === "demo";
}

export function canSaveHighscores(user: RoleLike | null | undefined) {
  if (!user) return false;
  return !isDemo(user);
}

export function canPersistProgress(user: RoleLike | null | undefined) {
  if (!user) return false;
  return !isDemo(user);
}

export function canManageUsers(user: RoleLike | null | undefined) {
  return isAdmin(user);
}

export function canResetHighscores(user: RoleLike | null | undefined) {
  return isAdmin(user);
}

export function canRotateAdminPassword(user: RoleLike | null | undefined) {
  return isAdmin(user);
}

export function isPrivilegedAccountId(id: string) {
  const normalized = normalizeUserId(id);
  return normalized === ADMIN_ID || normalized === DEMO_ID;
}
