import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Zet de workspace-root expliciet op deze map (er staat een tweede
  // package-lock.json hoger in /Users/dift, wat anders een waarschuwing geeft).
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // `images.qualities` staat standaard op enkel [75] — een `quality`-prop met
    // een andere waarde (bv. de hero op 88) wordt anders stilzwijgend terug-
    // geklemd naar 75, zonder waarschuwing. Expliciet toevoegen dus.
    qualities: [75, 88],
  },
};

export default nextConfig;
