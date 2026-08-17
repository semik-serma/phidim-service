import { requireAuth } from "@/lib/auth/guards";
import ProfilePage from "@/components/profile/ProfilePage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "My Profile",
  description: "Manage your Phidim Service profile.",
};

/**
 * /profile — every signed-in role may edit their OWN profile.
 * requireAuth() redirects unauthenticated users to /login.
 */
export default async function ProfilePageRoute() {
  const user = await requireAuth();
  return <ProfilePage user={user} />;
}