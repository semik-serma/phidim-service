import { requireAdmin } from "@/lib/auth/guards";
import AdminDashboardPage from "@/components/admin-dashboard/AdminDashboardPage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "Activity Logs" };

export default async function AdminActivityLogsPage() {
  await requireAdmin();
  return <AdminDashboardPage initialTab="analytics" />;
}
