"use client";

import {
  LayoutDashboard,
  Sparkles,
  Briefcase,
  Wallet,
  User,
} from "lucide-react";

export function MobileTechnicianBottomNav({ activeTab, setActiveTab }) {
  const items = [
    { id: "dashboard", name: "Home", icon: LayoutDashboard },
    { id: "new-jobs", name: "New Jobs", icon: Sparkles, badge: "3" },
    { id: "my-jobs", name: "Active Job", icon: Briefcase },
    { id: "wallet", name: "Wallet", icon: Wallet },
    { id: "documents", name: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#061510]/90 backdrop-blur-xl border-t border-slate-200 dark:border-emerald-900/40 px-3 py-2 lg:hidden shadow-2xl">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
                isActive
                  ? "text-emerald-600 dark:text-emerald-400 font-extrabold"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Icon size={20} className={isActive ? "scale-110 drop-shadow-[0_0_6px_rgba(34,197,94,0.5)]" : ""} />
              <span className="text-[10px] tracking-tight">{item.name}</span>

              {item.badge && (
                <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-black flex items-center justify-center animate-pulse">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
