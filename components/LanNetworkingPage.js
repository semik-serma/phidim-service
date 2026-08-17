import {
  Cable,
  Network,
  Router,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Home,
  Store,
  School,
  Building,
  Landmark,
  Hotel,
  Briefcase,
  Zap,
  FolderTree,
  Lock,
  Activity,
  Wrench,
  MessageCircle,
  Phone,
  HardDrive,
  Monitor,
  Printer,
  Camera,
  Check
} from "lucide-react";
import { DishHomeSection } from "./DishHomeSection";
export const LanNetworkingPage = ({
  onOrderPackage,
  onNavigateHome,
  onNavigateContact
}) => {
  const lanServices = [
    { title: "New LAN Network Installation", icon: Network, desc: "Complete end-to-end local network layout design & deployment." },
    { title: "Ethernet Cable (CAT5e/CAT6) Installation", icon: Cable, desc: "High-speed Cat6 & Cat5e cabling with patch panel termination." },
    { title: "Router & Switch Configuration", icon: Router, desc: "Managed switch setup, VLANs, static IPs & WiFi access points." },
    { title: "Computer-to-Computer Networking", icon: Monitor, desc: "Inter-computer high-speed connectivity for office workflows." },
    { title: "Printer Sharing Setup", icon: Printer, desc: "Network printer integration so all connected devices can print." },
    { title: "File & Folder Sharing", icon: FolderTree, desc: "Centralized shared directories with secured user permission levels." },
    { title: "CCTV Network Configuration", icon: Camera, desc: "IP Camera & NVR subnet network routing for secure local & remote viewing." },
    { title: "NAS (Network Attached Storage) Setup", icon: HardDrive, desc: "Centralized network storage configuration for automated backups." },
    { title: "Office Network Setup", icon: Building2, desc: "Multi-workstation enterprise LAN setup tailored for corporate needs." },
    { title: "Home Network Setup", icon: Home, desc: "Seamless home networking for lag-free gaming, TV streaming & smart devices." },
    { title: "Network Troubleshooting", icon: Wrench, desc: "Instant diagnosis & fix for packet loss, slow speeds & broken cables." },
    { title: "Basic Network Security Configuration", icon: Lock, desc: "Firewall setup, MAC filtering, and WPA3 WiFi encryption." },
    { title: "Network Performance Optimization", icon: Activity, desc: "Bandwidth throttling, QoS setup, and latency minimization." },
    { title: "Existing Network Upgrade & Maintenance", icon: Zap, desc: "Replacing old cables, upgrading switches & periodic network audits." }
  ];
  const suitableFor = [
    { title: "Homes", icon: Home, text: "Smart home networking & entertainment" },
    { title: "Offices", icon: Building2, text: "Structured corporate & workstation cabling" },
    { title: "Shops & Retail", icon: Store, text: "POS billing & local workstation network sync" },
    { title: "Schools & Colleges", icon: School, text: "Computer labs & campus-wide connectivity" },
    { title: "Hospitals & Clinics", icon: Building, text: "Patient records & diagnostic machine network" },
    { title: "Banks & Financials", icon: Landmark, text: "Secure encrypted transaction network" },
    { title: "Hotels & Resorts", icon: Hotel, text: "Guest WiFi management & room cabling" },
    { title: "Government Offices", icon: ShieldCheck, text: "Official intranet & secure record servers" },
    { title: "Small & Medium Businesses", icon: Briefcase, text: "Reliable multi-pc operational network" }
  ];
  const benefits = [
    "\u26A1 Fast data transfer between devices (up to 1 Gbps / 10 Gbps)",
    "\u{1F4C1} Easy file and printer sharing across all workstations",
    "\u{1F510} More secure than public networks with localized firewalls",
    "\u{1F4F9} Easy CCTV monitoring & instant remote live feeds",
    "\u{1F4BB} Connect multiple computers efficiently without speed drops",
    "\u{1F4B0} Cost-effective networking solution for long-term growth",
    "\u{1F4E1} Stable and reliable connection unaffected by weather interference"
  ];
  const neplishServices = [
    "\u0928\u092F\u093E\u0901 LAN Network Setup",
    "CAT6 / CAT5e Cable Installation",
    "Router \u0924\u0925\u093E Switch Configuration",
    "Computer Networking",
    "Printer Sharing Setup",
    "File Sharing",
    "CCTV Network Configuration",
    "Office Network Setup",
    "Home Network Setup",
    "Network Problem Troubleshooting",
    "Network Maintenance",
    "Network Upgrade",
    "Basic Network Security Setup"
  ];
  const handleBookingClick = () => {
    window.open("https://wa.me/9779862772457?text=" + encodeURIComponent("\u0928\u092E\u0938\u094D\u0924\u0947 Phidim Service! \u092E\u0932\u093E\u0908 LAN Networking / Optical Fiber Service \u0915\u094B \u092C\u093E\u0930\u0947\u092E\u093E \u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u0930 Doorstep Booking \u091A\u093E\u0939\u093F\u090F\u0915\u094B \u091B\u0964"), "_blank");
  };
  return <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {
    /* Hero Banner */
  }
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              <Cable className="w-4 h-4 text-cyan-400" />
              <span>Phidim Service • High Speed Networking</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              🌐 LAN Networking Services <span className="text-cyan-400 font-extrabold">(Local Area Network)</span>
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
              LAN (Local Area Network) is a network that connects multiple computers, printers, CCTV cameras, servers, and other devices within a limited area such as a home, office, school, shop, or business.
            </p>

            <p className="text-xs sm:text-sm text-cyan-200 font-semibold">
              We provide reliable and secure LAN networking solutions for both residential and commercial environments across Phidim Municipality and Panchthar district.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
    onClick={handleBookingClick}
    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg cursor-pointer"
  >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Book LAN Technician On WhatsApp</span>
              </button>

              <button
    onClick={onNavigateContact}
    className="bg-white/10 hover:bg-white/20 text-white font-extrabold px-5 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-colors border border-white/20 cursor-pointer"
  >
                <Phone className="w-4 h-4 text-green-400" />
                <span>Contact Phidim Support</span>
              </button>
            </div>
          </div>
        </div>

        {
    /* 🛠️ Our LAN Networking Services */
  }
        <section className="space-y-6">
          <div className="border-b border-gray-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-extrabold text-cyan-700 uppercase tracking-widest block mb-1">
                Professional Engineering Solutions
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                <span>🛠️ Our LAN Networking Services</span>
              </h2>
            </div>
            <span className="text-xs font-bold text-gray-500 bg-gray-200 px-3 py-1 rounded-full self-start sm:self-auto">
              14 Specialized Services
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lanServices.map((svc, idx) => {
    const IconComp = svc.icon;
    return <div
      key={idx}
      className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs hover:shadow-md hover:border-cyan-300 transition-all flex flex-col justify-between space-y-3 group"
    >
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 group-hover:bg-cyan-600 group-hover:text-white flex items-center justify-center transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-black text-gray-900 leading-snug">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      {svc.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-cyan-700">
                    <span>Phidim On-Site Service</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                  </div>
                </div>;
  })}
          </div>
        </section>

        {
    /* 💬 Neplish Version Section */
  }
        <section className="bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-cyan-900/50 shadow-xl space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block mb-1">
              नेपाली भाषामा सेवा विवरण
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              💬 LAN Networking Service (नेपालीमा)
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">
            <p className="bg-white/5 p-4 rounded-2xl border border-white/10">
              🌐 <strong className="text-cyan-300">LAN (Local Area Network)</strong> भनेको घर, Office, School, Shop वा Business भित्र भएका Computer, Printer, CCTV Camera, Server र अन्य Devices लाई एउटै Network मा जोड्ने प्रणाली हो।
            </p>

            <div>
              <h3 className="text-sm font-extrabold text-white mb-3 flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>हामीले प्रदान गर्ने सेवाहरू:</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {neplishServices.map((item, idx) => <div key={idx} className="bg-white/5 hover:bg-white/10 p-2.5 rounded-xl border border-white/10 flex items-center gap-2 text-xs font-bold text-cyan-100">
                    <span className="text-green-400">✅</span>
                    <span>{item}</span>
                  </div>)}
              </div>
            </div>

            <p className="bg-green-500/10 border border-green-500/30 text-green-300 p-4 rounded-2xl font-bold text-xs sm:text-sm leading-relaxed">
              Phidim Service ले Professional LAN Networking Service प्रदान गर्दछ ताकि तपाईंको घर वा व्यवसायको Network छिटो, सुरक्षित र भरपर्दो रूपमा सञ्चालन होस्। 🌐⚡
            </p>
          </div>
        </section>

        {
    /* 🏢 Suitable For */
  }
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <span className="text-xs font-extrabold text-blue-700 uppercase tracking-widest block mb-1">
              Versatile Commercial & Domestic Deployment
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              🏢 Suitable For (कुन-कुन क्षेत्रका लागि उपयुक्त?)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suitableFor.map((item, idx) => {
    const IconComp = item.icon;
    return <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-900">{item.title}</h3>
                    <p className="text-xs text-gray-600 font-medium mt-0.5">{item.text}</p>
                  </div>
                </div>;
  })}
          </div>
        </section>

        {
    /* ✅ Benefits of LAN Networking */
  }
        <section className="bg-gradient-to-br from-green-900 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-green-800 shadow-md space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-extrabold text-green-400 uppercase tracking-widest block mb-1">
              Why Upgrade Your Infrastructure?
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              ✅ Benefits of LAN Networking
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {benefits.map((b, idx) => <div key={idx} className="bg-white/5 border border-white/10 p-3.5 rounded-2xl flex items-start gap-3 text-xs sm:text-sm font-bold text-gray-100">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span>{b}</span>
              </div>)}
          </div>
        </section>

        {
    /* Broadband Integration: DishHome DTH Packages */
  }
        <section className="pt-4">
          <div className="mb-4 text-center">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              📡 Pair Your LAN Network With DishHome DTH Broadband
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              High-speed internet drop lines & dual-band router packages available at your doorstep in Phidim.
            </p>
          </div>
          <DishHomeSection onOrderPackage={onOrderPackage} />
        </section>

      </div>
    </div>;
};
