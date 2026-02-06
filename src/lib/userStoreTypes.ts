export type UserProgress = {
  chapter: number; // unlocked / current chapter (1..11)
  page: number; // current page within that chapter (1..N)
};

export type UserProfile = {
  id: string;
  name: string;
  isAdmin?: boolean;
  progress: UserProgress;
};

export const ADMIN_ID = "ADMIN";
