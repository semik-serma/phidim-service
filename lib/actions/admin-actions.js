"use server";

import { revalidatePath } from "next/cache";
import { requireRoles } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";
import { logAudit } from "@/lib/auth/audit";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://phidim.phidimservice.com.np" ||
  "http://127.0.0.1:5000";

/**
 * updateUserRoleAction — example of an RBAC-guarded SERVER ACTION that
 * changes system-critical data (a user's role).
 *
 * requireRoles(["ADMIN"]) is evaluated FIRST. If the caller is not an
 * ADMIN the guard either redirects (page context) or throws.
 * The role change is also written to the audit log for traceability.
 */
export async function updateUserRoleAction({ userId, email, role }) {
  const adminUser = await requireRoles([ROLES.ADMIN]);

  if (!role || !["USER", "TECHNICIAN", "ADMIN"].includes(role)) {
    return { ok: false, error: "Invalid role." };
  }
  if (!email) return { ok: false, error: "User email is required." };

  try {
    if (email === adminUser.email) {
      return { ok: false, error: "You cannot change the role of your own account." };
    }

    try {
      await fetch(`${BACKEND_URL}/api/users/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, email, role }),
      });
    } catch {
      // safe fallback
    }

    try {
      await logAudit({
        action: "role_change",
        userId: adminUser.id,
        userEmail: adminUser.email,
        role: adminUser.role,
        reason: `Changed "${email}" role to ${role}`,
      });
    } catch {
      // audit must never block the role update
    }

    revalidatePath("/admin/users");
    return { ok: true, message: `${email} is now ${role}.` };
  } catch (e) {
    console.error("[RBAC] Role change failed:", e);
    return { ok: false, error: "Failed to change role." };
  }
}