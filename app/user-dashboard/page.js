"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserSidebar } from "../../components/user-dashboard/UserSidebar";
import { UserTopNavbar } from "../../components/user-dashboard/UserTopNavbar";
import { WelcomeBanner } from "../../components/user-dashboard/WelcomeBanner";
import { QuickBookingCard } from "../../components/user-dashboard/QuickBookingCard";
import { PopularServicesGrid } from "../../components/user-dashboard/PopularServicesGrid";
import { MyBookingsList } from "../../components/user-dashboard/MyBookingsList";
import { LiveTechnicianTracker } from "../../components/user-dashboard/LiveTechnicianTracker";
import { PaymentsAndWallet } from "../../components/user-dashboard/PaymentsAndWallet";
import { OffersAndAIRecommend } from "../../components/user-dashboard/OffersAndAIRecommend";
import { UserProfileAndTimeline } from "../../components/user-dashboard/UserProfileAndTimeline";
import { HelpCenterWidget } from "../../components/user-dashboard/HelpCenterWidget";
import { MobileBottomNav } from "../../components/user-dashboard/MobileBottomNav";
import { UserCommandPalette } from "../../components/user-dashboard/UserCommandPalette";
import {
  CheckCircle2,
  ClipboardList,
  LayoutGrid,
  MapPinned,
  CreditCard,
  Gift,
  ShieldCheck,
  Zap,
  PhoneCall,
  Sparkles
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import { DirectChatSection } from "../../components/chat/DirectChatSection";
import { CreateArticleModal } from "../../components/articles/CreateArticleModal";
import { AccountSettings } from "../../components/AccountSettings";
import { FriendsManager } from "../../components/community/FriendsManager";
import { CommunityUserDirectory } from "../../components/community/CommunityUserDirectory";
import { useCall } from "@/components/calls/CallProvider";

export default function UserDashboardPage({ initialTab = "dashboard" }) {
  const { user, logout } = useAuth();
  const { startCall } = useCall();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Community Articles Modal State
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [activeChatPartner, setActiveChatPartner] = useState(null);

  const handleStartCall = (person, type = "video") => {
    startCall(person, type);
  };

  const handleCallTech = (tech, type = "voice") => {
    const person = {
      name: tech?.displayName || tech?.name || tech?.technician?.name || "Niraj Sunuwar",
      role: tech?.role || tech?.specialty || tech?.technician?.specialty || "Senior Field Technician",
      avatar: tech?.avatar || tech?.picture || tech?.technician?.avatar || "",
      phone: tech?.phone || tech?.technician?.phone || "+977 9862772457",
      email: tech?.email || "tech@phidim.np",
    };
    startCall(person, type);
  };

  const handleChatTech = (tech) => {
    setActiveChatPartner(tech);
    setActiveTab("messages");
    showToast(`Opening live chat with ${tech?.displayName || tech?.name || tech?.technician?.name || "Technician"}...`);
  };

  // Sync dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleConfirmBooking = (details) => {
    const bookingId = details?.id ? `#${details.id}` : "";
    showToast(`✅ Booking ${bookingId} confirmed for ${details.serviceName || details.category}! Technician dispatched.`);
    setActiveTab("my-bookings");
  };

  const handleSelectService = (service) => {
    showToast(`Selected "${service.name}". Opening booking flow...`);
    setActiveTab("book");
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] dark:bg-[#050e0b] text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300 pb-20 lg:pb-8">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-slate-900 dark:bg-emerald-950 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-2.5 backdrop-blur-md"
          >
            <CheckCircle2 size={18} className="text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Sidebar */}
      <UserSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onLogout={logout}
      />

      {/* Main Layout Content */}
      <div
        className={`transition-all duration-300 flex flex-col min-h-screen ${
          collapsed ? "lg:pl-[68px]" : "lg:pl-[245px]"
        }`}
      >
        {/* Top Navbar */}
        <UserTopNavbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setMobileOpen={setMobileOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Dashboard Body */}
        <main className="relative flex-1 p-3.5 sm:p-5 lg:p-6 space-y-5 max-w-[1360px] mx-auto w-full">
          {activeTab === "account-settings" || activeTab === "settings" ? (
            <AccountSettings onShowToast={showToast} />
          ) : activeTab === "book" ? (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-4 sm:p-5 text-white shadow-md">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">Book On-Demand Doorstep Service</h2>
                <p className="text-xs text-emerald-100 mt-0.5">Select your service, choose preferred date & time, and get instant 30-minute technician dispatch.</p>
              </div>
              <QuickBookingCard onConfirmBooking={handleConfirmBooking} />
              <PopularServicesGrid onSelectService={handleSelectService} />
            </div>
          ) : activeTab === "my-bookings" || activeTab === "history" || activeTab === "requests" ? (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-4 sm:p-5 text-white shadow-md">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">My Active & Past Service Bookings</h2>
                <p className="text-xs text-blue-100 mt-0.5">Track ongoing technician assignments, view service history, download PDF invoices, and request calls.</p>
              </div>
              <MyBookingsList
                onTrackLive={() => setActiveTab("track")}
                onChat={(b) => handleChatTech(b.technician)}
                onCall={(b) => handleCallTech(b.technician, "voice")}
                onInvoice={(b) => showToast(`Downloading PDF Invoice for ${b.id}...`)}
              />
            </div>
          ) : activeTab === "track" ? (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="bg-gradient-to-r from-amber-600 to-orange-700 rounded-2xl p-4 sm:p-5 text-white shadow-md">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">Live Technician GPS Tracker</h2>
                <p className="text-xs text-amber-100 mt-0.5">Real-time live map tracking of your assigned Phidim technician moving towards your doorstep.</p>
              </div>
              <LiveTechnicianTracker onCall={(tech) => handleCallTech(tech, "voice")} onChat={handleChatTech} />
            </div>
          ) : activeTab === "payments" ? (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="bg-gradient-to-r from-teal-600 to-emerald-800 rounded-2xl p-4 sm:p-5 text-white shadow-md">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">Payments & Phidim Digital Wallet</h2>
                <p className="text-xs text-teal-100 mt-0.5">Manage your wallet balance, Esewa/Khalti links, saved cards, and transaction history.</p>
              </div>
              <PaymentsAndWallet />
            </div>
          ) : activeTab === "offers" ? (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="bg-gradient-to-r from-rose-600 to-pink-700 rounded-2xl p-4 sm:p-5 text-white shadow-md">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">Offers, Coupons & AI Recommendations</h2>
                <p className="text-xs text-rose-100 mt-0.5">Claim exclusive Panchthar service discount coupons and explore personalized maintenance tips.</p>
              </div>
              <OffersAndAIRecommend
                onClaimCoupon={(code) => showToast(`Coupon code ${code} claimed!`)}
                onBookRecommended={(rec) => showToast(`Added ${rec.title} to your bookings!`)}
              />
            </div>
          ) : activeTab === "profile" ? (
            <div className="space-y-5 animate-in fade-in duration-300">
              <UserProfileAndTimeline />
            </div>
          ) : activeTab === "help" ? (
            <div className="space-y-5 animate-in fade-in duration-300">
              <HelpCenterWidget />
            </div>
          ) : activeTab === "messages" ? (
            <div className="space-y-5 animate-in fade-in duration-300">
              <DirectChatSection
                onOpenCreateArticleModal={() => setIsArticleModalOpen(true)}
                onStartCall={handleStartCall}
                activePartner={activeChatPartner}
              />
            </div>
          ) : activeTab === "friends" || activeTab === "articles" ? (
            <div className="space-y-5 animate-in fade-in duration-300">
              <CommunityUserDirectory
                onStartChat={handleChatTech}
                onStartCall={handleCallTech}
                onShowToast={showToast}
              />
              <FriendsManager
                onStartChat={handleChatTech}
                onStartCall={handleStartCall}
                onShowToast={showToast}
              />
            </div>
          ) : activeTab === "reviews" ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 animate-in fade-in duration-300">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">My Service Reviews & Ratings</h2>
              <p className="text-xs text-slate-500">Ratings and reviews you submitted for completed Phidim services.</p>
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 text-xs font-extrabold flex items-center justify-between">
                <span>⭐ DishHome Fiber Splicing: 5.0 ★ — "Very fast service in Ward 4!"</span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400">Verified</span>
              </div>
            </div>
          ) : activeTab === "notifications" ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 animate-in fade-in duration-300">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Notifications Center</h2>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between">
                  <span>✅ Booking #PS-9842 confirmed. Technician Rajesh Tamang dispatched.</span>
                  <span className="text-[10px] text-slate-400">5 mins ago</span>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between">
                  <span>🎉 You received 200 Reward Points for your completed AC service.</span>
                  <span className="text-[10px] text-slate-400">2 hours ago</span>
                </div>
              </div>
            </div>
          ) : (
            /* STRUCTURED BENTO-GRID MAIN OVERVIEW */
            <div className="space-y-5 animate-in fade-in duration-400">
              {/* Top Hero Banner */}
              <WelcomeBanner
                userName={user?.displayName || user?.name || (user?.email ? user.email.split("@")[0] : "")}
                onBookNow={() => setActiveTab("book")}
                onSearch={() => setIsSearchOpen(true)}
              />

              {/* 12-Column Responsive Bento Layout */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
                {/* Main 8-Column Left Section */}
                <div className="xl:col-span-8 space-y-5">
                  {/* 1. Quick 1-Click Booking */}
                  <section id="quick-booking" className="space-y-2.5">
                    <div className="flex items-center justify-between px-1">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
                          Instant Dispatch
                        </span>
                        <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">
                          Book a Doorstep Technician
                        </h2>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold border border-emerald-200 dark:border-emerald-800">
                        ⚡ 30-Min Arrival
                      </span>
                    </div>
                    <QuickBookingCard onConfirmBooking={handleConfirmBooking} />
                  </section>

                  {/* 2. Popular Panchthar Services Showcase */}
                  <section id="services-grid" className="space-y-2.5">
                    <div className="flex items-center justify-between px-1">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
                          Verified Technical Catalog
                        </span>
                        <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">
                          Popular Services in Phidim
                        </h2>
                      </div>
                      <button
                        onClick={() => setActiveTab("book")}
                        className="text-xs font-black text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                      >
                        View All Services →
                      </button>
                    </div>
                    <PopularServicesGrid onSelectService={handleSelectService} />
                  </section>

                  {/* 3. Active & Recent Service Bookings */}
                  <section id="my-bookings" className="rounded-2xl border border-slate-200/80 bg-white dark:border-emerald-900/30 dark:bg-slate-900/80 p-4 sm:p-5 shadow-sm space-y-3">
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
                          Service Pipeline
                        </span>
                        <h2 className="text-base font-black text-slate-900 dark:text-white">
                          My Bookings & Invoices
                        </h2>
                      </div>
                      <button
                        onClick={() => setActiveTab("my-bookings")}
                        className="text-xs font-bold text-slate-500 hover:text-emerald-600 dark:text-slate-400 cursor-pointer"
                      >
                        Detailed History →
                      </button>
                    </div>
                    <MyBookingsList
                      onTrackLive={() => setActiveTab("track")}
                      onChat={(b) => handleChatTech(b.technician)}
                      onCall={(b) => handleCallTech(b.technician, "voice")}
                      onInvoice={(b) => showToast(`Downloading PDF Invoice for ${b.id}...`)}
                    />
                  </section>
                </div>

                {/* 4-Column Right Widgets Sidebar */}
                <div className="xl:col-span-4 space-y-4">
                  {/* Widget 1: Live GPS Tracker */}
                  <div className="rounded-2xl border border-slate-200/80 bg-white dark:border-emerald-900/30 dark:bg-slate-900/80 p-4 shadow-sm space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-[0.16em] text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                        Live Field Radar
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">Ward 1-4</span>
                    </div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">
                      Technician On-Duty
                    </h3>
                    <LiveTechnicianTracker
                      onCall={(tech) => handleCallTech(tech, "voice")}
                      onChat={handleChatTech}
                    />
                  </div>

                  {/* Widget 2: Wallet & Quick Top-Up */}
                  <div className="rounded-2xl bg-gradient-to-br from-teal-900 via-emerald-950 to-slate-950 text-white p-4.5 border border-emerald-500/30 shadow-lg space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-emerald-300">
                        <CreditCard size={15} />
                        <span className="text-[11px] font-black uppercase tracking-wider">Phidim Wallet</span>
                      </div>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-1.5 py-0.2 rounded-full font-bold">
                        Verified
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-300 font-medium">Available Balance</p>
                      <p className="text-xl font-black text-white font-mono mt-0.5">NPR 4,500.00</p>
                    </div>
                    <div className="flex items-center gap-2 pt-0.5">
                      <button
                        onClick={() => setActiveTab("payments")}
                        className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black text-center shadow transition-colors cursor-pointer"
                      >
                        + Top Up
                      </button>
                      <button
                        onClick={() => setActiveTab("payments")}
                        className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        History
                      </button>
                    </div>
                  </div>

                  {/* Widget 3: Special Offers & Panchthar Promo */}
                  <div className="rounded-2xl border border-slate-200/80 bg-white dark:border-emerald-900/30 dark:bg-slate-900/80 p-4 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-[0.16em] text-rose-600 dark:text-rose-400 flex items-center gap-1">
                        <Gift size={12} />
                        Active Offers
                      </span>
                      <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                        20% OFF
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      🎉 Special AC & Inverter Discount
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      Use code <strong className="text-emerald-600 dark:text-emerald-400 font-mono">PHIDIM50</strong> on your repair booking.
                    </p>
                    <button
                      onClick={() => setActiveTab("offers")}
                      className="w-full py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer text-center"
                    >
                      View All Coupons →
                    </button>
                  </div>

                  {/* Widget 4: Guaranteed Support Card */}
                  <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 p-4 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck size={16} />
                      <span className="text-[11px] font-black uppercase tracking-wider">Phidim Guarantee</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      Every service includes a <strong>30-day warranty</strong> and verified local technicians.
                    </p>
                    <div className="pt-0.5 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Need instant help?</span>
                      <a href="tel:+9779862772457" className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                        Call Support
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="px-8 py-5 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-400 mt-8">
          <p>© 2026 Phidim Service. Enterprise Customer Portal built for Panchthar Home Service Marketplace.</p>
        </footer>
      </div>

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Command Palette Search Modal */}
      <UserCommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTab={setActiveTab}
      />

      {/* Create Article Modal */}
      <CreateArticleModal
        isOpen={isArticleModalOpen}
        onClose={() => setIsArticleModalOpen(false)}
        onPublish={(newArticle) => {
          showToast(`Article "${newArticle.title}" published successfully!`);
        }}
      />
    </div>
  );
}
