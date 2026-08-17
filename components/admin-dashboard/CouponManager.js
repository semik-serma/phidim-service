"use client";

import { useState, useEffect } from "react";
import { Ticket, Plus, Trash2, CheckCircle2, X, Sparkles, Tag, Power, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getCoupons, addCoupon, toggleCouponActive, deleteCoupon, subscribeCoupons } from "@/lib/couponStore";

const GRADIENT_PRESETS = [
  { label: "Emerald Teal", value: "from-emerald-500 to-teal-600" },
  { label: "Ocean Blue", value: "from-blue-500 to-indigo-600" },
  { label: "Royal Purple", value: "from-purple-500 to-violet-600" },
  { label: "Rose Pink", value: "from-rose-500 to-pink-600" },
  { label: "Amber Orange", value: "from-amber-500 to-orange-600" },
];

export function CouponManager({ onShowToast }) {
  const [coupons, setCouponsState] = useState(() => getCoupons());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Coupon Form state
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [desc, setDesc] = useState("");
  const [exp, setExp] = useState("Expires in 7 days");
  const [bg, setBg] = useState("from-emerald-500 to-teal-600");

  useEffect(() => {
    const unsub = subscribeCoupons((updatedList) => {
      setCouponsState([...updatedList]);
    });
    return unsub;
  }, []);

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!code.trim() || !discount.trim()) return;

    addCoupon({
      code: code.trim(),
      discount: discount.trim(),
      desc: desc.trim() || "Special promotional offer for Phidim customers",
      exp: exp.trim() || "Valid for limited time",
      bg,
      active: true,
    });

    setIsModalOpen(false);
    setCode("");
    setDiscount("");
    setDesc("");
    setExp("Expires in 7 days");
    if (onShowToast) {
      onShowToast(`Coupon "${code.toUpperCase()}" created successfully!`);
    }
  };

  const handleToggle = (id, currentCode) => {
    toggleCouponActive(id);
    if (onShowToast) {
      onShowToast(`Coupon "${currentCode}" status updated.`);
    }
  };

  const handleDelete = (id, currentCode) => {
    if (confirm(`Are you sure you want to delete coupon code "${currentCode}"?`)) {
      deleteCoupon(id);
      if (onShowToast) {
        onShowToast(`Coupon "${currentCode}" deleted.`);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-emerald-100 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md">
            <Ticket size={14} className="text-amber-300" />
            <span>Admin Promotional Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Coupon & Offer Manager</h2>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-xl font-medium">
            Create, edit, toggle, and manage discount promo codes visible to customers in their user dashboards.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="relative z-10 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-slate-900 font-extrabold text-xs shadow-lg hover:bg-emerald-50 transition-all hover:scale-105 cursor-pointer shrink-0"
        >
          <Plus size={16} className="text-emerald-600" />
          <span>Create New Coupon</span>
        </button>
      </div>

      {/* Coupons List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-3xl border ${
              c.active ? "border-slate-200/80 dark:border-emerald-900/40 bg-white dark:bg-[#091e17]" : "border-slate-300 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/60 opacity-60"
            } p-5 shadow-sm space-y-4 flex flex-col justify-between`}
          >
            {/* Card Preview */}
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${c.bg} text-white shadow-md space-y-2 relative overflow-hidden`}>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] font-black uppercase tracking-widest">
                  COUPON
                </span>
                <span className="text-[10px] font-bold text-white/80">{c.exp}</span>
              </div>
              <div>
                <p className="text-2xl font-black font-mono tracking-tight">{c.discount}</p>
                <p className="text-[11px] text-white/90 leading-snug">{c.desc}</p>
              </div>
              <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                <span className="font-mono text-xs font-black tracking-wider bg-white/20 px-2 py-0.5 rounded">
                  {c.code}
                </span>
                <span className="text-[10px] font-bold text-white/80">
                  {c.active ? "● Active" : "○ Inactive"}
                </span>
              </div>
            </div>

            {/* Admin Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <button
                onClick={() => handleToggle(c.id, c.code)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-extrabold transition-all cursor-pointer ${
                  c.active
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-200"
                    : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-300"
                }`}
              >
                <Power size={13} />
                <span>{c.active ? "Active" : "Disabled"}</span>
              </button>

              <button
                onClick={() => handleDelete(c.id, c.code)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-bold transition-all cursor-pointer"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for Creating New Coupon */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-[#091e17] rounded-3xl border border-slate-200 dark:border-emerald-800/60 shadow-2xl p-6 sm:p-8 max-w-lg w-full space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-emerald-900/40 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                    <Tag size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Create New Coupon</h3>
                    <p className="text-xs text-slate-500">Add promo discount code for Phidim customers</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateCoupon} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-900 dark:text-white mb-1">
                    Coupon Promo Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SUMMER30"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-emerald-800/60 bg-white dark:bg-slate-900 text-xs font-bold font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-900 dark:text-white mb-1">
                    Discount Display Text *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 30% OFF or NPR 600 OFF"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-emerald-800/60 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-900 dark:text-white mb-1">
                    Description & Terms
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Valid on AC maintenance and wiring in Phidim"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-emerald-800/60 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-900 dark:text-white mb-1">
                    Expiration Info
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Expires in 7 days"
                    value={exp}
                    onChange={(e) => setExp(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-emerald-800/60 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-900 dark:text-white mb-1">
                    Card Theme Color Gradient
                  </label>
                  <select
                    value={bg}
                    onChange={(e) => setBg(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-emerald-800/60 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    {GRADIENT_PRESETS.map((gp) => (
                      <option key={gp.value} value={gp.value}>
                        {gp.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-emerald-900/40">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all shadow-md cursor-pointer"
                  >
                    Save & Publish Coupon
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
