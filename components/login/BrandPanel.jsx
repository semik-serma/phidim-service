'use client';

import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Shield,
  Camera,
  MapPin,
  Zap,
  Clock,
  User,
  Wrench,
  ChevronRight,
} from 'lucide-react';

const WRAP = 'login-brand';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Verified Field Experts',
    desc: 'Background-checked technicians across Panchthar.',
    tint: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
  },
  {
    icon: Camera,
    title: 'CCTV & Fiber Installations',
    desc: 'Full wiring, configuration & on-site commissioning.',
    tint: 'text-teal-300',
    bg: 'bg-teal-400/10',
    border: 'border-teal-400/20',
  },
  {
    icon: Clock,
    title: 'Same-Day Dispatch',
    desc: 'Fast response for urgent home & business calls.',
    tint: 'text-amber-300',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
  },
  {
    icon: MapPin,
    title: 'Local Trust Since Day One',
    desc: 'Proudly serving Phidim, Ward 1 to Ward 5.',
    tint: 'text-sky-300',
    bg: 'bg-sky-400/10',
    border: 'border-sky-400/20',
  },
];

const QUICK_ROLES = [
  {
    key: 'USER',
    label: 'Customer Account',
    icon: User,
    tint: 'text-emerald-400',
    ring: 'hover:border-emerald-400/60 hover:bg-emerald-400/10',
  },
  {
    key: 'TECHNICIAN',
    label: 'Technician Portal',
    icon: Wrench,
    tint: 'text-teal-400',
    ring: 'hover:border-teal-400/60 hover:bg-teal-400/10',
  },
];

export function BrandPanel({ isLoading, onDemoLogin }) {
  return (
    <aside
      id={WRAP}
      className="hidden lg:flex lg:w-[52%] min-h-screen relative flex-col justify-between overflow-hidden bg-[#03140e] p-8 xl:p-12 text-white select-none"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_10%,rgba(22,163,74,0.22),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_90%_85%,rgba(20,184,166,0.12),transparent_70%)]" />
        <div className="absolute -top-32 -left-24 w-[26rem] h-[26rem] rounded-full bg-[#16A34A]/25 blur-[140px] animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#0D9488]/20 blur-[120px] animate-float-slow" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(#22C55E 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
        />
        <div className="absolute top-1/4 right-10 w-44 h-44 border border-[#16A34A]/25 rounded-full animate-[spin_24s_linear_infinite]" />
        <div className="absolute top-[26%] right-[4.5rem] w-36 h-36 border border-dashed border-[#22C55E]/30 rounded-full animate-[spin_18s_linear_infinite_reverse]" />
        <div className="absolute -bottom-24 -left-16 w-80 h-80 border border-white/5 rounded-full" />
      </div>

      {/* Brand header */}
      <header className="relative z-10 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#16A34A] shadow-lg p-0.5 bg-slate-900 group-hover:scale-105 transition-transform duration-300">
            <img
              src="/logo.png"
              alt="Phidim Service Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div>
            <h2 className="text-base font-black text-white tracking-tight leading-none group-hover:text-[#22C55E] transition-colors">
              PHIDIM SERVICE
            </h2>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-1">
              Panchthar • Koshi • Nepal
            </p>
          </div>
        </Link>
      </header>

      {/* Center content */}
      <div className="relative z-10 space-y-8">
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-500" style={{ animationDelay: '100ms' }}>
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300"><Sparkles className="h-3.5 w-3.5" /> Trusted local service platform</p>
          <h2 className="text-4xl xl:text-[2.85rem] font-extrabold text-white tracking-tight leading-[1.12]">
            Reliable technical &amp; digital solutions at your{' '}
            <span className="bg-gradient-to-r from-[#22C55E] to-[#2DD4BF] bg-clip-text text-transparent">
              doorstep
            </span>
            .
          </h2>
          <p className="text-slate-400 text-[15px] leading-relaxed max-w-xl">
            Sign in to manage requests, connect with verified technicians, track CCTV &amp;
            fiber installations, and control your field operations — all from one dashboard.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-2 gap-3 max-w-xl animate-in fade-in slide-in-from-bottom-2 duration-500">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={`flex items-start gap-3 rounded-2xl border ${f.border} ${f.bg} backdrop-blur-sm px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30`}
            >
              <span
                className={`w-8 h-8 rounded-xl ${f.bg} border ${f.border} flex items-center justify-center shrink-0`}
              >
                <f.icon className={`w-4.5 h-4.5 ${f.tint}`} />
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-bold text-white leading-tight">{f.title}</p>
                <p className="text-[11px] text-slate-400 leading-snug mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>


      </div>

      {/* Footer */}
      <footer className="relative z-10 flex items-center justify-between text-[11px] text-slate-500">
        <p>
          &copy; {new Date().getFullYear()} Phidim Service. All rights reserved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-slate-400 hover:text-[#22C55E] font-semibold transition-colors"
        >
          Back to home
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </footer>
    </aside>
  );
}
