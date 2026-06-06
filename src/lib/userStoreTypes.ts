import type { ProfileAvatarId } from "./profileAvatars";

export type UserProgress = {
  chapter: number; // unlocked / current chapter (1..11)
  page: number; // current page within that chapter (1..N)
};

export type UserRole = "admin" | "demo" | "user";

export type UserProfile = {
  id: string;
  name: string;
  avatarId: ProfileAvatarId;
  role: UserRole;
  isAdmin?: boolean;
  isDemo?: boolean;
  progress: UserProgress;
  completedChapterRevisions: Record<string, number>;
};

export const ADMIN_ID = "ADMIN";
export const DEMO_ID = "DEMOMODE";
export const DEMO_DISPLAY_NAME = "Demo Mode";
