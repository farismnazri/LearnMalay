export type ProfileAvatarId =
  | "coco"
  | "cortex"
  | "crash"
  | "nitrus"
  | "ripper"
  | "tawna";

export type ProfileAvatarOption = {
  id: ProfileAvatarId;
  label: string;
  src: string;
};

export const PROFILE_AVATARS: ProfileAvatarOption[] = [
  { id: "crash", label: "Crash", src: "/assets/characters/profiles/CrashProfile.webp" },
  { id: "coco", label: "Coco", src: "/assets/characters/profiles/CocoProfile.webp" },
  { id: "cortex", label: "Cortex", src: "/assets/characters/profiles/CortexProfile.webp" },
  { id: "nitrus", label: "Nitrus", src: "/assets/characters/profiles/NitrusProfile.webp" },
  { id: "ripper", label: "Ripper", src: "/assets/characters/profiles/RipperProfile.webp" },
  { id: "tawna", label: "Tawna", src: "/assets/characters/profiles/TawnaProfile.webp" },
];

export const DEFAULT_USER_AVATAR_ID: ProfileAvatarId = "crash";
export const ADMIN_AVATAR_ID: ProfileAvatarId = "cortex";

const AVATAR_BY_ID = new Map<ProfileAvatarId, ProfileAvatarOption>(
  PROFILE_AVATARS.map((avatar) => [avatar.id, avatar])
);

export function isProfileAvatarId(value: string): value is ProfileAvatarId {
  return AVATAR_BY_ID.has(value as ProfileAvatarId);
}

export function getProfileAvatarSrc(avatarId: ProfileAvatarId | null | undefined): string {
  if (avatarId && AVATAR_BY_ID.has(avatarId)) {
    return AVATAR_BY_ID.get(avatarId)!.src;
  }
  return AVATAR_BY_ID.get(DEFAULT_USER_AVATAR_ID)!.src;
}
