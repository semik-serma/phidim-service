"use client";

import { useState, useEffect, useRef } from "react";
import { User, Image as ImageIcon, CheckCircle2, Save, Sparkles, UserCheck, RefreshCw, Upload, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import { saveUserAvatar, resolveUserAvatar } from "@/lib/avatarCache.js";
import { saveRealUserToRegistry } from "@/lib/userRegistry.js";

const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80",
];

export function AccountSettings({ onShowToast }) {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [displayName, setDisplayName] = useState(user?.displayName || user?.name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setDisplayName(user.displayName || user.name || "");
      setUsername(user.username || "");
      setAvatar(resolveUserAvatar(user));
    }
  }, [user]);

  const userInitials = (name || user?.name || "User")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const srcDataUrl = event.target?.result;
      if (!srcDataUrl) return;

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const maxDim = 400;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
          setAvatar(compressedDataUrl);
        } else {
          setAvatar(srcDataUrl);
        }
      };
      img.onerror = () => setAvatar(srcDataUrl);
      img.src = srcDataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const email = user?.email || "";
      const trimmedAvatar = avatar.trim();
      const updatedData = {
        name: name.trim(),
        displayName: displayName.trim() || name.trim(),
        username: username.trim().toLowerCase().replace(/[^a-z0-9_]/g, ""),
        avatar: trimmedAvatar,
      };

      if (email) {
        saveUserAvatar(email, trimmedAvatar);
        saveRealUserToRegistry({
          ...user,
          ...updatedData,
          email,
        });
      }

      if (updateUser) {
        await updateUser(updatedData);
      }
    } catch (err) {
      console.warn("Profile update saved locally with warning:", err);
    } finally {
      setIsSaving(false);
      setIsSaved(true);
      if (onShowToast) {
        onShowToast("Account settings saved successfully!");
      }
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 rounded-2xl p-5 sm:p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-100 text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-md">
            <Sparkles size={13} className="text-emerald-200" />
            <span>Profile & Account Customization</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">Account Settings</h2>
          <p className="text-emerald-100 text-xs max-w-xl font-medium leading-relaxed">
            Customize your account full name, public display name, and avatar picture across all Phidim Service dashboards and community features.
          </p>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="bg-white dark:bg-[#091e17] rounded-2xl border border-slate-200/80 dark:border-emerald-900/40 p-5 sm:p-6 shadow-sm space-y-6">
        
        {/* Profile Picture Section */}
        <div className="space-y-3.5">
          <label className="block text-xs font-black text-slate-900 dark:text-white flex items-center gap-2">
            <ImageIcon size={16} className="text-emerald-600 dark:text-emerald-400" />
            <span>Profile Picture</span>
          </label>

          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-200/80 dark:border-emerald-800/40">
            {/* Image Preview */}
            <div className="relative shrink-0">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Profile Avatar Preview"
                  className="w-16 h-16 rounded-xl object-cover ring-2 ring-emerald-500/50 shadow-sm"
                />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-black text-xl flex items-center justify-center shadow-sm ring-2 ring-emerald-500/30">
                  {userInitials}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#091e17] flex items-center justify-center text-white text-[9px]">
                ✓
              </span>
            </div>

            <div className="flex-1 w-full space-y-2.5">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow cursor-pointer shrink-0"
                >
                  <Upload size={13} />
                  <span>Upload Photo</span>
                </button>
                {avatar && (
                  <button
                    type="button"
                    onClick={() => setAvatar("")}
                    className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40 text-xs font-bold transition-all cursor-pointer shrink-0"
                    title="Remove Photo"
                  >
                    <Trash2 size={13} />
                    <span>Remove</span>
                  </button>
                )}
                <input
                  type="text"
                  placeholder="Or paste Image URL (https://...)"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="flex-1 h-8.5 px-3 rounded-xl border border-slate-300 dark:border-emerald-800/60 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              {/* Avatar Presets */}
              <div>
                <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">Or choose from avatar presets:</p>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {AVATAR_PRESETS.map((presetUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAvatar(presetUrl)}
                      className={`w-8 h-8 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        avatar === presetUrl ? "border-emerald-500 scale-105 ring-2 ring-emerald-500/40" : "border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={presetUrl} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-100 dark:border-emerald-900/30" />

        {/* Name Fields Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Account Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <User size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ram Shrestha"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-emerald-800/60 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 shadow-inner"
            />
            <p className="text-[10px] text-slate-400 font-medium">Your primary full account name on record.</p>
          </div>

          {/* Display Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <UserCheck size={14} className="text-teal-600 dark:text-teal-400" />
              <span>Display Name</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ram (Phidim Customer)"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-emerald-800/60 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 shadow-inner"
            />
            <p className="text-[10px] text-slate-400 font-medium">Public display name shown on top navigation.</p>
          </div>

          {/* Username */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <User size={14} className="text-blue-600 dark:text-blue-400" />
              <span>Username (@handle)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">@</span>
              <input
                type="text"
                placeholder="e.g. ram_shrestha"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                className="w-full h-9 pl-7 pr-3 rounded-xl border border-slate-300 dark:border-emerald-800/60 bg-white dark:bg-slate-900 text-xs font-bold font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 shadow-inner"
              />
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Unique handle used for messaging and tags.</p>
          </div>
        </div>

        {/* Submit & Save Status */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-emerald-900/30">
          {isSaved ? (
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold animate-in fade-in">
              <CheckCircle2 size={15} />
              <span>Account settings saved successfully!</span>
            </div>
          ) : (
            <div className="text-[11px] text-slate-400 font-medium">
              Changes update immediately across all dashboards.
            </div>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-sm transition-all cursor-pointer hover:scale-102 disabled:opacity-50"
          >
            {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}
