import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prisma Compute runs the standalone server that `next build` writes.
  // Without it the deploy completes, but the URL answers 504.
  output: "standalone",
  // The app has no images to optimize. Turning the optimizer off and leaving
  // sharp's native binaries (~46 MB) out of the standalone output makes the
  // upload of every deploy about three times smaller.
  images: { unoptimized: true },
  outputFileTracingExcludes: { "*": ["node_modules/sharp/**", "node_modules/@img/**"] },
};

export default nextConfig;
