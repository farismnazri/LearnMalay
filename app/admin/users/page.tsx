import { listAdminUsers } from "@/server/adminAnalyticsRepo";
import AdminUsersTable from "./AdminUsersTable";

export default async function AdminUsersPage() {
  const users = await listAdminUsers();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <p className="text-xs font-black tracking-[0.2em] text-[#bcd398]">USER DIRECTORY</p>
        <h1 className="mt-1 text-3xl font-black text-white sm:text-4xl">Learner accounts</h1>
      </div>

      <AdminUsersTable users={users} />
    </main>
  );
}
