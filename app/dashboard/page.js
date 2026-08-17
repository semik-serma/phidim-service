import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/session";
import { dashboardPathFor } from "@/lib/auth/roles";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Role-aware dashboard landing page.
 *
 * Visiting /dashboard redirects every signed-in user to their own
 * dashboard:
 *   USER       -> /dashboard/user
 *   TECHNICIAN -> /dashboard/technician
 *   ADMIN      -> /dashboard/admin
 *
 * The redirect target is derived from the DATABASE-backed session, so
 * a stale JWT can never steer a user to a dashboard they lost access to.
 */
export default async function DashboardLandingPage() {
  const session = await getSessionUser();
  if (!session) redirect("/login");
  redirect(dashboardPathFor(session.user.role));
}
