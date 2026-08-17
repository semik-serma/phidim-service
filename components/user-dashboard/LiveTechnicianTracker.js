"use client";

import { motion } from "motion/react";
import {
  Navigation,
  Phone,
  MessageSquare,
  ShieldCheck,
  Zap,
  MapPin,
  Clock,
  Gauge,
  Share2
} from "lucide-react";

export function LiveTechnicianTracker({ booking, onCall, onChat }) {
  const tech = booking?.technician || {
    name: "Rajesh Tamang",
    rating: 4.95,
    phone: "+977 9842109842",
    avatar: "RT",
    specialty: "CCTV & DTH Specialist",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-emerald-900/30 shadow-sm p-4 space-y-3.5 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Navigation className="text-amber-500 animate-spin-slow" size={16} />
          <h3 className="text-xs font-black text-slate-900 dark:text-white tracking-tight">
            Live GPS Tracker
          </h3>
          <span className="px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 text-[10px] font-extrabold border border-amber-500/30">
            En Route
          </span>
        </div>

        <button className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 cursor-pointer">
          <Share2 size={11} />
          <span>Share GPS</span>
        </button>
      </div>

      {/* Simulated Interactive Map Display */}
      <div className="relative w-full h-[150px] rounded-xl bg-slate-950 overflow-hidden border border-emerald-500/30 flex items-center justify-center">
        {/* Map Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(#10B981 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Route Line Path */}
        <svg className="absolute inset-0 w-full h-full stroke-emerald-500/60 stroke-dasharray-4" strokeWidth="2.5" fill="none">
          <path d="M 40,110 C 120,90 180,60 280,40" strokeDasharray="5 5" className="animate-pulse" />
        </svg>

        {/* Destination Pin (User House) */}
        <div className="absolute top-5 right-8 flex flex-col items-center">
          <div className="px-1.5 py-0.5 rounded-lg bg-emerald-600 text-white text-[9px] font-black shadow mb-0.5">
            Your Doorstep
          </div>
          <div className="w-5 h-5 rounded-full bg-emerald-500/30 border border-emerald-400 flex items-center justify-center animate-ping">
            <MapPin size={12} className="text-emerald-400" />
          </div>
        </div>

        {/* Moving Technician Vehicle Marker */}
        <div className="absolute bottom-5 left-8 flex flex-col items-center animate-bounce">
          <div className="px-1.5 py-0.5 rounded-lg bg-amber-500 text-slate-950 text-[9px] font-extrabold shadow mb-0.5">
            {tech.name} (Bike)
          </div>
          <div className="w-6 h-6 rounded-full bg-amber-500/40 border border-amber-400 flex items-center justify-center">
            <Zap size={13} className="text-amber-300 fill-amber-300" />
          </div>
        </div>

        {/* Floating ETA Info */}
        <div className="absolute bottom-2 right-2 bg-slate-950/85 backdrop-blur-md border border-emerald-500/30 px-2.5 py-1 rounded-lg flex items-center gap-2 text-white">
          <span className="text-[9px] text-slate-400 font-bold">ETA:</span>
          <span className="text-xs font-black text-amber-400 font-mono">8 Mins</span>
          <span className="text-[9px] text-slate-400 font-mono">| 1.2 km away</span>
        </div>
      </div>

      {/* Technician Details & Quick Controls */}
      <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
            {typeof tech.avatar === "string" && tech.avatar.length <= 2 ? tech.avatar : "RT"}
          </div>
          <div className="min-w-0">
            <p className="font-black text-slate-900 dark:text-white text-xs truncate">{tech.name}</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{tech.specialty}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onCall ? onCall(tech, "voice") : null}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-sm transition-all cursor-pointer"
            title="Call Technician"
          >
            <Phone size={12} />
            <span>Call</span>
          </button>

          <button
            onClick={() => onChat ? onChat(tech) : null}
            className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-500/20 hover:bg-blue-100 transition-colors cursor-pointer"
            title="Chat with Technician"
          >
            <MessageSquare size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
