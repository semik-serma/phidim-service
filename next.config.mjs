const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://service.phidimservice.com.np";


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