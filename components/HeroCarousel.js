import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Wifi, ArrowRight, CheckCircle2, Wind, Wrench, ShieldCheck } from "lucide-react";
import { getHeroCarouselSlides, refreshHeroCarouselSlides, subscribeHeroCarouselSlides } from "@/lib/heroCarouselStore";

export const HeroCarousel = ({ onExploreServices, onFiberSelect, onBookService }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [adminSlides, setAdminSlides] = useState(() => getHeroCarouselSlides());

  const defaultSlides = [
    {
      id: 1,
      bgClass: "bg-gradient-to-r from-[#0f4c81] via-[#1b6ca8] to-[#2889cb]",
      subtitle: "AIR CONDITIONER & COOLING",
      title: "Professional AC Installation & Outdoor Unit Mounting",
      description: "Complete split AC copper pipe fitting, outdoor bracket mounting, inverter AC wiring, and routine cooling maintenance by Phidim technicians.",
      buttonText: "BOOK AC SERVICE",
      action: () =>
        onBookService
          ? onBookService({
              id: "srv-ac-service",
              name: "Professional AC Installation & Mounting",
              category: "AC & Refrigeration",
              basePrice: 2500,
              duration: "2-3 hours",
              warranty: "1 Year Support",
            })
          : onFiberSelect(),
      type: "ac_install_graphic"
    },
    {
      id: 2,
      bgClass: "bg-gradient-to-r from-[#1a3854] via-[#26537b] to-[#326e9f]",
      subtitle: "AC GAS REFILL & LEAK FIX",
      title: "Expert AC Gas Charging & Chemical Wash Service",
      description: "On-site gas pressure testing, R32/R410a gas refill, copper tube leak soldering, and deep indoor coil chemical wash across Panchthar.",
      buttonText: "BOOK GAS REFILL",
      action: () =>
        onBookService
          ? onBookService({
              id: "srv-ac-gas",
              name: "Expert AC Gas Charging & Deep Cleaning",
              category: "AC & Refrigeration",
              basePrice: 2200,
              duration: "1.5 hours",
              warranty: "90 Days Warranty",
            })
          : onFiberSelect(),
      type: "ac_gas_graphic"
    },
    {
      id: 3,
      bgClass: "bg-gradient-to-r from-[#1b3044] via-[#234563] to-[#2e5d85]",
      subtitle: "REFRIGERATOR & FREEZER CARE",
      title: "Doorstep Refrigerator Gas Charging & Repair",
      description: "Same-day technician visits for single & double door fridges, deep freezers, compressor replacement, thermostat fixes, and gas charging in Phidim.",
      buttonText: "BOOK FRIDGE REPAIR",
      action: () =>
        onBookService
          ? onBookService({
              id: "srv-fridge-repair",
              name: "Doorstep Refrigerator Gas Charging & Repair",
              category: "AC & Refrigeration",
              basePrice: 1800,
              duration: "1-2 hours",
              warranty: "6 Months Support",
            })
          : onExploreServices
          ? onExploreServices()
          : onFiberSelect(),
      type: "fridge_graphic"
    },
    {
      id: 4,
      bgClass: "bg-gradient-to-r from-[#173a5e] via-[#1e4e7c] to-[#28669e]",
      subtitle: "CEILING FAN & APPLIANCE REPAIR",
      title: "Ceiling Fan Winding & Appliance Maintenance",
      description: "Doorstep ceiling fan repair, capacitor replacement, motor winding, inverter servicing, and home electrical fittings across Phidim Wards 1 to 4.",
      buttonText: "BOOK APPLIANCE REPAIR",
      action: () =>
        onBookService
          ? onBookService({
              id: "srv-fan-repair",
              name: "Ceiling Fan Winding & Appliance Maintenance",
              category: "Electrical & Inverter",
              basePrice: 600,
              duration: "1 hour",
              warranty: "30 Days Guarantee",
            })
          : onExploreServices
          ? onExploreServices()
          : onFiberSelect(),
      type: "fan_graphic"
    },
    {
      id: 5,
      bgClass: "bg-gradient-to-r from-[#0d3b66] via-[#16528e] to-[#1f69b5]",
      subtitle: "DISHHOME DTH & FIBER DP BOX",
      title: "DishHome DTH & Optical Fiber DP Box Connection",
      description: "Authorized DishHome optical fiber DP box splicing, drop wire routing, ONU dual-band WiFi router setup, and HD setup box installation.",
      buttonText: "VIEW DTH PACKAGES",
      action: onFiberSelect,
      type: "dp_graphic"
    }
  ];

  // Admin slides lead the rotation so a newly published campaign is visible
  // immediately, while the built-in service slides remain a useful fallback.
  const slides = [...adminSlides.map((slide) => ({
    ...slide,
    type: "admin_image",
    bgClass: "bg-slate-950",
    action: onExploreServices || onFiberSelect,
  })), ...defaultSlides];

  useEffect(() => subscribeHeroCarouselSlides((nextSlides) => {
    setAdminSlides(nextSlides);
    setCurrentSlide(0);
  }), []);

  useEffect(() => {
    refreshHeroCarouselSlides();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section className="relative overflow-hidden w-full min-h-[420px] sm:min-h-[460px] md:min-h-[500px] lg:min-h-[540px] flex items-center shadow-2xl border-b border-slate-800/40">
      {/* Dynamic Slide Background */}
      <div className={`absolute inset-0 transition-all duration-700 ${active.bgClass}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Main Slide Container */}
      <div className="relative max-w-7xl mx-auto px-5 md:px-10 w-full py-8 sm:py-10 md:py-14 z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="md:col-span-7 text-white space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-left duration-500">
            <span className="inline-block text-xs md:text-sm font-extrabold tracking-widest text-blue-200 uppercase bg-white/10 px-3 py-1 rounded-xs border border-white/20">
              {active.subtitle}
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-md">
              {active.title}
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-blue-100/95 leading-relaxed max-w-xl font-normal">
              {active.description}
            </p>

            <div className="pt-2">
              <button
                onClick={active.action}
                className="inline-flex items-center gap-2 border border-white/90 hover:border-white text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 uppercase tracking-wider rounded-xs hover:bg-white hover:text-blue-900 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:scale-105"
              >
                <span>{active.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Service Graphic Column */}
          <div className="md:col-span-5 flex items-center justify-center relative">

            {active.type === "admin_image" && (
              <div className="relative h-[260px] sm:h-[300px] md:h-[340px] w-full max-w-md lg:max-w-lg overflow-hidden rounded-2xl border border-white/30 bg-slate-900/40 shadow-2xl">
                <img src={active.image} alt={active.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-white/10" />
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/60 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                  <CheckCircle2 size={14} className="text-emerald-300" /> Featured
                </div>
              </div>
            )}

            {/* 1. AC Installation Graphic (Ac1.jpg + Ac2.jpg) */}
            {active.type === "ac_install_graphic" && (
              <div className="relative w-full max-w-md lg:max-w-lg bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/30 text-white shadow-2xl space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="w-5 h-5 text-cyan-300 animate-pulse" />
                    <span className="font-extrabold text-sm sm:text-base text-white">Split AC Mounting</span>
                  </div>
                  <span className="bg-cyan-400 text-slate-950 text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    FIELD WORK
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-md h-44 sm:h-52 md:h-56 group">
                    <img
                      src="/Ac1.jpg"
                      alt="AC Servicing Phidim 1"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-xs font-bold text-cyan-200 bg-slate-950/70 backdrop-blur-xs px-2 py-0.5 rounded-md">
                        Indoor Service
                      </span>
                    </div>
                  </div>

                  <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-md h-44 sm:h-52 md:h-56 group">
                    <img
                      src="/Ac2.jpg"
                      alt="AC Servicing Phidim 2"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-xs font-bold text-cyan-200 bg-slate-950/70 backdrop-blur-xs px-2 py-0.5 rounded-md">
                        Outdoor Mount
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. AC Gas Release Graphic (Acgasrelease4.jpg + Ac3.jpg) */}
            {active.type === "ac_gas_graphic" && (
              <div className="relative w-full max-w-md lg:max-w-lg bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/30 text-white shadow-2xl space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="w-5 h-5 text-cyan-300 animate-pulse" />
                    <span className="font-extrabold text-sm sm:text-base text-white">AC Gas Charging</span>
                  </div>
                  <span className="bg-emerald-400 text-slate-950 text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    PRESSURE TEST
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-md h-44 sm:h-52 md:h-56 group">
                    <img
                      src="/Acgasrelease4.jpg"
                      alt="AC Gas Release Service"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-xs font-bold text-cyan-200 bg-slate-950/70 backdrop-blur-xs px-2 py-0.5 rounded-md">
                        Gas Refill
                      </span>
                    </div>
                  </div>

                  <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-md h-44 sm:h-52 md:h-56 group">
                    <img
                      src="/Ac3.jpg"
                      alt="AC Technician Servicing"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-xs font-bold text-cyan-200 bg-slate-950/70 backdrop-blur-xs px-2 py-0.5 rounded-md">
                        Coil & Valve
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Refrigerator Gas Charging (frggaschr.jpg) */}
            {active.type === "fridge_graphic" && (
              <div className="relative w-full max-w-md lg:max-w-lg bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/30 text-white shadow-2xl space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-cyan-300 animate-pulse" />
                    <span className="font-extrabold text-sm sm:text-base text-white">Refrigerator Gas Charging</span>
                  </div>
                  <span className="bg-cyan-400 text-slate-950 text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    DOORSTEP
                  </span>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-md h-52 sm:h-60 md:h-64 group bg-slate-900/40">
                  <img
                    src="/frggaschr.jpg"
                    alt="Refrigerator Gas Charging Phidim"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs sm:text-sm font-bold text-cyan-200 bg-slate-950/75 backdrop-blur-xs px-3 py-1 rounded-lg border border-white/10">
                      Compressor & Gas Charging
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Ceiling Fan & Electrical (Ceilingfan1.jpg) */}
            {active.type === "fan_graphic" && (
              <div className="relative w-full max-w-md lg:max-w-lg bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/30 text-white shadow-2xl space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-green-400 animate-pulse" />
                    <span className="font-extrabold text-sm sm:text-base text-white">Ceiling Fan & Electrical</span>
                  </div>
                  <span className="bg-green-400 text-slate-950 text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    ON-SITE
                  </span>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-md h-52 sm:h-60 md:h-64 group bg-slate-900/40">
                  <img
                    src="/Ceilingfan1.jpg"
                    alt="Ceiling Fan Repair Phidim"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs sm:text-sm font-bold text-green-200 bg-slate-950/75 backdrop-blur-xs px-3 py-1 rounded-lg border border-white/10">
                      Motor Winding, Capacitor & Wiring
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 5. DishHome DP Box & Fiber Networking (image.png) */}
            {active.type === "dp_graphic" && (
              <div className="relative w-full max-w-md lg:max-w-lg bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/30 text-white shadow-2xl space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-cyan-300 animate-pulse" />
                    <span className="font-extrabold text-sm sm:text-base text-white">DishHome DP Box & Fiber</span>
                  </div>
                  <span className="bg-cyan-400 text-slate-950 text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    DTH & FIBER
                  </span>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-md h-52 sm:h-60 md:h-64 group bg-slate-900/60">
                  <img
                    src="/image.png"
                    alt="DishHome DTH Official Connection Phidim"
                    className="w-full h-full object-contain sm:object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs sm:text-sm font-bold text-cyan-200 bg-slate-950/75 backdrop-blur-xs px-3 py-1 rounded-lg border border-white/10">
                      DTH Connection & Fiber Setup
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-all z-20 cursor-pointer backdrop-blur-sm border border-white/20 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-all z-20 cursor-pointer backdrop-blur-sm border border-white/20 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              currentSlide === idx ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
