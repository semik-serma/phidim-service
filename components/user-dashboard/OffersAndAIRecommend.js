"use client";

import { motion } from "motion/react";
import { Ticket, Sparkles, Gift, ArrowRight, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { claimCouponForUser, getClaimedCouponCodes, getCoupons, subscribeCouponClaims, subscribeCoupons } from "@/lib/couponStore";
import { useAuth } from "@/context/AuthContext";

export function OffersAndAIRecommend({ onClaimCoupon, onBookRecommended }) {
  const { user } = useAuth();
  const [claimedCodes, setClaimedCodes] = useState(() => getClaimedCouponCodes(user));
  const [coupons, setCoupons] = useState(() => getCoupons().filter((c) => c.active));

  useEffect(() => {
    const unsub = subscribeCoupons((list) => {
      setCoupons(list.filter((c) => c.active));
    });
    return unsub;
  }, []);

  useEffect(() => {
    setClaimedCodes(getClaimedCouponCodes(user));
    return subscribeCouponClaims(user, setClaimedCodes);
  }, [user?.email, user?.id]);

  const aiRecommendations = [
    { title: "UPS Battery Backup for CCTV", reason: "Based on your 4K CCTV Setup in Ward 1", price: "NPR 4,500", icon: Sparkles },
    { title: "Annual Electrical Health Audit", reason: "Recommended for Panchthar rainy season", price: "NPR 1,200", icon: Gift },
  ];

  const copyCode = (code) => {
    if (!claimCouponForUser(user, code)) return;
    setClaimedCodes((current) => [...current, code]);
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(code).catch(() => {});
    if (onClaimCoupon) onClaimCoupon(code);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Coupons (2 Columns) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-2 bg-white/90 dark:bg-slate-900/90 rounded-[26px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="text-rose-500" size={22} />
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Exclusive Coupons & Offers
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Claim discount promo codes for your next booking
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 text-xs font-bold">
            {coupons.length} Promo Code{coupons.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {coupons.map((c) => (
            <div
              key={c.code}
              className={`p-4 rounded-2xl bg-gradient-to-br ${c.bg} text-white shadow-lg relative overflow-hidden flex flex-col justify-between space-y-3`}
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-white/20 text-[10px] font-black tracking-widest uppercase">
                  COUPON
                </span>
                <span className="text-[10px] font-bold text-white/80">{c.exp}</span>
              </div>

              <div>
                <p className="text-2xl font-black font-mono tracking-tight">{c.discount}</p>
                <p className="text-[11px] text-white/90 mt-0.5 leading-snug">{c.desc}</p>
              </div>

              <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                <span className="font-mono text-xs font-black tracking-wider bg-white/20 px-2 py-0.5 rounded">
                  {c.code}
                </span>
                <button
                  onClick={() => copyCode(c.code)}
                  disabled={claimedCodes.includes(c.code)}
                  className={`px-3 py-1 rounded-xl bg-white text-slate-900 font-extrabold text-[11px] transition-colors shadow-sm flex items-center gap-1 ${
                    claimedCodes.includes(c.code) ? "cursor-default opacity-80" : "hover:bg-emerald-50"
                  }`}
                >
                  {claimedCodes.includes(c.code) ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  <span>{claimedCodes.includes(c.code) ? "Claimed" : "Claim"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI Recommendation (1 Column) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/90 dark:bg-slate-900/90 rounded-[26px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-amber-500 animate-pulse" size={20} />
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                AI Service Recommendations
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 text-xs font-extrabold">
              AI Smart
            </span>
          </div>

          <div className="space-y-3">
            {aiRecommendations.map((rec, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
                <p className="text-xs font-black text-slate-900 dark:text-white">{rec.title}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">"{rec.reason}"</p>
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{rec.price}</span>
                  <button
                    onClick={() => onBookRecommended(rec)}
                    className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-500 transition-colors flex items-center gap-1"
                  >
                    <span>Add Booking</span>
                    <ArrowRight size={12} />
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
