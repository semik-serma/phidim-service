import { requireRoles } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";
import RequestsPage from "@/components/requests/RequestsPage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Service Requests",
  description: "Your service requests on Phidim Service.",
};

/**
 * /requests — shared page for every signed-in role.
 *
 * Scoping and fetching are handled cleanly via the role-guarded
 * API endpoints (/api/user/requests and /api/technician/jobs).
 */
export default async function RequestsPageRoute() {
  const user = await requireRoles([ROLES.USER, ROLES.TECHNICIAN, ROLES.ADMIN]);
  return <RequestsPage requests={[]} userRole={user.role} />;
}