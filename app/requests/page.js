import { requireRoles } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";
import {
  getRequestsForUser,
  getRequestsForTechnician,
  getAllRequests,
} from "@/backend/services/serviceStore.js";
import RequestsPage from "@/components/requests/RequestsPage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Service Requests",
  description: "Your service requests on Phidim Service.",
};

/**
 * /requests — shared page for every signed-in role.
 *
 * Server component: the role check (requireRoles) runs first, then the
 * data is fetched with ROLE-SPECIFIC SCOPE:
 *   USER       -> their own requests
 *   TECHNICIAN -> requests assigned to them
 *   ADMIN      -> every request
 *
 * Because the scoping decision happens server-side, the client can only
 * ever receive rows the current user is allowed to see.
 */
export default async function RequestsPageRoute() {
  const user = await requireRoles([ROLES.USER, ROLES.TECHNICIAN, ROLES.ADMIN]);

  let requests = [];
  if (user.role === ROLES.ADMIN) {
    requests = await getAllRequests();
  } else if (user.role === ROLES.TECHNICIAN) {
    requests = await getRequestsForTechnician({ technicianEmail: user.email, technicianId: user.id });
  } else {
    requests = await getRequestsForUser({ userId: user.id, userEmail: user.email });
  }

  return <RequestsPage requests={requests} userRole={user.role} />;
}