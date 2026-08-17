import { useState } from "react";
import { FIBER_PACKAGES } from "../data/services";
import { Wifi, Tv, CheckCircle2, PhoneCall, ShieldCheck, Zap } from "lucide-react";
export const DishHomeSection = ({ onOrderPackage }) => {
  const [billingCycle, setBillingCycle] = useState("YEARLY");
  return <section className="bg-gradient-to-b from-blue-900 via-slate-900 to-gray-900 text-white py-12 px-4 md:px-8">
    <div className="max-w-7xl mx-auto">

      {
        /* Header */
      }
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-bold border border-blue-400/30 mb-3">
          <Wifi className="w-4 h-4 text-cyan-400" />
          <span>AUTHORIZE DISH HOME DTH DISTRIBUTOR IN PHIDIM</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
          DishHome DTH Plans
        </h2>
        <p className="text-xs md:text-sm text-gray-300">
          High-speed optical fiber internet + Free iTV Setup Box with 250+ HD Live TV Channels across Phidim & Panchthar district.
        </p>

        {
          /* Toggle Billing */
        }
        <div className="inline-flex items-center bg-white/10 p-1 rounded-xl border border-white/20 mt-6 text-xs font-bold">
          <button
            onClick={() => setBillingCycle("YEARLY")}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${billingCycle === "YEARLY" ? "bg-cyan-500 text-gray-900 font-extrabold shadow-md" : "text-gray-300 hover:text-white"}`}
          >
            12 Months Plan (Best Value - Free Router)
          </button>
          <button
            onClick={() => setBillingCycle("MONTHLY")}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${billingCycle === "MONTHLY" ? "bg-cyan-500 text-gray-900 font-extrabold shadow-md" : "text-gray-300 hover:text-white"}`}
          >
            Monthly Plan
          </button>
        </div>
      </div>

      {/* Official DishHome DTH Banner Image */}
      <div className="mb-10 w-full rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-slate-950/80 p-3">
        <img
          src="/image.png"
          alt="DishHome DTH Authorized Connection Phidim"
          className="w-full h-64 sm:h-80 md:h-[420px] lg:h-[500px] object-cover rounded-2xl shadow-2xl transform hover:scale-[1.01] transition-transform duration-500"
        />
      </div>

      {
        /* Pricing Cards */
      }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FIBER_PACKAGES.map((pkg) => {
          const price = billingCycle === "YEARLY" ? pkg.priceYearly : pkg.priceMonthly;
          return <div
            key={pkg.id}
            className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${pkg.popular ? "bg-gradient-to-b from-blue-600/90 to-blue-800/90 border-2 border-cyan-400 shadow-2xl scale-105 z-10" : "bg-white/10 backdrop-blur-md border border-white/15 hover:border-white/30"}`}
          >
            {pkg.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-950 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              MOST POPULAR IN PHIDIM
            </div>}

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-cyan-300 tracking-tight">
                  {pkg.speed}
                </span>
                <div className="flex items-center gap-1 text-[11px] text-gray-300 bg-white/10 px-2 py-1 rounded-md">
                  <Tv className="w-3.5 h-3.5 text-cyan-300" />
                  <span>{pkg.channelsCount}+ Channels</span>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-extrabold text-white">
                  Rs. {price.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-gray-300 ml-1 font-semibold">
                  / {billingCycle === "YEARLY" ? "year" : "month"}
                </span>
                {billingCycle === "YEARLY" && <div className="text-[10px] text-green-400 font-bold mt-1 flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-current" />
                  <span>Save Rs. 1,600/yr + Free Drop Fiber Wire</span>
                </div>}
              </div>

              <div className="space-y-2.5 mb-8 text-xs text-gray-200">
                {pkg.features.map((feat, idx) => <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>)}
              </div>
            </div>

            <button
              onClick={() => onOrderPackage(pkg)}
              className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg ${pkg.popular ? "bg-cyan-400 hover:bg-cyan-300 text-gray-950 font-black" : "bg-white/20 hover:bg-white/30 text-white border border-white/20"}`}
            >
              Book Fiber Connection
            </button>
          </div>;
        })}
      </div>

      {
        /* Local Support Callout */
      }
      <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-400/30">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Need immediate Fiber Installation in Phidim?</h4>
            <p className="text-xs text-gray-300">
              Our technicians are stationed locally in Phidim Bazaar, Panchthar for same-day drop wire setup.
            </p>
          </div>
        </div>
        <a
          href="tel:+9779862772457"
          className="bg-green-500 hover:bg-green-600 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-lg flex items-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Call Phidim Hub: +977 986-2772457</span>
        </a>
      </div>

    </div>
  </section>;
};
