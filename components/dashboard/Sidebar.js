import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Wrench,
  Calendar,
  CreditCard,
  Star,
  TrendingUp,
  Boxes,
  Ticket,
  MessageSquare,
  Bell,
  Megaphone,
  Images,
  Settings,
  LogOut,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Zap,
  Home,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const NAV_ITEMS = [
  { id: "home", name: "Back to Home Page", icon: Home, badge: "Website", badgeColor: "bg-emerald-600 text-white font-extrabold", path: "/" },
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, badge: null, path: "/admin/dashboard" },
  { id: "users", name: "Users", icon: Users, badge: "14.8k", path: "/admin/users" },
  { id: "technicians", name: "Technicians", icon: UserCheck, badge: "164", path: "/admin/technicians" },
  { id: "services", name: "Services", icon: Wrench, badge: null, path: "/admin/services" },
  { id: "bookings", name: "Bookings", icon: Calendar, badge: "12", badgeColor: "bg-emerald-500 text-white", path: "/admin/jobs" },
  { id: "payments", name: "Payments", icon: CreditCard, badge: null, path: "/admin/payments" },
  { id: "reviews", name: "Reviews", icon: Star, badge: "4.9 ★", path: "/admin/reviews" },
  { id: "analytics", name: "Analytics", icon: TrendingUp, badge: "Hot", path: "/admin/analytics" },
  { id: "categories", name: "Categories", icon: Boxes, badge: null, path: "/admin/categories" },
  { id: "coupons", name: "Coupons", icon: Ticket, badge: "New" },
  { id: "friends", name: "Find Friends", icon: UserCheck, badge: "Community", badgeColor: "bg-emerald-500 text-white" },
  { id: "messages", name: "Messages", icon: MessageSquare, badge: "5", badgeColor: "bg-blue-500 text-white", path: "/admin/support" },
  { id: "announcements", name: "Announcements", icon: Megaphone, badge: "Live", badgeColor: "bg-emerald-600 text-white font-extrabold" },
  { id: "carousel", name: "Homepage Carousel", icon: Images, badge: "Media", badgeColor: "bg-violet-500 text-white" },
  { id: "account-settings", name: "Account Settings", icon: Settings, badge: "Edit", badgeColor: "bg-emerald-600 text-white", path: "/admin/settings" },
  { id: "logout", name: "Logout", icon: LogOut, badge: null, isDanger: true },
];

export function Sidebar({ activeTab, setActiveTab, collapsed, setCollapsed, mobileOpen, setMobileOpen, onLogout }) {
  const router = useRouter();
  const { user } = useAuth();

  const displayName = user?.name || "Phidim Admin";
  const displayEmail = user?.email || "admin@phidim.np";
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
                    ADMIN
                  </span>
                </Link>
                <p className="text-[10px] text-emerald-400/70 font-medium truncate">
                  Admin Command Center
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
          {NAV_ITEMS.map((item) => {
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
                    layoutId="adminNavIndicator"
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
                  <Zap size={12} className="text-amber-400 animate-pulse" /> Dispatch Hub
                </span>
                <span className="text-emerald-400 font-mono text-[11px]">84% Active</span>
              </div>
              <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden border border-emerald-800/40">
                <div className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 rounded-full w-[84%]" />
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5">Phidim & Panchthar Operations</p>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-2xl bg-emerald-950/20 border border-emerald-900/40">
              {user?.avatar ? (
                <img src={user.avatar} alt={displayName} className="w-9 h-9 rounded-xl object-cover ring-2 ring-emerald-500/50" />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-blue-600 flex items-center justify-center text-white text-xs font-black shadow">
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
