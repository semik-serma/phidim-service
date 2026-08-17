"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudFog,
  Snowflake,
  Droplets,
  Wind,
  MapPin,
  RefreshCw,
  LocateFixed,
  Umbrella,
  Thermometer,
  X,
  ChevronDown,
  Sparkles
} from "lucide-react";
import { fetchWeather, PHIDIM_COORDS } from "../services/weatherService";

export const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCoords, setCurrentCoords] = useState(PHIDIM_COORDS);
  const [isLocating, setIsLocating] = useState(false);
  const [geoError, setGeoError] = useState(null);
  const modalRef = useRef(null);

  const loadWeather = useCallback(async (coords = currentCoords, force = false) => {
    setLoading(true);
    try {
      const data = await fetchWeather({
        latitude: coords.latitude,
        longitude: coords.longitude,
        locationName: coords.name,
        forceRefresh: force
      });
      setWeather(data);
    } catch (err) {
      console.error("Failed to load weather:", err);
    } finally {
      setLoading(false);
    }
  }, [currentCoords]);

  useEffect(() => {
    loadWeather(currentCoords, false);
    // Refresh weather every 15 minutes automatically
    const interval = setInterval(() => {
      loadWeather(currentCoords, true);
    }, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [loadWeather, currentCoords]);

  // Handle GPS location detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = {
          name: "Your Location",
          nepaliName: "तपाईंको स्थान",
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        };
        setCurrentCoords(coords);
        await loadWeather(coords, true);
        setIsLocating(false);
      },
      (err) => {
        console.warn("Geolocation denied or error:", err);
        setGeoError("Location access denied or unavailable. Using Phidim.");
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  };

  const handleResetToPhidim = async () => {
    setGeoError(null);
    setCurrentCoords(PHIDIM_COORDS);
    await loadWeather(PHIDIM_COORDS, true);
  };

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  // Helper to render appropriate weather icon
  const renderWeatherIcon = (iconName, className = "w-4 h-4") => {
    switch (iconName) {
      case "Sun":
        return <Sun className={`${className} text-amber-500 fill-amber-400`} />;
      case "CloudSun":
        return <CloudSun className={`${className} text-amber-500`} />;
      case "CloudRain":
        return <CloudRain className={`${className} text-sky-600 fill-sky-200 animate-pulse`} />;
      case "CloudDrizzle":
        return <CloudDrizzle className={`${className} text-cyan-600`} />;
      case "CloudLightning":
        return <CloudLightning className={`${className} text-amber-500 fill-amber-300 animate-bounce`} />;
      case "Snowflake":
        return <Snowflake className={`${className} text-blue-400`} />;
      case "CloudFog":
        return <CloudFog className={`${className} text-slate-500`} />;
      case "Cloud":
      default:
        return <Cloud className={`${className} text-slate-600`} />;
    }
  };

  // If weather hasn't loaded yet
  if (!weather) {
    return (
      <div className="flex items-center gap-1.5 bg-white/40 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-gray-900 animate-pulse">
        <Thermometer className="w-3.5 h-3.5 text-gray-700 animate-spin" />
        <span>Checking weather...</span>
      </div>
    );
  }

  const willRain = weather.today.willRainToday;
  const rainProb = weather.today.rainProbability;
  const currentTemp = weather.currentTemp;
  const maxTemp = weather.today.maxTemp;
  const minTemp = weather.today.minTemp;

  return (
    <>
      {/* TopBar Interactive Weather Pill */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="group inline-flex items-center gap-1.5 sm:gap-2 bg-white/70 hover:bg-white text-gray-900 px-2.5 sm:px-3 py-1 rounded-full text-xs font-black shadow-xs hover:shadow-md border border-white/60 hover:border-green-400 transition-all cursor-pointer select-none"
        title="Click to view detailed weather & temperature forecast for today"
        aria-label="Today's Weather and Temperature Forecast"
      >
        {/* Dynamic Weather Icon */}
        <div className="shrink-0 flex items-center justify-center">
          {renderWeatherIcon(weather.condition.icon, "w-4 h-4")}
        </div>

        {/* Current Heat / Temperature */}
        <div className="flex items-center gap-1">
          <span className="text-gray-950 font-black text-xs sm:text-[13px] tracking-tight">
            {currentTemp}°C
          </span>
          <span className="hidden xl:inline text-[10px] text-gray-700 font-semibold">
            ({maxTemp}° / {minTemp}°)
          </span>
        </div>

        <span className="text-gray-400 text-[10px] font-normal hidden sm:inline">|</span>

        {/* Today's Rain Status Badge */}
        <div className="flex items-center gap-1">
          {weather.isRainingNow ? (
            <span className="inline-flex items-center gap-1 text-sky-800 bg-sky-100 px-1.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black animate-pulse">
              <Droplets className="w-3 h-3 text-sky-600 fill-sky-500" />
              <span>Raining Now</span>
            </span>
          ) : willRain ? (
            <span className="inline-flex items-center gap-1 text-blue-900 bg-blue-100/90 px-1.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold">
              <Umbrella className="w-3 h-3 text-blue-600" />
              <span>Rain Today ({rainProb}%)</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-amber-900 bg-amber-100/90 px-1.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold">
              <Sun className="w-3 h-3 text-amber-600 fill-amber-500" />
              <span>No Rain Today ({rainProb}%)</span>
            </span>
          )}
        </div>

        {/* Location tag + Chevron */}
        <div className="hidden lg:flex items-center gap-0.5 text-[10px] text-gray-700 font-bold bg-black/5 px-1.5 py-0.5 rounded-full">
          <MapPin className="w-2.5 h-2.5 text-green-700" />
          <span>{currentCoords.latitude === PHIDIM_COORDS.latitude ? "Phidim" : "Local"}</span>
          <ChevronDown className="w-3 h-3 text-gray-600 group-hover:translate-y-0.5 transition-transform" />
        </div>
      </button>

      {/* Detailed Weather Modal / Popover */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            ref={modalRef}
            className="w-full max-w-lg bg-gradient-to-b from-white via-slate-50 to-slate-100 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 animate-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white p-4 sm:p-5 relative">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
                title="Close Weather Modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between pr-8">
                <div>
                  <div className="flex items-center gap-1.5 text-emerald-100 text-xs font-bold uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-amber-300" />
                    <span>{weather.locationName}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
                    Today&apos;s Weather & Rain Forecast
                  </h2>
                </div>
              </div>

              {/* Location Selector Controls */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={isLocating}
                  className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-xs transition-all cursor-pointer disabled:opacity-50"
                  title="Detect your current location using GPS"
                >
                  <LocateFixed className={`w-3 h-3 ${isLocating ? "animate-spin" : ""}`} />
                  <span>{isLocating ? "Detecting GPS..." : "Use My Location"}</span>
                </button>

                {currentCoords.latitude !== PHIDIM_COORDS.latitude && (
                  <button
                    type="button"
                    onClick={handleResetToPhidim}
                    className="inline-flex items-center gap-1 bg-white text-emerald-800 hover:bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs"
                    title="Switch back to Phidim, Nepal"
                  >
                    <span>Reset to Phidim</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => loadWeather(currentCoords, true)}
                  disabled={loading}
                  className="inline-flex items-center gap-1 bg-black/20 hover:bg-black/30 text-white px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ml-auto"
                  title="Refresh weather data now"
                >
                  <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {geoError && (
                <p className="mt-2 text-[11px] bg-red-500/30 text-white px-2.5 py-1 rounded-md border border-red-400/40">
                  {geoError}
                </p>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Primary Question 1: Is it Raining Today? */}
              <div
                className={`p-3.5 rounded-xl border-2 flex items-start gap-3 shadow-xs ${
                  willRain
                    ? "bg-sky-50 border-sky-300 text-sky-950"
                    : "bg-amber-50 border-amber-300 text-amber-950"
                }`}
              >
                <div className="p-2.5 rounded-xl bg-white shadow-xs shrink-0 mt-0.5">
                  {renderWeatherIcon(willRain ? "CloudRain" : "Sun", "w-6 h-6")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                      🌧️ Rain Prediction For Today
                    </span>
                    <span
                      className={`text-xs font-black px-2 py-0.5 rounded-full ${
                        willRain
                          ? "bg-blue-600 text-white"
                          : "bg-amber-500 text-white"
                      }`}
                    >
                      {willRain ? `${rainProb}% Chance` : `${rainProb}% Rain`}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black mt-0.5 leading-snug">
                    {weather.isRainingNow
                      ? "🌧️ Yes, it is currently raining right now!"
                      : willRain
                      ? `🌧️ Yes, rain is expected today (${weather.today.condition.label})`
                      : "☀️ No significant rain is expected today (Mostly Dry)"}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                    {willRain
                      ? `Expected rainfall volume: ~${weather.today.precipitationSum} mm with up to ${rainProb}% probability. Stay prepared with an umbrella in ${weather.locationName}!`
                      : `Sunny and clear conditions today with only a ${rainProb}% chance of light moisture.`}
                  </p>
                </div>
              </div>

              {/* Primary Question 2: How Many Degrees Celsius of Heat Today? */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-700 uppercase tracking-wider">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    <span>🌡️ Temperature & Heat Index</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    Updated {weather.updatedAt}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Current Heat</span>
                    <span className="text-2xl sm:text-3xl font-black text-emerald-600 block mt-0.5">
                      {currentTemp}°C
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      Feels like {weather.feelsLike}°C
                    </span>
                  </div>

                  <div className="bg-red-50/70 p-2.5 rounded-lg border border-red-100">
                    <span className="text-[10px] uppercase font-bold text-red-600 block">Today&apos;s High (Max)</span>
                    <span className="text-2xl sm:text-3xl font-black text-red-600 block mt-0.5">
                      {maxTemp}°C
                    </span>
                    <span className="text-[10px] font-semibold text-red-600/80">
                      Peak daytime heat
                    </span>
                  </div>

                  <div className="bg-blue-50/70 p-2.5 rounded-lg border border-blue-100">
                    <span className="text-[10px] uppercase font-bold text-blue-600 block">Today&apos;s Low (Min)</span>
                    <span className="text-2xl sm:text-3xl font-black text-blue-600 block mt-0.5">
                      {minTemp}°C
                    </span>
                    <span className="text-[10px] font-semibold text-blue-600/80">
                      Night / morning chill
                    </span>
                  </div>
                </div>
              </div>

              {/* Atmospheric Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                  <Droplets className="w-4 h-4 text-cyan-600 mx-auto mb-1" />
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Humidity</span>
                  <span className="text-sm font-black text-slate-900">{weather.humidity}%</span>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                  <Wind className="w-4 h-4 text-teal-600 mx-auto mb-1" />
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Wind Speed</span>
                  <span className="text-sm font-black text-slate-900">{weather.windSpeed} km/h</span>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                  <Umbrella className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Rain Volume</span>
                  <span className="text-sm font-black text-slate-900">{weather.today.precipitationSum} mm</span>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                  <Sparkles className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Condition</span>
                  <span className="text-xs font-black text-slate-900 truncate block" title={weather.condition.label}>
                    {weather.condition.label}
                  </span>
                </div>
              </div>

              {/* 5-Day Forecast Grid */}
              {weather.forecast && weather.forecast.length > 0 && (
                <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                    <span>📅 5-Day Weather Forecast</span>
                    <span className="text-[10px] font-bold text-slate-500">Phidim & Surrounding Hills</span>
                  </h4>

                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {weather.forecast.map((day, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg text-center flex flex-col items-center justify-between ${
                          idx === 0
                            ? "bg-emerald-50/80 border border-emerald-300 shadow-2xs"
                            : "bg-slate-50 border border-slate-100"
                        }`}
                      >
                        <span className="text-[11px] font-black text-slate-800">
                          {day.dayName}
                        </span>
                        <span className="text-[9px] text-slate-500 font-semibold mb-1">
                          {day.nepaliDayName}
                        </span>

                        <div className="my-1">
                          {renderWeatherIcon(day.condition.icon, "w-4 h-4 sm:w-5 sm:h-5")}
                        </div>

                        <div className="text-[11px] font-black text-slate-900 mt-1">
                          {day.maxTemp}° <span className="text-slate-400 font-normal text-[9px]">/ {day.minTemp}°</span>
                        </div>

                        <div
                          className={`mt-1 text-[9px] font-extrabold px-1 py-0.5 rounded-xs ${
                            day.rainProb >= 50
                              ? "bg-blue-100 text-blue-800"
                              : "bg-slate-100 text-slate-600"
                          }`}
                          title={`Rain Chance: ${day.rainProb}%`}
                        >
                          💧 {day.rainProb}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 p-3 sm:p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span className="text-[11px] font-medium">
                Live Open-Meteo Satellite & Meteorological Model
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
