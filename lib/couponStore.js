"use client";

// Shared reactive coupon store with localStorage persistence
const INITIAL_COUPONS = [
  {
    id: "coup-1",
    code: "PHIDIM20",
    discount: "20% OFF",
    desc: "Valid on all CCTV & Network setups in Panchthar",
    exp: "Expires in 3 days",
    bg: "from-emerald-500 to-teal-600",
    active: true,
  },
  {
    id: "coup-2",
    code: "DTHFREE",
    discount: "FREE TUNE",
    desc: "Complimentary DishHome signal alignment with wiring",
    exp: "Expires in 5 days",
    bg: "from-blue-500 to-indigo-600",
    active: true,
  },
  {
    id: "coup-3",
    code: "ELEC500",
    discount: "NPR 500 OFF",
    desc: "Flat NPR 500 discount on house rewiring checks",
    exp: "Expires in 7 days",
    bg: "from-purple-500 to-violet-600",
    active: true,
  },
];
const COUPON_CLAIMS_STORAGE_KEY = "phidim_service_coupon_claims_v1";

let _coupons = null;
let _listeners = [];
let _claimListeners = [];

function claimOwnerKey(user) {
  return String(user?.email || user?.id || "guest").trim().toLowerCase();
}

function loadCouponClaims() {
  if (typeof window === "undefined") return {};
  try {
    const saved = localStorage.getItem(COUPON_CLAIMS_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : {};
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch (e) {
    return {};
  }
}

export function getClaimedCouponCodes(user) {
  const claims = loadCouponClaims();
  const codes = claims[claimOwnerKey(user)];
  return Array.isArray(codes) ? codes : [];
}

export function claimCouponForUser(user, code) {
  const normalizedCode = String(code || "").trim().toUpperCase();
  if (!normalizedCode || typeof window === "undefined") return false;

  const owner = claimOwnerKey(user);
  const claims = loadCouponClaims();
  const existing = Array.isArray(claims[owner]) ? claims[owner] : [];
  if (existing.includes(normalizedCode)) return false;

  claims[owner] = [...existing, normalizedCode];
  try {
    localStorage.setItem(COUPON_CLAIMS_STORAGE_KEY, JSON.stringify(claims));
    _claimListeners.forEach((fn) => fn([...claims[owner]]));
    return true;
  } catch (e) {
    console.error("Failed to save claimed coupon:", e);
    return false;
  }
}

export function subscribeCouponClaims(user, fn) {
  const notify = () => fn(getClaimedCouponCodes(user));
  _claimListeners.push(notify);
  const storageHandler = (event) => {
    if (event.key === COUPON_CLAIMS_STORAGE_KEY) notify();
  };
  if (typeof window !== "undefined") window.addEventListener("storage", storageHandler);
  return () => {
    _claimListeners = _claimListeners.filter((listener) => listener !== notify);
    if (typeof window !== "undefined") window.removeEventListener("storage", storageHandler);
  };
}

function loadCoupons() {
  if (_coupons) return _coupons;
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("phidim_service_coupons");
      if (saved) {
        _coupons = JSON.parse(saved);
        return _coupons;
      }
    } catch (e) {
      console.error("Failed to read coupons from localStorage:", e);
    }
  }
  _coupons = [...INITIAL_COUPONS];
  return _coupons;
}

function persistCoupons(list) {
  _coupons = list;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("phidim_service_coupons", JSON.stringify(_coupons));
    } catch (e) {
      console.error("Failed to save coupons to localStorage:", e);
    }
  }
  _listeners.forEach((fn) => fn([..._coupons]));
}

export function getCoupons() {
  return loadCoupons();
}

export function setCoupons(list) {
  persistCoupons(list);
}

export function addCoupon(couponData) {
  const current = loadCoupons();
  const newCoupon = {
    id: "coup-" + Date.now(),
    code: (couponData.code || "DISCOUNT").toUpperCase().trim(),
    discount: couponData.discount || "10% OFF",
    desc: couponData.desc || "Special promotional offer",
    exp: couponData.exp || "Valid for 7 days",
    bg: couponData.bg || "from-emerald-500 to-teal-600",
    active: couponData.active !== undefined ? couponData.active : true,
  };
  const updated = [newCoupon, ...current];
  persistCoupons(updated);
  return newCoupon;
}

export function updateCoupon(id, updatedFields) {
  const current = loadCoupons();
  const updated = current.map((c) => (c.id === id ? { ...c, ...updatedFields } : c));
  persistCoupons(updated);
}

export function toggleCouponActive(id) {
  const current = loadCoupons();
  const updated = current.map((c) => (c.id === id ? { ...c, active: !c.active } : c));
  persistCoupons(updated);
}

export function deleteCoupon(id) {
  const current = loadCoupons();
  const updated = current.filter((c) => c.id !== id);
  persistCoupons(updated);
}

export function subscribeCoupons(fn) {
  _listeners.push(fn);
  return () => {
    _listeners = _listeners.filter((l) => l !== fn);
  };
}
