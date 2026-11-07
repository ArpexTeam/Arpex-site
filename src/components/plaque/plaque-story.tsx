"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsap";
import { FULL_SCENE_QUERY, supportsWebGL2 } from "@/lib/motion/queries";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { PLAQUE_BG, plaqueSteps } from "@/data/plaque";
import { contactHref } from "@/data/contact";
import PlaqueCutout from "./plaque-cutout";
import placaReal from "@/assets/plaque/placa-real.webp";
import celularDemo from "@/assets/plaque/celular-demonstracao.webp";
import type { PlaqueSceneApi } from "./plaque-scene";

// alinhado à cena: o produto vai até DEMO_AT; depois o celular encosta (~0.6),
// a tela abre (0.68–0.78) e a composição final chega em 0.84
const DEMO_AT = 0.44;
const STEP_AT = [0.5, 0.68, 0.84];
// na página Placas o produto já abriu a página: a cena começa com a placa em foco
const PAGE_START = 0.3;

const PHONE_ALT =
  "Celular com uma página de avaliação de demonstração: nome da empresa, cinco estrelas vazias, campo de comentário e o botão Publicar avaliação.";

type Props = {
  /** na página /placas a cena é a demonstração: outro título, sem os botões */
  variant?: "home" | "page";
};

function fontOf(el: HTMLElement | null, fallback: string) {
  return el ? getComputedStyle(el).fontFamily : fallback;
}

export default function PlaqueStory({ variant = "home" }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const monoRef = useRef<HTMLParagraphElement>(null);
  const sceneRef = useRef<PlaqueSceneApi | null>(null);
  const progressRef = useRef(variant === "page" ? PAGE_START : 0);
  const { capability } = useMotionPreference();
  const [fullMode, setFullMode] = useState(false);
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(-1);

  // progresso da seção (0–1) → progresso da cena
  const toScene = (p: number) => (variant === "page" ? PAGE_START + p * (1 - PAGE_START) : p);
  // ponto da cena → posição na timeline da seção
  const atScene = (x: number) => (variant === "page" ? Math.max(0, (x - PAGE_START) / (1 - PAGE_START)) : x);

  useEffect(() => {
    const mq = window.matchMedia(FULL_SCENE_QUERY);
    const update = () => setFullMode(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Cena secundária: import sob demanda quando o capítulo se aproxima.
  useEffect(() => {
    const host = hostRef.current;
    const section = sectionRef.current;
    if (!fullMode || capability !== "full" || !host || !section || !supportsWebGL2()) return;
    let cancelled = false;
    let api: PlaqueSceneApi | null = null;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        import("./plaque-scene")
          .then(({ mountPlaqueScene }) =>
            mountPlaqueScene(host, {
              photoSrc: placaReal.src,
              fonts: {
                display: fontOf(titleRef.current, "system-ui"),
                sans: fontOf(bodyRef.current, "system-ui"),
                mono: fontOf(monoRef.current, "monospace"),
              },
              focusX: 0.66,
              background: PLAQUE_BG,
              onReady: () => !cancelled && setReady(true),
              onContextLost: () => setReady(false),
            })
          )
          .then((a) => {
            if (cancelled) return a.dispose();
            api = a;
            sceneRef.current = a;
            a.setProgress(progressRef.current);
          })
          .catch(() => setReady(false));
      },
      { rootMargin: "150% 0px" }
    );
    io.observe(section);

    return () => {
      cancelled = true;
      io.disconnect();
      api?.dispose();
      sceneRef.current = null;
      setReady(false);
    };
  }, [fullMode, capability]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_SCENE_QUERY, () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
            onUpdate: (self) => {
              const p = toScene(self.progress);
              progressRef.current = p;
              sceneRef.current?.setProgress(p);
              const s = p >= STEP_AT[2] ? 2 : p >= STEP_AT[1] ? 1 : p >= STEP_AT[0] ? 0 : -1;
              setStep((prev) => (prev === s ? prev : s));
            },
          },
        });

        // rótulo do momento: o que é foto real e o que é demonstração
        tl.to("[data-label-produto]", { autoAlpha: 0, duration: 0.03 }, atScene(DEMO_AT - 0.02));
        tl.fromTo("[data-label-demo]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.03 }, atScene(DEMO_AT + 0.02));

        // versão HTML (sem WebGL, ou até o primeiro quadro): a placa abre espaço e o celular entra
        tl.set("[data-poster-plaque], [data-poster-phone]", { xPercent: -50, yPercent: -50 }, 0);
        tl.to("[data-poster-plaque]", { left: "30%", scale: 0.82, duration: atScene(0.56) - atScene(DEMO_AT) }, atScene(DEMO_AT));
        tl.fromTo("[data-poster-phone]", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.08 }, atScene(0.58));

        // os botões só existem na home
        const cta = sectionRef.current?.querySelector("[data-plaque-cta]");
        if (cta) tl.fromTo(cta, { autoAlpha: 0.35 }, { autoAlpha: 1, duration: 0.1 }, 0.86);
        tl.to({}, { duration: 0.04 }, 0.96);
        return () => setStep(-1);
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-scene="plaque"
      aria-labelledby="placas-title"
      className="scene-section surface-ink overflow-x-clip"
      style={{ background: PLAQUE_BG }}
    >
      <div className="scene-stage">
        {/* Modo completo: a cena 3D com a foto da placa. Antes do primeiro quadro (e
            sem WebGL), a mesma sequência em HTML, nas colunas da cena. */}
        <div aria-hidden className="only-full absolute inset-0">
          <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: ready ? 0 : 1 }}>
            <div className="mx-auto grid h-full max-w-[1440px] grid-cols-12 gap-12 px-[var(--gutter)] pt-[var(--header-height)]">
              <div className="relative col-span-7 col-start-6">
                <div data-poster-plaque className="absolute left-1/2 top-1/2 w-[min(40vh,400px)]">
                  <PlaqueCutout glow sizes="400px" />
                </div>
                <div data-poster-phone className="invisible absolute left-[78%] top-1/2 w-[min(30vh,230px)]">
                  <Image src={celularDemo} alt="" sizes="230px" className="h-auto w-full" />
                </div>
              </div>
            </div>
          </div>
          <div ref={hostRef} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: ready ? 1 : 0 }} />
          <div className="absolute inset-x-0 bottom-8 scene-short:bottom-4">
            <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-12 px-[var(--gutter)]">
              <p className="font-label col-span-7 col-start-6 grid text-center text-fg-muted [grid-template-areas:'r'] *:[grid-area:r]">
                <span data-label-produto>Foto real da placa</span>
                <span data-label-demo className="invisible">
                  Demonstração · a tela do celular é ilustrativa
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid h-full w-full max-w-[1440px] gap-x-12 gap-y-10 px-[var(--gutter)] py-24 lg:grid-cols-12 lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-y-0 lg:py-0 lg:pt-[var(--header-height)]">
          {/* em 1024px a placa entra perto da coluna: a largura fica abaixo de 1/3 da tela */}
          <div className="lg:col-span-5 lg:row-start-2 lg:max-w-[32vw] xl:max-w-none">
            <p ref={monoRef} className="font-kicker text-signal">
              {variant === "page" ? "Demonstração" : "Presença · Placa de avaliação com QR Code e NFC"}
            </p>
            <h2 ref={titleRef} id="placas-title" className="font-title mt-4 text-balance text-[length:var(--text-h2)] text-fg">
              {variant === "page" ? "Como funciona" : "Do balcão à avaliação, em um toque."}
            </h2>
            <p
              ref={bodyRef}
              className="mt-5 max-w-[46ch] text-pretty text-[length:var(--text-lead)] leading-[1.55] text-fg lg:text-[length:var(--text-body)] scene-short:hidden"
            >
              {/* o percurso fica com a cena e as etapas; aqui só o que é a placa */}
              {variant === "page"
                ? "A placa primeiro; o celular entra quando chega a hora de aproximar."
                : "Uma placa de acrílico com a identidade da sua empresa, para o balcão, a mesa ou a recepção."}
            </p>
          </div>

          {/* Fluxo normal (celular, tablet, movimento reduzido): o produto, em foto real,
              logo depois do texto. Na página Placas ele já abriu a página. */}
          {variant === "home" && (
            <figure className="only-flow lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:self-end">
              <PlaqueCutout glow sizes="(min-width: 1024px) 340px, 72vw" className="mx-auto w-[min(72vw,340px)]" />
              <figcaption className="mt-6 text-center text-[13px] text-fg-muted">Foto real da placa.</figcaption>
            </figure>
          )}

          <div className="lg:col-span-5 lg:row-start-3 lg:max-w-[32vw] xl:max-w-none">
            <ol className="mt-8 lg:mt-6" data-mode={fullMode ? "full" : "flow"}>
              {plaqueSteps.map((s, i) => {
                const active = !fullMode || i === step;
                return (
                  <li
                    key={s.key}
                    aria-current={fullMode && i === step ? "step" : undefined}
                    className={cn(
                      "grid grid-cols-[2.5rem_1fr] gap-x-2 border-t border-rule py-4 transition-opacity duration-300 lg:py-3 scene-short:py-2.5",
                      active ? "opacity-100" : "opacity-40"
                    )}
                  >
                    <span className={cn("font-label pt-1.5 transition-colors duration-300", active ? "text-signal" : "text-fg-muted")}>
                      0{i + 1}
                    </span>
                    <div>
                      <p className="font-heading text-[1.25rem] text-fg lg:text-[1.125rem]">{s.title}</p>
                      {/* em telas baixas só o passo da vez mostra a explicação */}
                      <div className={cn("grid grid-rows-[1fr] transition-[grid-template-rows] duration-300", !active && "scene-short:grid-rows-[0fr]!")}>
                        <div className="min-h-0 overflow-hidden">
                          <p className="max-w-[46ch] pt-1 leading-relaxed text-fg-muted lg:text-[15px] lg:leading-snug">{s.text}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {variant === "home" && (
              <div data-plaque-cta className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-6 scene-short:mt-4">
                <Button href={contactHref("placas")}>Solicitar uma placa</Button>
                <Button href="/placas" variant="link" arrow>
                  Conhecer a placa
                </Button>
              </div>
            )}
            <p className="only-full mt-5 text-[13px] leading-relaxed text-fg-muted scene-short:mt-3">
              A placa é foto real; a tela do celular é uma demonstração.
            </p>
          </div>

          {/* Fluxo normal: a demonstração, separada do produto, ao lado das etapas. */}
          <figure className="only-flow lg:col-span-6 lg:col-start-7 lg:row-start-3">
            <Image src={celularDemo} alt={PHONE_ALT} sizes="(min-width: 1024px) 200px, 46vw" className="mx-auto h-auto w-[min(46vw,200px)]" />
            <figcaption className="mt-4 text-center text-[13px] text-fg-muted">Tela de demonstração da página de avaliação.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
