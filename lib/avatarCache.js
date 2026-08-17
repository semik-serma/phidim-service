"use client";

// Centralized Avatar Resolution & Real-time Synchronization Cache
// Ensures any profile picture uploaded or set in Account Settings is immediately
// and permanently rendered across all dashboard components, friend requests, chats, and directory cards.

const PROFILE_AVATAR_KEY_PREFIX = "phidim_profile_avatar_v1:";
const LEGACY_AVATAR_KEY_PREFIX = "phidim_avatar_cache_";

export function getAvatarStorageKey(email) {
  return `${PROFILE_AVATAR_KEY_PREFIX}${String(email || "").trim().toLowerCase()}`;
}

export function getCachedAvatar(email) {
  if (typeof window === "undefined" || !email) return "";
  const normalized = String(email).trim().toLowerCase();
  if (!normalized) return "";

  try {
    const primary = localStorage.getItem(`${PROFILE_AVATAR_KEY_PREFIX}${normalized}`);
    if (primary) return primary;

    const legacy = localStorage.getItem(`${LEGACY_AVATAR_KEY_PREFIX}${normalized}`);
    if (legacy) return legacy;

    // Check registry store
    const regRaw = localStorage.getItem("phidim_registered_users_registry");
    if (regRaw) {
      const reg = JSON.parse(regRaw);
      if (Array.isArray(reg)) {
        const found = reg.find((u) => u?.email?.toLowerCase() === normalized);
        if (found?.avatar) return found.avatar;
      }
    }
  } catch (e) {}

  return "";
}

export function resolveUserAvatar(userOrEmail, fallback = "") {
  if (!userOrEmail) return fallback;

  let email = "";
  let directAvatar = "";

  if (typeof userOrEmail === "string") {
    if (
      userOrEmail.startsWith("http://") ||
      userOrEmail.startsWith("https://") ||
      userOrEmail.startsWith("data:image/") ||
      userOrEmail.startsWith("/")
    ) {
      return userOrEmail;
    }
    email = userOrEmail;
  } else if (typeof userOrEmail === "object") {
    email = userOrEmail.email || "";
    directAvatar =
      userOrEmail.avatar ||
      userOrEmail.profilePicture ||
      userOrEmail.profileImage ||
      userOrEmail.picture ||
      userOrEmail.image ||
      userOrEmail.photoURL ||
      "";
  }

  // Check cached override first (user might have uploaded a new photo)
  if (email) {
    const cached = getCachedAvatar(email);
    if (cached) return cached;
  }

  return directAvatar || fallback;
}

export function saveUserAvatar(email, avatar) {
  if (typeof window === "undefined" || !email) return;
  const normalized = String(email).trim().toLowerCase();
  if (!normalized) return;

  try {
    const key = `${PROFILE_AVATAR_KEY_PREFIX}${normalized}`;
    const legKey = `${LEGACY_AVATAR_KEY_PREFIX}${normalized}`;

    if (avatar) {
      localStorage.setItem(key, avatar);
      localStorage.setItem(legKey, avatar);
    } else {
      localStorage.removeItem(key);
      localStorage.removeItem(legKey);
    }

    // Also update in registered user registry if present
    const regRaw = localStorage.getItem("phidim_registered_users_registry");
    if (regRaw) {
      try {
        const reg = JSON.parse(regRaw);
        if (Array.isArray(reg)) {
          const idx = reg.findIndex((u) => u?.email?.toLowerCase() === normalized);
          if (idx >= 0) {
            reg[idx] = { ...reg[idx], avatar };
            localStorage.setItem("phidim_registered_users_registry", JSON.stringify(reg));
            window.dispatchEvent(new Event("phidim_users_updated"));
          }
        }
      } catch (e) {}
    }

    // Also update in friend store requests if present
    const friendRaw = localStorage.getItem("phidim_friends_data_v1");
    if (friendRaw) {
      try {
        const friendData = JSON.parse(friendRaw);
        if (friendData?.requests && Array.isArray(friendData.requests)) {
          let changed = false;
          friendData.requests = friendData.requests.map((r) => {
            if (r.senderEmail?.toLowerCase() === normalized) {
              changed = true;
              return { ...r, senderAvatar: avatar };
            }
            if (r.receiverEmail?.toLowerCase() === normalized) {
              changed = true;
              return { ...r, receiverAvatar: avatar };
            }
            return r;
          });
          if (changed) {
            localStorage.setItem("phidim_friends_data_v1", JSON.stringify(friendData));
            window.dispatchEvent(new Event("phidim_friends_updated"));
          }
        }
      } catch (e) {}
    }

    // Dispatch global event for live avatar reactivity
    window.dispatchEvent(
      new CustomEvent("phidim_avatar_updated", {
        detail: { email: normalized, avatar },
      })
    );
  } catch (e) {
    console.warn("Avatar save failed in localStorage:", e);
  }
}

export function subscribeAvatarUpdates(callback) {
  if (typeof window === "undefined" || !callback) return () => {};

  const handler = (event) => {
    callback(event?.detail || {});
  };

  window.addEventListener("phidim_avatar_updated", handler);
  window.addEventListener("phidim_users_updated", () => callback({}));
  window.addEventListener("phidim_friends_updated", () => callback({}));

  return () => {
    window.removeEventListener("phidim_avatar_updated", handler);
    window.removeEventListener("phidim_users_updated", () => callback({}));
    window.removeEventListener("phidim_friends_updated", () => callback({}));
  };
}
