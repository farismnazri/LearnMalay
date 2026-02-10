"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
      className="relative min-h-screen overflow-hidden bg-cover bg-center px-6 py-10 text-[#fbf7e8]"
      style={{ backgroundImage: "url('/assets/backgrounds/mainpagebackground.jpg')" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(13,54,27,0.88)_0%,rgba(22,71,33,0.84)_58%,rgba(57,92,39,0.8)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20 [background:repeating-linear-gradient(0deg,rgba(0,0,0,0.12)_0px,rgba(0,0,0,0.12)_1px,transparent_2px,transparent_4px)]" />
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#b8d973]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-8 h-64 w-64 rounded-full bg-[#ffd447]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#8ac25a]/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#f6f3d8]/75">Learn Malay</p>
            <h1 className="crash-text crash-outline-fallback mt-2 text-5xl font-black leading-none md:text-6xl">
              PLAYER LOGIN
            </h1>
            <p className="mt-3 max-w-xl text-sm font-semibold text-[#f2edd4]/90">
              Sign in if you already have an account, or create a new one to start learning.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-[#d4e4b7]/45 bg-[#35592d]/65 px-4 py-2 text-sm font-bold text-[#fdf8dd] backdrop-blur transition hover:bg-[#457239]/80"
          >
            Back
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-[#c6d9a5]/45 bg-[#f6f2dc]/92 p-6 text-[#244120] shadow-2xl backdrop-blur-xl">
            <div className="inline-flex rounded-2xl bg-[#2e572a]/15 p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErr(null);
                }}
                className={[
                  "rounded-xl px-4 py-2 text-sm font-black transition",
                  mode === "login"
                    ? "bg-[#ffd84a] text-[#3f3100]"
                    : "text-[#2d4b24]/85 hover:text-[#203817]",
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
                  "rounded-xl px-4 py-2 text-sm font-black transition",
                  mode === "create"
                    ? "bg-[#ffbf3f] text-[#3f2a00]"
                    : "text-[#2d4b24]/85 hover:text-[#203817]",
                ].join(" ")}
              >
                Create Account
              </button>
            </div>

            <div className="mt-5 grid gap-4">
              <label className="grid gap-2">
                <span className="text-xs font-black uppercase tracking-wide text-[#355a2d]/85">Username</span>
                <input
                  value={name}
                  onChange={(e) => setNameInput(e.target.value)}
                  autoComplete="username"
                  className="w-full rounded-2xl border border-[#c8dcae] bg-[#fffdea] px-4 py-3 text-sm font-bold text-[#1f3519] outline-none placeholder:text-[#6f8662] focus:border-[#7dbb4c]"
                  placeholder="Enter your username"
                  maxLength={32}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-black uppercase tracking-wide text-[#355a2d]/85">
                  Password {mode === "login" && isAdminName(cleanName) ? "(admin popup)" : ""}
                </span>
                <input
                  value={password}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  type="password"
                  className="w-full rounded-2xl border border-[#c8dcae] bg-[#fffdea] px-4 py-3 text-sm font-bold text-[#1f3519] outline-none placeholder:text-[#6f8662] focus:border-[#7dbb4c]"
                  placeholder={mode === "create" ? "Set any password" : "Enter your password"}
                  maxLength={256}
                />
              </label>

              {mode === "create" && (
                <div className="grid gap-2">
                  <span className="text-xs font-black uppercase tracking-wide text-[#355a2d]/85">
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
                              ? "border-[#ffc83d] bg-[#ffefab]"
                              : "border-[#c8dcae] bg-[#fffdea] hover:border-[#9bc46d]",
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
                          <div className="mt-1 text-center text-[11px] font-black text-[#2d4b24]">
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
              className="mt-5 w-full rounded-2xl bg-gradient-to-r from-[#ffd447] via-[#ffca3e] to-[#f6b835] px-5 py-3 text-sm font-black text-[#3f2c00] shadow-lg transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
            </button>
          </section>

          <section className="rounded-3xl border border-[#98be6f]/55 bg-[#244722]/80 p-6 shadow-2xl backdrop-blur-xl">
            <div className="text-xs font-black uppercase tracking-[0.25em] text-[#ffe590]/90">Status</div>
            {me ? (
              <div className="mt-3">
                <div className="flex items-center gap-3">
                  <Image
                    src={getProfileAvatarSrc(me.avatarId)}
                    alt={`${me.name} avatar`}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full border border-[#b6d496]/50 bg-white/95 object-cover"
                  />
                  <div className="text-lg font-black text-[#fff9df]">Signed in as {me.name}</div>
                </div>
                <div className="mt-1 text-sm font-semibold text-[#e4efcf]/90">
                  Chapter {me.progress.chapter}
                  {me.isAdmin ? " • ADMIN" : ""}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href="/map"
                    className="rounded-xl bg-[#ffd447] px-4 py-2 text-sm font-black text-[#3f2e00]"
                  >
                    Continue
                  </Link>
                  <button
                    type="button"
                    onClick={handleSwitchUser}
                    className="rounded-xl border border-[#b4d194]/50 bg-[#3a6132]/80 px-4 py-2 text-sm font-black text-[#f8f4d9]"
                  >
                    Switch User
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteMyAccount}
                    disabled={submitting || Boolean(me.isAdmin)}
                    className="rounded-xl border border-rose-300/60 bg-rose-100/90 px-4 py-2 text-sm font-black text-rose-900 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Delete My Account
                  </button>
                </div>
                {me.isAdmin && (
                  <div className="mt-2 text-xs font-semibold text-[#e4efcf]/90">
                    Admin account cannot be deleted.
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-3 text-sm font-semibold text-[#e4efcf]/90">
                No active session. Login or create an account to continue.
              </div>
            )}

            {!me?.isAdmin && (
              <div className="mt-6 rounded-2xl border border-[#b9d79a]/35 bg-[#355e2f]/70 p-4 text-xs font-semibold text-[#edf6db]/95">
                We no longer show saved user accounts on this page. Enter your username and password to login.
              </div>
            )}

            {me?.isAdmin && (
              <div className="mt-6 rounded-2xl border border-[#b9d79a]/35 bg-[#355e2f]/70 p-4">
                <div className="text-xs font-black uppercase tracking-[0.25em] text-[#ffe590]/90">Manage Users</div>
                <p className="mt-1 text-xs font-semibold text-[#edf6db]/95">
                  Admin view of all accounts. Passwords are hidden and never shown.
                </p>

                {adminUsersLoading && (
                  <div className="mt-3 text-sm font-semibold text-[#edf6db]/90">Loading users...</div>
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
                          className="flex items-center justify-between gap-3 rounded-xl border border-[#b8d69b]/35 bg-[#2d5128]/70 px-3 py-3"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <Image
                              src={getProfileAvatarSrc(u.avatarId)}
                              alt={`${u.name} avatar`}
                              width={36}
                              height={36}
                              className="h-9 w-9 rounded-full border border-[#b6d496]/50 bg-white/95 object-cover"
                            />
                            <div className="min-w-0">
                              <div className="truncate text-sm font-black text-[#fff9df]">
                                {u.name}
                                {isAccountAdmin && (
                                  <span className="ml-2 rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-black text-rose-900">
                                    ADMIN
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] font-semibold text-[#e4efcf]/85">
                                Chapter {u.progress.chapter} • Password hidden
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => openDeleteUserModal(u)}
                            disabled={isAccountAdmin || deleteSubmitting}
                            className="rounded-lg border border-rose-300/60 bg-rose-100/90 px-3 py-1.5 text-xs font-black text-rose-900 disabled:cursor-not-allowed disabled:opacity-50"
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
