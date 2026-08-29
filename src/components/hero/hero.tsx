"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsap";
import { DURATION, EASE } from "@/lib/gsap/motion-tokens";
import { Label } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import NetworkLines from "@/components/decor/network-lines";
import { waLink } from "@/data/social-links";
import woman from "@/images/woman.png";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        gsap.set([labelRef.current, titleRef.current, paraRef.current, ctaRef.current, imageRef.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap
        .timeline({ delay: 0.1 })
        .from(labelRef.current, { opacity: 0, y: 14, duration: DURATION.slow, ease: EASE.out })
        .from(titleRef.current, { opacity: 0, y: 22, duration: DURATION.slow, ease: EASE.out }, "-=0.45")
        .from(paraRef.current, { opacity: 0, y: 14, duration: DURATION.base, ease: EASE.out }, "-=0.4")
        .from(ctaRef.current, { opacity: 0, y: 14, duration: DURATION.base, ease: EASE.out }, "-=0.35")
        .from(imageRef.current, { opacity: 0, y: 18, duration: DURATION.slow, ease: EASE.out }, "-=0.5");
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-surface to-deep pt-[112px] pb-16 md:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <NetworkLines />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute left-10 -top-24 h-[420px] w-[420px] rounded-full blur-3xl md:left-[200px] md:-top-20 md:h-[600px] md:w-[600px]"
        style={{
          background: "radial-gradient(closest-side, rgba(0,207,119,0.25), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center gap-10 px-5 md:flex-row md:justify-between md:gap-10 md:px-8">
        <div className="w-full text-center md:w-6/12 md:text-left">
          <Label ref={labelRef} className="text-system">
            Estrutura digital para empresas em movimento
          </Label>

          <h1
            ref={titleRef}
            className="font-display mt-5 text-balance-editorial text-[length:var(--text-display)] text-ivory"
          >
            Sua empresa já tem um sistema.{" "}
            <span className="text-system">Ele só está espalhado.</span>
          </h1>

          <p ref={paraRef} className="mx-auto mt-5 max-w-[46ch] text-[length:var(--text-body-lg)] leading-relaxed text-ivory/80 md:mx-0">
            A ArpeX transforma processos improvisados em sistemas, automações e
            experiências digitais que dão clareza para crescer.
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-wrap items-center justify-center gap-6 md:justify-start">
            <Button
              href={waLink("Olá! Vim pelo site e quero mapear a operação do meu negócio.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Mapear minha operação
            </Button>
            <Button href="/projetos" variant="line">
              Ver entregas
            </Button>
          </div>
        </div>

        <div ref={imageRef} className="relative mx-auto w-full max-w-[520px] md:w-6/12">
          <div className="relative min-h-[300px] sm:min-h-[380px] md:min-h-[480px] lg:min-h-[520px]">
            <Image
              src={woman}
              alt="Profissional analisando soluções digitais da ArpeX"
              fill
              sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 520px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
