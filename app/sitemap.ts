import type { MetadataRoute } from "next";
import { visibleProjects } from "@/data/projects";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  // The page changes when a project does, so the newest push date stands in for "last modified".
  const lastModified = visibleProjects
    .map((project) => project.pushedAt)
    .sort()
    .at(-1);

  return [{ url: siteUrl, lastModified, changeFrequency: "weekly", priority: 1 }];
}
