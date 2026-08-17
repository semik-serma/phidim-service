import { requireAdmin } from "@/lib/auth/guards";
import AdminDashboardPage from "@/components/admin-dashboard/AdminDashboardPage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "Technician Management" };

/**
 * /admin/technicians — Technician Management. ADMIN only (server-side RBAC).
 */
export default async function AdminTechniciansPage() {
  await requireAdmin();
  return <AdminDashboardPage initialTab="technicians" />;
}