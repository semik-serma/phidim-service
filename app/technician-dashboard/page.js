"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TechnicianSidebar } from "../../components/technician-dashboard/TechnicianSidebar";
import { TechnicianTopNavbar } from "../../components/technician-dashboard/TechnicianTopNavbar";
import { TechnicianWelcomeCard } from "../../components/technician-dashboard/TechnicianWelcomeCard";
import { TechnicianTopStats } from "../../components/technician-dashboard/TechnicianTopStats";
import { NewJobRequests } from "../../components/technician-dashboard/NewJobRequests";
import { ActiveJobAndChecklist } from "../../components/technician-dashboard/ActiveJobAndChecklist";
import { LiveGpsMap } from "../../components/technician-dashboard/LiveGpsMap";
import { TodayScheduleTimeline } from "../../components/technician-dashboard/TodayScheduleTimeline";
import { CustomerInfoWidget } from "../../components/technician-dashboard/CustomerInfoWidget";
import { EarningsAndWallet } from "../../components/technician-dashboard/EarningsAndWallet";
import { PerformanceAndReviews } from "../../components/technician-dashboard/PerformanceAndReviews";
import { DocumentsAndEquipment } from "../../components/technician-dashboard/DocumentsAndEquipment";
import { QuickActionsAndRightPanel } from "../../components/technician-dashboard/QuickActionsAndRightPanel";
import { TechnicianInteractiveModals } from "../../components/technician-dashboard/TechnicianInteractiveModals";
import { TechnicianCommandPalette } from "../../components/technician-dashboard/TechnicianCommandPalette";
import { MobileTechnicianBottomNav } from "../../components/technician-dashboard/MobileTechnicianBottomNav";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import RoleGuard from "../../components/RoleGuard";
import { LogoutConfirmModal } from "../../components/LogoutConfirmModal";

import { DirectChatSection } from "../../components/chat/DirectChatSection";
import { CreateArticleModal } from "../../components/articles/CreateArticleModal";
import { AccountSettings } from "../../components/AccountSettings";
import { FriendsManager } from "../../components/community/FriendsManager";
import { CommunityUserDirectory } from "../../components/community/CommunityUserDirectory";
import { useCall } from "@/components/calls/CallProvider";

export default function TechnicianDashboardPage({ initialTab = "dashboard" }) {
  const { user, logout } = useAuth();
  const { startCall } = useCall();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'signature' | 'chat' | 'sos' | 'qr' | 'photo'
  const [modalData, setModalData] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Article Modal State
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [activeChatPartner, setActiveChatPartner] = useState(null);

  const handleStartCall = (person, type = "video") => {
    startCall(person, type);
  };

  const handleChatPerson = (person) => {
    setActiveChatPartner(person);
    setActiveTab("messages");
    showToast(`Opening live chat with ${person?.displayName || person?.name || person?.customerName || "Customer"}...`);
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

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    await logout();
  };

  // Mock New Job Requests State
  const [jobRequests, setJobRequests] = useState([
    {
      id: "#PS-9842",
      serviceName: "Split AC Gas Refill & Servicing",
      customerName: "Sita Sharma",
      customerPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      customerRating: "4.9 ★",
      address: "Pragati Chowk, Phidim-4, Panchthar",
      distance: "1.8 km away",
      estimatedTime: "25 mins",
      payment: "Rs. 2,450 (Cash/Esewa)",
      urgency: "HIGH",
      description: "AC is blowing warm air and making unusual humming noise in main hall.",
    },
    {
      id: "PS-9845",
      serviceName: "DishHome Fiber Router Relocation",
      customerName: "Hari Luintel",
      customerPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      customerRating: "4.8 ★",
      address: "Bazar Line, Ward 2, Phidim",
      distance: "3.2 km away",
      estimatedTime: "40 mins",
      payment: "Rs. 1,800 (Prepaid)",
      urgency: "NORMAL",
      description: "Optical fiber patch cord extension needed for upstairs study room.",
    },
    {
      id: "PS-9848",
      serviceName: "Automatic Washing Machine Motor Check",
      customerName: "Kamala Thapa",
      customerPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      customerRating: "5.0 ★",
      address: "Gadhi Mandir Road, Phidim-1",
      distance: "2.1 km away",
      estimatedTime: "30 mins",
      payment: "Rs. 3,200 (Khalti Pay)",
      urgency: "NORMAL",
      description: "Drum spin cycle is stuck and emitting burning smell during wash.",
    },
  ]);

  // Mock Active Job State
  const [activeJob, setActiveJob] = useState({
    id: "#PS-9842",
    serviceName: "Split AC Gas Refill & Servicing",
    customerName: "Sita Sharma",
    customerPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    customerRating: "4.9 ★",
    phone: "+977 9842109842",
    address: "Pragati Chowk, Phidim-4, Panchthar",
    payment: "Rs 2,450 (Cash/Esewa)",
    description: "AC is blowing warm air and making unusual humming noise in main hall.",
  });

  const handleAcceptJob = (job) => {
    setActiveJob(job);
    setJobRequests((prev) => prev.filter((j) => j.id !== job.id));
    showToast(`Accepted Job ${job.id} for ${job.customerName}! Active Job launched.`);
    setActiveTab("my-jobs");
  };

  const handleRejectJob = (jobId) => {
    setJobRequests((prev) => prev.filter((j) => j.id !== jobId));
    showToast(`Job ${jobId} rejected and returned to Phidim dispatch queue.`);
  };

  const handleCompleteJob = (job) => {
    showToast(`Job ${job.id} marked as Completed! Receipt & Invoice generated.`);
    setActiveJob(null);
    setActiveTab("earnings");
  };

  const handleCancelJob = (jobId) => {
    showToast(`Job ${jobId} cancelled.`);
    setActiveJob(null);
  };

  return (
    <RoleGuard roles={["TECHNICIAN"]}>
    <div className="min-h-screen bg-slate-50/70 dark:bg-[#070f0d] text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300 pb-20 lg:pb-8">
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

      {/* Dark Left Sidebar */}
      <TechnicianSidebar
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
        <TechnicianTopNavbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setMobileOpen={setMobileOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenSearch={() => setIsSearchOpen(true)}
          isOnline={isOnline}
          setIsOnline={setIsOnline}
          showToast={showToast}
          onLogout={() => setIsLogoutOpen(true)}
        />

        {/* Main Body */}
        <main className="flex-1 p-3.5 sm:p-5 lg:p-6 space-y-5 max-w-[1360px] mx-auto w-full">
          {activeTab === "account-settings" || activeTab === "settings" ? (
            <AccountSettings onShowToast={showToast} />
          ) : activeTab === "messages" ? (
            <div className="space-y-8">
              <DirectChatSection
                onOpenCreateArticleModal={() => setIsArticleModalOpen(true)}
                onStartCall={handleStartCall}
                activePartner={activeChatPartner}
              />
            </div>
          ) : activeTab === "friends" || activeTab === "articles" ? (
            <div className="space-y-8">
              <CommunityUserDirectory
                onStartChat={handleChatPerson}
                onStartCall={handleStartCall}
                onShowToast={showToast}
              />
              <FriendsManager
                onStartChat={handleChatPerson}
                onStartCall={handleStartCall}
                onShowToast={showToast}
              />
            </div>
          ) : activeTab === "new-jobs" ? (
            <div className="space-y-8">
              <NewJobRequests
                jobRequests={jobRequests}
                onAcceptJob={handleAcceptJob}
                onRejectJob={handleRejectJob}
                onCallCustomer={handleChatPerson}
                onViewDetails={(job) => showToast(`Viewing details for Job ${job.id}`)}
                showToast={showToast}
              />
            </div>
          ) : activeTab === "my-jobs" ? (
            <div className="space-y-8">
              <ActiveJobAndChecklist
                activeJob={activeJob}
                onCompleteJob={handleCompleteJob}
                onCancelJob={handleCancelJob}
                onOpenSignatureModal={() => setActiveModal("signature")}
                onOpenPhotoModal={() => setActiveModal("photo")}
                onCallCustomer={handleChatPerson}
                showToast={showToast}
              />
            </div>
          ) : activeTab === "schedule" ? (
            <div className="space-y-8">
              <TodayScheduleTimeline
                onCallCustomer={handleChatPerson}
                onNavigateToJob={() => showToast("Opening GPS Navigation for appointment...")}
                showToast={showToast}
              />
            </div>
          ) : activeTab === "earnings" || activeTab === "wallet" ? (
            <div className="space-y-8">
              <EarningsAndWallet
                onWithdraw={() => showToast("Payout Request of Rs. 18,450 sent to Esewa Wallet!")}
                showToast={showToast}
              />
            </div>
          ) : activeTab === "customers" ? (
            <div className="space-y-8">
              <CustomerInfoWidget
                onCall={(c) => handleStartCall(c, "voice")}
                onChat={handleChatPerson}
                onVideoCall={(c) => handleStartCall(c, "video")}
                showToast={showToast}
              />
            </div>
          ) : activeTab === "reviews" || activeTab === "performance" ? (
            <div className="space-y-8">
              <PerformanceAndReviews
                onOpenReplyModal={(rev) => showToast(`Replying to review by ${rev.customerName}...`)}
                showToast={showToast}
              />
            </div>
          ) : activeTab === "live-location" ? (
            <div className="space-y-8">
              <LiveGpsMap
                activeJob={activeJob}
                onCallCustomer={handleChatPerson}
                showToast={showToast}
              />
            </div>
          ) : activeTab === "documents" || activeTab === "equipment" ? (
            <div className="space-y-8">
              <DocumentsAndEquipment
                onUploadDocument={(docName) => {
                  setModalData({ docName });
                  setActiveModal("photo");
                }}
                showToast={showToast}
              />
            </div>
          ) : (
            <>
              {/* Overview Full Command Console */}
              <section id="welcome-banner">
                <TechnicianWelcomeCard
                  techName={user?.displayName || user?.name || (user?.email ? user.email.split("@")[0] : "Technician")}
                  isOnline={isOnline}
                  onToggleOnline={() => setIsOnline(!isOnline)}
                />
              </section>

              <section id="user-directory">
                <CommunityUserDirectory
                  onStartChat={handleChatPerson}
                  onStartCall={handleStartCall}
                  onShowToast={showToast}
                />
              </section>

              <section id="top-stats">
                <TechnicianTopStats />
              </section>

              <section id="new-jobs-section">
                <NewJobRequests
                  jobRequests={jobRequests}
                  onAcceptJob={handleAcceptJob}
                  onRejectJob={handleRejectJob}
                  onCallCustomer={(job) => {
                    setModalData(job);
                    setActiveModal("chat");
                  }}
                  onViewDetails={(job) => showToast(`Viewing details for Job ${job.id}`)}
                  showToast={showToast}
                />
              </section>

              <section id="active-job-section">
                <ActiveJobAndChecklist
                  activeJob={activeJob}
                  onCompleteJob={handleCompleteJob}
                  onCancelJob={handleCancelJob}
                  onOpenSignatureModal={() => setActiveModal("signature")}
                  onOpenPhotoModal={() => setActiveModal("photo")}
                  onCallCustomer={(job) => {
                    setModalData(job);
                    setActiveModal("chat");
                  }}
                  showToast={showToast}
                />
              </section>

              <section id="live-map-section">
                <LiveGpsMap
                  activeJob={activeJob}
                  onCallCustomer={(c) => {
                    setModalData(c);
                    setActiveModal("chat");
                  }}
                  showToast={showToast}
                />
              </section>

              <section className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                <div className="xl:col-span-8 space-y-8">
                  <TodayScheduleTimeline
                    onCallCustomer={(c) => {
                      setModalData(c);
                      setActiveModal("chat");
                    }}
                    onNavigateToJob={() => showToast("Opening GPS Navigation for appointment...")}
                    showToast={showToast}
                  />

                  <CustomerInfoWidget
                    onCall={(c) => showToast(`Calling ${c.name} at ${c.phone}...`)}
                    onChat={(c) => {
                      setModalData(c);
                      setActiveModal("chat");
                    }}
                    onVideoCall={(c) => showToast(`Launching HD Video Call with ${c.name}...`)}
                    showToast={showToast}
                  />

                  <EarningsAndWallet
                    onWithdraw={() => showToast("Payout Request of Rs. 18,450 sent to Esewa Wallet!")}
                    showToast={showToast}
                  />

                  <PerformanceAndReviews
                    onOpenReplyModal={(rev) => showToast(`Replying to review by ${rev.customerName}...`)}
                    showToast={showToast}
                  />

                  <DocumentsAndEquipment
                    onUploadDocument={(docName) => {
                      setModalData({ docName });
                      setActiveModal("photo");
                    }}
                    showToast={showToast}
                  />
                </div>

                <div className="xl:col-span-4 space-y-8">
                  <QuickActionsAndRightPanel
                    isOnline={isOnline}
                    setIsOnline={setIsOnline}
                    onOpenSos={() => setActiveModal("sos")}
                    onNavigateToJob={() => showToast("Opening Turn-by-Turn GPS Navigation...")}
                    onViewWallet={() => setActiveTab("earnings")}
                    onUploadDocs={() => setActiveTab("documents")}
                    showToast={showToast}
                  />
                </div>
              </section>
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="px-8 py-5 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-400">
          <p>© 2026 Phidim Service. Enterprise Technician Command Interface built for Panchthar Home Service Marketplace.</p>
        </footer>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileTechnicianBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Command Palette (⌘K) */}
      <TechnicianCommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTab={setActiveTab}
      />

      {/* Interactive Modals (Signature, Chat, SOS, QR, Photo) */}
      <TechnicianInteractiveModals
        activeModal={activeModal}
        modalData={modalData}
        onClose={() => setActiveModal(null)}
        showToast={showToast}
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
    </div>
    </RoleGuard>
  );
}
