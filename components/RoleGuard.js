"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

/**
 * CLIENT-SIDE UX LAYER ONLY.
 *
 * The REAL authorization is enforced server-side (src/middleware.js +
 * src/lib/auth/guards.js). This component exists purely to give the SPA
 * instant feedback while the server check is in flight and to keep an
 * access-denied state visible without a full reload.
 *
 *   - Not authenticated -> redirect to /login
 *   - Authenticated with a disallowed role -> redirect to /403
 */
export default function RoleGuard({ roles = [], children, redirectPath = "/login" }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    
    // Check if user is present in localStorage before redirecting
    let hasStoredSession = false;
    if (typeof window !== "undefined") {
      try {
        hasStoredSession = !!localStorage.getItem("phidim_auth_user");
      } catch (e) {}
    }

    if (!isAuthenticated && !hasStoredSession) {
      const t = setTimeout(() => {
        router.replace(redirectPath);
      }, 600);
      return () => clearTimeout(t);
    }

    if (user?.role && roles.length > 0 && !roles.includes(user.role)) {
      const t = setTimeout(() => {
        router.replace("/403");
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isLoading, isAuthenticated, user?.role, roles, router, redirectPath]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center text-slate-500">
          <Loader2 className="w-6 h-6 text-emerald-600 animate-spin mx-auto mb-3" />
          <p className="text-xs font-bold uppercase tracking-wider">Checking session...</p>
        </div>
      </div>
    );
  }

  if (roles.length > 0 && !roles.includes(user?.role)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center text-slate-500">
          <Loader2 className="w-6 h-6 text-emerald-600 animate-spin mx-auto mb-3" />
          <p className="text-xs font-bold uppercase tracking-wider">Redirecting to access denied...</p>
        </div>
      </div>
    );
  }

  return children;
}