/** Replace with the real handle (no "@"). Tracked in docs/TODO.md. */
const INSTAGRAM_HANDLE = "YOUR_IG_HANDLE";

export const site = {
  fullName: "Arwin Clyde B. Simondac",
  firstName: "Arwin",
  nickname: "Ace",
  lastName: "Simondac",
  role: "Software Developer",
  focus: "Full-stack & Frontend",
  tagline:
    "I build full-stack web and mobile products, from POS systems to AI-powered apps.",
  bio: "I'm Arwin Clyde “Ace” Simondac, a software developer who builds across the stack with Next.js, React, TypeScript and Supabase, plus mobile apps in Expo. My recent work includes POS and operations systems for local businesses, an AI job-matching platform, and a few experiments for fun, like a sound-driven horror game.",
  status: "Open to opportunities",
  githubUrl: "https://github.com/AceTheDeveloper",
  instagramUrl: `https://www.instagram.com/${INSTAGRAM_HANDLE}`,
} as const;

export const quickFacts: { label: string; value: string }[] = [
  { label: "Focus", value: "Full-stack web and mobile" },
  { label: "Core stack", value: "Next.js, React, TypeScript, Supabase" },
  { label: "Mobile", value: "Expo and React Native" },
  { label: "Status", value: site.status },
];

/** Shown in the scrolling strip between sections. All taken from data/skills.ts. */
export const marqueeStack: string[] = [
  "Next.js",
  "React",
  "TypeScript",
  "Supabase",
  "Tailwind CSS",
  "Expo",
  "React Native",
  "Clerk",
  "Node.js",
  "TanStack Query",
];
