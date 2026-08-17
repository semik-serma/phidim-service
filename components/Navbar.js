"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Wifi,
  Wind,
  Zap,
  Camera,
  Tv,
  Droplet,
  Monitor,
  Wrench,
  Heart,
  Search,
  User,
  Eye,
  Globe,
  ExternalLink,
  Facebook,
  Youtube,
  Linkedin,
  LogOut,
  LayoutDashboard,
  PhoneCall,
  CalendarCheck,
} from "lucide-react";
import { SERVICE_CATEGORIES } from "../data/services";
import { formatCount } from "../utils/formatCount";
import { useAuth } from "@/context/AuthContext";
import { RopePullingDevBadge } from "./RopePullingDevBadge";

export const Navbar = ({
  activeTab,
  setActiveTab,
  onSelectCategory,
  onOpenTechnicianAuth,
  onBookService,
  likeCount = 582,
  onIncrementLikes,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  visitorCount = 1285,
  onOpenAuth,
  onSearchSubmit
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLikeClick = () => {
    setHasLiked(true);
    if (onIncrementLikes) {
      onIncrementLikes();
    }
    setTimeout(() => setHasLiked(false), 800);
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Zap":
        return <Zap className="w-4 h-4 text-amber-500" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-4 h-4 text-green-600" />;
      case "Wifi":
        return <Wifi className="w-4 h-4 text-blue-600" />;
      case "Wind":
        return <Wind className="w-4 h-4 text-teal-600" />;
      case "Tv":
        return <Tv className="w-4 h-4 text-red-600" />;
      case "Droplet":
        return <Droplet className="w-4 h-4 text-cyan-600" />;
      case "Monitor":
        return <Monitor className="w-4 h-4 text-purple-600" />;
      default:
        return <Wrench className="w-4 h-4 text-emerald-600" />;
    }
  };

  const navItems = ["HOME", "ALL SERVICES", "LAN NETWORKING", "ABOUT", "CONTACT US"];

  return (
    <nav className="font-navbar bg-white border-b border-gray-200 relative z-30 shadow-xs px-6 sm:px-16 md:px-28 lg:px-44 xl:px-56" data-navbar="true">
      <div className="max-w-[1700px] mx-auto flex items-center justify-between py-2.5 md:py-1.5">
        
        {/* Left Side: Mobile Hamburger & Browse Categories */}
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-800 hover:text-green-600 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
            title="Open Mobile Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-gray-900" /> : <Menu className="w-5 h-5 text-gray-900" />}
          </button>

          {/* Browse Categories Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="bg-[#8cc63f] hover:bg-[#7db333] text-white font-extrabold py-2.5 px-6 sm:px-8 flex items-center gap-2.5 transition-colors text-xs uppercase tracking-wider cursor-pointer shadow-xs rounded-sm"
            >
              <Wrench className="w-4 h-4 hidden sm:block shrink-0" />
              <span>SERVICES</span>
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 shrink-0 ${isCategoryOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Categories Dropdown Menu */}
            {isCategoryOpen && (
              <div className="absolute top-full left-0 w-64 bg-white border border-gray-200 shadow-xl py-2 z-50 rounded-b-lg animate-in fade-in slide-in-from-top-2 duration-150">
                {SERVICE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.name);
                      setActiveTab("ALL SERVICES");
                      setIsCategoryOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs text-gray-700 hover:bg-green-50 hover:text-green-700 flex items-center justify-between transition-colors border-b border-gray-50 last:border-0 font-semibold cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      {getIcon(cat.icon)}
                      <span>{cat.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-bold">
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center Nav Links - Desktop */}
        <div className="hidden lg:flex items-center gap-5 text-xs font-semibold tracking-wide ml-4 xl:ml-6">
          {navItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  if (item === "HOME" || item === "ALL SERVICES") {
                    onSelectCategory("ALL");
                  }
                }}
                className={`py-2.5 px-3.5 rounded-md transition-all relative cursor-pointer uppercase whitespace-nowrap font-bold ${
                  isActive
                    ? 'text-green-700 font-extrabold bg-green-50/80 after:content-[""] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-green-600'
                    : "text-gray-600 hover:text-green-600 hover:bg-gray-50"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Right Side: Emergency Hotline, Like Button & Auth */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 text-xs">
          {/* 24/7 Emergency Hotline */}
          <a
            href="tel:+9779862772457"
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs transition-colors"
            title="Call Phidim Service Emergency Hotline"
          >
            <PhoneCall size={13} className="text-emerald-600 animate-pulse" />
            <span className="font-mono">+977 9862772457</span>
          </a>

          {/* Navbar Like Button */}
          <button
            onClick={handleLikeClick}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer border ${
              hasLiked
                ? "bg-red-500 text-white border-red-600 scale-105 shadow-xs"
                : "bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
            }`}
            title="Click to like Phidim Service!"
          >
            <Heart className={`w-3.5 h-3.5 ${hasLiked ? "fill-white animate-ping" : "fill-red-500 text-red-500"}`} />
            <span>{formatCount(likeCount)}</span>
          </button>

          {/* Authentication & Portal Links */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <Link
                href={user.dashboardPath || "/user/dashboard"}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-3 py-1.5 rounded-lg text-xs shadow-2xs transition-colors tracking-tight"
                title="Go to Dashboard"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Dashboard ({user.role})</span>
                <span className="md:hidden">Dashboard</span>
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-rose-200"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-600" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="flex items-center gap-1 text-xs font-bold text-gray-700 hover:text-green-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-gray-500" />
                <span className="tracking-tight">LOGIN</span>
              </Link>

              <Link
                href="/login?role=TECHNICIAN"
                className="hidden sm:flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-emerald-400 font-extrabold px-3 py-1.5 rounded-lg text-xs shadow-2xs transition-colors tracking-tight border border-slate-800"
                title="Open Technician Portal Login"
              >
                <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tech Portal</span>
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* Mobile Navigation Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Side Drawer Content */}
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-250 overflow-y-auto">
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-slate-950 text-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-900 border border-green-500 p-0.5 overflow-hidden shrink-0">
                  <img src="/logo.png" alt="Phidim Service Logo" className="w-full h-full object-contain rounded-full" />
                </div>
                <div>
                  <h2 className="font-black text-sm tracking-tight text-white leading-none">PHIDIM SERVICE</h2>
                  <p className="text-[9px] text-gray-400 font-semibold uppercase mt-1">Panchthar • Koshi • Nepal</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search Input */}
            <div className="p-3.5 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white focus-within:border-green-600 shadow-2xs">
                <input
                  type="text"
                  placeholder="Search technical services & repair specialists..."
                  value={searchQuery || ""}
                  onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && onSearchSubmit) {
                      onSearchSubmit();
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className="flex-1 px-3 py-2 text-xs text-gray-800 focus:outline-hidden font-medium"
                />
                <button
                  onClick={() => {
                    if (onSearchSubmit) onSearchSubmit();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-3.5 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  title="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile Authentication & Portal Buttons inside Hamburger Menu */}
            <div className="p-3.5 border-b border-gray-100 bg-emerald-50/50 space-y-2">
              <h3 className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">Account & Access</h3>
              {isAuthenticated && user ? (
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href={user.dashboardPath || "/user/dashboard"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-black flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Dashboard ({user.role})</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="py-2 px-3 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2.5 px-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-black flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>LOGIN</span>
                  </Link>
                  <Link
                    href="/login?role=TECHNICIAN"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-emerald-400 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 shadow-2xs border border-slate-800"
                  >
                    <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Tech Portal</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Action Badges Grid */}
            <div className="p-3.5 border-b border-gray-100 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  if (onBookService) onBookService();
                  setIsMobileMenuOpen(false);
                }}
                className="relative flex flex-col items-center justify-center p-2.5 bg-green-50 hover:bg-green-100 rounded-xl border border-green-200 hover:border-green-300 transition-all font-bold text-green-800 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 text-green-600 mb-1" />
                <span className="text-[10px]">Book Service</span>
              </button>

              <a
                href="tel:9862772457"
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative flex flex-col items-center justify-center p-2.5 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 hover:border-blue-300 transition-all font-bold text-blue-800 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-blue-600 mb-1" />
                <span className="text-[10px]">Call Helpline</span>
              </a>
            </div>

            {/* Mobile Navigation Links */}
            <div className="p-3.5 border-b border-gray-100 flex-1">
              <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2.5">Main Navigation</h3>
              <div className="space-y-1">
                {navItems.map((item) => {
                  const isActive = activeTab === item;
                  return (
                    <button
                      key={item}
                      onClick={() => {
                        setActiveTab(item);
                        if (item === "HOME" || item === "ALL SERVICES") {
                          onSelectCategory("ALL");
                        }
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? "bg-green-600 text-white shadow-xs"
                          : "text-gray-700 hover:bg-gray-100 hover:text-green-600"
                      }`}
                    >
                      <span>{item}</span>
                      <ChevronRight className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Drawer Footer */}
            <div className="p-3.5 bg-gray-50 border-t border-gray-200 space-y-2.5">
              <div className="flex items-center justify-center py-1 bg-white rounded-lg border border-gray-200/80 shadow-2xs">
                <RopePullingDevBadge />
              </div>

              <div className="flex items-center justify-between">
                {!isAuthenticated ? (
                  <div className="flex items-center gap-2">
                    <a
                      href="https://www.facebook.com/dhanraj.serma.14"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-2xs"
                      title="Facebook"
                    >
                      <Facebook className="w-3.5 h-3.5 fill-current" />
                    </a>
                    <a
                      href="https://www.youtube.com/@semikserma"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-full bg-[#ff0000] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-2xs"
                      title="YouTube"
                    >
                      <Youtube className="w-3.5 h-3.5 fill-current" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/semik-serma-8263a3391/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-full bg-[#0a66c2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-2xs"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5 fill-current" />
                    </a>
                  </div>
                ) : (
                  <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    Logged in as {user?.role || "User"}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-900 px-2.5 py-1 rounded-full text-[11px] font-black">
                    <Eye className="w-3.5 h-3.5 text-blue-600 animate-pulse shrink-0" />
                    <span>{formatCount(visitorCount || 1285)} Views</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

