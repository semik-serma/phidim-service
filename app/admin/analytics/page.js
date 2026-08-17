import { requireAdmin } from "@/lib/auth/guards";
import AdminDashboardPage from "@/components/admin-dashboard/AdminDashboardPage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "System Analytics" };

/**
 * /admin/analytics — Business analytics. ADMIN only (server-side RBAC).
 */
export default async function AdminAnalyticsPage() {
  await requireAdmin();
  return <AdminDashboardPage initialTab="analytics" />;
}