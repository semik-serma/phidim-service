import { requireAdmin } from "@/lib/auth/guards";
import AdminDashboardPage from "@/components/admin-dashboard/AdminDashboardPage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "Admin Settings" };

/**
 * /admin/settings — System settings. ADMIN only (server-side RBAC).
 */
export default async function AdminSettingsPage() {
  await requireAdmin();
  return <AdminDashboardPage initialTab="settings" />;
}