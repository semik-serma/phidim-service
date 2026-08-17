"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  X,
  LayoutDashboard,
  Users,
  UserCheck,
  Wrench,
  Calendar,
  CreditCard,
  Star,
  Settings,
  Plus,
  ArrowRight,
  Shield,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Ticket,
  Bell,
  MessageSquare,
  Megaphone,
} from "lucide-react";
import { getStoredRealUsers, DEFAULT_REAL_USERS } from "@/lib/userRegistry.js";
import { UserAvatar } from "@/components/UserAvatar";

export function CommandPalette({ isOpen, onClose, onSelectTab }) {
  const [query, setQuery] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Real-time user fetching from API and local registry
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const fetchUsers = async () => {
      setIsLoadingUsers(true);
      let apiUsers = [];
      try {
        const res = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.users)) {
            apiUsers = data.users;
          }
        }
      } catch (e) {
        // Fallback gracefully
      }

      const localUsers = getStoredRealUsers();
      const map = new Map();
      [...DEFAULT_REAL_USERS, ...localUsers, ...apiUsers].forEach((u) => {
        if (u && u.email) {
          map.set(u.email.toLowerCase(), u);
        }
      });

      const q = query.trim().toLowerCase();
      const allUsers = Array.from(map.values()).filter((u) => {
        if (!q) return true;
        const nameMatch = (u.name || "").toLowerCase().includes(q);
        const displayMatch = (u.displayName || "").toLowerCase().includes(q);
        const emailMatch = (u.email || "").toLowerCase().includes(q);
        const phoneMatch = (u.phone || "").includes(q);
        const roleMatch = (u.role || "").toLowerCase().includes(q);
        const locMatch = (u.location || "").toLowerCase().includes(q);
        return nameMatch || displayMatch || emailMatch || phoneMatch || roleMatch || locMatch;
      });

      if (isMounted) {
        setUserResults(allUsers);
        setIsLoadingUsers(false);
      }
    };

    const debounce = setTimeout(fetchUsers, 150);
    return () => {
      isMounted = false;
      clearTimeout(debounce);
    };
  }, [query, isOpen]);

  if (!isOpen) return null;

  const NAVIGATION_ITEMS = [
    { type: "Admin Page", name: "Marketplace Dashboard Overview", tab: "dashboard", icon: LayoutDashboard },
    { type: "Admin Page", name: "User Management (Registered Customers & Accounts)", tab: "users", icon: Users },
    { type: "Admin Page", name: "Technician & Field Engineer Roster", tab: "technicians", icon: UserCheck },
    { type: "Admin Page", name: "Service Offerings & Technical Packages", tab: "services", icon: Wrench },
    { type: "Admin Page", name: "Live Bookings & Dispatch Jobs", tab: "bookings", icon: Calendar },
    { type: "Admin Page", name: "Payment Audit & Transaction Ledger", tab: "payments", icon: CreditCard },
    { type: "Admin Page", name: "Customer Ratings & Reviews Moderation", tab: "reviews", icon: Star },
    { type: "Admin Page", name: "Community Friends & User Connect", tab: "friends", icon: Users },
    { type: "Admin Page", name: "Direct Customer Messages & Live Support", tab: "messages", icon: MessageSquare },
    { type: "Admin Page", name: "System Announcements & Broadcast Feed", tab: "announcements", icon: Megaphone },
    { type: "Admin Page", name: "Coupons & Promotional Discounts", tab: "coupons", icon: Ticket },
    { type: "Admin Page", name: "System & Security Preferences", tab: "settings", icon: Settings },
  ];

  const filteredNav = NAVIGATION_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.type.toLowerCase().includes(query.toLowerCase()) ||
    item.tab.toLowerCase().includes(query.toLowerCase())
  );

  const getRoleBadge = (role) => {
    const r = (role || "USER").toUpperCase();
    if (r === "ADMIN") {
      return {
        bg: "bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800",
        label: "Master Admin",
      };
    }
    if (r === "TECHNICIAN") {
      return {
        bg: "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
        label: "Technician",
      };
    }
    return {
      bg: "bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800",
      label: "Customer / User",
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 px-4 bg-slate-950/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
      >
        {/* Search Header Input */}
        <div className="relative flex items-center border-b border-slate-100 dark:border-slate-800 px-5 py-4 shrink-0">
          <Search size={22} className="text-emerald-500 mr-3 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search actual users, technicians, admins, emails, or pages... (e.g. Semik, Rajesh, Dhanraj)"
            className="w-full bg-transparent text-slate-900 dark:text-white text-sm font-semibold placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="mr-2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Results Container */}
        <div className="overflow-y-auto p-3 space-y-4 divide-y divide-slate-100 dark:divide-slate-800 flex-1">
          
          {/* Section 1: Real Platform Users & Technicians */}
          {userResults.length > 0 && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between px-3 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Users size={15} /> Registered Users & Field Staff ({userResults.length})
                </span>
                <span className="text-[10px] text-slate-400 normal-case">Click to view in User Management</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {userResults.map((u) => {
                  const roleBadge = getRoleBadge(u.role);
                  return (
                    <div
                      key={u.id || u.email}
                      onClick={() => {
                        onSelectTab("users");
                        onClose();
                      }}
                      className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/30 cursor-pointer transition-all group shadow-sm"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <UserAvatar user={u} size="md" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <p className="text-xs font-black text-slate-900 dark:text-white truncate">
                              {u.displayName || u.name || u.email}
                            </p>
                            <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-md border ${roleBadge.bg}`}>
                              {roleBadge.label}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1 mt-0.5">
                            <Mail size={10} className="shrink-0" /> {u.email}
                          </p>
                          {u.phone && (
                            <p className="text-[10px] text-slate-400 truncate font-mono flex items-center gap-1">
                              <Phone size={10} className="shrink-0" /> {u.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2">
                        Manage →
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 2: Administrative Dashboard Pages */}
          {filteredNav.length > 0 && (
            <div className="space-y-1.5 pt-3">
              <div className="px-3 text-xs font-black text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-500" /> Admin Navigation & Platform Pages
              </div>
              <div className="space-y-1">
                {filteredNav.map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        onSelectTab(item.tab);
                        onClose();
                      }}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-950/50 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors shadow-sm">
                          <ItemIcon size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</p>
                          <span className="text-[10px] text-slate-400">{item.type}</span>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* No results */}
          {userResults.length === 0 && filteredNav.length === 0 && (
            <div className="p-10 text-center text-xs text-slate-400">
              No matching registered users, technicians, or admin pages found for &quot;<span className="font-bold text-slate-700 dark:text-slate-300">{query}</span>&quot;
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
          <span>Press <strong className="text-slate-700 dark:text-slate-200">ESC</strong> to close</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">Phidim Master Admin Real-Time Search</span>
        </div>
      </motion.div>
    </div>
  );
}
