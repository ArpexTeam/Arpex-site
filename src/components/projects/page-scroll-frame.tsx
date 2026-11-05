"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsap";
import type { ProjectMedia } from "@/data/projects";
import { cn } from "@/lib/cn";

/** Captura de página inteira que rola dentro do quadro conforme a página rola. */
export default function PageScrollFrame({ media, className, url }: { media: ProjectMedia; className?: string; url?: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(innerRef.current, {
          y: () => -((innerRef.current?.offsetHeight ?? 0) - (frameRef.current?.clientHeight ?? 0)),
          ease: "none",
          scrollTrigger: { trigger: frameRef.current, start: "top 85%", end: "bottom 15%", scrub: 0.6, invalidateOnRefresh: true },
        });
      });
      return () => mm.revert();
    },
    { scope: frameRef }
  );

  return (
    <div className={cn("frame flex flex-col", className)}>
      {url && (
        <div className="flex h-9 shrink-0 items-center gap-3 border-b border-white/10 bg-[#161a17] px-4">
          <span aria-hidden className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </span>
          <span className="truncate rounded-full bg-white/[0.06] px-3 py-1 text-[11px] text-white/55">{url}</span>
        </div>
      )}
      <div ref={frameRef} className="relative flex-1 overflow-hidden">
        <div ref={innerRef} className="absolute inset-x-0 top-0 will-change-transform">
          <Image src={media.src} alt={media.alt} sizes="(min-width: 1024px) 40vw, 92vw" className="h-auto w-full" />
        </div>
      </div>
    </div>
  );
}
