"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Tv,
  Camera,
  Zap,
  Monitor,
  Droplet,
  AirVent,
  Star,
  UserCheck,
  CheckCircle2,
  Clock,
  Navigation,
  XCircle,
  ChevronRight,
  MoreVertical,
  Calendar,
} from "lucide-react";
import { getBookingsList, subscribeBookings } from "@/lib/bookingStore";

export const STATUS_CLASSES = {
  Pending: {
    badge: "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800",
    dot: "bg-amber-500",
    icon: Clock,
  },
  Accepted: {
    badge: "bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800",
    dot: "bg-blue-500",
    icon: CheckCircle2,
  },
  "Technician Assigned": {
    badge: "bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800",
    dot: "bg-purple-500",
    icon: UserCheck,
  },
  "On The Way": {
    badge: "bg-orange-100 dark:bg-orange-950/80 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-800",
    dot: "bg-orange-500",
    icon: Navigation,
  },
  "In Progress": {
    badge: "bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800",
    dot: "bg-cyan-500",
    icon: Clock,
  },
  Completed: {
    badge: "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
    dot: "bg-emerald-500",
    icon: CheckCircle2,
  },
  Cancelled: {
    badge: "bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800",
    dot: "bg-red-500",
    icon: XCircle,
  },
};

const TOP_SERVICES = [
  { name: "DishHome DTH Realignment", bookings: 480, icon: Tv, percentage: 92, color: "from-emerald-500 to-teal-600" },
  { name: "4K CCTV Setup", bookings: 360, icon: Camera, percentage: 76, color: "from-blue-500 to-indigo-600" },
  { name: "Electrical Rewiring", bookings: 290, icon: Zap, percentage: 62, color: "from-purple-500 to-violet-600" },
  { name: "Computer & Network Tech", bookings: 220, icon: Monitor, percentage: 48, color: "from-amber-500 to-orange-600" },
  { name: "Sanitary & Plumbing", bookings: 180, icon: Droplet, percentage: 38, color: "from-cyan-500 to-blue-600" },
  { name: "AC Repair & Servicing", bookings: 140, icon: AirVent, percentage: 28, color: "from-pink-500 to-rose-600" },
];

const TOP_TECHNICIANS = [
  {
    name: "Rajesh Tamang",
    specialty: "CCTV & Fiber Network",
    rating: 4.98,
    jobs: 192,
    online: true,
    avatar: "RT",
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "Anita Gurung",
    specialty: "AC & Cooling Specialist",
    rating: 4.95,
    jobs: 165,
    online: true,
    avatar: "AG",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Niraj Sunuwar",
    specialty: "DishHome DTH Specialist",
    rating: 4.88,
    jobs: 148,
    online: false,
    avatar: "NS",
    color: "from-purple-500 to-violet-600",
  },
  {
    name: "Subash Tamang",
    specialty: "Master Electrician",
    rating: 4.85,
    jobs: 112,
    online: true,
    avatar: "ST",
    color: "from-amber-500 to-orange-600",
  },
];

export function MiddleRow() {
  const [liveBookings, setLiveBookings] = useState([]);

  useEffect(() => {
    setLiveBookings(getBookingsList().slice(0, 5));
    const unsub = subscribeBookings((list) => {
      setLiveBookings(list.slice(0, 5));
    });
    return unsub;
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Top Services (1 Column) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Top Services
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Most booked technical categories
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/30">
              Ranked
            </span>
          </div>

          <div className="space-y-4">
            {TOP_SERVICES.map((s) => (
              <div key={s.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      <s.icon size={15} className="text-emerald-500" />
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                      {s.name}
                    </span>
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-white font-mono flex-shrink-0">
                    {s.bookings} Bookings
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="mt-5 w-full py-2.5 text-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-xl transition-colors flex items-center justify-center gap-1">
          <span>View All Service Categories</span>
          <ChevronRight size={14} />
        </button>
      </motion.div>

      {/* Recent Bookings (1 Column) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Recent Bookings
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Latest customer service dispatches
              </p>
            </div>
            <button className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {liveBookings.map((b) => {
              const statusCfg = STATUS_CLASSES[b.status] || STATUS_CLASSES.Pending;
              const StatusIcon = statusCfg.icon || Clock;
              const avatarInitials = (b.customerName || b.customer || "User").substring(0, 2).toUpperCase();

              return (
                <div
                  key={b.id}
                  className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/80 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                      {avatarInitials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                          {b.customerName || b.customer || "Phidim Customer"}
                        </p>
                        <span className="text-[10px] text-slate-400 font-mono">
                          #{b.id}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {b.serviceName || b.service}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-xs font-black text-slate-900 dark:text-white font-mono">
                      {b.amount}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${statusCfg.badge}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                      {b.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button className="mt-5 w-full py-2.5 text-center text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors">
          Manage All Bookings
        </button>
      </motion.div>

      {/* Top Technicians (1 Column) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Top Technicians
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Highest rated field specialists
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/30">
              Field Ready
            </span>
          </div>

          <div className="space-y-3.5">
            {TOP_TECHNICIANS.map((t) => (
              <div
                key={t.name}
                className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/80 transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${t.color} text-white font-black text-xs flex items-center justify-center shadow-md`}
                    >
                      {t.avatar}
                    </div>
                    {t.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                      {t.name}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {t.specialty}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <div className="flex items-center gap-1 text-xs font-black text-amber-500">
                    <Star size={13} className="fill-amber-400 stroke-amber-500" />
                    <span>{t.rating}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {t.jobs} Jobs Done
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="mt-5 w-full py-2.5 text-center text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-xl transition-colors flex items-center justify-center gap-1">
          <span>View Technician Roster (164)</span>
          <ChevronRight size={14} />
        </button>
      </motion.div>
    </div>
  );
}
