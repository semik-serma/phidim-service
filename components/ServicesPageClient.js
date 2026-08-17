"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Wrench,
  Zap,
  Camera,
  Monitor,
  Tv,
  Wifi,
  Droplet,
  Wind,
  Search,
  X,
  ChevronRight,
  Filter,
  RotateCcw
} from "lucide-react";

export function ServicesPageClient({ categories = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filterPills = [
    { id: "ALL", label: "All Services (सबै सेवाहरू)" },
    { id: "electrician-phidim", label: "⚡ Electrical & Inverter" },
    { id: "plumbing-phidim", label: "🚰 Plumbing & Sanitary" },
    { id: "cctv-phidim", label: "🎥 CCTV & Security" },
    { id: "fibernet-phidim", label: "📡 DishHome FiberNet" },
    { id: "internet-phidim", label: "🌐 WiFi & Internet" },
    { id: "dishhome-phidim", label: "📺 DishHome DTH" },
    { id: "computer-phidim", label: "💻 Computer Repair" },
    { id: "ac-cooling-phidim", label: "❄️ AC & Cooling" },
    { id: "networking-phidim", label: "🔌 LAN Networking" }
  ];

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchesCategory =
        selectedCategory === "ALL" ||
        cat.id === selectedCategory ||
        cat.title.toLowerCase().includes(selectedCategory.toLowerCase());

      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCategory;

      const matchesSearch =
        cat.title.toLowerCase().includes(q) ||
        cat.desc.toLowerCase().includes(q) ||
        cat.id.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [categories, selectedCategory, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory("ALL");
    setSearchQuery("");
  };

  const renderCategoryIcon = (iconName, id) => {
    switch (iconName || id) {
      case "Zap":
      case "electrician-phidim":
        return <Zap className="w-6 h-6" />;
      case "Droplet":
      case "plumbing-phidim":
        return <Droplet className="w-6 h-6" />;
      case "Camera":
      case "cctv-phidim":
        return <Camera className="w-6 h-6" />;
      case "Wifi":
      case "internet-phidim":
      case "fibernet-phidim":
        return <Wifi className="w-6 h-6" />;
      case "Tv":
      case "dishhome-phidim":
        return <Tv className="w-6 h-6" />;
      case "Monitor":
      case "computer-phidim":
        return <Monitor className="w-6 h-6" />;
      case "Wind":
      case "ac-cooling-phidim":
        return <Wind className="w-6 h-6" />;
      case "Wrench":
      case "networking-phidim":
      default:
        return <Wrench className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Filter & Search Controls Bar */}
      <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Live Search Input */}
          <div className="relative w-full sm:w-80 md:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services (e.g. electrical, plumbing, cctv)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9.5 pr-8 py-2 text-xs font-semibold bg-gray-50 border border-gray-300 rounded-xl focus:outline-hidden focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all text-gray-900"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Active Filter State Summary / Reset */}
          {(selectedCategory !== "ALL" || searchQuery.trim() !== "") && (
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs font-bold text-gray-600">
                Showing <strong className="text-gray-950 font-black">{filteredCategories.length}</strong> categories
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-700 px-3 py-1.5 rounded-xl text-xs font-black border border-rose-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Interactive Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
          {filterPills.map((pill) => {
            const isSelected = selectedCategory === pill.id;

            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setSelectedCategory(pill.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer shadow-2xs ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-xs scale-102 ring-2 ring-emerald-500/40"
                    : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Services List Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => {
            return (
              <div
                key={cat.id}
                className="bg-white border border-gray-200 hover:border-green-400 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center font-black shadow-xs`}
                  >
                    {renderCategoryIcon(cat.iconName, cat.id)}
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-lg font-black text-gray-900 group-hover:text-green-600 transition-colors">
                      {cat.title}
                    </h2>
                    <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] bg-green-50 text-green-700 font-black px-2.5 py-1 rounded-full border border-green-200">
                    AVAILABLE
                  </span>
                  <Link
                    href={`/services/${cat.id}`}
                    className="text-xs font-black text-slate-900 group-hover:text-green-600 flex items-center gap-1 transition-colors"
                  >
                    <span>View Rates & Techs</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
            <Filter className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-base font-black text-gray-900">
              No Services Found
            </h3>
            <p className="text-xs text-gray-500">
              We couldn&apos;t find any service category matching &quot;{searchQuery || selectedCategory}&quot;.
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-colors shadow-xs cursor-pointer inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Show All Services (सबै सेवाहरू)</span>
          </button>
        </div>
      )}
    </div>
  );
}
