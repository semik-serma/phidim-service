"use client";

import Link from "next/link";
import { ShieldX, LayoutDashboard, LogIn } from "lucide-react";

/**
 * Shared "Access Denied" (403) presentation. Clearly explains that the
 * current account does not have permission for the requested resource.
 * This component ONLY renders after a server-side guard or middleware
 * has already rejected the request (see /app/403/page.js).
 */
export default function AccessDeniedCard({ role }) {
  const dashboardPath = role === "ADMIN" ? "/admin/dashboard" : role === "TECHNICIAN" ? "/technician/dashboard" : "/user/dashboard";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-200 shadow-xl p-8 text-center space-y-5">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-500 mx-auto">
          <ShieldX className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">403 — Access Denied</h1>
          <p className="text-sm text-gray-600 mt-2">
            Your account does not have permission to access the requested resource. This incident has
            been logged.
          </p>
          {role && (
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              Signed in as <span className="text-rose-500">{role}</span>
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <Link
            href={dashboardPath}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Go to my dashboard
          </Link>
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-gray-600 text-sm font-bold transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Sign in with another account
          </Link>
        </div>
      </div>
    </div>
  );
}