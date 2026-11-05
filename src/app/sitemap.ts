import type { MetadataRoute } from "next";
import { listedProjects } from "@/data/projects";
import { SITE_URL } from "@/data/social-links";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projetos", "/solucoes", "/placas", "/ecossistema", "/sobre", "/contato"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  // projetos fora do arquivo (sem material liberado) não entram no índice
  const projectRoutes = listedProjects.map((project) => ({
    url: `${SITE_URL}/projetos/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
