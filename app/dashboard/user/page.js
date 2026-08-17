import { redirect } from "next/navigation";
import { requireRoles } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function UserDashboardRedirect() {
  await requireRoles([ROLES.USER, ROLES.ADMIN]);
  redirect("/user/dashboard");
}