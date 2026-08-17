import { useState } from "react";
import {
  Wrench,
  ShieldCheck,
  Zap,
  Camera,
  Monitor,
  Wifi,
  Tv,
  Wind,
  Droplet,
  CheckCircle2,
  Phone,
  ExternalLink,
  Globe,
  Code2,
  Sparkles,
  Heart,
  Check,
  PhoneCall,
  ChevronRight,
  Home
} from "lucide-react";
export const AboutPage = ({
  onNavigateHome,
  onNavigateServices,
  onNavigateContact
}) => {
  const [activeTab, setActiveTab] = useState("ALL");
  const electricalServices = [
    "House Wiring (\u0928\u092F\u093E\u0901 \u0918\u0930\u0915\u094B Wiring)",
    "Electrical Trouble Shooting (\u092C\u093F\u0926\u094D\u092F\u0941\u0924 \u0938\u092E\u0938\u094D\u092F\u093E \u092A\u0924\u094D\u0924\u093E \u0932\u0917\u093E\u0909\u0928\u0947)",
    "Electrical Maintenance (\u092E\u0930\u094D\u092E\u0924 \u0924\u0925\u093E Maintenance)",
    "LED Light Installation & Repair",
    "Ceiling Fan Installation & Repair",
    "Wall Fan Installation & Repair",
    "Switch Board & Socket Installation",
    "Inverter Installation & Repair",
    "General Electrical Repair"
  ];
  const cctvServices = [
    "CCTV Camera Installation",
    "CCTV Repair & Maintenance",
    "Remote Mobile Viewing Setup",
    "DVR/NVR Configuration",
    "Office & Home Security Solutions"
  ];
  const computerServices = [
    "Computer Installation",
    "Computer Repair",
    "Maintenance & Upgrades",
    "Printer Setup",
    "Local Area Networking (LAN)",
    "Wi-Fi Setup",
    "Router Configuration",
    "Software Installation",
    "Virus Removal & Security"
  ];
  const internetTvServices = [
    "DishHome Installation",
    "DishHome Maintenance",
    "Local Network Setup",
    "Internet Networking",
    "Router & Switch Configuration"
  ];
  const acServices = [
    "AC Installation",
    "AC Repair",
    "AC Cleaning",
    "AC Maintenance",
    "Cooling Performance Check"
  ];
  const tvServices = [
    "LED TV Installation",
    "LED TV Repair",
    "TV Wall Mount Installation",
    "TV Maintenance"
  ];
  const plumbingServices = [
    "Plumbing Installation",
    "Pipe Leakage Repair",
    "Water Line Repair",
    "Bathroom Fitting",
    "Plumbing Maintenance",
    "Plumbing Trouble Shooting"
  ];
  const technicalEquipmentList = [
    "⚡ Digital Insulation & Earth Testers",
    "📹 IP & HD CCTV Cable Analyzers",
    "💻 Hardware Diagnostic & OS Workbenches",
    "📡 Fusion Splicers & Optical Power Meters",
    "❄️ High-Pressure Jet Wash Pumps",
    "🔌 Certified R32 / R410A Refrigerant Gauges",
    "⚙️ Multi-Meter Circuit Probes",
    "🚰 Hydrostatic Pipe Pressure Testers",
    "🛡️ Genuine Certified Replacement Parts",
    "🌐 Managed Switch & Router Terminals",
    "🔩 Heavy Duty Copper Flaring Tools",
    "🏠 On-Site Technician Emergency Kits"
  ];
  const whyChooseUsList = [
    { title: "Experienced Technicians", desc: "Skilled certified field experts for all home & IT jobs." },
    { title: "Affordable Price", desc: "Transparent & budget-friendly local pricing in Panchthar." },
    { title: "Fast Response", desc: "Quick on-site service dispatch across Phidim Municipality." },
    { title: "Genuine Replacement Parts", desc: "100% original electrical, refrigeration & CCTV parts with warranty." },
    { title: "Professional Service", desc: "Reliable, clean, and polite service guaranteed every time." },
    { title: "Home Service Available", desc: "Doorstep technical assistance for home, shop, or office." },
    { title: "Customer Satisfaction First", desc: "Your peace of mind and satisfaction is our top priority." }
  ];
  const devSkills = [
    "JavaScript",
    "Node.js",
    "Next.js",
    "Django",
    "Python",
    "HTML5",
    "CSS3",
    "C Programming"
  ];
  return <div className="bg-gray-50 min-h-screen pb-16">
      
      {
    /* Top Breadcrumbs Strip */
  }
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-2 text-xs text-gray-600 font-medium">
          <button
    onClick={onNavigateHome}
    className="hover:text-green-600 flex items-center gap-1 cursor-pointer"
  >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">About Us</span>
        </div>
      </div>

      {
    /* Main Container */
  }
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        
        {/* Page Hero Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden border border-slate-800 text-center flex flex-col items-center justify-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-4 flex flex-col items-center text-center">
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight text-center">
              🔧 Welcome to Phidim Service
            </h1>

            <p className="text-sm sm:text-base text-green-300 font-bold text-center">
              &quot;One Stop Solution for Home, Office & Business Services!&quot; 🏠⚡💻
            </p>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal text-center max-w-2xl">
              Need a trusted technician? Don&apos;t worry! Phidim Service is always ready to help you with fast, reliable, and professional service across Panchthar district.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/9779862772457"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-extrabold px-5 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer hover:scale-105"
              >
                <Phone className="w-4 h-4" />
                <span>Call Hotline: +977 986-2772457</span>
              </a>

              <a
                href="https://phidimservice.com.np"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all border border-white/20 cursor-pointer hover:scale-105"
              >
                <Globe className="w-4 h-4 text-green-400" />
                <span>phidimservice.com.np</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-300" />
              </a>
            </div>
          </div>
        </div>

        {
    /* Section Navigation Tabs */
  }
        <div className="bg-white border border-gray-200 rounded-2xl p-2 shadow-xs flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
    onClick={() => setActiveTab("ALL")}
    className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all ${activeTab === "ALL" ? "bg-slate-900 text-white shadow-xs" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
  >
            📋 Complete Profile
          </button>
          <button
    onClick={() => setActiveTab("SERVICES")}
    className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all ${activeTab === "SERVICES" ? "bg-slate-900 text-white shadow-xs" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
  >
            ⚡ Technical Services
          </button>
          <button
            onClick={() => setActiveTab("CAPABILITIES")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all ${activeTab === "CAPABILITIES" ? "bg-slate-900 text-white shadow-xs" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
          >
            🛠️ Service Capabilities & Standards
          </button>
          <button
    onClick={() => setActiveTab("WHY_US")}
    className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all ${activeTab === "WHY_US" ? "bg-slate-900 text-white shadow-xs" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
  >
            🤝 Why Choose Us
          </button>
          <button
    onClick={() => setActiveTab("DEVELOPER")}
    className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all ${activeTab === "DEVELOPER" ? "bg-slate-900 text-white shadow-xs" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
  >
            👨‍💻 About Developer
          </button>
        </div>

        {
    /* SECTION 1: SERVICES GRID */
  }
        {(activeTab === "ALL" || activeTab === "SERVICES") && <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-wider flex items-center gap-2.5">
                  <Wrench className="w-5 h-5 text-green-600" />
                  <span>On-Site Technical Services</span>
                </h2>
                <p className="text-xs text-gray-600 mt-1">
                  We provide professional electrical, IT, security, and home maintenance solutions directly to your doorstep.
                </p>
              </div>
              <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200 self-start sm:self-auto">
                Doorstep Service Available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {
    /* Electrical Services */
  }
              <div className="bg-amber-50/60 border border-amber-200/90 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2.5 font-black text-amber-950 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span>⚡ Electrical Services (बिद्युत सम्बन्धी)</span>
                </div>
                <ul className="space-y-2 text-xs text-gray-700 font-medium">
                  {electricalServices.map((item, i) => <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>)}
                </ul>
              </div>

              {
    /* CCTV & Security Services */
  }
              <div className="bg-blue-50/60 border border-blue-200/90 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2.5 font-black text-blue-950 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-700 flex items-center justify-center">
                    <Camera className="w-4 h-4" />
                  </div>
                  <span>📹 CCTV & Security Services</span>
                </div>
                <ul className="space-y-2 text-xs text-gray-700 font-medium">
                  {cctvServices.map((item, i) => <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>)}
                </ul>
              </div>

              {
    /* Computer & IT Services */
  }
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2.5 font-black text-slate-950 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <span>💻 Computer & IT Services</span>
                </div>
                <ul className="space-y-2 text-xs text-gray-700 font-medium">
                  {computerServices.map((item, i) => <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-slate-700 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>)}
                </ul>
              </div>

              {
    /* Internet & TV Services */
  }
              <div className="bg-emerald-50/60 border border-emerald-200/90 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2.5 font-black text-emerald-950 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-700 flex items-center justify-center">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <span>📡 Internet & TV Services</span>
                </div>
                <ul className="space-y-2 text-xs text-gray-700 font-medium">
                  {internetTvServices.map((item, i) => <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>)}
                </ul>
              </div>

              {
    /* Air Conditioner Services */
  }
              <div className="bg-cyan-50/60 border border-cyan-200/90 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2.5 font-black text-cyan-950 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-700 flex items-center justify-center">
                    <Wind className="w-4 h-4" />
                  </div>
                  <span>❄️ Air Conditioner Services</span>
                </div>
                <ul className="space-y-2 text-xs text-gray-700 font-medium">
                  {acServices.map((item, i) => <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-cyan-600 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>)}
                </ul>
              </div>

              {
    /* LED TV Services */
  }
              <div className="bg-indigo-50/60 border border-indigo-200/90 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2.5 font-black text-indigo-950 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-700 flex items-center justify-center">
                    <Tv className="w-4 h-4" />
                  </div>
                  <span>📺 LED TV Services</span>
                </div>
                <ul className="space-y-2 text-xs text-gray-700 font-medium">
                  {tvServices.map((item, i) => <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>)}
                </ul>
              </div>

              {
    /* Plumbing Services */
  }
              <div className="bg-teal-50/60 border border-teal-200/90 rounded-2xl p-5 space-y-3 lg:col-span-3">
                <div className="flex items-center gap-2.5 font-black text-teal-950 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-700 flex items-center justify-center">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <span>🚰 Plumbing Services</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                  {plumbingServices.map((item, i) => <div key={i} className="flex items-start gap-2 text-xs text-gray-700 font-medium">
                      <Check className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>)}
                </div>
              </div>

            </div>
          </div>}

        {
    /* SECTION 2: TECHNICAL CAPABILITIES & SPECIALIZED EQUIPMENT */
  }
        {(activeTab === "ALL" || activeTab === "CAPABILITIES") && <div className="bg-gradient-to-br from-green-50 via-white to-green-50/60 border border-green-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-green-200/80 pb-4">
              <div>
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-wider flex items-center gap-2.5">
                  <Wrench className="w-5 h-5 text-green-600" />
                  <span>🛠️ Service Equipment & Genuine Repair Standards</span>
                </h2>
                <p className="text-xs text-gray-600 mt-1">
                  Our certified field technicians use calibrated industrial diagnostics, optical fusion splicers, and 100% genuine replacement parts for all repair jobs.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onNavigateServices}
                  className="bg-green-600 hover:bg-green-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Explore Services</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {technicalEquipmentList.map((item, i) => <div key={i} className="bg-white border border-green-100 hover:border-green-300 rounded-xl p-3.5 font-bold text-gray-800 text-xs flex items-center justify-center text-center shadow-2xs hover:shadow-xs transition-all">
                  <span>{item}</span>
                </div>)}
            </div>

            <div className="bg-white p-4 rounded-2xl border border-green-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="font-extrabold text-green-950">🛡️ 100% Certified Workmanship Guarantee across Panchthar:</span>
              <button
                onClick={onNavigateContact}
                className="text-green-700 font-black hover:underline underline-offset-2 flex items-center gap-1 text-sm cursor-pointer"
              >
                <span>Request On-Site Technician Inspection</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>}

        {
    /* SECTION 3: WHY CHOOSE US */
  }
        {(activeTab === "ALL" || activeTab === "WHY_US") && <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-lg font-black text-gray-900 uppercase tracking-wider flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span>🤝 Why Choose Phidim Service?</span>
              </h2>
              <p className="text-xs text-gray-600 mt-1">
                Our promise to every household and business in Panchthar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {whyChooseUsList.map((item, i) => <div key={i} className="bg-gray-50 border border-gray-200 rounded-2xl p-4 hover:border-green-300 transition-colors space-y-1.5">
                  <div className="flex items-center gap-2 font-black text-gray-900 text-xs text-green-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-gray-600 pl-6 font-medium">
                    {item.desc}
                  </p>
                </div>)}
            </div>
          </div>}

        {
    /* SECTION 4: ABOUT THE DEVELOPER */
  }
        {(activeTab === "ALL" || activeTab === "DEVELOPER") && <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 space-y-6 shadow-xl border border-slate-800 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-green-500 to-emerald-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg">
                  <Code2 className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-green-400 uppercase tracking-widest bg-white/10 px-2.5 py-0.5 rounded-sm">
                      FULL STACK WEB DEVELOPER
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white mt-1 flex items-center gap-2">
                    <span>Semik Serma</span>
                    <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                  </h3>
                </div>
              </div>

              <div className="text-left sm:text-right text-xs text-gray-300">
                <p className="font-bold text-white">Developed with ❤️ by Semik Serma</p>
                <p className="text-[11px] text-green-400 font-extrabold uppercase tracking-wider">Phidim Service</p>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-black text-gray-400 uppercase tracking-wider block">
                TECHNICAL SKILLS & PROGRAMMING STACK
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {devSkills.map((skill, i) => <span key={i} className="bg-white/10 hover:bg-white/20 text-green-300 font-bold px-3.5 py-1.5 rounded-xl text-xs border border-white/10 transition-colors">
                    {skill}
                  </span>)}
                <a
                  href="https://portfolio.phidimservice.com.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-xs shadow-md border border-cyan-200 hover:scale-105 transition-all inline-flex items-center gap-1.5 cursor-pointer tracking-tight"
                  title="Visit Semik Serma's Portfolio Website"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-950 shrink-0 animate-pulse" />
                  <span>Portfolio (portfolio.phidimservice.com.np)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                </a>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black text-green-400">
                <Sparkles className="w-4 h-4" />
                <span>Continuous Learning & System Engineering</span>
              </div>
              <p className="text-xs text-gray-300 font-medium leading-relaxed">
                📚 Currently learning advanced <strong className="text-white">Software Engineering, System Design, Cyber Security, and Artificial Intelligence</strong> to build even better, faster, and secure digital solutions.
              </p>
            </div>
          </div>}

        {
    /* BOTTOM CALLOUT / CONTACT FOOTER BANNER */
  }
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2.5">
              <PhoneCall className="w-5 h-5 text-green-400" />
              <span>📍 Contact Us in Phidim, Panchthar</span>
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-medium">
              Phidim Service for trusted home services, electrical repairs, CCTV installations, and fiber net support.
            </p>
            <p className="text-xs font-extrabold text-green-400">
              &quot;Professional Service, Genuine Parts & Workmanship, Happy Customers!&quot; 💙🙏
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
    onClick={onNavigateContact}
    className="bg-green-600 hover:bg-green-700 text-white font-extrabold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
  >
              Contact Us Page
            </button>
            <a
    href="https://wa.me/9779862772457"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-colors border border-white/20 cursor-pointer"
  >
              Call Helpline +977 986-2772457
            </a>
          </div>
        </div>

      </div>
    </div>;
};
