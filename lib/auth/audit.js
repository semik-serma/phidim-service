/**
 * ============================================================
 * AUDIT LOGGING
 * ============================================================
 *
 * Central helper for recording security-relevant events consistently:
 * unauthorized access attempts, admin actions, role changes, etc.
 *
 * Rows are stored through the existing login-log pipeline
 * (src/server/services/userStore.js -> LoginLog model), which falls
 * back to an in-memory store when MongoDB is unreachable, so audit
 * logging never throws and never blocks the request that triggered it.
 *
 * Recorded fields: timestamp, user id, email, role, IP, action, reason.
 */

import { clientIpFromRequest } from "./session";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://service.phidimservice.com.np" ||
  "http://127.0.0.1:5000";

/**
 * @param {Object} entry
 * @param {string}  entry.action     short machine label, e.g. "role_change"
 * @param {string}  [entry.userId]
 * @param {string}  [entry.userEmail]
 * @param {string}  [entry.role]
 * @param {string}  [entry.reason]     human-readable detail
 * @param {Request} [entry.request]     route-handler request for IP/UA
 * @param {string}  [entry.ip]         explicit IP (wins over request)
 * @param {boolean} [entry.success]    default true
 */
export async function logAudit({
  action,
  userId = "",
  userEmail = "",
  role = "",
  reason = "",
  request = null,
  ip = "",
  success = true,
} = {}) {
  const resolvedIp = ip || clientIpFromRequest(request);
  const userAgent = request?.headers?.get?.("user-agent") || "";

  const payload = {
    userId: String(userId || ""),
    userEmail: String(userEmail || ""),
    role: String(role || ""),
    type: "audit",
    action: String(action || "audit"),
    success,
    reason: String(reason || ""),
    ip: resolvedIp,
    userAgent,
  };

  try {
    await fetch(`${BACKEND_URL}/api/auth/login-logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Non-blocking fallback
  }

  return payload;
}