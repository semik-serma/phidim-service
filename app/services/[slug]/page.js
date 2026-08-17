import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Wrench,
  Zap,
  MapPin,
  ShieldCheck,
  ChevronRight,
  Home,
  Check,
  User,
  Clock,
  HelpCircle
} from "lucide-react";
import { SeoHeaderNavbar } from "@/components/SeoHeaderNavbar";
import { Footer } from "@/components/Footer";
import { SeoBookingSection } from "@/components/SeoBookingSection";
import { SEO_SERVICES } from "@/data/seoServicesData";
import { SERVICES } from "@/data/services";

export async function generateStaticParams() {
  return SEO_SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = SEO_SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  const keywords = [
    ...(service.nepaliKeywords || []),
    service.category,
    `${service.category} in Phidim`,
    `${service.category} Phidim`,
    "Phidim",
    "Phidim Service",
    "Phidim Services",
    "Phidim Nepal",
    "Phidim Panchthar",
    "फिदिम",
    "फिदिम सेवा"
  ];

  return {
    title: `${service.title} | Phidim Service`,
    description: service.description,
    keywords,
    alternates: {
      canonical: `https://phidimservice.com.np/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Phidim Service`,
      description: service.description,
      url: `https://phidimservice.com.np/services/${service.slug}`,
      images: [
        {
          url: service.imageUrl,
          width: 600,
          height: 400,
          alt: service.title,
        },
      ],
      type: "website",
      locale: "en_US",
      alternateLocale: ["ne_NP"]
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Phidim Service`,
      description: service.description,
      images: [service.imageUrl],
    },
    other: {
      "geo.region": "NP-KO",
      "geo.placename": "Phidim, Panchthar, Koshi Province, Nepal",
      "geo.position": "27.1485;87.7634",
      "ICBM": "27.1485, 87.7634"
    }
  };
}

export default async function ServiceDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = SEO_SERVICES.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  // Cross-reference original catalog services
  const catalogService = SERVICES.find((s) => s.id === service.serviceId) || {
    basePrice: 500,
    priceUnit: "per visit",
    duration: "1-2 hours",
    warranty: "30 Days Warranty",
    checklist: [
      "Certified local technical assessment",
      "Genuine spare parts and diagnostic tools",
      "Doorstep delivery and post-service warranty support"
    ]
  };

  // Structured Data Schemas
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
        "name": "Services",
        "item": "https://phidimservice.com.np/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.category,
        "item": `https://phidimservice.com.np/services/${service.slug}`
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://phidimservice.com.np/services/${service.slug}#localbusiness`,
    "name": `Phidim Service - ${service.category}`,
    "image": service.imageUrl,
    "telephone": "+9779862772457",
    "priceRange": "NPR",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Main Road, Ward No. 1",
      "addressLocality": "Phidim",
      "addressRegion": "Panchthar, Koshi Province",
      "postalCode": "57200",
      "addressCountry": "NP"
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Dynamic JSON-LD Schema Script Blocks */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <SeoHeaderNavbar activeTabName="ALL SERVICES" />

      {/* Breadcrumbs Component */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-600 font-medium">
          <Link href="/" className="hover:text-green-600 flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/panchthar" className="hover:text-green-600">
            <span>Panchthar</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/services" className="hover:text-green-600">
            <span>Services</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">{service.category}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Detailed Service Context */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Header Description */}
            <div className="space-y-4">
              <span className="text-[10px] bg-green-50 text-green-700 font-black px-3 py-1 rounded-full border border-green-200 uppercase tracking-wider">
                Certified Service Provider
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-gray-950 tracking-tight leading-tight">
                {service.h1}
              </h1>
              <p className="text-sm text-gray-700 leading-relaxed font-semibold">
                {service.intro}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                {service.explanation}
              </p>
            </div>

            {/* Sub-Service Checklist from master catalog */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-gray-950 border-b border-gray-100 pb-3 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-green-600" />
                <span>Service Inclusions & Checklist</span>
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {catalogService.checklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                    <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-800 font-bold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legitimate Technicians list */}
            <div className="space-y-4">
              <h2 className="text-lg font-black text-gray-950 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <span>Available Local Technicians in Phidim</span>
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                We assign certified, real specialists covering Panchthar district. Connect directly or request a booking dispatch:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.technicians.map((tech, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-3xl p-5 shadow-xs flex items-center gap-4 hover:border-blue-300 transition-colors">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 shrink-0">
                      <img
                        src={tech.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                        alt={`${tech.name} avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xs sm:text-sm font-black text-gray-950">{tech.name}</h3>
                      <p className="text-[10px] text-green-600 font-extrabold uppercase">{tech.specialty}</p>
                      <p className="text-[10px] text-gray-500 font-semibold">{tech.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="space-y-4">
              <h2 className="text-lg font-black text-gray-950 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-purple-600" />
                <span>Frequently Asked Questions</span>
              </h2>
              <div className="space-y-3">
                {service.faqs.map((faq, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4.5 shadow-xs space-y-2">
                    <h3 className="text-xs sm:text-sm font-black text-gray-900 flex items-start gap-2">
                      <span className="text-green-600">Q:</span>
                      <span>{faq.q}</span>
                    </h3>
                    <p className="text-xs text-gray-600 pl-4 font-semibold leading-relaxed border-l-2 border-green-500">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographic Location Hub Links */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <h4 className="text-xs font-black text-gray-500 uppercase tracking-wider">Service Coverage Hubs</h4>
              <div className="flex flex-wrap gap-2.5">
                <Link
                  href="/phidim"
                  className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-extrabold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Phidim Municipality Hub (Wards 1-14)</span>
                </Link>
                <Link
                  href="/panchthar"
                  className="bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 text-xs font-extrabold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Panchthar District Regional Hub</span>
                </Link>
              </div>
            </div>

            {/* Cross-linking Related Services */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <h4 className="text-xs font-black text-gray-500 uppercase tracking-wider">Related Services in Panchthar</h4>
              <div className="flex flex-wrap gap-2">
                {service.relatedServices.map((relSlug) => {
                  const matchedRel = SEO_SERVICES.find((s) => s.slug === relSlug);
                  if (!matchedRel) return null;
                  return (
                    <Link
                      key={relSlug}
                      href={`/services/${relSlug}`}
                      className="bg-gray-100 hover:bg-green-50 hover:text-green-700 border border-gray-200 hover:border-green-300 text-xs font-bold text-gray-700 px-3.5 py-1.5 rounded-xl transition-all"
                    >
                      {matchedRel.category} Service
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Sidebar Package Info & CTA */}
          <div className="space-y-6">
            
            {/* Package Summary Card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs space-y-6 sticky top-28">
              
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
                <img
                  src={service.imageUrl}
                  alt={`${service.category} service preview image`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black text-gray-950 uppercase tracking-wide border-b border-gray-100 pb-2">
                  Pricing & Details
                </h3>

                <div className="space-y-3 text-xs text-gray-800 font-bold">
                  <div className="flex justify-between items-center bg-gray-50 p-2.5 rounded-xl border border-gray-200/80">
                    <span className="text-gray-500">Base Service Rate:</span>
                    <span className="text-green-700 font-black text-sm">
                      Rs. {catalogService.basePrice?.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2">
                    <span className="text-gray-500">Service Unit:</span>
                    <span className="text-gray-950 font-semibold">{catalogService.priceUnit || "per unit"}</span>
                  </div>

                  <div className="flex justify-between items-center p-2">
                    <span className="text-gray-500">Average Duration:</span>
                    <span className="text-gray-950 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{catalogService.duration}</span>
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2">
                    <span className="text-gray-500">Warranty Cover:</span>
                    <span className="text-emerald-700 font-extrabold">{catalogService.warranty}</span>
                  </div>
                </div>

                <SeoBookingSection serviceId={service.serviceId} serviceTitle={service.h1} />
              </div>

              {/* Service Areas inside Sidebar */}
              <div className="border-t border-gray-100 pt-5 space-y-3">
                <h4 className="text-xs font-black text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>Coverage Regions</span>
                </h4>
                <ul className="space-y-2">
                  {service.serviceAreas.map((area, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
