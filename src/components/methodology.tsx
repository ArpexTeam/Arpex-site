"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/ui/section";
import { H2, Sub } from "@/components/ui/heading";
import { steps } from "@/content/methodology";
// import NetworkBg from "@/components/decor/networkbg"; // se quiser usar, mantenha como antes

function GlowIcon({ name }: { name: (typeof steps)[number]["key"] }) {
  const icon = {
    plan: <path d="M6 6h12v12H6zM9 3v3M15 3v3M9 10h6" stroke="currentColor" strokeWidth="1.5" fill="none" />,
    content: <path d="M6 7h12M6 11h12M6 15h8" stroke="currentColor" strokeWidth="1.5" fill="none" />,
    fe: <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />,
    dev: <path d="M8 7h8v10H8zM10 9h4M10 12h4" stroke="currentColor" strokeWidth="1.5" fill="none" />,
    qa: (
      <path d="M10 14l2 2 4-4M12 5a7 7 0 100 14 7 7 0 000-14z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
    ship: <path d="M12 3v4M6 7h12M8 11h8M7 15h10M9 19h6" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  }[name];

  return (
    <div className="relative h-14 w-14 glow-dot">
      {/* brilho */}
      <div className="absolute inset-0 rounded-full bg-brand/25 blur-[18px]" aria-hidden />
      {/* anel base existente */}
      <div className="absolute inset-0 rounded-full ring-2 bg-[color:var(--color-bg)]" aria-hidden />
      {/* anel animado por cima */}
      <svg viewBox="0 0 56 56" className="absolute inset-0 glow-stroke text-brand z-10" aria-hidden focusable="false">
        <circle cx="28" cy="28" r="25" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      {/* ícone */}
      <svg viewBox="0 0 24 24" className="absolute inset-0 m-auto h-7 w-7 text-brand" aria-hidden>
        {icon}
      </svg>
    </div>
  );
}

export default function Methodology() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!wrapRef.current) return;
    const el = wrapRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          io.unobserve(el); // só 1x
        }
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const LINE_DURATION = 1.2; // s
  const LINE_DELAY = 0.1; // s

  return (
    <Section
      className="relative overflow-hidden py-28 bg-bg"
      classNameContainer="md:mr-0 md:ml-auto mx-0 max-w-[88%]" // mantém seu baseline
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[color:var(--color-surface)]/60 to-[color:var(--color-bg)]" />

      <div className="mx-auto w-full px-4">
        <div className="text-center mb-24">
          <H2 className="text-brand text-3xl md:text-4xl">Metodologia</H2>
          <Sub className="mt-2 text-white/80">
            Entenda nossa metodologia de criação e veja como cada etapa é
            <br /> pensada para desenvolver seu site com excelência.
          </Sub>
        </div>

        <div
          ref={wrapRef}
          className="relative"
          data-animate={animate ? "true" : "false"}
       style={{
          "--line-dur": `${LINE_DURATION}s`,
          "--line-delay": `${LINE_DELAY}s`,
        }}
          aria-label="Etapas da metodologia"
          role="list"
        >
          {/* ===== Desktop/Tablet: linha horizontal (mantida 100% como antes) ===== */}
          <div className="pointer-events-none absolute left-0 right-0 top-[28px] hidden h-px bg-white/15 md:block" />
          <div className="pointer-events-none absolute left-0 right-0 top-[28px] hidden h-px md:block overflow-hidden">
            <div className="methodology-line-progress h-px bg-white/40" />
          </div>

          {/* ===== Mobile: trilho vertical + progresso ===== */}
          <div
            className="md:hidden pointer-events-none absolute left-[28px] top-[28px] bottom-[28px] w-px overflow-hidden"
            aria-hidden
          >
            <div className="methodology-vert-base absolute inset-0 bg-white/15" />
            <div className="methodology-vert-progress absolute inset-0 bg-white/40" />
          </div>

          <ul className="grid gap-10 md:grid-cols-6">
            {steps.map((s, i) => {
              const t = i / Math.max(steps.length - 1, 1); // 0..1
              const dotDelay = LINE_DELAY + LINE_DURATION * t;
              return (
                <li
                  key={s.title}
                  className="text-left relative md:static grid md:block grid-cols-[56px,1fr] items-start gap-4"
                  style={{ "--dot-delay": `${dotDelay}s`} as React.CSSProperties}
                  role="listitem"
                >
                  {/* conector curto entre os itens no mobile (acima do dot) */}
              
                  <div className="col-[1]">
                    <GlowIcon name={s.key} />
                  </div>
                  <div className="col-[2]">
                    <h3 className="mt-2 md:mt-8 font-light text-lg text-white">{s.title}</h3>
                    <p className="mt-2 md:mt-4 text-sm leading-relaxed text-white/70">{s.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* 1) estilos LOCAIS (linhas) */}
      <style jsx>{`
        /* horizontal */
        .methodology-line-progress {
          transform-origin: left;
          transform: scaleX(0);
        }
        [data-animate="true"] .methodology-line-progress {
          animation: line-draw var(--line-dur) ease-out var(--line-delay) forwards;
        }
        @keyframes line-draw {
          to {
            transform: scaleX(1);
          }
        }

        /* vertical (mobile) */
        .methodology-vert-progress {
          transform-origin: top;
          transform: scaleY(0);
        }
        [data-animate="true"] .methodology-vert-progress {
          animation: line-draw-y var(--line-dur) ease-out var(--line-delay) forwards;
        }
        @keyframes line-draw-y {
          to {
            transform: scaleY(1);
          }
        }

        /* acessibilidade: reduzir movimento */
        @media (prefers-reduced-motion: reduce) {
          .methodology-line-progress,
          .methodology-vert-progress {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* 2) estilos GLOBAIS (atingem GlowIcon) */}
      <style jsx global>{`
        /* bolinhas pop (md+) */
        @media (min-width: 768px) {
          .glow-dot {
            opacity: 0;
            transform: scale(0.75);
            transform-origin: center;
          }
          [data-animate="true"] .glow-dot {
            animation: dot-pop 0.42s ease-out var(--dot-delay) forwards;
          }
        }
        /* bolinhas pop (mobile) — mesma animação, só que sem esconder se reduzir movimento */
        @media (max-width: 767px) {
          .glow-dot {
            opacity: 0;
            transform: scale(0.75);
            transform-origin: center;
          }
          [data-animate="true"] li .glow-dot {
            animation: dot-pop 0.42s ease-out var(--dot-delay) forwards;
          }
        }
        @keyframes dot-pop {
          0% { opacity: 0; transform: scale(0.75); }
          60% { opacity: 1; transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* traço do anel (stroke-dash) */
        .glow-stroke circle {
          stroke-dasharray: 160; /* ~ 2πr (r≈25) */
          stroke-dashoffset: 160;
        }
        [data-animate="true"] li .glow-stroke circle {
          animation: ring-dash 0.5s ease-out var(--dot-delay) forwards;
        }
        @keyframes ring-dash {
          to { stroke-dashoffset: 0; }
        }

        /* mostrar anel base após o traço animado (md+) */
        @media (min-width: 768px) {
          [data-animate="false"] .glow-dot > :nth-child(2) { opacity: 0; } /* 2º filho = anel base */
          [data-animate="true"] li .glow-dot > :nth-child(2) {
            animation: ring-base-in 1ms linear calc(var(--dot-delay) + 0.5s) forwards;
          }
          @keyframes ring-base-in { to { opacity: 1; } }
        }

        /* reduzir movimento: deixar tudo visível sem animação */
        @media (prefers-reduced-motion: reduce) {
          .glow-dot,
          .glow-stroke circle,
          [data-animate="true"] li .glow-dot > :nth-child(2) {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>
    </Section>
  );
}
