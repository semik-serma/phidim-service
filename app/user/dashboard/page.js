import { requireRoles } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";
import UserDashboardPage from "@/app/user-dashboard/page";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "User Dashboard",
  description: "Your Phidim Service customer portal.",
};

export default async function UserDashboardPageRoute() {
  await requireRoles([ROLES.USER, ROLES.ADMIN]);
  return <UserDashboardPage initialTab="dashboard" />;
}
