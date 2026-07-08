import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Zet de workspace-root expliciet op deze map (er staat een tweede
  // package-lock.json hoger in /Users/dift, wat anders een waarschuwing geeft).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
