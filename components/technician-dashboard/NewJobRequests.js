"use client";

import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  MapPin,
  Clock,
  Banknote,
  PhoneCall,
  CheckCircle2,
  XCircle,
  Eye,
  Star,
  AlertTriangle,
  User,
  Navigation,
  Check,
} from "lucide-react";

export function NewJobRequests({
  jobRequests,
  onAcceptJob,
  onRejectJob,
  onCallCustomer,
  onViewDetails,
  showToast,
}) {
  return (
    <div className="rounded-3xl bg-white dark:bg-[#061812] border border-slate-200/80 dark:border-emerald-900/30 p-5 sm:p-7 shadow-xl space-y-6">
      {/* Section Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-emerald-900/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shadow-xs">
            <Sparkles size={20} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                New Job Requests
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-extrabold text-xs animate-bounce">
                {jobRequests.length} Waiting
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Nearby customer requests dispatched via Phidim Automatic Routing
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast("Refreshing job dispatch queue...")}
          className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
        >
          <span>Refresh Queue</span>
        </button>
      </div>

      {/* Cards Grid */}
      {jobRequests.length === 0 ? (
        <div className="py-12 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 mx-auto flex items-center justify-center">
            <CheckCircle2 size={32} />
          </div>
          <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No New Job Requests Right Now
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You have accepted all available jobs in your sector. Stay online to receive the next instant dispatch notification!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {jobRequests.map((job) => {
              const isHighUrgency = job.urgency === "HIGH" || job.urgency === "Urgent";

              return (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`relative flex flex-col justify-between overflow-hidden rounded-3xl p-5 bg-slate-50/60 dark:bg-[#040e0b] border ${
                    isHighUrgency
                      ? "border-amber-400 dark:border-amber-600/50 shadow-amber-500/10"
                      : "border-slate-200 dark:border-emerald-900/40"
                  } shadow-lg hover:shadow-2xl transition-all duration-300 group`}
                >
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-xl bg-slate-900 text-white font-mono text-[11px] font-bold tracking-wider">
                      {job.id}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border flex items-center gap-1 ${
                        isHighUrgency
                          ? "bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700/50 animate-pulse"
                          : "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700/50"
                      }`}
                    >
                      {isHighUrgency && <AlertTriangle size={12} />}
                      <span>{job.urgency} URGENCY</span>
                    </span>
                  </div>

                  {/* Customer Header */}
                  <div className="flex items-center gap-3.5 mb-4 p-3 rounded-2xl bg-white dark:bg-[#061812] border border-slate-200/60 dark:border-emerald-900/30">
                    <img
                      src={job.customerPhoto}
                      alt={job.customerName}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/40 shadow-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">
                        {job.customerName}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                        <span className="flex items-center text-amber-500 font-bold">
                          <Star size={13} className="fill-amber-400 mr-0.5" />
                          {job.customerRating}
                        </span>
                        <span>•</span>
                        <span className="truncate">{job.serviceName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details List */}
                  <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 mb-5">
                    <div className="flex items-start gap-2.5">
                      <MapPin size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                        {job.address}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-medium pt-1">
                      <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white dark:bg-[#061812] border border-slate-200/50 dark:border-emerald-900/30">
                        <Navigation size={13} className="text-blue-500" />
                        <span>Distance: <strong>{job.distance}</strong></span>
                      </div>

                      <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white dark:bg-[#061812] border border-slate-200/50 dark:border-emerald-900/30">
                        <Clock size={13} className="text-amber-500" />
                        <span>ETA: <strong>{job.estimatedTime}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 font-bold">
                      <div className="flex items-center gap-1.5">
                        <Banknote size={15} className="text-emerald-600 dark:text-emerald-400" />
                        <span>Payment:</span>
                      </div>
                      <span className="font-mono text-xs">{job.payment}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-slate-900/40 p-2.5 rounded-xl border border-slate-200/40 dark:border-slate-800/40 italic line-clamp-2">
                      "{job.description}"
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-emerald-900/20">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onAcceptJob(job)}
                        className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
                      >
                        <Check size={16} />
                        <span>Accept Job</span>
                      </button>

                      <button
                        onClick={() => onRejectJob(job.id)}
                        className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-600 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all active:scale-95"
                      >
                        <XCircle size={16} />
                        <span>Reject</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onCallCustomer(job)}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 text-blue-700 dark:text-blue-400 text-[11px] font-bold border border-blue-200 dark:border-blue-800/40 transition-all"
                      >
                        <PhoneCall size={13} />
                        <span>Call Customer</span>
                      </button>

                      <button
                        onClick={() => onViewDetails(job)}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-[11px] font-bold transition-all"
                      >
                        <Eye size={13} />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
