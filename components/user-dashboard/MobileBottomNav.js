"use client";

import { LayoutDashboard, CalendarPlus, BookOpen, Navigation, User } from "lucide-react";

export function MobileBottomNav({ activeTab, setActiveTab }) {
  const items = [
    { id: "dashboard", name: "Home", icon: LayoutDashboard },
    { id: "book", name: "Book", icon: CalendarPlus },
    { id: "my-bookings", name: "Bookings", icon: BookOpen },
    { id: "track", name: "Track", icon: Navigation },
    { id: "profile", name: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 lg:hidden px-2 py-2 flex items-center justify-around">
      {items.map((item) => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl text-[10px] font-bold transition-all ${
              isActive
                ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60"
                : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            <Icon size={18} className={isActive ? "text-emerald-500 stroke-[2.5]" : ""} />
            <span>{item.name}</span>
          </button>
        );
      })}
    </nav>
  );
}
