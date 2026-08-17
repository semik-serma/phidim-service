import { requireAdmin } from "@/lib/auth/guards";
import AdminDashboardPage from "@/components/admin-dashboard/AdminDashboardPage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "Technical Services & Packages" };

export default async function AdminInventoryPage() {
  await requireAdmin();
  return <AdminDashboardPage initialTab="services" />;
}
