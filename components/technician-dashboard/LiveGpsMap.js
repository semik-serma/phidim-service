"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Navigation,
  MapPin,
  Compass,
  Layers,
  Zap,
  PhoneCall,
  Clock,
  Sparkles,
  ShieldCheck,
  Maximize2,
  Minimize2,
} from "lucide-react";

export function LiveGpsMap({ activeJob, onCallCustomer, showToast }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [mapStyle, setMapStyle] = useState("vector"); // 'vector' | 'satellite' | 'dark'
  const [isFullscreen, setIsFullscreen] = useState(false);

  const startNavigation = () => {
    setIsNavigating(true);
    showToast("Launching turn-by-turn Voice & GPS Navigation via Google Maps...");
  };

  return (
    <div className={`rounded-3xl bg-white dark:bg-[#061812] border border-slate-200/80 dark:border-emerald-900/30 p-5 sm:p-7 shadow-xl space-y-5 ${
      isFullscreen ? "fixed inset-4 z-50 overflow-y-auto bg-white dark:bg-[#061812]" : ""
    }`}>
      {/* Map Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-emerald-900/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            <Navigation size={20} className={isNavigating ? "animate-spin" : ""} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Live GPS Radar & Dispatch Map
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500 text-white font-mono font-bold text-xs">
                Google Maps Engine
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Phidim Sector 4 • Real-time traffic, route optimization & customer location pins
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Map Layer Selector */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-800/40 text-xs font-bold">
            {["vector", "satellite", "dark"].map((st) => (
              <button
                key={st}
                onClick={() => setMapStyle(st)}
                className={`px-2.5 py-1 rounded-xl capitalize transition-all ${
                  mapStyle === st
                    ? "bg-emerald-500 text-white shadow-xs"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-2xl bg-slate-100 dark:bg-emerald-950/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-all border border-slate-200 dark:border-emerald-800/40"
            title="Toggle Map Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* Styled Canvas Simulated Map Container */}
      <div className={`relative overflow-hidden rounded-3xl border border-slate-200 dark:border-emerald-900/40 shadow-inner min-h-[360px] sm:min-h-[420px] transition-all ${
        mapStyle === "dark"
          ? "bg-[#0b1b16]"
          : mapStyle === "satellite"
          ? "bg-slate-800"
          : "bg-[#e5eef0]"
      }`}>
        {/* Map Grid / Streets Vector Graphics */}
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-500" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Simulated Roads / Highways */}
          <path d="M 0 180 Q 200 150 400 220 T 800 200" fill="none" stroke="#16a34a" strokeWidth="6" opacity="0.6" />
          <path d="M 120 0 L 120 400" fill="none" stroke="#2563eb" strokeWidth="4" opacity="0.5" />
          <path d="M 450 0 C 420 150 480 250 450 400" fill="none" stroke="#f59e0b" strokeWidth="4" opacity="0.5" />
        </svg>

        {/* Animated GPS Route Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.path
            d="M 140 280 Q 280 200 460 140"
            fill="none"
            stroke="#16a34a"
            strokeWidth="5"
            strokeDasharray="8 8"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          />
        </svg>

        {/* Technician Marker Pin (Pulse animation) */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute left-[140px] top-[280px] -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <div className="relative group cursor-pointer">
            <span className="absolute -inset-3 rounded-full bg-emerald-500/30 animate-ping" />
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-2xl border-2 border-white ring-4 ring-emerald-500/30">
              <Compass size={24} className="animate-spin" />
            </div>
            {/* Tooltip Label */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-xl whitespace-nowrap shadow-lg border border-emerald-500/50">
              📍 Rajesh (Your Location)
            </div>
          </div>
        </motion.div>

        {/* Customer Destination Pin */}
        <div className="absolute left-[460px] top-[140px] -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative group cursor-pointer">
            <span className="absolute -inset-3 rounded-full bg-rose-500/30 animate-pulse" />
            <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-2xl border-2 border-white ring-4 ring-rose-500/30">
              <MapPin size={22} />
            </div>
            {/* Tooltip Label */}
            <div className="absolute top-13 left-1/2 -translate-x-1/2 bg-rose-950 text-rose-200 text-[10px] font-extrabold px-2.5 py-1 rounded-xl whitespace-nowrap shadow-lg border border-rose-500/50">
              🏠 {activeJob ? activeJob.customerName : "Sita Sharma"} (Destination)
            </div>
          </div>
        </div>

        {/* Floating Top GPS Info Card */}
        <div className="absolute top-4 left-4 right-4 sm:right-auto z-20 bg-white/90 dark:bg-[#061812]/90 backdrop-blur-xl border border-slate-200 dark:border-emerald-800/50 p-4 rounded-2xl shadow-2xl max-w-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Live GPS Telemetry
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-800">
              GPS Lock 99.8%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-900/40">
              <span className="text-[10px] text-slate-400 font-bold block">Distance to Job</span>
              <p className="text-sm font-black text-slate-900 dark:text-white font-mono">1.8 km</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-900/40">
              <span className="text-[10px] text-slate-400 font-bold block">Estimated Arrival</span>
              <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">8 Mins (Fast)</p>
            </div>
          </div>

          {/* Turn-by-Turn Navigation Button */}
          <div className="pt-1">
            <button
              onClick={startNavigation}
              className={`w-full py-2.5 px-4 rounded-xl font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 ${
                isNavigating
                  ? "bg-teal-600 text-white animate-pulse"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30"
              }`}
            >
              <Navigation size={16} />
              <span>{isNavigating ? "Navigation Active (Google Maps)" : "Start Turn-by-Turn Navigation"}</span>
            </button>
          </div>
        </div>

        {/* Floating Bottom Quick Actions */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => onCallCustomer(activeJob || { customerName: "Sita Sharma", phone: "+977 9842109842" })}
            className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-xl flex items-center gap-2 text-xs font-bold transition-all active:scale-95"
          >
            <PhoneCall size={16} />
            <span className="hidden sm:inline">Call Customer</span>
          </button>
        </div>
      </div>
    </div>
  );
}
