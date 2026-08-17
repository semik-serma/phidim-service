"use client";

import { motion } from "motion/react";
import {
  MapPin,
  ShieldCheck,
  Zap,
  Power,
  Navigation,
  Clock,
  Compass,
  Award,
  Sparkles,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export function TechnicianWelcomeCard({ isOnline, setIsOnline, showToast, onUpdateLocation }) {
  const { user } = useAuth();
  const techName = user?.displayName || user?.name || "Field Technician";
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white shadow-2xl p-6 sm:p-8 lg:p-10 border border-white/20">
      {/* Decorative Background Micro-Shapes */}
      <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute left-1/3 -top-20 w-60 h-60 rounded-full bg-emerald-400/20 blur-2xl pointer-events-none" />
      <div className="absolute right-10 top-6 w-32 h-32 rounded-full border border-white/10 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Greeting, Status & Actions */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wide border border-white/30 text-emerald-100 shadow-sm">
            <Sparkles size={14} className="text-amber-300 animate-spin" />
            <span>Phidim District • Top Ranked Technician #1</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Good Morning, <br className="hidden sm:inline" />
              <span className="text-amber-300 drop-shadow-md">{techName} 👋</span>
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-xl leading-relaxed font-medium">
              You have <strong className="text-white underline decoration-amber-400 underline-offset-4">3 new service requests</strong> waiting in Phidim-4 & Panchthar sector. Current earnings today: <strong className="text-white font-bold">Rs. 4,850</strong>.
            </p>
          </div>

          {/* Live Status Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-black/25 backdrop-blur-md border border-white/20">
              <span
                className={`w-3 h-3 rounded-full ${
                  isOnline ? "bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" : "bg-rose-400"
                }`}
              />
              <span className="text-xs font-bold tracking-wide">
                Status: {isOnline ? "Available for New Jobs" : "Offline (Not Accepting Jobs)"}
              </span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold">
              <MapPin size={14} className="text-amber-300" />
              <span>Phidim Bazar (1.2km radius)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                const next = !isOnline;
                setIsOnline(next);
                showToast(next ? "Switched to Available Mode" : "Switched to Offline Mode");
              }}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-extrabold shadow-xl transition-all duration-200 active:scale-95 ${
                isOnline
                  ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-900/30"
                  : "bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black shadow-emerald-900/30"
              }`}
            >
              <Power size={16} />
              <span>{isOnline ? "Go Offline" : "Go Online Now"}</span>
            </button>

            <button
              onClick={onUpdateLocation}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md text-xs font-bold border border-white/30 transition-all shadow-lg active:scale-95"
            >
              <Navigation size={16} className="text-amber-300" />
              <span>Update Location</span>
            </button>

            <button
              onClick={() => showToast("Calibrating GPS and Signal Strength...")}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-black/20 hover:bg-black/30 text-white backdrop-blur-md text-xs font-semibold border border-white/10 transition-all"
            >
              <Compass size={16} />
              <span className="hidden sm:inline">Calibrate GPS</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Illustration & Quick Badges */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm">
            {/* Main Glass Illustration Card */}
            <div className="relative rounded-3xl bg-white/10 backdrop-blur-xl p-5 border border-white/20 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/15">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center text-slate-900 shadow-md">
                    <ShieldCheck size={26} />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">Technician Radar</h4>
                    <p className="text-[11px] text-emerald-200">High Demand Sector</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-400/30 text-emerald-200 text-[10px] font-bold tracking-wider uppercase border border-emerald-300/40">
                  98% Match
                </span>
              </div>

              {/* Dynamic Metrics */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-black/20 border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-200 text-[11px]">
                    <Clock size={13} />
                    <span>Avg Response</span>
                  </div>
                  <p className="text-base font-black text-white font-mono">14 Mins</p>
                </div>

                <div className="p-3 rounded-2xl bg-black/20 border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-200 text-[11px]">
                    <Award size={13} />
                    <span>CSAT Rating</span>
                  </div>
                  <p className="text-base font-black text-white font-mono">4.95 / 5.0</p>
                </div>
              </div>

              {/* Equipment Ready Indicator */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-950/40 border border-emerald-400/30">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold text-emerald-100">Toolbox & Spare Parts Ready</span>
                </div>
                <Zap size={16} className="text-amber-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
