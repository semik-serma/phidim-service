import { motion } from "motion/react";
import { User, Phone, Mail, MapPin, CheckCircle2, Star, Clock, Edit, Tag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function UserProfileAndTimeline({ onOpenSettings }) {
  const { user } = useAuth();

  const displayName = user?.displayName || user?.name || (user?.email ? user.email.split("@")[0] : "Phidim User");
  const displayEmail = user?.email || "";
  const displayPhone = user?.phone || "";
  const displayAddress = user?.address || "Phidim, Panchthar";
  const usernameHandle = user?.username ? `@${user.username}` : user?.email ? `@${user.email.split("@")[0]}` : "";
  const userInitials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const activities = [
    { title: "Booking #PS-9482 Created", desc: "4K CCTV Setup requested for Phidim Ward 1", time: "10 mins ago", color: "bg-emerald-500 text-white", icon: CheckCircle2 },
    { title: "Technician Niraj Sunuwar Dispatched", desc: "En route on Honda motorcycle (8 mins ETA)", time: "15 mins ago", color: "bg-amber-500 text-white", icon: Clock },
    { title: "Payment via eSewa Verified", desc: "NPR 18,900 held in secure escrow", time: "25 mins ago", color: "bg-blue-500 text-white", icon: CheckCircle2 },
    { title: "5-Star Review Posted", desc: "Rated Subash Tamang for House Rewiring", time: "Yesterday", color: "bg-purple-500 text-white", icon: Star },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Customer Profile Card (1 Column) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 dark:bg-slate-900/90 rounded-[26px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6 space-y-5"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <User className="text-emerald-500" size={20} />
            My Customer Profile
          </h3>
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors cursor-pointer"
            title="Edit Account Settings"
          >
            <Edit size={16} />
          </button>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={displayName}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/50 shadow-md"
            />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-black text-lg flex items-center justify-center shadow-md">
              {userInitials}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="text-base font-black text-slate-900 dark:text-white truncate">{displayName}</h4>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 text-[10px] font-extrabold border border-amber-500/30">
                Gold ⭐
              </span>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold mt-0.5">{usernameHandle}</p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <Phone size={15} className="text-emerald-500 shrink-0" />
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{displayPhone}</span>
          </div>
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <Mail size={15} className="text-blue-500 shrink-0" />
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{displayEmail}</span>
          </div>
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <MapPin size={15} className="text-rose-500 shrink-0" />
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{displayAddress}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 text-center text-xs">
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Total Bookings</span>
            <p className="text-lg font-black text-slate-900 dark:text-white font-mono">14 Jobs</p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-500/30">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Reward Points</span>
            <p className="text-lg font-black text-amber-600 dark:text-amber-400 font-mono">450 Pts</p>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity Timeline (2 Columns) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="lg:col-span-2 bg-white/90 dark:bg-slate-900/90 rounded-[26px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Clock className="text-blue-500" size={20} />
            My Recent Activity Stream
          </h3>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">
            Full Audit Log
          </span>
        </div>

        <div className="relative pl-6 space-y-5 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {activities.map((act, index) => {
            const ActIcon = act.icon;
            return (
              <div key={index} className="relative flex items-start gap-4">
                <div className={`absolute -left-6 top-0.5 w-6 h-6 rounded-full ${act.color} flex items-center justify-center text-xs shadow-md`}>
                  <ActIcon size={13} />
                </div>
                <div className="min-w-0 flex-1 bg-slate-50/60 dark:bg-slate-800/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/60">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black text-slate-900 dark:text-white">{act.title}</p>
                    <span className="text-[10px] text-slate-400">{act.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{act.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
