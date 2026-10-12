import { FeaturedCard } from "@/components/projects/FeaturedCard";
import { FeaturedCarousel } from "@/components/projects/FeaturedCarousel";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { Section } from "@/components/ui/Section";
import { featuredProjects, visibleProjects } from "@/data/projects";

const subheading = "font-mono text-xs uppercase tracking-[0.2em] text-muted";

export function Projects({ index }: { index: string }) {
  return (
    <Section
      id="projects"
      index={index}
      label="Projects"
      title="Things I've built."
    >
      <p className={subheading}>Featured</p>
      <div className="mt-5">
        <FeaturedCarousel
          slides={featuredProjects.map((project, position) => (
            <FeaturedCard
              key={project.slug}
              project={project}
              sheet={position + 1}
              total={featuredProjects.length}
            />
          ))}
        />
      </div>

      <p className={`${subheading} mt-20`}>All projects</p>
      <div className="mt-5">
        <ProjectsGrid
          items={visibleProjects.map((project) => ({
            slug: project.slug,
            category: project.category,
            featured: project.featured,
            card: <ProjectCard project={project} />,
          }))}
        />
      </div>
    </Section>
  );
}
