"use client";

import { motion } from "motion/react";
import {
  UserCheck,
  PhoneCall,
  MessageSquare,
  Video,
  Star,
  MapPin,
  Briefcase,
  ShieldCheck,
  Award,
  FileText,
} from "lucide-react";

export function CustomerInfoWidget({ customer, onCall, onChat, onVideoCall, showToast }) {
  const currentCustomer = customer || {
    name: "Sita Sharma",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    phone: "+977 9842109842",
    address: "Pragati Chowk, Phidim-4, Panchthar",
    rating: "4.9 ★",
    pastOrders: "12 Orders",
    notes: "Requires shoe covers inside room. Prefers afternoon service.",
    memberSince: "Jan 2024",
    status: "VIP Customer",
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-[#061812] border border-slate-200/80 dark:border-emerald-900/30 p-5 sm:p-7 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-emerald-900/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <UserCheck size={20} />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              Customer Profile Overview
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Direct communication & verified account details
            </p>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-extrabold text-xs border border-purple-300 dark:border-purple-800">
          {currentCustomer.status}
        </span>
      </div>

      {/* Customer Avatar & Primary Details */}
      <div className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-3xl bg-slate-50/70 dark:bg-[#040e0b] border border-slate-200/80 dark:border-emerald-900/30">
        <div className="relative flex-shrink-0">
          <img
            src={currentCustomer.photo}
            alt={currentCustomer.name}
            className="w-20 h-20 rounded-3xl object-cover ring-4 ring-emerald-500/30 shadow-lg"
          />
          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#040e0b]" />
        </div>

        <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h4 className="text-xl font-black text-slate-900 dark:text-white">
              {currentCustomer.name}
            </h4>
            <span className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800/40">
              <Star size={12} className="fill-amber-400" /> {currentCustomer.rating}
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 font-mono font-bold">
            📱 {currentCustomer.phone}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 font-medium pt-1">
            <span className="flex items-center gap-1">
              <Briefcase size={13} className="text-emerald-500" /> {currentCustomer.pastOrders}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck size={13} className="text-blue-500" /> Member since {currentCustomer.memberSince}
            </span>
          </div>
        </div>
      </div>

      {/* Address & Notes Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#061812] border border-slate-200 dark:border-emerald-900/30 space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
            <MapPin size={13} className="text-emerald-500" /> Delivery / Service Location
          </span>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
            {currentCustomer.address}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 space-y-1.5">
          <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block flex items-center gap-1">
            <FileText size={13} className="text-amber-600" /> Special Customer Notes
          </span>
          <p className="text-xs font-semibold text-amber-900 dark:text-amber-200 leading-snug italic">
            "{currentCustomer.notes}"
          </p>
        </div>
      </div>

      {/* Communication Action Buttons (Call, Chat, Video Call) */}
      <div className="grid grid-cols-3 gap-3 pt-2">
        <button
          onClick={() => onCall(currentCustomer)}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
        >
          <PhoneCall size={16} />
          <span>Call</span>
        </button>

        <button
          onClick={() => onChat(currentCustomer)}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 transition-all active:scale-95"
        >
          <MessageSquare size={16} />
          <span>Live Chat</span>
        </button>

        <button
          onClick={() => onVideoCall(currentCustomer)}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 transition-all active:scale-95"
        >
          <Video size={16} />
          <span>Video Call</span>
        </button>
      </div>
    </div>
  );
}
