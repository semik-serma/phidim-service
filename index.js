/**
 * ============================================================================
 * PHIDIM SERVICE - FRONTEND MODULE
 * ============================================================================
 * Centralized exports for all frontend state, contexts, UI components,
 * modals, dashboard views, and realtime clients.
 */

// Context
export { AuthProvider, useAuth } from "./context/AuthContext.js";

// Realtime Client
export { getSocket, disconnectSocket, subscribeToEvent } from "./realtime/client.js";
export { default as VideoCall } from "./realtime/VideoCall.jsx";

// Re-export components directly from ./components
export { Navbar } from "./components/Navbar.js";
export { Footer } from "./components/Footer.js";
export { Header } from "./components/Header.js";
export { TopBar } from "./components/TopBar.js";
export { HeroCarousel } from "./components/HeroCarousel.js";
export { WeatherWidget } from "./components/WeatherWidget.js";
export { WhatsAppWidget } from "./components/WhatsAppWidget.js";
export { AuthModal } from "./components/AuthModal.js";
export { AboutModal } from "./components/AboutModal.js";
export { ContactModal } from "./components/ContactModal.js";
export { ServiceBookingModal } from "./components/ServiceBookingModal.js";
export { LogoutConfirmModal } from "./components/LogoutConfirmModal.js";
export { RoleGuard } from "./components/RoleGuard.js";

