import { requireAdmin } from "@/lib/auth/guards";
import AdminDashboardPage from "@/components/admin-dashboard/AdminDashboardPage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "Service Categories" };

export default async function AdminCategoriesPage() {
  await requireAdmin();
  return <AdminDashboardPage initialTab="categories" />;
}
