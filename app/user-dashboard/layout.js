import { requireRoles } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Defense-in-depth guard for the legacy /user-dashboard URL.
 * The middleware normally redirects /user-dashboard -> /dashboard/user;
 * this layout guarantees the URL can never render unguarded even if the
 * middleware is bypassed or misconfigured.
 */
export default async function UserDashboardLegacyLayout({ children }) {
  await requireRoles([ROLES.USER, ROLES.ADMIN]);
  return <>{children}</>;
}