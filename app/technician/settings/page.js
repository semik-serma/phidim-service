import { requireRoles } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";
import TechnicianDashboardPage from "@/app/technician-dashboard/page";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "Technician Settings" };

export default async function TechnicianSettingsPage() {
  await requireRoles([ROLES.TECHNICIAN]);
  return <TechnicianDashboardPage initialTab="settings" />;
}
