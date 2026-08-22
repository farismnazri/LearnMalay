import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getProfileAvatarSrc } from "@/lib/profileAvatars";
import { isAdmin } from "@/lib/userCapabilities";
import { getSessionUser } from "@/server/sessionAuth";
import "./admin.css";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = await getSessionUser();
  if (!user || !isAdmin(user)) redirect("/user");

  return (
    <div className="admin-shell">
      <header className="border-b border-[#cde1aa]/25 bg-[#07170f]/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 tablet:flex-row tablet:items-center tablet:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <Image
              src={getProfileAvatarSrc(user.avatarId)}
              alt="Admin avatar"
              width={50}
              height={50}
              className="h-12 w-12 rounded-full border-2 border-[#f6cf5a] bg-white object-cover shadow-lg"
            />
            <div>
              <div className="crash-text text-3xl leading-none text-[#ffdc68]">ADMIN CAMP</div>
              <div className="mt-1 text-xs font-black tracking-[0.18em] text-[#d9e9bd]/70">LEARN MALAY ANALYTICS</div>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-2 text-sm font-black">
            <Link className="rounded-xl border border-[#d3e6b2]/25 bg-[#1e482f] px-4 py-2 hover:bg-[#2a5b3b]" href="/admin">Overview</Link>
            <Link className="rounded-xl border border-[#d3e6b2]/25 bg-[#1e482f] px-4 py-2 hover:bg-[#2a5b3b]" href="/admin/users">Users</Link>
            <Link className="rounded-xl border border-[#f0cf73]/35 bg-[#6c531d] px-4 py-2 hover:bg-[#826725]" href="/map">Back to map</Link>
          </nav>
        </div>
        <div className="admin-pixel-rule" />
      </header>
      {children}
    </div>
  );
}
