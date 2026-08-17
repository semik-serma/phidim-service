/**
 * Weather Service for Phidim Service
 * Fetches real-time temperature, weather condition, rain forecast, and heat indices.
 * Powered by Open-Meteo API (Free, high precision, no API key required).
 */

export const PHIDIM_COORDS = {
  name: "Phidim, Panchthar",
  nepaliName: "फिदिम, पाँचथर",
  latitude: 27.1511,
  longitude: 87.7594,
  elevation: 1200
};

const WEATHER_CODE_MAP = {
  0: { label: "Clear Sky", nepaliLabel: "सफा आकाश", icon: "Sun", isRain: false },
  1: { label: "Mainly Clear", nepaliLabel: "मुख्यतया सफा", icon: "Sun", isRain: false },
  2: { label: "Partly Cloudy", nepaliLabel: "आंशिक बदली", icon: "CloudSun", isRain: false },
  3: { label: "Overcast", nepaliLabel: "बादल लागेको", icon: "Cloud", isRain: false },
  45: { label: "Foggy", nepaliLabel: "कुहिरो लागेको", icon: "CloudFog", isRain: false },
  48: { label: "Rime Fog", nepaliLabel: "बाक्लो कुहिरो", icon: "CloudFog", isRain: false },
  51: { label: "Light Drizzle", nepaliLabel: "हल्का सिमसिम पानी", icon: "CloudDrizzle", isRain: true },
  53: { label: "Moderate Drizzle", nepaliLabel: "सिमसिम पानी", icon: "CloudDrizzle", isRain: true },
  55: { label: "Heavy Drizzle", nepaliLabel: "बाक्लो सिमसिम पानी", icon: "CloudDrizzle", isRain: true },
  56: { label: "Freezing Drizzle", nepaliLabel: "चिसो सिमसिम पानी", icon: "CloudDrizzle", isRain: true },
  57: { label: "Dense Freezing Drizzle", nepaliLabel: "अत्यधिक चिसो सिमसिम", icon: "CloudDrizzle", isRain: true },
  61: { label: "Slight Rain", nepaliLabel: "हल्का वर्षा", icon: "CloudRain", isRain: true },
  63: { label: "Moderate Rain", nepaliLabel: "मध्यम वर्षा", icon: "CloudRain", isRain: true },
  65: { label: "Heavy Rain", nepaliLabel: "भारी वर्षा", icon: "CloudRain", isRain: true },
  66: { label: "Freezing Rain", nepaliLabel: "हिउँदे वर्षा", icon: "CloudRain", isRain: true },
  67: { label: "Heavy Freezing Rain", nepaliLabel: "भारी हिउँदे वर्षा", icon: "CloudRain", isRain: true },
  71: { label: "Slight Snow", nepaliLabel: "हल्का हिमपात", icon: "Snowflake", isRain: false },
  73: { label: "Moderate Snow", nepaliLabel: "मध्यम हिमपात", icon: "Snowflake", isRain: false },
  75: { label: "Heavy Snow", nepaliLabel: "भारी हिमपात", icon: "Snowflake", isRain: false },
  77: { label: "Snow Grains", nepaliLabel: "हिउँका कण", icon: "Snowflake", isRain: false },
  80: { label: "Light Rain Showers", nepaliLabel: "हल्का झरी", icon: "CloudRain", isRain: true },
  81: { label: "Moderate Rain Showers", nepaliLabel: "मध्यम झरी", icon: "CloudRain", isRain: true },
  82: { label: "Violent Rain Showers", nepaliLabel: "मुसलधारे झरी", icon: "CloudRain", isRain: true },
  85: { label: "Slight Snow Showers", nepaliLabel: "हल्का हिउँ झरी", icon: "Snowflake", isRain: false },
  86: { label: "Heavy Snow Showers", nepaliLabel: "भारी हिउँ झरी", icon: "Snowflake", isRain: false },
  95: { label: "Thunderstorm", nepaliLabel: "चट्याङसहित वर्षा", icon: "CloudLightning", isRain: true },
  96: { label: "Thunderstorm with Hail", nepaliLabel: "असिनासहित चट्याङ", icon: "CloudLightning", isRain: true },
  99: { label: "Heavy Thunderstorm with Hail", nepaliLabel: "भारी असिना र चट्याङ", icon: "CloudLightning", isRain: true }
};

export function getWeatherConditionInfo(code) {
  return WEATHER_CODE_MAP[code] || {
    label: "Partly Cloudy",
    nepaliLabel: "आंशिक बदली",
    icon: "CloudSun",
    isRain: false
  };
}

const CACHE_KEY = "phidim_service_weather_data";
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

/**
 * Fetch current and daily forecast weather data
 */
export async function fetchWeather({
  latitude = PHIDIM_COORDS.latitude,
  longitude = PHIDIM_COORDS.longitude,
  locationName = PHIDIM_COORDS.name,
  forceRefresh = false
} = {}) {
  const cacheStorageKey = `${CACHE_KEY}_${latitude.toFixed(2)}_${longitude.toFixed(2)}`;

  // 1. Check local cache if not forcing refresh
  if (!forceRefresh && typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(cacheStorageKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
          return { ...parsed.data, isFromCache: true };
        }
      }
    } catch (e) {
      console.warn("Weather cache read error:", e);
    }
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=auto`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Weather API returned ${res.status}`);
    }

    const json = await res.json();
    const current = json.current || {};
    const daily = json.daily || {};

    const currentTemp = Math.round(current.temperature_2m ?? 26);
    const feelsLike = Math.round(current.apparent_temperature ?? currentTemp);
    const weatherCode = current.weather_code ?? 1;
    const condition = getWeatherConditionInfo(weatherCode);

    const isRainingNow =
      (current.rain ?? 0) > 0 ||
      (current.precipitation ?? 0) > 0 ||
      condition.isRain;

    // Today's Daily Data (Index 0)
    const todayMaxTemp = daily.temperature_2m_max ? Math.round(daily.temperature_2m_max[0]) : currentTemp + 2;
    const todayMinTemp = daily.temperature_2m_min ? Math.round(daily.temperature_2m_min[0]) : currentTemp - 6;
    const todayRainProb = daily.precipitation_probability_max ? daily.precipitation_probability_max[0] : (isRainingNow ? 95 : 20);
    const todayPrecipSum = daily.precipitation_sum ? Number(daily.precipitation_sum[0].toFixed(1)) : 0;
    const todayCode = daily.weather_code ? daily.weather_code[0] : weatherCode;
    const todayCondition = getWeatherConditionInfo(todayCode);

    const willRainToday =
      todayRainProb >= 40 ||
      todayPrecipSum > 0.5 ||
      todayCondition.isRain ||
      isRainingNow;

    // Build 5-Day Forecast
    const forecastDays = [];
    if (daily.time && Array.isArray(daily.time)) {
      const daysCount = Math.min(daily.time.length, 5);
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const nepaliDayNames = ["आइत", "सोम", "मङ्गल", "बुध", "बिही", "शुक्र", "शनि"];

      for (let i = 0; i < daysCount; i++) {
        const dateObj = new Date(daily.time[i]);
        const dayIdx = dateObj.getDay();
        const code = daily.weather_code ? daily.weather_code[i] : 0;
        const cond = getWeatherConditionInfo(code);
        
        forecastDays.push({
          date: daily.time[i],
          dayName: i === 0 ? "Today" : dayNames[dayIdx],
          nepaliDayName: i === 0 ? "आज" : nepaliDayNames[dayIdx],
          maxTemp: Math.round(daily.temperature_2m_max[i]),
          minTemp: Math.round(daily.temperature_2m_min[i]),
          rainProb: daily.precipitation_probability_max ? daily.precipitation_probability_max[i] : 0,
          precipSum: daily.precipitation_sum ? Number(daily.precipitation_sum[i].toFixed(1)) : 0,
          weatherCode: code,
          condition: cond
        });
      }
    }

    const result = {
      locationName,
      latitude,
      longitude,
      currentTemp,
      feelsLike,
      weatherCode,
      condition,
      isRainingNow,
      humidity: current.relative_humidity_2m ?? 65,
      windSpeed: current.wind_speed_10m ?? 2.5,
      isDay: current.is_day === 1,
      today: {
        maxTemp: todayMaxTemp,
        minTemp: todayMinTemp,
        rainProbability: todayRainProb,
        precipitationSum: todayPrecipSum,
        willRainToday,
        condition: todayCondition
      },
      forecast: forecastDays,
      updatedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isFromCache: false
    };

    // Save to cache
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          cacheStorageKey,
          JSON.stringify({
            timestamp: Date.now(),
            data: result
          })
        );
      } catch (e) {
        console.warn("Weather cache write error:", e);
      }
    }

    return result;
  } catch (error) {
    console.error("Error fetching weather:", error);

    // Fallback data if offline / fetch failure
    return {
      locationName,
      latitude,
      longitude,
      currentTemp: 26,
      feelsLike: 27,
      weatherCode: 2,
      condition: getWeatherConditionInfo(2),
      isRainingNow: false,
      humidity: 60,
      windSpeed: 2.0,
      isDay: true,
      today: {
        maxTemp: 29,
        minTemp: 20,
        rainProbability: 40,
        precipitationSum: 1.2,
        willRainToday: true,
        condition: getWeatherConditionInfo(2)
      },
      forecast: [
        { dayName: "Today", nepaliDayName: "आज", maxTemp: 29, minTemp: 20, rainProb: 40, condition: getWeatherConditionInfo(2) },
        { dayName: "Tomorrow", nepaliDayName: "भोलि", maxTemp: 28, minTemp: 19, rainProb: 60, condition: getWeatherConditionInfo(61) }
      ],
      updatedAt: "Live",
      isFallback: true
    };
  }
}
