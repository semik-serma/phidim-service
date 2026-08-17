import { requireAdmin } from "@/lib/auth/guards";
import AdminDashboardPage from "@/components/admin-dashboard/AdminDashboardPage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "Payments & Revenue" };

export default async function AdminPaymentsPage() {
  await requireAdmin();
  return <AdminDashboardPage initialTab="payments" />;
}
