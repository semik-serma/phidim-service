import { requireAdmin } from "@/lib/auth/guards";
import AdminDashboardPage from "@/components/admin-dashboard/AdminDashboardPage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Admin Dashboard",
  description: "Phidim Service administration console.",
};

export default async function AdminDashboardPageRoute() {
  await requireAdmin();
  return <AdminDashboardPage initialTab="dashboard" />;
}
