"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsap";
import Container from "@/components/ui/container";
import { Label } from "@/components/ui/heading";

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !contentRef.current) return;

      gsap.from(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-surface to-deep py-24 text-ivory md:py-32"
    >
      <Container>
        <div ref={contentRef} className="mx-auto max-w-[26ch] text-center">
          <Label className="text-system">Princípio</Label>

          <p className="font-display mt-6 text-[length:var(--text-h1)] leading-[1.15] text-ivory">
            A empresa já funciona. Só não funciona como sistema.
          </p>

          <p className="mx-auto mt-6 max-w-[42ch] text-[length:var(--text-body-lg)] leading-relaxed text-ivory/75">
            Operação solta gera atrito. Sistema conectado gera resultado. Esse é o
            nosso trabalho.
          </p>

          <p className="font-label mt-8 text-system">Organizar antes de automatizar.</p>
        </div>
      </Container>
    </section>
  );
}
