"use client";

import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Navigation,
  PhoneCall,
  User,
  ChevronRight,
} from "lucide-react";

export function TodayScheduleTimeline({ scheduleData, onCallCustomer, onNavigateToJob, showToast }) {
  const defaultSchedule = [
    {
      id: "SCH-01",
      time: "09:30 AM",
      service: "Split AC Gas Top-up & Servicing",
      customer: "Sita Sharma",
      location: "Pragati Chowk, Phidim-4",
      status: "In Progress",
      statusColor: "bg-emerald-500 text-white",
      borderColor: "border-emerald-500",
    },
    {
      id: "SCH-02",
      time: "11:45 AM",
      service: "DishHome Fiber Router Relocation",
      customer: "Hari Luintel",
      location: "Bazar Line, Ward 2, Phidim",
      status: "Upcoming",
      statusColor: "bg-blue-500 text-white",
      borderColor: "border-blue-500",
    },
    {
      id: "SCH-03",
      time: "02:15 PM",
      service: "Washing Machine Motor Repair",
      customer: "Kamala Thapa",
      location: "Gadhi Mandir Road, Phidim-1",
      status: "Upcoming",
      statusColor: "bg-blue-500 text-white",
      borderColor: "border-blue-500",
    },
    {
      id: "SCH-04",
      time: "04:30 PM",
      service: "CCTV 4-Camera Installation",
      customer: "Bikash Shrestha",
      location: "Hotel Panchthar View, Phidim",
      status: "Upcoming",
      statusColor: "bg-blue-500 text-white",
      borderColor: "border-blue-500",
    },
    {
      id: "SCH-00",
      time: "08:00 AM",
      service: "Refrigerator Cooling Fan Replacement",
      customer: "Deepak Gurung",
      location: "Near Bus Park, Phidim",
      status: "Completed",
      statusColor: "bg-slate-500 text-white",
      borderColor: "border-slate-300 dark:border-slate-700",
    },
  ];

  const list = scheduleData || defaultSchedule;

  return (
    <div className="rounded-3xl bg-white dark:bg-[#061812] border border-slate-200/80 dark:border-emerald-900/30 p-5 sm:p-7 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-emerald-900/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Calendar size={20} />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              Today's Appointment Schedule
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              5 Appointments scheduled for Thursday, Phidim Field Operations
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast("Syncing calendar with Google Calendar...")}
          className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          Sync Calendar
        </button>
      </div>

      {/* Vertical Timeline Design */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-emerald-900/40">
        {list.map((item, idx) => {
          const isCompleted = item.status === "Completed";
          const isInProgress = item.status === "In Progress";

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="relative group"
            >
              {/* Timeline Bullet Node */}
              <span
                className={`absolute -left-6 top-1.5 w-5 h-5 rounded-full border-4 border-white dark:border-[#061812] transition-transform group-hover:scale-125 ${
                  isInProgress
                    ? "bg-emerald-500 ring-4 ring-emerald-500/20 animate-pulse"
                    : isCompleted
                    ? "bg-slate-400"
                    : "bg-blue-500"
                }`}
              />

              {/* Schedule Item Card */}
              <div className={`p-4 sm:p-5 rounded-3xl bg-slate-50/70 dark:bg-[#040e0b] border ${
                isInProgress
                  ? "border-emerald-400 dark:border-emerald-700/60 shadow-lg shadow-emerald-500/10"
                  : "border-slate-200/80 dark:border-emerald-900/30"
              } transition-all space-y-3`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-white dark:bg-[#061812] font-mono text-xs font-black text-slate-900 dark:text-white border border-slate-200 dark:border-emerald-800/40 flex items-center gap-1.5 shadow-xs">
                      <Clock size={13} className="text-emerald-500" />
                      {item.time}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono font-bold text-slate-400">
                    ID: {item.id}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    {item.service}
                  </h4>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300 font-medium">
                    <span className="flex items-center gap-1 font-bold text-slate-900 dark:text-white">
                      <User size={13} className="text-blue-500" /> {item.customer}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-emerald-500" /> {item.location}
                    </span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-200/60 dark:border-emerald-900/20">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onCallCustomer({ customerName: item.customer, phone: "+977 9842100000" })}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 text-blue-700 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800/40 flex items-center gap-1 text-[11px] transition-all"
                    >
                      <PhoneCall size={12} /> Call
                    </button>

                    <button
                      onClick={() => onNavigateToJob(item)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-1 text-[11px] transition-all"
                    >
                      <Navigation size={12} /> Route GPS
                    </button>
                  </div>

                  <span className="text-[11px] font-bold text-slate-400 hover:text-emerald-500 cursor-pointer flex items-center gap-0.5">
                    Details <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
