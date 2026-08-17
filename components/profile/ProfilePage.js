"use client";

import { useActionState } from "react";
import { LogOut, ShieldCheck } from "lucide-react";
import { updateOwnProfileAction } from "@/lib/actions/profile-actions";
import { useAuth } from "@/context/AuthContext";

/**
 * Own-profile editor. Uses the RBAC-guarded server action
 * updateOwnProfileAction — the server resolves identity from the
 * session, so there is no way to edit someone else's record.
 */
export default function ProfilePage({ user }) {
  const { logout } = useAuth();
  const [state, formAction, pending] = useActionState(updateOwnProfileAction, {
    ok: false,
    error: "",
    message: "",
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-10 font-sans">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Profile</h1>
            <p className="text-sm text-slate-500">
              Signed in as <strong>{user.role}</strong> — edit your own information only.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-400 font-black text-xl">
                {user.name?.charAt(0)}
              </div>
            )}
            <div>
              <div className="font-bold text-slate-900">{user.name}</div>
              <div className="text-sm text-slate-500">{user.email}</div>
            </div>
          </div>

          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Name</label>
              <input
                name="name"
                disabled={pending}
                defaultValue={user.name}
                required
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Phone</label>
              <input
                name="phone"
                disabled={pending}
                defaultValue={user.phone || ""}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Email (read-only)</label>
              <input
                value={user.email}
                readOnly
                disabled
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-slate-50 text-slate-400"
              />
            </div>

            {state?.error && (
              <div className="p-3 rounded-xl text-sm font-bold bg-rose-50 border border-rose-200 text-rose-700">
                {state.error}
              </div>
            )}
            {state?.ok && state.message && (
              <div className="p-3 rounded-xl text-sm font-bold bg-emerald-50 border border-emerald-200 text-emerald-800">
                {state.message}
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold disabled:opacity-60"
            >
              {pending ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        <button
          onClick={() => logout()}
          className="w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-bold border border-rose-200"
        >
          Log out
        </button>
      </div>
    </div>
  );
}