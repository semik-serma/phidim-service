"use client";

import { useState, useEffect } from "react";
import {
  CalendarCheck,
  Clock,
  MapPin,
  Phone,
  User,
  X,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Wrench,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import { createBooking } from "@/lib/bookingStore";
import { SERVICES } from "@/data/services";
import Link from "next/link";

export function ServiceBookingModal({ isOpen, onClose, service, onBookingSuccess }) {
  const { user } = useAuth();

  const [currentService, setCurrentService] = useState(service || SERVICES[0]);

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "+977 ",
    address: "Phidim-1, Panchthar",
    preferredDate: new Date().toISOString().split("T")[0],
    timeSlot: "Morning (09:00 AM - 12:00 PM)",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);

  useEffect(() => {
    if (service) {
      setCurrentService(service);
    } else if (SERVICES && SERVICES.length > 0) {
      setCurrentService(SERVICES[0]);
    }
    setIsSubmitted(false);
    setCreatedBooking(null);
  }, [service, isOpen]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        customerName: prev.customerName || user?.name || user?.displayName || "",
        customerPhone: prev.customerPhone === "+977 " ? (user?.phone || "+977 ") : prev.customerPhone,
        address: prev.address === "Phidim-1, Panchthar" ? (user?.location || "Phidim-1, Panchthar") : prev.address,
      }));
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const activeService = currentService || SERVICES[0] || {
    id: "general-service",
    name: "General Technical Doorstep Service",
    category: "General Maintenance",
    basePrice: 500,
    duration: "1-2 hours",
    warranty: "30 Days Guarantee",
  };

  const handleServiceChange = (e) => {
    const found = SERVICES.find((s) => s.id === e.target.value);
    if (found) {
      setCurrentService(found);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const saved = createBooking({
      serviceName: activeService.name,
      category: activeService.category,
      basePrice: activeService.basePrice || 500,
      customerName: formData.customerName || user?.name || "Customer",
      customerEmail: user?.email || "",
      customerPhone: formData.customerPhone,
      address: formData.address,
      date: formData.preferredDate,
      timeSlot: formData.timeSlot,
      notes: formData.notes,
      isEmergency: formData.timeSlot.includes("Emergency"),
      technician: {
        name: "Rajesh Tamang",
        specialty: activeService.category || "Field Technician",
        phone: "+977 9842109842",
        email: "rajesh@phidim.np",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        rating: 4.95,
      },
    });

    setCreatedBooking(saved);
    setIsSubmitted(true);

    if (onBookingSuccess && saved) {
      onBookingSuccess(saved);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-emerald-900/50 shadow-2xl p-6 sm:p-8 my-8 text-slate-900 dark:text-white space-y-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
                  <CalendarCheck size={14} />
                  <span>On-Demand Technician Dispatch</span>
                </div>
                <h3 className="text-xl font-black tracking-tight">{activeService.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Fill in your address and contact details to dispatch a certified technician to your doorstep in Phidim & Panchthar.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span>Base Rate: Rs. {(activeService.basePrice || 500).toLocaleString("en-IN")}</span>
                  <span>•</span>
                  <span>{activeService.duration || "1-2 hours"}</span>
                  <span>•</span>
                  <span>{activeService.warranty || "Service Guarantee"}</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Service Selection Dropdown */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Select / Change Service
                  </label>
                  <select
                    value={activeService.id}
                    onChange={handleServiceChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.category}: {s.name} (Rs. {s.basePrice})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Your Full Name *</label>
                    <div className="relative">
                      <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="Semik Serma"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Phone Number *</label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="+977 9862772457"
                        value={formData.customerPhone}
                        onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Service Address / Location in Phidim *
                  </label>
                  <div className="relative">
                    <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Phidim Bazar, Near Bus Park, Ward No. 1"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:border-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Time Slot</label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option>Morning (09:00 AM - 12:00 PM)</option>
                      <option>Afternoon (12:00 PM - 04:00 PM)</option>
                      <option>Evening (04:00 PM - 07:00 PM)</option>
                      <option>⚡ Emergency (Immediate Dispatch)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Problem Details / Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Describe any specific faults or notes for the technician..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-black shadow-lg shadow-emerald-600/30 hover:scale-102 transition-transform cursor-pointer"
                  >
                    Confirm Service Booking
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* Success confirmation */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 size={36} />
              </div>
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono font-black text-xs">
                  BOOKING ID: #{createdBooking?.id || "PS-9482"}
                </span>
                <h3 className="text-xl font-black mt-2">Booking Confirmed!</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                Thank you, <strong>{formData.customerName || "Valued Customer"}</strong>. A certified technician has been scheduled for{" "}
                <strong>{activeService.name}</strong> on <strong>{formData.preferredDate}</strong> ({formData.timeSlot}).
              </p>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 text-left text-xs space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-500 dark:text-slate-400">Assigned Tech:</span>
                  <span className="text-emerald-700 dark:text-emerald-300">{createdBooking?.technician?.name || "Rajesh Tamang"}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-slate-500 dark:text-slate-400">Status:</span>
                  <span className="text-emerald-600 dark:text-emerald-400">Confirmed (Dispatched)</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-slate-500 dark:text-slate-400">Address:</span>
                  <span className="text-slate-800 dark:text-slate-200 truncate">{formData.address}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    const msg = `Hello Phidim Service! I just booked: ${activeService.name} (Booking #${createdBooking?.id || "PS-9482"}) for ${formData.preferredDate} (${formData.timeSlot}) at ${formData.address}. My phone is ${formData.customerPhone}.`;
                    window.open(`https://wa.me/9779862772457?text=${encodeURIComponent(msg)}`, "_blank");
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Phone size={14} />
                  <span>Notify via WhatsApp</span>
                </button>

                <Link
                  href="/user-dashboard"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 text-xs font-black shadow-xs flex items-center gap-1 cursor-pointer border border-slate-700"
                >
                  <span>View in Dashboard</span>
                  <ArrowRight size={13} />
                </Link>

                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
