import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { Section } from "@/components/ui/Section";
import { visibleProjects } from "@/data/projects";

export function Projects({ index }: { index: string }) {
  return (
    <Section
      id="projects"
      index={index}
      label="Projects"
      title="Things I've built."
    >
      <ProjectsGrid
        items={visibleProjects.map((project) => ({
          slug: project.slug,
          category: project.category,
          featured: project.featured,
          card: <ProjectCard project={project} />,
        }))}
      />
    </Section>
  );
}
