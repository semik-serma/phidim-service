import { requireRoles } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Defense-in-depth guard for the legacy /technician-dashboard URL.
 * The middleware normally redirects /technician-dashboard ->
 * /dashboard/technician; this layout guarantees the URL can never
 * render unguarded even if the middleware is bypassed.
 */
export default async function TechnicianDashboardLegacyLayout({ children }) {
  await requireRoles([ROLES.TECHNICIAN, ROLES.ADMIN]);
  return <>{children}</>;
}