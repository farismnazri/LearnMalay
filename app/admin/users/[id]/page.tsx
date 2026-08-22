import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProfileAvatarSrc } from "@/lib/profileAvatars";
import { getAdminUserDetail } from "@/server/adminAnalyticsRepo";

function formatDate(value: string | null) {
  if (!value) return "Unavailable";
  return new Intl.DateTimeFormat("en-MY", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getAdminUserDetail(id);
  if (!user) notFound();

  const mostPlayedName = user.minigames.find((game) => game.id === user.mostPlayedMinigameId)?.name ?? "Not available yet";
  const neverPlayedNames = user.minigames.filter((game) => user.gamesNeverPlayed.includes(game.id)).map((game) => game.name);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin/users" className="text-sm font-black text-[#ffda68] hover:underline">← Back to users</Link>

      <section className="admin-panel mt-4 rounded-3xl p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Image src={getProfileAvatarSrc(user.avatarId)} alt={`${user.username} avatar`} width={76} height={76} className="h-16 w-16 rounded-full border-2 border-[#f4ce63] bg-white object-cover shadow-xl sm:h-20 sm:w-20" />
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-[#bad29a]">{user.role} account</div>
              <h1 className="mt-1 text-3xl font-black text-white sm:text-4xl">{user.username}</h1>
              <div className="mt-1 text-xs font-semibold text-white/45">ID: {user.id}</div>
            </div>
          </div>
          <div className="rounded-2xl border border-[#f1d473]/30 bg-[#77591d]/45 px-5 py-3 text-center">
            <div className="text-3xl font-black text-[#ffdc68]">{user.chaptersCompleted} / {user.totalChapters}</div>
            <div className="text-xs font-black uppercase tracking-wide text-[#fff0b5]/70">Chapters completed</div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Joined", formatDate(user.joinedAt)],
          ["Last login", formatDate(user.lastLoginAt)],
          ["Last active", formatDate(user.lastActiveAt)],
          ["Current progress", `Chapter ${user.progress.currentChapter}, page ${user.progress.currentPage}`],
        ].map(([label, value]) => (
          <article key={label} className="admin-light-panel rounded-2xl p-4">
            <div className="text-xs font-black uppercase tracking-wide opacity-55">{label}</div>
            <div className="mt-2 text-base font-black">{value}</div>
          </article>
        ))}
      </section>

      <section className="admin-light-panel mt-6 rounded-3xl p-5 sm:p-6">
        <div>
          <p className="text-xs font-black tracking-[0.16em] text-[#53703f]">LEARNING PROGRESS</p>
          <h2 className="mt-1 text-2xl font-black">Chapter state</h2>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {user.progress.chapters.map((chapter) => (
            <article key={chapter.id} className={`rounded-2xl border p-4 ${chapter.completed ? "border-[#8bb36d] bg-[#edf7d9]" : "border-[#d4ca9d] bg-white/60"}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="font-black">Chapter {chapter.id} · {chapter.name}</div>
                <span className={`rounded-full px-2 py-1 text-[10px] font-black ${chapter.completed ? "bg-[#5b974c] text-white" : "bg-[#d8d1af] text-[#5f593c]"}`}>{chapter.completed ? "DONE" : "OPEN"}</span>
              </div>
              <div className="mt-3 text-xs font-semibold opacity-70">
                Revision: {chapter.completedRevision ?? "—"} / {chapter.currentRevision}
              </div>
              <div className="mt-1 text-xs font-semibold opacity-70">First completion: {formatDate(chapter.firstCompletedAt)}</div>
            </article>
          ))}
        </div>
        <p className="mt-4 text-xs font-semibold opacity-60">Historical completion state is preserved; first-completion dates appear only when a real completion event was recorded.</p>
      </section>

      <section className="admin-light-panel mt-6 rounded-3xl p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black tracking-[0.16em] text-[#53703f]">MINIGAME ACTIVITY</p>
            <h2 className="mt-1 text-2xl font-black">Play and highscore history</h2>
          </div>
          <div className="text-sm font-black">{user.minigamePlays} tracked plays · Most played: {mostPlayedName}</div>
        </div>

        <div className="mt-5 overflow-x-auto rounded-2xl border border-[#cabe86]/60">
          <table className="w-full min-w-[860px] border-collapse text-left text-sm">
            <thead className="bg-[#f0cc65] text-[#443200]">
              <tr>
                {['Minigame', 'Played?', 'Tracked plays', 'Best recorded score', 'Highscores', 'Last played'].map((label) => (
                  <th key={label} className="border-b border-black/15 px-4 py-3 text-xs font-black uppercase tracking-wide">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {user.minigames.map((game) => (
                <tr key={game.id} className="border-b border-[#cabe86]/40 last:border-0">
                  <td className="px-4 py-3 font-black">{game.name}</td>
                  <td className="px-4 py-3 font-black">{game.everPlayed ? "Yes" : "No"}</td>
                  <td className="px-4 py-3 font-black">{game.playCount}</td>
                  <td className="px-4 py-3 font-semibold">{game.bestRecordedScore ?? "Unavailable"}</td>
                  <td className="px-4 py-3 font-black">{game.highscoreEntries}</td>
                  <td className="px-4 py-3 font-semibold">{formatDate(game.lastPlayedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-xl border border-[#c5b675] bg-[#fff8dc] p-3 text-sm font-semibold">
          Never played: {neverPlayedNames.length > 0 ? neverPlayedNames.join(", ") : "None"}
        </div>
      </section>
    </main>
  );
}
