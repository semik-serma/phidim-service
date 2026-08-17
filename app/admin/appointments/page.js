import { requireAdmin } from "@/lib/auth/guards";
import AdminDashboardPage from "@/components/admin-dashboard/AdminDashboardPage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "Appointments Management" };

export default async function AdminAppointmentsPage() {
  await requireAdmin();
  return <AdminDashboardPage initialTab="bookings" />;
}
