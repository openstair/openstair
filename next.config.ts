import type { NextConfig } from "next";
import { approvedExternalBlogImageHosts } from "./lib/blog-images";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: approvedExternalBlogImageHosts.map((hostname) => ({
      protocol: "https",
      hostname,
      port: "",
      pathname: "/**",
      search: "",
    })),
  },
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
