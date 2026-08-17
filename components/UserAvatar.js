"use client";

import { useEffect, useMemo, useState } from "react";
import { resolveUserAvatar, subscribeAvatarUpdates } from "@/lib/avatarCache.js";

/**
 * Universal UserAvatar Component
 * 1) Renders real profile pictures (Google, uploaded, local avatars, cached custom uploads)
 * 2) Reactively updates whenever a new picture is saved in Account Settings
 * 3) Fallbacks to a high-contrast SVG Initials avatar matching the user's name (never broken or placeholder)
 */
export function UserAvatar({ user, size = "md", className = "" }) {
  const [imageError, setImageError] = useState(false);
  const [avatarOverride, setAvatarOverride] = useState("");

  const name = user?.displayName || user?.name || user?.email?.split("@")[0] || "User";
  const userEmail = (user?.email || (typeof user === "string" ? user : "")).trim().toLowerCase();

  // Resolve latest avatar with override and cache fallback
  const resolvedUrl = useMemo(() => {
    return avatarOverride || resolveUserAvatar(user);
  }, [user, avatarOverride]);

  // Subscribe to live avatar updates across the application
  useEffect(() => {
    const unsub = subscribeAvatarUpdates((detail) => {
      if (!detail?.email || (userEmail && detail.email.toLowerCase() === userEmail)) {
        if (detail?.avatar) {
          setAvatarOverride(detail.avatar);
          setImageError(false);
        } else {
          setAvatarOverride(resolveUserAvatar(user));
        }
      }
    });
    return unsub;
  }, [user, userEmail]);

  useEffect(() => {
    setImageError(false);
    setAvatarOverride("");
  }, [user]);

  const initials = useMemo(() => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }, [name]);

  // Deterministic background gradient based on name hash
  const bgGradient = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const gradients = [
      "from-emerald-600 to-teal-700",
      "from-blue-600 to-indigo-700",
      "from-purple-600 to-violet-700",
      "from-amber-500 to-orange-600",
      "from-rose-600 to-pink-700",
      "from-cyan-600 to-blue-700",
    ];
    return gradients[Math.abs(hash) % gradients.length];
  }, [name]);

  const sizeClasses = {
    xs: "w-7 h-7 text-[10px]",
    sm: "w-9 h-9 text-xs",
    md: "w-11 h-11 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl",
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  const isValidUrl =
    resolvedUrl &&
    typeof resolvedUrl === "string" &&
    (resolvedUrl.startsWith("http://") ||
      resolvedUrl.startsWith("https://") ||
      resolvedUrl.startsWith("data:image/") ||
      resolvedUrl.startsWith("/"));

  if (isValidUrl && !imageError) {
    return (
      <img
        src={resolvedUrl}
        alt={name}
        className={`${currentSize} rounded-2xl object-cover ring-2 ring-emerald-500/40 shrink-0 ${className}`}
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <div
      className={`${currentSize} rounded-2xl bg-gradient-to-tr ${bgGradient} text-white font-black flex items-center justify-center shadow-sm shrink-0 ring-2 ring-white/20 dark:ring-slate-800 ${className}`}
      title={name}
    >
      <span>{initials}</span>
    </div>
  );
}
