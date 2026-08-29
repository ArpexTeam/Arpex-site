import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const BASE_URL = "https://arpex-site.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/solucoes", "/projetos", "/ecossistema", "/sobre", "/contato"].map(
    (path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })
  );

  const projectRoutes = projects.map((project) => ({
    url: `${BASE_URL}/projetos/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes];
}
