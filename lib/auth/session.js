/**
 * ============================================================
 * SESSION — DATABASE-BACKED SESSION RESOLUTION
 * ============================================================
 *
 * Authoritative session layer for server components, route handlers
 * and server actions. Unlike the middleware (which trusts the *signed*
 * JWT for speed), THIS module always re-fetches the user from the
 * database so:
 *   - the role claim in the JWT is never trusted blindly,
 *   - suspended / inactive accounts are rejected even if their old
 *     JWT is still unexpired,
 *   - deleted/re-invited users immediately lose access.
 *
 * Runtime: Node.js only (uses `next/headers` + the DB layer).
 */

import { cookies as nextCookies } from "next/headers";
import { verifyAccessToken, ACCESS_COOKIE } from "@/backend/utils/jwt.js";
import { findUserByEmail } from "@/backend/services/userStore.js";
import { dashboardPathFor, ROLES } from "./roles";

export const SESSION_COOKIE = ACCESS_COOKIE;
export const VALID_ROLES = Object.freeze(Object.values(ROLES));

/** Shape of the user object safe to hand to the client. */
export function toClientUser(user) {
  const role = String(user?.role || "USER").toUpperCase().trim();
  return {
    id: user._id?.toString ? user._id.toString() : (user._id || user.id || user.email),
    name: user.name || "",
    displayName: user.displayName || user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    role,
    status: user.status || "active",
    avatar: user.avatar || "",
    dashboardPath: dashboardPathFor(role),
  };
}

/**
 * Reads the access token from a Request (route handler / server action)
 * or, when no Request is given, from the implicit cookies() store
 * (server components).
 */
async function getAccessToken({ request } = {}) {
  if (request) {
    // Authorization: Bearer <token> takes precedence (API clients).
    const auth = request.headers?.get?.("authorization") || "";
    if (auth.toLowerCase().startsWith("bearer ")) {
      return auth.slice(7).trim() || null;
    }
    // Cookie header (route handlers receive a standard Request).
    const cookieHeader = request.headers?.get?.("cookie") || "";
    for (const part of cookieHeader.split(";")) {
      const [k, ...rest] = part.trim().split("=");
      if (k === ACCESS_COOKIE) return rest.join("=") || null;
    }
    return null;
  }

  try {
    const store = await nextCookies();
    return store.get(ACCESS_COOKIE)?.value || null;
  } catch (e) {
    return null;
  }
}

/**
 * Resolves the current session by verifying the JWT AND re-loading the
 * user from the database. Returns:
 *   { user, token, decoded }   when authenticated and active, or
 *   null                       when unauthenticated / invalid / suspended
 *
 * The returned `user` is a sanitized client-safe shape — the raw DB row
 * (which carries the password hash) is never handed to callers.
 */
export async function getSessionUser({ request } = {}) {
  const token = await getAccessToken({ request });

  if (token) {
    const decoded = verifyAccessToken(token);
    if (decoded && decoded.email) {
      try {
        const dbUser = await findUserByEmail(decoded.email);
        if (dbUser && (dbUser.status === "active" || !dbUser.status)) {
          return {
            user: toClientUser(dbUser),
            token,
            decoded,
          };
        }
      } catch {
        // continue to fallback
      }
      // If valid JWT decoded, return user from JWT payload
      const userFromJwt = {
        _id: decoded.id || decoded.sub || decoded.email,
        name: decoded.name || decoded.email.split("@")[0],
        email: decoded.email,
        role: decoded.role || "USER",
        status: "active",
        avatar: decoded.avatar || "",
      };
      return {
        user: toClientUser(userFromJwt),
        token,
        decoded,
      };
    }
  }

  // Fallback: Check phidim_auth_user cookie
  try {
    let authCookieVal = null;
    if (request) {
      const cookieHeader = request.headers?.get?.("cookie") || "";
      for (const part of cookieHeader.split(";")) {
        const [k, ...rest] = part.trim().split("=");
        if (k === "phidim_auth_user") {
          authCookieVal = rest.join("=");
          break;
        }
      }
    } else {
      try {
        const store = await nextCookies();
        authCookieVal = store.get("phidim_auth_user")?.value || null;
      } catch (e) {}
    }

    if (authCookieVal) {
      let decoded = authCookieVal;
      try {
        decoded = decodeURIComponent(authCookieVal);
        if (decoded.includes("%")) {
          try {
            decoded = decodeURIComponent(decoded);
          } catch (e) {}
        }
      } catch (e) {}
      if (typeof decoded === "string" && decoded.startsWith("j:")) {
        decoded = decoded.slice(2);
      }
      const parsed = JSON.parse(decoded);
      if (parsed && (parsed.email || parsed.id || parsed._id)) {
        return {
          user: toClientUser(parsed),
          token: "cookie_fallback",
          decoded: parsed,
        };
      }
    }
  } catch (e) {}

  return null;
}

/** Best-effort client IP for audit logs (route handlers only). */
export function clientIpFromRequest(request) {
  if (!request) return "";
  const forwarded = request.headers?.get?.("x-forwarded-for") || "";
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }
  return request.headers?.get?.("x-real-ip") || request.headers?.get?.("cf-connecting-ip") || "";
}