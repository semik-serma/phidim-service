"use client";

// Unified User & Admin Booking Store for Phidim Service System
// Handles booking creation, persistence, technician assignment, status lifecycle, and real-time updates.

const BOOKINGS_STORAGE_KEY = "phidim_service_bookings_v2";

export const DEFAULT_BOOKINGS = [
  {
    id: "PS-9482",
    serviceName: "Full 4-Camera HD CCTV System Installation & NVR Setup",
    category: "CCTV & Security",
    customerName: "Semik Serma",
    customerEmail: "semikserma@gmail.com",
    customerPhone: "+977 9862772400",
    address: "Phidim-1, Main Road, Panchthar",
    date: "2026-08-10",
    timeSlot: "Morning (09:00 AM - 12:00 PM)",
    status: "On The Way", // 'Pending' | 'Accepted' | 'Technician Assigned' | 'On The Way' | 'In Progress' | 'Completed' | 'Cancelled'
    amount: "Rs. 3,500",
    numericAmount: 3500,
    paymentStatus: "Cash / Fonepay on Completion",
    isEmergency: false,
    notes: "Please check rear entrance camera night vision view.",
    technician: {
      name: "Rajesh Tamang",
      specialty: "CCTV & Security Specialist",
      phone: "+977 9842109842",
      email: "rajesh@phidim.np",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 4.95,
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "PS-9481",
    serviceName: "Complete Split AC Deep Cleaning & Gas Refill Service",
    category: "AC & Refrigeration",
    customerName: "Dhanraj Serma",
    customerEmail: "dhanrajserma34@gmail.com",
    customerPhone: "+977 9862772457",
    address: "Phidim-2, Panchthar HQ",
    date: "2026-08-11",
    timeSlot: "Afternoon (01:00 PM - 04:00 PM)",
    status: "Technician Assigned",
    amount: "Rs. 2,200",
    numericAmount: 2200,
    paymentStatus: "Pending Completion",
    isEmergency: false,
    notes: "1.5 Ton Inverter AC not cooling properly.",
    technician: {
      name: "Anita Gurung",
      specialty: "AC & Cooling Engineer",
      phone: "+977 9842109843",
      email: "anita@phidim.np",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      rating: 4.88,
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: "PS-9480",
    serviceName: "Fiber Optic Cable Splicing & Optical Power Calibration",
    category: "Fiber & LAN Networking",
    customerName: "Prakash Sir Core-it",
    customerEmail: "prakash@phidim.np",
    customerPhone: "+977 9852670000",
    address: "Dharan Cloud Data Center Hub",
    date: "2026-08-08",
    timeSlot: "Morning (09:00 AM - 12:00 PM)",
    status: "Completed",
    amount: "Rs. 1,500",
    numericAmount: 1500,
    paymentStatus: "Paid via eSewa",
    isEmergency: false,
    notes: "Optical loss calibrated to -18.5 dBm.",
    technician: {
      name: "Rajesh Tamang",
      specialty: "Fiber Network Lead",
      phone: "+977 9842109842",
      email: "rajesh@phidim.np",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5.0,
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "PS-9479",
    serviceName: "DishHome DTH Antenna Alignment & LNB Signal Tuning",
    category: "DishHome DTH & TV",
    customerName: "Web Developer",
    customerEmail: "webdeveloper@phidim.np",
    customerPhone: "+977 9862000111",
    address: "Phidim-4, Gadhi",
    date: "2026-08-07",
    timeSlot: "Afternoon (02:00 PM - 05:00 PM)",
    status: "Completed",
    amount: "Rs. 800",
    numericAmount: 800,
    paymentStatus: "Paid Cash",
    isEmergency: false,
    notes: "DishHome signal aligned with spectrum meter.",
    technician: {
      name: "Anita Gurung",
      specialty: "DTH & Satellite Technician",
      phone: "+977 9842109843",
      email: "anita@phidim.np",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      rating: 4.9,
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];

// Get all bookings from localStorage or default seed
export function getBookingsList(userEmail = "") {
  if (typeof window === "undefined") return DEFAULT_BOOKINGS;

  try {
    const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(DEFAULT_BOOKINGS));
      return DEFAULT_BOOKINGS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(DEFAULT_BOOKINGS));
      return DEFAULT_BOOKINGS;
    }

    if (userEmail) {
      const normalized = userEmail.toLowerCase().trim();
      return parsed.filter(
        (b) =>
          !b.customerEmail ||
          b.customerEmail.toLowerCase().includes(normalized) ||
          normalized.includes(b.customerEmail.toLowerCase())
      );
    }
    return parsed;
  } catch (e) {
    return DEFAULT_BOOKINGS;
  }
}

// Create a new booking
export function createBooking(bookingData) {
  if (typeof window === "undefined") return null;

  const newBooking = {
    id: `PS-${Math.floor(1000 + Math.random() * 9000)}`,
    serviceName: bookingData.serviceName || bookingData.category || "General Technical Service",
    category: bookingData.category || "Electrical & Inverter",
    customerName: bookingData.customerName || "Customer User",
    customerEmail: (bookingData.customerEmail || "").toLowerCase().trim(),
    customerPhone: bookingData.customerPhone || "+977 9862772457",
    address: bookingData.address || "Phidim, Panchthar",
    date: bookingData.date || new Date().toISOString().split("T")[0],
    timeSlot: bookingData.timeSlot || "Morning (09:00 AM - 12:00 PM)",
    status: bookingData.status || "Pending",
    amount: bookingData.basePrice ? `Rs. ${bookingData.basePrice.toLocaleString("en-IN")}` : (bookingData.amount || "Rs. 1,500"),
    numericAmount: Number(bookingData.basePrice) || 1500,
    paymentStatus: "Cash / Fonepay on Completion",
    isEmergency: !!bookingData.isEmergency,
    notes: bookingData.notes || "",
    technician: bookingData.technician || {
      name: "Rajesh Tamang",
      specialty: "Certified Field Lead",
      phone: "+977 9842109842",
      email: "rajesh@phidim.np",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 4.95,
    },
    createdAt: new Date().toISOString(),
  };

  try {
    const list = getBookingsList();
    const updated = [newBooking, ...list];
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("phidim_bookings_updated", { detail: updated }));
  } catch (e) {
    console.error("Failed to save booking:", e);
  }

  return newBooking;
}

// Update status of an existing booking
export function updateBookingStatus(bookingId, newStatus) {
  if (typeof window === "undefined") return false;

  try {
    const list = getBookingsList();
    const updated = list.map((b) => {
      if (b.id === bookingId) {
        return { ...b, status: newStatus, updatedAt: new Date().toISOString() };
      }
      return b;
    });

    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("phidim_bookings_updated", { detail: updated }));
    return true;
  } catch (e) {
    return false;
  }
}

// Cancel a booking
export function cancelBooking(bookingId, reason = "Cancelled by user") {
  if (typeof window === "undefined") return false;

  try {
    const list = getBookingsList();
    const updated = list.map((b) => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: "Cancelled",
          cancellationReason: reason,
          cancelledAt: new Date().toISOString(),
        };
      }
      return b;
    });

    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("phidim_bookings_updated", { detail: updated }));
    return true;
  } catch (e) {
    return false;
  }
}

// Subscribe to real-time booking changes
export function subscribeBookings(callback) {
  if (typeof window === "undefined") return () => {};

  const handleUpdate = () => {
    callback(getBookingsList());
  };

  window.addEventListener("phidim_bookings_updated", handleUpdate);
  window.addEventListener("storage", (e) => {
    if (e.key === BOOKINGS_STORAGE_KEY) {
      handleUpdate();
    }
  });

  return () => {
    window.removeEventListener("phidim_bookings_updated", handleUpdate);
  };
}
