"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("../App"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center font-sans">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-bold">Loading Phidim Service System...</span>
      </div>
    </div>
  ),
});

export function SpaRoot() {
  return (
    <div suppressHydrationWarning>
      <App />
    </div>
  );
}
