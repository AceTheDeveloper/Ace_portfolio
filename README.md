# Ace portfolio

Single-page portfolio for Arwin Clyde "Ace" Simondac. Next.js (App Router), TypeScript, Tailwind CSS 4 and lucide-react. No animation library and no backend: the only server work is one cached read of the public GitHub API.

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
| `data/site.ts` | Name, role, tagline, bio, the About title block, GitHub / Instagram / Facebook links, location |
| `data/projects.ts` | Every project card |
| `data/skills.ts` | The five skill groups |
| `data/tech-icons.ts` | Which logo each tech name uses |
| `data/experience.ts` | Timeline entries (empty for now) |

### Social links and location

At the top of `data/site.ts`:

```ts
const INSTAGRAM_HANDLE: string = "acee.tsx";
const FACEBOOK_HANDLE: string = "clyde.simondac.9";
const LOCATION: string = "";
```

Empty a handle and its Contact button and its mention in the Contact copy both disappear. Set `LOCATION` and it appears next to the role label in the hero.

### Feature a project

In `data/projects.ts`, set `featured: true` on the entry. Featured projects fill the carousel at the top of Projects, span two columns in the grid and sort first. Use `order` to arrange them (lower comes first):

```ts
{ slug: "h-carwash-pos", /* ... */ featured: true, order: 1 },
```

While nothing is flagged, the carousel shows the 6 most recently pushed visible projects. Everything else sorts by `pushedAt`, newest first. The grid shows 9 cards and puts the rest behind "Show more".

### Hide or show a project

Flip `visible`. Hidden entries have the reason in a comment next to the flag. Hidden projects are also kept out of the Activity section.

### Add a screenshot

1. Save the image as `public/projects/<slug>.png` (16:10 works best, for example 1440x900).
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

### Tech logos

Chips in Skills and on project cards show a logo. The artwork is one sprite file, `public/tech-icons.svg`, holding single-colour symbols from [Simple Icons](https://simpleicons.org) (CC0). `data/tech-icons.ts` maps each tech name to a symbol id.

To add a logo, copy the brand's path from simpleicons.org into a new `<symbol id="slug" viewBox="0 0 24 24">` in the sprite, then add `"Tech name": "slug"` to `data/tech-icons.ts`. A tech with no entry gets a generic lucide icon, set in `components/ui/TechIcon.tsx`.

## GitHub activity

The Activity section reads the public GitHub API on the server (`lib/github.ts`) and is cached for an hour.

- Latest commits come from the 6 most recently pushed repos that are visible in `data/projects.ts`. Merge commits are skipped.
- Stats are the count of those repos and their primary languages.
- The contribution heatmap needs a token. Set `GITHUB_TOKEN` (read-only, public repositories) as an environment variable locally in `.env.local` or in Vercel. Without it the heatmap is left out.
- The token is only read on the server and never reaches the browser.
- If GitHub is unreachable or rate-limits, the whole section and its nav link are left out and the build still succeeds.

## Design tokens

Colors and fonts are defined once in `app/globals.css` under `@theme`, so `bg-cobalt`, `text-muted`, `border-line`, `font-display` and so on work everywhere. The site is light only.

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

## Motion

All motion rules are in the "Motion" half of `app/globals.css`. The principles:

- Every animation orients, reveals, responds, or is a blueprint signature. Nothing is decorative noise, and nothing loops except the ping on the status dot.
- Only transform, opacity, clip-path and stroke-dashoffset are animated, so there is no layout shift.
- The server HTML is the final, visible state. Scroll reveals hide their starting state only under `.js`, a class that an inline script in `app/layout.tsx` adds, so the page is complete without JavaScript.
- Every motion rule sits inside `@media (prefers-reduced-motion: no-preference)`. Under reduced motion nothing moves. Windows reports reduced motion when Settings > Accessibility > Visual effects > Animation effects is off, so turn that on if you see no animation on your own machine.
- Hover effects sit inside `@media (hover: hover)`.

How a scroll reveal works: a server component adds `data-reveal="..."` to an element, the single `RevealObserver` sets `data-revealed` the first time that element enters the viewport, and CSS transitions do the rest.

| Where | What moves | How |
| --- | --- | --- |
| Hero | Pill, label, name lines, tagline, buttons, underline; the figure draws itself | CSS keyframes on load |
| Nav | Scroll progress line, sliding active marker, mobile menu | `components/layout/Nav.tsx` |
| Section headers | Label types in, hairline draws | `data-reveal="header"` |
| About | Bio rises line by line; title-block rules draw, values fade in | `data-reveal="lines"`, `"titleblock"` |
| ACE IT band | Words converge with scroll, underline draws | CSS `animation-timeline: view()`, with `AceBandScroll` as the fallback |
| Skills, commit log | Items stagger in | `data-reveal="stagger"` |
| Featured carousel | Slides scale and fade by distance from centre | `FeaturedCarousel.tsx` |
| Project grid | Cards glide to new positions when filtering (FLIP) | `ProjectsGrid.tsx`, Web Animations API |
| Project cards | Lift, crosshairs extend, arrow nudges on hover | `.card` rules |
| Contact | Band wipes in, headline rises, buttons lean toward the cursor | `data-reveal="wipe"`, `Magnetic.tsx` |

## Structure

```
app/                 layout, page, global CSS, favicon, Open Graph image
components/layout/   Nav, Footer
components/sections/ Hero, About, TitleBlock, AceItBand, Projects, Activity, Skills, Experience, Contact
components/projects/ FeaturedCarousel, FeaturedCard, ProjectsGrid, ProjectCard, placeholder
components/motion/   RevealObserver, AceBandScroll, Magnetic
components/ui/       Section, LinkButton, Chip, TechIcon, Crosshairs, brand icons
data/                Content
lib/github.ts        GitHub activity, fetched and cached on the server
public/              Project screenshots and the tech logo sprite
docs/TODO.md         Things still needed, and the latest Lighthouse numbers
```

## Deploy

The repo is connected to Vercel, which redeploys on every push to `main`. `GITHUB_TOKEN` is the only environment variable, and it is optional. The site URL used for Open Graph tags comes from Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, so a custom domain is picked up automatically.
