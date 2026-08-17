"use client";

import { useState } from "react";
import { MessageCircle, CalendarCheck, Phone } from "lucide-react";
import { ServiceBookingModal } from "./ServiceBookingModal";
import { SERVICES } from "@/data/services";

export function SeoBookingSection({ serviceId, serviceTitle }) {
  const [isOpen, setIsOpen] = useState(false);

  const matchedService = SERVICES.find((s) => s.id === serviceId) || {
    id: serviceId || "general-service",
    name: serviceTitle || "General Technical Service",
    category: "General Maintenance",
    basePrice: 500,
    duration: "1-2 hours",
    warranty: "30 Days Guarantee",
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      `Hello Phidim Service! I want to book doorstep service for: ${matchedService.name}. Please dispatch a technician in Phidim, Panchthar.`
    );
    window.open(`https://wa.me/9779862772457?text=${text}`, "_blank");
  };

  return (
    <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center gap-3">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md hover:scale-102 cursor-pointer"
        title="Open On-Site Service Booking Form"
      >
        <CalendarCheck className="w-4 h-4" />
        <span>Book Doorstep Service</span>
      </button>

      <button
        onClick={handleWhatsAppClick}
        className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all border border-slate-700 cursor-pointer shadow-xs"
        title="Book Quick via WhatsApp Chat"
      >
        <MessageCircle className="w-4 h-4 text-green-400 fill-current" />
        <span>WhatsApp Booking</span>
      </button>

      {/* Embedded Booking Modal */}
      <ServiceBookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        service={matchedService}
        onBookingSuccess={(booking) => {
          // Trigger a window alert or similar since this is a static page
          alert(`✅ Booking requested! Your booking ID is ${booking.id}. A technician has been assigned.`);
          setIsOpen(false);
        }}
      />
    </div>
  );
}
