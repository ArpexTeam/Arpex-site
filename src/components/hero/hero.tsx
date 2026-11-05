"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsap";
import { FULL_SCENE_QUERY, FINE_HOVER_QUERY, matches, supportsWebGL2 } from "@/lib/motion/queries";
import { useMotionPreference } from "@/components/motion/motion-provider";
import TransitionLink from "@/components/motion/transition-link";
import { Button } from "@/components/ui/button";
import { getProjectBySlug } from "@/data/projects";
import { contactHref } from "@/data/contact";
import chefInicio from "@/assets/projects/chef-bruno/inicio.webp";
import luxInicio from "@/assets/projects/lux-bar/inicio.webp";
import torMobile from "@/assets/projects/carta-toricelli/mobile.webp";
import chefMobile from "@/assets/projects/chef-bruno/mobile.webp";
import { heroFinalWidth, heroPoses, HERO_FINAL_FY } from "./hero-layout";
import type { HeroSceneApi } from "./hero-scene";

const featured = getProjectBySlug("carta-toricelli")!;
const TEXTURES = ["/textures/hero-toricelli.webp", "/textures/hero-chef.webp", "/textures/hero-lux.webp"];
const posterImages = [
  { src: featured.cover!.src, alt: featured.cover!.alt },
  { src: chefInicio, alt: "Site Chef Bruno Sushi" },
  { src: luxInicio, alt: "Site Lux Bartenders" },
];
// Composição de referência 16:10 no HTML do servidor; no cliente, a da viewport real.
const REFERENCE_POSES = heroPoses(1600, 1000);
// Sem quebras fixas: cada palavra tem a própria máscara e o título quebra
// conforme a largura disponível.
const titleWords = "Tecnologia para seu negócio funcionar melhor e crescer".split(" ");

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const posterRefs = useRef<Array<HTMLDivElement | null>>([]);
  const posterInnerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sceneRef = useRef<HeroSceneApi | null>(null);
  const progressRef = useRef(0);
  const { capability } = useMotionPreference();
  const [fullMode, setFullMode] = useState(false);
  const [webglReady, setWebglReady] = useState(false);
  const [posterPoses, setPosterPoses] = useState(REFERENCE_POSES);
  const posesRef = useRef(REFERENCE_POSES);

  useEffect(() => {
    const update = () => {
      const p = heroPoses(window.innerWidth, window.innerHeight);
      posesRef.current = p;
      setPosterPoses(p);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(FULL_SCENE_QUERY);
    const update = () => setFullMode(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Cena 3D: só no modo completo, com WebGL2 e dispositivo capaz. Carregada
  // depois do conteúdo principal (idle), nunca bloqueando título e CTAs.
  useEffect(() => {
    const host = canvasHostRef.current;
    if (!fullMode || capability !== "full" || !host || !supportsWebGL2()) return;
    let cancelled = false;
    let api: HeroSceneApi | null = null;

    const start = () => {
      import("./hero-scene")
        .then(({ mountHeroScene }) =>
          mountHeroScene(host, {
            textures: TEXTURES,
            onReady: () => !cancelled && setWebglReady(true),
            onContextLost: () => setWebglReady(false),
          })
        )
        .then((a) => {
          if (cancelled) return a.dispose();
          api = a;
          sceneRef.current = a;
          a.setProgress(progressRef.current);
        })
        .catch(() => setWebglReady(false));
    };

    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const idle = w.requestIdleCallback ? w.requestIdleCallback(start, { timeout: 1500 }) : window.setTimeout(start, 600);

    const onPointer = (e: PointerEvent) => {
      if (!matches(FINE_HOVER_QUERY)) return;
      sceneRef.current?.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelled = true;
      if (w.cancelIdleCallback) w.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      window.removeEventListener("pointermove", onPointer);
      api?.dispose();
      sceneRef.current = null;
      setWebglReady(false);
    };
  }, [fullMode, capability]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const words = gsap.utils.toArray<HTMLElement>("[data-hero-word]");
      const reveal = gsap.utils.toArray<HTMLElement>("[data-hero-reveal]");
      const cards = posterRefs.current.filter(Boolean) as HTMLDivElement[];
      const cardIntro = gsap.utils.toArray<HTMLElement>("[data-hero-card]");

      // Composição de entrada (curta, nunca bloqueia leitura ou clique).
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // as palavras de uma mesma linha (medida agora, na largura real) sobem juntas
        const tops = words.map((w) => Math.round((w.parentElement as HTMLElement).offsetTop));
        const rows = [...new Set(tops)];
        gsap.from(words, { yPercent: 108, duration: 0.85, ease: "expo.out", delay: 0.05, stagger: (i: number) => rows.indexOf(tops[i]) * 0.07 });
        gsap.from(reveal, { autoAlpha: 0, y: 14, duration: 0.6, ease: "power3.out", stagger: 0.06, delay: 0.3 });
        gsap.from(cardIntro, { autoAlpha: 0, x: 56, duration: 0.9, ease: "expo.out", stagger: 0.08, delay: 0.12 });
      });

      // Passagem ligada à rolagem: a janela se alinha e se expande no projeto em destaque.
      mm.add(FULL_SCENE_QUERY, () => {
        const stage = stageRef.current!;
        const [front, ...backs] = cards;
        const frontInner = posterInnerRefs.current[0];
        const p0 = () => posesRef.current[0];

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              progressRef.current = self.progress;
              sceneRef.current?.setProgress(self.progress);
            },
          },
        });

        tl.to(copyRef.current, { y: -90, autoAlpha: 0, duration: 0.3, ease: "power1.in" }, 0)
          .to(metaRef.current, { autoAlpha: 0, duration: 0.12 }, 0)
          // Poster (visível sem WebGL ou enquanto ele carrega) segue a mesma passagem.
          .to(
            front,
            {
              x: () => (0.5 - p0().fx) * stage.clientWidth,
              y: () => (HERO_FINAL_FY - p0().fy) * stage.clientHeight,
              scale: () => heroFinalWidth(stage.clientWidth, stage.clientHeight) / (p0().fw * stage.clientWidth),
              duration: 0.82,
              ease: "power2.inOut",
            },
            0
          )
          .to(frontInner, { "--ry": 0, "--rx": 0, duration: 0.82, ease: "power2.inOut" }, 0)
          .to(backs, { autoAlpha: 0, scale: 0.86, duration: 0.5, ease: "power1.in" }, 0)
          .fromTo(captionRef.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.14, ease: "power2.out" }, 0.8)
          .to({}, { duration: 0.06 }, 0.94);
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-scene="hero"
      aria-labelledby="hero-title"
      className="scene-section surface-ink relative isolate overflow-x-clip"
    >
      <div ref={stageRef} className="scene-stage relative lg:min-h-[100svh]">
        {/* Janela de projetos — poster HTML + canvas WebGL por cima. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{ background: "radial-gradient(60% 55% at 68% 52%, rgba(0,207,119,0.10), transparent 70%)" }}
        />
        <div className="hidden lg:block">
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: webglReady ? 0 : 1 }}
            aria-hidden={webglReady || undefined}
          >
            {posterPoses.map((pose, i) => (
              <div
                key={i}
                ref={(el) => {
                  posterRefs.current[i] = el;
                }}
                className="absolute will-change-transform"
                style={{
                  left: `${(pose.fx - pose.fw / 2) * 100}%`,
                  top: `${pose.fy * 100}%`,
                  width: `${pose.fw * 100}%`,
                  // meia altura do cartão 16:10; margem em % usa a LARGURA do
                  // container. Não usar a propriedade translate: o GSAP a
                  // incorpora ao y e desloca o estado final.
                  marginTop: `${-(pose.fw / 3.2) * 100}%`,
                  zIndex: 10 - i,
                }}
              >
                <div data-hero-card>
                  <div
                    ref={(el) => {
                      posterInnerRefs.current[i] = el;
                    }}
                    className="frame aspect-[16/10]"
                    style={
                      {
                        "--ry": (pose.ry * 180) / Math.PI,
                        "--rx": (pose.rx * 180) / Math.PI,
                        transform: "perspective(1400px) rotateY(calc(var(--ry) * 1deg)) rotateX(calc(var(--rx) * 1deg))",
                        filter: pose.dim ? `brightness(${1 - pose.dim})` : undefined,
                      } as React.CSSProperties
                    }
                  >
                    {/* sem fill: o srcset inclui larguras mínimas, então o celular
                        (onde o poster fica oculto) não baixa a versão de 640px */}
                    <Image
                      src={posterImages[i].src}
                      alt={i === 0 ? posterImages[i].alt : ""}
                      priority={i === 0}
                      sizes={i === 0 ? "(min-width: 1024px) 70vw, 1px" : "(min-width: 1024px) 30vw, 1px"}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            ref={canvasHostRef}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: webglReady ? 1 : 0 }}
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col px-[var(--gutter)] pt-[calc(var(--header-height)+40px)] lg:min-h-[100svh] lg:justify-center lg:pt-[var(--header-height)]">
          {/* título e texto terminam antes da tela principal (--hero-copy-max);
              os botões ficam abaixo dela e usam a largura natural */}
          <div ref={copyRef} className="max-w-[640px] lg:max-w-none">
            <p data-hero-reveal className="font-kicker text-signal">
              Estruturação digital sob medida
            </p>
            <h1 id="hero-title" className="font-display mt-5 text-balance text-[length:var(--text-hero)] text-fg lg:max-w-[var(--hero-copy-max)]">
              {titleWords.map((word, i) => (
                <span key={i}>
                  <span className="word-mask">
                    <span data-hero-word className="inline-block">
                      {word}
                      {i === titleWords.length - 1 && <span className="text-signal">.</span>}
                    </span>
                  </span>
                  {i < titleWords.length - 1 && " "}
                </span>
              ))}
            </h1>
            <p data-hero-reveal className="mt-6 max-w-[34em] text-pretty text-[length:var(--text-lead)] leading-[1.55] text-fg/85 lg:max-w-[min(34em,var(--hero-copy-max))]">
              Organizamos sua presença digital, seu atendimento e seus processos com sites, automações e sistemas
              desenvolvidos para a sua realidade.
            </p>
            <div data-hero-reveal className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={contactHref("entender")} arrow>
                Conversar sobre meu negócio
              </Button>
              <Button href="#solucoes" variant="secondary">
                Conhecer as soluções
              </Button>
            </div>
          </div>

          {/* Celular e tablet: uma superfície principal, texto já legível acima. */}
          <div className="relative mt-14 mb-16 lg:hidden">
            <div className="relative mx-auto flex max-w-[560px] items-end justify-center gap-0 [perspective:1200px] md:max-w-[720px]">
              <div className="frame relative -mr-10 hidden aspect-[390/844] w-[34%] translate-y-[-10%] [transform:rotateY(18deg)] opacity-70 brightness-[0.6] sm:block">
                <Image src={chefMobile} alt="" sizes="(min-width: 1024px) 1px, 30vw" className="absolute inset-0 h-full w-full object-cover object-top" />
              </div>
              <div className="frame relative z-10 aspect-[390/844] w-[62%] max-w-[320px] rounded-[var(--radius-device)] [transform:rotateY(-14deg)_rotateX(6deg)] sm:w-[44%]">
                <Image
                  src={torMobile}
                  alt="Carta de vinhos Toricelli no celular, com a garrafa em 3D"
                  priority
                  sizes="(min-width: 1024px) 1px, (min-width: 640px) 44vw, 62vw"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
                <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/12 to-transparent motion-safe:animate-[sweep_6s_ease-in-out_infinite]" />
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-fg-muted">
              Projeto em destaque: {featured.title} · {featured.client}
            </p>
          </div>

          <div
            ref={metaRef}
            className="absolute bottom-8 left-[var(--gutter)] right-[var(--gutter)] hidden items-end justify-between gap-6 lg:flex scene-short:hidden!"
          >
            <TransitionLink
              href={`/projetos/${featured.slug}`}
              className="focus-ring group/m flex items-center gap-3 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal" />
              Projeto em destaque: {featured.title} · {featured.client}
            </TransitionLink>
            <span aria-hidden className="only-full font-label text-fg-muted">
              Role para ver o projeto
            </span>
          </div>
        </div>

        {/* Legenda do projeto ao fim da expansão (somente modo completo). */}
        <div
          ref={captionRef}
          className="only-full invisible absolute inset-x-0 bottom-0 z-20 opacity-0"
          style={{ height: `${(1 - HERO_FINAL_FY) * 100 - 33}%` }}
        >
          <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between gap-8 px-[var(--gutter)]">
            <p className="flex items-baseline gap-4 text-fg">
              <span className="font-label text-signal">Em destaque</span>
              <span className="font-heading text-[length:var(--text-h3)]">
                {featured.title} <span className="text-fg-muted">— {featured.client}</span>
              </span>
            </p>
            <TransitionLink
              href={`/projetos/${featured.slug}`}
              className="focus-ring group/btn inline-flex min-h-12 items-center gap-2 rounded-full border border-rule px-6 text-[15px] font-semibold text-fg transition-colors hover:border-fg"
            >
              Abrir o case
              <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
