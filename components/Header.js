"use client";

import Link from "next/link";
import { Search, Heart, User, Eye, Facebook, Youtube, Linkedin, Globe, ExternalLink, LayoutDashboard, LogOut, Wrench } from "lucide-react";
import { SERVICE_CATEGORIES } from "../data/services";
import { formatCount } from "../utils/formatCount";
import { useAuth } from "@/context/AuthContext";
import { RopePullingDevBadge } from "./RopePullingDevBadge";

export const Header = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  visitorCount = 1285,
  onOpenAuth,
  onSearchSubmit
}) => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearchSubmit) {
      onSearchSubmit();
    }
  };

  return (
    <header className="font-navbar bg-white border-b border-gray-200 py-2.5 sm:py-3 px-3 sm:px-4 md:px-6" data-navbar="true">
      <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row items-center justify-between md:justify-center gap-4 md:gap-[150px]">
        
        {/* Brand Logo - Desktop & Tablet */}
        <div className="hidden md:flex items-center gap-2 cursor-pointer select-none shrink-0" onClick={() => setSelectedCategory("ALL")}>
          <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-green-500/80 shadow-xs hover:scale-105 transition-transform bg-slate-950 p-0.5 shrink-0">
            <img
              src="/logo.png"
              alt="Phidim Service Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-black text-gray-900 tracking-tight leading-none flex items-center gap-1">
              <span>PHIDIM SERVICE</span>
            </h1>
            <p className="text-[9px] text-gray-500 font-semibold tracking-wider uppercase mt-0.5">
              Panchthar • Koshi • Nepal
            </p>
          </div>
        </div>

        {/* Search Bar Container */}
        <div className="flex-1 w-full max-w-full md:max-w-xl lg:max-w-2xl">
          <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-600/20 transition-all bg-white shadow-xs">
            <input
              type="text"
              placeholder="Search technical services & repair specialists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm text-gray-800 focus:outline-hidden font-medium"
            />
            <div className="hidden sm:block border-l border-gray-200 bg-gray-50 px-2.5 py-1.5">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-xs text-gray-700 font-bold focus:outline-hidden cursor-pointer py-0.5 uppercase"
              >
                <option value="ALL">ALL SERVICES</option>
                {SERVICE_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={onSearchSubmit}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold transition-colors flex items-center justify-center cursor-pointer gap-1.5 shrink-0"
              title="Search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline text-xs uppercase tracking-wider font-extrabold">Search</span>
            </button>
          </div>
        </div>

        {/* Social Links, Visitor Counter & Portfolio - Tight padding & gaps */}
        <div className="flex items-center gap-1.5 sm:gap-2 w-full md:w-auto justify-between md:justify-end shrink-0">
          <div className="flex items-center gap-1.5">
            {!isAuthenticated && (
              <div className="hidden lg:flex items-center gap-1">
                <a
                  href="https://www.facebook.com/dhanraj.serma.14"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-5.5 h-5.5 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-2xs"
                  title="Facebook: Dhanraj Serma"
                >
                  <Facebook className="w-3 h-3 fill-current" />
                </a>
                <a
                  href="https://www.youtube.com/@semikserma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-5.5 h-5.5 rounded-full bg-[#ff0000] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-2xs"
                  title="YouTube: @semikserma"
                >
                  <Youtube className="w-3 h-3 fill-current" />
                </a>
                <a
                  href="https://www.linkedin.com/in/semik-serma-8263a3391/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-5.5 h-5.5 rounded-full bg-[#0a66c2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-2xs"
                  title="LinkedIn: Semik Serma"
                >
                  <Linkedin className="w-3 h-3 fill-current" />
                </a>
              </div>
            )}

            {/* View Counter Badge - Compact */}
            <div className="hidden sm:flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-900 px-2 py-0.5 rounded-full text-[11px] font-black shadow-2xs" title="Total Visitor Count">
              <Eye className="w-3 h-3 text-blue-600 animate-pulse shrink-0" />
              <span>{formatCount(visitorCount)} Views</span>
            </div>

            {/* Developer Portfolio with Animated Rope-Pulling Character */}
            <RopePullingDevBadge />
          </div>

        </div>

      </div>
    </header>
  );
};

