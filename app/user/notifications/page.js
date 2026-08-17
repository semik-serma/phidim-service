import { requireRoles } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";
import UserDashboardPage from "@/app/user-dashboard/page";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "User Notifications" };

export default async function UserNotificationsPage() {
  await requireRoles([ROLES.USER]);
  return <UserDashboardPage initialTab="notifications" />;
}
