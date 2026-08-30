"use client";

import { useEffect, useState } from "react";

type Props = {
  /** ID do elemento que rola (o container com overflow-y-auto) */
  targetId: string;
  /** 1 = linear; >1 = começa mais devagar (1.4–2.0 recomendado) */
  easing?: number;
  /** desloca o início do trilho alguns px para baixo, se quiser */
  trackOffset?: number;
};

/**
 * Trilho vertical do arquivo de projetos, restaurado do site original:
 * acompanha o scroll real do container (scrollTop/scrollHeight/clientHeight),
 * não uma animação decorativa. Modo "container" — para o scroller interno
 * de desktop. Ver scroll-rail-mobile.tsx para o equivalente ligado ao
 * scroll da página, usado abaixo de 768px.
 */
export default function ScrollRail({ targetId, easing = 1.6, trackOffset = 0 }: Props) {
  const [railTop, setRailTop] = useState(0);
  const [railHeight, setRailHeight] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const place = () => {
      setRailTop(el.offsetTop + trackOffset);
      setRailHeight(Math.max(el.clientHeight - trackOffset, 0));
    };

    const onScroll = () => {
      const total = Math.max(el.scrollHeight - el.clientHeight, 1);
      const scrolled = Math.min(Math.max(el.scrollTop, 0), total);
      const raw = scrolled / total;
      const eased = Math.pow(raw, easing);
      setPct(Math.min(1, Math.max(0, eased)));
    };

    const ro = new ResizeObserver(() => place());

    place();
    onScroll();

    el.addEventListener("scroll", onScroll, { passive: true });
    ro.observe(el);
    window.addEventListener("resize", place);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", place);
      ro.disconnect();
    };
  }, [targetId, easing, trackOffset]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -left-4 z-10 hidden md:block"
      style={{ top: railTop, height: railHeight }}
    >
      <div className="ml-2 h-full w-[6px] rounded-full bg-white/10">
        <div
          className="w-full rounded-full bg-system shadow-[0_0_18px_rgba(0,207,119,0.7)] transition-[height] duration-250 ease-out"
          style={{ height: `${Math.round(pct * 100)}%` }}
        />
      </div>
    </div>
  );
}
