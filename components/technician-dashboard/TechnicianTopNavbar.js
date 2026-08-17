"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  Bell,
  MessageSquare,
  Sun,
  Moon,
  ChevronDown,
  UserCheck,
  Shield,
  LogOut,
  Settings,
  HelpCircle,
  Home,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import { UserAvatar } from "@/components/UserAvatar";

export function TechnicianTopNavbar({
  activeTab,
  setActiveTab,
  setMobileOpen,
  darkMode,
  setDarkMode,
  onOpenSearch,
  isOnline,
  setIsOnline,
  showToast,
  onLogout,
}) {
  const { user } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  const displayName = user?.displayName || user?.name || "Field Technician";
  const displayEmail = user?.email || "tech@phidim.np";
  const displayId = user?.id || "#TECH-8842";
  const userInitials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 h-[58px] bg-white/85 dark:bg-[#050e0b]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-emerald-900/30 px-4 sm:px-6 transition-colors duration-300">
      <div className="flex items-center justify-between h-full gap-3 max-w-7xl mx-auto">
        {/* Left Section: Menu Toggle & Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-emerald-950/60 lg:hidden transition-all border border-slate-200 dark:border-emerald-800/40"
            aria-label="Open sidebar navigation"
          >
            <Menu size={18} />
          </button>

          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight capitalize">
                {activeTab.replace("-", " ")}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live Hub
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden md:block">
              Phidim Dispatch Sector 4 • Active Jobs & Live Earnings Tracking
            </p>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-sm hidden md:block">
          <div
            onClick={onOpenSearch}
            className="group relative flex items-center w-full h-8.5 px-3 rounded-xl bg-slate-100 dark:bg-emerald-950/40 border border-slate-200/80 dark:border-emerald-800/40 text-slate-500 dark:text-slate-400 hover:border-emerald-500 dark:hover:border-emerald-500/60 transition-all cursor-pointer shadow-inner"
          >
            <Search size={14} className="text-slate-400 group-hover:text-emerald-500 transition-colors mr-2" />
            <span className="text-xs font-medium truncate flex-1">
              Search jobs, customers, locations...
            </span>
            <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.2 text-[10px] font-mono font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-emerald-800 rounded-md text-slate-400 shadow-xs">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Section: Home Button, Actions, Status Toggle & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Go Back to Home Page Button */}
          <a
            href="/"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[11px] shadow-sm transition-all hover:scale-102"
            title="Go Back to Main Website Homepage"
          >
            <Home size={13} />
            <span className="hidden sm:inline">Back to Home</span>
          </a>

          {/* Online Availability Toggle */}
          <button
            onClick={() => {
              const next = !isOnline;
              setIsOnline(next);
              showToast(next ? "Status updated: Available for new jobs" : "Status updated: Offline");
            }}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs border ${
              isOnline
                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700/50 hover:bg-emerald-100"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700 hover:bg-slate-200"
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isOnline ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_#22c55e]" : "bg-slate-400"
              }`}
            />
            <span>{isOnline ? "● Available" : "○ Offline"}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-emerald-950/60 transition-all border border-slate-200 dark:border-emerald-800/40"
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>

          {/* Messages Icon */}
          <button
            onClick={() => {
              if (setActiveTab) setActiveTab("friends");
              else showToast("Opening Customer & Support Direct Messages...");
            }}
            className="relative p-2.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-emerald-950/60 transition-all border border-slate-200 dark:border-emerald-800/40 cursor-pointer"
            title="Messages & Community"
          >
            <MessageSquare size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-[#061510]" />
          </button>

          {/* Notification Bell */}
          <button
            onClick={() => showToast("5 New Job Notifications from Phidim Dispatch Center")}
            className="relative p-2.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-emerald-950/60 transition-all border border-slate-200 dark:border-emerald-800/40"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping ring-2 ring-white dark:ring-[#061510]" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-emerald-950/60 transition-all border border-slate-200/80 dark:border-emerald-800/40 cursor-pointer"
            >
              <UserAvatar user={user} size="xs" />
              <div className="text-left hidden xl:block leading-none pr-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white">{displayName}</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                  Verified Tech (4.95 ★)
                </p>
              </div>
              <ChevronDown size={13} className="text-slate-400" />
            </button>

            {/* Dropdown Menu Modal */}
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-64 rounded-3xl bg-white dark:bg-[#061812] shadow-2xl border border-slate-200 dark:border-emerald-800/50 p-2.5 z-50 text-xs font-medium space-y-1"
                >
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl border border-emerald-200 dark:border-emerald-800/40 mb-2">
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-emerald-600 dark:text-emerald-400" />
                      <p className="font-bold text-slate-900 dark:text-white">{displayName}</p>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">ID: {displayId} • {displayEmail}</p>
                  </div>

                  <Link
                    href="/"
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition-all font-bold"
                  >
                    <Home size={16} />
                    <span>Go Back to Home Page</span>
                  </Link>

                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      if (setActiveTab) setActiveTab("account-settings");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-emerald-900/40 transition-all font-bold"
                  >
                    <UserCheck size={16} className="text-emerald-500" />
                    <span>Account Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      if (setActiveTab) setActiveTab("account-settings");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-emerald-900/40 transition-all"
                  >
                    <Settings size={16} className="text-slate-400" />
                    <span>Settings & Preferences</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      showToast("Opening 24/7 Phidim Dispatch Support...");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-emerald-900/40 transition-all"
                  >
                    <HelpCircle size={16} className="text-slate-400" />
                    <span>Support & Emergency SOS</span>
                  </button>

                  <hr className="border-slate-100 dark:border-emerald-900/30 my-1" />

                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      if (onLogout) onLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all font-bold"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
