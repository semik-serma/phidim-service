import { requireRoles } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";
import TechnicianDashboardPage from "@/app/technician-dashboard/page";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Technician Dashboard",
  description: "Phidim Service technician portal.",
};

export default async function TechnicianDashboardPageRoute() {
  await requireRoles([ROLES.TECHNICIAN, ROLES.ADMIN]);
  return <TechnicianDashboardPage initialTab="dashboard" />;
}
