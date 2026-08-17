"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sidebar } from "../dashboard/Sidebar";
import { TopNavbar } from "../dashboard/TopNavbar";
import { StatCards } from "../dashboard/StatCards";
import { AnalyticsCharts } from "../dashboard/AnalyticsCharts";
import { MiddleRow } from "../dashboard/MiddleRow";
import { UsersAndActions } from "../dashboard/UsersAndActions";
import { ThirdRowAnalytics } from "../dashboard/ThirdRowAnalytics";
import { BottomSection } from "../dashboard/BottomSection";
import { RightSideWidgets } from "../dashboard/RightSideWidgets";
import { CommandPalette } from "../dashboard/CommandPalette";
import { QuickActionModals } from "../dashboard/QuickActionModals";
import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import RoleGuard from "../RoleGuard";
import { LogoutConfirmModal } from "../LogoutConfirmModal";
import { AccountSettings } from "../AccountSettings";
import { DirectChatSection } from "../chat/DirectChatSection";
import { CreateArticleModal } from "../articles/CreateArticleModal";
import { AnnouncementManager } from "./AnnouncementManager";
import { HomepageCarouselManager } from "./HomepageCarouselManager";
import { CouponManager } from "./CouponManager";
import { FriendsManager } from "../community/FriendsManager";
import { AdminCategoriesManager } from "../admin/AdminCategoriesManager";
import { AddServiceModal } from "../admin/AddServiceModal";
import { useCall } from "@/components/calls/CallProvider";

/**
 * Admin dashboard UI. This component renders inside a server guard
 * (src/app/dashboard/admin/page.js) that enforces ADMIN-only access;
 * RoleGuard here is only a client-side UX nicety.
 *
 * `initialTab` lets dedicated admin pages (/admin/users, /admin/settings,
 * /admin/analytics ...) open the dashboard scrolled to a section.
 */
export default function AdminDashboardPage({ initialTab = "dashboard" }) {
  const { user, logout } = useAuth();
  const { startCall } = useCall();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'add-service' | 'add-tech' | 'create-coupon' | 'send-notif'
  const [toastMessage, setToastMessage] = useState(null);

  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [activeChatPartner, setActiveChatPartner] = useState(null);

  const handleStartCall = (person, type = "video") => {
    startCall(person, type);
  };

  // Sync dark mode class with root html element
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

  const handleGenerateReport = () => {
    showToast("Generating comprehensive monthly Phidim Service PDF Report...");
  };

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    await logout();
  };

  return (
    <RoleGuard roles={["ADMIN"]}>
      <div className={`min-h-screen bg-[#f5f8f6] dark:bg-[#070f0d] text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300`}>
      {/* Toast Notification Banner */}
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

      {/* Collapsible Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onLogout={() => setIsLogoutOpen(true)}
      />

      {/* Main Layout Container */}
      <div
        className={`transition-all duration-300 flex flex-col min-h-screen ${
          collapsed ? "lg:pl-[68px]" : "lg:pl-[245px]"
        }`}
      >
        {/* Top Navbar */}
        <TopNavbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          setMobileOpen={setMobileOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenCommandPalette={() => setIsCommandOpen(true)}
        />

        {/* Dashboard Content Container */}
        <main className="flex-1 p-3.5 sm:p-5 lg:p-6 space-y-5 max-w-[1360px] mx-auto w-full">
          {activeTab === "account-settings" || activeTab === "settings" ? (
            <AccountSettings onShowToast={showToast} />
          ) : activeTab === "friends" ? (
            <FriendsManager
              onStartChat={(friend) => {
                setActiveChatPartner(friend);
                setActiveTab("messages");
                showToast(`Opening live chat with ${friend?.displayName || friend?.name || "User"}...`);
              }}
              onStartCall={handleStartCall}
              onShowToast={showToast}
            />
          ) : activeTab === "users" ? (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
                <h2 className="text-2xl font-black">Registered Platform Users</h2>
                <p className="text-xs sm:text-sm text-blue-100 mt-1">Manage 14,800+ customer accounts across Phidim Municipality and Panchthar district.</p>
              </div>
              <UsersAndActions
                onAddService={() => setActiveModal("add-service")}
                onAddTechnician={() => setActiveModal("add-tech")}
                onCreateCoupon={() => setActiveModal("create-coupon")}
                onSendNotification={() => setActiveModal("send-notif")}
                onGenerateReport={handleGenerateReport}
              />
            </div>
          ) : activeTab === "technicians" ? (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
                <h2 className="text-2xl font-black">Technicians & Field Engineers Directory</h2>
                <p className="text-xs sm:text-sm text-emerald-100 mt-1">164 Certified Field Specialists (DishHome Fiber, CCTV, AC, Electrical, Plumbing).</p>
              </div>
              <RightSideWidgets />
              <UsersAndActions
                onAddService={() => setActiveModal("add-service")}
                onAddTechnician={() => setActiveModal("add-tech")}
                onCreateCoupon={() => setActiveModal("create-coupon")}
                onSendNotification={() => setActiveModal("send-notif")}
                onGenerateReport={handleGenerateReport}
              />
            </div>
          ) : activeTab === "categories" || activeTab === "services" ? (
            <AdminCategoriesManager
              onOpenAddServiceModal={() => setIsAddServiceOpen(true)}
              onShowToast={showToast}
            />
          ) : activeTab === "announcements" ? (
            <AnnouncementManager />
          ) : activeTab === "carousel" ? (
            <HomepageCarouselManager onShowToast={showToast} />
          ) : activeTab === "coupons" || activeTab === "offers" ? (
            <CouponManager onShowToast={showToast} />
          ) : activeTab === "messages" || activeTab === "articles" ? (
            <DirectChatSection
              onOpenCreateArticleModal={() => setIsArticleModalOpen(true)}
              onStartCall={handleStartCall}
              activePartner={activeChatPartner}
            />
          ) : activeTab === "reviews" || activeTab === "notifications" ? (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-rose-600 to-pink-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
                <h2 className="text-2xl font-black">Customer Reviews & System Broadcast Feed</h2>
                <p className="text-xs sm:text-sm text-rose-100 mt-1">Moderate customer reviews, inspect terminal logs, and broadcast SMS/Push notifications.</p>
              </div>
              <BottomSection />
            </div>
          ) : (
            <div className="space-y-8">
              <section className="relative overflow-hidden rounded-[28px] border border-emerald-100 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.04)] dark:border-emerald-900/40 dark:bg-slate-900 sm:p-8">
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
                <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                  <div>
                    <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-emerald-600"><Sparkles size={14} /> Operations overview</p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white">Good to see you, {user?.displayName || user?.name || "Admin"}.</h2>
                    <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">A focused view of live operations, team performance, and customer activity across Phidim Service.</p>
                  </div>
                  <button onClick={() => setActiveTab("carousel")} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-xs font-extrabold text-white shadow-lg transition-transform hover:-translate-y-0.5 dark:bg-emerald-600"><span>Manage homepage</span><ArrowUpRight size={15} /></button>
                </div>
              </section>

              <section>
                <StatCards />
              </section>

              <section className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                <div className="xl:col-span-8 space-y-8">
                  <AnalyticsCharts />
                  <MiddleRow />
                </div>

                <div className="xl:col-span-4">
                  <RightSideWidgets />
                </div>
              </section>

              <section>
                <UsersAndActions
                  onAddService={() => setIsAddServiceOpen(true)}
                  onAddTechnician={() => setActiveModal("add-tech")}
                  onCreateCoupon={() => setActiveModal("create-coupon")}
                  onSendNotification={() => setActiveModal("send-notif")}
                  onGenerateReport={handleGenerateReport}
                />
              </section>

              <section>
                <ThirdRowAnalytics />
              </section>

              <section>
                <BottomSection />
              </section>
            </div>
          )}
        </main>

        {/* Footer info */}
        <footer className="px-8 py-5 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-400">
          <p>© 2026 Phidim Service. Premium SaaS Admin Interface built for Panchthar Technical Marketplace.</p>
        </footer>
      </div>

      {/* Command Palette Modal (Ctrl + K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onSelectTab={setActiveTab}
      />

      {/* Quick Action Modals */}
      <QuickActionModals
        modalType={activeModal}
        onClose={() => setActiveModal(null)}
        onSuccess={(msg) => showToast(msg)}
      />

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        open={isLogoutOpen}
        onCancel={() => setIsLogoutOpen(false)}
        onConfirm={handleLogoutConfirm}
        isLoggingOut={isLoggingOut}
      />

      {/* Create Article Modal */}
      <CreateArticleModal
        isOpen={isArticleModalOpen}
        onClose={() => setIsArticleModalOpen(false)}
        onPublish={(newArticle) => {
          showToast(`Article "${newArticle.title}" published successfully!`);
        }}
      />

      {/* Add Service Modal */}
      <AddServiceModal
        isOpen={isAddServiceOpen || activeModal === "add-service"}
        onClose={() => {
          setIsAddServiceOpen(false);
          setActiveModal(null);
        }}
        onAddService={(srv) => {
          showToast(`Service "${srv.name}" published successfully at Rs. ${srv.basePrice}!`);
        }}
      />
      </div>
    </RoleGuard>
  );
}
