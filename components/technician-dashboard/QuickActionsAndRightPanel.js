"use client";

import { motion } from "motion/react";
import {
  Power,
  Navigation,
  AlertTriangle,
  HelpCircle,
  Wallet,
  Upload,
  Sun,
  CloudSun,
  Car,
  Lightbulb,
  Bell,
  Calendar,
  ChevronRight,
  ShieldAlert,
  Zap,
} from "lucide-react";

export function QuickActionsAndRightPanel({
  isOnline,
  setIsOnline,
  onOpenSos,
  onNavigateToJob,
  onViewWallet,
  onUploadDocs,
  showToast,
}) {
  const notifications = [
    { title: "New Job Assigned", time: "10m ago", desc: "Split AC Servicing #PS-9842", type: "job" },
    { title: "Payment Received", time: "1h ago", desc: "Rs. 2,450 added to Phidim Wallet", type: "payment" },
    { title: "5-Star Review", time: "3h ago", desc: "Anil Shrestha left a 5.0 rating", type: "review" },
    { title: "Schedule Reminder", time: "5h ago", desc: "Appointment at 02:15 PM in Ward 1", type: "reminder" },
    { title: "System Update", time: "1d ago", desc: "Dispatch algorithm updated to v4.2", type: "system" },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="rounded-3xl bg-white dark:bg-[#061812] border border-slate-200/80 dark:border-emerald-900/30 p-5 sm:p-6 shadow-xl space-y-4">
        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Zap size={16} className="text-emerald-500" /> Quick Command Center
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <button
            onClick={() => {
              const next = !isOnline;
              setIsOnline(next);
              showToast(next ? "Switched to Available Mode" : "Switched to Offline Mode");
            }}
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#040e0b] hover:bg-emerald-50 dark:hover:bg-emerald-950/50 border border-slate-200 dark:border-emerald-900/30 font-bold text-slate-800 dark:text-slate-200 transition-all flex flex-col items-center gap-1.5 text-center group"
          >
            <Power size={20} className="text-emerald-500 group-hover:scale-110 transition-transform" />
            <span>Update Availability</span>
          </button>

          <button
            onClick={onNavigateToJob}
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#040e0b] hover:bg-teal-50 dark:hover:bg-teal-950/50 border border-slate-200 dark:border-emerald-900/30 font-bold text-slate-800 dark:text-slate-200 transition-all flex flex-col items-center gap-1.5 text-center group"
          >
            <Navigation size={20} className="text-teal-500 group-hover:scale-110 transition-transform" />
            <span>Start Navigation</span>
          </button>

          <button
            onClick={onOpenSos}
            className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 border border-rose-200 dark:border-rose-800/40 font-bold text-rose-600 dark:text-rose-400 transition-all flex flex-col items-center gap-1.5 text-center group animate-pulse"
          >
            <ShieldAlert size={20} className="text-rose-500 group-hover:scale-110 transition-transform" />
            <span>Emergency SOS</span>
          </button>

          <button
            onClick={() => showToast("Connecting to 24/7 Phidim Technician Helpline...")}
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#040e0b] hover:bg-blue-50 dark:hover:bg-blue-950/50 border border-slate-200 dark:border-emerald-900/30 font-bold text-slate-800 dark:text-slate-200 transition-all flex flex-col items-center gap-1.5 text-center group"
          >
            <HelpCircle size={20} className="text-blue-500 group-hover:scale-110 transition-transform" />
            <span>Contact Support</span>
          </button>

          <button
            onClick={onViewWallet}
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#040e0b] hover:bg-emerald-50 dark:hover:bg-emerald-950/50 border border-slate-200 dark:border-emerald-900/30 font-bold text-slate-800 dark:text-slate-200 transition-all flex flex-col items-center gap-1.5 text-center group"
          >
            <Wallet size={20} className="text-emerald-500 group-hover:scale-110 transition-transform" />
            <span>View Wallet</span>
          </button>

          <button
            onClick={onUploadDocs}
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#040e0b] hover:bg-purple-50 dark:hover:bg-purple-950/50 border border-slate-200 dark:border-emerald-900/30 font-bold text-slate-800 dark:text-slate-200 transition-all flex flex-col items-center gap-1.5 text-center group"
          >
            <Upload size={20} className="text-purple-500 group-hover:scale-110 transition-transform" />
            <span>Upload Documents</span>
          </button>
        </div>
      </div>

      {/* Right Widgets Column */}
      <div className="space-y-6">
        {/* Weather & Traffic Widget */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 text-white p-5 shadow-xl border border-emerald-700/40 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CloudSun size={24} className="text-amber-400 animate-pulse" />
              <div>
                <h5 className="font-extrabold text-sm">Phidim, Nepal</h5>
                <p className="text-[10px] text-emerald-300">Panchthar Weather Station</p>
              </div>
            </div>
            <span className="text-2xl font-black font-mono">24°C</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
              <span className="text-emerald-300 font-bold block">Humidity & Rain</span>
              <p className="font-semibold text-white">42% • Clear Skies</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
              <span className="text-amber-300 font-bold block flex items-center gap-1">
                <Car size={12} /> Traffic Flow
              </span>
              <p className="font-semibold text-white">Light Traffic (Phidim Hwy)</p>
            </div>
          </div>
        </div>

        {/* Daily Technician Tip */}
        <div className="rounded-3xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/40 p-5 space-y-2">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-black text-xs uppercase tracking-wider">
            <Lightbulb size={16} className="text-amber-500" /> Daily Technician Pro Tip
          </div>
          <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
            "Always inspect electrical grounding before turning on high-voltage AC compressors. Collecting customer signature immediately after service increases tip probability by 35%!"
          </p>
        </div>

        {/* Recent Notifications Feed */}
        <div className="rounded-3xl bg-white dark:bg-[#061812] border border-slate-200/80 dark:border-emerald-900/30 p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-emerald-900/20">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Bell size={14} className="text-emerald-500" /> Notifications Feed
            </h4>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">5 Unread</span>
          </div>

          <div className="space-y-3">
            {notifications.map((notif, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs pb-2 border-b border-slate-100 dark:border-slate-800/40 last:border-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h6 className="font-bold text-slate-900 dark:text-white truncate">{notif.title}</h6>
                    <span className="text-[10px] text-slate-400 font-mono">{notif.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{notif.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
