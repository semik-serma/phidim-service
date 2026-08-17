"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, PhoneCall, MessageCircle, ChevronDown, ShieldAlert, Sparkles } from "lucide-react";

export function HelpCenterWidget() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    { q: "How fast will the technician arrive in Phidim?", a: "For standard bookings, technicians arrive within your selected time slot. For emergency dispatches, our nearest field specialist arrives in 20-30 minutes." },
    { q: "What payment methods are supported?", a: "We accept eSewa, Khalti, IME Pay, Debit/Credit Cards, Direct Bank Transfer, and Cash on Delivery after work inspection." },
    { q: "Is there a service guarantee on technical work?", a: "Yes! All services booked on Phidim Service include a 30-day labor warranty and 100% satisfaction guarantee." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 dark:bg-slate-900/90 rounded-[26px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6 space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <HelpCircle className="text-emerald-500" size={22} />
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Help & Support Center
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            24/7 dedicated customer assistance in Panchthar
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="tel:+9779862772457"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
          >
            <PhoneCall size={14} />
            <span>Call +977 9862772457</span>
          </a>

          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold transition-colors border border-blue-500/20">
            <MessageCircle size={14} />
            <span>Live Chat</span>
          </button>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          Frequently Asked Questions
        </h4>

        <div className="space-y-2">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-4 text-left font-extrabold text-xs text-slate-900 dark:text-white flex items-center justify-between gap-3"
              >
                <span>{item.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform ${openFaq === index ? "rotate-180 text-emerald-500" : ""}`}
                />
              </button>

              {openFaq === index && (
                <div className="px-4 pb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
