"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, PhoneOff, Video, ShieldCheck, Radio } from "lucide-react";
import { UserAvatar } from "@/components/UserAvatar";
import { playRingtoneSound, stopRingtoneSound } from "@/lib/callSignaling";

export function IncomingCallBanner({ incomingCall, onAccept, onDecline }) {
  useEffect(() => {
    if (incomingCall) {
      playRingtoneSound("incoming");
    } else {
      stopRingtoneSound();
    }
    return () => {
      stopRingtoneSound();
    };
  }, [incomingCall]);

  if (!incomingCall) return null;

  const isVideo = incomingCall.callType === "video";
  const caller = incomingCall.caller || {};

  return (
    <AnimatePresence>
      <div className="fixed top-6 right-4 sm:right-6 z-[999999] max-w-md w-[92vw] sm:w-[420px] pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="relative overflow-hidden rounded-3xl bg-slate-900/95 dark:bg-slate-950/95 border-2 border-emerald-500/50 p-5 shadow-2xl backdrop-blur-xl text-white ring-4 ring-emerald-500/20"
        >
          {/* Animated Top Light Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 animate-pulse" />

          {/* Header Status */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-extrabold">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span>{isVideo ? "INCOMING HD VIDEO CALL" : "INCOMING LIVE VOICE CALL"}</span>
            </div>
            <span className="text-[10px] text-slate-400 uppercase font-mono tracking-widest flex items-center gap-1">
              <Radio size={12} className="text-emerald-400 animate-pulse" />
              Ringing...
            </span>
          </div>

          {/* Caller Details */}
          <div className="flex items-center gap-4 py-4">
            <div className="relative shrink-0">
              <UserAvatar user={caller} size="lg" />
              <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-600 text-white ring-2 ring-slate-900">
                {isVideo ? <Video size={13} /> : <Phone size={13} />}
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm font-black text-white truncate">
                  {caller.name || caller.displayName || "Phidim User"}
                </h4>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-black uppercase">
                  {caller.role || "USER"}
                </span>
              </div>
              <p className="text-xs text-slate-300 truncate mt-0.5">{caller.email}</p>
              {caller.phone && (
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">{caller.phone}</p>
              )}
            </div>
          </div>

          {/* Action Buttons: Accept vs Decline */}
          <div className="flex items-center gap-3 pt-2">
            {/* Decline Button */}
            <button
              type="button"
              onClick={() => {
                stopRingtoneSound();
                onDecline(incomingCall);
              }}
              className="flex-1 py-3 px-4 rounded-2xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg group"
            >
              <PhoneOff size={16} className="group-hover:rotate-12 transition-transform" />
              <span>Decline</span>
            </button>

            {/* Accept Button */}
            <button
              type="button"
              onClick={() => {
                stopRingtoneSound();
                onAccept(incomingCall);
              }}
              className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isVideo ? <Video size={16} /> : <Phone size={16} />}
              <span>Accept Call</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
