import { requireAdmin } from "@/lib/auth/guards";
import AdminDashboardPage from "@/components/admin-dashboard/AdminDashboardPage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "User Management" };

/**
 * /admin/users — User Management. ADMIN only (server-side RBAC).
 */
export default async function AdminUsersPage() {
  await requireAdmin();
  return <AdminDashboardPage initialTab="users" />;
}