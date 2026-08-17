import { requireAdmin } from "@/lib/auth/guards";
import AdminDashboardPage from "@/components/admin-dashboard/AdminDashboardPage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "Support Center" };

export default async function AdminSupportPage() {
  await requireAdmin();
  return <AdminDashboardPage initialTab="messages" />;
}
