"use client";

import { motion } from "motion/react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Wallet,
  Star,
  Zap,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

export function TechnicianTopStats({ statsData }) {
  const defaultStats = [
    {
      id: "todays-jobs",
      label: "Today's Jobs",
      value: "8",
      growth: "+2 vs yesterday",
      isPositive: true,
      icon: Calendar,
      gradient: "from-emerald-500 to-teal-600",
      lightBg: "bg-emerald-50 dark:bg-emerald-950/40",
      borderColor: "border-emerald-200 dark:border-emerald-800/40",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      id: "completed-jobs",
      label: "Completed Jobs",
      value: "5",
      growth: "62.5% done",
      isPositive: true,
      icon: CheckCircle2,
      gradient: "from-blue-500 to-indigo-600",
      lightBg: "bg-blue-50 dark:bg-blue-950/40",
      borderColor: "border-blue-200 dark:border-blue-800/40",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      id: "pending-jobs",
      label: "Pending Jobs",
      value: "3",
      growth: "Estimated 2h 15m",
      isPositive: false,
      icon: Clock,
      gradient: "from-amber-500 to-orange-600",
      lightBg: "bg-amber-50 dark:bg-amber-950/40",
      borderColor: "border-amber-200 dark:border-amber-800/40",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      id: "todays-earnings",
      label: "Today's Earnings",
      value: "Rs. 4,850",
      growth: "+18.4% this week",
      isPositive: true,
      icon: Wallet,
      gradient: "from-emerald-600 to-green-700",
      lightBg: "bg-emerald-50 dark:bg-emerald-950/50",
      borderColor: "border-emerald-300 dark:border-emerald-800/60",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      id: "rating",
      label: "Rating & CSAT",
      value: "4.95 ★",
      growth: "Based on 148 reviews",
      isPositive: true,
      icon: Star,
      gradient: "from-yellow-500 to-amber-600",
      lightBg: "bg-amber-50 dark:bg-amber-950/40",
      borderColor: "border-amber-200 dark:border-amber-800/40",
      iconColor: "text-amber-500 dark:text-amber-400",
    },
    {
      id: "acceptance-rate",
      label: "Acceptance Rate",
      value: "98.2%",
      growth: "+1.2% this month",
      isPositive: true,
      icon: Zap,
      gradient: "from-teal-500 to-cyan-600",
      lightBg: "bg-teal-50 dark:bg-teal-950/40",
      borderColor: "border-teal-200 dark:border-teal-800/40",
      iconColor: "text-teal-600 dark:text-teal-400",
    },
  ];

  const stats = statsData || defaultStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`relative overflow-hidden rounded-3xl p-5 bg-white dark:bg-[#061812] border ${stat.borderColor} shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-2xl transition-all duration-300 group`}
          >
            {/* Background Subtle Gradient Glow */}
            <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 group-hover:opacity-20 transition-opacity blur-xl`} />

            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-2xl ${stat.lightBg} flex items-center justify-center ${stat.iconColor} border ${stat.borderColor} group-hover:scale-110 transition-transform`}>
                <Icon size={22} />
              </div>

              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
                <TrendingUp size={11} />
                <span>{stat.growth}</span>
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight font-mono">
                {stat.value}
              </h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">
                {stat.label}
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-emerald-900/20 flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span>Updated Live</span>
              <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-slate-400 group-hover:text-emerald-500" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
