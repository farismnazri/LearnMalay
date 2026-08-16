export type ProfileAvatarId =
  | "bada"
  | "hela"
  | "jaja"
  | "kancil"
  | "kija"
  | "kumba"
  | "lada"
  | "nyu"
  | "raja"
  | "rima"
  | "rusi"
  | "yaya";

export type ProfileAvatarOption = {
  id: ProfileAvatarId;
  label: string;
  src: string;
};

export const PROFILE_AVATARS: ProfileAvatarOption[] = [
  { id: "bada", label: "Bada", src: "/assets/characters/profiles/profile-bada.webp" },
  { id: "hela", label: "Hela", src: "/assets/characters/profiles/profile-hela.webp" },
  { id: "jaja", label: "Jaja", src: "/assets/characters/profiles/profile-jaja.webp" },
  { id: "kancil", label: "Kancil", src: "/assets/characters/profiles/profile-kancil.webp" },
  { id: "kija", label: "Kija", src: "/assets/characters/profiles/profile-kija.webp" },
  { id: "kumba", label: "Kumba", src: "/assets/characters/profiles/profile-kumba.webp" },
  { id: "lada", label: "Lada", src: "/assets/characters/profiles/profile-lada.webp" },
  { id: "nyu", label: "Nyu", src: "/assets/characters/profiles/profile-nyu.webp" },
  { id: "raja", label: "Raja", src: "/assets/characters/profiles/profile-raja.webp" },
  { id: "rima", label: "Rima", src: "/assets/characters/profiles/profile-rima.webp" },
  { id: "rusi", label: "Rusi", src: "/assets/characters/profiles/profile-rusi.webp" },
  { id: "yaya", label: "Yaya", src: "/assets/characters/profiles/profile-yaya.webp" },
];

export const DEFAULT_USER_AVATAR_ID: ProfileAvatarId = "bada";
export const ADMIN_AVATAR_ID: ProfileAvatarId = "raja";
export const CURRENT_AVATAR_MIGRATION_VERSION = 1;
export const PROFILE_AVATAR_FALLBACK_SRC = "/assets/characters/profiles/profile-fallback.svg";

const AVATAR_BY_ID = new Map<ProfileAvatarId, ProfileAvatarOption>(
  PROFILE_AVATARS.map((avatar) => [avatar.id, avatar])
);

export function isProfileAvatarId(value: unknown): value is ProfileAvatarId {
  return typeof value === "string" && AVATAR_BY_ID.has(value as ProfileAvatarId);
}

export function getProfileAvatarSrc(avatarId: string | null | undefined): string {
  if (isProfileAvatarId(avatarId)) {
    return AVATAR_BY_ID.get(avatarId)!.src;
  }
  return PROFILE_AVATAR_FALLBACK_SRC;
}

export function resolveStoredProfileAvatar(
  rawAvatarId: string | null | undefined,
  rawMigrationVersion?: number
): { avatarId: ProfileAvatarId | null; migrationRequired: boolean } {
  if (isProfileAvatarId(rawAvatarId)) {
    return { avatarId: rawAvatarId, migrationRequired: false };
  }

  const migrationVersion = Number.isInteger(rawMigrationVersion) ? Number(rawMigrationVersion) : 0;
  return {
    avatarId: null,
    migrationRequired: Boolean(rawAvatarId) && migrationVersion < CURRENT_AVATAR_MIGRATION_VERSION,
  };
}
