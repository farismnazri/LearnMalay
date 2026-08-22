"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { AdminUserSummary } from "@/lib/adminAnalyticsTypes";
import { getProfileAvatarSrc } from "@/lib/profileAvatars";

type SortKey = "username" | "role" | "joinedAt" | "lastActiveAt" | "chaptersCompleted" | "minigamePlays" | "highscoreEntries";
type SortDirection = "asc" | "desc";
type RoleFilter = "all" | AdminUserSummary["role"];
type ProgressFilter = "all" | "not-started" | "in-progress" | "completed-all";
type MinigameFilter = "all" | "played" | "never-played";
type ActivityFilter = "all" | "today" | "last-7-days" | "none";

const COLUMNS: Array<{ key: SortKey; label: string }> = [
  { key: "username", label: "User" },
  { key: "role", label: "Role" },
  { key: "joinedAt", label: "Joined" },
  { key: "lastActiveAt", label: "Last active" },
  { key: "chaptersCompleted", label: "Chapters" },
  { key: "minigamePlays", label: "Minigame plays" },
  { key: "highscoreEntries", label: "Highscores" },
];

function formatDate(value: string | null) {
  if (!value) return "Unavailable";
  return new Intl.DateTimeFormat("en-MY", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function RoleBadge({ role }: { role: AdminUserSummary["role"] }) {
  const colors = role === "admin"
    ? "border-rose-300 bg-rose-100 text-rose-900"
    : role === "demo"
      ? "border-amber-300 bg-amber-100 text-amber-900"
      : "border-emerald-300 bg-emerald-100 text-emerald-900";
  return <span className={`rounded-full border px-2 py-1 text-[10px] font-black uppercase ${colors}`}>{role}</span>;
}

function dateMs(value: string | null) {
  if (!value) return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function hasRecordedMinigameActivity(user: AdminUserSummary) {
  return user.minigamePlays > 0 || user.highscoreEntries > 0;
}

export default function AdminUsersTable({ users }: { users: AdminUserSummary[] }) {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<RoleFilter>("all");
  const [progress, setProgress] = useState<ProgressFilter>("all");
  const [minigame, setMinigame] = useState<MinigameFilter>("all");
  const [activity, setActivity] = useState<ActivityFilter>("all");
  const [sort, setSort] = useState<{ key: SortKey; direction: SortDirection } | null>(null);

  const filteredUsers = useMemo(() => {
    const needle = search.trim().toLocaleLowerCase();
    const now = Date.now();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

    const matches = users.filter((user) => {
      if (needle && !user.username.toLocaleLowerCase().includes(needle)) return false;
      if (role !== "all" && user.role !== role) return false;
      if (progress === "not-started" && user.chaptersCompleted !== 0) return false;
      if (progress === "in-progress" && (user.chaptersCompleted === 0 || user.chaptersCompleted >= user.totalChapters)) return false;
      if (progress === "completed-all" && user.chaptersCompleted < user.totalChapters) return false;

      const played = hasRecordedMinigameActivity(user);
      if (minigame === "played" && !played) return false;
      if (minigame === "never-played" && played) return false;

      const activeAt = dateMs(user.lastActiveAt);
      if (activity === "none" && activeAt !== null) return false;
      if (activity === "today" && (activeAt === null || activeAt < todayStart.getTime())) return false;
      if (activity === "last-7-days" && (activeAt === null || activeAt < sevenDaysAgo)) return false;
      return true;
    });

    if (!sort) return matches;
    return [...matches].sort((left, right) => {
      const direction = sort.direction === "asc" ? 1 : -1;
      if (sort.key === "username" || sort.key === "role") {
        const value = left[sort.key].localeCompare(right[sort.key]);
        return value === 0 ? left.username.localeCompare(right.username) : value * direction;
      }
      if (sort.key === "joinedAt" || sort.key === "lastActiveAt") {
        const leftValue = dateMs(left[sort.key]);
        const rightValue = dateMs(right[sort.key]);
        if (leftValue === null) return rightValue === null ? left.username.localeCompare(right.username) : 1;
        if (rightValue === null) return -1;
        const value = leftValue - rightValue;
        return value === 0 ? left.username.localeCompare(right.username) : value * direction;
      }
      const value = left[sort.key] - right[sort.key];
      return value === 0 ? left.username.localeCompare(right.username) : value * direction;
    });
  }, [activity, minigame, progress, role, search, sort, users]);

  const filtersActive = Boolean(search || role !== "all" || progress !== "all" || minigame !== "all" || activity !== "all");

  function toggleSort(key: SortKey) {
    setSort((current) => current?.key === key
      ? { key, direction: current.direction === "asc" ? "desc" : "asc" }
      : { key, direction: "asc" });
  }

  function clearFilters() {
    setSearch("");
    setRole("all");
    setProgress("all");
    setMinigame("all");
    setActivity("all");
  }

  return (
    <>
      <section className="admin-panel mt-6 rounded-2xl p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="admin-user-search">Search by username</label>
          <input
            id="admin-user-search"
            value={search}
            onChange={(event) => setSearch(event.target.value.slice(0, 64))}
            placeholder="Search username…"
            maxLength={64}
            className="min-h-11 flex-1 rounded-xl border border-[#d4e2b8]/30 bg-[#091b12]/80 px-4 text-sm font-bold text-white outline-none placeholder:text-white/35 focus:border-[#f0cc67]"
          />
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect label="Role" value={role} onChange={(value) => setRole(value as RoleFilter)} options={[["all", "All roles"], ["user", "User"], ["demo", "Demo"], ["admin", "Admin"]]} />
          <FilterSelect label="Chapter progress" value={progress} onChange={(value) => setProgress(value as ProgressFilter)} options={[["all", "All"], ["not-started", "Not started"], ["in-progress", "In progress"], ["completed-all", "Completed all"]]} />
          <FilterSelect label="Minigame activity" value={minigame} onChange={(value) => setMinigame(value as MinigameFilter)} options={[["all", "All"], ["played", "Played minigames"], ["never-played", "Never played"]]} />
          <FilterSelect label="Activity" value={activity} onChange={(value) => setActivity(value as ActivityFilter)} options={[["all", "All"], ["today", "Active today"], ["last-7-days", "Active in last 7 days"], ["none", "No recorded activity"]]} />
        </div>
      </section>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-semibold text-[#dce9c7]/70">
        <span>{filteredUsers.length} of {users.length} account{users.length === 1 ? "" : "s"}</span>
        {filtersActive && <button type="button" onClick={clearFilters} className="rounded-lg border border-[#dce9c7]/30 px-3 py-1 text-xs font-black text-[#f7e8aa] hover:bg-white/10">Clear filters</button>}
      </div>

      <section className="mt-4 space-y-3 tablet:hidden">
        {filteredUsers.map((user) => <UserCard key={user.id} user={user} />)}
        {filteredUsers.length === 0 && <EmptyState />}
      </section>

      <section className="admin-light-panel mt-4 hidden overflow-x-auto rounded-3xl tablet:block">
        <table className="w-full min-w-[1050px] border-collapse text-left text-sm">
          <thead className="bg-[#f0cc65] text-[#443200]">
            <tr>
              {COLUMNS.map((column) => {
                const isActive = sort?.key === column.key;
                return (
                  <th key={column.key} className="border-b border-black/15 p-0 text-xs font-black uppercase tracking-wide">
                    <button type="button" onClick={() => toggleSort(column.key)} className="flex w-full cursor-pointer items-center gap-1 px-4 py-3 text-left hover:bg-[#ffe386] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#4b3500]">
                      <span>{column.label}</span>
                      <span className={isActive ? "text-base leading-none" : "text-xs opacity-45"} aria-hidden="true">{isActive ? (sort.direction === "asc" ? "↑" : "↓") : "↕"}</span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => <UserRow key={user.id} user={user} />)}
          </tbody>
        </table>
        {filteredUsers.length === 0 && <EmptyState />}
      </section>
    </>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Array<[string, string]> }) {
  return (
    <label className="min-w-0 text-xs font-black uppercase tracking-wide text-[#dce9c7]/70">
      <span className="mb-1 block">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="min-h-10 w-full rounded-xl border border-[#d4e2b8]/30 bg-[#091b12]/80 px-3 text-sm font-bold normal-case tracking-normal text-white outline-none focus:border-[#f0cc67]">
        {options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}
      </select>
    </label>
  );
}

function UserCard({ user }: { user: AdminUserSummary }) {
  return (
    <Link href={`/admin/users/${encodeURIComponent(user.id)}`} className="admin-light-panel block rounded-2xl p-4 transition hover:-translate-y-0.5">
      <div className="flex items-center gap-3">
        <Image src={getProfileAvatarSrc(user.avatarId)} alt="" width={44} height={44} className="h-11 w-11 rounded-full border border-black/10 bg-white object-cover" />
        <div className="min-w-0 flex-1"><div className="truncate font-black">{user.username}</div><div className="mt-1"><RoleBadge role={user.role} /></div></div>
        <span className="text-xl font-black">→</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-bold">
        <div><span className="opacity-55">Joined</span><br />{formatDate(user.joinedAt)}</div>
        <div><span className="opacity-55">Last active</span><br />{formatDate(user.lastActiveAt)}</div>
        <div>{user.chaptersCompleted}/{user.totalChapters} chapters</div>
        <div>{user.minigamePlays} plays · {user.highscoreEntries} scores</div>
      </div>
    </Link>
  );
}

function UserRow({ user }: { user: AdminUserSummary }) {
  return (
    <tr className="border-b border-[#cabe86]/40 last:border-0 hover:bg-[#fff0b7]/55">
      <td className="px-4 py-3"><Link href={`/admin/users/${encodeURIComponent(user.id)}`} className="flex items-center gap-3 font-black hover:underline"><Image src={getProfileAvatarSrc(user.avatarId)} alt="" width={38} height={38} className="h-9 w-9 rounded-full border border-black/10 bg-white object-cover" />{user.username}</Link></td>
      <td className="px-4 py-3"><RoleBadge role={user.role} /></td>
      <td className="px-4 py-3 font-semibold">{formatDate(user.joinedAt)}</td>
      <td className="px-4 py-3 font-semibold">{formatDate(user.lastActiveAt)}</td>
      <td className="px-4 py-3 font-black">{user.chaptersCompleted} / {user.totalChapters}</td>
      <td className="px-4 py-3 font-black">{user.minigamePlays}</td>
      <td className="px-4 py-3 font-black">{user.highscoreEntries}</td>
    </tr>
  );
}

function EmptyState() {
  return <div className="p-8 text-center font-bold opacity-60">No accounts match these filters.</div>;
}
