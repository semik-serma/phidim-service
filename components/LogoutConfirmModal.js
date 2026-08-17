"use client";

import { AlertTriangle, X } from "lucide-react";

export function LogoutConfirmModal({ open, onCancel, onConfirm, isLoggingOut = false }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200" onClick={onCancel} />
      <div className="relative w-full max-w-sm bg-white rounded-3xl border border-gray-200 shadow-2xl p-6 sm:p-7 animate-in fade-in slide-in-from-bottom-4 duration-200 space-y-5">
        <div className="flex items-start justify-between gap-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-500 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
<button
            onClick={onCancel}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <h3 className="text-lg font-black text-gray-900 tracking-tight">Are you sure you want to logout?</h3>
          <p className="text-xs text-gray-500 mt-1 font-medium">
            Your session will be ended and you will be redirected to the sign-in page.
          </p>
        </div>

        <div className="flex items-center gap-2.5 pt-1">
          <button
            onClick={onCancel}
            disabled={isLoggingOut}
            className="flex-1 h-11 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-bold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoggingOut}
            className="flex-1 h-11 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70"
          >
            {isLoggingOut && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}