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
    // AVIF vóór WebP. Next stuurt AVIF enkel naar browsers die het in hun
    // Accept-header vragen; de rest krijgt gewoon WebP, dus dit is een
    // onzichtbare wijziging voor de bezoeker — dezelfde kwaliteitsinstelling,
    // alleen een zuiniger formaat.
    //
    // Gemeten op de hero (het beeld dat de LCP bepaalt), bij ongewijzigde
    // quality=88:
    //   w=750  (iPhone DPR2): 46.386 -> 30.600 bytes  (-34%)
    //   w=1200 (iPhone DPR3): 100.536 -> 62.721 bytes (-38%)
    //
    // Dat is bovendien zuiniger dán de kwaliteit terugschroeven zou opleveren
    // (WebP op q=80 is 65.502 bytes op w=1200), dus de scherpte van de hero
    // hoeft er niet voor in te leveren.
    //
    // Het gebruikelijke bezwaar tegen AVIF is de tragere codering, wat bij
    // weinig verkeer meer bezoekers een koude cache zou laten betalen. Nagemeten
    // en niet het geval: koud 0,07-0,14 s tegen 0,05-0,22 s voor WebP.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
