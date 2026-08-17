"use client";

import { motion } from "motion/react";
import { Wallet, CreditCard, Plus, ArrowUpRight, ArrowDownLeft, FileText, CheckCircle2 } from "lucide-react";

export function PaymentsAndWallet() {
  const paymentMethods = [
    { name: "eSewa Mobile Wallet", desc: "Instant Nepalese digital payment", icon: "eSewa", active: true, color: "bg-green-600" },
    { name: "Khalti Digital Wallet", desc: "Fast cashback & instant pay", icon: "Khalti", active: true, color: "bg-purple-600" },
    { name: "IME Pay", desc: "Mobile wallet transfer", icon: "IME", active: false, color: "bg-red-600" },
    { name: "Visa / MasterCard", desc: "Debit or Credit Card", icon: "Card", active: true, color: "bg-blue-600" },
    { name: "Cash on Delivery", desc: "Pay after technician completes work", icon: "Cash", active: true, color: "bg-emerald-700" },
  ];

  const transactions = [
    { id: "TXN-88219", service: "4K CCTV Kit Setup", date: "Aug 04, 2026", amount: "NPR 18,900", method: "eSewa", status: "Completed" },
    { id: "TXN-88104", service: "DishHome Realignment", date: "Jul 28, 2026", amount: "NPR 1,500", method: "Khalti", status: "Completed" },
    { id: "TXN-87990", service: "Wallet Top Up", date: "Jul 20, 2026", amount: "+NPR 5,000", method: "Bank", status: "Completed", isTopUp: true },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Wallet Card (1 Column) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 rounded-[26px] text-white p-6 shadow-xl flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Wallet size={24} className="text-emerald-300" />
              <span className="font-extrabold text-sm tracking-wider uppercase text-emerald-200">Phidim Wallet</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold border border-white/30">
              Active Account
            </span>
          </div>

          <span className="text-xs text-emerald-200 uppercase font-bold tracking-wider">Available Balance</span>
          <h3 className="text-3xl sm:text-4xl font-black font-mono tracking-tight mt-1 mb-6">
            NPR 4,500.00
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <button className="py-3 rounded-2xl bg-white text-emerald-900 font-extrabold text-xs shadow-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-1.5">
              <Plus size={16} />
              <span>Add Funds</span>
            </button>
            <button className="py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-1.5">
              <CreditCard size={16} />
              <span>Withdraw</span>
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-white/15 flex items-center justify-between text-[11px] text-emerald-200 font-medium">
          <span>Earn 5% cashback on eSewa</span>
          <span>Phidim Pay v2.4</span>
        </div>
      </motion.div>

      {/* Payment Methods & Recent Transactions (2 Columns) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="lg:col-span-2 bg-white/90 dark:bg-slate-900/90 rounded-[26px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6 space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Payment Methods & History
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Integrated Nepalese payment gateways & receipt download
            </p>
          </div>

          <button className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
            Manage Gateways
          </button>
        </div>

        {/* Payment Methods Pill List */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {paymentMethods.map((m) => (
            <div
              key={m.name}
              className={`p-3 rounded-2xl border text-center transition-all ${
                m.active
                  ? "bg-slate-50 dark:bg-slate-800/60 border-emerald-500/40 text-slate-900 dark:text-white"
                  : "bg-slate-50/50 dark:bg-slate-800/30 border-slate-200/40 dark:border-slate-800 text-slate-400 opacity-60"
              }`}
            >
              <span className={`w-8 h-8 rounded-xl ${m.color} text-white font-black text-xs flex items-center justify-center mx-auto mb-1.5 shadow-sm`}>
                {m.icon[0]}
              </span>
              <p className="text-xs font-extrabold truncate">{m.name.split(" ")[0]}</p>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block mt-0.5">
                {m.active ? "Ready" : "Offline"}
              </span>
            </div>
          ))}
        </div>

        {/* Transactions Table */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Recent Transactions
          </h4>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {transactions.map((t) => (
              <div key={t.id} className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 p-2 rounded-2xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${t.isTopUp ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"}`}>
                    {t.isTopUp ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white">{t.service}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{t.id} • Via {t.method}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className={`text-xs font-black font-mono block ${t.isTopUp ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white"}`}>
                      {t.amount}
                    </span>
                    <span className="text-[10px] text-slate-400">{t.date}</span>
                  </div>

                  <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-500 transition-colors">
                    <FileText size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
