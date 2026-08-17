"use client";

import { motion } from "motion/react";
import {
  Search,
  CalendarPlus,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  MapPin,
  PhoneCall
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function WelcomeBanner({ userName, onBookNow, onSearch }) {
  const { user } = useAuth();
  const nameToDisplay =
    user?.displayName ||
    user?.name ||
    (user?.email ? user.email.split("@")[0] : userName || "Valued Customer");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative rounded-2xl bg-gradient-to-br from-[#06241b] via-[#0b382b] to-[#0f4637] text-white p-5 sm:p-6 lg:p-7 shadow-[0_12px_36px_rgba(6,36,27,0.2)] border border-emerald-500/30 overflow-hidden"
    >
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none -mr-10 -mt-10" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Welcome Content */}
        <div className="max-w-2xl space-y-3">
          {/* Status Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-black tracking-wide border border-emerald-400/30 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Phidim Dispatch Active</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-slate-200 text-[11px] font-semibold backdrop-blur-md border border-white/10">
              <MapPin size={11} className="text-emerald-300" />
              <span>Panchthar Hub</span>
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-tight">
              Namaste, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-100 to-white">{nameToDisplay}</span> 👋
            </h1>
            <p className="text-xs sm:text-[13px] text-emerald-100/90 font-medium leading-relaxed max-w-xl">
              Certified technical assistance at your doorstep. Verified electricians, CCTV installers, AC mechanics, and Fiber Net specialists ready for same-day dispatch.
            </p>
          </div>

          {/* Quick Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              onClick={onBookNow}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer"
            >
              <CalendarPlus size={15} className="stroke-[2.5]" />
              <span>Book a Service</span>
              <ArrowRight size={13} className="stroke-[2.5]" />
            </button>

            <button
              onClick={onSearch}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs backdrop-blur-md transition-all cursor-pointer"
            >
              <Search size={14} />
              <span>Search Services</span>
            </button>

            <a
              href="tel:+9779862772457"
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-950/50 hover:bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-bold text-xs backdrop-blur-md transition-all"
            >
              <PhoneCall size={13} />
              <span>Helpline: 9862772457</span>
            </a>
          </div>
        </div>

        {/* Right Metric Showcase Cards */}
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-2.5 shrink-0">
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950/40 backdrop-blur-md border border-emerald-500/30 flex items-center gap-2.5 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0">
              <Zap size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black text-white truncate">30-Min Arrival</p>
              <p className="text-[10px] text-emerald-300/80 truncate">Rapid Tech Dispatch</p>
            </div>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950/40 backdrop-blur-md border border-emerald-500/30 flex items-center gap-2.5 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center shrink-0">
              <ShieldCheck size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black text-white truncate">Verified Techs</p>
              <p className="text-[10px] text-teal-300/80 truncate">100% ID Checked</p>
            </div>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950/40 backdrop-blur-md border border-emerald-500/30 flex items-center gap-2.5 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0">
              <Sparkles size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black text-white truncate">4.92 ★ Rated</p>
              <p className="text-[10px] text-amber-300/80 truncate">3,900+ Jobs Done</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
