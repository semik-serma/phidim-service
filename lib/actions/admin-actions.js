"use server";

import { revalidatePath } from "next/cache";
import { requireRoles } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";
import { findUserByEmail, saveUser } from "@/backend/services/userStore.js";
import { logAudit } from "@/lib/auth/audit";

/**
 * updateUserRoleAction — example of an RBAC-guarded SERVER ACTION that
 * changes system-critical data (a user's role).
 *
 * requireRoles(["ADMIN"]) is evaluated FIRST. If the caller is not an
 * ADMIN the guard either redirects (page context) or throws — the DB
 * write below is unreachable for anyone else. The role change is also
 * written to the audit log for traceability.
 */
export async function updateUserRoleAction({ userId, email, role }) {
  // requireRoles() redirects to /login or /403 for non-ADMIN callers.
  const adminUser = await requireRoles([ROLES.ADMIN]);

  if (!role || !["USER", "TECHNICIAN", "ADMIN"].includes(role)) {
    return { ok: false, error: "Invalid role." };
  }
  if (!email) return { ok: false, error: "User email is required." };

  try {
    const target = await findUserByEmail(email);
    if (!target) return { ok: false, error: "User not found." };
    if (target.email === adminUser.email) {
      return { ok: false, error: "You cannot change the role of your own account." };
    }

    const previousRole = target.role;
    await saveUser(target, { role });

    try {
      await logAudit({
        action: "role_change",
        userId: adminUser.id,
        userEmail: adminUser.email,
        role: adminUser.role,
        reason: `Changed "${target.email}" role from ${previousRole} to ${role}`,
      });
    } catch {
      // audit must never block the role update
    }

    revalidatePath("/admin/users");
    return { ok: true, message: `${target.email} is now ${role}.` };
  } catch (e) {
    console.error("[RBAC] Role change failed:", e);
    return { ok: false, error: "Failed to change role." };
  }
}