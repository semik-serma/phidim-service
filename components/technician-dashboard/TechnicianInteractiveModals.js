"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  PenTool,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  AlertTriangle,
  QrCode,
  Camera,
  Upload,
  Send,
  Download,
  ShieldAlert,
  Wallet,
  Zap,
} from "lucide-react";
import { UserAvatar } from "@/components/UserAvatar";

export function TechnicianInteractiveModals({
  activeModal,
  modalData,
  onClose,
  showToast,
}) {
  // Signature State
  const [signed, setSigned] = useState(false);

  // Chat Message State
  const [messages, setMessages] = useState([
    { sender: "Customer", text: "Namaste Rajesh, are you nearby Pragati Chowk?", time: "09:32 AM" },
    { sender: "You", text: "Namaste! Yes, I am 1.8km away, arriving in 8 minutes.", time: "09:34 AM" },
  ]);
  const [chatInput, setChatInput] = useState("");

  // Review Reply state
  const [replyText, setReplyText] = useState("");

  if (!activeModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        {/* MODAL 1: DIGITAL SIGNATURE */}
        {activeModal === "signature" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#061812] border border-slate-200 dark:border-emerald-800/50 p-6 shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/30">
              <div className="flex items-center gap-2">
                <PenTool size={20} className="text-emerald-500" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Collect Customer Digital Signature
                </h3>
              </div>
              <button onClick={onClose} className="p-1 rounded-xl hover:bg-slate-100 text-slate-400">
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Hand device to customer <strong>Sita Sharma</strong> to sign completion authorization slip below:
            </p>

            {/* Signature Pad Surface */}
            <div
              onClick={() => setSigned(true)}
              className="relative h-44 rounded-2xl bg-slate-50 dark:bg-[#040e0b] border-2 border-dashed border-emerald-400/60 flex items-center justify-center cursor-crosshair overflow-hidden"
            >
              {signed ? (
                <div className="space-y-2 text-center">
                  <span className="font-serif italic text-2xl font-bold text-slate-800 dark:text-emerald-300">
                    Sita Sharma Signature ✔
                  </span>
                  <p className="text-[10px] text-emerald-600 font-mono">Timestamped: 2026-08-06 09:42 IST</p>
                </div>
              ) : (
                <div className="text-center text-slate-400 text-xs space-y-1">
                  <PenTool size={24} className="mx-auto text-emerald-500 opacity-60" />
                  <p className="font-semibold">Click or Touch screen to Sign</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setSigned(false)}
                className="flex-1 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                Clear Signature
              </button>
              <button
                onClick={() => {
                  if (!signed) {
                    showToast("Please tap on signature pad to sign first!");
                    return;
                  }
                  showToast("Digital Signature Saved to Service Receipt!");
                  onClose();
                }}
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30"
              >
                Save Signature
              </button>
            </div>
          </motion.div>
        )}

        {/* MODAL 2: LIVE CHAT & CALL */}
        {activeModal === "chat" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-md rounded-3xl bg-white dark:bg-[#061812] border border-slate-200 dark:border-emerald-800/50 p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/30">
              <div className="flex items-center gap-2.5 min-w-0">
                <UserAvatar user={modalData} size="xs" />
                <div className="min-w-0">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white truncate">
                    {modalData?.displayName || modalData?.customerName || modalData?.name || "Customer"}
                  </h3>
                  <p className="text-[10px] text-emerald-500 font-bold">● Online Direct Messaging</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => showToast(`Calling ${modalData?.displayName || modalData?.customerName || modalData?.name || "Customer"}...`)}
                  className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 hover:bg-emerald-200 transition-colors"
                  title="Voice Call"
                >
                  <PhoneCall size={16} />
                </button>
                <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat feed */}
            <div className="h-64 overflow-y-auto space-y-2.5 p-2 bg-slate-50 dark:bg-[#040e0b] rounded-2xl border border-slate-200 dark:border-emerald-900/30">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.sender === "You" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium ${
                      m.sender === "You"
                        ? "bg-emerald-600 text-white rounded-br-none"
                        : "bg-white dark:bg-[#061812] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-emerald-900/40 rounded-bl-none"
                    }`}
                  >
                    <p>{m.text}</p>
                    <span className="text-[9px] opacity-70 mt-1 block text-right font-mono">{m.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type message to customer..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && chatInput.trim()) {
                    setMessages([...messages, { sender: "You", text: chatInput, time: "Now" }]);
                    setChatInput("");
                  }
                }}
                className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900 text-xs text-slate-900 dark:text-white border border-slate-300 dark:border-emerald-800 outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={() => {
                  if (chatInput.trim()) {
                    setMessages([...messages, { sender: "You", text: chatInput, time: "Now" }]);
                    setChatInput("");
                  }
                }}
                className="p-2.5 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-500"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* MODAL 3: EMERGENCY SOS */}
        {activeModal === "sos" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-md rounded-3xl bg-rose-950 text-white border border-rose-500 p-6 shadow-2xl space-y-4 text-center"
          >
            <ShieldAlert size={48} className="mx-auto text-rose-500 animate-bounce" />
            <h3 className="text-xl font-black">EMERGENCY SOS DISPATCH TRIGGERED</h3>
            <p className="text-xs text-rose-200 leading-relaxed">
              Your live GPS coordinates (Phidim Ward 4) have been broadcasted to Phidim Police Control, Panchthar Medical Response & Phidim Dispatch Support.
            </p>
            <div className="pt-3 space-y-2">
              <button
                onClick={() => {
                  showToast("Emergency Services Dispatched to your location!");
                  onClose();
                }}
                className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase"
              >
                Confirm Dispatch Call
              </button>
              <button onClick={onClose} className="text-xs text-rose-300 underline">
                Cancel False Alarm
              </button>
            </div>
          </motion.div>
        )}

        {/* MODAL 4: QR CODE VERIFICATION */}
        {activeModal === "qr" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#061812] border border-slate-200 dark:border-emerald-800/50 p-6 shadow-2xl text-center space-y-4"
          >
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                Job Scan QR Verification
              </h3>
              <button onClick={onClose} className="p-1 text-slate-400">
                <X size={18} />
              </button>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-md inline-block">
              <QrCode size={140} className="text-slate-900" />
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Scan this QR code with customer's Phidim Service App to auto-verify job start.
            </p>
          </motion.div>
        )}

        {/* MODAL 5: PHOTO UPLOAD */}
        {activeModal === "photo" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-md rounded-3xl bg-white dark:bg-[#061812] border border-slate-200 dark:border-emerald-800/50 p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/30">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Camera size={18} className="text-emerald-500" /> Upload Service Photos
              </h3>
              <button onClick={onClose} className="p-1 text-slate-400">
                <X size={18} />
              </button>
            </div>

            <div
              onClick={() => showToast("Simulating camera capture / photo attachment...")}
              className="h-36 rounded-2xl border-2 border-dashed border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30 flex flex-col items-center justify-center cursor-pointer text-center p-4"
            >
              <Upload size={32} className="text-emerald-500 mb-2" />
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Click to Take Photo or Browse Files
              </p>
              <span className="text-[10px] text-slate-400">Supports JPG, PNG up to 10MB</span>
            </div>

            <button
              onClick={() => {
                showToast("Photo uploaded to job inspection certificate!");
                onClose();
              }}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30"
            >
              Confirm Upload
            </button>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
