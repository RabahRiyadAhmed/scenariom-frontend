import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  transpilePackages: ["@scenariom/design-system"],
  turbopack: {
    // pnpm hoists Next to front/node_modules; web and the linked packages are
    // contained by the frontend repository root.
    root: path.join(__dirname, ".."),
  },
  // The dev tools indicator sits fixed bottom-left by default and was overlapping the
  // last items of the components sidebar (see /components). Move it out of the way.
  devIndicators: {
    position: "bottom-right",
  },
  // Allow HMR/dev resources when the app is accessed from another host on the local network.
  allowedDevOrigins: ["172.16.0.2", "192.168.100.28"],
};

export default nextConfig;
