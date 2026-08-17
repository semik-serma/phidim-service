"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Navigation,
  MessageSquare,
  Phone,
  Calendar,
  FileText,
  XCircle,
  Clock,
  CheckCircle2,
  UserCheck,
  Star,
  MapPin,
  MoreVertical,
  Tv,
  Camera,
  Zap,
  Monitor,
  Wrench,
  Wind,
  Droplet,
  ShieldCheck,
  Wifi,
  X,
  Printer,
  Download,
  PlusCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getBookingsList, subscribeBookings, createBooking, cancelBooking } from "@/lib/bookingStore";
import { SERVICES, SERVICE_CATEGORIES } from "@/data/services";

export const USER_STATUS_CLASSES = {
  Pending: {
    badge: "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800",
    dot: "bg-amber-500",
    icon: Clock,
  },
  Accepted: {
    badge: "bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800",
    dot: "bg-blue-500",
    icon: CheckCircle2,
  },
  "Technician Assigned": {
    badge: "bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800",
    dot: "bg-purple-500",
    icon: UserCheck,
  },
  "On The Way": {
    badge: "bg-orange-100 dark:bg-orange-950/80 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-800",
    dot: "bg-orange-500 animate-pulse",
    icon: Navigation,
  },
  "In Progress": {
    badge: "bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800",
    dot: "bg-cyan-500 animate-pulse",
    icon: Clock,
  },
  Completed: {
    badge: "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
    dot: "bg-emerald-500",
    icon: CheckCircle2,
  },
  Cancelled: {
    badge: "bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800",
    dot: "bg-red-500",
    icon: XCircle,
  },
};

const TECHNICIANS_LIST = [
  { name: "Rajesh Tamang", specialty: "CCTV & Fiber Network Lead", rating: 4.98, phone: "+977 9842109842", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
  { name: "Anita Gurung", specialty: "AC & Refrigeration Engineer", rating: 4.95, phone: "+977 9842109843", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" },
  { name: "Niraj Sunuwar", specialty: "DishHome DTH & CCTV Specialist", rating: 4.9, phone: "+977 9862772457", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" },
  { name: "Subash Tamang", specialty: "Master Electrician & Inverter Tech", rating: 4.92, phone: "+977 9801122334", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80" },
  { name: "Prem Rai", specialty: "Satellite TV & Sanitary Plumber", rating: 4.88, phone: "+977 9812345678", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" },
  { name: "Komal Bhattarai", specialty: "Computer OS & Hardware IT", rating: 4.86, phone: "+977 9852671122", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80" },
];

export function MyBookingsList({ onTrackLive, onChat, onCall, onInvoice }) {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isAddingBooking, setIsAddingBooking] = useState(false);
  const [activeInvoiceBooking, setActiveInvoiceBooking] = useState(null);
  const [successBookingBanner, setSuccessBookingBanner] = useState(null);

  // New Booking Form State
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES[0]?.id || "custom");
  const [customServiceName, setCustomServiceName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("CCTV & Security");
  const [customerName, setCustomerName] = useState(user?.name || user?.displayName || "Semik Serma");
  const [customerPhone, setCustomerPhone] = useState(user?.phone || "+977 9862772457");
  const [address, setAddress] = useState("Phidim Ward 1 (Bazaar), Panchthar");
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().split("T")[0]);
  const [timeSlot, setTimeSlot] = useState("Morning (09:00 AM - 12:00 PM)");
  const [selectedTechName, setSelectedTechName] = useState("Rajesh Tamang");
  const [isEmergency, setIsEmergency] = useState(false);
  const [notes, setNotes] = useState("");
  const [basePrice, setBasePrice] = useState(SERVICES[0]?.basePrice || 3500);

  useEffect(() => {
    setBookings(getBookingsList());
    const unsub = subscribeBookings((updatedList) => {
      setBookings(updatedList);
    });
    return unsub;
  }, []);

  // Update price when service changes
  const handleServiceChange = (srvId) => {
    setSelectedServiceId(srvId);
    if (srvId === "custom") {
      setBasePrice(1500);
    } else {
      const found = SERVICES.find((s) => s.id === srvId);
      if (found) {
        setSelectedCategory(found.category);
        setBasePrice(found.basePrice);
        setCustomServiceName(found.name);
      }
    }
  };

  const handleCreateBookingSubmit = (e) => {
    e.preventDefault();

    let serviceTitle = "";
    if (selectedServiceId === "custom") {
      serviceTitle = customServiceName.trim() || `${selectedCategory} Repair & Inspection`;
    } else {
      const srv = SERVICES.find((s) => s.id === selectedServiceId);
      serviceTitle = srv ? srv.name : customServiceName || `${selectedCategory} Service`;
    }

    const assignedTechObj = TECHNICIANS_LIST.find((t) => t.name === selectedTechName) || TECHNICIANS_LIST[0];

    const newBooking = createBooking({
      serviceName: serviceTitle,
      category: selectedCategory,
      customerName: customerName.trim() || "Customer User",
      customerEmail: user?.email || "user@phidim.np",
      customerPhone: customerPhone.trim() || "+977 9862772457",
      address: address.trim() || "Phidim-1, Panchthar",
      date: bookingDate,
      timeSlot: isEmergency ? "⚡ Emergency (Immediate 30m Dispatch)" : timeSlot,
      isEmergency: isEmergency,
      basePrice: isEmergency ? basePrice + 500 : basePrice,
      amount: `Rs. ${(isEmergency ? basePrice + 500 : basePrice).toLocaleString("en-IN")}`,
      notes: notes,
      status: "Accepted",
      technician: {
        name: assignedTechObj.name,
        specialty: assignedTechObj.specialty,
        phone: assignedTechObj.phone,
        email: "tech@phidim.np",
        avatar: assignedTechObj.avatar,
        rating: assignedTechObj.rating,
      },
    });

    if (newBooking) {
      setBookings((prev) => [newBooking, ...prev.filter((b) => b.id !== newBooking.id)]);
      setSuccessBookingBanner(newBooking);
      setIsAddingBooking(false);
      setNotes("");
      setTimeout(() => {
        setSuccessBookingBanner(null);
      }, 10000);
    }
  };

  const handleCancel = (bookingId) => {
    if (confirm(`Are you sure you want to cancel booking #${bookingId}?`)) {
      cancelBooking(bookingId, "Customer requested cancellation");
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: "Cancelled" } : b))
      );
    }
  };

  const getServiceIcon = (category) => {
    const c = (category || "").toLowerCase();
    if (c.includes("cctv") || c.includes("secu")) return ShieldCheck;
    if (c.includes("elect") || c.includes("inverter")) return Zap;
    if (c.includes("fiber") || c.includes("lan") || c.includes("netw")) return Wifi;
    if (c.includes("ac") || c.includes("cool") || c.includes("refrig")) return Wind;
    if (c.includes("dth") || c.includes("dish") || c.includes("tv")) return Tv;
    if (c.includes("plumb")) return Droplet;
    if (c.includes("comp") || c.includes("it")) return Monitor;
    return Wrench;
  };

  const filtered = bookings.filter((b) => {
    if (filter === "Active") return b.status !== "Completed" && b.status !== "Cancelled";
    if (filter === "Completed") return b.status === "Completed";
    if (filter === "Cancelled") return b.status === "Cancelled";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Success Notification Banner */}
      <AnimatePresence>
        {successBookingBanner && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-5 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-emerald-400/40"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
                <CheckCircle2 size={28} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
                    #{successBookingBanner.id}
                  </span>
                  <h4 className="text-base font-black">Booking Successfully Added!</h4>
                </div>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Technician <strong>{successBookingBanner.technician?.name}</strong> has been assigned for{" "}
                  <strong>{successBookingBanner.serviceName}</strong> on {successBookingBanner.date}.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const msg = `Hello Phidim Service! I just added booking #${successBookingBanner.id}: ${successBookingBanner.serviceName} for ${successBookingBanner.date} at ${successBookingBanner.address}.`;
                  window.open(`https://wa.me/9779862772457?text=${encodeURIComponent(msg)}`, "_blank");
                }}
                className="px-4 py-2 rounded-xl bg-white text-emerald-900 font-extrabold text-xs shadow-md hover:bg-emerald-50 transition-colors cursor-pointer"
              >
                Forward to WhatsApp
              </button>
              <button
                onClick={() => setSuccessBookingBanner(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP FEATURE: ADD SERVICE BOOKING CARD */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-[28px] p-6 sm:p-7 border border-emerald-500/30 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/50 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black uppercase tracking-wider">
              <Sparkles size={14} className="text-emerald-400" />
              <span>Doorstep Technician Dispatch Portal</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>⚡ Add Service Booking & Technician Dispatch</span>
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Request immediate technician visits for electrical, CCTV, fiber net, AC, TV dish, or plumbing repairs across Panchthar.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddingBooking(!isAddingBooking)}
            className={`px-5 py-3 rounded-2xl text-xs font-black flex items-center gap-2 transition-all shadow-lg cursor-pointer ${
              isAddingBooking
                ? "bg-slate-700 hover:bg-slate-600 text-white border border-slate-500"
                : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/30 hover:scale-102"
            }`}
          >
            {isAddingBooking ? (
              <>
                <X size={16} />
                <span>Close Booking Form</span>
              </>
            ) : (
              <>
                <PlusCircle size={16} />
                <span>+ Create New Booking</span>
              </>
            )}
          </button>
        </div>

        {/* Embedded Booking Creation Form */}
        <AnimatePresence>
          {isAddingBooking && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleCreateBookingSubmit}
              className="space-y-5 pt-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* 1. Service Selection */}
                <div>
                  <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Wrench size={13} className="text-emerald-400" />
                    <span>Select Service Package</span>
                  </label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => handleServiceChange(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-emerald-700/50 bg-slate-800 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    {SERVICES.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.name} (Rs. {srv.basePrice.toLocaleString("en-IN")})
                      </option>
                    ))}
                    <option value="custom">⚡ Other / Custom Technical Repair</option>
                  </select>
                </div>

                {/* 2. Custom Title (if custom or editing) */}
                <div>
                  <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-emerald-400" />
                    <span>Category / Problem Type</span>
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-emerald-700/50 bg-slate-800 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    {SERVICE_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Customer Full Name */}
                <div>
                  <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <UserCheck size={13} className="text-emerald-400" />
                    <span>Customer Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Semik Serma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-emerald-700/50 bg-slate-800 text-xs font-bold text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                {/* 4. Phone Number */}
                <div>
                  <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Phone size={13} className="text-emerald-400" />
                    <span>Contact Phone</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+977 9862772457"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-emerald-700/50 bg-slate-800 text-xs font-bold text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                {/* 5. Address / Location */}
                <div>
                  <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <MapPin size={13} className="text-emerald-400" />
                    <span>Address in Panchthar</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Phidim Ward 1, Bazaar"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-emerald-700/50 bg-slate-800 text-xs font-bold text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                {/* 6. Date */}
                <div>
                  <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Calendar size={13} className="text-emerald-400" />
                    <span>Service Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-emerald-700/50 bg-slate-800 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                {/* 7. Time Slot */}
                <div>
                  <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Clock size={13} className="text-emerald-400" />
                    <span>Preferred Time Slot</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-emerald-700/50 bg-slate-800 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <option>Morning (08:00 AM - 11:00 AM)</option>
                    <option>Morning (09:00 AM - 12:00 PM)</option>
                    <option>Afternoon (01:00 PM - 04:00 PM)</option>
                    <option>Evening (04:00 PM - 07:00 PM)</option>
                    <option>⚡ Emergency Instant (30 Minutes)</option>
                  </select>
                </div>

                {/* 8. Preferred Technician */}
                <div>
                  <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <UserCheck size={13} className="text-emerald-400" />
                    <span>Select Technician</span>
                  </label>
                  <select
                    value={selectedTechName}
                    onChange={(e) => setSelectedTechName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-emerald-700/50 bg-slate-800 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    {TECHNICIANS_LIST.map((t) => (
                      <option key={t.name} value={t.name}>
                        {t.name} ({t.specialty}) ★ {t.rating}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 9. Estimated Base Rate */}
                <div>
                  <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Zap size={13} className="text-emerald-400" />
                    <span>Estimated Labor Rate (NPR)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-xs font-black text-slate-400">Rs.</span>
                    <input
                      type="number"
                      value={basePrice}
                      onChange={(e) => setBasePrice(Number(e.target.value) || 0)}
                      className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-emerald-700/50 bg-slate-800 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                </div>
              </div>

              {/* Notes & Emergency Toggle */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="Specific notes or issue description (e.g. CCTV night vision black & white, wire severed in room 2)..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-emerald-700/50 bg-slate-800 text-xs font-medium text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setIsEmergency(!isEmergency)}
                  className={`h-11 px-4 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isEmergency
                      ? "bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/40"
                      : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                  }`}
                >
                  <Zap size={14} className={isEmergency ? "fill-white animate-pulse" : "text-amber-400"} />
                  <span>{isEmergency ? "⚡ Emergency Dispatch (30m)" : "Normal Dispatch"}</span>
                </button>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingBooking(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/30 hover:scale-102 transition-transform flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 size={16} />
                  <span>Confirm & Add Booking</span>
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* SECTION HEADER & FILTER PILLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            My Service Bookings & Technician Dispatches
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {bookings.length} Total Registered Dispatches • Real-time Status & Direct Technician Call
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl self-start border border-slate-200/60 dark:border-slate-700/60">
          {["All", "Active", "Completed", "Cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === tab
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-5">
        {filtered.map((b) => {
          const statusCfg = USER_STATUS_CLASSES[b.status] || USER_STATUS_CLASSES.Pending;
          const ServiceIcon = getServiceIcon(b.category);

          return (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/40 transition-all p-5 sm:p-6 space-y-4"
            >
              {/* Header: Service Name + Status Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
                    <ServiceIcon size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                        {b.serviceName}
                      </h4>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-black px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/20">
                        #{b.id}
                      </span>
                      {b.isEmergency && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500 text-white animate-pulse">
                          ⚡ 30m Emergency
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin size={12} className="text-emerald-500 shrink-0" /> {b.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 rounded-full border ${statusCfg.badge}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${statusCfg.dot}`} />
                    {b.status}
                  </span>
                  <span className="text-base font-black text-slate-900 dark:text-white font-mono">
                    {b.amount}
                  </span>
                </div>
              </div>

              {/* Technician Info + Appointment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/60 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 text-xs">
                {/* Tech Details */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-extrabold flex items-center justify-center shadow-sm text-xs shrink-0 overflow-hidden">
                    {b.technician?.avatar?.startsWith("http") ? (
                      <img src={b.technician.avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      (b.technician?.name || "Tech").substring(0, 2).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-900 dark:text-white">
                      {b.technician?.name || "Assigned Technician"}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>{b.technician?.specialty || b.category}</span>
                      <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star size={11} className="fill-amber-400 stroke-amber-500" />
                        {b.technician?.rating || 4.9}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="flex items-center justify-start md:justify-end gap-4 text-slate-600 dark:text-slate-300 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-emerald-500" />
                    <span>{b.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-blue-500" />
                    <span>{b.timeSlot || b.time}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {b.status === "On The Way" && onTrackLive && (
                    <button
                      onClick={() => onTrackLive(b)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-xs font-black shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                    >
                      <Navigation size={14} className="animate-spin-slow" />
                      <span>Track Live</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (onChat) onChat(b.technician || { name: "Rajesh Tamang", email: "rajesh@phidim.np" });
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-600 dark:text-blue-400 text-xs font-bold transition-colors border border-blue-500/20 cursor-pointer"
                  >
                    <MessageSquare size={14} />
                    <span>Chat</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onCall) onCall(b.technician || { name: "Rajesh Tamang", email: "rajesh@phidim.np" }, "video");
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-600 dark:text-emerald-400 text-xs font-bold transition-colors border border-emerald-500/20 cursor-pointer"
                  >
                    <Phone size={14} />
                    <span>Call Tech</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveInvoiceBooking(b)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors border border-slate-200/60 dark:border-slate-700/60 cursor-pointer"
                  >
                    <FileText size={14} className="text-emerald-500" />
                    <span>Invoice</span>
                  </button>

                  {b.status !== "Completed" && b.status !== "Cancelled" && (
                    <button
                      onClick={() => handleCancel(b.id)}
                      className="flex items-center gap-1 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <XCircle size={14} />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <Calendar size={32} className="mx-auto text-slate-400" />
            <h4 className="text-base font-black text-slate-800 dark:text-slate-200">No Bookings Found</h4>
            <p className="text-xs text-slate-500">There are no {filter.toLowerCase()} service bookings recorded.</p>
          </div>
        )}
      </div>

      {/* Invoice Modal */}
      <AnimatePresence>
        {activeInvoiceBooking && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-slate-900 dark:text-white"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <FileText size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-black">Official Service Invoice</h3>
                    <p className="text-xs text-slate-400 font-mono">Invoice #{activeInvoiceBooking.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveInvoiceBooking(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Service:</span>
                  <span className="font-bold">{activeInvoiceBooking.serviceName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Customer:</span>
                  <span className="font-bold">{activeInvoiceBooking.customerName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Address:</span>
                  <span className="font-bold">{activeInvoiceBooking.address}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Date & Slot:</span>
                  <span className="font-bold">{activeInvoiceBooking.date} ({activeInvoiceBooking.timeSlot})</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Assigned Technician:</span>
                  <span className="font-bold">{activeInvoiceBooking.technician?.name || "Rajesh Tamang"}</span>
                </div>
                <div className="flex justify-between py-3 bg-emerald-500/10 px-4 rounded-xl text-sm font-black text-emerald-600 dark:text-emerald-400">
                  <span>Total Amount Due:</span>
                  <span>{activeInvoiceBooking.amount}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer size={14} />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => setActiveInvoiceBooking(null)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-black cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
