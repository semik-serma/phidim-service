import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { AuthProvider } from "@/context/AuthContext";
import { CallProvider } from "@/components/calls/CallProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://phidimservice.com.np"),
  title: {
    default: "Phidim | Phidim Service - No. 1 Local Services & Home Technicians in Phidim, Panchthar, Nepal",
    template: "%s | Phidim Service - Phidim, Panchthar",
  },
  description:
    "Official Phidim Service platform (फिदिम सेवा) in Phidim, Panchthar, Nepal. Book verified local electricians, plumbers, DishHome technicians, CCTV camera installers, FiberNet internet specialists, and computer repair experts across all 14 wards of Phidim Municipality.",
  keywords: [
    // Primary head keywords
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
    
    // Core service + location keywords
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
    
    // Phidim Specific Areas / Wards
    "Phidim Ward 1",
    "Phidim Ward 2",
    "Phidim Ward 4",
    "Phidim Gadhi",
    "Phidim Pragati Chowk",
    "Phidim Thado Line",
    "Phidim Salleri",
    "Panchthar Nepal",
    "Ranke Bazaar",
    "Yasok Panchthar",
    
    // Nepali Keywords (High search volume for local searches)
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
  authors: [
    { name: "Dhanraj Serma", url: "https://phidimservice.com.np" },
    { name: "Semik Serma", url: "https://phidimservice.com.np" }
  ],
  creator: "Phidim Service Team",
  publisher: "Phidim Service",
  category: "Home Services & Technical Support",
  applicationName: "Phidim Service",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  
  openGraph: {
    title: "Phidim Service | No. 1 Local Services in Phidim, Panchthar, Nepal",
    description: "Connect with certified local technicians for doorstep electrical, plumbing, fiber internet, CCTV, DishHome, and AC repair in Phidim and Panchthar, Nepal.",
    url: "https://phidimservice.com.np",
    siteName: "Phidim Service",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Phidim Service - Local Services in Phidim, Panchthar, Nepal"
      }
    ],
    type: "website",
    locale: "en_US",
    alternateLocale: ["ne_NP"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Phidim Service | Local Services in Phidim, Panchthar",
    description: "Professional on-site technical services in Phidim, Panchthar, Nepal. Certified electricians, plumbers, DishHome, CCTV & FiberNet.",
    images: ["/logo.png"]
  },
  other: {
    "geo.region": "NP-KO",
    "geo.placename": "Phidim, Panchthar, Koshi Province, Nepal",
    "geo.position": "27.1485;87.7634",
    "ICBM": "27.1485, 87.7634",
    "DC.title": "Phidim Service - Local Services & Home Technicians in Phidim, Nepal",
    "DC.creator": "Dhanraj Serma",
    "DC.subject": "Phidim Local Services, Electrician Phidim, Plumber Phidim, CCTV Phidim, FiberNet Phidim",
    "DC.coverage": "Phidim, Panchthar, Koshi Province, Nepal"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} font-site`} suppressHydrationWarning>
      <head>
        <meta name="geo.region" content="NP-KO" />
        <meta name="geo.placename" content="Phidim, Panchthar, Nepal" />
        <meta name="geo.position" content="27.1485;87.7634" />
        <meta name="ICBM" content="27.1485, 87.7634" />
        <meta name="city" content="Phidim" />
        <meta name="country" content="Nepal" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var origError = console.error;
                var origWarn = console.warn;
                function shouldIgnore(args) {
                  var str = '';
                  for (var i = 0; i < args.length; i++) {
                    var item = args[i];
                    if (typeof item === 'string') str += ' ' + item;
                    else if (item && item.message) str += ' ' + item.message;
                    else if (item && item.stack) str += ' ' + item.stack;
                    else {
                      try { str += ' ' + JSON.stringify(item); } catch (e) {}
                    }
                  }
                  return (
                    str.indexOf('bis_skin_checked') !== -1 ||
                    str.indexOf('bis_register') !== -1 ||
                    str.indexOf('__processed_') !== -1 ||
                    str.indexOf('chrome-extension://') !== -1 ||
                    str.indexOf('moz-extension://') !== -1 ||
                    str.indexOf('safari-extension://') !== -1 ||
                    str.indexOf('eppiocemhmnlbhjplcgkofciiegomcon') !== -1 ||
                    str.indexOf('requests.js') !== -1 ||
                    str.indexOf('executors/') !== -1 ||
                    str.indexOf('hydration-mismatch') !== -1 ||
                    str.indexOf('A tree hydrated but some attributes') !== -1 ||
                    str.indexOf('did not match') !== -1 ||
                    str.indexOf('Extra attributes from the server') !== -1 ||
                    (str.indexOf('Failed to fetch') !== -1 && (str.indexOf('extension') !== -1 || str.indexOf('requests.js') !== -1 || str.indexOf('executors') !== -1))
                  );
                }
                console.error = function() {
                  if (shouldIgnore(arguments)) return;
                  return origError.apply(console, arguments);
                };
                console.warn = function() {
                  if (shouldIgnore(arguments)) return;
                  return origWarn.apply(console, arguments);
                };
                function handleErr(event) {
                  if (!event) return;
                  
                  // Suppress resource loading error events (img, script, link, audio, video) from bubbling to overlay
                  if (event.target && (event.target instanceof HTMLImageElement || event.target instanceof HTMLScriptElement || event.target instanceof HTMLLinkElement || event.target instanceof HTMLMediaElement)) {
                    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                    if (event.preventDefault) event.preventDefault();
                    return true;
                  }

                  // Suppress unhandled promise rejections that reject with an Event or empty object or extension
                  if (event.type === 'unhandledrejection') {
                    var reason = event.reason;
                    if (!reason || reason instanceof Event || (typeof reason === 'object' && !reason.message && !reason.stack)) {
                      if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                      if (event.preventDefault) event.preventDefault();
                      return true;
                    }
                  }

                  // Suppress generic error events where error object is missing (turns into [object Event])
                  if (event.type === 'error' && !event.error && !event.message) {
                    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                    if (event.preventDefault) event.preventDefault();
                    return true;
                  }

                  var src = '';
                  try {
                    src = (event.filename || '') + ' ' +
                          (event.message || '') + ' ' +
                          (event.error && (event.error.stack || event.error.message || String(event.error))) + ' ' +
                          (event.reason && (event.reason.stack || event.reason.message || String(event.reason))) + ' ' +
                          String(event);
                  } catch(e) {}

                  if (
                    typeof src === 'string' && (
                      src.indexOf('chrome-extension://') !== -1 ||
                      src.indexOf('moz-extension://') !== -1 ||
                      src.indexOf('safari-extension://') !== -1 ||
                      src.indexOf('eppiocemhmnlbhjplcgkofciiegomcon') !== -1 ||
                      src.indexOf('requests.js') !== -1 ||
                      src.indexOf('executors/') !== -1 ||
                      src.indexOf('bis_skin_checked') !== -1 ||
                      src.indexOf('bis_register') !== -1 ||
                      src.indexOf('hydration-mismatch') !== -1 ||
                      src.indexOf('[object Event]') !== -1 ||
                      (src.indexOf('Failed to fetch') !== -1 && (src.indexOf('extension') !== -1 || src.indexOf('requests.js') !== -1 || src.indexOf('executors') !== -1))
                    )
                  ) {
                    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                    if (event.preventDefault) event.preventDefault();
                    return true;
                  }
                }
                window.addEventListener('error', handleErr, true);
                window.addEventListener('unhandledrejection', handleErr, true);

                // Instantly remove extension attributes to avoid React hydration mismatches
                try {
                  var observer = new MutationObserver(function(mutations) {
                    for (var i = 0; i < mutations.length; i++) {
                      var m = mutations[i];
                      if (m.type === 'attributes' && (m.attributeName === 'bis_skin_checked' || m.attributeName === 'bis_register')) {
                        m.target.removeAttribute(m.attributeName);
                      }
                      if (m.addedNodes) {
                        for (var j = 0; j < m.addedNodes.length; j++) {
                          var node = m.addedNodes[j];
                          if (node && node.nodeType === 1) {
                            if (node.hasAttribute('bis_skin_checked')) node.removeAttribute('bis_skin_checked');
                            if (node.hasAttribute('bis_register')) node.removeAttribute('bis_register');
                          }
                        }
                      }
                    }
                  });
                  if (document.documentElement) {
                    observer.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ['bis_skin_checked', 'bis_register'] });
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={`antialiased font-site ${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
        <AuthProvider>
          <CallProvider>
            {children}
            <Toaster />
          </CallProvider>
        </AuthProvider>
      </body>
    </html>
  );
}