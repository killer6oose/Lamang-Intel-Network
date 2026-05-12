import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `npm run build` produces an `out/` folder - no Node.js server needed.
  // Upload the contents of out/ into a /builder/ directory on your web server.
  // Apache/Nginx will serve them as plain static files alongside the rest of lamangintel.net.
  output: "export",

  // basePath: the app is uploaded to /builder/ on the host, so all asset paths
  // (_next/static/...) need this prefix to load correctly.
  basePath: "/builder",

  images: {
    unoptimized: true, // required for static export (no Image Optimization API)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
        pathname: "/gray-zone-warfare/**",
      },
    ],
  },
};

export default nextConfig;
