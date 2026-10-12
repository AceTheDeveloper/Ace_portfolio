# Ace portfolio

Single-page portfolio for Arwin Clyde "Ace" Simondac. Next.js (App Router), TypeScript, Tailwind CSS 4, lucide-react, and a few [React Bits](https://reactbits.dev) components.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # production build
npm run start    # serve the production build
```

## Where the content lives

All text and data is in `data/`. No component needs editing for content changes.

| File | What it holds |
| --- | --- |
| `data/site.ts` | Name, role, tagline, bio, quick facts, GitHub link, Instagram handle, marquee items |
| `data/projects.ts` | Every project card |
| `data/skills.ts` | The five skill groups |
| `data/experience.ts` | Timeline entries (empty for now) |

### Set the Instagram handle

In `data/site.ts`, change the first line:

```ts
const INSTAGRAM_HANDLE = "YOUR_IG_HANDLE";
```

### Feature a project

In `data/projects.ts`, set `featured: true` on the entry. Featured cards span two columns and sort first. Use `order` to arrange several featured projects (lower comes first):

```ts
{ slug: "h-carwash-pos", /* ... */ featured: true, order: 1 },
```

Everything else sorts by `pushedAt`, newest first. The grid shows 9 cards and puts the rest behind "Show more".

### Hide or show a project

Flip `visible`. Four entries are hidden because the repos have no real content; the reason is in a comment next to each flag.

### Add a screenshot

1. Save the image as `public/projects/<slug>.png` (16:10 works best, for example 1600x1000).
2. Add `image: "/projects/<slug>.png"` to that project.

Cards without `image` show the blueprint placeholder.

### Add experience

Add entries to `data/experience.ts`, newest first. The Experience section and its nav link appear as soon as the array is not empty, and the section numbers adjust on their own.

```ts
{
  title: "Frontend Developer",
  organization: "Company name",
  start: "2025",
  end: "2026",          // leave out for a current role
  location: "Iloilo City",
  summary: "One or two sentences.",
  points: ["Optional bullet", "Another bullet"],
},
```

### Live links

A project gets a "Live" link only when `liveUrl` is set. Dead deployments were left out on purpose; see `docs/TODO.md`.

## Design tokens

Colors and fonts are defined once in `app/globals.css` under `@theme`, so `bg-cobalt`, `text-muted`, `border-line`, `font-display` and so on work everywhere.

| Token | Value |
| --- | --- |
| paper | `#FFFFFF` |
| wash | `#F5F7FB` |
| line | `#E3E8F2` |
| ink | `#0B1220` |
| muted | `#5B6678` |
| cobalt | `#1F4FFF` |
| tint | `#EAF0FF` |

Fonts load through `next/font` in `app/layout.tsx`: Bricolage Grotesque (display), Hanken Grotesk (body), JetBrains Mono (labels). The site uses one weight per family (display 700, body 400, mono 400). Each extra weight adds main-thread work before first layout, so add weights sparingly.

## Animations

Five React Bits components are vendored in `components/reactbits/`. They were installed with:

```bash
npx shadcn@latest add @react-bits/<Name>-TS-TW
```

`components.json` exists only so that command knows where to put files.

| Component | Used for | Loaded |
| --- | --- | --- |
| SplitText | Hero name reveal | Own chunk, right after first paint |
| DotGrid | Cursor-reactive dots behind the hero | Mouse devices only |
| SpotlightCard | Blue spotlight on project cards | Mouse devices only |
| ScrollVelocity | Tech-stack strip | When the strip nears the viewport |
| AnimatedContent | Scroll reveals | Own chunk |

Local changes to the vendored files (each is marked with a "Local change" comment where it applies):

- `SplitText` accepts `children`, so the name can contain the blue "Ace" span.
- `SplitText` and `AnimatedContent` start with an IntersectionObserver instead of GSAP ScrollTrigger. ScrollTrigger caches scroll positions and went stale whenever the project grid changed height.
- `ScrollVelocity` no longer hard-codes its text size or a drop shadow.

Under `prefers-reduced-motion` nothing animates: reveals and the name are shown immediately, the strip stays still, and the dot grid is not loaded. Windows reports reduced motion when Settings > Accessibility > Visual effects > Animation effects is off, so turn that on if you see no animation on your own machine.

`components/reactbits/**` is excluded from ESLint because it is third-party code.

## Structure

```
app/                 layout, page, global CSS, favicon, Open Graph image
components/layout/   Nav, Footer
components/sections/ Hero, About, StackMarquee, Projects, Skills, Experience, Contact
components/projects/ ProjectsGrid (filters, show more), ProjectCard, placeholder, spotlight
components/motion/   Wrappers around the React Bits components
components/ui/       Section, LinkButton, Chip, Crosshairs, brand icons
components/reactbits/ Vendored React Bits components
data/                Content
docs/TODO.md         Things still needed
```

## Deploy

See the Vercel steps in `docs/TODO.md`. No environment variables are needed. The site URL used for Open Graph tags comes from Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, so a custom domain is picked up automatically.
