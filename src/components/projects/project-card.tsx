"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap/gsap";
import TransitionLink from "@/components/motion/transition-link";

const aspectBySize: Record<Project["size"], string> = {
  lg: "aspect-[16/9]",
  md: "aspect-[4/3]",
  sm: "aspect-[1/1]",
};

export default function ProjectCard({
  project,
  spanClassName,
  priority,
}: {
  project: Project;
  spanClassName?: string;
  priority?: boolean;
}) {
  const cardRef = useRef<HTMLLIElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !maskRef.current) {
        gsap.set(maskRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }

      gsap.set(maskRef.current, { clipPath: "inset(0% 0% 0% 100%)" });
      gsap.to(maskRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    },
    { scope: cardRef }
  );

  return (
    <li ref={cardRef} className={cn("group relative col-span-1", spanClassName)}>
      <TransitionLink
        href={`/projetos/${project.slug}`}
        className="focus-ring block"
        aria-label={`Ver case ${project.title}`}
        data-cursor="open-case"
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-xl border border-smoke bg-graphite",
            aspectBySize[project.size]
          )}
          style={{ viewTransitionName: `project-image-${project.slug}` }}
        >
          <div ref={maskRef} data-mask-reveal className="absolute inset-0">
            {project.image ? (
              <Image
                src={project.image}
                alt={`Preview do projeto ${project.title}`}
                fill
                data-scroll-blur
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                priority={priority}
              />
            ) : (
              <div className="flex h-full flex-col justify-between p-6">
                <span className="inline-flex w-fit items-center rounded-full border border-system/40 px-3 py-1 text-xs font-semibold text-system">
                  Em curadoria
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-champagne">{project.category}</p>
                  <span className="font-display mt-1 block text-2xl text-ivory">{project.title}</span>
                </div>
              </div>
            )}
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-ivory">{project.title}</h3>
            <p className="mt-1 text-sm text-muted">{project.category}</p>
          </div>
          <span className="shrink-0 text-sm font-semibold text-muted transition-colors group-hover:text-system">
            Abrir case →
          </span>
        </div>
      </TransitionLink>
    </li>
  );
}
