"use client";

import { resolveUserAvatar, saveUserAvatar } from "@/lib/avatarCache.js";

// Unified Real User Registry & Persistence Store
// Ensures every newly created account (local register, Google login, admin creation)
// is immediately saved and visible across User, Technician, and Admin dashboards.

const USERS_STORAGE_KEY = "phidim_registered_users_registry";

export const DEFAULT_REAL_USERS = [
  {
    id: "usr-admin-dhanraj",
    name: "Dhanraj Serma",
    displayName: "Dhanraj Serma (Master Admin)",
    role: "ADMIN",
    email: "dhanrajserma34@gmail.com",
    phone: "+977 9862772457",
    avatar: "/dhanraj.png",
    bio: "Official Phidim Service System Master Administrator.",
    location: "Phidim HQ, Panchthar",
    online: true,
  },
  {
    id: "usr-cust-semik",
    name: "Semik Serma",
    displayName: "Semik Serma",
    role: "USER",
    email: "semikserma@gmail.com",
    phone: "+977 9862772400",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    bio: "Registered customer & Panchthar community member.",
    location: "Phidim-1, Panchthar",
    online: true,
  },
  {
    id: "usr-cust-webdev",
    name: "Web Developer",
    displayName: "Web Developer",
    role: "USER",
    email: "webdeveloper@phidim.np",
    phone: "+977 9862000111",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    bio: "Registered Web Developer & Panchthar community member.",
    location: "Phidim-1, Panchthar",
    online: true,
  },
  {
    id: "usr-tech-rajesh",
    name: "Rajesh Tamang",
    displayName: "Rajesh Tamang (CCTV & DTH Specialist)",
    role: "TECHNICIAN",
    email: "rajesh@phidim.np",
    phone: "+977 9842109842",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    bio: "Certified DishHome DTH & CCTV installation expert.",
    location: "Phidim-4, Panchthar",
    online: true,
  },
  {
    id: "usr-tech-anita",
    name: "Anita Gurung",
    displayName: "Anita Gurung (Electrical Tech)",
    role: "TECHNICIAN",
    email: "anita@phidim.np",
    phone: "+977 9862334455",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    bio: "Certified Solar & Commercial Electrical Technician.",
    location: "Panchthar Hub, Phidim",
    online: true,
  },
  {
    id: "usr-tech-suman",
    name: "Suman Limbu",
    displayName: "Suman Limbu (Master Electrician)",
    role: "TECHNICIAN",
    email: "suman@phidim.np",
    phone: "+977 9855555555",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    bio: "Master Electrician & Plumber in Panchthar district.",
    location: "Phidim-1, Panchthar",
    online: true,
  },
  {
    id: "usr-tech-kiran",
    name: "Kiran Gurung",
    displayName: "Kiran Gurung (Security Systems)",
    role: "TECHNICIAN",
    email: "kiran@phidim.np",
    phone: "+977 9877777777",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80",
    bio: "CCTV Security Systems & Smart Alarm technician.",
    location: "Phidim Bazar, Panchthar",
    online: true,
  },
  {
    id: "usr-cust-saraswati",
    name: "Saraswati Subedi",
    displayName: "Saraswati Subedi",
    role: "USER",
    email: "saraswati@phidim.np",
    phone: "+977 9812345678",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    bio: "Resident of Phidim Ward 2, Panchthar.",
    location: "Phidim-2, Panchthar",
    online: true,
  },
  {
    id: "usr-cust-bikash",
    name: "Bikash Thapa",
    displayName: "Bikash Thapa",
    role: "USER",
    email: "bikash@phidim.np",
    phone: "+977 9801122334",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    bio: "Resident of Phidim Ward 4, Panchthar.",
    location: "Phidim-4, Panchthar",
    online: true,
  },
  {
    id: "usr-cust-pooja",
    name: "Pooja Karki",
    displayName: "Pooja Karki",
    role: "USER",
    email: "pooja@phidim.np",
    phone: "+977 9866666666",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    bio: "Resident of Phidim Ward 3, Panchthar.",
    location: "Phidim-3, Panchthar",
    online: true,
  },
  {
    id: "usr-cust-sunil",
    name: "Sunil Sherpa",
    displayName: "Sunil Sherpa",
    role: "USER",
    email: "sunil@phidim.np",
    phone: "+977 9888888888",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    bio: "Hotel proprietor in Phidim main square.",
    location: "Main Bazar, Phidim",
    online: false,
  },
];

export function getStoredRealUsers() {
  let list = DEFAULT_REAL_USERS;
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(USERS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const map = new Map();
          [...DEFAULT_REAL_USERS, ...parsed].forEach((u) => {
            if (u && u.email) {
              map.set(u.email.toLowerCase(), {
                ...u,
                avatar: resolveUserAvatar(u),
              });
            }
          });
          return Array.from(map.values());
        }
      }
    } catch (e) {}
  }
  return list.map((u) => ({
    ...u,
    avatar: resolveUserAvatar(u),
  }));
}

export function saveRealUserToRegistry(userObj) {
  if (typeof window === "undefined" || !userObj || !userObj.email) return;
  try {
    const existing = getStoredRealUsers();
    const lowerEmail = userObj.email.toLowerCase();
    const avatar = resolveUserAvatar(userObj);

    if (avatar) {
      saveUserAvatar(lowerEmail, avatar);
    }

    const idx = existing.findIndex((u) => u.email.toLowerCase() === lowerEmail);
    const updatedUser = {
      id: userObj.id || userObj._id || `usr-${Date.now()}`,
      name: userObj.name || userObj.displayName || lowerEmail.split("@")[0],
      displayName: userObj.displayName || userObj.name || lowerEmail.split("@")[0],
      email: lowerEmail,
      phone: userObj.phone || "",
      role: userObj.role || "USER",
      avatar: avatar || "",
      bio: userObj.bio || `Registered ${userObj.role || "USER"} in Panchthar.`,
      location: userObj.location || "Phidim, Panchthar",
      online: true,
      createdAt: userObj.createdAt || new Date().toISOString(),
    };

    if (idx >= 0) {
      existing[idx] = { ...existing[idx], ...updatedUser };
    } else {
      existing.unshift(updatedUser);
    }

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(existing));
    window.dispatchEvent(new Event("phidim_users_updated"));
  } catch (e) {}
}

const listeners = new Set();

export function subscribeUserRegistry(callback) {
  listeners.add(callback);
  if (typeof window !== "undefined") {
    const handler = () => callback(getStoredRealUsers());
    window.addEventListener("phidim_users_updated", handler);
    window.addEventListener("phidim_avatar_updated", handler);
    return () => {
      listeners.delete(callback);
      window.removeEventListener("phidim_users_updated", handler);
      window.removeEventListener("phidim_avatar_updated", handler);
    };
  }
  return () => listeners.delete(callback);
}
