"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Wallet,
  ArrowUpRight,
  Download,
  CreditCard,
  Building2,
  QrCode,
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export function EarningsAndWallet({ onWithdraw, showToast }) {
  const [selectedPayoutMethod, setSelectedPayoutMethod] = useState("Esewa");

  const chartData = [
    { day: "Sun", earnings: 3200, jobs: 4 },
    { day: "Mon", earnings: 4500, jobs: 6 },
    { day: "Tue", earnings: 5100, jobs: 7 },
    { day: "Wed", earnings: 4200, jobs: 5 },
    { day: "Thu", earnings: 4850, jobs: 8 },
    { day: "Fri", earnings: 6200, jobs: 9 },
    { day: "Sat", earnings: 5800, jobs: 8 },
  ];

  const withdrawalHistory = [
    { id: "WTH-984", date: "Aug 04, 2026", amount: "Rs. 14,500", method: "Esewa Wallet", status: "Completed" },
    { id: "WTH-981", date: "Jul 28, 2026", amount: "Rs. 18,200", method: "NABIL Bank Direct", status: "Completed" },
    { id: "WTH-976", date: "Jul 20, 2026", amount: "Rs. 12,000", method: "Khalti Pay", status: "Completed" },
  ];

  return (
    <div className="rounded-3xl bg-white dark:bg-[#061812] border border-slate-200/80 dark:border-emerald-900/30 p-5 sm:p-7 shadow-xl space-y-7">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-emerald-900/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Wallet size={20} />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              Earnings & Wallet Hub
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live revenue telemetry, payout accounts & bank transfers
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast("Downloading Monthly Phidim Technician Payout Statement PDF...")}
          className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-emerald-950/60 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-emerald-800/40 flex items-center gap-1.5 transition-all"
        >
          <Download size={14} /> Download Statement
        </button>
      </div>

      {/* Metric Breakdown Cards (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-[#040e0b] border border-slate-200/80 dark:border-emerald-900/30 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Today's Earnings</span>
          <p className="text-xl font-black text-slate-900 dark:text-white font-mono">Rs. 4,850</p>
          <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">+18.4% vs avg</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-[#040e0b] border border-slate-200/80 dark:border-emerald-900/30 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Weekly Revenue</span>
          <p className="text-xl font-black text-slate-900 dark:text-white font-mono">Rs. 33,850</p>
          <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">44 Total Jobs</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-[#040e0b] border border-slate-200/80 dark:border-emerald-900/30 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Monthly Income</span>
          <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">Rs. 138,400</p>
          <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400">Top 2% Techs</p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-600/20 space-y-1">
          <span className="text-[11px] font-bold text-emerald-100 uppercase tracking-wider">Withdrawable Balance</span>
          <p className="text-xl font-black font-mono">Rs. 18,450</p>
          <p className="text-[10px] font-bold text-emerald-200">Instant Cashout Ready</p>
        </div>
      </div>

      {/* Main Row: Income Growth Recharts Line/Area Graph vs Wallet Payout Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Income Growth Chart (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-3xl bg-slate-50/60 dark:bg-[#040e0b] border border-slate-200 dark:border-emerald-900/30 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <TrendingUp size={16} className="text-emerald-500" /> Weekly Income Growth & Job Volume
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Daily earnings progression in Nepalese Rupees (NPR)
              </p>
            </div>
            <span className="px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-mono text-[10px] font-bold">
              Avg Rs. 4,835 / Day
            </span>
          </div>

          <div className="h-[220px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#061812",
                    borderColor: "#16a34a",
                    borderRadius: "16px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#16a34a"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#incomeGlow)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT: Wallet & Withdrawal Request Panel (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-3xl bg-slate-50/60 dark:bg-[#040e0b] border border-slate-200 dark:border-emerald-900/30 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              Instant Payout Account
            </h4>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
              0% Fee
            </span>
          </div>

          {/* Select Payment Method */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "Esewa", icon: QrCode, color: "text-emerald-500" },
              { id: "Khalti", icon: Wallet, color: "text-purple-500" },
              { id: "Bank", icon: Building2, color: "text-blue-500" },
            ].map((method) => {
              const isSelected = selectedPayoutMethod === method.id;
              const Icon = method.icon;

              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayoutMethod(method.id)}
                  className={`p-2.5 rounded-2xl border text-center transition-all ${
                    isSelected
                      ? "bg-white dark:bg-[#061812] border-emerald-500 font-black shadow-md"
                      : "bg-transparent border-slate-200 dark:border-emerald-900/30 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  <Icon size={18} className={`mx-auto mb-1 ${method.color}`} />
                  <span className="text-[11px] block">{method.id}</span>
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-[#061812] border border-slate-200 dark:border-emerald-900/30 text-xs space-y-1">
            <div className="flex justify-between text-slate-500">
              <span>Primary Payout Account:</span>
              <strong className="text-slate-800 dark:text-slate-200 font-mono">9842109842</strong>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Account Holder:</span>
              <strong className="text-slate-800 dark:text-slate-200">Rajesh Tamang</strong>
            </div>
          </div>

          <button
            onClick={onWithdraw}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-xs shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Zap size={16} />
            <span>Request Instant Cashout (Rs. 18,450)</span>
          </button>
        </div>
      </div>

      {/* Withdrawal History Table */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Recent Payout & Withdrawal History
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-emerald-900/30 text-slate-400 text-[11px] font-bold">
                <th className="py-2.5 px-3">Transaction ID</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Method</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/20 font-medium">
              {withdrawalHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-emerald-950/30 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">{item.id}</td>
                  <td className="py-3 px-3 text-slate-500">{item.date}</td>
                  <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{item.method}</td>
                  <td className="py-3 px-3 font-bold text-emerald-600 dark:text-emerald-400 font-mono">{item.amount}</td>
                  <td className="py-3 px-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-extrabold text-[10px] border border-emerald-300 dark:border-emerald-800">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
