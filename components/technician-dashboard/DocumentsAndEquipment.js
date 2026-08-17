"use client";

import { motion } from "motion/react";
import {
  FileCheck,
  ShieldCheck,
  Upload,
  AlertCircle,
  Wrench,
  CheckCircle2,
  Calendar,
  Sparkles,
  RefreshCw,
} from "lucide-react";

export function DocumentsAndEquipment({ onUploadDocument, showToast }) {
  const documents = [
    { name: "Nepali Citizenship Certificate", status: "VERIFIED", expires: "Lifetime", icon: ShieldCheck, isOk: true },
    { name: "Motorcycle Driving License", status: "VERIFIED", expires: "Nov 2028", icon: FileCheck, isOk: true },
    { name: "Police Clearance Background Check", status: "VERIFIED", expires: "Jan 2027", icon: ShieldCheck, isOk: true },
    { name: "Technician Insurance Policy", status: "RENEWAL SOON", expires: "In 45 Days", icon: AlertCircle, isOk: false },
  ];

  const tools = [
    { name: "AC Pressure Gauge & Manifold Set", condition: "Excellent", status: "In Vehicle", replaceNeeded: false },
    { name: "Heavy Duty Bosch Impact Drill", condition: "Good", status: "In Vehicle", replaceNeeded: false },
    { name: "Digital Multimeter & Clamp Meter", condition: "Needs Calibration", status: "Calibration Due", replaceNeeded: true },
    { name: "Copper Tube Cutter & Flaring Kit", condition: "Excellent", status: "In Vehicle", replaceNeeded: false },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* LEFT: Documents Verification Card (6 cols) */}
      <div className="lg:col-span-6 rounded-3xl bg-white dark:bg-[#061812] border border-slate-200/80 dark:border-emerald-900/30 p-5 sm:p-7 shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-emerald-900/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <FileCheck size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Government KYC & Documents
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Verified background credentials for Phidim Marketplace
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500 text-white font-black text-xs shadow-sm flex items-center gap-1">
            <ShieldCheck size={14} /> VERIFIED TECH
          </span>
        </div>

        <div className="space-y-3">
          {documents.map((doc, idx) => {
            const Icon = doc.icon;

            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50/70 dark:bg-[#040e0b] border border-slate-200/80 dark:border-emerald-900/30 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    doc.isOk ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600" : "bg-amber-100 dark:bg-amber-950 text-amber-600"
                  }`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 dark:text-white">{doc.name}</h5>
                    <p className="text-[11px] text-slate-400">Expiry: {doc.expires}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    doc.isOk ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400" : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 animate-pulse"
                  }`}>
                    {doc.status}
                  </span>

                  <button
                    onClick={() => onUploadDocument(doc.name)}
                    className="p-1.5 rounded-xl bg-white dark:bg-[#061812] hover:bg-emerald-50 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-emerald-800/40"
                    title="Upload New Document"
                  >
                    <Upload size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Tools & Equipment Inventory (6 cols) */}
      <div className="lg:col-span-6 rounded-3xl bg-white dark:bg-[#061812] border border-slate-200/80 dark:border-emerald-900/30 p-5 sm:p-7 shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-emerald-900/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Wrench size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Tools & Equipment Inventory
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Service toolkit condition & replacement alerts
              </p>
            </div>
          </div>

          <button
            onClick={() => showToast("Requesting new replacement tools from Phidim Logistics...")}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <RefreshCw size={13} /> Request Gear
          </button>
        </div>

        <div className="space-y-3">
          {tools.map((tool, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50/70 dark:bg-[#040e0b] border border-slate-200/80 dark:border-emerald-900/30 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                  <Wrench size={18} />
                </div>
                <div>
                  <h5 className="font-extrabold text-slate-900 dark:text-white">{tool.name}</h5>
                  <p className="text-[11px] text-slate-400">Status: {tool.status}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                  tool.replaceNeeded ? "bg-rose-100 dark:bg-rose-950 text-rose-600 animate-pulse" : "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400"
                }`}>
                  {tool.condition}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
