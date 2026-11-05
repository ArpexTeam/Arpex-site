"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsap";
import { FULL_SCENE_QUERY } from "@/lib/motion/queries";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { crmStory } from "@/data/crm";
import { contactHref } from "@/data/contact";

const STEP_AT = [0, 0.37, 0.68];

/**
 * Sequência curta de uso com telas reais do produto. Movimentos simples
 * (perspectiva, escala, recorte) em CSS/GSAP — sem WebGL.
 */
export default function CrmStory({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [fullMode, setFullMode] = useState(false);
  const [step, setStep] = useState(0);
  const Title = headingLevel === 1 ? "h1" : "h2";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_SCENE_QUERY, () => {
        setFullMode(true);
        const screens = gsap.utils.toArray<HTMLElement>("[data-crm-screen]");
        const zooms = gsap.utils.toArray<HTMLElement>("[data-crm-zoom]");
        const rings = gsap.utils.toArray<HTMLElement>("[data-crm-ring]");

        // pilha inicial: tela ativa à frente, as outras recuadas
        gsap.set(screens, {
          transformPerspective: 1600,
          transformOrigin: "50% 50%",
          zIndex: (i: number) => 10 - i,
          z: (i: number) => -i * 140,
          y: (i: number) => -i * 34,
          rotationY: -14,
          rotationX: 7,
          autoAlpha: (i: number) => (i === 0 ? 1 : 0.55 - i * 0.12),
        });
        gsap.set(rings, { autoAlpha: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            onUpdate: (self) => {
              const p = self.progress;
              const s = p >= STEP_AT[2] ? 2 : p >= STEP_AT[1] ? 1 : 0;
              setStep((prev) => (prev === s ? prev : s));
            },
          },
        });

        const showStep = (i: number, at: number) => {
          // a tela da vez vem à frente e se alinha
          tl.to(screens[i], { z: 0, y: 0, rotationY: 0, rotationX: 0, autoAlpha: 1, zIndex: 20 + i, duration: 0.08 }, at);
          // aproxima o trecho da ação e acende o contorno
          tl.to(zooms[i], { scale: 1.55, duration: 0.1 }, at + 0.09);
          tl.to(rings[i], { autoAlpha: 1, duration: 0.04 }, at + 0.15);
          tl.to(zooms[i], { scale: 1, duration: 0.08 }, at + 0.24);
          tl.to(rings[i], { autoAlpha: 0, duration: 0.04 }, at + 0.25);
        };
        const sendBack = (i: number, at: number) => {
          tl.to(screens[i], { z: -320, x: -120, rotationY: 16, autoAlpha: 0, duration: 0.08 }, at);
        };

        tl.to(screens[0], { rotationY: 0, rotationX: 0, duration: 0.06 }, 0.02);
        showStep(0, 0.02);
        sendBack(0, 0.35);
        showStep(1, 0.36);
        sendBack(1, 0.66);
        showStep(2, 0.67);
        tl.to({}, { duration: 0.01 }, 0.99);

        return () => {
          setFullMode(false);
          setStep(0);
        };
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-scene="crm"
      aria-labelledby="crm-title"
      className="scene-section surface-ink-2"
    >
      <div className="scene-stage">
        <div className="mx-auto grid h-full w-full max-w-[1440px] items-center gap-12 px-[var(--gutter)] py-24 lg:grid-cols-12 lg:gap-x-10 lg:py-0 lg:pt-[var(--header-height)]">
          <div className="lg:col-span-4">
            <p className="font-kicker text-signal">Atendimento · ArpeX CRM</p>
            <Title id="crm-title" className="font-title mt-4 text-balance text-[length:var(--text-h2)] text-fg">
              A próxima ação sempre à vista.
            </Title>
            <p className="mt-5 max-w-[44ch] text-pretty text-[length:var(--text-lead)] leading-[1.55] text-fg lg:text-[length:var(--text-body)] scene-short:hidden">
              Para empresas que atendem e vendem pelo WhatsApp: contatos, oportunidades e retornos organizados em um só
              lugar.
            </p>

            <ol className="mt-6 hidden lg:block">
              {crmStory.map((s, i) => {
                const on = !fullMode || i === step;
                return (
                  <li
                    key={s.key}
                    aria-current={fullMode && i === step ? "step" : undefined}
                    className={cn("border-t border-rule py-3 transition-opacity duration-300 scene-short:py-2.5", on ? "opacity-100" : "opacity-40")}
                  >
                    <p className="flex items-baseline gap-3">
                      <span className={cn("font-label", on ? "text-signal" : "text-fg-muted")}>0{i + 1}</span>
                      <span className="font-heading text-[1.2rem] text-fg">{s.name}</span>
                    </p>
                    {/* em telas baixas só a etapa da vez mostra a explicação */}
                    <div className={cn("grid grid-rows-[1fr] transition-[grid-template-rows] duration-300", !on && "scene-short:grid-rows-[0fr]!")}>
                      <div className="min-h-0 overflow-hidden">
                        <p className="pl-9 pt-1 text-[15px] leading-snug text-fg-muted">{s.text}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 scene-short:mt-4">
              <Button href={contactHref("crm")} arrow>
                Conversar sobre o CRM
              </Button>
              {headingLevel === 2 && (
                <Button href="/ecossistema" variant="text" arrow>
                  Ver todas as telas
                </Button>
              )}
            </div>
          </div>

          {/* Modo completo: pilha em perspectiva. Fluxo normal: sequência vertical. */}
          <div className="relative lg:col-span-8">
            {/* identificação discreta, junto das telas (uma vez por página) */}
            <p className="only-flow mb-8 text-[length:var(--text-small)] text-fg-muted">Telas reais do ArpeX CRM, com dados de demonstração.</p>
            <div className="only-full relative aspect-[16/10] w-full [transform-style:preserve-3d]">
              {crmStory.map((s) => (
                <div key={s.key} data-crm-screen className="frame absolute inset-0 will-change-transform">
                  <div
                    data-crm-zoom
                    className="absolute inset-0"
                    style={{ transformOrigin: `${s.focus!.x + s.focus!.w / 2}% ${s.focus!.y + s.focus!.h / 2}%` }}
                  >
                    <Image src={s.src} alt={`${s.name} — tela do ArpeX CRM (dados de demonstração)`} fill sizes="(min-width: 1024px) 100vw, 1px" className="object-cover object-left-top" />
                    <span
                      data-crm-ring
                      aria-hidden
                      className="pointer-events-none absolute rounded-lg ring-2 ring-signal shadow-[0_0_0_9999px_rgba(11,14,12,0.42)]"
                      style={{ left: `${s.focus!.x}%`, top: `${s.focus!.y}%`, width: `${s.focus!.w}%`, height: `${s.focus!.h}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="only-full mt-6 text-[length:var(--text-small)] text-fg-muted">Telas reais do ArpeX CRM, com dados de demonstração.</p>

            <ol className="only-flow space-y-14">
              {crmStory.map((s, i) => (
                <li key={s.key}>
                  <p className="flex items-baseline gap-3">
                    <span className="font-label text-signal">0{i + 1}</span>
                    <span className="font-heading text-[1.3rem] text-fg">{s.name}</span>
                  </p>
                  <p className="mt-1.5 max-w-[48ch] leading-relaxed text-fg-muted">{s.text}</p>
                  <div className="mt-5">
                    {s.mobile ? (
                      <>
                        <div className="frame relative mx-auto aspect-[390/600] max-w-[340px] md:hidden">
                          <Image src={s.mobile} alt={`${s.name} — ArpeX CRM no celular (dados de demonstração)`} fill sizes="340px" className="object-cover object-top" />
                        </div>
                        <div className="frame relative hidden aspect-[16/10] md:block">
                          <Image src={s.src} alt={`${s.name} — tela do ArpeX CRM (dados de demonstração)`} fill sizes="(min-width: 1024px) 62vw, 92vw" className="object-cover object-left-top" />
                        </div>
                      </>
                    ) : (
                      <div className="frame relative aspect-[16/10]">
                        <Image src={s.src} alt={`${s.name} — tela do ArpeX CRM (dados de demonstração)`} fill sizes="(min-width: 1024px) 62vw, 92vw" className="object-cover object-left-top" />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
