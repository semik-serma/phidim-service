"use client";

import { useState, useEffect } from "react";
import { X, Megaphone, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { WeatherWidget } from "./WeatherWidget";

// Global in-memory store (no backend needed — mirrors the admin panel writes)
let _announcements = [
  {
    id: "ann-1",
    text: "🎉 Special Offer — Up to 50% OFF on all AC servicing & electrical repairs this month! Use code PHIDIM50.",
    color: "emerald",
    active: true,
    link: "",
  },
  {
    id: "ann-2",
    text: "📡 DishHome Ultra HD packages now available with 50% discount in Phidim. Free installation.",
    color: "blue",
    active: true,
    link: "",
  },
];

let _listeners = [];

export function getAnnouncements() {
  return _announcements;
}

export function setAnnouncements(list) {
  _announcements = list;
  _listeners.forEach((fn) => fn([..._announcements]));
}

export function subscribeAnnouncements(fn) {
  _listeners.push(fn);
  return () => { _listeners = _listeners.filter((l) => l !== fn); };
}

const COLORS = {
  emerald: {
    bar: "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700",
    dot: "bg-emerald-300",
    close: "hover:bg-emerald-800/60 text-emerald-100",
  },
  blue: {
    bar: "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700",
    dot: "bg-blue-300",
    close: "hover:bg-blue-800/60 text-blue-100",
  },
  amber: {
    bar: "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600",
    dot: "bg-amber-200",
    close: "hover:bg-amber-700/60 text-amber-100",
  },
  rose: {
    bar: "bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700",
    dot: "bg-rose-300",
    close: "hover:bg-rose-800/60 text-rose-100",
  },
  purple: {
    bar: "bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700",
    dot: "bg-purple-300",
    close: "hover:bg-purple-800/60 text-purple-100",
  },
};

export function AnnouncementBanner() {
  const [announcements, setLocal] = useState(() =>
    getAnnouncements().filter((a) => a.active)
  );
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const unsub = subscribeAnnouncements((list) => {
      setLocal(list.filter((a) => a.active));
      setCurrent(0);
      setDismissed(false);
    });
    return unsub;
  }, []);

  // Auto-rotate every 5 s
  useEffect(() => {
    if (announcements.length <= 1) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % announcements.length), 5000);
    return () => clearInterval(t);
  }, [announcements.length]);

  const active = announcements[current];
  if (!active || dismissed) return null;

  const palette = COLORS[active.color] || COLORS.emerald;

  return (
    <AnimatePresence>
      <motion.div
        key={active.id}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`relative w-full ${palette.bar} text-white text-xs font-semibold overflow-hidden z-40 border-b border-white/10`}
      >
        <div className="max-w-[1700px] mx-auto px-3 sm:px-6 lg:px-8 py-1.5 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
          
          {/* Left: Weather Detection (Rain Today, Degrees Celsius, Icon) */}
          <div className="flex items-center gap-2 shrink-0">
            <WeatherWidget />
          </div>

          {/* Center: Offers Text with 50% Discounts & Rotating Announcements */}
          <div className="flex items-center justify-center gap-2 flex-1 min-w-0 text-center">
            <Megaphone size={14} className="shrink-0 opacity-90 text-amber-300 animate-bounce" />
            <span className="truncate leading-snug font-bold text-xs sm:text-[13px]">
              {active.text}
              {active.link && (
                <a
                  href={active.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 underline underline-offset-2 opacity-90 hover:opacity-100 font-black text-amber-200"
                >
                  Learn more →
                </a>
              )}
            </span>

            {/* Navigation Dots if multiple */}
            {announcements.length > 1 && (
              <div className="hidden xl:flex items-center gap-2 shrink-0 ml-2">
                <button
                  type="button"
                  onClick={() => setCurrent((p) => (p - 1 + announcements.length) % announcements.length)}
                  className="p-0.5 rounded opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                  title="Previous announcement"
                >
                  <ChevronLeft size={13} />
                </button>
                <div className="flex items-center gap-1">
                  {announcements.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrent(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                        i === current ? `${palette.dot} scale-125` : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setCurrent((p) => (p + 1) % announcements.length)}
                  className="p-0.5 rounded opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                  title="Next announcement"
                >
                  <ChevronRight size={13} />
                </button>
              </div>
            )}
          </div>

          {/* Right: Cancel / Dismiss Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className={`shrink-0 p-1.5 rounded-lg transition-colors cursor-pointer ${palette.close}`}
              title="Dismiss announcement banner"
              aria-label="Dismiss announcement banner"
            >
              <X size={14} />
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
