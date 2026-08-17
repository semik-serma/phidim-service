"use server";

import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/lib/auth/session";
import { saveUser } from "@/backend/services/userStore.js";
import { logAudit } from "@/lib/auth/audit";

/**
 * updateOwnProfileAction — example of an RBAC-guarded SERVER ACTION.
 *
 * Any authenticated role (USER / TECHNICIAN / ADMIN) may update their
 * OWN profile only. The identity is always resolved from the session
 * (never from the submitted form), so a caller can't edit another user's
 * record by passing their id — there is no id field at all.
 */
export async function updateOwnProfileAction(_prevState, formData) {
  const session = await getSessionUser();
  if (!session) return { ok: false, error: "You must be signed in to update your profile." };

  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();

  if (name.length < 2) return { ok: false, error: "Name must be at least 2 characters." };

  try {
    await saveUser({ email: session.user.email }, { name, phone });

    // A role change on another endpoint can change the dashboard path; the
    // profile record itself only holds personal fields.
    try {
      await logAudit({
        action: "profile_update",
        userId: session.user.id,
        userEmail: session.user.email,
        role: session.user.role,
        reason: "User updated their own profile",
      });
    } catch {
      // audit must never block the action
    }

    revalidatePath("/profile");
    return { ok: true, message: "Profile updated successfully." };
  } catch (e) {
    console.error("[RBAC] Profile update failed:", e);
    return { ok: false, error: "Failed to update profile. Please try again." };
  }
}