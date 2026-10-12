# TODO

Motion is back, light only. The page animates on load, on scroll and on hover, shows everything in its final state under `prefers-reduced-motion`, and is fully visible with JavaScript off. There is no dark theme.

## Before deploying

- [ ] **Optional: add `GITHUB_TOKEN` in Vercel** (Project > Settings > Environment Variables). A fine-grained token with read-only access to public repositories is enough. It does two things: it turns on the contribution heatmap in the Activity section, and it stops GitHub's anonymous rate limit from hiding that section. Without it the site still builds and the heatmap is simply left out.
- [ ] **Look at the H Breakfast to Bar screenshot** (`public/projects/h-website.png`). It is the live home page as anyone sees it, so it includes the café's phone number in the header and a venue photo with customers in frame. Remove the `image` line for `h-website` in `data/projects.ts` if you would rather show the placeholder.

## Content you still need to supply

- [ ] **Experience / education entries** in `data/experience.ts`. The section stays hidden while the array is empty.
- [ ] **Featured projects.** Nothing is flagged `featured: true`, so the featured row shows the 6 most recently pushed projects: H Breakfast to Bar Website, EchoHorror, H Carwash POS, F1StackMind, Beboy's Mobile App, Beboy's POS. Flag the ones you actually want (and set `order`) and the row follows.
- [ ] **Screenshots.** Two were captured from public sites (H Breakfast to Bar Website, Dalisay Clinic). The other 21 visible cards use the blueprint placeholder. H Carwash POS was skipped (login screen) and F1StackMind API was skipped (an API root page).
- [ ] **Location and photo.** Both are blank, so no location is shown and the hero uses the blueprint figure. Set `LOCATION` at the top of `data/site.ts` and it appears next to the role label. A hero photo is not wired up yet; ask for it when you have one.

## Things found while reading the repos

- [ ] **`awesometodosapp/server/.env` is committed in a public repo** and contains a `MONGO_URI` value. If that is a real connection string, rotate it and remove the file from the repo history. The project is hidden (`visible: false`) until this is fixed.
- [ ] **Dead live links.** These `homepageUrl`s return Vercel `DEPLOYMENT_NOT_FOUND`, so their cards have no Live link. Redeploy or clear the URL on GitHub, then add `liveUrl` in `data/projects.ts`:
  - F1StackMind: `f1-stack-mind.vercel.app`
  - Festival-Disposable-Camera: `festival-disposable-camera.vercel.app`
  - beboys_final: `beboys-final.vercel.app`
  - F1StackMind-Backend: `f1-stack-mind-backend.vercel.app`
  - SARA: `sara-xi-topaz.vercel.app`
- [ ] **echo-horror art credits.** The repo README says the author and licence of the player and enemy sprite sheets were not recorded. The card says "Art credits: see repo". Add the credits to that README when you have them.
- [ ] **F1StackMindWebsite** has an empty default branch (`master`); the old static site is on `main`. It is hidden. Switch the default branch on GitHub if you want to show it.
- [ ] **F1StackMind-API** has a Live link because its deployment responds, but the project is an API, so the link opens its root page. Remove `liveUrl` if you would rather not link it.

## Hidden projects (set `visible: true` to overrule)

| Repo | Why |
| --- | --- |
| H-Breakfast-To-Bar | README title and one text file |
| SARA | Untouched create-next-app page plus a stub API route |
| F1StackMindWebsite | Default branch has no files |
| AceTheDeveloper | Empty repository |
| awesometodosapp | Hidden until the committed `.env` is removed from the repo |

Hidden and excluded repos are also kept out of the Activity section: its commit log and stats only read repos that are visible here.

## Could not verify

- What service the F1StackMind chat widget calls. The card only says "AI chat widget".
- Innovex2026: the README says Next.js 14, `package.json` has Next 16. The card says "Next.js" with no version.
- The contribution heatmap against the real GitHub GraphQL API. No token was available, so it was only rendered from a made-up response.
- The "ACE IT" band in Firefox and older Safari, which use the JavaScript fallback instead of CSS scroll-driven animation. The fallback was exercised in Chrome by pretending the CSS feature was missing.
- Real phones and browsers other than Chrome.

## Motion notes

- Nothing animates width, height or position; only transform, opacity, clip-path and stroke-dashoffset. CLS measured 0.
- There is no animation library. The motion is CSS plus a few small scripts in `components/motion/`, the carousel and the project grid.
- One change from the brief: off-centre carousel slides fade to 0.9, not 0.7. At 0.7 the small grey text fell below WCAG AA contrast and Lighthouse Accessibility dropped to 93.
- Activity shows the repo count and languages only. The star total is 1, so it was left out; stars still show on individual cards.

## Performance check after deploy

- [ ] **Mobile Performance is below 90 locally.** Run PageSpeed Insights on the live URL to get the number that counts.

Local Lighthouse results for the production build (`next start`, medians, range in brackets). Motion was forced on for these runs, because this machine reports reduced motion by default.

| Run | First build (old motion) | Static build | Now (new motion) |
| --- | --- | --- | --- |
| Mobile Performance, fresh headless Chrome | 71 (69 to 74) | 78 (71 to 78) | 79 (77 to 80) |
| Mobile Performance, already-running Chrome | 77 (76 to 84) | 74 (70 to 75) | 78 (71 to 79) |
| Desktop Performance | 99 | 99 (98 to 100) | 99 (99 to 100) |
| Accessibility, Best Practices, SEO | 100 | 100 | 100 |
| CLS | 0 | 0 | 0 |

Bringing motion back did not lower any score, so nothing had to be cut or lazy-loaded further. Mobile Total Blocking Time was about 330 to 730 ms, and most of it is Next.js and React starting up plus the first layout of the page.

Why the mobile number is pessimistic on this machine: a bare Next.js page with no client code scored only 88 to 91 here, and Lighthouse warned that the CPU is slower than it expects.

What keeps the cost down: one font weight per family, project cards rendered on the server, tech logos in one cached sprite file instead of inline, and no animation library.

Options if PageSpeed Insights also reports under 90 (none of these has been done):

1. Drop one font family, for example use Hanken Grotesk for labels instead of JetBrains Mono. Font setup was the largest page-specific cost found.
2. Show 6 project cards before "Show more" instead of 9, which makes the first render smaller.
3. Accept the score. Most of the remaining blocking time is framework startup that content changes cannot remove.

## Deploy steps

The repo is already connected to Vercel, which redeploys on every push to `main`.

1. Commit and push:
   ```bash
   git add -A
   git commit -m "Add motion system, featured carousel, GitHub activity and tech logos"
   git push origin main
   ```
2. Optional: add `GITHUB_TOKEN` in Vercel and redeploy to get the heatmap.
3. Open the production URL, check the page on a phone, then run PageSpeed Insights.
