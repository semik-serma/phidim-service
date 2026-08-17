/**
 * ============================================================
 * RBAC — REUSABLE AUTHORIZATION GUARDS
 * ============================================================
 *
 * The ONE place server-side authorization decisions are made.
 * Every dashboard page, protected route handler and server action
 * delegates to these helpers — duplicated checks in individual files
 * are forbidden so a missing guard can never be introduced by
 * copy-paste drift.
 *
 * Available helpers:
 *   requireAuth()                     -> any signed-in user
 *   requireUser()                     -> USER only
 *   requireTechnician()               -> TECHNICIAN only
 *   requireAdmin()                    -> ADMIN only
 *   requireRoles(["ADMIN","TECHNICIAN"]) -> explicit list
 *
 * Server Components / Pages: requireRoles() redirects to /login or /403.
 * Route Handlers / Server Actions: authorizeApi() throws AuthError;
 *   wrap with handleAuthError() to return a JSON response.
 *
 * All checks are DB-backed (see session.js) — the JWT role is never
 * trusted directly.
 */

import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { getSessionUser } from "./session";
import { hasRole, ALL_ROLES, ROLES, dashboardPathFor } from "./roles";
import { logAudit } from "./audit";

/** Typed error carrying an HTTP status + machine-readable code. */
export class AuthError extends Error {
  constructor(status, message, code = "AUTH_ERROR") {
    super(message);
    this.name = "AuthError";
    this.status = status;
    this.code = code;
  }
}

/**
 * Page-level guard. Redirects instead of throwing:
 *   - no valid session            -> /login
 *   - session but wrong role      -> /403
 * Returns the (DB-verified) client user when allowed.
 */
export async function requireRoles(roles = ALL_ROLES, options = {}) {
  const session = await getSessionUser();

  if (!session) {
    const login = options.loginPath || "/login";
    const callback = options.callbackUrl;
    redirect(callback ? `${login}?callbackUrl=${encodeURIComponent(callback)}` : login);
  }

  // Admins always have supervisory access across all dashboard pages
  if (session.user?.role === "ADMIN") {
    return session.user;
  }

  if (!hasRole(session.user, roles)) {
    try {
      await logAudit({
        action: "page_access_denied",
        userId: session.user.id,
        userEmail: session.user.email,
        role: session.user.role,
        reason: `Blocked from protected page. Required roles: ${roles.join(", ")}`,
      });
    } catch {
      // ignore
    }
    const ownDashboard = session.user.dashboardPath || dashboardPathFor(session.user.role);
    if (options.deniedPath) {
      redirect(options.deniedPath);
    }
    if (ownDashboard && !roles.includes(session.user.role)) {
      redirect(ownDashboard);
    }
    redirect("/403");
  }

  return session.user;
}

/** Any signed-in user. */
export const requireAuth = () => requireRoles(ALL_ROLES);

/** USER role only. */
export const requireUser = () => requireRoles([ROLES.USER]);

/** TECHNICIAN role only. */
export const requireTechnician = () => requireRoles([ROLES.TECHNICIAN]);

/** ADMIN role only. */
export const requireAdmin = () => requireRoles([ROLES.ADMIN]);

/**
 * Route-handler / server-action guard. Returns the session
 * ({ user, raw, token }) or throws AuthError(401|403).
 */
export async function authorizeApi(roles = ALL_ROLES, request) {
  const session = await getSessionUser({ request });

  if (!session) {
    throw new AuthError(401, "Authentication required.", "UNAUTHENTICATED");
  }

  if (!hasRole(session.user, roles)) {
    try {
      await logAudit({
        action: "api_access_denied",
        userId: session.user.id,
        userEmail: session.user.email,
        role: session.user.role,
        request,
        reason: `Blocked from protected API. Required roles: ${roles.join(", ")}`,
      });
    } catch {
      // ignore
    }
    throw new AuthError(403, "You do not have permission to access this resource.", "FORBIDDEN");
  }

  return session;
}

/** Map an AuthError to a JSON NextResponse for route handlers. */
export function handleAuthError(error) {
  if (error instanceof AuthError) {
    return NextResponse.json({ error: error.message, code: error.code }, { status: error.status });
  }
  console.error("[RBAC] Unexpected authorization error:", error);
  return NextResponse.json({ error: "Internal server error.", code: "INTERNAL" }, { status: 500 });
}