"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  X,
  LayoutDashboard,
  CalendarPlus,
  BookOpen,
  Navigation,
  CreditCard,
  MessageSquare,
  Star,
  ArrowRight,
  Wrench,
  UserPlus,
  Users,
  UserCheck,
} from "lucide-react";

const DEMO_REGISTERED_USERS = [
  {
    id: "usr-tech-rajesh",
    name: "Rajesh Tamang",
    displayName: "Rajesh Tamang (AC Specialist)",
    role: "TECHNICIAN",
    email: "rajesh@phidim.np",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    bio: "Senior AC & Cooling Specialist in Phidim Ward 4",
  },
  {
    id: "usr-cust-saraswati",
    name: "Saraswati Subedi",
    displayName: "Saraswati Subedi",
    role: "USER",
    email: "saraswati@phidim.np",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    bio: "Homeowner in Phidim Ward 2",
  },
  {
    id: "usr-cust-bikash",
    name: "Bikash Thapa",
    displayName: "Bikash Thapa",
    role: "USER",
    email: "bikash@phidim.np",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    bio: "Store manager at Main Bazar Phidim",
  },
  {
    id: "usr-tech-anita",
    name: "Anita Rai",
    displayName: "Anita Rai (Fiber Expert)",
    role: "TECHNICIAN",
    email: "anita@phidim.np",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    bio: "DishHome Fiber Optic splicing expert",
  },
  {
    id: "usr-admin-phidim",
    name: "Dhanraj Serma",
    displayName: "Dhanraj Serma (Master Admin)",
    role: "ADMIN",
    email: "dhanrajserma34@gmail.com",
    avatar: "/dhanraj.png",
    bio: "Master Platform Administrator",
  },
];

export function UserCommandPalette({ isOpen, onClose, onSelectTab }) {
  const [query, setQuery] = useState("");
  const [userResults, setUserResults] = useState([]);

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

  // Fetch real-time user search results
  useEffect(() => {
    if (!query.trim()) {
      setUserResults(DEMO_REGISTERED_USERS);
      return;
    }

    let isMounted = true;
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.users) && data.users.length > 0) {
            if (isMounted) setUserResults(data.users);
            return;
          }
        }
      } catch (e) {
        // fallback to filtering demo users
      }
      if (isMounted) {
        const filteredDemo = DEMO_REGISTERED_USERS.filter(
          (u) =>
            u.name.toLowerCase().includes(query.toLowerCase()) ||
            u.displayName.toLowerCase().includes(query.toLowerCase()) ||
            u.email.toLowerCase().includes(query.toLowerCase()) ||
            u.role.toLowerCase().includes(query.toLowerCase())
        );
        setUserResults(filteredDemo);
      }
    };

    const timer = setTimeout(fetchUsers, 200);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [query]);

  if (!isOpen) return null;

  const SEARCH_ITEMS = [
    { type: "Community", name: "Find Friends & Add Users (Accept/Decline Requests)", tab: "friends", icon: UserPlus },
    { type: "View", name: "User Dashboard Overview", tab: "dashboard", icon: LayoutDashboard },
    { type: "View", name: "Book a Service", tab: "book", icon: CalendarPlus },
    { type: "View", name: "My Active Bookings (3)", tab: "my-bookings", icon: BookOpen },
    { type: "View", name: "Live GPS Technician Tracker", tab: "track", icon: Navigation },
    { type: "View", name: "Payments & Phidim Wallet", tab: "payments", icon: CreditCard },
    { type: "View", name: "Messages & Live Chat", tab: "messages", icon: MessageSquare },
    { type: "View", name: "Coupons & Special Discounts", tab: "offers", icon: Star },
    { type: "Service", name: "DishHome & TV Alignment", tab: "book", icon: Wrench },
    { type: "Service", name: "4K CCTV Camera Setup", tab: "book", icon: Wrench },
    { type: "Service", name: "AC Repair & Servicing", tab: "book", icon: Wrench },
    { type: "Service", name: "House Electrical Rewiring", tab: "book", icon: Wrench },
  ];

  const filteredItems = SEARCH_ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Search Header */}
        <div className="relative flex items-center border-b border-slate-100 dark:border-slate-800 px-5 py-4">
          <Search size={22} className="text-emerald-500 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users, friends, technicians, or services... (e.g. Rajesh, Anita, CCTV, AC)"
            className="w-full bg-transparent text-slate-900 dark:text-white text-sm font-bold placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Results Area */}
        <div className="max-h-[460px] overflow-y-auto p-3 space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
          
          {/* Section 1: Matching Registered Users & Friends */}
          {userResults.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between px-3 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Users size={14} /> Registered Users & Technicians ({userResults.length})
                </span>
                <span className="text-[10px] text-slate-400 lowercase">Click to open friends tab</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {userResults.map((u) => (
                  <div
                    key={u.id || u.email}
                    onClick={() => {
                      onSelectTab("friends");
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={u.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                        alt={u.name}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/40 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                            {u.displayName || u.name}
                          </p>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate">{u.role} • {u.email}</p>
                      </div>
                    </div>

                    <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform shrink-0">
                      Add Friend →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Services & Page Shortcuts */}
          {filteredItems.length > 0 && (
            <div className="space-y-1 pt-3">
              <div className="px-3 text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                Services & Quick Dashboard Pages
              </div>
              {filteredItems.map((item, index) => {
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
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
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
          )}

          {userResults.length === 0 && filteredItems.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400">
              No matching users, technicians, or services found for "{query}"
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Press <strong>ESC</strong> to exit search</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">Phidim Live User & Service Search</span>
        </div>
      </motion.div>
    </div>
  );
}
