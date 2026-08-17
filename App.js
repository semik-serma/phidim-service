"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from "react";
import { TopBar } from "./components/TopBar";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import { AnnouncementBanner } from "./components/AnnouncementBanner";
import { AuthModal } from "./components/AuthModal";
import { TechnicianModal } from "./components/TechnicianModal";
import { AuthPage } from "./components/AuthPage";
import { OurServicesPage } from "./components/OurServicesPage";
import { AboutPage } from "./components/AboutPage";
import { AboutModal } from "./components/AboutModal";
import { WhatsAppWidget } from "./components/WhatsAppWidget";
import { HomePageOverview } from "./components/HomePageOverview";
import { HeroCarousel } from "./components/HeroCarousel";
import { HomepageCommentSection } from "./components/HomepageCommentSection";
import { ServiceBookingModal } from "./components/ServiceBookingModal";
import { LanNetworkingPage } from "./components/LanNetworkingPage";
import { ContactUsPage } from "./components/ContactUsPage";
import { Footer } from "./components/Footer";
import { SERVICES } from "@/data/services";

export default function App() {
  const [activeTab, setActiveTab] = useState("HOME");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [visitorCount, setVisitorCount] = useState(1285);
  const [likeCount, setLikeCount] = useState(582);
  const [isMounted, setIsMounted] = useState(false);

  // Service Booking Modal State
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Other Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isTechnicianAuthOpen, setIsTechnicianAuthOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      const savedVisitor = localStorage.getItem("phidim_service_visitor_count");
      const initialVisitor = savedVisitor ? parseInt(savedVisitor, 10) : 1284;
      const nextVisitor = isNaN(initialVisitor) ? 1285 : initialVisitor + 1;
      localStorage.setItem("phidim_service_visitor_count", nextVisitor.toString());
      setVisitorCount(nextVisitor);

      const savedLikes = localStorage.getItem("phidim_service_like_count");
      const initialLikes = savedLikes ? parseInt(savedLikes, 10) : 582;
      if (!isNaN(initialLikes)) setLikeCount(initialLikes);
    } catch (e) {
      console.error("Error reading localStorage:", e);
    }

    // Parse search parameters for dynamic navigation & pre-filled booking modal
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);

      // Parse active tab (e.g. ?tab=about -> ABOUT, ?tab=contact-us -> CONTACT US)
      const tabParam = params.get("tab");
      if (tabParam) {
        const normalized = tabParam.toUpperCase().replace("-", " ");
        if (normalized === "SERVICES" || normalized === "ALL SERVICES") {
          setActiveTab("ALL SERVICES");
        } else if (normalized === "LAN" || normalized === "LAN NETWORKING") {
          setActiveTab("LAN NETWORKING");
        } else if (normalized === "ABOUT") {
          setActiveTab("ABOUT");
        } else if (normalized === "CONTACT" || normalized === "CONTACT US") {
          setActiveTab("CONTACT US");
        } else if (normalized === "HOME") {
          setActiveTab("HOME");
        }
      }

      // Parse search keyword (e.g. ?search=electrician)
      const searchParam = params.get("search");
      if (searchParam) {
        setSearchQuery(searchParam);
        setActiveTab("ALL SERVICES");
      }

      // Parse category filter (e.g. ?category=CCTV%20%26%20Security)
      const categoryParam = params.get("category");
      if (categoryParam) {
        setSelectedCategory(categoryParam);
        setActiveTab("ALL SERVICES");
      }

      // Parse automatic booking triggers (e.g. ?book=srv-electrical-wiring)
      const bookParam = params.get("book");
      if (bookParam) {
        const matched = SERVICES.find((s) => s.id === bookParam);
        if (matched) {
          handleBookService(matched);
        }
      }
    }

    setIsMounted(true);
  }, []);

  const handleIncrementLikes = () => {
    setLikeCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem("phidim_service_like_count", next.toString());
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleSelectCategory = (catName) => {
    setSelectedCategory(catName);
    if (activeTab !== "ALL SERVICES") {
      setActiveTab("ALL SERVICES");
    }
  };

  const handleBookService = (service) => {
    setSelectedServiceForBooking(service);
    setIsBookingOpen(true);
  };

  const handleConsultTechnician = (service) => {
    window.location.href = "tel:+9779862772457";
  };

  const handleOrderFiberPackage = (pkg) => {
    const fiberService = {
      id: pkg.id,
      name: `DishHome Optical Fiber & DTH - ${pkg.speed || "Broadband"}`,
      category: "Fiber & LAN Networking",
      basePrice: pkg.priceYearly || 12000,
      duration: "1-2 days",
      warranty: "1 Year Official Support",
    };
    handleBookService(fiberService);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center font-sans" suppressHydrationWarning>
        <div className="flex items-center gap-3" suppressHydrationWarning>
          <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-bold">Loading Phidim Service System...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans flex flex-col selection:bg-green-500 selection:text-white" suppressHydrationWarning>
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sticky Top Banner, Header & Navbar Stack */}
      <AnnouncementBanner />

      <header className="sticky top-0 z-50 bg-white shadow-md transition-all">
        <TopBar />

        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleSelectCategory}
          visitorCount={visitorCount}
          onOpenAuth={() => {
            setActiveTab("LOGIN / REGISTER");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onSearchSubmit={() => {
            if (activeTab !== "ALL SERVICES") setActiveTab("ALL SERVICES");
          }}
        />

        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onSelectCategory={handleSelectCategory}
          onOpenTechnicianAuth={() => {
            setActiveTab("TECHNICIAN PORTAL");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          likeCount={likeCount}
          onIncrementLikes={handleIncrementLikes}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          visitorCount={visitorCount}
          onOpenAuth={() => {
            setActiveTab("LOGIN / REGISTER");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onSearchSubmit={() => {
            if (activeTab !== "ALL SERVICES") setActiveTab("ALL SERVICES");
          }}
        />
      </header>

      {/* Main Content Body */}
      <main className="flex-1">
        {/* TAB 1: HOME OVERVIEW */}
        {activeTab === "HOME" && (
          <div>
            {/* 1. Top Carousel Slider */}
            <HeroCarousel
              onExploreServices={() => {
                setActiveTab("ALL SERVICES");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onFiberSelect={() => {
                setActiveTab("ALL SERVICES");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onBookService={handleBookService}
            />

            {/* 2. Comment Box in between Carousel and Technical Services Section */}
            <div className="max-w-[1536px] mx-auto px-4 md:px-8 lg:px-12 pt-6 sm:pt-8 md:pt-10 pb-4">
              <HomepageCommentSection />
            </div>

            {/* 3. Section: Professional On-Site Technical Services in Panchthar */}
            <div className="max-w-[1536px] mx-auto px-4 md:px-8 lg:px-12 py-4 space-y-12">
              <HomePageOverview
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onOpenWhatsApp={(msg) => {
                  window.open(
                    `https://wa.me/9779862772457?text=${encodeURIComponent(msg || "Hello Phidim Service!")}`,
                    "_blank"
                  );
                }}
              />
            </div>
          </div>
        )}

        {/* TAB 2: ALL SERVICES */}
        {activeTab === "ALL SERVICES" && (
          <OurServicesPage
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onNavigateHome={() => {
              setActiveTab("HOME");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onNavigateContact={() => {
              setActiveTab("CONTACT US");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onBookService={handleBookService}
          />
        )}

        {/* TAB 3: LAN NETWORKING */}
        {activeTab === "LAN NETWORKING" && (
          <LanNetworkingPage
            onOrderPackage={handleOrderFiberPackage}
            onNavigateHome={() => {
              setActiveTab("HOME");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onNavigateContact={() => {
              setActiveTab("CONTACT US");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {/* TAB 4: ABOUT PAGE */}
        {activeTab === "ABOUT" && (
          <AboutPage
            onNavigateHome={() => {
              setActiveTab("HOME");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onNavigateServices={() => {
              setActiveTab("ALL SERVICES");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onNavigateContact={() => {
              setActiveTab("CONTACT US");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {/* TAB 5: CONTACT US PAGE */}
        {activeTab === "CONTACT US" && (
          <ContactUsPage
            onNavigateHome={() => {
              setActiveTab("HOME");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onNavigateServices={() => {
              setActiveTab("ALL SERVICES");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {/* TAB 6: LOGIN / REGISTER PAGE */}
        {activeTab === "LOGIN / REGISTER" && (
          <AuthPage
            initialRole="USER"
            onNavigateHome={() => {
              setActiveTab("HOME");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {/* TAB 7: TECHNICIAN PORTAL PAGE */}
        {activeTab === "TECHNICIAN PORTAL" && (
          <AuthPage
            initialRole="TECHNICIAN"
            onNavigateHome={() => {
              setActiveTab("HOME");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </main>

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenAbout={() => {
          setActiveTab("ABOUT");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenContact={() => {
          setActiveTab("CONTACT US");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Service Booking Modal */}
      <ServiceBookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedServiceForBooking(null);
        }}
        service={selectedServiceForBooking}
        onBookingSuccess={(booking) => {
          showToast(`Service booking requested for ${booking.serviceName}!`);
        }}
      />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <TechnicianModal
        isOpen={isTechnicianAuthOpen}
        onClose={() => setIsTechnicianAuthOpen(false)}
      />

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
}
