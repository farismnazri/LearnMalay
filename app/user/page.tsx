"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  clearCurrentUserId,
  deleteUser,
  getCurrentUserId,
  listUsers,
  setCurrentUserId,
  upsertUser,
  type UserProfile,
} from "@/lib/userStore";

const ADMIN_PASSWORD = "FNNF";

function requireAdminPassword(): boolean {
  const pw = window.prompt("Enter admin password:");
  if (pw !== ADMIN_PASSWORD) {
    window.alert("Incorrect password.");
    return false;
  }
  return true;
}

export default function UserSelectPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [err, setErr] = useState<string | null>(null);

  function refresh() {
    setUsers(listUsers());
    setCurrentId(getCurrentUserId());
  }

  useEffect(() => {
    refresh();
  }, []);

  const hasUsers = useMemo(() => users.length > 0, [users]);

  function handleSelect(id: string) {
    if (id === "ADMIN" && !requireAdminPassword()) return;
    setCurrentUserId(id);
    refresh();
  }

  function handleCreate() {
    setErr(null);

    const clean = name.trim().toUpperCase();
    if (!clean) return;

    if (clean === "ADMIN" && !requireAdminPassword()) {
      setErr("Admin password incorrect.");
      return;
    }

    try {
      const profile = upsertUser(name);
      setCurrentUserId(profile.id);
      setName("");
      refresh();
    } catch (e: any) {
      setErr(e?.message ?? "Could not create user.");
    }
  }

  function handleDelete(id: string) {
    const ok = window.confirm(`Delete user "${id}"? This cannot be undone.`);
    if (!ok) return;

    deleteUser(id);
    refresh();
  }

  function handleClearSelection() {
    clearCurrentUserId();
    refresh();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 to-emerald-100 px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-end justify-between gap-4">
          <h1 className="crash-text crash-outline-fallback text-6xl font-black">
            SELECT USER
          </h1>

          <Link
            href="/"
            className="rounded-xl bg-white/80 px-4 py-2 text-sm font-bold shadow transition hover:scale-[1.01] active:scale-[0.98]"
          >
            Back
          </Link>
        </div>

        <div className="mt-6 rounded-2xl bg-white/80 p-5 shadow">
          <div className="text-sm font-semibold opacity-70">Create New User</div>

          <div className="mt-3 flex gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border px-3 py-2"
              placeholder="Enter name"
            />
            <button
              className="rounded-xl bg-emerald-600 px-4 py-2 font-bold text-white shadow disabled:opacity-50"
              disabled={!name.trim()}
              onClick={handleCreate}
            >
              Create
            </button>
          </div>

          {err && (
            <div className="mt-3 rounded-xl bg-red-100 px-3 py-2 text-sm font-semibold text-red-800">
              {err}
            </div>
          )}
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold opacity-70">
              Saved Users {hasUsers ? `(${users.length})` : ""}
            </div>

            <button
              onClick={handleClearSelection}
              className="rounded-xl bg-white/70 px-3 py-2 text-xs font-bold shadow transition hover:scale-[1.01] active:scale-[0.98]"
              title="Unselect current user"
            >
              Clear Selection
            </button>
          </div>

          <div className="mt-3 grid gap-3">
            {!hasUsers && (
              <div className="rounded-2xl bg-white/60 p-5 text-sm font-semibold opacity-70 shadow">
                No users yet. Create one above.
              </div>
            )}

            {users.map((u) => {
              const isCurrent = u.id === currentId;

              return (
                <div
                  key={u.id}
                  className={`flex items-center justify-between gap-3 rounded-2xl p-4 shadow transition ${
                    isCurrent ? "bg-amber-200" : "bg-white/80"
                  }`}
                >
                  <div>
                    <div className="flex items-center">
                      <div className="text-lg font-extrabold">{u.name}</div>

                      {u.isAdmin && (
                        <span className="ml-2 rounded-full bg-red-600 px-2 py-1 text-xs font-black text-white">
                          ADMIN
                        </span>
                      )}
                    </div>

                    <div className="text-xs opacity-70">
                      Chapter: {u.progress.chapter}
                      {isCurrent ? " • CURRENT" : ""}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSelect(u.id)}
                      className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow transition hover:scale-[1.01] active:scale-[0.98]"
                    >
                      Select
                    </button>

                    <button
                    onClick={() => handleDelete(u.id)}
                    disabled={u.id === "ADMIN"}
                    className="rounded-xl bg-white px-4 py-2 text-sm font-bold shadow transition hover:scale-[1.01] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                    title={u.id === "ADMIN" ? "Admin cannot be deleted" : "Delete user"}
                    >
                    Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}