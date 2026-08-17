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

// Re-export components directly from src/components
export { default as Navbar } from "../src/components/Navbar.js";
export { default as Footer } from "../src/components/Footer.js";
export { default as Header } from "../src/components/Header.js";
export { default as TopBar } from "../src/components/TopBar.js";
export { default as HeroCarousel } from "../src/components/HeroCarousel.js";
export { default as WeatherWidget } from "../src/components/WeatherWidget.js";
export { default as WhatsAppWidget } from "../src/components/WhatsAppWidget.js";
export { default as AuthModal } from "../src/components/AuthModal.js";
export { default as AboutModal } from "../src/components/AboutModal.js";
export { default as ContactModal } from "../src/components/ContactModal.js";
export { default as ServiceBookingModal } from "../src/components/ServiceBookingModal.js";
export { default as LogoutConfirmModal } from "../src/components/LogoutConfirmModal.js";
export { default as RoleGuard } from "../src/components/RoleGuard.js";
