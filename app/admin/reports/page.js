import { requireAdmin } from "@/lib/auth/guards";
import AdminDashboardPage from "@/components/admin-dashboard/AdminDashboardPage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "Reports & Audits" };

export default async function AdminReportsPage() {
  await requireAdmin();
  return <AdminDashboardPage initialTab="analytics" />;
}
