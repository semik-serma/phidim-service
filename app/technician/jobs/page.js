import { requireRoles } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";
import TechnicianDashboardPage from "@/app/technician-dashboard/page";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "Assigned Jobs" };

export default async function TechnicianJobsPage() {
  await requireRoles([ROLES.TECHNICIAN]);
  return <TechnicianDashboardPage initialTab="my-jobs" />;
}
