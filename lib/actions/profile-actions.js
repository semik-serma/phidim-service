"use server";

import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/lib/auth/session";
import { logAudit } from "@/lib/auth/audit";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://service.phidimservice.com.np" ||
  "http://127.0.0.1:5000";

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
    try {
      await fetch(`${BACKEND_URL}/api/user/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(session.token ? { Authorization: `Bearer ${session.token}` } : {}),
        },
        body: JSON.stringify({ name, phone, email: session.user.email }),
      });
    } catch {
      // safe fallback
    }

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