import Link from "next/link";
import {
  MapPin,
  ShieldCheck,
  Phone,
  MessageCircle,
  Wrench,
  Clock,
  Home,
  ChevronRight,
  User,
  Zap,
  HelpCircle,
  CheckCircle2
} from "lucide-react";
import { SeoHeaderNavbar } from "@/components/SeoHeaderNavbar";
import { Footer } from "@/components/Footer";
import { SeoBookingSection } from "@/components/SeoBookingSection";
import { PHIDIM_LOCATION_DATA, SEO_SERVICES } from "@/data/seoServicesData";

export const metadata = {
  title: "Phidim | Phidim Service - No. 1 Local Services, Technicians & Home Repairs in Phidim, Panchthar",
  description: "Official local services in Phidim, Nepal (फिदिम सेवा). Book certified local electricians, plumbers, DishHome technicians, CCTV camera installers, FiberNet internet specialists, and computer repair experts across all 14 wards of Phidim Municipality, Panchthar.",
  keywords: [
    "Phidim",
    "Phidim Service",
    "Phidim Services",
    "Services in Phidim",
    "Phidim Nepal",
    "Phidim Panchthar",
    "Phidim Bazaar",
    "Phidim Municipality",
    "electrician in Phidim",
    "plumber in Phidim",
    "CCTV installation Phidim",
    "DishHome Phidim",
    "FiberNet Phidim",
    "internet service Phidim",
    "computer repair Phidim",
    "AC service Phidim",
    "technicians in Phidim",
    "Phidim Ward 1",
    "Phidim Ward 2",
    "Phidim Ward 4",
    "Phidim Gadhi",
    "Phidim Pragati Chowk",
    "फिदिम",
    "फिदिम सेवा",
    "फिदिम बजार",
    "फिदिम पाँचथर",
    "फिदिम नगरपालिका"
  ],
  alternates: {
    canonical: `https://phidimservice.com.np/phidim`,
  },
  openGraph: {
    title: "Phidim Service | No. 1 Local Services in Phidim, Panchthar, Nepal",
    description: "Connect with certified local technicians for doorstep electrical, plumbing, fiber internet, CCTV, and DishHome services in Phidim, Nepal.",
    url: `https://phidimservice.com.np/phidim`,
    type: "website",
    locale: "en_US",
    alternateLocale: ["ne_NP"]
  },
  other: {
    "geo.region": "NP-KO",
    "geo.placename": "Phidim, Panchthar, Koshi Province, Nepal",
    "geo.position": "27.1485;87.7634",
    "ICBM": "27.1485, 87.7634",
    "DC.title": "Local Services in Phidim - Phidim Service",
    "DC.creator": "Dhanraj Serma",
    "DC.subject": "Phidim Services, Technicians in Phidim, Phidim Panchthar Nepal"
  }
};

export default function PhidimLocationPage() {
  const data = PHIDIM_LOCATION_DATA;

  // JSON-LD Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
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
        "name": "Phidim",
        "item": "https://phidimservice.com.np/phidim"
      }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://phidimservice.com.np/phidim#localbusiness",
    "name": "Phidim Service - Phidim Headquarters",
    "alternateName": "फिदिम सेवा",
    "image": "https://phidimservice.com.np/logo.png",
    "telephone": "+9779862772457",
    "url": "https://phidimservice.com.np/phidim",
    "currenciesAccepted": "NPR",
    "paymentAccepted": "Cash, Fonepay, eSewa, Bank Transfer",
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
      "latitude": 27.1485,
      "longitude": 87.7634
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "07:00",
        "closes": "20:00"
      }
    ],
    "sameAs": [
      "https://en.wikipedia.org/wiki/Phidim",
      "https://ne.wikipedia.org/wiki/%E0%A4%AB%E0%A4%BF%E0%A4%A6%E0%A4%BF%E0%A4%AE",
      "https://www.wikidata.org/wiki/Q3428938",
      "https://www.facebook.com/dhanraj.serma.14"
    ],
    "knowsAbout": [
      "Phidim",
      "Phidim Municipality",
      "Panchthar District",
      "Electrical Wiring in Phidim",
      "Plumbing in Phidim",
      "CCTV Installation in Phidim",
      "DishHome in Phidim",
      "FiberNet in Phidim",
      "Computer Repair in Phidim",
      "फिदिम",
      "फिदिम सेवा"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "148",
      "bestRating": "5"
    },
    "description": "Phidim Service connects homes and businesses with certified local technicians for electrical wiring, plumbing, CCTV installation, optical fiber networking, DishHome, and computer repair across all 14 wards of Phidim, Panchthar, Nepal.",
    "priceRange": "Rs. 300 - Rs. 15,000"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans flex flex-col selection:bg-green-500 selection:text-white">
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SeoHeaderNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-12 w-full">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-gray-500">
          <Link href="/" className="hover:text-green-600 transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-900 font-bold">Phidim</span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-green-600 font-bold">Local Services</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-slate-700/50">
          <div className="absolute -right-12 -bottom-12 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
              <MapPin className="w-3.5 h-3.5" />
              <span>Phidim Municipality • Panchthar, Nepal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {data.h1}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {data.intro}
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-emerald-400">
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>30-Min Rapid Bazaar Dispatch</span>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Verified Local Technicians</span>
              </span>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            About Technical & Doorstep Services in Phidim
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {data.overview}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700">
            <span className="text-slate-400">Primary Hub:</span>
            <span className="bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">Main Road, Ward 1 & 2</span>
            <span className="bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">Pragati Chowk, Ward 4</span>
            <span className="bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">Gadhi, Ward 3</span>
            <span className="bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">Salleri, Ward 7</span>
          </div>
        </div>

        {/* Wards & Service Coverage Area Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <MapPin className="w-6 h-6 text-red-500" />
            <span>Phidim Municipal Wards & Coverage Areas</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.wards.map((w, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-emerald-400 transition-colors space-y-1.5">
                <div className="text-xs font-black text-emerald-700 uppercase tracking-wide">{w.ward}</div>
                <div className="text-sm font-bold text-slate-800">{w.areas}</div>
                <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span>Doorstep technician available</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Services Directory */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Wrench className="w-6 h-6 text-emerald-600" />
                <span>Technical Services Available in Phidim</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Click on any category to view full service details, checklists, pricing, and warranty information.
              </p>
            </div>
            <Link
              href="/services"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 underline flex items-center gap-1 shrink-0"
            >
              <span>View All 9 Categories</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEO_SERVICES.map((s) => (
              <div
                key={s.slug}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {s.category}
                    </span>
                    <span className="text-xs font-bold text-green-600">Phidim Doorstep</span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {s.title.split("|")[0].trim()}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {s.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-xs font-extrabold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <span>Read Details & Pricing</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                  <SeoBookingSection serviceId={s.serviceId} serviceName={s.title.split("|")[0].trim()} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Local Technicians */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <User className="w-6 h-6 text-emerald-600" />
              <span>Verified Field Technicians in Phidim</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Meet our certified technicians stationed in Phidim Bazaar, ready for residential and commercial dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.technicians.map((t, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center space-y-3">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-500 shadow-md">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{t.name}</h3>
                  <p className="text-xs text-emerald-600 font-bold">{t.role}</p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {t.bio}
                </p>
                <div className="pt-2 w-full">
                  <a
                    href={`tel:${t.phone.replace(/[^0-9+]/g, "")}`}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Technician</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-Link Banner to Panchthar District */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 border border-blue-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">Regional Expansion</span>
            <h3 className="text-xl font-black text-white">Need Services Across Panchthar District?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We also provide certified mobile technical visits to Ranke, Yasok (Kummayak), Rabi (Miklajung), Jorpokhari (Hilihang), Tharpu (Yangwarak), and surrounding rural municipalities.
            </p>
          </div>
          <Link
            href="/panchthar"
            className="px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shrink-0 flex items-center gap-2"
          >
            <span>Explore Panchthar Services</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Local Search Keywords Section (Bilingual Phidim Focus) */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Popular Local Searches for Phidim, Panchthar (फिदिममा लोकप्रिय खोजहरू)
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed font-semibold">
            Residents, hotels, shops, and offices across Phidim search for our verified doorstep services with these top queries:
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              "Phidim Service",
              "services in Phidim",
              "electrician in Phidim",
              "plumber in Phidim",
              "DishHome service Phidim",
              "FiberNet WiFi Phidim",
              "CCTV installation Phidim",
              "computer repair Phidim",
              "technicians in Phidim Bazaar",
              "house wiring Phidim",
              "फिदिम सेवा",
              "फिदिम इलेक्ट्रीसियन",
              "फिदिम प्लम्बर",
              "फिदिम सिसिटिभी क्यामेरा",
              "फिदिम डिसहोम फाइबरनेट",
              "फिदिम कम्प्युटर मर्मत",
              "फिदिम बजार सेवा",
              "पाँचथर फिदिम प्राविधिक"
            ].map((kw, i) => (
              <span
                key={i}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            <span>Frequently Asked Questions - Phidim Service</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.faqs.map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm font-extrabold text-slate-900">{faq.q}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Dispatch Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-xl">
          <div className="space-y-2">
            <h3 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-400 animate-pulse" />
              <span>Immediate Phidim Technical Dispatch Hotline</span>
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-semibold">
              Contact Dhanraj Serma (Master Admin) directly to dispatch a certified electrician, plumber, or fiber technician to your Phidim doorstep.
            </p>
            <p className="text-xs font-bold text-green-400">
              Hotline: +977 986-2772457 • Main Road, Ward 1, Phidim, Panchthar
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/9779862772457"
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
