"use client";

// Admin-managed homepage slides. Local persistence keeps the admin editor and
// public homepage in sync after reloads without adding a new hosting service.
const STORAGE_KEY = "phidim_homepage_carousel_slides_v1";
let listeners = [];

function readSlides() {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value.filter((slide) => slide?.image && slide?.active !== false) : [];
  } catch {
    return [];
  }
}

export function getHeroCarouselSlides() {
  return readSlides();
}

export async function refreshHeroCarouselSlides() {
  try {
    const response = await fetch("/api/homepage/carousel", { cache: "no-store" });
    if (!response.ok) return readSlides();
    const data = await response.json();
    if (!Array.isArray(data.slides)) return readSlides();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.slides));
    listeners.forEach((listener) => listener(readSlides()));
    return readSlides();
  } catch {
    return readSlides();
  }
}

export function saveHeroCarouselSlides(slides) {
  const safeSlides = (Array.isArray(slides) ? slides : []).slice(0, 4);
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safeSlides));
    } catch (error) {
      console.error("Unable to save homepage carousel images:", error);
    }
  }
  fetch("/api/homepage/carousel", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slides: safeSlides }),
  }).catch(() => {});
  listeners.forEach((listener) => listener(readSlides()));
}

export function resetHeroCarouselSlides() {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Unable to clear homepage carousel storage:", error);
    }
  }
  fetch("/api/homepage/carousel", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slides: [] }),
  }).catch(() => {});
  listeners.forEach((listener) => listener([]));
}

export function subscribeHeroCarouselSlides(listener) {
  listeners.push(listener);
  const onStorage = (event) => {
    if (event.key === STORAGE_KEY) listener(readSlides());
  };
  if (typeof window !== "undefined") window.addEventListener("storage", onStorage);
  return () => {
    listeners = listeners.filter((item) => item !== listener);
    if (typeof window !== "undefined") window.removeEventListener("storage", onStorage);
  };
}
