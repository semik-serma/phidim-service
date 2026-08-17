"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  X,
  Sparkles,
  Briefcase,
  Calendar,
  Wallet,
  Users,
  Star,
  TrendingUp,
  MapPin,
  FileCheck,
  Wrench,
  Settings,
  ShieldAlert,
} from "lucide-react";

export function TechnicianCommandPalette({ isOpen, onClose, onSelectTab }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const commandItems = [
    { id: "dashboard", name: "Dashboard Overview", icon: Sparkles, cat: "Navigation" },
    { id: "new-jobs", name: "New Job Requests", icon: Sparkles, cat: "Jobs" },
    { id: "my-jobs", name: "My Active Jobs & OTP Control", icon: Briefcase, cat: "Jobs" },
    { id: "schedule", name: "Schedule & Timeline", icon: Calendar, cat: "Navigation" },
    { id: "earnings", name: "Earnings & Wallet Hub", icon: Wallet, cat: "Financial" },
    { id: "customers", name: "Customers Profile & Contacts", icon: Users, cat: "Navigation" },
    { id: "reviews", name: "Customer Reviews & CSAT", icon: Star, cat: "Performance" },
    { id: "performance", name: "Performance Leaderboards", icon: TrendingUp, cat: "Performance" },
    { id: "live-location", name: "Live GPS & Dispatch Map", icon: MapPin, cat: "Navigation" },
    { id: "wallet", name: "Instant Bank & Esewa Payouts", icon: Wallet, cat: "Financial" },
    { id: "documents", name: "KYC Documents & Expiry", icon: FileCheck, cat: "Account" },
    { id: "equipment", name: "Tools & Equipment Inventory", icon: Wrench, cat: "Account" },
    { id: "settings", name: "Technician Portal Settings", icon: Settings, cat: "Account" },
  ];

  const filtered = commandItems.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.cat.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="w-full max-w-xl rounded-3xl bg-white dark:bg-[#061812] border border-slate-200 dark:border-emerald-800/50 shadow-2xl overflow-hidden"
        >
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 dark:border-emerald-900/30">
            <Search size={20} className="text-emerald-500" />
            <input
              type="text"
              autoFocus
              placeholder="Search technician actions, jobs, pages, customers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm font-semibold text-slate-900 dark:text-white outline-none placeholder:text-slate-400"
            />
            <button onClick={onClose} className="p-1 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-emerald-900/40">
              <X size={18} />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-3 space-y-1">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No matching technician commands found.
              </div>
            ) : (
              filtered.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-800 dark:text-slate-200 transition-all text-xs font-semibold group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon size={16} />
                      </div>
                      <span>{item.name}</span>
                    </div>

                    <span className="text-[10px] font-bold text-slate-400 px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-900">
                      {item.cat}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-5 py-3 bg-slate-50 dark:bg-[#040e0b] border-t border-slate-100 dark:border-emerald-900/20 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Use ↑ ↓ to navigate, ESC to exit</span>
            <span className="font-mono text-emerald-500 font-bold">Phidim Technician Command OS</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
