"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  Clock,
  PhoneCall,
  MapPin,
  Camera,
  FileCheck,
  ShieldCheck,
  Zap,
  Upload,
  AlertTriangle,
  Sparkles,
  PenTool,
  Check,
  X,
  Play,
  RotateCcw,
} from "lucide-react";

export function ActiveJobAndChecklist({
  activeJob,
  onCompleteJob,
  onCancelJob,
  onOpenSignatureModal,
  onOpenPhotoModal,
  onCallCustomer,
  showToast,
}) {
  // OTP Verification state
  const [otpDigits, setOtpDigits] = useState(["4", "9", "1", "2"]);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState(false);

  // Job Progress Step: 0: Accepted, 1: Navigating, 2: Arrived, 3: In Progress, 4: Completed
  const [currentStep, setCurrentStep] = useState(3);

  // Live Timer
  const [seconds, setSeconds] = useState(2535); // ~42m 15s
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs > 0 ? hrs.toString().padStart(2, "0") + ":" : ""}${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Service Checklist State
  const [checklist, setChecklist] = useState({
    inspection: true,
    problemIdentified: true,
    repairCompleted: true,
    customerVerified: true,
    paymentReceived: false,
    signatureCollected: false,
  });

  const toggleChecklistItem = (key) => {
    setChecklist((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      showToast(`Checklist updated: ${key.replace(/([A-Z])/g, " $1")}`);
      return next;
    });
  };

  const handleVerifyOtp = () => {
    const entered = otpDigits.join("");
    if (entered === "4912" || entered.length === 4) {
      setIsOtpVerified(true);
      setOtpError(false);
      showToast("Customer OTP Verified Successfully! Service Timer Active.");
    } else {
      setOtpError(true);
      showToast("Invalid OTP code. Please ask customer for the correct 4-digit code.");
    }
  };

  // Before & After Photos Mock
  const [beforePhotos, setBeforePhotos] = useState([
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80",
  ]);
  const [afterPhotos, setAfterPhotos] = useState([
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
  ]);

  if (!activeJob) {
    return (
      <div className="rounded-3xl bg-white dark:bg-[#061812] border border-slate-200/80 dark:border-emerald-900/30 p-8 shadow-xl text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
          <Zap size={32} />
        </div>
        <h3 className="text-lg font-black text-slate-900 dark:text-white">No Active Job Currently</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Accept a job request from the list above to launch the real-time job control center, OTP customer verification, photo uploader, and service checklist.
        </p>
      </div>
    );
  }

  const allChecked = Object.values(checklist).every(Boolean);

  return (
    <div className="rounded-3xl bg-white dark:bg-[#061812] border border-slate-200/80 dark:border-emerald-900/30 p-5 sm:p-7 shadow-xl space-y-7">
      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-emerald-900/20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 font-extrabold">
              <Zap size={24} />
            </div>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping ring-2 ring-white dark:ring-[#061812]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Active Job Control Center
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono font-bold text-xs">
                {activeJob.id}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {activeJob.serviceName} • {activeJob.customerName}
            </p>
          </div>
        </div>

        {/* Live Timer Widget */}
        <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/50 px-4 py-2 rounded-2xl">
          <Clock size={20} className="text-emerald-600 dark:text-emerald-400 animate-spin" />
          <div className="leading-tight">
            <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-bold uppercase tracking-wider">
              Elapsed Service Time
            </span>
            <p className="text-lg font-black text-emerald-950 dark:text-emerald-200 font-mono">
              {formatTimer(seconds)}
            </p>
          </div>
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="ml-2 p-1.5 rounded-xl bg-white dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-100 transition-all"
            title={isTimerRunning ? "Pause Timer" : "Start Timer"}
          >
            <Play size={14} className={isTimerRunning ? "fill-current" : ""} />
          </button>
        </div>
      </div>

      {/* Progress Timeline Stepper */}
      <div className="space-y-2">
        <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Job Execution Progress
        </h4>
        <div className="grid grid-cols-5 gap-2 text-center text-[11px] font-bold">
          {["Accepted", "On The Way", "Arrived", "In Progress", "Completed"].map((stepLabel, idx) => {
            const isCompletedStep = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={stepLabel}
                onClick={() => setCurrentStep(idx)}
                className={`cursor-pointer p-2.5 rounded-2xl border transition-all ${
                  isCompletedStep
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-md"
                    : isCurrent
                    ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-500 font-black shadow-lg animate-pulse"
                    : "bg-slate-100 dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800"
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  {isCompletedStep ? <Check size={14} /> : <span>Step {idx + 1}</span>}
                </div>
                <span className="hidden sm:block text-[10px] mt-0.5 truncate">{stepLabel}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: LEFT (OTP & Notes & Photos) vs RIGHT (Interactive Checklist & Complete) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Customer OTP Verification Widget */}
          <div className={`p-5 rounded-3xl border transition-all ${
            isOtpVerified
              ? "bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700/50"
              : "bg-amber-50/70 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/50"
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className={isOtpVerified ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"} />
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  Customer Security OTP Verification
                </h4>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                isOtpVerified ? "bg-emerald-500 text-white" : "bg-amber-500 text-white animate-pulse"
              }`}>
                {isOtpVerified ? "VERIFIED" : "PENDING OTP"}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
              Ask customer <strong>{activeJob.customerName}</strong> for the 4-digit start PIN provided in their app booking receipt.
            </p>

            <div className="flex items-center gap-3">
              <div className="flex gap-2 flex-1 max-w-[200px]">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const val = e.target.value;
                      const next = [...otpDigits];
                      next[idx] = val;
                      setOtpDigits(next);
                    }}
                    disabled={isOtpVerified}
                    className="w-10 h-11 text-center font-mono font-black text-lg rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-emerald-800 text-slate-900 dark:text-white shadow-inner focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                ))}
              </div>

              {!isOtpVerified ? (
                <button
                  onClick={handleVerifyOtp}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
                >
                  Verify OTP
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={16} /> PIN Validated!
                </span>
              )}
            </div>
            {otpError && (
              <p className="text-[11px] font-bold text-rose-500 mt-2 flex items-center gap-1">
                <AlertTriangle size={12} /> Incorrect PIN code. Default test code is 4912.
              </p>
            )}
          </div>

          {/* Job Notes & Inspection Details */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-[#040e0b] border border-slate-200 dark:border-emerald-900/30 space-y-3">
            <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Job Notes & Customer Instructions
            </h4>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#061812] border border-slate-200/80 dark:border-emerald-900/20 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium space-y-2">
              <p className="italic">
                "{activeJob.description || "AC cooling efficiency low, minor gas leakage near outer condenser unit."}"
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Address: {activeJob.address}</span>
                <button
                  onClick={() => onCallCustomer(activeJob)}
                  className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
                >
                  <PhoneCall size={12} /> Call Customer
                </button>
              </div>
            </div>
          </div>

          {/* Upload Before & After Photos */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-[#040e0b] border border-slate-200 dark:border-emerald-900/30 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Camera size={14} className="text-emerald-500" /> Before & After Photos
              </h4>
              <button
                onClick={onOpenPhotoModal}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Upload size={13} /> Add Photo
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Before Work</span>
                <div className="relative group overflow-hidden rounded-2xl border border-slate-200 dark:border-emerald-900/30 aspect-video bg-slate-200 dark:bg-slate-800">
                  <img
                    src={beforePhotos[0]}
                    alt="Before service"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-lg bg-black/60 text-white text-[9px] font-mono">
                    Before #1
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">After Work</span>
                <div className="relative group overflow-hidden rounded-2xl border border-slate-200 dark:border-emerald-900/30 aspect-video bg-slate-200 dark:bg-slate-800">
                  <img
                    src={afterPhotos[0]}
                    alt="After service"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-lg bg-emerald-600 text-white text-[9px] font-mono">
                    After #1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (6 cols): Service Checklist & Completion Trigger */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#040e0b] border border-slate-200 dark:border-emerald-900/30 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-emerald-900/20">
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  Mandatory Service Checklist
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Verify all tasks before submitting completion certificate
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                {Object.values(checklist).filter(Boolean).length} / 6 Completed
              </span>
            </div>

            {/* Checklist items */}
            <div className="space-y-2.5">
              {[
                { key: "inspection", label: "Initial Inspection Done", sub: "Visual and electrical diagnosis completed" },
                { key: "problemIdentified", label: "Problem Identified & Solved", sub: "Compressor / wiring / gas leak fixed" },
                { key: "repairCompleted", label: "Repair & Servicing Completed", sub: "Cleaned filters and tested cooling pressure" },
                { key: "customerVerified", label: "Customer Demonstration Verified", sub: "Customer confirmed service quality" },
                { key: "paymentReceived", label: "Payment Collected (Cash/Esewa)", sub: activeJob.payment },
                { key: "signatureCollected", label: "Digital Signature Collected", sub: "Customer sign-off on job slip" },
              ].map((item) => {
                const isChecked = checklist[item.key];

                return (
                  <motion.div
                    key={item.key}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (item.key === "signatureCollected" && !isChecked) {
                        onOpenSignatureModal();
                      } else {
                        toggleChecklistItem(item.key);
                      }
                    }}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl cursor-pointer border transition-all ${
                      isChecked
                        ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700/50"
                        : "bg-white dark:bg-[#061812] border-slate-200 dark:border-emerald-900/30 hover:border-emerald-400"
                    }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                      isChecked
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-xs"
                        : "bg-transparent border-slate-300 dark:border-emerald-800"
                    }`}>
                      {isChecked && <Check size={14} className="stroke-[3]" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-xs font-bold ${isChecked ? "text-emerald-900 dark:text-emerald-200 line-through" : "text-slate-900 dark:text-white"}`}>
                          {item.label}
                        </p>
                        {item.key === "signatureCollected" && (
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <PenTool size={11} /> {isChecked ? "Signed" : "Sign Now"}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {item.sub}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Complete Service Trigger */}
            <div className="pt-3 space-y-2">
              <button
                onClick={() => {
                  if (!isOtpVerified) {
                    showToast("Please verify customer OTP before completing job!");
                    return;
                  }
                  onCompleteJob(activeJob);
                }}
                className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 ${
                  allChecked && isOtpVerified
                    ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white shadow-emerald-600/30"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white opacity-90"
                }`}
              >
                <CheckCircle2 size={18} />
                <span>Complete Service & Issue Invoice</span>
              </button>

              <button
                onClick={() => onCancelJob(activeJob.id)}
                className="w-full py-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600 dark:text-rose-400 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <X size={15} />
                <span>Cancel Active Job</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
