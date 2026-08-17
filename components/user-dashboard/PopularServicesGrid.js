"use client";

import { motion } from "motion/react";
import {
  AirVent,
  Zap,
  Camera,
  Droplet,
  Tv,
  Disc,
  Refrigerator,
  Filter,
  Monitor,
  Network,
  Home,
  Paintbrush,
  Hammer,
  Sparkles,
  Sun,
  Wifi,
  Star,
  Clock,
  ArrowRight,
} from "lucide-react";

export const SERVICES = [
  { id: 1, name: "AC Repair & Servicing", desc: "Filter cleaning, gas refill, and cooling overhaul.", price: "NPR 1,800", rating: 4.9, reviews: 184, time: "45 mins", icon: AirVent, color: "from-blue-500 to-indigo-600" },
  { id: 2, name: "Electrical Rewiring", desc: "Short circuit repair, DB box setup, socket repair.", price: "NPR 950", rating: 4.95, reviews: 240, time: "30 mins", icon: Zap, color: "from-amber-500 to-orange-600" },
  { id: 3, name: "CCTV Installation", desc: "4K HD Night vision camera installation & app view.", price: "NPR 3,500", rating: 4.98, reviews: 310, time: "60 mins", icon: Camera, color: "from-emerald-500 to-teal-600" },
  { id: 4, name: "Plumbing Service", desc: "Tap leakage, pipe fittings, motor setup & drainage.", price: "NPR 850", rating: 4.88, reviews: 142, time: "30 mins", icon: Droplet, color: "from-cyan-500 to-blue-600" },
  { id: 5, name: "DishHome & TV Repair", desc: "DishHome alignment, TV wall mount, channel setup.", price: "NPR 1,200", rating: 4.92, reviews: 290, time: "25 mins", icon: Tv, color: "from-purple-500 to-violet-600" },
  { id: 6, name: "Washing Machine Repair", desc: "Drum fix, spin motor repair, error code clearing.", price: "NPR 1,500", rating: 4.85, reviews: 98, time: "40 mins", icon: Disc, color: "from-pink-500 to-rose-600" },
  { id: 7, name: "Refrigerator Service", desc: "Gas charging, thermostat fix, compressor setup.", price: "NPR 1,600", rating: 4.87, reviews: 115, time: "45 mins", icon: Refrigerator, color: "from-teal-500 to-emerald-600" },
  { id: 8, name: "Water Purifier (RO)", desc: "RO filter replacement, TDS check & installation.", price: "NPR 1,100", rating: 4.9, reviews: 88, time: "35 mins", icon: Filter, color: "from-blue-600 to-cyan-500" },
  { id: 9, name: "Computer Repair", desc: "OS formatting, hardware upgrade, virus removal.", price: "NPR 1,000", rating: 4.91, reviews: 176, time: "30 mins", icon: Monitor, color: "from-violet-500 to-purple-600" },
  { id: 10, name: "Networking & Fiber", desc: "Router setup, WiFi extension, LAN cabling.", price: "NPR 1,400", rating: 4.94, reviews: 165, time: "35 mins", icon: Network, color: "from-emerald-600 to-green-500" },
  { id: 11, name: "Full House Wiring", desc: "Complete home electrical architecture & safety.", price: "NPR 8,500", rating: 4.97, reviews: 82, time: "1-2 Days", icon: Home, color: "from-amber-600 to-orange-500" },
  { id: 12, name: "Interior House Painting", desc: "Wall putty, primer coat, premium emulsion paint.", price: "NPR 12,000", rating: 4.86, reviews: 64, time: "2-3 Days", icon: Paintbrush, color: "from-rose-500 to-red-600" },
  { id: 13, name: "Carpenter & Furniture", desc: "Door repair, lock replacement, wardrobe setup.", price: "NPR 1,200", rating: 4.89, reviews: 92, time: "45 mins", icon: Hammer, color: "from-orange-500 to-amber-600" },
  { id: 14, name: "Deep Home Cleaning", desc: "Kitchen, bathroom & sofa deep sanitization.", price: "NPR 2,800", rating: 4.93, reviews: 120, time: "2 Hours", icon: Sparkles, color: "from-teal-500 to-emerald-600" },
  { id: 15, name: "Solar System Setup", desc: "Inverter setup, solar panel alignment & battery.", price: "NPR 15,000", rating: 4.99, reviews: 45, time: "1 Day", icon: Sun, color: "from-amber-400 to-yellow-600" },
  { id: 16, name: "High-Speed Fiber Setup", desc: "DishHome Fiber optic setup & optical node test.", price: "NPR 2,200", rating: 4.96, reviews: 210, time: "40 mins", icon: Wifi, color: "from-blue-500 to-emerald-600" },
];

export function PopularServicesGrid({ onSelectService }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Popular Services in Phidim
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold border border-emerald-500/30">
              16 Categories
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Book certified local specialists with upfront transparent pricing
          </p>
        </div>

        <button className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline self-start sm:self-auto">
          View All Services →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {SERVICES.map((s, index) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
            whileHover={{ y: -3, scale: 1.01 }}
            className="group bg-white dark:bg-slate-900/90 rounded-xl border border-slate-200/80 dark:border-emerald-900/30 shadow-sm hover:border-emerald-500/40 transition-all p-3.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${s.color} text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                  <s.icon size={17} />
                </div>
                <div className="flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-amber-50 dark:bg-amber-950/80 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] font-extrabold">
                  <Star size={10} className="fill-amber-400 stroke-amber-500" />
                  <span>{s.rating}</span>
                </div>
              </div>

              <h4 className="text-xs font-black text-slate-900 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {s.name}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                {s.desc}
              </p>
            </div>

            <div className="pt-2.5 mt-2.5 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">From</span>
                  <span className="text-xs font-black text-slate-900 dark:text-white font-mono">{s.price}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 font-medium flex items-center gap-1 justify-end">
                    <Clock size={10} className="text-emerald-500" /> {s.time}
                  </span>
                  <span className="text-[9px] text-slate-500 font-semibold">{s.reviews} Reviews</span>
                </div>
              </div>

              <button
                onClick={() => onSelectService(s)}
                className="w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Book Now</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
