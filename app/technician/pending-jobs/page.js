import { requireRoles } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";
import TechnicianDashboardPage from "@/app/technician-dashboard/page";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "Pending Job Requests" };

export default async function TechnicianPendingJobsPage() {
  await requireRoles([ROLES.TECHNICIAN]);
  return <TechnicianDashboardPage initialTab="new-jobs" />;
}
