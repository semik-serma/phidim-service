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
  CheckCircle2,
  Globe
} from "lucide-react";
import { SeoHeaderNavbar } from "@/components/SeoHeaderNavbar";
import { Footer } from "@/components/Footer";
import { SeoBookingSection } from "@/components/SeoBookingSection";
import { PANCHTHAR_LOCATION_DATA, SEO_SERVICES } from "@/data/seoServicesData";

export const metadata = {
  title: PANCHTHAR_LOCATION_DATA.title,
  description: PANCHTHAR_LOCATION_DATA.metaDescription,
  keywords: [
    "Panchthar",
    "Phidim Panchthar",
    "Panchthar services",
    "Phidim Service",
    "services in Panchthar",
    "Panchthar Nepal",
    "electrician in Panchthar",
    "plumber in Panchthar",
    "CCTV Panchthar",
    "DishHome Panchthar",
    "FiberNet Panchthar",
    "Ranke Bazaar",
    "Yasok Panchthar",
    "Rabi Panchthar",
    "पाँचथर",
    "पाँचथर सेवा",
    "फिदिम पाँचथर"
  ],
  alternates: {
    canonical: `https://phidimservice.com.np/panchthar`,
  },
  openGraph: {
    title: PANCHTHAR_LOCATION_DATA.title,
    description: PANCHTHAR_LOCATION_DATA.metaDescription,
    url: `https://phidimservice.com.np/panchthar`,
    type: "website",
    locale: "en_US",
    alternateLocale: ["ne_NP"]
  },
  other: {
    "geo.region": "NP-KO",
    "geo.placename": "Panchthar, Koshi Province, Nepal",
    "geo.position": "27.1485;87.7634",
    "ICBM": "27.1485, 87.7634",
    "DC.title": "Panchthar Services - Phidim Service",
    "DC.creator": "Dhanraj Serma"
  }
};

export default function PanchtharLocationPage() {
  const data = PANCHTHAR_LOCATION_DATA;

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
        "name": "Panchthar",
        "item": "https://phidimservice.com.np/panchthar"
      }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Phidim Service - Panchthar Regional Service Platform",
    "image": "https://phidimservice.com.np/logo.png",
    "telephone": "+9779862772457",
    "url": "https://phidimservice.com.np/panchthar",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "District Commercial Center, Main Road",
      "addressLocality": "Phidim",
      "addressRegion": "Panchthar, Koshi Province",
      "postalCode": "57200",
      "addressCountry": "NP"
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Panchthar District"
      },
      {
        "@type": "City",
        "name": "Phidim Municipality"
      },
      {
        "@type": "City",
        "name": "Ranke Bazaar"
      },
      {
        "@type": "City",
        "name": "Yasok"
      },
      {
        "@type": "City",
        "name": "Rabi Bazaar"
      }
    ],
    "description": data.metaDescription,
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
          <span className="text-gray-900 font-bold">Panchthar</span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-green-600 font-bold">District Services</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-indigo-800/40">
          <div className="absolute -right-12 -bottom-12 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-black uppercase tracking-wider border border-indigo-500/30">
              <Globe className="w-3.5 h-3.5" />
              <span>Panchthar District • Koshi Province, Nepal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {data.h1}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {data.intro}
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-indigo-300">
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>Headquarters in Phidim Bazaar</span>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>8 Municipal & Rural Local Bodies Covered</span>
              </span>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            About Technical Infrastructure Across Panchthar District
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {data.overview}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700">
            <span className="text-slate-400">Coverage Zones:</span>
            <span className="bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">Phidim</span>
            <span className="bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">Ranke</span>
            <span className="bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">Yasok (Kummayak)</span>
            <span className="bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">Rabi (Miklajung)</span>
            <span className="bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">Jorpokhari (Hilihang)</span>
            <span className="bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">Tharpu (Yangwarak)</span>
          </div>
        </div>

        {/* Local Municipalities & Rural Municipalities Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <MapPin className="w-6 h-6 text-indigo-600" />
            <span>Panchthar District Municipalities & Service Reach</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.municipalities.map((m, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-indigo-400 transition-colors space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-black text-indigo-700 uppercase tracking-wide">{m.name}</div>
                </div>
                <div className="text-xs font-bold text-slate-800">{m.coverage}</div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {m.highlight}
                </p>
                <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 pt-1 border-t border-slate-100">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span>On-Site Technician Coverage</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-Link Banner to Phidim Central */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-8 border border-emerald-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">District Headquarters</span>
            <h3 className="text-xl font-black text-white">Located in Phidim Municipality?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              For instant 30-minute doorstep service within Phidim Bazaar, Ward 1, Ward 2, Ward 4 (Pragati Chowk), or Salleri, visit our dedicated Phidim city portal.
            </p>
          </div>
          <Link
            href="/phidim"
            className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shrink-0 flex items-center gap-2"
          >
            <span>Go to Phidim City Page</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Popular Services Directory */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Wrench className="w-6 h-6 text-indigo-600" />
                <span>Technical Services Delivered in Panchthar</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Explore our core technical specializations available for residential, business, and school dispatch across Panchthar.
              </p>
            </div>
            <Link
              href="/services"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 underline flex items-center gap-1 shrink-0"
            >
              <span>View All Categories</span>
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
                    <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200">
                      {s.category}
                    </span>
                    <span className="text-xs font-bold text-indigo-600">Panchthar Wide</span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {s.title.split("|")[0].trim()}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {s.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-xs font-extrabold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
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

        {/* FAQs */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-indigo-600" />
            <span>Frequently Asked Questions - Panchthar District Services</span>
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
              <span>Panchthar District Technical Coordinator Helpline</span>
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-semibold">
              Speak directly with Master Administrator Dhanraj Serma to arrange technical team dispatches for any location across Panchthar District.
            </p>
            <p className="text-xs font-bold text-green-400">
              Hotline: +977 986-2772457 • Phidim Headquarters, Panchthar, Nepal
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
