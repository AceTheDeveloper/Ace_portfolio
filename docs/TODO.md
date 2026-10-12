# TODO

## Before deploying

- [ ] **Instagram handle.** `data/site.ts` still has `YOUR_IG_HANDLE`, so the Instagram button in Contact points to a page that does not exist.

## Content you still need to supply

- [ ] **Experience / education entries** in `data/experience.ts`. The section stays hidden while the array is empty.
- [ ] **Featured projects.** Set `featured: true` (and `order`) on the ones you want to lead with. Nothing is featured yet; cards sort by last push.
- [ ] **Screenshots.** Drop `public/projects/<slug>.png` and set `image` on the project. All 24 cards use the placeholder for now.

## Things found while reading the repos

- [ ] **`awesometodosapp/server/.env` is committed in a public repo** and contains a `MONGO_URI` value. If that is a real connection string, rotate it and remove the file from the repo history.
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

## Could not verify

- What service the F1StackMind chat widget calls. The card only says "AI chat widget".
- Innovex2026: the README says Next.js 14, `package.json` has Next 16. The card says "Next.js" with no version.

## Performance check after deploy

- [ ] **Mobile Performance is below the 90 target locally.** Run PageSpeed Insights on the live URL to get the number that counts.

Local Lighthouse results for the production build (`next start`, three runs each):

| Run | Performance | Accessibility | Best Practices | SEO | CLS |
| --- | --- | --- | --- | --- | --- |
| Mobile, fresh headless Chrome | 71 (69 to 74) | 100 | 100 | 100 | 0 |
| Mobile, already-running Chrome | 77 (76 to 84) | 100 | 100 | 100 | 0 |
| Desktop | 99 | 100 | 100 | 100 | 0 |

Why the mobile number is pessimistic on this machine: a bare Next.js page with no client code scored only 88 to 91 here, and Lighthouse warned that the CPU is slower than it expects. The remaining gap is Total Blocking Time (about 400 to 650 ms against roughly 250 ms for the bare page).

What was tried:

- Helped: one font weight per family, server-rendered project cards, loading the dot grid and card spotlight only on mouse devices, loading the marquee library on scroll, removing GSAP ScrollTrigger.
- Made no measurable difference: blocking GSAP entirely. The animation library is not the bottleneck, so removing the hero reveal would not fix the score.

If PageSpeed Insights also reports under 90, the next thing to try is cutting a font family (for example using Hanken Grotesk for labels instead of JetBrains Mono), since font setup was the largest cost found.

## Vercel deploy steps

1. Replace the Instagram handle, then commit:
   ```bash
   git add -A
   git commit -m "Build portfolio"
   git push origin main
   ```
2. Go to https://vercel.com/new and import `AceTheDeveloper/Ace_portfolio`.
3. Framework preset: Next.js (detected). Leave build and output settings at their defaults. No environment variables.
4. Click Deploy.
5. Open the production URL, check the page on a phone, then run PageSpeed Insights.
6. Optional: add a custom domain under Project > Settings > Domains.
