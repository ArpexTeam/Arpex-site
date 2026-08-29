"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** quão forte deve aparecer */
  strength?: "subtle" | "medium" | "strong";
  color?: string;
  duration1?: number;
  duration2?: number;
  delay?: number;
  dotDuration?: number;
  rootMargin?: string;
  threshold?: number | number[];
};

/**
 * Rede de linhas SVG conectadas — traçado se desenhando (~1.7–1.9s) com
 * pontos de energia surgindo ao longo do caminho, disparado uma vez quando
 * entra em viewport. Restaurado do site original (decor/networkbg.tsx).
 */
export default function NetworkLines({
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

  const svgRef = useRef<SVGSVGElement | null>(null);
  const p1Ref = useRef<SVGPathElement | null>(null);
  const p2Ref = useRef<SVGPathElement | null>(null);
  const [len1, setLen1] = useState(0);
  const [len2, setLen2] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (p1Ref.current) setLen1(p1Ref.current.getTotalLength());
    if (p2Ref.current) setLen2(p2Ref.current.getTotalLength());
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShouldAnimate(true);
      return;
    }
    if (!svgRef.current) return;
    const el = svgRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) {
          setShouldAnimate(true);
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
        <path
          ref={p1Ref}
          d={d1}
          style={{
            strokeDasharray: len1 || undefined,
            strokeDashoffset: shouldAnimate ? 0 : len1 || undefined,
            transition: shouldAnimate ? `stroke-dashoffset ${duration1}s ease-out ${delay}s` : undefined,
          }}
        />
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
                opacity: shouldAnimate ? 1 : 0,
                transform: shouldAnimate ? "scale(1)" : "scale(0.25)",
                transformOrigin: "center",
                transformBox: "fill-box",
                transition: shouldAnimate ? `opacity ${dotDuration}s ease-out ${pointDelay}s, transform ${dotDuration}s ease-out ${pointDelay}s` : undefined,
              }}
            />
          );
        })}

        <path
          ref={p2Ref}
          d={d2}
          style={{
            strokeDasharray: len2 || undefined,
            strokeDashoffset: shouldAnimate ? 0 : len2 || undefined,
            transition: shouldAnimate ? `stroke-dashoffset ${duration2}s ease-out ${delay + 0.1}s` : undefined,
          }}
        />
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
                opacity: shouldAnimate ? 1 : 0,
                transform: shouldAnimate ? "scale(1)" : "scale(0.25)",
                transformOrigin: "center",
                transformBox: "fill-box",
                transition: shouldAnimate ? `opacity ${dotDuration}s ease-out ${pointDelay}s, transform ${dotDuration}s ease-out ${pointDelay}s` : undefined,
              }}
            />
          );
        })}
      </g>
    </svg>
  );
}
