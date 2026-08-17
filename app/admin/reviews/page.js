import { requireAdmin } from "@/lib/auth/guards";
import AdminDashboardPage from "@/components/admin-dashboard/AdminDashboardPage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "Customer Reviews" };

export default async function AdminReviewsPage() {
  await requireAdmin();
  return <AdminDashboardPage initialTab="reviews" />;
}
