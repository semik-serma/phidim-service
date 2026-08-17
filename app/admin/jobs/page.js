import { requireAdmin } from "@/lib/auth/guards";
import AdminDashboardPage from "@/components/admin-dashboard/AdminDashboardPage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "Jobs Management" };

export default async function AdminJobsPage() {
  await requireAdmin();
  return <AdminDashboardPage initialTab="bookings" />;
}
