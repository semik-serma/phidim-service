"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Calendar,
  Filter,
  Layers,
  ArrowUpRight,
  Download,
  BarChart2,
} from "lucide-react";

const TIME_DATA = {
  "7d": [
    { label: "Mon", revenue: 42000, bookings: 28, completed: 25 },
    { label: "Tue", revenue: 58000, bookings: 36, completed: 34 },
    { label: "Wed", revenue: 49000, bookings: 31, completed: 29 },
    { label: "Thu", revenue: 64000, bookings: 42, completed: 40 },
    { label: "Fri", revenue: 78000, bookings: 52, completed: 48 },
    { label: "Sat", revenue: 86000, bookings: 58, completed: 54 },
    { label: "Sun", revenue: 62000, bookings: 39, completed: 37 },
  ],
  "30d": [
    { label: "Week 1", revenue: 380000, bookings: 240, completed: 220 },
    { label: "Week 2", revenue: 490000, bookings: 310, completed: 295 },
    { label: "Week 3", revenue: 560000, bookings: 380, completed: 360 },
    { label: "Week 4", revenue: 680000, bookings: 450, completed: 425 },
  ],
  "90d": [
    { label: "Month 1", revenue: 1650000, bookings: 1100, completed: 1020 },
    { label: "Month 2", revenue: 1980000, bookings: 1350, completed: 1280 },
    { label: "Month 3", revenue: 2485000, bookings: 1680, completed: 1590 },
  ],
  "12m": [
    { label: "Jan", revenue: 1200000, bookings: 850, completed: 810 },
    { label: "Feb", revenue: 1350000, bookings: 920, completed: 880 },
    { label: "Mar", revenue: 1480000, bookings: 1040, completed: 990 },
    { label: "Apr", revenue: 1620000, bookings: 1150, completed: 1090 },
    { label: "May", revenue: 1790000, bookings: 1260, completed: 1210 },
    { label: "Jun", revenue: 1950000, bookings: 1380, completed: 1320 },
    { label: "Jul", revenue: 2180000, bookings: 1510, completed: 1440 },
    { label: "Aug", revenue: 2485000, bookings: 1680, completed: 1590 },
    { label: "Sep", revenue: 2620000, bookings: 1790, completed: 1710 },
    { label: "Oct", revenue: 2780000, bookings: 1880, completed: 1800 },
    { label: "Nov", revenue: 2950000, bookings: 1990, completed: 1910 },
    { label: "Dec", revenue: 3200000, bookings: 2150, completed: 2060 },
  ],
};

const CATEGORY_DEMAND = [
  { name: "DishHome DTH", bookings: 1240, color: "#16a34a" },
  { name: "CCTV Setup", bookings: 980, color: "#2563eb" },
  { name: "Electrical", bookings: 850, color: "#8b5cf6" },
  { name: "Computer Tech", bookings: 640, color: "#f59e0b" },
  { name: "Plumbing", bookings: 420, color: "#06b6d4" },
  { name: "AC Servicing", bookings: 320, color: "#ec4899" },
];

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 dark:bg-slate-900/95 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-4 min-w-[200px] backdrop-blur-md">
        <p className="text-xs font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-1.5 mb-2">
          {label} Summary
        </p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-3 text-xs py-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-slate-500 dark:text-slate-400 font-medium">{entry.name}:</span>
            </div>
            <span className="font-extrabold text-slate-900 dark:text-white">
              {entry.name.includes("Revenue")
                ? `NPR ${Number(entry.value).toLocaleString()}`
                : `${entry.value} Bookings`}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function AnalyticsCharts() {
  const [mounted, setMounted] = useState(false);
  const [period, setPeriod] = useState("7d");
  const [chartType, setChartType] = useState("area"); // 'area' | 'bar'

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = TIME_DATA[period] || TIME_DATA["7d"];

  return (
    <div className="space-y-6">
      {/* Booking & Revenue Analytics Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6 sm:p-7"
      >
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Booking & Revenue Analytics
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/30">
                Live Data
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Realtime booking dispatches and total revenue in Panchthar district
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <button
                onClick={() => setChartType("area")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  chartType === "area"
                    ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Area View
              </button>
              <button
                onClick={() => setChartType("bar")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  chartType === "bar"
                    ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Bar View
              </button>
            </div>

            {/* Time Filter Buttons */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              {[
                { id: "7d", label: "7D" },
                { id: "30d", label: "30D" },
                { id: "90d", label: "90D" },
                { id: "12m", label: "1Y" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPeriod(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    period === item.id
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chart Render */}
        <div className="h-[340px] w-full">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "area" ? (
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="emeraldRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="blueBook" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" vertical={false} />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                  tickFormatter={(v) => (v >= 1000 ? `NPR ${(v / 1000).toFixed(0)}k` : v)}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: 16 }} iconType="circle" iconSize={10} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#16a34a"
                  strokeWidth={3.5}
                  fill="url(#emeraldRev)"
                  name="Revenue (NPR)"
                  dot={false}
                  activeDot={{ r: 7, strokeWidth: 3, stroke: "#fff" }}
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="bookings"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  fill="url(#blueBook)"
                  name="Daily Bookings"
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 3, stroke: "#fff" }}
                />
              </AreaChart>
            ) : (
              <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" vertical={false} />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: 16 }} iconType="circle" iconSize={10} />
                <Bar dataKey="bookings" fill="#16a34a" name="Daily Bookings" radius={[8, 8, 0, 0]} maxBarSize={36} />
                <Bar dataKey="completed" fill="#2563eb" name="Completed Jobs" radius={[8, 8, 0, 0]} maxBarSize={36} />
              </BarChart>
            )}
          </ResponsiveContainer>
          ) : (
            <div className="h-full w-full bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse flex items-center justify-center text-xs text-slate-400 font-semibold">
              Loading Chart Analytics...
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
