import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  CalendarPlus,
  BookOpen,
  Navigation,
  CreditCard,
  MessageSquare,
  Star,
  Gift,
  Heart,
  History,
  Bell,
  User,
  UserPlus,
  Settings,
  HelpCircle,
  LogOut,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const USER_NAV_ITEMS = [
  { id: "home", name: "Back to Home Page", icon: Home, badge: "Website", badgeColor: "bg-emerald-600 text-white font-extrabold", path: "/" },
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, badge: null, path: "/user/dashboard" },
  { id: "book", name: "Book Service", icon: CalendarPlus, badge: "Quick", badgeColor: "bg-emerald-500 text-white", path: "/user/book-service" },
  { id: "my-bookings", name: "My Bookings", icon: BookOpen, badge: "3 Active", badgeColor: "bg-blue-500 text-white", path: "/user/requests" },
  { id: "track", name: "Track Technician", icon: Navigation, badge: "Live", badgeColor: "bg-amber-500 text-white animate-pulse" },
  { id: "payments", name: "Payments & Wallet", icon: CreditCard, badge: "NPR 4.5k" },
  { id: "friends", name: "Find Friends", icon: UserPlus, badge: "Community", badgeColor: "bg-emerald-500 text-white" },
  { id: "messages", name: "Messages", icon: MessageSquare, badge: "2" },
  { id: "reviews", name: "My Reviews", icon: Star, badge: null },
  { id: "offers", name: "Offers & Coupons", icon: Gift, badge: "20% OFF", badgeColor: "bg-rose-500 text-white" },
  { id: "favorites", name: "Favorites", icon: Heart, badge: null },
  { id: "history", name: "Booking History", icon: History, badge: null, path: "/user/history" },
  { id: "notifications", name: "Notifications", icon: Bell, badge: "4", path: "/user/notifications" },
  { id: "account-settings", name: "Account Settings", icon: Settings, badge: "Edit", badgeColor: "bg-emerald-600 text-white", path: "/user/settings" },
  { id: "help", name: "Help Center", icon: HelpCircle, badge: "24/7" },
  { id: "logout", name: "Logout", icon: LogOut, badge: null, isDanger: true },
];

export function UserSidebar({ activeTab, setActiveTab, collapsed, setCollapsed, mobileOpen, setMobileOpen, onLogout }) {
  const router = useRouter();
  const { user } = useAuth();

  const displayName = user?.name || "Customer User";
  const displayEmail = user?.email || "user@phidim.np";
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
        className={`fixed top-0 left-0 z-50 h-screen bg-[#071812] dark:bg-[#040d0a] text-slate-300 border-r border-emerald-900/30 shadow-[12px_0_40px_rgba(2,44,34,0.12)] transition-all duration-300 flex flex-col ${
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
                  <span className="px-1 py-0.2 rounded bg-blue-500/20 text-blue-400 text-[9px] font-bold uppercase tracking-wider border border-blue-500/30">
                    USER
                  </span>
                </Link>
                <p className="text-[10px] text-emerald-400/70 font-medium truncate">
                  Customer Hub
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
          {USER_NAV_ITEMS.map((item) => {
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
                    layoutId="userNavIndicator"
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

        {/* Footer User Profile Card */}
        {!collapsed && (
          <div className="p-4 border-t border-emerald-900/30 bg-[#040d0a] space-y-3">
            <div className="bg-emerald-950/40 border border-emerald-800/30 rounded-2xl p-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Wallet Credit</span>
                <p className="text-sm font-black text-white font-mono">NPR 4,500</p>
              </div>
              <button className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-md">
                + Top Up
              </button>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-2xl bg-emerald-950/20 border border-emerald-900/40">
              {user?.avatar ? (
                <img src={user.avatar} alt={displayName} className="w-9 h-9 rounded-xl object-cover ring-2 ring-emerald-500/50" />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white text-xs font-black flex items-center justify-center shadow">
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
