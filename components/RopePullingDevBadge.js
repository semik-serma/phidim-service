"use client";

import { useState } from "react";
import { ExternalLink, Sparkles } from "lucide-react";

export const RopePullingDevBadge = ({ className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`inline-flex items-center group relative select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Interactive Tooltip on hover */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-lg border border-slate-700 flex items-center gap-1">
        <Sparkles className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
        <span>Crafted by Semik Serma • View Portfolio</span>
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
      </div>

      {/* The Animated Pulling Man */}
      <div className="relative flex items-center shrink-0">
        <svg
          viewBox="0 0 54 38"
          className={`w-9 h-7 sm:w-11 sm:h-8 overflow-visible transition-transform duration-300 ${
            isHovered ? "scale-110" : ""
          }`}
        >
          {/* Ground shadow */}
          <ellipse cx="26" cy="35" rx="15" ry="2.5" fill="rgba(0,0,0,0.12)" />

          {/* Effort sweat drops */}
          <g className={`transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-80"}`}>
            <path
              d="M12 11 Q10 9 10 7 Q11 6 12 7 Q13 9 12 11 Z"
              fill="#0ea5e9"
              className="animate-sweat-drop"
            />
            <path
              d="M9 16 Q7 14 7 12 Q8 11 9 12 Q10 14 9 16 Z"
              fill="#38bdf8"
              className="animate-sweat-drop-delayed"
            />
          </g>

          {/* Pulling Character Group */}
          <g className={`origin-bottom ${isHovered ? "animate-man-pull-fast" : "animate-man-pull"}`}>
            {/* Back Leg - Bracing against the pull */}
            <path
              d="M22 23 L13 33 L8 33"
              stroke="#0f172a"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Front Leg - Bent forward for leverage */}
            <path
              d="M26 23 L30 28 L35 34"
              stroke="#1e293b"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Torso leaning back with effort */}
            <path
              d="M24 14 L20 23"
              stroke="#0284c7"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Developer Head with Cap */}
            <circle cx="21" cy="9.5" r="5" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.8" />
            
            {/* Blue Developer Cap (backward visor) */}
            <path d="M16 8.5 L26 7 L23 4.5 Z" fill="#0284c7" />
            <path d="M15 8.5 L11 9.5" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round" />

            {/* Eye (focused/determined) */}
            <circle cx="23.5" cy="9.5" r="0.8" fill="#0f172a" />
            {/* Determined Eyebrow */}
            <path d="M22 8 L24.5 9" stroke="#0f172a" strokeWidth="0.8" strokeLinecap="round" />

            {/* Back Arm gripping rope */}
            <path
              d="M22 15 L28 16 L38 16"
              stroke="#0284c7"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Hands with gloves holding the rope */}
            <circle cx="38" cy="16" r="2.2" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
            <circle cx="41" cy="16.5" r="2" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />

            {/* Front Arm pulling hard */}
            <path
              d="M21 16 L29 18 L41 16.5"
              stroke="#0369a1"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        </svg>
      </div>

      {/* The Animated Rope */}
      <div className="relative flex items-center -mx-1 sm:-mx-0.5 shrink-0">
        <svg
          className="w-5 sm:w-8 md:w-10 h-4 overflow-visible"
          viewBox="0 0 40 12"
          fill="none"
        >
          <defs>
            <linearGradient id="ropeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>

          {/* Rope line with animated dash & tension vibration */}
          <path
            d="M0 6 Q20 6.5 38 6"
            stroke="url(#ropeGradient)"
            strokeWidth="2.5"
            strokeDasharray="4 2"
            strokeLinecap="round"
            className={isHovered ? "animate-rope-fast" : "animate-rope"}
          />

          {/* Rope Knot tied securely to the badge */}
          <circle cx="38" cy="6" r="2.5" fill="#b45309" stroke="#78350f" strokeWidth="1" />
          <path d="M38 4 L38 8" stroke="#fef3c7" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>

      {/* The "Developed by Semik Serma" Badge Being Pulled */}
      <a
        href="https://portfolio.phidimservice.com.np"
        target="_blank"
        rel="noopener noreferrer"
        className={`relative inline-flex items-center gap-1.5 bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-black px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs shadow-md border border-cyan-200/90 transition-all hover:scale-105 cursor-pointer select-none shrink-0 ${
          isHovered ? "animate-badge-pulled-fast shadow-cyan-300/50 shadow-lg ring-2 ring-cyan-400/40" : "animate-badge-pulled shadow-xs"
        }`}
        title="Developed by Semik Serma • Visit Portfolio"
      >
        {/* Pulsing indicator dot */}
        <span className="flex h-2 w-2 relative shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-60"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
        </span>

        {/* Text */}
        <span className="font-extrabold tracking-tight whitespace-nowrap text-slate-950">
          <span className="hidden 2xl:inline">
            Developed by <span className="underline decoration-slate-950/40 underline-offset-2 font-black">Semik Serma</span>
          </span>
          <span className="hidden sm:inline 2xl:hidden">
            By <span className="font-black">Semik Serma</span>
          </span>
          <span className="sm:hidden font-black">Semik</span>
        </span>

        <ExternalLink className="w-3 h-3 text-slate-950 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </div>
  );
};
