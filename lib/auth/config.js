/**
 * ============================================================
 * RBAC — ROUTE ACCESS CONFIGURATION
 * ============================================================
 *
 * Centralized route -> roles table.
 *
 *  - MIDDLEWARE uses this for the fast, JWT-based first line of
 *    defence on every matched request (see src/middleware.js).
 *  - The guards (src/lib/auth/guards.js) perform the authoritative,
 *    database-backed check as a second line of defence.
 *
 * Keeping policies here means adding/removing a protected route is a
 * one-line change and the URL-typing bypass is closed in middleware.
 */

import { ROLES } from "./roles";

/** Paths that can be reached without a session. */
export const PUBLIC_PREFIXES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/401",
  "/403",
  "/api/auth", // the auth backend manages its own tokens/cookies
  "/api/calls", // real-time call signaling endpoint
  "/api/users",
  "/api/chat", // real-time messaging persistence endpoint
  "/api/health",
  "/_next",
  "/_not-found",
  "/_error",
  "/_document",
  "/favicon.ico",
  "/logo.png",
  "/apple-touch-icon.png",
  "/site.webmanifest",
];

export const PUBLIC_EXACT = ["/", "/sitemap.xml", "/sw.js"];

/**
 * Legacy dashboard URLs that were used before RBAC. These are redirected
 * to the canonical /dashboard/{role} URLs so old bookmarks / links keep
 * working but never land on an unguarded route.
 *
 * NOTE: the bare `/dashboard` path is intentionally NOT aliased — it goes
 * through src/app/dashboard/page.js which redirects each user to THEIR
 * OWN dashboard based on the DB-verified role, so a visitor is never
 * steered towards a dashboard they cannot access.
 */
export const DASHBOARD_ALIASES = Object.freeze({
  "/user-dashboard": "/user/dashboard",
  "/user-dashboard/": "/user/dashboard",
  "/technician-dashboard": "/technician/dashboard",
  "/technician-dashboard/": "/technician/dashboard",
  "/dashboard/user": "/user/dashboard",
  "/dashboard/user/": "/user/dashboard",
  "/dashboard/technician": "/technician/dashboard",
  "/dashboard/technician/": "/technician/dashboard",
  "/dashboard/admin": "/admin/dashboard",
  "/dashboard/admin/": "/admin/dashboard",
});

/** Protected PAGE routes -> roles allowed to visit them. */
export const PAGE_ROUTE_RULES = [
  { pattern: /^\/user(?:\/|$)/, roles: [ROLES.USER] },
  { pattern: /^\/technician(?:\/|$)/, roles: [ROLES.TECHNICIAN] },
  { pattern: /^\/admin(?:\/|$)/, roles: [ROLES.ADMIN] },
  { pattern: /^\/dashboard\/user(?:\/|$)/, roles: [ROLES.USER] },
  { pattern: /^\/dashboard\/technician(?:\/|$)/, roles: [ROLES.TECHNICIAN] },
  { pattern: /^\/dashboard\/admin(?:\/|$)/, roles: [ROLES.ADMIN] },
  { pattern: /^\/dashboard\//, roles: [ROLES.ADMIN] },
  { pattern: /^\/requests(?:\/|$)/, roles: [ROLES.USER] },
  { pattern: /^\/profile(?:\/|$)/, roles: [ROLES.USER, ROLES.TECHNICIAN, ROLES.ADMIN] },
];

/**
 * Protected API routes. Every request to these MUST prove
 * authentication + an allowed role (verified against the database in
 * the route handler). `authorizeApi()` inside each route handler is
 * authoritative; the middleware block below is defence in depth.
 */
export const API_ROUTE_RULES = [
  { pattern: /^\/api\/admin(?:\/|$)/, roles: [ROLES.ADMIN] },
  { pattern: /^\/api\/technician(?:\/|$)/, roles: [ROLES.TECHNICIAN] },
  { pattern: /^\/api\/user\/profile(?:\/|$)/, roles: [ROLES.USER, ROLES.TECHNICIAN, ROLES.ADMIN] },
  { pattern: /^\/api\/user(?:\/|$)/, roles: [ROLES.USER] },
];

export function isPublicPath(pathname) {
  if (PUBLIC_EXACT.includes(pathname)) return true;
  return PUBLIC_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(prefix + "/"));
}

export function isLegacyDashboard(pathname) {
  return Object.prototype.hasOwnProperty.call(DASHBOARD_ALIASES, pathname);
}

export function findRoleRule(routeRules, pathname) {
  return routeRules.find((rule) => rule.pattern.test(pathname)) || null;
}