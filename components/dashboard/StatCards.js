"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Users,
  UserCheck,
  CalendarCheck,
  CheckCircle2,
  Wallet,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from "lucide-react";

export function CountUp({ value, prefix = "", suffix = "", decimals = 0 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf;
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const easeOut = 1 - Math.pow(1 - p, 3);
      setDisplay(value * easeOut);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <span>
      {prefix}
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

function MiniSparkline({ data, color, isUp }) {
  const w = 110;
  const h = 38;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map(
      (v, i) =>
        `${(i / (data.length - 1)) * w},${h - 4 - ((v - min) / (max - min || 1)) * (h - 12)}`
    )
    .join(" ");

  const lastX = w;
  const lastY = h - 4 - ((data[data.length - 1] - min) / (max - min || 1)) * (h - 12);

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`M 0,${h} L 0,${h - 4 - ((data[0] - min) / (max - min || 1)) * (h - 12)} L ${points} L ${w},${h} Z`}
        fill={`url(#grad-${color.replace('#', '')})`}
      />
      <path
        d={`M ${points}`}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={lastX}
        cy={lastY}
        r={4}
        fill={color}
        className="animate-ping opacity-75"
      />
      <circle
        cx={lastX}
        cy={lastY}
        r={4}
        fill={color}
        stroke="#ffffff"
        strokeWidth={1.5}
      />
    </svg>
  );
}

export function StatCards() {
  const cards = [
    {
      id: "users",
      title: "Total Users",
      value: 14890,
      prefix: "",
      change: "+14.2%",
      isUp: true,
      icon: Users,
      gradient: "from-emerald-500 to-teal-600",
      tint: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/30",
      sparkColor: "#16a34a",
      data: [42, 58, 62, 70, 78, 85, 92, 105, 118, 132, 148],
    },
    {
      id: "technicians",
      title: "Technicians",
      value: 164,
      suffix: " Active",
      change: "+8.5%",
      isUp: true,
      icon: UserCheck,
      gradient: "from-blue-500 to-indigo-600",
      tint: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/30",
      sparkColor: "#2563eb",
      data: [90, 95, 102, 110, 120, 135, 142, 150, 158, 164],
    },
    {
      id: "bookings",
      title: "Bookings",
      value: 4320,
      change: "+22.4%",
      isUp: true,
      icon: CalendarCheck,
      gradient: "from-purple-500 to-violet-600",
      tint: "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 border-purple-500/30",
      sparkColor: "#8b5cf6",
      data: [120, 145, 180, 210, 260, 310, 340, 390, 432],
    },
    {
      id: "completed",
      title: "Completed Jobs",
      value: 3980,
      change: "+18.9%",
      isUp: true,
      icon: CheckCircle2,
      gradient: "from-emerald-600 to-green-500",
      tint: "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400 border-green-500/30",
      sparkColor: "#22c55e",
      data: [100, 130, 165, 190, 240, 280, 310, 360, 398],
    },
    {
      id: "revenue",
      title: "Revenue",
      value: 2485000,
      prefix: "NPR ",
      change: "+25.6%",
      isUp: true,
      icon: Wallet,
      gradient: "from-teal-500 to-emerald-700",
      tint: "bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400 border-teal-500/30",
      sparkColor: "#0d9488",
      data: [120, 140, 170, 200, 240, 290, 340, 410, 480, 520, 610],
    },
    {
      id: "pending",
      title: "Pending Requests",
      value: 38,
      change: "-5.2%",
      isUp: false,
      icon: Clock,
      gradient: "from-amber-500 to-orange-600",
      tint: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/30",
      sparkColor: "#f59e0b",
      data: [65, 58, 52, 48, 50, 44, 42, 38],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          whileHover={{ y: -6, scale: 1.01 }}
          className="group relative bg-white/90 dark:bg-slate-900/90 rounded-[22px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.12)] hover:border-emerald-500/40 transition-all p-5 overflow-hidden flex flex-col justify-between"
        >
          {/* Subtle Ambient Background Gradient on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Top Row: Title + Icon */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {card.title}
              </span>
              <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mt-1">
                <CountUp
                  value={card.value}
                  prefix={card.prefix}
                  suffix={card.suffix}
                />
              </p>
            </div>

            <div
              className={`w-11 h-11 rounded-2xl ${card.tint} border flex items-center justify-center shadow-inner flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
            >
              <card.icon size={20} className="stroke-[2.5]" />
            </div>
          </div>

          {/* Bottom Row: Growth Badge + Mini Sparkline */}
          <div className="flex items-end justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
            <div className="flex flex-col gap-1">
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                  card.isUp
                    ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                    : "bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border-amber-500/30"
                }`}
              >
                {card.isUp ? (
                  <ArrowUpRight size={12} className="stroke-[3]" />
                ) : (
                  <ArrowDownRight size={12} className="stroke-[3]" />
                )}
                {card.change}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">vs last month</span>
            </div>

            <div className="flex-shrink-0">
              <MiniSparkline
                data={card.data}
                color={card.sparkColor}
                isUp={card.isUp}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
