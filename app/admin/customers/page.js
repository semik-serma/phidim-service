import { requireAdmin } from "@/lib/auth/guards";
import AdminDashboardPage from "@/components/admin-dashboard/AdminDashboardPage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "Customers Management" };

export default async function AdminCustomersPage() {
  await requireAdmin();
  return <AdminDashboardPage initialTab="users" />;
}
