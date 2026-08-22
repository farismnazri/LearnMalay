import type { GameId } from "./highscoresTypes";
import type { ProfileAvatarId } from "./profileAvatars";
import type { UserRole } from "./userStoreTypes";

export type AdminSummaryMetrics = {
  totalUsers: number;
  newUsersLast7Days: number;
  activeUsersLast7Days: number;
  activeUsersToday: number;
  totalChapterCompletions: number;
  totalMinigamePlays: number;
  totalHighscoreEntries: number;
};

export type AdminChapterFunnelItem = {
  id: number;
  name: string;
  completedUsers: number;
  completionShare: number;
  dropoffFromPrevious: number | null;
};

export type AdminMinigamePopularityItem = {
  id: GameId;
  name: string;
  totalPlays: number;
  uniquePlayers: number;
  playShare: number;
  highscoreEntries: number;
};

export type AdminOverview = {
  generatedAt: string;
  metrics: AdminSummaryMetrics;
  chapterFunnel: AdminChapterFunnelItem[];
  minigames: AdminMinigamePopularityItem[];
  mostPlayedMinigameId: GameId | null;
};

export type AdminUserSummary = {
  id: string;
  username: string;
  avatarId: ProfileAvatarId | null;
  role: UserRole;
  joinedAt: string | null;
  lastActiveAt: string | null;
  chaptersCompleted: number;
  totalChapters: number;
  minigamePlays: number;
  highscoreEntries: number;
};

export type AdminUserChapter = {
  id: number;
  name: string;
  completed: boolean;
  completedRevision: number | null;
  currentRevision: number;
  firstCompletedAt: string | null;
};

export type AdminUserMinigame = {
  id: GameId;
  name: string;
  playCount: number;
  everPlayed: boolean;
  bestRecordedScore: string | null;
  highscoreEntries: number;
  lastPlayedAt: string | null;
};

export type AdminUserDetail = AdminUserSummary & {
  lastLoginAt: string | null;
  progress: {
    currentChapter: number;
    currentPage: number;
    chapters: AdminUserChapter[];
  };
  minigames: AdminUserMinigame[];
  mostPlayedMinigameId: GameId | null;
  gamesNeverPlayed: GameId[];
};
