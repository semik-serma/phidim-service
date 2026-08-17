import { requireRoles } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";
import UserDashboardPage from "@/app/user-dashboard/page";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "User Settings" };

export default async function UserSettingsPage() {
  await requireRoles([ROLES.USER]);
  return <UserDashboardPage initialTab="settings" />;
}
