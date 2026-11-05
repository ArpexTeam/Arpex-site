"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsap";
import { FULL_SCENE_QUERY, supportsWebGL2 } from "@/lib/motion/queries";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { plaqueSteps } from "@/data/plaque";
import { contactHref } from "@/data/contact";
import type { PlaqueSceneApi } from "./plaque-scene";

export const PLAQUE_BG = "#0d110f";
const POSTER = "/placas/placa-demonstracao.webp";
const QR = "/placas/qr-demonstracao.svg";
// alinhado à cena: celular encosta (~0.58), tela abre (0.66–0.76), composição final (0.82+)
const STEP_AT = [0, 0.66, 0.82];

type Props = {
  /** na página /placas o título é h1 e o link "como funciona" não aparece */
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
  const progressRef = useRef(0);
  const { capability } = useMotionPreference();
  const [fullMode, setFullMode] = useState(false);
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(0);

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
              qrSrc: QR,
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
              const p = self.progress;
              progressRef.current = p;
              sceneRef.current?.setProgress(p);
              const s = p >= STEP_AT[2] ? 2 : p >= STEP_AT[1] ? 1 : 0;
              setStep((prev) => (prev === s ? prev : s));
            },
          },
        });
        tl.fromTo("[data-plaque-cta]", { autoAlpha: 0.35 }, { autoAlpha: 1, duration: 0.1 }, 0.86).to({}, { duration: 0.04 }, 0.96);
        return () => setStep(0);
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const Title = variant === "page" ? "h1" : "h2";

  return (
    <section
      ref={sectionRef}
      data-scene="plaque"
      aria-labelledby="placas-title"
      className="scene-section surface-ink"
      style={{ background: PLAQUE_BG }}
    >
      <div className="scene-stage">
        {/* 3D (modo completo): poster até o primeiro quadro, depois o canvas. */}
        <div aria-hidden className="only-full absolute inset-0">
          <div className="absolute inset-y-0 right-0 w-[64%] transition-opacity duration-700" style={{ opacity: ready ? 0 : 1 }}>
            <Image src={POSTER} alt="" fill sizes="64vw" className="object-contain" />
          </div>
          <div ref={hostRef} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: ready ? 1 : 0 }} />
        </div>

        <div className="relative z-10 mx-auto grid h-full w-full max-w-[1440px] items-center gap-12 px-[var(--gutter)] py-24 lg:grid-cols-12 lg:py-0 lg:pt-[var(--header-height)]">
          {/* em 1024px a placa entra perto da coluna: a largura fica abaixo de 1/3 da tela */}
          <div className="lg:col-span-5 lg:max-w-[32vw] xl:max-w-none">
            <p ref={monoRef} className="font-kicker text-signal">
              Presença · Placas de avaliação com QR Code e NFC
            </p>
            <Title ref={titleRef} id="placas-title" className="font-display mt-4 text-balance text-[length:var(--text-h2)] text-fg">
              Do balcão à avaliação, em um toque.
            </Title>
            <p
              ref={bodyRef}
              className="mt-5 max-w-[46ch] text-pretty text-[length:var(--text-lead)] leading-[1.55] text-fg lg:text-[length:var(--text-body)] scene-short:hidden"
            >
              Uma placa de acrílico com a identidade da sua empresa. O cliente aproxima o celular ou escaneia o QR Code e
              chega à página de avaliação da empresa, onde escolhe a nota e decide se envia.
            </p>

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

            <div data-plaque-cta className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 lg:mt-6 scene-short:mt-4">
              <Button href={contactHref("placas")} arrow>
                Quero uma placa para minha empresa
              </Button>
              {variant === "home" && (
                <Button href="/placas" variant="text" arrow>
                  Como funciona
                </Button>
              )}
            </div>
            <p className="mt-5 text-[13px] leading-relaxed text-fg-muted scene-short:mt-3">
              Cena ilustrativa: a arte da placa e a tela do celular são demonstrações.
            </p>
          </div>

          {/* Fluxo normal (celular, tablet, movimento reduzido): composição final estática. */}
          <div className="only-flow lg:col-span-7 lg:col-start-6">
            <div className="relative mx-auto aspect-[1320/920] w-full max-w-[720px]">
              <Image
                src={POSTER}
                alt="Placa de acrílico com QR Code e área NFC ao lado de um celular que mostra uma página de avaliação de demonstração"
                fill
                sizes="(min-width: 1024px) 50vw, 92vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
