import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The OCSM core ships TypeScript source, so Next must transpile it.
  transpilePackages: ["@orhancodestudio/ocsm-core"],
};

export default nextConfig;
