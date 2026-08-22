import { CHAPTERS } from "@/lib/chapters";
import { sortHighscoreRows } from "@/lib/highscoreRanking";
import { VALID_HIGHSCORE_GAME_IDS, type GameId, type ScoreEntry } from "@/lib/highscoresTypes";
import { MINIGAME_NAMES } from "@/lib/minigameUnlocks";
import { resolveStoredProfileAvatar } from "@/lib/profileAvatars";
import type {
  AdminOverview,
  AdminUserDetail,
  AdminUserMinigame,
  AdminUserSummary,
} from "@/lib/adminAnalyticsTypes";
import { ADMIN_ID, DEMO_ID, type UserRole } from "@/lib/userStoreTypes";
import { listHighScores } from "./highscoreRepo";
import { getCollections, type ActivityEventDocument, type UserDocument } from "./db";
import { initializeUserAuthState } from "./userRepo";

function safeIso(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? new Date(parsed).toISOString() : null;
}

function roleFromRow(row: UserDocument): UserRole {
  if (row.is_admin || row.id === ADMIN_ID) return "admin";
  if (row.id === DEMO_ID) return "demo";
  return "user";
}

function completedRevisions(row: UserDocument): Record<string, number> {
  if (!row.completed_chapter_revisions || typeof row.completed_chapter_revisions !== "object") return {};
  const result: Record<string, number> = {};
  for (const [id, revision] of Object.entries(row.completed_chapter_revisions)) {
    if (/^\d+$/.test(id) && Number.isInteger(revision) && revision >= 1) result[id] = revision;
  }
  return result;
}

function countCompletedChapters(row: UserDocument) {
  const revisions = completedRevisions(row);
  return CHAPTERS.filter((chapter) => revisions[String(chapter.id)] !== undefined).length;
}

function scoreEntryTimestamp(entry: ScoreEntry) {
  return safeIso(entry.dateISO);
}

function latestIso(values: Array<string | null | undefined>): string | null {
  const valid = values.filter((value): value is string => Boolean(safeIso(value)));
  if (valid.length === 0) return null;
  return valid.sort((left, right) => right.localeCompare(left))[0];
}

function formatDuration(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function describeBestScore(gameId: GameId, entries: ScoreEntry[]): string | null {
  if (entries.length === 0) return null;
  const best = sortHighscoreRows(gameId, entries)[0];
  if ((gameId === "arah-jalan" || gameId === "misi-membeli") && typeof best.score === "number") {
    return `${best.score} streak · ${formatDuration(best.timeMs)}`;
  }
  return `${Math.round(best.accuracy)}% · ${formatDuration(best.timeMs)}`;
}

async function loadAnalyticsRows() {
  await initializeUserAuthState();
  const [{ users, activityEvents }, highscoreStore] = await Promise.all([
    getCollections(),
    listHighScores(),
  ]);
  const [userRows, eventRows] = await Promise.all([
    users.find({}, { sort: { name: 1 } }).toArray(),
    activityEvents.find({}).toArray(),
  ]);
  return { userRows, eventRows, highscoreStore };
}

function highscoreEntriesForUser(
  userId: string,
  highscoreStore: Record<GameId, ScoreEntry[]>
) {
  const byGame = {} as Record<GameId, ScoreEntry[]>;
  for (const gameId of VALID_HIGHSCORE_GAME_IDS) {
    byGame[gameId] = highscoreStore[gameId].filter((entry) => entry.userId === userId);
  }
  return byGame;
}

function buildUserSummary(
  row: UserDocument,
  events: ActivityEventDocument[],
  highscoreStore: Record<GameId, ScoreEntry[]>
): AdminUserSummary {
  const avatar = resolveStoredProfileAvatar(row.avatar_id, row.avatar_migration_version);
  const highscores = highscoreEntriesForUser(row.id, highscoreStore);
  return {
    id: row.id,
    username: row.name,
    avatarId: avatar.avatarId,
    role: roleFromRow(row),
    joinedAt: safeIso(row.created_at),
    lastActiveAt: safeIso(row.last_active_at),
    chaptersCompleted: countCompletedChapters(row),
    totalChapters: CHAPTERS.length,
    minigamePlays: events.filter(
      (event) => event.user_id === row.id && event.event_type === "minigame_started"
    ).length,
    highscoreEntries: VALID_HIGHSCORE_GAME_IDS.reduce(
      (total, gameId) => total + highscores[gameId].length,
      0
    ),
  };
}

export async function getAdminOverview(now = new Date()): Promise<AdminOverview> {
  const { userRows, eventRows, highscoreStore } = await loadAnalyticsRows();
  const learners = userRows.filter((row) => roleFromRow(row) === "user");
  const learnerIds = new Set(learners.map((row) => row.id));
  const sevenDaysAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const trackedStarts = eventRows.filter(
    (event) => event.event_type === "minigame_started" && learnerIds.has(event.user_id)
  );

  const chapterFunnel = CHAPTERS.map((chapter, index) => {
    const completedUsers = learners.filter(
      (row) => completedRevisions(row)[String(chapter.id)] !== undefined
    ).length;
    const previousCompleted = index === 0
      ? null
      : learners.filter(
          (row) => completedRevisions(row)[String(CHAPTERS[index - 1].id)] !== undefined
        ).length;
    return {
      id: chapter.id,
      name: chapter.title.en,
      completedUsers,
      completionShare: learners.length === 0 ? 0 : completedUsers / learners.length,
      dropoffFromPrevious: previousCompleted === null ? null : Math.max(0, previousCompleted - completedUsers),
    };
  });

  const minigames = VALID_HIGHSCORE_GAME_IDS.map((gameId) => {
    const starts = trackedStarts.filter((event) => event.minigame_id === gameId);
    return {
      id: gameId,
      name: MINIGAME_NAMES[gameId],
      totalPlays: starts.length,
      uniquePlayers: new Set(starts.map((event) => event.user_id)).size,
      playShare: trackedStarts.length === 0 ? 0 : starts.length / trackedStarts.length,
      highscoreEntries: highscoreStore[gameId].length,
    };
  });
  const mostPlayed = [...minigames].sort((left, right) => right.totalPlays - left.totalPlays)[0];

  const lastActiveValues = learners.map((row) => safeIso(row.last_active_at));
  return {
    generatedAt: now.toISOString(),
    metrics: {
      totalUsers: learners.length,
      newUsersLast7Days: learners.filter((row) => {
        const joined = safeIso(row.created_at);
        return joined !== null && Date.parse(joined) >= sevenDaysAgo;
      }).length,
      activeUsersLast7Days: lastActiveValues.filter(
        (value) => value !== null && Date.parse(value) >= sevenDaysAgo
      ).length,
      activeUsersToday: lastActiveValues.filter(
        (value) => value !== null && Date.parse(value) >= todayStart.getTime()
      ).length,
      totalChapterCompletions: learners.reduce(
        (total, row) => total + countCompletedChapters(row),
        0
      ),
      totalMinigamePlays: trackedStarts.length,
      totalHighscoreEntries: VALID_HIGHSCORE_GAME_IDS.reduce(
        (total, gameId) => total + highscoreStore[gameId].length,
        0
      ),
    },
    chapterFunnel,
    minigames,
    mostPlayedMinigameId: mostPlayed && mostPlayed.totalPlays > 0 ? mostPlayed.id : null,
  };
}

export async function listAdminUsers(search = ""): Promise<AdminUserSummary[]> {
  const { userRows, eventRows, highscoreStore } = await loadAnalyticsRows();
  const needle = search.trim().toLocaleLowerCase();
  return userRows
    .filter((row) => !needle || row.name.toLocaleLowerCase().includes(needle))
    .map((row) => buildUserSummary(row, eventRows, highscoreStore));
}

export async function getAdminUserDetail(userId: string): Promise<AdminUserDetail | null> {
  const { userRows, eventRows, highscoreStore } = await loadAnalyticsRows();
  const cleanId = userId.trim().toUpperCase();
  const row = userRows.find((candidate) => candidate.id === cleanId);
  if (!row) return null;

  const userEvents = eventRows.filter((event) => event.user_id === row.id);
  const highscores = highscoreEntriesForUser(row.id, highscoreStore);
  const revisions = completedRevisions(row);
  const summary = buildUserSummary(row, eventRows, highscoreStore);
  const minigames: AdminUserMinigame[] = VALID_HIGHSCORE_GAME_IDS.map((gameId) => {
    const gameEvents = userEvents.filter((event) => event.minigame_id === gameId);
    const starts = gameEvents.filter((event) => event.event_type === "minigame_started");
    const scoreRows = highscores[gameId];
    return {
      id: gameId,
      name: MINIGAME_NAMES[gameId],
      playCount: starts.length,
      everPlayed: starts.length > 0 || scoreRows.length > 0,
      bestRecordedScore: describeBestScore(gameId, scoreRows),
      highscoreEntries: scoreRows.length,
      lastPlayedAt: latestIso([
        ...gameEvents.map((event) => event.timestamp),
        ...scoreRows.map(scoreEntryTimestamp),
      ]),
    };
  });
  const mostPlayed = [...minigames].sort((left, right) => right.playCount - left.playCount)[0];

  return {
    ...summary,
    lastLoginAt: safeIso(row.last_login_at),
    progress: {
      currentChapter: Number(row.progress_chapter) || CHAPTERS[0].id,
      currentPage: Number(row.progress_page) || 1,
      chapters: CHAPTERS.map((chapter) => {
        const completionEvents = userEvents
          .filter(
            (event) => event.event_type === "chapter_completed" && event.chapter_id === chapter.id
          )
          .map((event) => safeIso(event.timestamp))
          .filter((value): value is string => value !== null)
          .sort();
        return {
          id: chapter.id,
          name: chapter.title.en,
          completed: revisions[String(chapter.id)] !== undefined,
          completedRevision: revisions[String(chapter.id)] ?? null,
          currentRevision: chapter.revision,
          firstCompletedAt: completionEvents[0] ?? null,
        };
      }),
    },
    minigames,
    mostPlayedMinigameId: mostPlayed && mostPlayed.playCount > 0 ? mostPlayed.id : null,
    gamesNeverPlayed: minigames.filter((game) => !game.everPlayed).map((game) => game.id),
  };
}
