export const projectCategories = [
  "Full-stack",
  "Frontend",
  "Mobile",
  "Game",
  "Other",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export interface Project {
  slug: string;
  title: string;
  /** 1-2 sentences, accurate to the README or code. */
  summary: string;
  category: ProjectCategory;
  stack: string[];
  /** 0-3 concrete things taken from the README or code. */
  highlights: string[];
  repoUrl: string;
  /** Only set when the deployment actually responds. */
  liveUrl?: string;
  stars: number;
  /** ISO timestamp of the last push, from GitHub. */
  pushedAt: string;
  /** Featured cards span two columns and sort first. */
  featured: boolean;
  visible: boolean;
  /** Lower numbers come first among featured projects. */
  order?: number;
  /** Path under /public, e.g. "/projects/h-carwash-pos.png". */
  image?: string;
  /** Other entries that belong to the same product. */
  relatedSlugs?: string[];
  /** Short caveat shown on the card. */
  note?: string;
}

const ACE = "https://github.com/AceTheDeveloper";
const ORG = "https://github.com/Innovate-With-Ace";

/** Every listed repo, newest push first. Nothing is ranked or curated here. */
export const projects: Project[] = [
  {
    slug: "h-website",
    title: "H Breakfast to Bar Website",
    summary:
      "Marketing site for H Breakfast to Bar with home, about, menu, vouchers and location pages, built from content-driven components.",
    category: "Frontend",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "All content lives in one typed data file",
      "Menu page tabs are generated from the menu categories",
      "Vouchers page reveals more behind a See more control",
    ],
    repoUrl: `${ACE}/H-Website`,
    liveUrl: "https://hbreakfasttobar.vercel.app",
    stars: 0,
    pushedAt: "2026-10-12T07:47:05Z",
    featured: false,
    visible: true,
    relatedSlugs: ["h-carwash-pos", "h-breakfast-to-bar"],
  },
  {
    slug: "echo-horror",
    title: "EchoHorror: The Echo Maze",
    summary:
      "A sound-driven horror maze for the browser. You send out echoes to see the maze in the dark while blind hunters track you by noise.",
    category: "Game",
    stack: ["JavaScript", "HTML", "CSS"],
    highlights: [
      "Procedural audio, maze generation and enemy AI in vanilla JavaScript",
      "Headless gameplay tests that run the real game in a stubbed browser",
      "Plays on desktop and mobile with touch controls",
    ],
    repoUrl: `${ACE}/echo-horror`,
    stars: 0,
    pushedAt: "2026-10-06T11:51:58Z",
    featured: false,
    visible: true,
    note: "Art credits: see repo",
  },
  {
    slug: "h-carwash-pos",
    title: "H Carwash POS",
    summary:
      "Web-based point-of-sale and operations system for H Breakfast to Bar: carwash checkout, a live wash queue, staff commissions, an admin dashboard and reports.",
    category: "Full-stack",
    stack: [
      "Next.js",
      "TypeScript",
      "Clerk",
      "Supabase",
      "TanStack Query",
      "Tailwind CSS",
      "Recharts",
    ],
    highlights: [
      "Guided checkout with a live queue for pending and in-progress vehicles",
      "Role-based access with Clerk organization roles",
      "Reports export to CSV, Excel and PDF",
    ],
    repoUrl: `${ACE}/H-Carwash-POS`,
    liveUrl: "https://h-carwash-pos.vercel.app",
    stars: 0,
    pushedAt: "2026-10-04T02:20:58Z",
    featured: false,
    visible: true,
    relatedSlugs: ["h-website", "h-breakfast-to-bar"],
  },
  {
    slug: "f1stackmind",
    title: "F1StackMind",
    summary:
      "Website for the F1StackMind student tech organization, with officers, advisers, events, a membership join form and an AI chat widget.",
    category: "Frontend",
    stack: ["React", "Vite", "Tailwind CSS", "React Router", "Axios"],
    highlights: [
      "Membership join form with interest areas and a QR quick-join",
      "Built-in AI chat assistant widget",
    ],
    repoUrl: `${ACE}/F1StackMind`,
    stars: 0,
    pushedAt: "2026-09-29T04:11:58Z",
    featured: false,
    visible: true,
    relatedSlugs: [
      "f1stackmind-api",
      "f1stackmind-backend",
      "f1stackmindwebsite",
    ],
  },
  {
    slug: "beboys-mobile-app",
    title: "Beboy's Mobile App",
    summary:
      "Expo companion app for the Beboy's restaurant system, with sign-in and OTP verification, a menu, a cart, orders and a profile screen.",
    category: "Mobile",
    stack: [
      "Expo",
      "React Native",
      "TypeScript",
      "NativeWind",
      "Clerk",
      "React Hook Form",
      "Zod",
    ],
    highlights: [],
    repoUrl: `${ORG}/mobile_app`,
    stars: 0,
    pushedAt: "2026-09-22T08:48:51Z",
    featured: false,
    visible: true,
    relatedSlugs: ["beboys-final"],
  },
  {
    slug: "beboys-final",
    title: "Beboy's POS",
    summary:
      "Restaurant POS and admin system for Beboy's covering dishes, inventory, orders, staff and reports.",
    category: "Full-stack",
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Clerk",
      "Zustand",
      "TanStack Query",
      "Zod",
    ],
    highlights: [
      "Admin and staff access through Clerk organization roles",
      "Order and dish writes run as transactional Postgres functions",
      "Access checks at both the proxy and each API route",
    ],
    repoUrl: `${ORG}/beboys_final`,
    stars: 0,
    pushedAt: "2026-09-22T08:31:09Z",
    featured: false,
    visible: true,
    relatedSlugs: ["beboys-mobile-app"],
  },
  {
    slug: "h-breakfast-to-bar",
    title: "H-Breakfast-To-Bar",
    summary: "Placeholder repository with a README title and one text file.",
    category: "Other",
    stack: [],
    highlights: [],
    repoUrl: `${ACE}/H-Breakfast-To-Bar`,
    stars: 0,
    pushedAt: "2026-09-20T01:16:43Z",
    featured: false,
    visible: false, // no meaningful content
    relatedSlugs: ["h-website", "h-carwash-pos"],
  },
  {
    slug: "proply",
    title: "Proply",
    summary:
      "Real-estate mobile app with sign-in, sign-up and verification, profile onboarding, and a dashboard of recommended and nearby properties (sample data).",
    category: "Mobile",
    stack: [
      "Expo",
      "React Native",
      "TypeScript",
      "NativeWind",
      "Clerk",
      "React Hook Form",
    ],
    highlights: [],
    repoUrl: `${ACE}/proply`,
    stars: 0,
    pushedAt: "2026-07-14T00:45:24Z",
    featured: false,
    visible: true,
  },
  {
    slug: "festival-disposable-camera",
    title: "Festival Disposable Camera",
    summary:
      "A ten-exposure disposable-camera experience for a festival booth: scan a QR code, shoot 10 photos, submit your name and browse everyone's rolls in a public gallery.",
    category: "Full-stack",
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "IndexedDB",
      "Tailwind CSS",
      "Framer Motion",
      "Zustand",
    ],
    highlights: [
      "Offline upload queue in IndexedDB with idempotent retries",
      "Every database write goes through a Server Action, with RLS on reads",
      "Feature-based folders for camera, upload, submission and gallery",
    ],
    repoUrl: `${ACE}/Festival-Disposable-Camera`,
    stars: 0,
    pushedAt: "2026-07-05T13:10:40Z",
    featured: false,
    visible: true,
  },
  {
    slug: "dev-event",
    title: "DevEvent",
    summary:
      "Landing page for a developer-events hub listing hackathons, meetups and conferences as featured event cards (sample data).",
    category: "Frontend",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "PostHog"],
    highlights: [],
    repoUrl: `${ACE}/dev-event`,
    stars: 0,
    pushedAt: "2026-06-29T14:33:52Z",
    featured: false,
    visible: true,
  },
  {
    slug: "f1stackmind-api",
    title: "F1StackMind API",
    summary:
      "Small Next.js API for F1StackMind: accepting a member creates their Supabase auth account and sends a welcome email.",
    category: "Other",
    stack: ["Next.js", "TypeScript", "Supabase", "Nodemailer"],
    highlights: [],
    repoUrl: `${ACE}/F1StackMind-API`,
    liveUrl: "https://f1-stack-mind-api.vercel.app",
    stars: 0,
    pushedAt: "2026-06-19T14:56:46Z",
    featured: false,
    visible: true,
    relatedSlugs: ["f1stackmind", "f1stackmind-backend", "f1stackmindwebsite"],
  },
  {
    slug: "innovex2026",
    title: "JobMatch AI",
    summary:
      "AI-powered job matching for the Philippine and Indonesian labor markets: a Next.js backend API and an Expo mobile app that connect employers and applicants using Google Gemini.",
    category: "Full-stack",
    stack: [
      "Next.js",
      "TypeScript",
      "Expo",
      "React Native",
      "Google Gemini",
      "NativeWind",
    ],
    highlights: [
      "Resume and job-post extraction from PDF and DOCX uploads",
      "Two-way matching with explainable scores",
      "Gap analysis with upskilling suggestions",
    ],
    repoUrl: `${ACE}/Innovex2026`,
    stars: 0,
    pushedAt: "2026-05-31T14:20:40Z",
    featured: false,
    visible: true,
  },
  {
    slug: "sara-flask",
    title: "SARA Flask API",
    summary:
      "Flask API for food ordering that reads the menu and records orders in Google Sheets, updating item stock as orders come in.",
    category: "Other",
    stack: ["Python", "Flask", "Google Sheets API"],
    highlights: [],
    repoUrl: `${ACE}/sara_flask`,
    stars: 0,
    pushedAt: "2026-03-26T06:36:10Z",
    featured: false,
    visible: true,
    relatedSlugs: ["sara"],
  },
  {
    slug: "ite-307",
    title: "ITE 307",
    summary:
      "Coursework web app with JWT login and email OTP verification, a protected dashboard, and a products CRUD API backed by MySQL.",
    category: "Full-stack",
    stack: [
      "Next.js",
      "TypeScript",
      "MySQL",
      "TanStack Query",
      "shadcn/ui",
      "Nodemailer",
    ],
    highlights: [],
    repoUrl: `${ACE}/ite_307`,
    stars: 1,
    pushedAt: "2026-03-19T05:37:27Z",
    featured: false,
    visible: true,
  },
  {
    slug: "sara",
    title: "SARA",
    summary:
      "Next.js starter with a stub order API route. The working backend is in the SARA Flask API repo.",
    category: "Frontend",
    stack: ["Next.js", "TypeScript"],
    highlights: [],
    repoUrl: `${ACE}/SARA`,
    stars: 0,
    pushedAt: "2026-03-17T08:34:06Z",
    featured: false,
    visible: false, // default create-next-app page plus a stub route
    relatedSlugs: ["sara-flask"],
  },
  {
    slug: "dalisay-clinic",
    title: "Dalisay Clinic",
    summary:
      "Landing page for a medical clinic in Iloilo City with services, doctors and contact sections.",
    category: "Frontend",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [],
    repoUrl: `${ACE}/dalisay_clinic`,
    liveUrl: "https://dalisay-clinic.vercel.app",
    stars: 0,
    pushedAt: "2026-01-31T12:53:12Z",
    featured: false,
    visible: true,
  },
  {
    slug: "f1stackmind-backend",
    title: "F1StackMind Backend",
    summary:
      "REST API for F1StackMind covering applicants, members, events, notices, notifications and an admin dashboard.",
    category: "Other",
    stack: [
      "Node.js",
      "Express",
      "Sequelize",
      "MySQL",
      "JWT",
      "Cloudinary",
      "Nodemailer",
    ],
    highlights: [],
    repoUrl: `${ACE}/F1StackMind-Backend`,
    stars: 0,
    pushedAt: "2026-01-18T09:44:37Z",
    featured: false,
    visible: true,
    relatedSlugs: ["f1stackmind", "f1stackmind-api", "f1stackmindwebsite"],
  },
  {
    slug: "patient-budgettrack",
    title: "MediTrack Prototype",
    summary:
      "Front-end prototype with patients, doctors and budget-tracking views, running on dummy data with no backend.",
    category: "Frontend",
    stack: ["React", "Vite", "Tailwind CSS", "React Router"],
    highlights: [],
    repoUrl: `${ACE}/patient-budgetTrack`,
    stars: 0,
    pushedAt: "2025-10-26T09:03:36Z",
    featured: false,
    visible: true,
  },
  {
    slug: "express-app",
    title: "Express App",
    summary:
      "Expo shopping prototype with a login screen, a product list and a cart, using local JSON data.",
    category: "Mobile",
    stack: ["Expo", "React Native", "JavaScript", "NativeWind"],
    highlights: [],
    repoUrl: `${ACE}/Express_app`,
    stars: 0,
    pushedAt: "2025-10-26T08:58:58Z",
    featured: false,
    visible: true,
  },
  {
    slug: "cyboard",
    title: "Cyboard",
    summary:
      "Expo app for finding boarding houses by province and city, with listing details and a Gemini-powered chat that plays the house owner.",
    category: "Mobile",
    stack: ["Expo", "React Native", "JavaScript", "Google Gemini"],
    highlights: [],
    repoUrl: `${ACE}/Cyboard`,
    stars: 0,
    pushedAt: "2025-10-26T08:50:20Z",
    featured: false,
    visible: true,
  },
  {
    slug: "f1stackmindwebsite",
    title: "F1StackMind Website (static)",
    summary:
      "Earlier static HTML and Tailwind version of the F1StackMind site. The default branch is empty; the files are on the main branch.",
    category: "Frontend",
    stack: ["HTML", "Tailwind CSS", "JavaScript"],
    highlights: [],
    repoUrl: `${ACE}/F1StackMindWebsite`,
    stars: 0,
    pushedAt: "2025-10-20T03:26:01Z",
    featured: false,
    visible: false, // default branch has no files
    relatedSlugs: ["f1stackmind", "f1stackmind-api", "f1stackmind-backend"],
  },
  {
    slug: "cite-lost-and-found",
    title: "CITE Lost & Found",
    summary:
      "Lost-and-found reporting app: a React front end with a report form, and an Express and MySQL backend that stores submitted items.",
    category: "Full-stack",
    stack: ["React", "Vite", "Tailwind CSS", "Express", "MySQL"],
    highlights: [],
    repoUrl: `${ACE}/cite_lost_and_found`,
    stars: 0,
    pushedAt: "2025-08-08T18:08:33Z",
    featured: false,
    visible: true,
  },
  {
    slug: "gsm-frontend",
    title: "Gym Membership System",
    summary:
      "Front end for a gym membership system built as a Google Apps Script web app, with dashboard, member info and member log pages.",
    category: "Frontend",
    stack: ["Google Apps Script", "HTML", "Tailwind CSS", "jQuery"],
    highlights: [],
    repoUrl: `${ACE}/GSM-FrontEnd-`,
    stars: 0,
    pushedAt: "2025-06-14T16:13:05Z",
    featured: false,
    visible: true,
  },
  {
    slug: "calculator-app",
    title: "Calculator App",
    summary: "Single-page calculator built with HTML, JavaScript and Tailwind CSS.",
    category: "Frontend",
    stack: ["HTML", "JavaScript", "Tailwind CSS"],
    highlights: [],
    repoUrl: `${ACE}/Calculator_App`,
    stars: 0,
    pushedAt: "2025-05-13T19:01:35Z",
    featured: false,
    visible: true,
  },
  {
    slug: "awesometodosapp",
    title: "Awesome Todos App",
    summary:
      "Todo app with an Express and MongoDB REST API that also serves a built React client.",
    category: "Full-stack",
    stack: ["Node.js", "Express", "MongoDB", "React"],
    highlights: [],
    repoUrl: `${ACE}/awesometodosapp`,
    stars: 0,
    pushedAt: "2025-04-03T10:40:04Z",
    featured: false,
    visible: true,
  },
  {
    slug: "websitedemo",
    title: "Website Demo",
    summary:
      "Static multi-section school website built with HTML, CSS and Bootstrap.",
    category: "Frontend",
    stack: ["HTML", "CSS", "Bootstrap"],
    highlights: [],
    repoUrl: `${ACE}/WebsiteDemo`,
    stars: 0,
    pushedAt: "2025-03-14T00:53:34Z",
    featured: false,
    visible: true,
  },
  {
    slug: "acethedeveloper",
    title: "AceTheDeveloper",
    summary: "GitHub profile configuration repository. Currently empty.",
    category: "Other",
    stack: [],
    highlights: [],
    repoUrl: `${ACE}/AceTheDeveloper`,
    stars: 0,
    pushedAt: "2024-10-03T16:12:25Z",
    featured: false,
    visible: false, // empty repository
  },
  {
    slug: "terraquest",
    title: "TerraQuest",
    summary:
      "Static travel-agency website with destinations, tours, about and contact sections.",
    category: "Frontend",
    stack: ["HTML", "CSS"],
    highlights: [],
    repoUrl: `${ACE}/TerraQuest`,
    stars: 0,
    pushedAt: "2024-09-30T06:43:52Z",
    featured: false,
    visible: true,
  },
];

/** Visible projects: featured first (by `order`), then newest push first. */
export const visibleProjects: Project[] = projects
  .filter((project) => project.visible)
  .sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    const byOrder = a.featured
      ? (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER)
      : 0;
    return byOrder || b.pushedAt.localeCompare(a.pushedAt);
  });
