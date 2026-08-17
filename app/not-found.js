import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl shadow-emerald-500/20 mb-6">
        <ShieldCheck size={36} />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight mb-2">404 - Page Not Found</h1>
      <p className="text-slate-400 text-sm max-w-md mb-6">
        The page or resource you are looking for does not exist on Phidim Service, or the URL is incorrect.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-600/30"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
