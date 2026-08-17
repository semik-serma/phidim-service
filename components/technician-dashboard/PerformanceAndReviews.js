"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  TrendingUp,
  Star,
  CheckCircle2,
  XCircle,
  Award,
  MessageSquare,
  ThumbsUp,
  Flame,
  ShieldCheck,
  Zap,
} from "lucide-react";

export function PerformanceAndReviews({ onOpenReplyModal, showToast }) {
  const reviews = [
    {
      id: "REV-101",
      customerName: "Anil Shrestha",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "Aug 05, 2026",
      service: "Split AC Gas Refill",
      review: "Rajesh arrived in 15 minutes! Very polite, highly professional and explained every step clearly. Cooling working perfectly now.",
    },
    {
      id: "REV-102",
      customerName: "Pooja Gurung",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "Aug 03, 2026",
      service: "DishHome Router Relocation",
      review: "Excellent fiber splicing work. Tested speed on laptop & mobile. Phidim Service technicians are best!",
    },
    {
      id: "REV-103",
      customerName: "Ram Prasad Bhattarai",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      rating: 4.8,
      date: "Jul 29, 2026",
      service: "Washing Machine Motor Repair",
      review: "Replaced motor bearing quickly and left the place clean. Recommending to everyone in Phidim Bazar.",
    },
  ];

  return (
    <div className="rounded-3xl bg-white dark:bg-[#061812] border border-slate-200/80 dark:border-emerald-900/30 p-5 sm:p-7 shadow-xl space-y-7">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-emerald-900/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <TrendingUp size={20} />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              Performance & Recent Reviews
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Customer satisfaction ratings & Panchthar region leaderboard status
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black shadow-md">
          <Flame size={14} />
          <span>Rank #1 Technician (Phidim)</span>
        </div>
      </div>

      {/* 6 Performance Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Jobs Completed", val: "184 Total", sub: "+12 this week", color: "text-emerald-600" },
          { label: "Customer CSAT", val: "99.4%", sub: "Top Tier", color: "text-emerald-600" },
          { label: "Average Rating", val: "4.95 ★", sub: "148 Ratings", color: "text-amber-500" },
          { label: "Acceptance Rate", val: "98.2%", sub: "+1.2% growth", color: "text-blue-600" },
          { label: "Completion Rate", val: "99.2%", sub: "Highly Reliable", color: "text-teal-600" },
          { label: "Cancellation Rate", val: "0.8%", sub: "Super Low", color: "text-emerald-600" },
        ].map((m, idx) => (
          <div key={idx} className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-[#040e0b] border border-slate-200/80 dark:border-emerald-900/30 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">{m.label}</span>
            <p className={`text-base font-black font-mono ${m.color}`}>{m.val}</p>
            <span className="text-[10px] text-slate-400 font-medium block truncate">{m.sub}</span>
          </div>
        ))}
      </div>

      {/* Customer Reviews Feed */}
      <div className="space-y-4 pt-2">
        <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Verified Customer Feedback & Reviews
        </h4>

        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 sm:p-5 rounded-3xl bg-slate-50/60 dark:bg-[#040e0b] border border-slate-200/80 dark:border-emerald-900/30 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.customerName}
                    className="w-10 h-10 rounded-2xl object-cover ring-2 ring-emerald-500/30"
                  />
                  <div>
                    <h5 className="text-sm font-black text-slate-900 dark:text-white">
                      {rev.customerName}
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {rev.service} • {rev.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-500 font-extrabold text-xs bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-xl border border-amber-300 dark:border-amber-800">
                  <Star size={13} className="fill-amber-400" />
                  <span>{rev.rating}</span>
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic font-medium">
                "{rev.review}"
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-emerald-900/20 text-xs">
                <button
                  onClick={() => showToast("Liked review feedback!")}
                  className="text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold flex items-center gap-1 text-[11px]"
                >
                  <ThumbsUp size={12} /> Helpful (14)
                </button>

                <button
                  onClick={() => onOpenReplyModal(rev)}
                  className="px-3 py-1 rounded-xl bg-white dark:bg-[#061812] hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-bold border border-slate-200 dark:border-emerald-800/40 flex items-center gap-1 text-[11px] transition-all"
                >
                  <MessageSquare size={12} /> Reply to Customer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
