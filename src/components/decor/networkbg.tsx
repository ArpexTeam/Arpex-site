// components/decor/networkbg.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** quão forte deve aparecer */
  strength?: "subtle" | "medium" | "strong";
  /** cor da linha/pontos */
  color?: string;
  /** duração da animação da linha 1 (s) */
  duration1?: number;
  /** duração da animação da linha 2 (s) */
  duration2?: number;
  /** atraso para iniciar (s) */
  delay?: number;
  /** duração da bolinha (s) */
  dotDuration?: number;
  /** margem do observer (opcional) */
  rootMargin?: string;
  /** threshold do observer (0..1) */
  threshold?: number | number[];
};

export default function NetworkBg({
  className,
  strength = "strong",
  color = "#00CF77",
  duration1 = 1.9,
  duration2 = 1.7,
  delay = 0,
  dotDuration = 0.28,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.25,
}: Props) {
  const map = {
    subtle: { opacity: 0.14, width: 0.5 },
    medium: { opacity: 0.24, width: 0.5 },
    strong: { opacity: 0.38, width: 0.5 },
  } as const;
  const { opacity, width } = map[strength];

  /** --- Pontos das linhas (na ordem do path) --- */
  // Linha de baixo
  const pts1 = useMemo(
    () => [
      [0, 500],
      [160, 460],
      [360, 500],
      [560, 500],
      [700, 640],
    ],
    []
  );
  // Linha de cima (curta)
  const pts2 = useMemo(
    () => [
      [0, 160],
      [120, 210],
      [280, 170],
      [320, 140],
      [380, 75],
      [440, 30],
      [480, 0],
    ],
    []
  );

  /** helpers p/ string do path e distâncias acumuladas (p/ timing dos pontos) */
  const d1 = useMemo(
    () => `M${pts1[0][0]},${pts1[0][1]} ` + pts1.slice(1).map(([x, y]) => `L${x},${y}`).join(" "),
    [pts1]
  );
  const d2 = useMemo(
    () => `M${pts2[0][0]},${pts2[0][1]} ` + pts2.slice(1).map(([x, y]) => `L${x},${y}`).join(" "),
    [pts2]
  );
  const cumDist = (pts: number[][]) => {
    const d: number[] = [0];
    for (let i = 1; i < pts.length; i++) {
      const [x1, y1] = pts[i - 1];
      const [x2, y2] = pts[i];
      d.push(d[i - 1] + Math.hypot(x2 - x1, y2 - y1));
    }
    return d;
  };
  const dist1 = useMemo(() => cumDist(pts1), [pts1]);
  const dist2 = useMemo(() => cumDist(pts2), [pts2]);
  const total1 = dist1[dist1.length - 1] || 1;
  const total2 = dist2[dist2.length - 1] || 1;

  /** refs para path length (dash) */
  const svgRef = useRef<SVGSVGElement | null>(null);
  const p1Ref = useRef<SVGPathElement | null>(null);
  const p2Ref = useRef<SVGPathElement | null>(null);
  const [len1, setLen1] = useState(0);
  const [len2, setLen2] = useState(0);

  /** controla quando iniciar (apenas 1x) */
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (p1Ref.current) setLen1(p1Ref.current.getTotalLength());
    if (p2Ref.current) setLen2(p2Ref.current.getTotalLength());
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    const el = svgRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) {
          setShouldAnimate(true); // dispara uma vez
          io.unobserve(el);
        }
      },
      { root: null, rootMargin, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold]);

  return (
    <svg
      ref={svgRef}
      className={cn("absolute inset-0 h-full w-full", className)}
      viewBox="0 0 1440 640"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        mask="url(#vignetteMask)"
        filter="url(#glow)"
        stroke={color}
        strokeWidth={width}
        opacity={opacity}
        fill="none"
        strokeLinecap="round"
      >
        {/* --- LINHA 1 (baixo) --- */}
        <path
          ref={p1Ref}
          d={d1}
          style={{
            strokeDasharray: len1 || undefined,
            strokeDashoffset: len1 || undefined,
            animation: shouldAnimate
              ? `dash ${duration1}s ease-out ${delay}s forwards`
              : undefined,
          }}
        />
        {/* pontos visíveis do layout (sem o ponto inicial) */}
        {pts1.slice(1).map(([cx, cy], i) => {
          const idx = i + 1;
          const t = dist1[idx] / total1;
          const pointDelay = delay + duration1 * t;
          return (
            <circle
              key={`p1-${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="4"
              fill={color}
              style={{
                opacity: 0,
                transform: "scale(0.25)",
                transformOrigin: "center",
                transformBox: "fill-box",
                animation: shouldAnimate
                  ? `dot ${dotDuration}s ease-out ${pointDelay}s forwards`
                  : undefined,
              }}
            />
          );
        })}

        {/* --- LINHA 2 (cima/curta) --- */}
        <path
          ref={p2Ref}
          d={d2}
          style={{
            strokeDasharray: len2 || undefined,
            strokeDashoffset: len2 || undefined,
            animation: shouldAnimate
              ? `dash ${duration2}s ease-out ${delay + 0.1}s forwards`
              : undefined,
          }}
        />
        {/* pontos visíveis do layout (sem o ponto inicial) */}
        {pts2.slice(1).map(([cx, cy], i) => {
          const idx = i + 1;
          const t = dist2[idx] / total2;
          const pointDelay = delay + 0.1 + duration2 * t;
          return (
            <circle
              key={`p2-${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="4"
              fill={color}
              style={{
                opacity: 0,
                transform: "scale(0.25)",
                transformOrigin: "center",
                transformBox: "fill-box",
                animation: shouldAnimate
                  ? `dot ${dotDuration}s ease-out ${pointDelay}s forwards`
                  : undefined,
              }}
            />
          );
        })}
      </g>

      {/* keyframes locais */}
      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes dot {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </svg>
  );
}
