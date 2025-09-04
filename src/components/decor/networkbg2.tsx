// components/decor/networkbg.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  strength?: "subtle" | "medium" | "strong";
  color?: string;
  duration?: number;      // duração da linha
  delay?: number;         // atraso inicial
  dotDuration?: number;   // duração das bolinhas
  rootMargin?: string;    // quando “encostar” na tela (margem do observer)
  threshold?: number | number[]; // % visível para disparar
};

export default function NetworkBg({
  className,
  strength = "strong",
  color = "#00CF77",
  duration = 2.5,
  delay = 0,
  dotDuration = 0.28,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.25,
}: Props) {
  const map = {
    subtle: { opacity: 0.5, width: 0.9 },
    medium: { opacity: 0.5, width: 0.9 },
    strong: { opacity: 0.5, width: 0.9 },
  } as const;
  const { opacity, width } = map[strength];

  // Pontos do path (iguais ao seu código)
  const pts = useMemo(
    () => [
      [700, 0],
      [790, 110],
      [900, 170],
      [1300, 240],
      [1450, 320],
    ],
    []
  );

  // Distâncias acumuladas para sincronizar dots
  const distances = useMemo(() => {
    const d: number[] = [0];
    for (let i = 1; i < pts.length; i++) {
      const [x1, y1] = pts[i - 1];
      const [x2, y2] = pts[i];
      d.push(d[i - 1] + Math.hypot(x2 - x1, y2 - y1));
    }
    return d;
  }, [pts]);
  const totalDist = distances[distances.length - 1] || 1;

  // Path e comprimento real
  const dPath = useMemo(
    () => `M${pts[0][0]},${pts[0][1]} ` + pts.slice(1).map(([x, y]) => `L${x},${y}`).join(" "),
    [pts]
  );
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [dashLen, setDashLen] = useState<number>(0);

  // Controla início (apenas 1x)
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (pathRef.current) setDashLen(pathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    const el = svgRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true); // dispara uma única vez
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
      <g stroke={color} strokeWidth={width} opacity={opacity} fill="none" strokeLinecap="round">
        {/* linha “desenhando” */}
        <path
          ref={pathRef}
          d={dPath}
          style={{
            strokeDasharray: dashLen || undefined,
            strokeDashoffset: dashLen || undefined,
            animation: shouldAnimate ? `dash ${duration}s ease-out ${delay}s forwards` : undefined,
          }}
        />

        {/* bolinhas surgindo quando a linha chega */}
        {pts.map(([cx, cy], i) => {
          const t = distances[i] / totalDist; // 0..1
          const dotDelay = delay + duration * t;
          return (
            <circle
              key={`${cx}-${cy}`}
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
                  ? `dot ${dotDuration}s ease-out ${dotDelay}s forwards`
                  : undefined,
              }}
            />
          );
        })}
      </g>

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
