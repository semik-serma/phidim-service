import { requireRoles } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";
import UserDashboardPage from "@/app/user-dashboard/page";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = { title: "Service History" };

export default async function UserHistoryPage() {
  await requireRoles([ROLES.USER]);
  return <UserDashboardPage initialTab="history" />;
}
