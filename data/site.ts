/*
 * Optional details. Leave a value empty and the page simply leaves it out:
 * an empty handle hides that button and its mention in the Contact copy, and an
 * empty location shows no location line.
 */
const INSTAGRAM_HANDLE: string = "acee.tsx";
const FACEBOOK_HANDLE: string = "clyde.simondac.9";
const LOCATION: string = "";

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
  location: LOCATION || null,
  githubUser: "AceTheDeveloper",
  githubUrl: "https://github.com/AceTheDeveloper",
  instagramUrl: INSTAGRAM_HANDLE
    ? `https://www.instagram.com/${INSTAGRAM_HANDLE}/`
    : null,
  facebookUrl: FACEBOOK_HANDLE
    ? `https://www.facebook.com/${FACEBOOK_HANDLE}`
    : null,
} as const;

/** Rows of the About title block. Only facts; the decorative cells live in the component. */
export const titleBlock: { label: string; value: string }[] = [
  { label: "Name", value: site.fullName },
  { label: "Role", value: site.role },
  { label: "Focus", value: "Full-stack web and mobile" },
  { label: "Stack", value: "Next.js, React, TypeScript, Supabase, Expo" },
  { label: "Studying", value: "Information Technology" },
  { label: "Status", value: site.status },
];
