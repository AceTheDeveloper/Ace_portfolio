import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { Nav, type NavItem } from "@/components/layout/Nav";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { About } from "@/components/sections/About";
import { AceItBand } from "@/components/sections/AceItBand";
import { Activity } from "@/components/sections/Activity";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { experience } from "@/data/experience";
import { site } from "@/data/site";
import { getActivity } from "@/lib/github";
import { siteUrl } from "@/lib/site-url";

/** Structured data so search engines can connect the name, the site and the profiles. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  alternateName: [`${site.nickname} Simondac`, `${site.firstName} ${site.lastName}`],
  jobTitle: site.role,
  description: site.tagline,
  url: siteUrl,
  sameAs: [site.githubUrl, site.instagramUrl, site.facebookUrl].filter(Boolean),
};

export default async function Home() {
  // Cached for an hour; null when GitHub is unreachable, which hides the section.
  const activity = await getActivity();

  const navItems: NavItem[] = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    ...(activity ? [{ id: "activity", label: "Activity" }] : []),
    { id: "skills", label: "Skills" },
    ...(experience.length > 0
      ? [{ id: "experience", label: "Experience" }]
      : []),
    { id: "contact", label: "Contact" },
  ];

  /** Section numbers follow the nav, so they stay in step when a section is hidden. */
  const sectionIndex = (id: string) =>
    String(navItems.findIndex((item) => item.id === id) + 1).padStart(2, "0");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Nav items={navItems} />
      <main id="main">
        <Hero />
        {/* Each boundary hydrates on its own, which keeps main-thread tasks short. */}
        <Suspense>
          <About index={sectionIndex("about")} />
          <AceItBand />
        </Suspense>
        <Suspense>
          <Projects index={sectionIndex("projects")} />
          <Activity index={sectionIndex("activity")} activity={activity} />
        </Suspense>
        <Suspense>
          <Skills index={sectionIndex("skills")} />
          <Experience index={sectionIndex("experience")} />
        </Suspense>
        <Suspense>
          <Contact index={sectionIndex("contact")} />
        </Suspense>
      </main>
      <Footer />
      <RevealObserver />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
