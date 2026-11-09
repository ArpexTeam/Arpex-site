"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/lib/motion/use-in-view";
import type { CrmTask } from "@/data/crm";
import ScreenPan from "@/components/ui/screen-pan";

/**
 * Uma tarefa do dia a dia: o que a pessoa quer fazer, a tela real que faz e
 * uma frase. No celular: tarefa → tela → explicação. Do tablet em diante, a
 * tela de um lado e o texto do outro, alternando a cada linha. O quadro se
 * aproxima da ação quando a linha aparece.
 */
export default function CrmTaskRow({ task, index, flip }: { task: CrmTask; index: number; flip?: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { threshold: 0.4 });
  const [live, setLive] = useState(false);
  useEffect(() => {
    if (!inView) {
      setLive(false);
      return;
    }
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setLive(true)));
    return () => cancelAnimationFrame(id);
  }, [inView]);

  const alt = `${task.screen} — tela do ArpeX CRM (dados de demonstração)`;
  return (
    <li ref={ref} data-reveal className="grid gap-x-10 gap-y-4 md:grid-cols-12 md:grid-rows-[1fr_auto_auto_1fr] md:items-center">
      <p className={cn("flex items-baseline gap-3 md:col-span-5 md:row-start-2", flip ? "md:col-start-1" : "md:col-start-8")}>
        <span className="font-label text-signal">0{index + 1}</span>
        <span className="font-heading text-[length:var(--text-h3)] text-fg">{task.title}</span>
      </p>
      <div className={cn("md:col-span-7 md:row-span-4 md:row-start-1", flip ? "md:col-start-6" : "md:col-start-1")}>
        <ScreenPan spec={task.compact} aspect={4 / 5} live={live} alt={alt} sizes="(min-width: 768px) 1px, 250vw" className="mx-auto w-[min(100%,340px)] md:hidden" />
        <ScreenPan spec={task.wide} aspect={1.6} live={live} alt={alt} sizes="(min-width: 1024px) 66vw, (min-width: 768px) 70vw, 1px" className="hidden md:block" />
      </div>
      <div className={cn("md:col-span-5 md:row-start-3", flip ? "md:col-start-1" : "md:col-start-8")}>
        <p className="max-w-[44ch] text-pretty leading-relaxed text-fg-muted">{task.text}</p>
        <p className="font-label mt-3 text-fg-muted">Tela: {task.screen}</p>
      </div>
    </li>
  );
}
