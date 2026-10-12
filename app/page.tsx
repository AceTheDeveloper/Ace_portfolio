import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { Nav, type NavItem } from "@/components/layout/Nav";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { StackMarquee } from "@/components/sections/StackMarquee";
import { experience } from "@/data/experience";

const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  ...(experience.length > 0 ? [{ id: "experience", label: "Experience" }] : []),
  { id: "contact", label: "Contact" },
];

/** Section numbers follow the nav, so they stay in step when Experience is hidden. */
const sectionIndex = (id: string) =>
  String(navItems.findIndex((item) => item.id === id) + 1).padStart(2, "0");

export default function Home() {
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
          <StackMarquee />
        </Suspense>
        <Suspense>
          <Projects index={sectionIndex("projects")} />
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
    </>
  );
}
