"use client";

import { useState } from "react";
import { TopBar } from "./TopBar";
import { Header } from "./Header";
import { Navbar } from "./Navbar";

export function SeoHeaderNavbar({ activeTabName = "ALL SERVICES" }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [likeCount, setLikeCount] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("phidim_service_like_count");
      return saved ? parseInt(saved, 10) : 582;
    }
    return 582;
  });

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleSelectCategory = (catName) => {
    setSelectedCategory(catName);
    window.location.href = `/?tab=services&category=${encodeURIComponent(catName)}`;
  };

  const handleTabTransition = (tab) => {
    const normalized = tab.toUpperCase();
    if (normalized === "HOME") {
      window.location.href = "/";
    } else if (normalized === "ALL SERVICES") {
      window.location.href = "/services";
    } else if (normalized === "LAN NETWORKING") {
      window.location.href = "/?tab=lan-networking";
    } else if (normalized === "ABOUT") {
      window.location.href = "/?tab=about";
    } else if (normalized === "CONTACT US") {
      window.location.href = "/?tab=contact-us";
    }
  };

  const handleIncrementLikes = () => {
    setLikeCount((prev) => {
      const next = prev + 1;
      if (typeof window !== "undefined") {
        localStorage.setItem("phidim_service_like_count", next.toString());
      }
      return next;
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md transition-all">
      <TopBar />
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleSelectCategory}
        visitorCount={1285}
        onOpenAuth={() => {
          window.location.href = "/login";
        }}
        onSearchSubmit={handleSearchSubmit}
      />
      <Navbar
        activeTab={activeTabName}
        setActiveTab={handleTabTransition}
        onSelectCategory={handleSelectCategory}
        onOpenTechnicianAuth={() => {
          window.location.href = "/login?role=TECHNICIAN";
        }}
        likeCount={likeCount}
        onIncrementLikes={handleIncrementLikes}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        visitorCount={1285}
        onOpenAuth={() => {
          window.location.href = "/login";
        }}
        onSearchSubmit={handleSearchSubmit}
      />
    </header>
  );
}
