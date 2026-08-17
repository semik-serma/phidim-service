"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Star, Smile, ThumbsUp, TrendingUp, PieChart as PieIcon, DollarSign } from "lucide-react";

const REVENUE_PIE = [
  { name: "DishHome DTH", value: 42, color: "#16a34a" },
  { name: "CCTV Setup", value: 28, color: "#2563eb" },
  { name: "Electrical", value: 16, color: "#8b5cf6" },
  { name: "Computer Repair", value: 8, color: "#f59e0b" },
  { name: "Plumbing", value: 6, color: "#06b6d4" },
];

const STATUS_DOUGHNUT = [
  { name: "Completed", value: 64, color: "#22c55e" },
  { name: "On The Way", value: 18, color: "#f97316" },
  { name: "Accepted", value: 10, color: "#2563eb" },
  { name: "Pending", value: 5, color: "#f59e0b" },
  { name: "Cancelled", value: 3, color: "#ef4444" },
];

const WEEKLY_EARNINGS = [
  { day: "Mon", current: 42000, previous: 38000 },
  { day: "Tue", current: 58000, previous: 44000 },
  { day: "Wed", current: 49000, previous: 42000 },
  { day: "Thu", current: 64000, previous: 51000 },
  { day: "Fri", current: 78000, previous: 62000 },
  { day: "Sat", current: 86000, previous: 71000 },
  { day: "Sun", current: 62000, previous: 55000 },
];

function ChartTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 dark:bg-slate-900/95 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-3 text-xs backdrop-blur-md">
        <p className="font-extrabold text-slate-900 dark:text-white">{payload[0].name || label}</p>
        <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-1">
          {typeof payload[0].value === "number" && payload[0].value > 100
            ? `NPR ${payload[0].value.toLocaleString()}`
            : `${payload[0].value}%`}
        </p>
      </div>
    );
  }
  return null;
}

export function ThirdRowAnalytics() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {/* 1. Revenue Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              Revenue Breakdown
            </h3>
            <span className="p-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
              <PieIcon size={16} />
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Percentage share by service sector
          </p>

          <div className="h-[200px] relative">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={REVENUE_PIE}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {REVENUE_PIE.map((entry, index) => (
                    <Cell key={index} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-bold text-slate-400">Total</span>
              <span className="text-sm font-black text-slate-900 dark:text-white font-mono">100%</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {REVENUE_PIE.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 2. Booking Status Doughnut */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              Booking Status Ratio
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 text-xs font-extrabold">
              Live
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Completed, On The Way & Pending requests
          </p>

          <div className="h-[200px] relative">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={STATUS_DOUGHNUT}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {STATUS_DOUGHNUT.map((entry, index) => (
                    <Cell key={index} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-extrabold text-emerald-500">64%</span>
              <span className="text-[10px] text-slate-400 font-bold">Done</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {STATUS_DOUGHNUT.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3. Weekly Earnings Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              Weekly Earnings
            </h3>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
              +16.4% vs last week
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Daily payout revenue comparison
          </p>

          <div className="h-[210px] w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_EARNINGS} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11, fontWeight: 600 }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 10, fontWeight: 600 }}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="current" fill="#16a34a" name="This Week" radius={[6, 6, 0, 0]} maxBarSize={16} />
                <Bar dataKey="previous" fill="#94a3b8" name="Last Week" radius={[6, 6, 0, 0]} maxBarSize={16} />
              </BarChart>
            </ResponsiveContainer>
            )}
          </div>
        </div>
      </motion.div>

      {/* 4. Customer Satisfaction Gauge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              Customer CSAT
            </h3>
            <span className="p-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500">
              <Star size={16} className="fill-amber-400" />
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Service satisfaction rating across Panchthar
          </p>

          <div className="flex flex-col items-center justify-center my-4">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100 dark:text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500 transition-all duration-1000 ease-out"
                  strokeDasharray="98.4, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center text-center">
                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  98.4%
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  4.92 / 5.0 ⭐
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between text-slate-500">
              <span>5-Star Ratings</span>
              <span className="font-bold text-slate-900 dark:text-white">92%</span>
            </div>
            <div className="flex items-center justify-between text-slate-500">
              <span>4-Star Ratings</span>
              <span className="font-bold text-slate-900 dark:text-white">6.4%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
