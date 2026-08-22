import Link from "next/link";

import { getAdminOverview } from "@/server/adminAnalyticsRepo";

function percent(value: number) {
  return `${Math.round(value * 100)}%`;
}

export default async function AdminOverviewPage() {
  const overview = await getAdminOverview();
  const cards = [
    ["Total users", overview.metrics.totalUsers],
    ["New · 7 days", overview.metrics.newUsersLast7Days],
    ["Active · 7 days", overview.metrics.activeUsersLast7Days],
    ["Active today", overview.metrics.activeUsersToday],
    ["Chapter completions", overview.metrics.totalChapterCompletions],
    ["Tracked minigame plays", overview.metrics.totalMinigamePlays],
    ["Highscore entries", overview.metrics.totalHighscoreEntries],
  ] as const;
  const maxGamePlays = Math.max(1, ...overview.minigames.map((game) => game.totalPlays));

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 tablet:flex-row tablet:items-end tablet:justify-between">
        <div>
          <p className="text-xs font-black tracking-[0.2em] text-[#bcd398]">SYSTEM OVERVIEW</p>
          <h1 className="mt-1 text-3xl font-black text-white sm:text-4xl">Learner activity at a glance</h1>
          <p className="mt-2 max-w-2xl text-sm font-semibold text-[#dbe9c5]/75">
            Account growth, chapter drop-off, minigame use, and saved results from first-party data.
          </p>
          <p className="mt-1 text-xs font-semibold text-[#dbe9c5]/50">
            Learner metrics exclude the ADMIN and Demo Mode accounts; the user directory still shows every role.
          </p>
        </div>
        <Link className="w-fit rounded-xl bg-[#ffd45c] px-4 py-2 text-sm font-black text-[#413000] shadow hover:bg-[#ffe17e]" href="/admin/users">
          Browse users →
        </Link>
      </div>

      <section className="mt-7 grid gap-3 sm:grid-cols-2 tablet:grid-cols-4 xl:grid-cols-7">
        {cards.map(([label, value]) => (
          <article key={label} className="admin-panel rounded-2xl p-4">
            <div className="text-3xl font-black text-[#ffdc68]">{value.toLocaleString()}</div>
            <div className="mt-2 text-xs font-black uppercase tracking-wide text-[#e5efd4]/70">{label}</div>
          </article>
        ))}
      </section>

      <div className="mt-7 grid gap-6 xl:grid-cols-2">
        <section className="admin-light-panel rounded-3xl p-5 sm:p-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-black tracking-[0.16em] text-[#53703f]">PROGRESSION FUNNEL</p>
              <h2 className="mt-1 text-2xl font-black">Chapter completion</h2>
            </div>
            <span className="text-xs font-bold opacity-60">{overview.metrics.totalUsers} learners</span>
          </div>
          <div className="mt-5 space-y-4">
            {overview.chapterFunnel.map((chapter) => (
              <div key={chapter.id}>
                <div className="flex items-center justify-between gap-3 text-sm font-black">
                  <span>Chapter {chapter.id} · {chapter.name}</span>
                  <span>{chapter.completedUsers} · {percent(chapter.completionShare)}</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#d9d4ac]">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#4d8d4e] to-[#8bbf60]" style={{ width: percent(chapter.completionShare) }} />
                </div>
                {chapter.dropoffFromPrevious !== null && chapter.dropoffFromPrevious > 0 && (
                  <div className="mt-1 text-xs font-bold text-[#9a4d30]">↓ {chapter.dropoffFromPrevious} stopped before this completion</div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="admin-light-panel rounded-3xl p-5 sm:p-6">
          <div>
            <p className="text-xs font-black tracking-[0.16em] text-[#53703f]">MINIGAME POPULARITY</p>
            <h2 className="mt-1 text-2xl font-black">Tracked play starts</h2>
          </div>
          <div className="mt-5 space-y-4">
            {overview.minigames.map((game) => {
              const mostPlayed = overview.mostPlayedMinigameId === game.id;
              return (
                <div key={game.id} className={mostPlayed ? "rounded-2xl bg-[#fff0b4] p-3 ring-2 ring-[#e7bb49]" : "p-1"}>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-black">
                    <span>{game.name} {mostPlayed && <span className="ml-1 text-[10px] text-[#8b5800]">MOST PLAYED</span>}</span>
                    <span>{game.totalPlays} plays · {game.uniquePlayers} players</span>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#d9d4ac]">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#d49a27] to-[#f2c84e]" style={{ width: `${(game.totalPlays / maxGamePlays) * 100}%` }} />
                  </div>
                  <div className="mt-1 text-xs font-semibold opacity-65">{percent(game.playShare)} of tracked starts · {game.highscoreEntries} highscores</div>
                </div>
              );
            })}
          </div>
          <p className="mt-5 rounded-xl border border-[#c5b675] bg-[#fff8dc] p-3 text-xs font-semibold text-[#5a522d]">
            Play-start and activity metrics begin with this analytics update. Historical highscore totals remain available separately.
          </p>
        </section>
      </div>
    </main>
  );
}
