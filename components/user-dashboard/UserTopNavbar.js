"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  Search,
  Sun,
  Moon,
  Bell,
  MessageSquare,
  Wallet,
  ChevronDown,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Home,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UserAvatar } from "@/components/UserAvatar";

export function UserTopNavbar({
  activeTab,
  setActiveTab,
  setMobileOpen,
  darkMode,
  setDarkMode,
  onOpenSearch,
}) {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const displayName = user?.displayName || user?.name || (user?.email ? user.email.split("@")[0] : "Customer User");
  const displayEmail = user?.email || "";
  const displayUsername = user?.username ? `@${user.username}` : user?.email ? `@${user.email.split("@")[0]}` : "";
  const userInitials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const getPageTitle = (tab) => {
    switch (tab) {
      case "dashboard": return "User Dashboard";
      case "book": return "Book a Service";
      case "my-bookings": return "My Active Bookings";
      case "track": return "Live Technician Tracking";
      case "payments": return "Payments & Wallet";
      case "messages": return "Messages & Chat";
      case "reviews": return "My Ratings & Reviews";
      case "offers": return "Coupons & Discounts";
      case "favorites": return "Favorite Services";
      case "history": return "Past Booking History";
      case "notifications": return "Notification Alerts";
      case "profile": return "My Customer Profile";
      case "settings": return "Account Settings";
      case "help": return "Help & Support Center";
      default: return "Phidim User Portal";
    }
  };

  return (
    <header className="sticky top-0 z-30 h-[58px] bg-white/85 dark:bg-[#050e0b]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-emerald-900/30 shadow-[0_1px_0_rgba(15,23,42,0.03)] transition-colors">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 gap-3">
        {/* Left Side: Mobile Hamburger & Dynamic Page Title + Breadcrumbs */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>

          <div>
            <div className="hidden sm:flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 font-medium">
              <Link href="/" className="hover:text-emerald-600 font-bold flex items-center gap-1">
                <Home size={11} />
                <span>Home</span>
              </Link>
              <ChevronRight size={10} />
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Phidim Service</span>
              <ChevronRight size={10} />
              <span className="capitalize">{activeTab}</span>
            </div>

            <h1 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {getPageTitle(activeTab)}
            </h1>
          </div>
        </div>

        {/* Center: Global Search Input */}
        <div className="hidden md:flex items-center flex-1 max-w-sm mx-3">
          <div
            onClick={onOpenSearch}
            className="relative w-full cursor-pointer group"
          >
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-emerald-500 transition-colors" />
            <input
              type="text"
              readOnly
              placeholder="Search services, technicians... (⌘K)"
              className="w-full h-8.5 pl-9 pr-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white placeholder-slate-400 cursor-pointer focus:outline-none group-hover:border-emerald-500/50 transition-all"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.2 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/80 border border-emerald-500/30 rounded-md">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Side: Home Button, Wallet, Theme Toggle, Notifications, User Avatar */}
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

          {/* Wallet Balance Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
            <Wallet size={13} className="text-emerald-500" />
            <span>NPR 4,500</span>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500/50 transition-all"
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <Sun size={15} className="text-amber-400" />
            ) : (
              <Moon size={15} className="text-emerald-600" />
            )}
          </button>

          {/* Messages Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                if (setActiveTab) {
                  setActiveTab("messages");
                }
              }}
              className="relative p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500/50 transition-all cursor-pointer"
              title="Open Live Chat Messages"
              aria-label="Messages"
            >
              <MessageSquare size={18} />
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-blue-600 text-white text-[10px] font-black rounded-full ring-2 ring-white dark:ring-slate-900">
                💬
              </span>
            </button>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="relative p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500/50 transition-all"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-ping" />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 sm:w-96 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <Bell size={16} className="text-emerald-500" /> Notifications
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                      1 New
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800 my-2 max-h-72 overflow-y-auto">
                    <div className="py-2.5 flex items-start gap-3 p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
                        <CheckCircle2 size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">Welcome back, {displayName}!</p>
                        <p className="text-[11px] text-slate-500">Account status active in Phidim Municipality</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">Just now</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:border-emerald-500/50 transition-all"
            >
              <UserAvatar user={user} size="sm" />
              <span className="hidden sm:inline text-xs font-extrabold text-slate-800 dark:text-slate-100">
                {displayName}
              </span>
              <ChevronDown size={14} className="text-slate-400 hidden sm:inline" />
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-56 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50"
                >
                  <div className="p-3 border-b border-slate-100 dark:border-slate-800 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">{displayName}</p>
                      {displayUsername && (
                        <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                          {displayUsername}
                        </span>
                      )}
                    </div>
                    {displayEmail && <p className="text-[11px] text-slate-400 truncate">{displayEmail}</p>}
                  </div>
                  <div className="py-1 space-y-0.5">
                    <Link
                      href="/"
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <Home size={15} /> Go Back to Home Page
                    </Link>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        if (setActiveTab) setActiveTab("account-settings");
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <User size={15} className="text-emerald-500" /> Account Settings
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        if (setActiveTab) setActiveTab("account-settings");
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <Settings size={15} className="text-blue-500" /> System Preferences
                    </button>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition-colors"
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
