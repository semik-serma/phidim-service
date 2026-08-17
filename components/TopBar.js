import { useState, useEffect } from "react";
import { Sparkles, ExternalLink } from "lucide-react";
import { getFormattedNepaliTime, getFormattedBikramSambatDate } from "../utils/nepaliDate";

export const TopBar = () => {
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [adIndex, setAdIndex] = useState(0);

  const adTexts = [
    "⚡ 24/7 Fast On-Demand Technician Dispatch in Phidim & Panchthar",
    "🔧 Certified AC, Electrical, CCTV, Fiber & Plumbing Services",
    "📞 Live Video Diagnosis & Direct Technician Consultations"
  ];

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTimeStr(getFormattedNepaliTime(now));
      setDateStr(getFormattedBikramSambatDate());
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1e3);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const adTimer = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % adTexts.length);
    }, 10000);
    return () => clearInterval(adTimer);
  }, [adTexts.length]);

  return (
    <div className="font-navbar bg-[#8cc63f] text-gray-900 px-3 sm:px-5 lg:px-8 py-1.5 text-xs font-bold border-b border-[#7db333]" data-navbar="true">
      <div className="max-w-[1700px] mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left Area: Location & PhidimBazar.com Ad Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:block text-left font-black text-white text-xs uppercase tracking-wider">
            Phidim, Panchthar • Nepal
          </div>

          {/* PhidimBazar.com Mini Ad Badge */}
          <a
            href="https://phidimbazar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-slate-950 font-black px-3.5 py-1 rounded-full text-xs shadow-md border border-cyan-200/80 hover:scale-105 transition-all cursor-pointer tracking-tight"
            title="Visit PhidimBazar.com - Phidim's Local Online Marketplace"
          >
            <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0 animate-bounce" />
            <span className="uppercase text-[9px] bg-slate-950 text-cyan-300 px-1.5 py-0.5 rounded-xs font-black tracking-widest shrink-0">AD</span>
            <div className="w-[220px] sm:w-[280px] md:w-[330px] overflow-hidden text-ellipsis whitespace-nowrap text-center text-slate-950 font-extrabold">
              <span key={adIndex} className="font-extrabold text-slate-950 animate-slide-right inline-block whitespace-nowrap">
                {adTexts[adIndex]}
              </span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-950 shrink-0" />
          </a>
        </div>

        {/* Center Welcome Message */}
        <div className="w-full md:w-auto text-center flex items-center justify-center font-black text-xs sm:text-sm md:text-base tracking-wide text-white drop-shadow-xs order-first md:order-none py-0.5">
          Welcome to Phidim Service
        </div>

        {/* Right Area: Nepali Time & BS Date + Flag */}
        <div className="flex items-center justify-center md:justify-end gap-3 text-gray-900 font-bold mt-1 md:mt-0">
          <div className="flex items-center gap-2 bg-white/35 backdrop-blur-xs px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
            <span className="text-gray-950 font-black">नेपाली समय</span>
            <span className="font-extrabold text-black">{timeStr || "०७ : २२ : १८ बिहान"}</span>
            <span className="mx-1 text-gray-800">|</span>
            <span className="font-extrabold text-black">{dateStr || "वि सं २०८३ श्रावण १७ आइतबार"}</span>
          </div>

          {/* Nepal Flag Emblem */}
          <div className="flex items-center justify-center bg-white/20 p-1 rounded-sm shrink-0" title="Nepal">
            <svg className="w-6 h-6 shadow-xs" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 10 L85 55 L35 55 L90 105 L5 105 Z" fill="#DC2626" stroke="#1D4ED8" strokeWidth="8" />
              <path d="M22 32 A 10 10 0 0 0 38 32 A 8 8 0 0 1 22 32 Z" fill="white" />
              <circle cx="30" cy="80" r="10" fill="white" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
};
