import {
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  Clock,
  ShieldCheck,
  HelpCircle,
  Building2,
  Navigation,
  Smartphone,
  ExternalLink
} from "lucide-react";
export const ContactUsPage = ({
  onNavigateHome,
  onNavigateServices
}) => {
  const hotlines = [
    {
      title: "Direct Helpline",
      subtitle: "+977 986-2772457",
      desc: "Instant voice call support for electrical, CCTV, and fiber net emergencies in Phidim.",
      icon: Phone,
      color: "bg-green-600",
      actionText: "Call +977 986-2772457",
      actionUrl: "tel:+9779862772457"
    },
    {
      title: "WhatsApp Official Chat",
      subtitle: "+977 986-2772457",
      desc: "Send site photos, share Google Maps location & receive instant technician quotes.",
      icon: MessageCircle,
      color: "bg-teal-600",
      actionText: "Open WhatsApp Chat",
      actionUrl: "https://wa.me/9779862772457?text=Hello%20Phidim%20Service!%20I%20would%20like%20to%20inquire%20about%20your%20technician%20services."
    },
    {
      title: "Main Service Hub",
      subtitle: "Phidim Ward 1, Main Road",
      desc: "Visit our customer care desk for device drop-offs, fiber router pickups & bill payment.",
      icon: MapPin,
      color: "bg-blue-600",
      actionText: "View Location Guide",
      actionUrl: "#coverage-map"
    },
    {
      title: "Official Email",
      subtitle: "support@phidimservice.com",
      desc: "Send official corporate tenders, bulk inquiry letters & commercial network proposals.",
      icon: Mail,
      color: "bg-purple-600",
      actionText: "Send Email",
      actionUrl: "mailto:support@phidimservice.com"
    }
  ];
  const quickServices = [
    { name: "\u26A1 Electrical Repair & Wiring", msg: "Hello Phidim Service! I need an electrician for household wiring or repair work." },
    { name: "\u{1F4F9} CCTV Camera & NVR System", msg: "Hello Phidim Service! I need a CCTV camera quotation and site survey." },
    { name: "\u{1F4E1} DishHome DTH Connection", msg: "Hello Phidim Service! I want to install a new DishHome DTH connection." },
    { name: "\u{1F310} LAN Networking & Cabling", msg: "Hello Phidim Service! I need LAN network cable setup for my office / home." },
    { name: "\u{1F5A5}\uFE0F Computer & Laptop Repair", msg: "Hello Phidim Service! I need computer motherboard / OS software repair." },
    { name: "\u{1F3E0} Smart Home & Power Backup", msg: "Hello Phidim Service! I need inverter / solar battery setup assistance." }
  ];
  const coverageAreas = [
    { ward: "Phidim Ward 1", areas: "Main Bazaar, Buspark, Hospital Road, Stadium Area" },
    { ward: "Phidim Ward 2", areas: "Pallatar, Gadhi, Lower Bazaar" },
    { ward: "Phidim Ward 3 & 4", areas: "Ranitar, Chokmagu, Silauti Road" },
    { ward: "Phidim Ward 5, 6 & 7", areas: "Sumpata, Yashok Highway, Pauwa Bhanjyang Road" },
    { ward: "Outer Municipalities", areas: "Ranitar, Yangnam, Imbung, Yashok, Pauwa Bhanjyang, Tharpu" }
  ];
  const faqs = [
    {
      q: "How fast can a technician arrive at my home in Phidim?",
      a: "For emergency electrical, fiber net link outage, or CCTV breakdown inside Phidim Ward 1\u20134, our local technician reaches your doorstep within 30 to 45 minutes of booking."
    },
    {
      q: "What are the visiting and inspection charges?",
      a: "Our initial doorstep inspection charge in Phidim Ward 1 is minimal and waived if you proceed with the repair or installation work."
    },
    {
      q: "Do you provide services on Saturdays and public holidays?",
      a: "Yes! Our doorstep technicians operate 7 days a week, including Saturdays and public holidays, from 7:00 AM to 8:00 PM."
    },
    {
      q: "Can I pay via eSewa, Khalti, or mobile banking?",
      a: "Absolutely. We accept eSewa, Khalti, direct Fonepay QR code transfers, as well as Cash on Service after work completion."
    },
    {
      q: "Do you offer warranty on installations and repair services?",
      a: "Yes, all hardware installations (CCTV cameras, fiber routers, MCB breakers) carry official warranties (1 to 2 years), plus an official service guarantee on technician labor."
    },
    {
      q: "How do I book a technician immediately?",
      a: "Simply call our direct hotline at +977 986-2772457 or click any WhatsApp button on this page to share your address and issue description."
    }
  ];
  return <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {
    /* SECTION 1: HERO HEADER & DIRECT SUPPORT HUB */
  }
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Doorstep Technical Services • Phidim, Panchthar</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Contact <span className="text-blue-400">Phidim Service</span> Customer Support
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
              Need electrical wiring repair, CCTV installation, DishHome DTH connection, or LAN networking in Phidim? Our local certified technicians are ready to visit your doorstep.
            </p>

            {
    /* Quick Stats Badges */
  }
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <span className="block text-[10px] text-gray-400 font-bold uppercase">Response Time</span>
                <span className="font-extrabold text-blue-300 text-sm">Sub-30 Mins</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <span className="block text-[10px] text-gray-400 font-bold uppercase">Service Area</span>
                <span className="font-extrabold text-green-300 text-sm">All Wards 1-14</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <span className="block text-[10px] text-gray-400 font-bold uppercase">Daily Hours</span>
                <span className="font-extrabold text-amber-300 text-sm">7 AM – 8 PM</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <span className="block text-[10px] text-gray-400 font-bold uppercase">Emergency</span>
                <span className="font-extrabold text-cyan-300 text-sm">24/7 Hotline</span>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
    href="https://wa.me/9779862772457?text=Hello%20Phidim%20Service!%20I%20need%20doorstep%20technician%20support."
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-600 hover:bg-green-500 text-white font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg cursor-pointer"
  >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Technician Booking</span>
              </a>

              <a
    href="tel:+9779862772457"
    className="bg-white/10 hover:bg-white/20 text-white font-extrabold px-5 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-colors border border-white/20 cursor-pointer"
  >
                <Phone className="w-4 h-4 text-green-400" />
                <span>Call Hotline +977 986-2772457</span>
              </a>
            </div>
          </div>
        </div>

        {
    /* SECTION 2: OFFICIAL CONTACT CHANNELS & HOTLINES GRID */
  }
        <section className="space-y-4">
          <div className="border-b border-gray-200 pb-3">
            <span className="text-xs font-extrabold text-blue-700 uppercase tracking-widest block mb-1">
              Direct Communication Hub
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              📞 Official Contact Channels
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hotlines.map((item, idx) => {
    const IconComp = item.icon;
    return <div
      key={idx}
      className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
    >
                  <div className="space-y-3">
                    <div className={`w-12 h-12 rounded-2xl ${item.color} text-white flex items-center justify-center shadow-md`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                        {item.title}
                      </span>
                      <h3 className="text-base font-black text-gray-900 mt-0.5">
                        {item.subtitle}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>

                  <a
      href={item.actionUrl}
      target={item.actionUrl.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
    >
                    <span>{item.actionText}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                  </a>
                </div>;
  })}
          </div>
        </section>

        {
    /* SECTION 3: INSTANT SERVICE REQUEST & WHATSAPP DISPATCH */
  }
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-black text-green-400 uppercase tracking-widest block mb-1">
              Tap & Request On-Site Visit
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>⚡ One-Tap Doorstep Technician Dispatch</span>
            </h2>
            <p className="text-xs text-gray-300 mt-1">
              Select your required service below to open a pre-formatted message in WhatsApp directly with our dispatch team.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {quickServices.map((svc, idx) => <a
    key={idx}
    href={`https://wa.me/9779862772457?text=${encodeURIComponent(svc.msg)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/10 hover:border-green-400/50 transition-all flex items-center justify-between group cursor-pointer"
  >
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-green-300 transition-colors">
                    {svc.name}
                  </h3>
                  <span className="text-[10px] text-gray-400 font-semibold block">
                    Instant WhatsApp Dispatch →
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-500/20 group-hover:bg-green-500 text-green-300 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
              </a>)}
          </div>

          {
    /* Nepalese Translation Card */
  }
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed space-y-2">
            <div className="flex items-center gap-2 text-green-400 font-black">
              <span>🇳🇵</span>
              <span>नेपाली भाषामा जानकारी</span>
            </div>
            <p className="text-gray-200">
              फिदिम सर्भिसको प्राविधिक सेवा चाहिएमा वा बिजुली मर्मत, CCTV क्यामेरा जडान, डिसहोम फाइबर नेट तथा कम्प्युटर नेटवर्किङको लागि सिधै हाम्रो फोन नम्बर <strong>+977 986-2772457</strong> वा WhatsApp मा सम्पर्क गर्न सक्नुहुन्छ।
            </p>
          </div>
        </section>

        {
    /* SECTION 4: PHIDIM OFFICE LOCATION & COVERAGE AREA */
  }
        <section id="coverage-map" className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-extrabold text-blue-700 uppercase tracking-widest block mb-1">
                Panchthar District Headquarters
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                📍 Office Location & Doorstep Coverage Areas
              </h2>
            </div>
            <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full self-start sm:self-auto">
              Phidim Municipality • Koshi Province
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {
    /* Office Info Card */
  }
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900">Phidim Service Station</h3>
                  <p className="text-xs text-gray-500 font-semibold">Panchthar District Main Office</p>
                </div>
              </div>

              <div className="space-y-2 text-xs font-medium text-gray-700 pt-2 border-t border-slate-200">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Main Road, Ward No. 1, Phidim Bazaar, Panchthar</span>
                </div>
                <div className="flex items-start gap-2">
                  <Navigation className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Landmark: Near Phidim Buspark & Hospital Road Junction</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Opening Hours: 7:00 AM – 8:00 PM (Sun–Sat)</span>
                </div>
              </div>

              <div className="pt-2">
                <a
    href="https://wa.me/9779862772457?text=Hello!%20Please%20send%20me%20your%20office%20location%20map."
    target="_blank"
    rel="noopener noreferrer"
    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
  >
                  <Smartphone className="w-4 h-4" />
                  <span>Get Location On WhatsApp</span>
                </a>
              </div>
            </div>

            {
    /* Ward Coverage List */
  }
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                Full Technician Doorstep Reach in Panchthar:
              </h3>

              <div className="space-y-2">
                {coverageAreas.map((cov, idx) => <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <span className="font-extrabold text-gray-900 shrink-0 sm:w-44">
                      {cov.ward}
                    </span>
                    <span className="text-gray-600 font-medium">
                      {cov.areas}
                    </span>
                  </div>)}
              </div>
            </div>
          </div>
        </section>

        {
    /* SECTION 5: FREQUENTLY ASKED QUESTIONS (FAQ) */
  }
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <span className="text-xs font-extrabold text-blue-700 uppercase tracking-widest block mb-1">
              Got Questions?
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-600" />
              <span>Frequently Asked Questions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-gray-900 flex items-start gap-2">
                  <span className="text-blue-600 font-black shrink-0">Q.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-gray-600 font-medium leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>)}
          </div>
        </section>

        {
    /* SECTION 6: DIRECT ACTION CALLOUT FOOTER */
  }
        <section className="bg-gradient-to-r from-green-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-green-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Need Immediate On-Site Technician Assistance?
            </h2>
            <p className="text-xs sm:text-sm text-green-200 font-medium">
              Call our hotline or tap WhatsApp to reach our technician dispatch desk in Phidim right now.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
    href="tel:+9779862772457"
    className="bg-white text-gray-900 hover:bg-gray-100 font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
  >
              <Phone className="w-4 h-4 text-green-600" />
              <span>Call +977 986-2772457</span>
            </a>

            <a
    href="https://wa.me/9779862772457?text=Hello%20Phidim%20Service!%20I%20need%20technician%20support."
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 hover:bg-green-400 text-slate-950 font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
  >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat On WhatsApp</span>
            </a>
          </div>
        </section>

      </div>
    </div>;
};
