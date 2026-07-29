import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "portfolio.openstair.in",
          },
        ],
        destination: "/apps",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
