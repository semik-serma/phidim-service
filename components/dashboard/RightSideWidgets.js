"use client";

import { motion } from "motion/react";
import {
  Sun,
  CloudSun,
  Wind,
  Droplets,
  Server,
  Activity,
  Cpu,
  HardDrive,
  Database,
  MapPin,
  CheckCircle2,
  Zap,
  Users,
  DollarSign,
  Briefcase,
  TrendingUp,
} from "lucide-react";

export function RightSideWidgets() {
  const panchtharWards = [
    { name: "Phidim Bazaar (Ward 1)", status: "High Demand", activeTechs: 8, jobs: 12, dot: "bg-emerald-500" },
    { name: "Yashok / Kummayak", status: "Active", activeTechs: 5, jobs: 6, dot: "bg-blue-500" },
    { name: "Ranitar (Ward 4)", status: "Active", activeTechs: 4, jobs: 4, dot: "bg-emerald-500" },
    { name: "Tharpu / Yangnam", status: "Moderate", activeTechs: 3, jobs: 3, dot: "bg-amber-500" },
    { name: "Rabi / Miklajung", status: "Dispatched", activeTechs: 4, jobs: 5, dot: "bg-purple-500" },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Today's Live Summary Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-[24px] text-white p-6 shadow-xl relative overflow-hidden"
      >
        <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-emerald-400/20 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-200">
              Live Operations
            </span>
            <h3 className="text-xl font-black tracking-tight">Today's Summary</h3>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30">
            Aug 4, 2026
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3.5 my-2">
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-[10px] font-bold text-emerald-200 uppercase">Today's Revenue</span>
            <p className="text-lg font-black tracking-tight font-mono mt-0.5">NPR 68,400</p>
            <span className="text-[10px] text-emerald-300 font-semibold">+18.5% today</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-[10px] font-bold text-emerald-200 uppercase">Active Techs</span>
            <p className="text-lg font-black tracking-tight font-mono mt-0.5">24 Techs</p>
            <span className="text-[10px] text-emerald-300 font-semibold">18 in field</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-[10px] font-bold text-emerald-200 uppercase">Live Jobs</span>
            <p className="text-lg font-black tracking-tight font-mono mt-0.5">18 Active</p>
            <span className="text-[10px] text-emerald-300 font-semibold">4 pending</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-[10px] font-bold text-emerald-200 uppercase">Online Users</span>
            <p className="text-lg font-black tracking-tight font-mono mt-0.5">412 Active</p>
            <span className="text-[10px] text-emerald-300 font-semibold">Phidim App</span>
          </div>
        </div>
      </motion.div>

      {/* 2. Weather Widget (Phidim, Panchthar) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CloudSun className="text-amber-500" size={20} />
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Phidim Weather</h4>
              <p className="text-[10px] text-slate-400">Panchthar District, Nepal</p>
            </div>
          </div>
          <span className="text-xl font-black text-slate-900 dark:text-white font-mono">24°C</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
            <Sun size={14} className="text-amber-500 mx-auto mb-1" />
            <span className="text-[10px] text-slate-400 block">Condition</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">Partly Sunny</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
            <Droplets size={14} className="text-blue-500 mx-auto mb-1" />
            <span className="text-[10px] text-slate-400 block">Humidity</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">62%</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
            <Wind size={14} className="text-teal-500 mx-auto mb-1" />
            <span className="text-[10px] text-slate-400 block">Wind</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">8 km/h</span>
          </div>
        </div>
      </motion.div>

      {/* 3. Panchthar Map Coverage Hotspots */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="text-emerald-500" size={18} />
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Panchthar Service Coverage</h4>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
            5 Wards Active
          </span>
        </div>

        {/* Coverage Hotspots List */}
        <div className="space-y-2.5 my-3">
          {panchtharWards.map((w) => (
            <div key={w.name} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${w.dot} animate-pulse`} />
                <span className="font-bold text-slate-800 dark:text-slate-200">{w.name}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="text-slate-500">{w.activeTechs} Techs</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{w.jobs} Jobs</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 4. Server Status & System Health Meter */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Server className="text-blue-500" size={18} />
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Server Health</h4>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            99.98% Uptime
          </span>
        </div>

        <div className="space-y-3 text-xs">
          {/* CPU Meter */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                <Cpu size={12} className="text-emerald-500" /> CPU Load
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">14%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[14%]" />
            </div>
          </div>

          {/* RAM Usage Meter */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                <Activity size={12} className="text-blue-500" /> Memory (RAM)
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">38% (6.1 GB)</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full w-[38%]" />
            </div>
          </div>

          {/* Database Storage Meter */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                <Database size={12} className="text-purple-500" /> PostgreSQL DB
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">26% (26 GB)</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full w-[26%]" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
