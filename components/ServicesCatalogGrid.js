"use client";

import { useState, useMemo } from "react";
import {
  Wrench,
  Zap,
  ShieldCheck,
  Wifi,
  Wind,
  Tv,
  Droplet,
  Monitor,
  Search,
  Clock,
  CheckCircle2,
  CalendarCheck,
  PhoneCall,
  Sparkles,
  ArrowRight,
  Filter,
} from "lucide-react";
import { motion } from "motion/react";
import { SERVICES, SERVICE_CATEGORIES } from "@/data/services";

export function ServicesCatalogGrid({
  selectedCategory = "ALL",
  searchQuery = "",
  onSelectCategory,
  onResetFilters,
  onBookService,
  onConsultTechnician,
}) {
  const [activeCategory, setActiveCategory] = useState(selectedCategory || "ALL");
  const [activeSort, setActiveSort] = useState("POPULAR");

  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesCategory =
        activeCategory === "ALL" ||
        activeCategory === "All Services" ||
        service.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
        activeCategory.toLowerCase().includes(service.category.toLowerCase());

      const q = (searchQuery || "").trim().toLowerCase();
      const matchesSearch =
        !q ||
        service.name.toLowerCase().includes(q) ||
        service.category.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q) ||
        service.checklist.some((item) => item.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (activeSort === "PRICE_LOW") return a.basePrice - b.basePrice;
      if (activeSort === "PRICE_HIGH") return b.basePrice - a.basePrice;
      if (activeSort === "RATING") return b.rating - a.rating;
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });
  }, [activeCategory, searchQuery, activeSort]);

  const getCategoryIcon = (catName) => {
    const c = (catName || "").toLowerCase();
    if (c.includes("elect") || c.includes("inverter")) return <Zap size={14} className="text-amber-500" />;
    if (c.includes("cctv") || c.includes("secu")) return <ShieldCheck size={14} className="text-emerald-500" />;
    if (c.includes("fiber") || c.includes("lan") || c.includes("netw")) return <Wifi size={14} className="text-blue-500" />;
    if (c.includes("ac") || c.includes("cool") || c.includes("refrig")) return <Wind size={14} className="text-teal-500" />;
    if (c.includes("dth") || c.includes("dish") || c.includes("tv")) return <Tv size={14} className="text-rose-500" />;
    if (c.includes("plumb")) return <Droplet size={14} className="text-cyan-500" />;
    if (c.includes("comp") || c.includes("it")) return <Monitor size={14} className="text-purple-500" />;
    return <Wrench size={14} className="text-emerald-500" />;
  };

  return (
    <section id="services-showcase" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-extrabold text-xs mb-1.5 uppercase tracking-wider">
            <Wrench size={14} />
            <span>On-Demand Technical Services</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Certified Doorstep Services & Repair Packages
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Book verified technicians for home & business installations across Phidim & Panchthar.
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sort by:</span>
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="POPULAR">Most Requested</option>
            <option value="PRICE_LOW">Price: Low to High</option>
            <option value="PRICE_HIGH">Price: High to Low</option>
            <option value="RATING">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Service Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => {
            setActiveCategory("ALL");
            if (onSelectCategory) onSelectCategory("ALL");
          }}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer shadow-xs ${
            activeCategory === "ALL" || activeCategory === "All Services"
              ? "bg-emerald-600 text-white shadow-emerald-600/30 scale-102"
              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
          }`}
        >
          All Services ({SERVICES.length})
        </button>

        {SERVICE_CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
          const isSelected = activeCategory === cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.name);
                if (onSelectCategory) onSelectCategory(cat.name);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer shadow-xs ${
                isSelected
                  ? "bg-emerald-600 text-white shadow-emerald-600/30 scale-102"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {getCategoryIcon(cat.name)}
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="group flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all overflow-hidden"
          >
            {/* Top Media & Tags */}
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 text-white text-[11px] font-black uppercase backdrop-blur-md border border-white/10 shadow">
                    {getCategoryIcon(service.category)}
                    <span>{service.category}</span>
                  </span>
                  {service.isPopular && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase shadow">
                      Popular
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="flex items-center gap-1 font-bold text-slate-200">
                    <Clock size={13} className="text-emerald-400" />
                    <span>{service.duration}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-[10px] font-extrabold backdrop-blur-md">
                    {service.warranty}
                  </span>
                </div>
              </div>

              {/* Service Info */}
              <div className="p-5 space-y-3.5">
                <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    What's Included:
                  </span>
                  <ul className="space-y-1">
                    {service.checklist.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Pricing & Action Buttons */}
            <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-2 space-y-3">
              <div className="flex items-baseline justify-between pt-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Labor & Diagnostic</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400">
                      Rs. {service.basePrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">/{service.priceUnit}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Book Service */}
                <button
                  onClick={() => {
                    if (onBookService) {
                      onBookService(service);
                    } else {
                      window.open(`https://wa.me/9779862772457?text=${encodeURIComponent(`Hello Phidim Service! I want to book: ${service.name}`)}`, "_blank");
                    }
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  <CalendarCheck size={15} />
                  <span>Book Service</span>
                </button>

                {/* Consult Technician */}
                <button
                  onClick={() => {
                    if (onConsultTechnician) {
                      onConsultTechnician(service);
                    } else {
                      window.location.href = "tel:+9779862772457";
                    }
                  }}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-slate-700 dark:text-slate-200 hover:text-emerald-600 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
                  title="Call for Technical Consultation"
                >
                  <PhoneCall size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
          <Wrench size={32} className="mx-auto text-slate-400" />
          <h4 className="text-base font-black text-slate-800 dark:text-slate-200">No Services Found</h4>
          <p className="text-xs text-slate-500">No services match "{searchQuery}". Try selecting another category.</p>
          <button
            onClick={() => {
              setActiveCategory("ALL");
              if (onResetFilters) onResetFilters();
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
