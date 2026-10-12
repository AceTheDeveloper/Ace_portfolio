/*
 * Brand logos for the tech-stack chips. The artwork lives in
 * public/tech-icons.svg, a sprite of single-colour 24x24 symbols from
 * Simple Icons (simpleicons.org, CC0), one <symbol id="slug"> per brand.
 * To add a logo: copy the brand's path from simpleicons.org into a new
 * <symbol> in that file, then map the tech name to its slug below. Names with
 * no entry get a generic icon (see components/ui/TechIcon.tsx).
 */

/** Tech name as written in data/skills.ts and data/projects.ts -> symbol id in the sprite. */
export const techLogo: Record<string, string> = {
  "Axios": "axios",
  "Bootstrap": "bootstrap",
  "CSS": "css",
  "Clerk": "clerk",
  "Cloudinary": "cloudinary",
  "EAS": "expo",
  "ESLint": "eslint",
  "Expo": "expo",
  "Expo Router": "expo",
  "Express": "express",
  "Flask": "flask",
  "Framer Motion": "framer",
  "Git": "git",
  "GitHub": "github",
  "Google Apps Script": "googleappsscript",
  "Google Gemini": "googlegemini",
  "Google Gemini API": "googlegemini",
  "Google Sheets API": "googlesheets",
  "HTML": "html5",
  "JWT": "jsonwebtokens",
  "JavaScript": "javascript",
  "MongoDB": "mongodb",
  "MySQL": "mysql",
  "Next.js": "nextdotjs",
  "Next.js Route Handlers": "nextdotjs",
  "Node.js": "nodedotjs",
  "PostHog": "posthog",
  "PostgreSQL": "postgresql",
  "Python": "python",
  "React": "react",
  "React Hook Form": "reacthookform",
  "React Native": "react",
  "React Router": "reactrouter",
  "Sequelize": "sequelize",
  "Supabase": "supabase",
  "Supabase Realtime": "supabase",
  "Supabase Storage": "supabase",
  "Tailwind CSS": "tailwindcss",
  "TanStack Query": "reactquery",
  "TypeScript": "typescript",
  "Vercel": "vercel",
  "Vite": "vite",
  "Zod": "zod",
  "jQuery": "jquery",
  "npm": "npm",
  "shadcn/ui": "shadcnui"
};
