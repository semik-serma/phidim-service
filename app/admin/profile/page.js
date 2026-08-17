import { requireAdmin } from "@/lib/auth/guards";
import AdminDashboardPage from "@/components/admin-dashboard/AdminDashboardPage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "Admin Profile" };

export default async function AdminProfilePage() {
  await requireAdmin();
  return <AdminDashboardPage initialTab="settings" />;
}
