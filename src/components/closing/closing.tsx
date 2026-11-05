"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FINE_HOVER_QUERY, REDUCED_MOTION_QUERY } from "@/lib/motion/queries";
import { waLink } from "@/data/social-links";
import { contactHref } from "@/data/contact";

const words = "Vamos entender o próximo passo do seu negócio?".split(" ");
// peso variável da Manrope: base e pico perto do ponteiro
const BASE = 640;
const PEAK = 800;

/**
 * Encerramento: a mesma tipografia da abertura, respondendo ao ponteiro
 * pelo eixo de peso — palavras perto do cursor ganham corpo. Sem ponteiro
 * fino, responde à posição na tela.
 */
export default function Closing() {
  const ref = useRef<HTMLElement>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section || window.matchMedia(REDUCED_MOTION_QUERY).matches) return;
    const els = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
    const state = els.map(() => BASE);
    const target = els.map(() => BASE);
    let raf = 0;
    let running = false;
    let fx = 0;
    let fy = 0;

    const tick = () => {
      let moving = false;
      els.forEach((el, i) => {
        state[i] += (target[i] - state[i]) * 0.14;
        if (Math.abs(target[i] - state[i]) > 0.5) moving = true;
        el.style.fontWeight = String(Math.round(state[i]));
      });
      if (frameRef.current) frameRef.current.style.transform = `translate3d(${fx}px, ${fy}px, 0)`;
      raf = moving ? requestAnimationFrame(tick) : 0;
      running = moving;
    };
    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const fine = window.matchMedia(FINE_HOVER_QUERY).matches;
    const setFrom = (x: number, y: number, strength = 1) => {
      els.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2));
        const k = Math.max(0, 1 - d / 420) * strength;
        target[i] = BASE + (PEAK - BASE) * k;
      });
      const b = section.getBoundingClientRect();
      fx = ((x - b.left) / b.width - 0.5) * 18;
      fy = ((y - b.top) / b.height - 0.5) * 12;
      kick();
    };

    const onMove = (e: PointerEvent) => setFrom(e.clientX, e.clientY);
    const onLeave = () => {
      target.fill(BASE);
      fx = fy = 0;
      kick();
    };
    // toque/sem hover: o centro da tela "passa" pelas palavras ao rolar
    const onScroll = () => setFrom(window.innerWidth / 2, window.innerHeight * 0.55, 0.8);

    if (fine) {
      section.addEventListener("pointermove", onMove);
      section.addEventListener("pointerleave", onLeave);
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={ref} aria-labelledby="encerramento-title" className="surface-ink relative overflow-hidden py-28 md:py-44">
      {/* a "janela" da abertura, agora vazia, esperando o próximo projeto */}
      <div
        ref={frameRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-[16/10] w-[min(1100px,120vw)] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-full w-full rounded-[28px] border border-white/[0.07] [transform:perspective(1400px)_rotateY(-12deg)_rotateX(4deg)]" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(50% 60% at 50% 55%, rgba(0,207,119,0.08), transparent 70%)" }}
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-[var(--gutter)] text-center">
        <p className="font-kicker text-signal">Próximo passo</p>
        <h2
          id="encerramento-title"
          className="font-display mx-auto mt-6 max-w-[17ch] text-balance text-[length:var(--text-hero)] text-fg"
        >
          {words.map((w, i) => (
            <span key={i}>
              {/* o ::after invisível, no peso máximo, reserva a largura: a palavra
                  ganha corpo sem empurrar as outras nem trocar a quebra de linha */}
              <span
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
                data-word={w}
                className="inline-flex flex-col items-center after:invisible after:h-0 after:overflow-hidden after:content-[attr(data-word)] after:[font-weight:800]"
                style={{ fontWeight: BASE }}
              >
                {w}
              </span>
              {i < words.length - 1 && " "}
            </span>
          ))}
        </h2>
        <p className="mx-auto mt-8 max-w-[52ch] text-pretty text-[length:var(--text-lead)] leading-[1.55] text-fg">
          Conte o que está tomando tempo, dificultando sua rotina ou o que você quer construir. A ArpeX ajuda a
          identificar por onde começar.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href={contactHref("entender")} arrow>
            Conversar com a ArpeX
          </Button>
          <Button
            href={waLink("Olá! Vim pelo site da ArpeX e quero entender o próximo passo do meu negócio.")}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            Chamar no WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
