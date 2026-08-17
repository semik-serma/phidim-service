import Link from "next/link";
import { ShieldAlert, LogIn } from "lucide-react";

export const metadata = { title: "401 — Unauthorized" };

/**
 * /401 — Unauthorized.
 *
 * Shown for requests that reached a protected resource without a valid
 * session. Normal page navigation is intercepted by the middleware and
 * redirected to /login instead; this page is a safety net (and the
 * documentation target for the HTTP 401 semantics).
 */
export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-200 shadow-xl p-8 text-center space-y-5">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-500 mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">401 — Unauthorized</h1>
          <p className="text-sm text-gray-600 mt-2">
            You need to sign in to access this resource. Your session may have expired.
          </p>
        </div>
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors"
        >
          <LogIn className="w-4 h-4" />
          Sign in
        </Link>
      </div>
    </div>
  );
}