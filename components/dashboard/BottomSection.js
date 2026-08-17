"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Star,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  Terminal,
  Bell,
  UserCheck,
  CreditCard,
  Wrench,
  ThumbsUp,
  CornerDownRight,
  Filter,
} from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Saraswati Subedi",
    service: "DishHome Alignment",
    rating: 5,
    comment: "Subash Tamang arrived within 20 minutes in Phidim Ward 2 and fixed our DishHome signal perfectly!",
    time: "2 hours ago",
    avatar: "SS",
  },
  {
    id: 2,
    name: "Bikash Thapa",
    service: "4-Cam CCTV Setup",
    rating: 5,
    comment: "Extremely professional installation. The mobile app view is working crystal clear.",
    time: "5 hours ago",
    avatar: "BT",
  },
  {
    id: 3,
    name: "Ram Shrestha",
    service: "House Electrical Rewire",
    rating: 5,
    comment: "Very neat cable work and fair pricing for technical labor. Highly recommended in Panchthar!",
    time: "Yesterday",
    avatar: "RS",
  },
];

const ACTIVITIES = [
  {
    id: 1,
    icon: CheckCircle2,
    color: "bg-emerald-500 text-white",
    title: "Service Order #PS-9482 Completed",
    desc: "DishHome realignment completed by Prem Rai in Ward 1",
    time: "10 mins ago",
  },
  {
    id: 2,
    icon: UserCheck,
    color: "bg-blue-500 text-white",
    title: "Technician Dispatched",
    desc: "Niraj Sunuwar dispatched to 4-Cam CCTV Setup site",
    time: "32 mins ago",
  },
  {
    id: 3,
    icon: CreditCard,
    color: "bg-purple-500 text-white",
    title: "Payment Received via eSewa",
    desc: "NPR 18,900 received for Order #PS-9481 from Saraswati Subedi",
    time: "1 hour ago",
  },
  {
    id: 4,
    icon: Star,
    color: "bg-amber-500 text-white",
    title: "5-Star Review Received",
    desc: "Bikash Thapa rated CCTV Service 5/5 stars",
    time: "3 hours ago",
  },
];

const INITIAL_LOGS = [
  { level: "INFO", time: "17:45:02", msg: "API Gateway: Route /api/bookings/dispatch served in 12ms", color: "text-blue-400" },
  { level: "SUCCESS", time: "17:44:18", msg: "eSewa Webhook: Payment verified NPR 18,900 [Txn #ES-88219]", color: "text-emerald-400" },
  { level: "WARN", time: "17:42:30", msg: "Field Dispatch: High queue load in Phidim Bazaar Ward 1", color: "text-amber-400" },
  { level: "INFO", time: "17:40:10", msg: "Live Node: Phidim Server Node 01 heartbeat OK (Uptime 99.98%)", color: "text-blue-400" },
  { level: "SUCCESS", time: "17:35:45", msg: "Database: Postgres replication in sync across nodes", color: "text-emerald-400" },
];

export function BottomSection() {
  const [logs, setLogs] = useState(INITIAL_LOGS);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {/* 1. Latest Reviews */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Star className="text-amber-500 fill-amber-400" size={18} />
              Latest Reviews
            </h3>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer">
              View All
            </span>
          </div>

          <div className="space-y-3.5">
            {REVIEWS.map((r) => (
              <div
                key={r.id}
                className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-black text-[10px] flex items-center justify-center">
                      {r.avatar}
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{r.name}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold">
                    <Star size={12} className="fill-amber-400 stroke-amber-500" />
                    <span>{r.rating}.0</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic line-clamp-2">
                  "{r.comment}"
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{r.service}</span>
                  <span>{r.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 2. Recent Activities Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Clock className="text-blue-500" size={18} />
              Recent Activities
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 text-xs font-bold">
              Live Stream
            </span>
          </div>

          <div className="relative pl-4 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
            {ACTIVITIES.map((act) => {
              const ActIcon = act.icon;
              return (
                <div key={act.id} className="relative flex items-start gap-3">
                  <div className={`absolute -left-4 top-0.5 w-5 h-5 rounded-full ${act.color} flex items-center justify-center text-[10px] shadow`}>
                    <ActIcon size={11} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white leading-tight">
                      {act.title}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {act.desc}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">{act.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* 3. System Logs (Terminal Style) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-slate-950 rounded-[24px] border border-emerald-900/40 shadow-2xl p-6 flex flex-col justify-between text-slate-300 font-mono"
      >
        <div>
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-emerald-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white tracking-wider">SYSTEM LOGS</h3>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
              OK
            </span>
          </div>

          <div className="space-y-2 text-[11px] max-h-[220px] overflow-y-auto pr-1">
            {logs.map((log, index) => (
              <div key={index} className="leading-tight">
                <span className="text-slate-500">[{log.time}]</span>{" "}
                <span className={`font-bold ${log.color}`}>[{log.level}]</span>{" "}
                <span className="text-slate-300">{log.msg}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
          <span>Phidim Core Engine v2.4</span>
          <span className="text-emerald-400">99.98% Uptime</span>
        </div>
      </motion.div>

      {/* 4. Notifications Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Bell className="text-emerald-500" size={18} />
              Notification Feed
            </h3>
            <span className="text-xs text-slate-400 hover:text-emerald-600 cursor-pointer font-semibold">
              Clear All
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-500/20 text-xs">
              <p className="font-extrabold text-emerald-800 dark:text-emerald-300">Peak Demand Alert</p>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5 text-[11px]">
                High request volume for DTH Realignment in Phidim Bazaar Ward 1.
              </p>
              <span className="text-[10px] text-emerald-500 mt-1 block">5 mins ago</span>
            </div>

            <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-500/20 text-xs">
              <p className="font-extrabold text-blue-800 dark:text-blue-300">Technician Assigned</p>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5 text-[11px]">
                Subash Tamang accepted 4-Cam CCTV Setup in Ward 2.
              </p>
              <span className="text-[10px] text-blue-500 mt-1 block">22 mins ago</span>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-500/20 text-xs">
              <p className="font-extrabold text-amber-800 dark:text-amber-300">Weather Forecast</p>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5 text-[11px]">
                Rain predicted tomorrow afternoon. Outdoor DTH work may delay.
              </p>
              <span className="text-[10px] text-amber-500 mt-1 block">1 hour ago</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
