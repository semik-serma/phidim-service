import {
  Zap,
  Camera,
  Monitor,
  Wifi,
  Wrench,
  ShieldCheck,
  MapPin,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  Cable,
  Award,
  Globe,
  ExternalLink
} from "lucide-react";
export const HomePageOverview = ({ onNavigateTab, onOpenWhatsApp }) => {
  return <div className="space-y-12 pb-12">
      
      {
    /* 1. HERO WELCOME SECTION ("Little information from Home") */
  }
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl border border-slate-800 relative overflow-hidden w-full">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 border border-green-500/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span>Phidim Service • Official Doorstep Technical Portal</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight w-full">
              Professional On-Site Technical Services in Panchthar
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
              Welcome to <strong className="text-green-400">Phidim Service</strong> — your one-stop solution for Electrical Wiring, CCTV Camera Installation, DishHome DTH, Computer Repair, and Plumbing across Phidim Municipality and Panchthar district.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
    onClick={() => onNavigateTab("ALL SERVICES")}
    className="bg-green-600 hover:bg-green-700 text-white font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg cursor-pointer"
  >
                <span>Browse All Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
    onClick={() => onOpenWhatsApp("Hello Phidim Service! I need doorstep technician assistance.")}
    className="bg-white/10 hover:bg-white/20 text-white font-extrabold px-5 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-colors border border-white/20 cursor-pointer"
  >
                <MessageCircle className="w-4 h-4 text-green-400 fill-current" />
                <span>WhatsApp +977 986-2772457</span>
              </button>
            </div>
          </div>

          {
    /* Quick Feature Badges Column */
  }
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3.5 backdrop-blur-xs">
            <h3 className="text-xs font-black text-white uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-green-400" />
              <span>Why Phidim Service?</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span><strong>30-Minute Emergency Response</strong> in Phidim Ward 1, 2, 3 & 4.</span>
              </div>
              <div className="flex items-start gap-2.5 text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span><strong>Certified Field Engineers</strong> for Fiber Net, CCTV & Electrical.</span>
              </div>
              <div className="flex items-start gap-2.5 text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span><strong>Transparent Local Pricing</strong> with genuine replacement parts.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {
    /* 2. ALL SERVICES PREVIEW ("Little information from All Services") */
  }
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-green-600 font-extrabold text-xs uppercase tracking-widest mb-1">
              <Wrench className="w-4 h-4" />
              <span>On-Demand Technical Solutions</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              🛠️ Our Services | हाम्रो सेवाहरू
            </h2>
          </div>

          <button
    onClick={() => onNavigateTab("ALL SERVICES")}
    className="text-xs font-black text-green-700 hover:text-green-800 flex items-center gap-1 bg-green-50 px-4 py-2 rounded-xl border border-green-200 self-start sm:self-auto cursor-pointer hover:bg-green-100 transition-colors"
  >
            <span>View All 8 Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {
    /* Electrical */
  }
          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 space-y-2 hover:border-amber-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-gray-900">⚡ Electrical Services</h3>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              House wiring, inverter repair, breaker troubleshooting & new electrical fittings in Phidim.
            </p>
          </div>

          {
    /* CCTV */
  }
          <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 space-y-2 hover:border-blue-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-gray-900">📹 CCTV & Security</h3>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Dahua & Uniarch HD camera setup, NVR configuration & online mobile viewing setup.
            </p>
          </div>

          {
    /* Computers */
  }
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 hover:border-slate-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black">
              <Monitor className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-gray-900">💻 Computer & Laptop</h3>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Hardware repairs, OS formatting, virus removal & custom desktop PC assembly.
            </p>
          </div>

          {
    /* DishHome & Networking */
  }
          <div className="bg-cyan-50/60 border border-cyan-200 rounded-2xl p-4 space-y-2 hover:border-cyan-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-black">
              <Wifi className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-gray-900">📡 DishHome DTH</h3>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              High-speed broadband internet fiber drop wire fitting & WiFi router maintenance.
            </p>
          </div>
        </div>
      </section>

      {
    /* 3. LAN NETWORKING PREVIEW ("Little information about LAN Networking") */
  }
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-cyan-400 font-extrabold text-xs uppercase tracking-widest mb-1">
              <Cable className="w-4 h-4" />
              <span>High-Speed Infrastructure</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              🌐 LAN Networking & Optical Fiber Splicing
            </h2>
          </div>

          <button
    onClick={() => onNavigateTab("LAN NETWORKING")}
    className="text-xs font-black text-cyan-900 bg-cyan-400 hover:bg-cyan-300 px-4 py-2 rounded-xl self-start sm:self-auto cursor-pointer transition-colors"
  >
            Explore LAN Networking
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
            <h3 className="text-sm font-extrabold text-cyan-300">🏢 Office & Hotel Structured Cabling</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Cat6 structured copper network cabling, patch panel punch-down, and Gigabit network switches for hotels, shops, and offices in Phidim.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
            <h3 className="text-sm font-extrabold text-cyan-300">⚡ Fiber Splicing & OTDR Test</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Precision fusion fiber splicing, loss testing, joint closure installation, and drop wire repairs for ISPs & business networks.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
            <h3 className="text-sm font-extrabold text-cyan-300">📡 DishHome DTH Packages</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Get 100 Mbps, 200 Mbps & 300 Mbps DishHome DTH connected at your doorstep with free Dual-Band WiFi router installation.
            </p>
          </div>
        </div>
      </section>

      {
    /* 4. GUARANTEES & SERVICE EXCELLENCE METRICS */
  }
      <section className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800 shadow-md space-y-6">
        <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-400 font-extrabold text-xs uppercase tracking-widest mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Doorstep Service Commitment</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              🛡️ Phidim Service Standard Guarantees
            </h2>
          </div>
          <span className="text-xs font-bold bg-white/10 border border-white/20 text-emerald-300 px-3 py-1 rounded-full self-start sm:self-auto">
            Phidim & Panchthar Region
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
              ⚡
            </div>
            <h3 className="font-extrabold text-white text-sm">30-Min On-Site Dispatch</h3>
            <p className="text-gray-300 leading-relaxed">Fast emergency response across Wards 1, 2, 3 & 4 in Phidim Municipality.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
              💯
            </div>
            <h3 className="font-extrabold text-white text-sm">Genuine Spare Parts</h3>
            <p className="text-gray-300 leading-relaxed">Original Dahua, Uniarch, Cat6 cables, and certified electrical breakers used.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
              👨‍🔧
            </div>
            <h3 className="font-extrabold text-white text-sm">Certified Local Engineers</h3>
            <p className="text-gray-300 leading-relaxed">Trained professionals with field experience in networking, CCTV, and wiring.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
              🤝
            </div>
            <h3 className="font-extrabold text-white text-sm">Transparent Pricing</h3>
            <p className="text-gray-300 leading-relaxed">No hidden fees or unexpected surcharges. Clear upfront labor and part quotes.</p>
          </div>
        </div>
      </section>

      {
    /* 5. ABOUT US PREVIEW ("Little information about Us") */
  }
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-green-600 font-extrabold text-xs uppercase tracking-widest">
              <Users className="w-4 h-4" />
              <span>Local Trust & Innovation</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              👨‍💻 About Phidim Service
            </h2>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
              Founded by local developer and tech enthusiast <strong className="text-gray-900 font-extrabold">Semik Serma</strong>, <strong>Phidim Service</strong> is built to empower homes and businesses in Panchthar with reliable, on-demand technical engineering and repair services.
            </p>

            <div className="pt-1 flex items-center gap-3">
              <button
    onClick={() => onNavigateTab("ABOUT")}
    className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
  >
                <span>Read Full About Us</span>
                <ArrowRight className="w-3.5 h-3.5 text-green-400" />
              </button>
            </div>
          </div>

          {
    /* Developer Card Snapshot */
  }
          <div className="md:col-span-5 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-green-600 to-emerald-400 text-white flex items-center justify-center font-black text-2xl mx-auto shadow-md">
              SS
            </div>
            <div>
              <h3 className="text-base font-black text-gray-900">Semik Serma</h3>
              <p className="text-xs text-green-800 font-bold">Founder & Lead Software Engineer</p>
            </div>
            <p className="text-[11px] text-gray-600 italic">
              &quot;Delivering certified technical excellence and digital convenience to Panchthar.&quot;
            </p>
            <a
              href="https://portfolio.phidimservice.com.np"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 font-extrabold px-3 py-1.5 rounded-xl text-xs transition-all border border-slate-700 shadow-xs cursor-pointer"
              title="Visit Semik Serma's Portfolio Website"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>portfolio.phidimservice.com.np</span>
              <ExternalLink className="w-3 h-3 text-cyan-400" />
            </a>
          </div>

        </div>
      </section>

      {
    /* 5. CONTACT US PREVIEW ("Little information about Contact Us") */
  }
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-green-400 font-extrabold text-xs uppercase tracking-widest mb-1">
              <MapPin className="w-4 h-4" />
              <span>Phidim Municipality Coverage</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              📞 Contact Us & Support
            </h2>
          </div>

          <button
    onClick={() => onNavigateTab("CONTACT US")}
    className="text-xs font-black text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl self-start sm:self-auto cursor-pointer transition-colors"
  >
            Go to Contact Page
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1.5">
            <span className="text-green-400 font-black flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-red-400" />
              Location Address
            </span>
            <p className="text-gray-300 font-medium">Phidim Ward No. 1 (Main Bazar), Panchthar District, Koshi Province, Nepal</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1.5">
            <span className="text-green-400 font-black flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-green-400 fill-current" />
              WhatsApp Direct
            </span>
            <p className="text-gray-300 font-medium">+977 986-2772457 (Instant On-Site Booking)</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1.5">
            <span className="text-green-400 font-black flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-400" />
              Service Hours
            </span>
            <p className="text-gray-300 font-medium">Sunday - Friday: 8:00 AM - 7:00 PM (On-Call Technicians Available)</p>
          </div>
        </div>
      </section>

    </div>;
};
