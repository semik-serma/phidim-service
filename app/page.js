import { SpaRoot } from "@/components/SpaRoot";

export const metadata = {
  title: "Phidim | Phidim Service - No. 1 Local Services & Home Technicians in Phidim, Panchthar, Nepal",
  description: "Official Phidim Service platform (फिदिम सेवा) in Phidim, Panchthar, Nepal. Get verified electricians, plumbers, DishHome technicians, CCTV camera installers, FiberNet internet specialists, and computer repair experts at your doorstep in Phidim.",
  keywords: [
    // Head & Primary keywords
    "Phidim",
    "Phidim Service",
    "Phidim Services",
    "phidimservice",
    "Phidim Nepal",
    "Phidim Panchthar",
    "Phidim Bazaar",
    "Phidim Municipality",
    "Phidim Koshi Province",
    "Phidim City",
    
    // Core local service queries
    "services in Phidim",
    "local services Phidim",
    "technician Phidim",
    "technicians in Phidim",
    "home services Phidim",
    "electrician in Phidim",
    "plumber in Phidim",
    "CCTV installation Phidim",
    "DishHome Phidim",
    "FiberNet Phidim",
    "internet service Phidim",
    "computer repair Phidim",
    "laptop repair Phidim",
    "AC service Phidim",
    "house wiring Phidim",
    "water pump repair Phidim",
    "LAN networking Phidim",
    "inverter repair Phidim",
    
    // Phidim municipal wards & landmarks
    "Phidim Ward 1",
    "Phidim Ward 2",
    "Phidim Ward 3",
    "Phidim Ward 4",
    "Phidim Gadhi",
    "Phidim Pragati Chowk",
    "Phidim Thado Line",
    "Phidim Salleri",
    "Phidim Campus Road",
    "Phidim Hospital Road",
    "Ranke Bazaar",
    "Yasok Panchthar",
    
    // Nepali Language Keywords (High Local Traffic)
    "फिदिम",
    "फिदिम सेवा",
    "फिदिम पाँचथर",
    "फिदिम बजार",
    "फिदिम नगरपालिका",
    "फिदिम इलेक्ट्रिसियन",
    "फिदिम प्लम्बर",
    "फिदिम सिसीटिभी",
    "फिदिम इन्टरनेट",
    "फिदिम डिसहोम",
    "फिदिम कम्प्युटर मर्मत",
    "फिदिम एसी मर्मत",
    "फिदिम होम सर्भिस",
    "पाँचथर सेवा"
  ],
  alternates: {
    canonical: "https://phidimservice.com.np",
  },
  openGraph: {
    title: "Phidim Service | No. 1 Local Services in Phidim, Panchthar, Nepal",
    description: "Connect with certified local technicians for doorstep electrical, plumbing, fiber internet, CCTV, DishHome, and AC repair across Phidim and Panchthar.",
    url: "https://phidimservice.com.np",
    siteName: "Phidim Service",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Phidim Service - Local Services in Phidim, Panchthar, Nepal",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phidim Service | No. 1 Local Services in Phidim, Panchthar",
    description: "On-demand doorstep technicians and home services across Phidim Municipality and Panchthar District, Nepal.",
    images: ["/logo.png"],
  },
  other: {
    "geo.region": "NP-KO",
    "geo.placename": "Phidim, Panchthar, Koshi Province, Nepal",
    "geo.position": "27.1485;87.7634",
    "ICBM": "27.1485, 87.7634",
    "DC.title": "Phidim Service - Local Services in Phidim, Nepal",
    "DC.creator": "Dhanraj Serma",
    "DC.coverage": "Phidim, Panchthar, Nepal"
  }
};

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://phidimservice.com.np/#website",
    "name": "Phidim Service",
    "alternateName": [
      "Phidim",
      "Phidim Services",
      "PhidimService",
      "फिदिम",
      "फिदिम सेवा",
      "Phidim Nepal",
      "Phidim Panchthar",
      "Phidim Bazaar Local Services",
      "Phidim Service Platform"
    ],
    "url": "https://phidimservice.com.np",
    "about": {
      "@type": "Place",
      "name": "Phidim",
      "alternateName": "फिदिम",
      "description": "Phidim is the municipality and headquarters of Panchthar District in Koshi Province of eastern Nepal.",
      "sameAs": [
        "https://en.wikipedia.org/wiki/Phidim",
        "https://ne.wikipedia.org/wiki/%E0%A4%AB%E0%A4%BF%E0%A4%A6%E0%A4%BF%E0%A4%AE",
        "https://www.wikidata.org/wiki/Q3428938"
      ],
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 27.1485,
        "longitude": 87.7634
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://phidimservice.com.np/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://phidimservice.com.np/#organization",
    "name": "Phidim Service",
    "alternateName": ["फिदिम सेवा", "Phidim Service Nepal"],
    "url": "https://phidimservice.com.np",
    "logo": "https://phidimservice.com.np/logo.png",
    "founder": [
      {
        "@type": "Person",
        "name": "Dhanraj Serma",
        "jobTitle": "Founder & Technical Lead",
        "sameAs": "https://www.facebook.com/dhanraj.serma.14"
      },
      {
        "@type": "Person",
        "name": "Semik Serma",
        "jobTitle": "Lead Developer & Co-Founder",
        "sameAs": "https://www.linkedin.com/in/semik-serma-8263a3391/"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/dhanraj.serma.14",
      "https://www.youtube.com/@semikserma",
      "https://www.linkedin.com/in/semik-serma-8263a3391/",
      "https://en.wikipedia.org/wiki/Phidim"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+9779862772457",
      "contactType": "customer service",
      "areaServed": ["NP", "NP-KO", "Phidim", "Panchthar"],
      "availableLanguage": ["Nepali", "English"]
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "EmergencyService"],
    "@id": "https://phidimservice.com.np/#localbusiness",
    "name": "Phidim Service",
    "alternateName": ["फिदिम सेवा", "Phidim Service Platform", "Phidim Local Technicians Hub"],
    "url": "https://phidimservice.com.np",
    "logo": "https://phidimservice.com.np/logo.png",
    "image": "https://phidimservice.com.np/logo.png",
    "telephone": "+9779862772457",
    "priceRange": "Rs. 300 - Rs. 15,000",
    "currenciesAccepted": "NPR",
    "paymentAccepted": "Cash, Fonepay, eSewa, Khalti, Bank Transfer",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Main Road, Ward No. 1, Phidim Bazaar",
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
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "07:00",
        "closes": "20:00"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Phidim Municipality",
        "sameAs": "https://en.wikipedia.org/wiki/Phidim"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Panchthar District",
        "sameAs": "https://en.wikipedia.org/wiki/Panchthar_District"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Koshi Province"
      }
    ],
    "knowsAbout": [
      "Phidim",
      "Panchthar",
      "Electrical Wiring and Repair",
      "Plumbing and Sanitary Fitting",
      "CCTV Security Camera Installation",
      "DishHome DTH Satellite Service",
      "DishHome FiberNet Optical Fiber Internet",
      "Computer and Laptop Hardware Repair",
      "Split Air Conditioning Jet Cleaning and Gas Refill",
      "Home Maintenance and Doorstep Technical Repairs",
      "फिदिम",
      "फिदिम सेवा"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "148",
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Phidim Service Solutions Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Electrician & House Wiring in Phidim",
            "description": "Certified electrician for residential house wiring, MCB distribution board, inverter bypass, and emergency electrical troubleshooting in Phidim, Panchthar."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Plumbing & Water Pump Repair in Phidim",
            "description": "Expert plumber for PPR/CPVC pipe leak repairs, overhead water tank switch, and water booster pump service in Phidim."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CCTV Security Camera Installation in Phidim",
            "description": "High-definition Dahua & Hikvision 4/8/16 channel CCTV camera setup with mobile app live streaming in Phidim."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "DishHome FiberNet & WiFi in Phidim",
            "description": "High-speed DishHome optical fiber internet packages and dual-band router setup across Phidim."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "DishHome DTH Satellite Service in Phidim",
            "description": "DishHome DTH dish antenna alignment, setup box activation, and HD channel tuning in Phidim."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Computer & Laptop Repair in Phidim",
            "description": "Hardware diagnostics, Windows OS installation, NVMe SSD speed upgrade, and virus removal in Phidim Bazaar."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Split AC Servicing & Gas Refill in Phidim",
            "description": "Pressure jet cleaning, R32/R410A refrigerant gas refill, and compressor diagnostics in Phidim, Panchthar."
          }
        }
      ]
    },
    "description": "Phidim Service (फिदिम सेवा) is the #1 on-demand local service platform in Phidim, Panchthar, Nepal. Connect with certified electricians, plumbers, DishHome technicians, CCTV camera installers, FiberNet internet specialists, and computer repair experts."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Phidim Service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Phidim Service (फिदिम सेवा) is the premier local on-demand service and technology platform based in Phidim, Panchthar, Nepal, connecting households and businesses with verified electricians, plumbers, DishHome technicians, CCTV installers, fiber internet technicians, and computer repair experts."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can a technician arrive in Phidim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In Phidim Bazaar, Ward 1 (Gadhi), Ward 2 (Main Bazaar), and Ward 4 (Pragati Chowk), verified technicians typically arrive at your doorstep within 30 to 45 minutes of booking."
        }
      },
      {
        "@type": "Question",
        "name": "How do I book a local service in Phidim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can book directly through the Phidim Service website, send a WhatsApp message to our dispatch team at +977 986-2772457, or call our 24/7 hotline directly."
        }
      },
      {
        "@type": "Question",
        "name": "Which areas of Phidim and Panchthar are covered?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Phidim Service covers all 14 wards of Phidim Municipality (Gadhi, Main Bazaar, Pragati Chowk, Salleri, Bharapa, Chokmagu, Siwa) as well as rural municipalities across Panchthar District including Ranke, Yasok, Rabi, and Jorpokhari."
        }
      }
    ]
  };

  return (
    <>
      {/* Structured Data Scripts for Google Search Knowledge Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Authoritative Semantic Crawl Container for Top Search Engine Ranking */}
      <div
        className="sr-only"
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          borderWidth: 0,
        }}
      >
        <header>
          <h1>Phidim Service | No. 1 Local Services & Home Technicians in Phidim, Panchthar, Nepal</h1>
          <p>
            Welcome to <strong>Phidim Service (फिदिम सेवा)</strong> — the primary on-demand local technical service platform in Phidim Municipality, Panchthar District, Koshi Province, Nepal.
            We provide fast, reliable, and verified doorstep technician services for residential homes, commercial shops, hotels, schools, and offices throughout Phidim and surrounding Panchthar areas.
          </p>
        </header>

        <section>
          <h2>About Phidim & Local Services in Phidim (फिदिम नगरपालिका)</h2>
          <p>
            Phidim (फिदिम) is the headquarters and primary commercial hub of Panchthar District in eastern Nepal. Located in the picturesque hills of Koshi Province along the Mechi Highway, Phidim connects Taplejung, Ilam, and Terhathum.
            Phidim Service provides direct access to skilled local technicians, ensuring that residents in Phidim Bazaar, Gadhi, Salleri, Pragati Chowk, and all 14 municipal wards receive professional technical assistance within 30 minutes.
          </p>
        </section>

        <section>
          <h2>Core Technical Services Available in Phidim, Panchthar</h2>
          <ul>
            <li>
              <strong>Electrician & House Wiring in Phidim (फिदिम इलेक्ट्रिसियन):</strong> Complete new home wiring, concealed and casing conduit wiring, MCB circuit breaker distribution boards, inverter and solar battery backup installations, earthing protection, and 24/7 emergency electrical fault repair.
            </li>
            <li>
              <strong>Plumbing & Sanitary Solutions in Phidim (फिदिम प्लम्बिङ सेवा):</strong> PPR and CPVC pipe heat-fusion welding, water leak repairs, bathroom sanitary fittings, overhead water tank automatic cutoff switch installations, and domestic water booster pump repairs.
            </li>
            <li>
              <strong>CCTV Camera Security Installation in Phidim (फिदिम सीसीटीभी जडान):</strong> High-definition IP and Analog 4/8/16 channel camera surveillance systems, Dahua and Hikvision setups, night-vision calibration, and mobile remote live streaming configuration for shops and homes in Phidim.
            </li>
            <li>
              <strong>DishHome FiberNet & WiFi Broadband in Phidim (फिदिम फाइबरनेट इन्टरनेट):</strong> High-speed optical fiber internet packages (50 Mbps to 200 Mbps), optical fiber drop cable splicing, dual-band 5GHz router setups, and WiFi coverage extension in Phidim Municipality.
            </li>
            <li>
              <strong>DishHome DTH Satellite Antenna Service in Phidim (फिदिम डिसहोम सेवा):</strong> Satellite dish alignment with digital spectrum meters, LNB frequency tuning, HD set-top box activation, and coaxial cabling for crystal clear television broadcasting.
            </li>
            <li>
              <strong>Computer & Laptop Repair in Phidim (फिदिम कम्प्युटर मर्मत):</strong> Genuine Windows 11/10 installation, NVMe SSD speed upgrades, RAM enhancements, motherboard thermal servicing, hardware troubleshooting, and data backup.
            </li>
            <li>
              <strong>Air Conditioning (AC) & Cooling in Phidim (फिदिम एसी मर्मत):</strong> Split AC deep pressure jet washing, R32 / R410A refrigerant gas refilling, cooling diagnostics, and compressor maintenance.
            </li>
          </ul>
        </section>

        <section>
          <h2>Phidim Municipal Wards & Service Coverage Areas</h2>
          <ul>
            <li><strong>Ward 1:</strong> Gadhi, District Administration Area, Shivalaya Temple Zone, Phidim</li>
            <li><strong>Ward 2:</strong> Main Bazaar, Thado Line, Bank Road, Commerce Zone, Phidim</li>
            <li><strong>Ward 3:</strong> Upper Phidim, Ranitar Access, Residential Areas, Phidim</li>
            <li><strong>Ward 4:</strong> Pragati Chowk, Taranagar, Campus Road, Hospital Road, Phidim</li>
            <li><strong>Ward 5:</strong> Chokmagu, Hillside Residential & Agricultural Zones, Phidim</li>
            <li><strong>Ward 6:</strong> Siwa, Valley Settlements, Phidim</li>
            <li><strong>Ward 7:</strong> Salleri, Bharapa Corridor, Road Junctions, Phidim</li>
            <li><strong>Wards 8-14:</strong> Outer Phidim Municipal Zones and Panchthar district links</li>
          </ul>
        </section>

        <section>
          <h2>Frequently Asked Questions about Phidim Service</h2>
          <dl>
            <dt>How do I book an electrician or plumber in Phidim?</dt>
            <dd>You can book online via phidimservice.com.np, message us on WhatsApp, or call +977 986-2772457. A verified local technician will be dispatched promptly.</dd>
            
            <dt>What is the technician arrival time in Phidim Bazaar?</dt>
            <dd>For central Phidim (Ward 1, Ward 2, Ward 4 Pragati Chowk), technicians arrive within 30 to 45 minutes.</dd>

            <dt>Is Phidim Service available across all Panchthar district?</dt>
            <dd>Yes, in addition to Phidim Municipality, we provide scheduled field technical visits across Ranke, Yasok, Rabi, Jorpokhari, Tharpu, and surrounding rural municipalities.</dd>
          </dl>
        </section>

        <footer>
          <address>
            Phidim Service (फिदिम सेवा) • Main Road, Ward No. 1, Phidim, Panchthar, Koshi Province, Nepal • Postal Code: 57200 • Phone / WhatsApp: +977 986-2772457 • Website: https://phidimservice.com.np
          </address>
        </footer>
      </div>

      <SpaRoot />
    </>
  );
}
