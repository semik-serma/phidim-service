import { requireAdmin } from "@/lib/auth/guards";
import AdminDashboardPage from "@/components/admin-dashboard/AdminDashboardPage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "Services Catalog" };

export default async function AdminServicesPage() {
  await requireAdmin();
  return <AdminDashboardPage initialTab="services" />;
}
