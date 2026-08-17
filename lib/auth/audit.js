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

import { logLoginEvent } from "@/backend/services/userStore.js";
import { clientIpFromRequest } from "./session";

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

  return logLoginEvent({
    userId: String(userId || ""),
    userEmail: String(userEmail || ""),
    role: String(role || ""),
    type: "audit",
    action: String(action || "audit"),
    success,
    reason: String(reason || ""),
    ip: resolvedIp,
    userAgent,
  });
}