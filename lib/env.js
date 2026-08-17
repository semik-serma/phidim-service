/**
 * Environment Variable Validator for Google OAuth & Authentication
 */

export function getAuthConfig() {
  const googleClientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || process.env.CLIENT_ID_SECRET;
  const googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL || "";
  const nextAuthSecret = process.env.NEXTAUTH_SECRET || "phidim_default_secret_key_2026";
  const nextAuthUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const jwtAccessSecret = process.env.JWT_SECRET || process.env.ACCESS_TOKEN_SECRET || "phidim_service_express_jwt_secret_key_2026";
  const jwtRefreshSecret = process.env.REFRESH_TOKEN_SECRET || "phidim_service_refresh_secret_key_2026";

  const missing = [];
  if (!googleClientId) missing.push("GOOGLE_CLIENT_ID / CLIENT_ID");
  if (!googleClientSecret) missing.push("GOOGLE_CLIENT_SECRET / CLIENT_ID_SECRET");
  if (!googleCallbackUrl) missing.push("GOOGLE_CALLBACK_URL");

  const isConfigured = missing.length === 0;

  return {
    googleClientId,
    googleClientSecret,
    googleCallbackUrl,
    nextAuthSecret,
    nextAuthUrl,
    jwtAccessSecret,
    jwtRefreshSecret,
    isConfigured,
    missing,
  };
}

export function validateAuthConfigOrWarn() {
  const config = getAuthConfig();
  if (!config.isConfigured) {
    console.warn(
      `[Auth Warning] Google OAuth environment variables missing: ${config.missing.join(", ")}. Please set them in your .env.local file.`
    );
  }
  return config;
}
