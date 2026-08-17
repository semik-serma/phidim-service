# 🎨 Phidim Service - Frontend Layer

This directory contains the **complete Frontend & UI codebase** for the Phidim Service platform.

---

## 📁 Full Frontend Directory Structure

```text
frontend/
├── app/                     # Next.js App Router UI pages & layouts
│   ├── page.js              # Homepage
│   ├── layout.js            # Root layout with fonts & metadata
│   ├── globals.css          # Tailwind CSS & UI styling
│   ├── error.js             # Global error boundary
│   ├── not-found.js         # 404 handler
│   ├── user-dashboard/      # Customer portal & booking history
│   ├── technician-dashboard/# Technician job management workspace
│   ├── admin/               # Admin master dashboard
│   ├── login/               # Authentication page
│   ├── register/            # Registration page
│   └── requests/            # User request submission & tracking
│
├── components/              # Reusable React UI components & widgets
│   ├── Navbar.js            # Responsive top navigation header
│   ├── Footer.js            # Main site footer
│   ├── Header.js            # Header component
│   ├── TopBar.js            # Contact banner & quick links
│   ├── HeroCarousel.js      # Animated hero carousel with service cards
│   ├── WeatherWidget.js     # Live Phidim weather widget
│   ├── WhatsAppWidget.js    # WhatsApp instant contact floating widget
│   ├── AuthModal.js         # Unified login & signup modal popup
│   ├── ServiceBookingModal.js # Interactive service booking modal
│   ├── RoleGuard.js         # Client-side route role protector
│   ├── admin-dashboard/     # Admin analytics, user tables & KPIs
│   ├── user-dashboard/      # User dashboard tabs & tracker
│   ├── technician-dashboard/# Technician job list & status controls
│   ├── calls/               # WebRTC Audio/Video call overlay dialogs
│   ├── chat/                # Live messaging window & chat widgets
│   └── ui/                  # Atomic UI elements (buttons, dialogs, inputs)
│
├── context/                 # React Context State Providers
│   └── AuthContext.js       # Client authentication state (user, role, login, logout, OAuth)
│
├── data/                    # Data sources & catalog definitions
│   ├── categoriesData.js    # Service category definitions
│   ├── seoServicesData.js   # SEO optimized services list
│   └── services.js          # Core repair & maintenance service data
│
├── lib/                     # Frontend client utilities & local stores
│   ├── avatarCache.js       # Profile photo cache manager
│   ├── userRegistry.js      # Client user registry helper
│   ├── chatStore.js         # Chat message store
│   ├── bookingStore.js      # Booking state store
│   └── callSignaling.js     # WebRTC signaling helper
│
├── public/                  # Static assets & icons
│   ├── assets/
│   ├── dhanraj.png
│   └── phidim service glow effect logo.png
│
├── realtime/                # Realtime WebSockets & WebRTC
│   ├── client.js            # Socket.IO client connection manager
│   ├── VideoCall.jsx        # WebRTC audio/video call interface
│   └── callService.js       # Call signaling helper
│
├── index.js                 # Centralized export file for all components
└── package.json             # Frontend package configuration
```

---

## 🚀 Running the Frontend

```bash
# Start the frontend dev server (Port 3000)
npm run dev
```
