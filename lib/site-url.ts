/**
 * The site's public origin. On Vercel this is the production domain (a custom
 * domain is picked up automatically); locally it falls back to localhost.
 */
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";
