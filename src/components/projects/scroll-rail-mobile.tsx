"use client";

import { useEffect, useState } from "react";

type Props = {
  /** ID do elemento acompanhado (o mesmo arquivo de projetos, em fluxo normal) */
  targetId: string;
  /** 1 = linear; >1 = começa mais devagar */
  easing?: number;
};

/**
 * Versão mobile-safe do trilho: abaixo de 768px o arquivo de projetos não
 * fica preso a um container de altura fixa (ruim para touch), então não há
 * scrollTop de container para ler. Em vez disso, o preenchimento acompanha
 * a posição do elemento em relação à janela conforme a página rola —
 * mesma lógica de progresso (easing incluso), só que ligada ao scroll da
 * janela em vez do scroll do container.
 */
export default function ScrollRailMobile({ targetId, easing = 1.6 }: Props) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = Math.max(rect.height + vh, 1);
      const scrolled = vh - rect.top;
      const raw = Math.min(Math.max(scrolled / total, 0), 1);
      const eased = Math.pow(raw, easing);
      setPct(eased);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId, easing]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 md:hidden">
      <div className="h-full w-[4px] rounded-full bg-white/10">
        <div
          className="w-full rounded-full bg-system shadow-[0_0_14px_rgba(0,207,119,0.6)] transition-[height] duration-250 ease-out"
          style={{ height: `${Math.round(pct * 100)}%` }}
        />
      </div>
    </div>
  );
}
