import { NextResponse } from "next/server";

const PUBLIC_EXACT = new Set([
  "/",
  "/sitemap.xml",
  "/sw.js",
  "/favicon.ico",
  "/logo.png",
  "/apple-touch-icon.png",
  "/site.webmanifest",
]);

const PUBLIC_PREFIXES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/401",
  "/403",
  "/api/auth",
  "/api/calls",
  "/api/chat",
  "/api/users",
  "/api/health",
  "/services",
  "/phidim",
  "/panchthar",
  "/_next",
];

function isPublic(pathname) {
  if (PUBLIC_EXACT.has(pathname)) return true;
  return PUBLIC_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(prefix + "/"));
}

function parseUserFromCookie(rawVal) {
  if (!rawVal) return null;
  try {
    let clean = decodeURIComponent(rawVal);
    if (clean.includes("%")) {
      try {
        clean = decodeURIComponent(clean);
      } catch (e) {}
    }
    if (typeof clean === "string" && clean.startsWith("j:")) {
      clean = clean.slice(2);
    }
    return JSON.parse(clean);
  } catch (e) {
    return null;
  }
}

function parseUserFromJwt(token) {
  if (!token || typeof token !== "string") return null;
  try {
    const parts = token.split(".");
    if (parts.length === 3) {
      let b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      while (b64.length % 4) b64 += "=";
      const jsonStr = atob(b64);
      const payload = JSON.parse(jsonStr);
      if (payload && payload.role && typeof payload.exp === "number" && payload.exp * 1000 > Date.now()) {
        return payload;
      }
    }
  } catch (e) {}
  return null;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Static files & public assets pass through
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(png|jpg|jpeg|svg|webp|ico|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // 2. Resolve User Session from Cookies
  const authUserCookie = request.cookies.get("phidim_auth_user")?.value || null;
  const tokenCookie = request.cookies.get("phidim_access_token")?.value || null;

  let sessionUser = parseUserFromCookie(authUserCookie);
  if (!sessionUser && tokenCookie) {
    sessionUser = parseUserFromJwt(tokenCookie);
  }

  const role = sessionUser?.role ? String(sessionUser.role).toUpperCase() : null;
  const ownDashboard =
    role === "ADMIN"
      ? "/admin/dashboard"
      : role === "TECHNICIAN"
      ? "/technician/dashboard"
      : "/user/dashboard";

  // 3. Logged-in users visiting auth pages get redirected to their dashboard
  if (sessionUser && ["/forgot-password", "/reset-password"].includes(pathname)) {
    if (pathname !== ownDashboard) {
      return NextResponse.redirect(new URL(ownDashboard, request.url));
    }
  }

  // 4. Public routes pass through
  if (isPublic(pathname)) {
    return NextResponse.next();
  }

  // 5. API routes: allow all to reach their route handler (authoritative DB checks happen inside handlers)
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // 6. Legacy dashboard aliases
  if (pathname === "/user-dashboard" || pathname === "/dashboard/user") {
    return NextResponse.redirect(new URL("/user/dashboard", request.url));
  }
  if (pathname === "/technician-dashboard" || pathname === "/dashboard/technician") {
    return NextResponse.redirect(new URL("/technician/dashboard", request.url));
  }
  if (pathname === "/dashboard/admin" || pathname === "/dashboard") {
    return NextResponse.redirect(new URL(ownDashboard, request.url));
  }

  // 7. Protected Page Roles Check
  const isUserRoute = pathname.startsWith("/user/") || pathname === "/user" || pathname.startsWith("/requests");
  const isTechRoute = pathname.startsWith("/technician/") || pathname === "/technician";
  const isAdminRoute = pathname.startsWith("/admin/") || pathname === "/admin";

  if (isUserRoute || isTechRoute || isAdminRoute) {
    if (!sessionUser) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Role boundary checks (Admins can access user routes for testing/supervision)
    if (isUserRoute && role !== "USER" && role !== "ADMIN") {
      if (pathname !== ownDashboard) {
        return NextResponse.redirect(new URL(ownDashboard, request.url));
      }
    }
    if (isTechRoute && role !== "TECHNICIAN" && role !== "ADMIN") {
      if (pathname !== ownDashboard) {
        return NextResponse.redirect(new URL(ownDashboard, request.url));
      }
    }
    if (isAdminRoute && role !== "ADMIN") {
      if (pathname !== ownDashboard) {
        return NextResponse.redirect(new URL(ownDashboard, request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};