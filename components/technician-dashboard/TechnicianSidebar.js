"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  Sparkles,
  Briefcase,
  Calendar,
  Wallet,
  Users,
  Star,
  TrendingUp,
  MapPin,
  CreditCard,
  FileCheck,
  Wrench,
  Bell,
  Settings,
  LogOut,
  ShieldCheck,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Zap,
  Home,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const TECHNICIAN_NAV_ITEMS = [
  { id: "home", name: "Back to Home Page", icon: Home, badge: "Website", badgeColor: "bg-emerald-600 text-white font-extrabold", path: "/" },
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, badge: null, path: "/technician/dashboard" },
  { id: "new-jobs", name: "New Jobs", icon: Sparkles, badge: "3 New", badgeColor: "bg-emerald-500 text-white animate-pulse", path: "/technician/pending-jobs" },
  { id: "my-jobs", name: "My Jobs", icon: Briefcase, badge: "2 Active", badgeColor: "bg-blue-500 text-white", path: "/technician/jobs" },
  { id: "schedule", name: "Schedule", icon: Calendar, badge: "Today", path: "/technician/calendar" },
  { id: "earnings", name: "Earnings", icon: Wallet, badge: "Rs 4.8k", path: "/technician/earnings" },
  { id: "friends", name: "Find Friends", icon: UserCheck, badge: "Community", badgeColor: "bg-emerald-500 text-white" },
  { id: "customers", name: "Customers", icon: Users, badge: null },
  { id: "reviews", name: "Reviews", icon: Star, badge: "4.95 ★" },
  { id: "performance", name: "Performance", icon: TrendingUp, badge: "Top 1%", path: "/technician/reports" },
  { id: "live-location", name: "Live Location", icon: MapPin, badge: "Live", badgeColor: "bg-teal-500 text-white" },
  { id: "wallet", name: "Wallet", icon: CreditCard, badge: "Payout Ready", path: "/technician/earnings" },
  { id: "documents", name: "Documents", icon: FileCheck, badge: "Verified", badgeColor: "bg-emerald-600 text-white", path: "/technician/profile" },
  { id: "equipment", name: "Equipment", icon: Wrench, badge: null },
  { id: "account-settings", name: "Account Settings", icon: Settings, badge: "Edit", badgeColor: "bg-emerald-600 text-white", path: "/technician/settings" },
  { id: "logout", name: "Logout", icon: LogOut, badge: null, isDanger: true },
];

export function TechnicianSidebar({ activeTab, setActiveTab, collapsed, setCollapsed, mobileOpen, setMobileOpen, onLogout }) {
  const router = useRouter();
  const { user } = useAuth();

  const displayName = user?.displayName || user?.name || "Field Technician";
  const displayEmail = user?.email || "tech@phidim.np";
  const userInitials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-[#061510] dark:bg-[#040d0a] text-slate-300 border-r border-emerald-900/30 transition-all duration-300 flex flex-col ${
          collapsed ? "w-[68px]" : "w-[245px]"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Header / Logo */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-emerald-900/30">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <Link href="/" className="relative flex-shrink-0 cursor-pointer">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-700 flex items-center justify-center shadow-[0_0_15px_rgba(22,163,74,0.35)] text-white font-black">
                <ShieldCheck size={18} className="text-white drop-shadow" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#061510] animate-pulse" />
            </Link>

            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                className="leading-tight min-w-0"
              >
                <Link href="/" className="flex items-center gap-1.5 hover:opacity-90">
                  <span className="font-extrabold text-sm text-white tracking-tight truncate">
                    Phidim<span className="text-emerald-400">Service</span>
                  </span>
                  <span className="px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold uppercase tracking-wider border border-emerald-500/30">
                    TECH
                  </span>
                </Link>
                <p className="text-[10px] text-emerald-400/70 font-medium truncate">
                  Technician Command Hub
                </p>
              </motion.div>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-950/60 hover:bg-emerald-800/60 border border-emerald-700/40 text-emerald-400 hover:text-white transition-all shadow-sm"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-0.5">
          {TECHNICIAN_NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "logout" && onLogout) {
                    onLogout();
                  } else if (item.id === "home") {
                    router.push("/");
                  } else {
                    setActiveTab(item.id);
                  }
                  if (mobileOpen) setMobileOpen(false);
                }}
                className={`group relative w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                  item.id === "home"
                    ? "bg-emerald-600/30 hover:bg-emerald-600/50 text-white font-extrabold border border-emerald-500/50"
                    : item.isDanger
                    ? "text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
                    : isActive
                    ? "bg-gradient-to-r from-emerald-500/25 via-emerald-500/15 to-transparent text-emerald-400 font-bold border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.12)]"
                    : "hover:bg-white/5 hover:text-white text-slate-300"
                }`}
                title={collapsed ? item.name : undefined}
              >
                {isActive && item.id !== "home" && (
                  <motion.span
                    layoutId="techNavIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-emerald-400 rounded-r-full shadow-[0_0_12px_#22c55e]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <item.icon
                  size={20}
                  className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    item.id === "home"
                      ? "text-emerald-300"
                      : isActive
                      ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                      : item.isDanger
                      ? "text-rose-400"
                      : "text-slate-400 group-hover:text-emerald-300"
                  }`}
                />

                {!collapsed && (
                  <span className="flex-1 text-left truncate tracking-wide">
                    {item.name}
                  </span>
                )}

                {!collapsed && item.badge && (
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30 ${
                      item.badgeColor || "bg-emerald-950/80 text-emerald-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="p-4 border-t border-emerald-900/30 space-y-3 bg-[#040e0b]">
            <div className="bg-emerald-950/40 border border-emerald-800/30 rounded-2xl p-3">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-300 flex items-center gap-1">
                  <Zap size={12} className="text-emerald-400 animate-pulse" /> Dispatch Status
                </span>
                <span className="text-emerald-400 font-mono text-[11px] font-bold">● Available</span>
              </div>
              <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden border border-emerald-800/40">
                <div className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 rounded-full w-[92%]" />
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5">Zone: Phidim Bazar & Panchthar Sector-A</p>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-emerald-950/30 border border-emerald-900/40">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={displayName}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/50 shadow"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-extrabold text-xs flex items-center justify-center shadow">
                  {userInitials}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">{displayName}</p>
                <p className="text-[11px] text-emerald-400/80 truncate">{displayEmail}</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
