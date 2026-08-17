import Link from "next/link";
import {
  Wrench,
  Zap,
  Camera,
  Monitor,
  Tv,
  Wifi,
  Droplet,
  Wind,
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  ChevronRight,
  Home
} from "lucide-react";
import { SeoHeaderNavbar } from "@/components/SeoHeaderNavbar";
import { Footer } from "@/components/Footer";
import { SEO_SERVICES } from "@/data/seoServicesData";
import { ServicesPageClient } from "@/components/ServicesPageClient";

export const metadata = {
  title: "Phidim Services | No. 1 Local Services & Certified Technicians in Phidim, Panchthar",
  description: "Complete local technical & home services in Phidim, Panchthar, Nepal (फिदिम सेवा). Certified specialists for electrical repairs, house wiring, plumbing, DishHome DTH, CCTV camera installation, fiber internet, and computer repair in Phidim.",
  keywords: [
    "Phidim services",
    "Phidim Service",
    "services in Phidim",
    "local services Phidim",
    "Phidim electrician",
    "Phidim plumber",
    "Phidim CCTV",
    "Phidim DishHome",
    "Phidim FiberNet",
    "Phidim computer repair",
    "Phidim AC service",
    "technicians in Phidim",
    "Phidim Nepal",
    "Phidim Panchthar",
    "फिदिम सेवा",
    "फिदिम प्राविधिक",
    "फिदिम मर्मत सेवा"
  ],
  alternates: {
    canonical: "https://phidimservice.com.np/services",
  },
  openGraph: {
    title: "Phidim Services | No. 1 Local Services & Certified Technicians in Phidim, Panchthar",
    description: "Explore full technical services in Phidim, Panchthar, Nepal. Certified local specialists for electrical repairs, plumbing, DishHome DTH, CCTV camera installation, fiber internet configuration, and computer laptop repair in Phidim.",
    url: "https://phidimservice.com.np/services",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ne_NP"]
  },
  other: {
    "geo.region": "NP-KO",
    "geo.placename": "Phidim, Panchthar, Koshi Province, Nepal",
    "geo.position": "27.1485;87.7634",
    "ICBM": "27.1485, 87.7634"
  }
};

export default function ServicesPage() {
  const categories = [
    {
      id: "electrician-phidim",
      title: "Electrical & Inverter Services (विद्युत सेवा)",
      desc: "Complete house wiring, circuit breaker (MCB) installations, inverter/solar load balancing, and emergency electrical troubleshooting.",
      iconName: "Zap",
      color: "from-amber-500 to-yellow-600"
    },
    {
      id: "plumbing-phidim",
      title: "Plumbing & Sanitary Services (प्लम्बिङ सेवा)",
      desc: "Emergency pipe leakage repair, CPVC/PPR pipe fusion welding, bathroom sanitary fittings, and water pump overhaul.",
      iconName: "Droplet",
      color: "from-sky-500 to-blue-600"
    },
    {
      id: "cctv-phidim",
      title: "CCTV & Security Systems (सीसीटीभी सेवा)",
      desc: "Professional IP/Analog camera installation, NVR setup, night-vision calibration, and mobile remote live viewing setup.",
      iconName: "Camera",
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "internet-phidim",
      title: "WiFi & Internet Services (इन्टरनेट सेवा)",
      desc: "WiFi router setup, signal extensions, dual-band configurations, and doorstep troubleshooting for high-speed connections.",
      iconName: "Wifi",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: "fibernet-phidim",
      title: "DishHome FiberNet Setup (डिसहोम फाइबरनेट)",
      desc: "Optical fiber drop wire installations, fusion splicing, power signal calibration, and high-speed fiber package activation.",
      iconName: "Wifi",
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: "dishhome-phidim",
      title: "DishHome DTH Signal Tuning (डिसहोम सेवा)",
      desc: "Satellite dish azimuth/elevation alignment, universal LNB skew tuning, RG6 terminations, and setup box channel activation.",
      iconName: "Tv",
      color: "from-red-500 to-rose-600"
    },
    {
      id: "networking-phidim",
      title: "LAN Networking & Structured Cabling",
      desc: "Cat6 Ethernet structured cabling, office switch rack setup, subnet configurations, and enterprise access point deployment.",
      iconName: "Wrench",
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: "computer-phidim",
      title: "Computer & Laptop Repair (कम्प्युटर मर्मत)",
      desc: "Windows 11/10 installation, NVMe SSD speed upgrades, thermal paste application, virus cleaning, and data recovery.",
      iconName: "Monitor",
      color: "from-slate-600 to-slate-800"
    },
    {
      id: "ac-cooling-phidim",
      title: "AC Servicing & Gas Refill (एसी मर्मत)",
      desc: "Split AC deep pressure jet washing, antibacterial coil treatment, R32/R410A refrigerant gas top-up, and diagnostics.",
      iconName: "Wind",
      color: "from-teal-500 to-emerald-600"
    }
  ];

  // Schema.org JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://phidimservice.com.np/#organization",
        "name": "Phidim Service",
        "url": "https://phidimservice.com.np/services",
        "telephone": "+9779862772457",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Main Road, Ward No. 1",
          "addressLocality": "Phidim",
          "addressRegion": "Panchthar, Koshi Province",
          "postalCode": "57200",
          "addressCountry": "NP"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "27.1518",
          "longitude": "87.7634"
        },
        "image": "https://phidimservice.com.np/logo.png",
        "priceRange": "$$"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://phidimservice.com.np"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://phidimservice.com.np/services"
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SeoHeaderNavbar activeTabName="ALL SERVICES" />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-600 font-medium">
          <Link href="/" className="hover:text-green-600 flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">Our Services</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
        
        {/* Page Hero Title */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Local Marketplace</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Our Services | हाम्रो सेवाहरू
            </h1>

            <p className="text-sm sm:text-base text-green-300 font-bold">
              Connecting You with Expert Local Technicians in Phidim & Panchthar! 🏠⚡
            </p>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl mx-auto font-normal">
              We provide professional doorstep technical assistance in Phidim Municipality and surrounding parts of Panchthar district. Choose a specialized category below to view rates, technician lists, and book an assignment.
            </p>
          </div>
        </div>

        {/* Live Filterable Services Section */}
        <ServicesPageClient categories={categories} />

        {/* Service Areas Section */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <span>Primary Service Coverage: Phidim & Panchthar</span>
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed font-semibold mt-1">
                Our verified field technicians provide rapid doorstep dispatch across Phidim Municipality and scheduled coverage throughout Panchthar District.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/phidim"
                className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 font-extrabold text-xs hover:bg-emerald-100 transition-colors"
              >
                📍 Phidim City Page
              </Link>
              <Link
                href="/panchthar"
                className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-300 font-extrabold text-xs hover:bg-indigo-100 transition-colors"
              >
                📍 Panchthar District Page
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs text-gray-700 font-bold">
            <Link href="/phidim" className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-center hover:border-emerald-400 transition-colors">Phidim Bazaar (Ward 1, 2)</Link>
            <Link href="/phidim" className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-center hover:border-emerald-400 transition-colors">Phidim Ward 3 (Gadhi)</Link>
            <Link href="/phidim" className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-center hover:border-emerald-400 transition-colors">Phidim Ward 4 (Pragati Chowk)</Link>
            <Link href="/panchthar" className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-center hover:border-indigo-400 transition-colors">Ranke Bazaar (Phalgunanda)</Link>
            <Link href="/panchthar" className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-center hover:border-indigo-400 transition-colors">Yasok (Kummayak)</Link>
            <Link href="/phidim" className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-center hover:border-emerald-400 transition-colors">Salleri / Bharapa</Link>
            <Link href="/panchthar" className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-center hover:border-indigo-400 transition-colors">Panchthar District Zones</Link>
            <Link href="/panchthar" className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-center hover:border-indigo-400 transition-colors">Koshi Province Hills</Link>
          </div>
        </div>

        {/* Emergency Helpline Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800 shadow-xl">
          <div className="space-y-2">
            <h3 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-400 animate-pulse" />
              <span>Need Immediate Technical Dispatch?</span>
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-semibold">
              Call our primary hotline to connect directly with Dhanraj Serma (Master Admin) or dispatch a verified technician to your home or office.
            </p>
            <p className="text-xs font-bold text-green-400">
              Hotline: +977 986-2772457 • Phidim, Panchthar, Nepal
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/9779862772457?text=Hello%20Phidim%20Service!%20I%20need%20a%20technician."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-extrabold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Us</span>
            </a>
            <a
              href="tel:+9779862772457"
              className="bg-white/10 hover:bg-white/20 text-white font-extrabold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-all border border-white/20 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-green-400" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
