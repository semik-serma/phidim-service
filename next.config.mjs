const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://phidim.phidimservice.com.np" ||
  "http://127.0.0.1:5000";

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;