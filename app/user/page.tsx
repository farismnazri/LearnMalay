"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import IconActionLink from "@/components/navigation/IconActionLink";
import { getProfileAvatarSrc, PROFILE_AVATARS } from "@/lib/profileAvatars";
import {
  ADMIN_ID,
  DEFAULT_USER_AVATAR_ID,
  clearCurrentUserId,
  deleteUser,
  getCurrentUser,
  listUsers,
  loginUser,
  normalizePasswordInput,
  normalizeUserNameInput,
  registerUser,
  type ProfileAvatarId,
  type UserProfile,
} from "@/lib/userStore";

type AuthMode = "login" | "create";

function isAdminName(name: string) {
  return name.trim().toUpperCase() === ADMIN_ID;
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

function chapterToWorldLevel(chapter: number) {
  if (chapter <= 4) return { world: 1, level: chapter };
  if (chapter <= 8) return { world: 2, level: chapter - 4 };
  return { world: 3, level: Math.max(1, Math.min(3, chapter - 8)) };
}

export default function UserSelectPage() {
  const router = useRouter();

  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatarId, setAvatarId] = useState<ProfileAvatarId>(DEFAULT_USER_AVATAR_ID);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [me, setMe] = useState<UserProfile | null>(null);
  const [adminUsers, setAdminUsers] = useState<UserProfile[]>([]);
  const [adminUsersLoading, setAdminUsersLoading] = useState(false);
  const [adminUsersError, setAdminUsersError] = useState<string | null>(null);

  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminSubmitting, setAdminSubmitting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<UserProfile | null>(null);
  const [deleteConfirmName, setDeleteConfirmName] = useState("");
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  useEffect(() => {
    let alive = true;
    getCurrentUser()
      .then((u) => {
        if (alive) setMe(u);
      })
      .catch(() => {
        if (alive) setMe(null);
      });

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!me?.isAdmin) {
      setAdminUsers([]);
      setAdminUsersError(null);
      setAdminUsersLoading(false);
      return;
    }

    let alive = true;
    setAdminUsersLoading(true);
    setAdminUsersError(null);

    listUsers()
      .then((users) => {
        if (alive) setAdminUsers(users);
      })
      .catch((error: unknown) => {
        if (alive) setAdminUsersError(getErrorMessage(error, "Could not load users."));
      })
      .finally(() => {
        if (alive) setAdminUsersLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [me?.isAdmin]);

  const cleanName = useMemo(() => normalizeUserNameInput(name).trim(), [name]);
  const cleanPassword = useMemo(() => normalizePasswordInput(password), [password]);
  const worldLevel = useMemo(() => {
    if (!me) return { world: "-", level: "-" };
    return chapterToWorldLevel(me.progress.chapter);
  }, [me]);
  const progressPct = useMemo(() => {
    if (!me) return 0;
    if (me.isAdmin) return 100;
    const chapter = Math.max(1, Math.min(11, Number(me.progress.chapter) || 1));
    return Math.round((chapter / 11) * 100);
  }, [me]);
  const semiWidePlankStyle = { backgroundImage: "url('/assets/borders/woodplanksemiwide.webp')" };
  const longPlankStyle = { backgroundImage: "url('/assets/borders/WoodplankPlainHoriLong.webp')" };
  const shortPlankStyle = { backgroundImage: "url('/assets/borders/WoodplankPlainHoriShort.webp')" };
  const squarePlankStyle = { backgroundImage: "url('/assets/borders/woodplanksquare.webp')" };

  function setNameInput(v: string) {
    setName(normalizeUserNameInput(v));
  }

  function setPasswordInput(v: string) {
    setPassword(normalizePasswordInput(v));
  }

  async function handleAuthSubmit() {
    setErr(null);

    if (!cleanName) {
      setErr("Please enter a username.");
      return;
    }

    if (mode === "create") {
      if (!cleanPassword) {
        setErr("Please enter a password.");
        return;
      }

      if (isAdminName(cleanName)) {
        setErr("Admin account already exists. Please log in.");
        return;
      }

      try {
        setSubmitting(true);
        const user = await registerUser(cleanName, cleanPassword, avatarId);
        setMe(user);
        setPassword("");
        router.push("/map");
      } catch (error: unknown) {
        setErr(getErrorMessage(error, "Could not create account."));
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (isAdminName(cleanName)) {
      setAdminPassword("");
      setAdminError(null);
      setAdminModalOpen(true);
      return;
    }

    if (!cleanPassword) {
      setErr("Please enter your password.");
      return;
    }

    try {
      setSubmitting(true);
      const user = await loginUser(cleanName, cleanPassword);
      setMe(user);
      setPassword("");
      router.push("/map");
    } catch (error: unknown) {
      setErr(getErrorMessage(error, "Login failed."));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleAdminLogin() {
    setAdminError(null);
    if (!adminPassword) {
      setAdminError("Enter the admin password.");
      return;
    }

    try {
      setAdminSubmitting(true);
      const user = await loginUser(ADMIN_ID, adminPassword);
      setMe(user);
      setAdminPassword("");
      setAdminModalOpen(false);
      router.push("/map");
    } catch (error: unknown) {
      setAdminError(getErrorMessage(error, "Wrong admin password."));
    } finally {
      setAdminSubmitting(false);
    }
  }

  async function handleSwitchUser() {
    await clearCurrentUserId();
    setMe(null);
    setAdminUsers([]);
    setDeleteTarget(null);
    setDeleteModalOpen(false);
    setDeleteConfirmName("");
    setDeleteError(null);
    setErr(null);
    setAdminError(null);
  }

  async function handleDeleteMyAccount() {
    if (!me) return;
    if (me.isAdmin) {
      setErr("Admin account cannot be deleted.");
      return;
    }

    const ok = window.confirm(`Delete account "${me.name}"? This cannot be undone.`);
    if (!ok) return;

    try {
      setSubmitting(true);
      await deleteUser(me.id);
      await clearCurrentUserId();
      setMe(null);
      setName("");
      setPassword("");
      setMode("create");
      setErr(null);
      setAdminError(null);
    } catch (error: unknown) {
      setErr(getErrorMessage(error, "Could not delete account."));
    } finally {
      setSubmitting(false);
    }
  }

  function openDeleteUserModal(user: UserProfile) {
    if (!me?.isAdmin) return;
    setDeleteTarget(user);
    setDeleteConfirmName("");
    setDeleteError(null);
    setDeleteModalOpen(true);
  }

  function closeDeleteUserModal() {
    if (deleteSubmitting) return;
    setDeleteModalOpen(false);
    setDeleteTarget(null);
    setDeleteConfirmName("");
    setDeleteError(null);
  }

  async function handleAdminDeleteUser() {
    if (!me?.isAdmin) {
      setDeleteError("Admin only.");
      return;
    }
    if (!deleteTarget) {
      setDeleteError("No user selected.");
      return;
    }
    if (deleteTarget.id === ADMIN_ID) {
      setDeleteError("Admin account cannot be deleted.");
      return;
    }

    const typedName = normalizeUserNameInput(deleteConfirmName).trim().toUpperCase();
    const expectedName = deleteTarget.name.trim().toUpperCase();
    if (typedName !== expectedName) {
      setDeleteError(`Type "${deleteTarget.name}" to confirm delete.`);
      return;
    }

    try {
      setDeleteSubmitting(true);
      await deleteUser(deleteTarget.id);
      const users = await listUsers();
      setAdminUsers(users);
      setDeleteModalOpen(false);
      setDeleteTarget(null);
      setDeleteConfirmName("");
      setDeleteError(null);
    } catch (error: unknown) {
      setDeleteError(getErrorMessage(error, "Could not delete account."));
    } finally {
      setDeleteSubmitting(false);
    }
  }

  const isActionDisabled = submitting || !cleanName || (mode === "create" && !cleanPassword);

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-cover bg-center app-page-pad text-[#fbf7e8]"
      style={{ backgroundImage: "url('/assets/backgrounds/mainpagebackground.jpg')" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(13,54,27,0.88)_0%,rgba(22,71,33,0.84)_58%,rgba(57,92,39,0.8)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20 [background:repeating-linear-gradient(0deg,rgba(0,0,0,0.12)_0px,rgba(0,0,0,0.12)_1px,transparent_2px,transparent_4px)]" />
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#b8d973]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-8 h-64 w-64 rounded-full bg-[#ffd447]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#8ac25a]/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="flex flex-col items-start justify-between gap-3 phone-lg:flex-row phone-lg:gap-4">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#f6f3d8]/75">Learn Malay</p>
            <h1 className="crash-text crash-outline-fallback mt-2 text-4xl font-black leading-none phone-lg:text-5xl md:text-6xl">
              PLAYER LOGIN
            </h1>
            <p className="mt-3 max-w-xl text-sm font-semibold text-[#f2edd4]/90">
              Sign in if you already have an account, or create a new one to start learning.
            </p>
          </div>

          <IconActionLink href="/" kind="home" tooltip="Back to Home" iconClassName="brightness-0 invert" />
        </div>

        <div className="mt-6 grid gap-4 phone-lg:gap-6 lg:grid-cols-[1.12fr_0.88fr]">
          <section className="text-[#2a1708]">
            <div
              className="mx-auto w-full bg-[length:100%_100%] bg-center bg-no-repeat px-0 py-6"
              style={semiWidePlankStyle}
            >
              <div className="mx-auto w-[92%] px-1 pb-4 phone-lg:w-[86%] phone-lg:px-2 sm:w-[82%] sm:px-3">
                <div className="flex justify-center">
                  <div className="inline-flex rounded-2xl border border-[#8f5e31]/45 bg-[#f4d6a1]/90 p-1">
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setErr(null);
                      }}
                      className={[
                        "touch-target rounded-xl px-4 py-2 text-sm font-black transition",
                        mode === "login"
                          ? "bg-gradient-to-r from-[#65d36d] via-[#3db85a] to-[#2b9448] text-[#f3ffe9] shadow-[0_4px_10px_rgba(22,91,42,0.35)]"
                          : "text-[#4a2f15]/85 hover:text-[#2f1909]",
                      ].join(" ")}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMode("create");
                        setErr(null);
                      }}
                      className={[
                        "touch-target rounded-xl px-4 py-2 text-sm font-black transition",
                        mode === "create"
                          ? "bg-gradient-to-r from-[#65d36d] via-[#3db85a] to-[#2b9448] text-[#f3ffe9] shadow-[0_4px_10px_rgba(22,91,42,0.35)]"
                          : "text-[#4a2f15]/85 hover:text-[#2f1909]",
                      ].join(" ")}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  <label className="grid gap-2">
                    <span className="text-xs font-black uppercase text-center tracking-wide text-[#000000]/85">Username</span>
                    <input
                      value={name}
                      onChange={(e) => setNameInput(e.target.value)}
                      autoComplete="username"
                      className="w-full rounded-2xl border border-[#9d6e44]/70 bg-[#fff8e7] px-4 py-3 text-sm font-bold text-[#2d1c0d] outline-none placeholder:text-[#91745a] focus:border-[#d28f45]"
                      placeholder="Enter your username"
                      maxLength={32}
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-xs font-black text-center uppercase tracking-wide text-[#000000]/85">
                      Password {mode === "login" && isAdminName(cleanName) ? "(admin popup)" : ""}
                    </span>
                    <input
                      value={password}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      autoComplete={mode === "login" ? "current-password" : "new-password"}
                      type="password"
                      className="w-full rounded-2xl border border-[#9d6e44]/70 bg-[#fff8e7] px-4 py-3 text-sm font-bold text-[#2d1c0d] outline-none placeholder:text-[#91745a] focus:border-[#d28f45]"
                      placeholder={mode === "create" ? "Set any password" : "Enter your password"}
                      maxLength={256}
                    />
                  </label>

                  {mode === "create" && (
                    <div className="grid gap-2">
                      <span className="text-xs font-black uppercase tracking-wide text-[#533417]/85">
                        Choose Your Icon
                      </span>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                        {PROFILE_AVATARS.map((avatar) => {
                          const selected = avatar.id === avatarId;
                          return (
                            <button
                              key={avatar.id}
                              type="button"
                              onClick={() => setAvatarId(avatar.id)}
                              className={[
                                "rounded-2xl border p-2 transition",
                                selected
                                  ? "border-[#b3743c] bg-[#ffe2b6]"
                                  : "border-[#a5774f]/65 bg-[#fff8e7] hover:border-[#b3743c]",
                              ].join(" ")}
                              title={avatar.label}
                            >
                              <Image
                                src={avatar.src}
                                alt={avatar.label}
                                width={56}
                                height={56}
                                className="mx-auto h-12 w-12 rounded-full object-cover"
                              />
                              <div className="mt-1 text-center text-[11px] font-black text-[#3e230c]">
                                {avatar.label}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {err && (
                  <div className="mt-4 rounded-2xl border border-rose-300/70 bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-900">
                    {err}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleAuthSubmit}
                  disabled={isActionDisabled}
                  className="touch-target mt-4 w-full rounded-2xl bg-gradient-to-r from-[#65d36d] via-[#3db85a] to-[#2b9448] px-5 py-3 text-sm font-black text-[#f3ffe9] shadow-lg transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
                </button>
              </div>
            </div>
          </section>

          <section className="space-y-3 phone-lg:space-y-4">
            <div
              className="relative overflow-hidden rounded-2xl bg-[length:105%_100%] bg-center bg-no-repeat px-4 py-4 text-[#2a1708] shadow-lg"
              style={longPlankStyle}
            >
              <div className="flex flex-col items-start gap-3 phone-lg:flex-row phone-lg:items-center">
                <div className="h-[68px] w-[68px] shrink-0 rounded-full bg-[#fff8e8]/95 p-[10px] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.65),0_6px_14px_rgba(0,0,0,0.2)] phone-lg:h-[76px] phone-lg:w-[76px]">
                  <Image
                    src={getProfileAvatarSrc(me?.avatarId ?? DEFAULT_USER_AVATAR_ID)}
                    alt={me ? `${me.name} avatar` : "Default avatar"}
                    width={56}
                    height={56}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#633f1f]/80">Active User</div>
                  <div className="mt-0.5 truncate text-xl font-black text-[#2c1808] phone-lg:text-2xl">
                    {me ? me.name : "NO ACTIVE USER"}
                    {me?.isAdmin ? <span className="ml-2 text-sm text-[#7c2f1d]">ADMIN</span> : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 phone-lg:grid-cols-[1fr_auto]">
              <div
                className="relative overflow-hidden rounded-xl bg-[length:100%_108%] bg-center bg-no-repeat px-3 py-2 text-[#2a1708] shadow-lg"
                style={shortPlankStyle}
              >
                <div className="flex min-h-[110px] flex-wrap items-center justify-evenly gap-3">
                  <div className="text-center">
                    <div className="text-[15px] font-black uppercase tracking-[0.16em] text-[#633f1f]/80">World</div>
                    <div className="text-3xl font-black leading-none text-[#2c1808] phone-lg:text-4xl">{worldLevel.world}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[15px] font-black uppercase tracking-[0.16em] text-[#633f1f]/80">Level</div>
                    <div className="text-3xl font-black leading-none text-[#2c1808] phone-lg:text-4xl">{worldLevel.level}</div>
                  </div>
                </div>
              </div>
              <div
                className="relative overflow-hidden rounded-xl bg-[length:100%_100%] bg-center bg-no-repeat px-2 py-2 text-[#2a1708] shadow-lg"
                style={squarePlankStyle}
              >
                <div className="flex min-h-[110px] w-full flex-col items-center justify-center text-center phone-lg:w-[110px] sm:min-h-[120px] sm:w-[120px]">
                  <div className="text-[10px] font-black uppercase tracking-[0.14em] text-[#7a4d27]/85">Progress</div>
                  <div className="mt-1 text-4xl font-black leading-none text-[#2c1808]">{progressPct}%</div>
                </div>
              </div>
            </div>

            {me ? (
              <div className="flex flex-col gap-2 phone-lg:flex-row phone-lg:flex-wrap">
                <Link
                  href="/map"
                  className="touch-target w-full rounded-xl bg-[#f3b14f] px-4 py-2 text-sm font-black text-[#3f230a] phone-lg:w-auto"
                >
                  Continue
                </Link>
                <button
                  type="button"
                  onClick={handleSwitchUser}
                  className="touch-target w-full rounded-xl border border-[#d1b48d]/65 bg-[#4b3220] px-4 py-2 text-sm font-black text-[#f9edd7] phone-lg:w-auto"
                >
                  Switch User
                </button>
                <button
                  type="button"
                  onClick={handleDeleteMyAccount}
                  disabled={submitting || Boolean(me.isAdmin)}
                  className="touch-target w-full rounded-xl border border-rose-300/60 bg-rose-100 px-4 py-2 text-sm font-black text-rose-900 disabled:cursor-not-allowed disabled:opacity-50 phone-lg:w-auto"
                >
                  Delete My Account
                </button>
                {me.isAdmin && (
                  <div className="basis-full text-xs font-semibold text-[#f7ebd4]/95">
                    Admin account cannot be deleted.
                  </div>
                )}
              </div>
            ) : null}

            {!me?.isAdmin && (
              <div className="text-xs font-semibold text-[#f2e3c8]">
                Enter your username and password to login, or create a new account.
              </div>
            )}

            {me?.isAdmin && (
              <div className="pt-2">
                <div className="text-xs font-black uppercase tracking-[0.25em] text-[#ffd59c]/90">Manage Users</div>
                <p className="mt-1 text-xs font-semibold text-[#f2e3c8]/95">
                  Admin view of all accounts. Passwords are hidden and never shown.
                </p>

                {adminUsersLoading && (
                  <div className="mt-3 text-sm font-semibold text-[#f2e3c8]/90">Loading users...</div>
                )}

                {adminUsersError && (
                  <div className="mt-3 rounded-xl border border-rose-300/70 bg-rose-100 px-3 py-2 text-sm font-semibold text-rose-900">
                    {adminUsersError}
                  </div>
                )}

                {!adminUsersLoading && !adminUsersError && (
                  <div className="mt-3 grid gap-2">
                    {adminUsers.map((u) => {
                      const isAccountAdmin = u.id === ADMIN_ID || Boolean(u.isAdmin);
                      return (
                        <div
                          key={u.id}
                          className="flex flex-col items-stretch justify-between gap-3 rounded-xl border border-[#c39a6d]/55 bg-[#4a321f] px-3 py-3 phone-lg:flex-row phone-lg:items-center"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <Image
                              src={getProfileAvatarSrc(u.avatarId)}
                              alt={`${u.name} avatar`}
                              width={36}
                              height={36}
                              className="h-9 w-9 rounded-full border border-[#d6b186]/55 bg-white/95 object-cover"
                            />
                            <div className="min-w-0">
                              <div className="truncate text-sm font-black text-[#fff1d6]">
                                {u.name}
                                {isAccountAdmin && (
                                  <span className="ml-2 rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-black text-rose-900">
                                    ADMIN
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] font-semibold text-[#edd9ba]/85">
                                Chapter {u.progress.chapter} • Password hidden
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => openDeleteUserModal(u)}
                            disabled={isAccountAdmin || deleteSubmitting}
                            className="touch-target w-full rounded-lg border border-rose-300/60 bg-rose-100 px-3 py-1.5 text-xs font-black text-rose-900 disabled:cursor-not-allowed disabled:opacity-50 phone-lg:w-auto"
                          >
                            Delete
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>

      {adminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            type="button"
            onClick={() => {
              if (adminSubmitting) return;
              setAdminModalOpen(false);
              setAdminPassword("");
              setAdminError(null);
            }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close admin password popup"
          />

          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#c5dd9e]/40 bg-[#1f4320] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#b7dd5f]/35 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-14 -left-8 h-32 w-32 rounded-full bg-[#ffd447]/25 blur-2xl" />

            <div className="relative">
              <div className="text-xs font-black uppercase tracking-[0.25em] text-[#e9f2d3]/80">Admin Auth</div>
              <h2 className="mt-2 text-2xl font-black text-[#fff9df]">Admin password required</h2>
              <p className="mt-2 text-sm font-semibold text-[#edf6db]/85">
                Enter the admin password to sign in as <span className="font-black">ADMIN</span>.
              </p>

              <input
                autoFocus
                type="password"
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(normalizePasswordInput(e.target.value));
                  setAdminError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAdminLogin();
                  if (e.key === "Escape" && !adminSubmitting) setAdminModalOpen(false);
                }}
                className="mt-5 w-full rounded-2xl border border-[#b9d598]/55 bg-[#f8f5dd] px-4 py-3 text-sm font-bold text-[#1f3519] outline-none placeholder:text-[#6f8662] focus:border-[#ffd447]"
                placeholder="Admin password"
                autoComplete="current-password"
              />

              {adminError && (
                <div className="mt-3 rounded-2xl border border-rose-300/70 bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-900">
                  {adminError}
                </div>
              )}

              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (adminSubmitting) return;
                    setAdminModalOpen(false);
                    setAdminPassword("");
                    setAdminError(null);
                  }}
                  className="rounded-xl border border-[#b9d598]/55 bg-[#355d2f]/85 px-4 py-2 text-xs font-black text-[#f9f5dc]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAdminLogin}
                  disabled={adminSubmitting}
                  className="rounded-xl bg-gradient-to-r from-[#ffd447] via-[#ffca3e] to-[#f6b835] px-4 py-2 text-xs font-black text-[#3f2e00] disabled:opacity-50"
                >
                  {adminSubmitting ? "Checking..." : "Login as Admin"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteModalOpen && deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            type="button"
            onClick={closeDeleteUserModal}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close delete confirmation popup"
          />

          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#e6c35f]/45 bg-[#3f2a0d] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#ffe083]/25 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-14 -left-8 h-32 w-32 rounded-full bg-[#9bcf62]/25 blur-2xl" />

            <div className="relative">
              <div className="text-xs font-black uppercase tracking-[0.25em] text-[#f7e6b4]/90">Delete User</div>
              <h2 className="mt-2 text-2xl font-black text-[#fff6db]">Confirm account deletion</h2>
              <p className="mt-2 text-sm font-semibold text-[#faebc6]/85">
                Type <span className="font-black">{deleteTarget.name}</span> to confirm. This cannot be undone.
              </p>

              <input
                autoFocus
                value={deleteConfirmName}
                onChange={(e) => {
                  setDeleteConfirmName(normalizeUserNameInput(e.target.value));
                  setDeleteError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") void handleAdminDeleteUser();
                  if (e.key === "Escape") closeDeleteUserModal();
                }}
                className="mt-5 w-full rounded-2xl border border-[#f2d07a]/55 bg-[#fff5d8] px-4 py-3 text-sm font-bold text-[#3f2c00] outline-none placeholder:text-[#9b8154] focus:border-[#ffd447]"
                placeholder={`Type ${deleteTarget.name}`}
                maxLength={32}
              />

              {deleteError && (
                <div className="mt-3 rounded-2xl border border-rose-300/70 bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-900">
                  {deleteError}
                </div>
              )}

              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeDeleteUserModal}
                  className="rounded-xl border border-[#f0d495]/65 bg-[#5f401a]/80 px-4 py-2 text-xs font-black text-[#fff6db]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => void handleAdminDeleteUser()}
                  disabled={deleteSubmitting}
                  className="rounded-xl bg-rose-200 px-4 py-2 text-xs font-black text-rose-900 disabled:opacity-50"
                >
                  {deleteSubmitting ? "Deleting..." : "Delete User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
