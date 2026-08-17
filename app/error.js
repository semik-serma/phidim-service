"use client";

import Link from "next/link";
import { TriangleAlert } from "lucide-react";

/**
 * Root error boundary -> 500 Server Error page.
 * In production the real error is never leaked to the client.
 */
export default function GlobalError({ error, reset }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full text-center space-y-5">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-rose-500 to-red-600 mx-auto">
          <TriangleAlert size={32} />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">500 — Server Error</h1>
        <p className="text-slate-400 text-sm">
          Something went wrong on our side. Please try again, and contact support if the problem
          persists.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold cursor-pointer"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}