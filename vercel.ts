import type { VercelConfig } from "@vercel/config/v1";

/*
 * Vercel-configuratie voor de site van Lucas Borghys.
 * Bouwt als standaard Next.js-project; er zijn geen rewrites, redirects
 * of crons nodig. Environment variables (RESEND_API_KEY, CONTACT_TO,
 * CONTACT_FROM, NEXT_PUBLIC_POSTHOG_KEY, NEXT_PUBLIC_POSTHOG_HOST) worden
 * apart in het Vercel-dashboard ingesteld, niet hier.
 */
export const config: VercelConfig = {
  framework: "nextjs",
  buildCommand: "npm run build",
};

export default config;
