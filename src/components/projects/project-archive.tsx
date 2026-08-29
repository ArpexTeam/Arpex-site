import { projects } from "@/data/projects";
import ProjectCard from "./project-card";
import CaseCursor from "./case-cursor";
import ScrollBlur from "./scroll-blur";

/**
 * Padrão editorial de colunas (grade de 12) garantindo que cada linha some 12,
 * em vez de um grid de cards idênticos: dupla grande, trio, e o produto próprio
 * (ArpeX CRM) fechando em largura total.
 */
const columnPattern = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-12",
];

export default function ProjectArchive({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? projects.slice(0, limit) : projects;

  return (
    <>
      <CaseCursor />
      <ScrollBlur />
      <ul className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-8 md:gap-y-14">
        {items.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            spanClassName={columnPattern[i % columnPattern.length]}
            priority={i === 0}
          />
        ))}
      </ul>
    </>
  );
}
