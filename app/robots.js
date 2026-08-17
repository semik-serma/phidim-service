export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/dashboard",
          "/api",
          "/forgot-password",
          "/reset-password",
          "/login",
          "/register",
          "/technician-dashboard",
          "/user-dashboard",
        ],
      },
    ],
    sitemap: "https://phidimservice.com.np/sitemap.xml",
  };
}
