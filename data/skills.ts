export type SkillGroupId = "frontend" | "backend" | "mobile" | "data" | "tooling";

export interface SkillGroup {
  id: SkillGroupId;
  title: string;
  skills: string[];
}

/** Every entry appears in the dependencies or source of a repo in data/projects.ts. */
export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
      "React Hook Form",
      "Zod",
      "Zustand",
      "Framer Motion",
      "Recharts",
      "Vite",
      "React Router",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      "Node.js",
      "Express",
      "Next.js Route Handlers",
      "Server Actions",
      "Flask",
      "Sequelize",
      "Nodemailer",
      "JWT",
      "Google Gemini API",
      "Google Sheets API",
      "Google Apps Script",
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    skills: [
      "Expo",
      "React Native",
      "Expo Router",
      "NativeWind",
      "React Navigation",
    ],
  },
  {
    id: "data",
    title: "Data & Auth",
    skills: [
      "Supabase",
      "PostgreSQL",
      "Row Level Security",
      "Supabase Storage",
      "Supabase Realtime",
      "Clerk",
      "MySQL",
      "MongoDB",
      "Cloudinary",
      "IndexedDB",
    ],
  },
  {
    id: "tooling",
    title: "Tooling",
    skills: ["Git", "GitHub", "Vercel", "ESLint", "npm", "PostHog", "EAS"],
  },
];
