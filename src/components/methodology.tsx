"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/ui/section";
import { H2, Sub } from "@/components/ui/heading";
import { steps } from "@/content/methodology";

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
    <div className="glow-dot relative h-14 w-14">
      <div className="absolute inset-0 rounded-full bg-brand/25 blur-[18px]" aria-hidden />
      <div className="absolute inset-0 rounded-full bg-[color:var(--color-bg)] ring-2" aria-hidden />
      <svg
        viewBox="0 0 56 56"
        className="glow-stroke absolute inset-0 z-10 text-brand"
        aria-hidden
        focusable="false"
      >
        <circle
          cx="28"
          cy="28"
          r="25"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
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
          io.unobserve(el);
        }
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const lineDuration = 1.2;
  const lineDelay = 0.1;

  return (
    <Section
      id="metodologia"
      className="relative overflow-hidden bg-bg py-28"
      classNameContainer="mx-0 max-w-[88%] md:ml-auto md:mr-0"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[color:var(--color-surface)]/60 to-[color:var(--color-bg)]" />

      <div className="mx-auto w-full px-4">
        <div className="mb-24 text-center">
          <H2 className="text-3xl text-brand md:text-4xl">Como a ArpeX conduz cada solução</H2>
          <Sub className="mt-2 text-white/80">
            Do diagnóstico ao lançamento, cada etapa existe para reduzir risco,
            <br /> dar clareza ao escopo e entregar uma solução com valor real.
          </Sub>
        </div>

        <div
          ref={wrapRef}
          className="relative"
          data-animate={animate ? "true" : "false"}
          style={
            {
              "--line-dur": `${lineDuration}s`,
              "--line-delay": `${lineDelay}s`,
            } as React.CSSProperties
          }
          aria-label="Etapas da metodologia"
          role="list"
        >
          <div className="pointer-events-none absolute left-0 right-0 top-[28px] hidden h-px bg-white/15 md:block" />
          <div className="pointer-events-none absolute left-0 right-0 top-[28px] hidden h-px overflow-hidden md:block">
            <div className="methodology-line-progress h-px bg-white/40" />
          </div>

          <div
            className="pointer-events-none absolute bottom-[28px] left-[28px] top-[28px] w-px overflow-hidden md:hidden"
            aria-hidden
          >
            <div className="methodology-vert-base absolute inset-0 bg-white/15" />
            <div className="methodology-vert-progress absolute inset-0 bg-white/40" />
          </div>

          <ul className="grid gap-10 md:grid-cols-6">
            {steps.map((step, index) => {
              const progress = index / Math.max(steps.length - 1, 1);
              const dotDelay = lineDelay + lineDuration * progress;

              return (
                <li
                  key={step.title}
                  className="relative grid grid-cols-[56px,1fr] items-start gap-4 text-left md:block md:static"
                  style={{ "--dot-delay": `${dotDelay}s` } as React.CSSProperties}
                  role="listitem"
                >
                  <div className="col-[1]">
                    <GlowIcon name={step.key} />
                  </div>
                  <div className="col-[2]">
                    <h3 className="mt-2 text-lg font-light text-white md:mt-8">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70 md:mt-4">{step.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .methodology-line-progress {
          transform: scaleX(0);
          transform-origin: left;
        }
        [data-animate="true"] .methodology-line-progress {
          animation: line-draw var(--line-dur) ease-out var(--line-delay) forwards;
        }
        @keyframes line-draw {
          to {
            transform: scaleX(1);
          }
        }

        .methodology-vert-progress {
          transform: scaleY(0);
          transform-origin: top;
        }
        [data-animate="true"] .methodology-vert-progress {
          animation: line-draw-y var(--line-dur) ease-out var(--line-delay) forwards;
        }
        @keyframes line-draw-y {
          to {
            transform: scaleY(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .methodology-line-progress,
          .methodology-vert-progress {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <style jsx global>{`
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
          0% {
            opacity: 0;
            transform: scale(0.75);
          }
          60% {
            opacity: 1;
            transform: scale(1.08);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .glow-stroke circle {
          stroke-dasharray: 160;
          stroke-dashoffset: 160;
        }
        [data-animate="true"] li .glow-stroke circle {
          animation: ring-dash 0.5s ease-out var(--dot-delay) forwards;
        }
        @keyframes ring-dash {
          to {
            stroke-dashoffset: 0;
          }
        }

        @media (min-width: 768px) {
          [data-animate="false"] .glow-dot > :nth-child(2) {
            opacity: 0;
          }
          [data-animate="true"] li .glow-dot > :nth-child(2) {
            animation: ring-base-in 1ms linear calc(var(--dot-delay) + 0.5s) forwards;
          }
          @keyframes ring-base-in {
            to {
              opacity: 1;
            }
          }
        }

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
