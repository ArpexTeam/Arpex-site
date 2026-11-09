"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap/gsap";
import { cn } from "@/lib/cn";
import { REDUCED_MOTION_QUERY, matches, supportsWebGL2 } from "@/lib/motion/queries";
import { useInView } from "@/lib/motion/use-in-view";
import { useMotionPreference } from "@/components/motion/motion-provider";
import { PLAQUE_BG, plaquePhoto, plaqueSteps } from "@/data/plaque";
import PlaqueCutout from "./plaque-cutout";
import placaReal from "@/assets/plaque/placa-real.webp";
import celularDemo from "@/assets/plaque/celular-demonstracao.webp";
import type { PlaqueSceneApi } from "./plaque-scene";

const PHONE_ALT =
  "Celular com uma página de avaliação de demonstração: nome da empresa, cinco estrelas vazias, campo de comentário e o botão Publicar avaliação.";

/**
 * Os três estados da demonstração e o ponto da cena 3D de cada um. A cena é a
 * mesma da versão completa (plaque-scene.ts); aqui o progresso vem do estado,
 * não da rolagem.
 */
const STATES = [
  {
    tab: "A placa",
    label: "Foto real da placa",
    text: "Placa de acrílico, sem base, para o balcão, a mesa ou a recepção.",
    progress: 0.36,
    dwell: 2400,
  },
  {
    tab: "Aproxime",
    label: "Demonstração · NFC ou QR Code",
    text: plaqueSteps[0].text,
    progress: 0.64,
    dwell: 3200,
  },
  {
    tab: "Avalie",
    label: "Demonstração · tela ilustrativa",
    text: "A página de avaliação abre no navegador, sem aplicativo. O cliente escolhe a nota, escreve e decide se publica.",
    progress: 1,
    dwell: 0,
  },
] as const;

// Versão em HTML (sem WebGL, antes do primeiro quadro e com movimento reduzido):
// a placa abre espaço, o celular encosta na área de NFC e depois mostra a página.
// Só transform e opacidade. Medidas em % do quadro quadrado.
const PLATE = { w: 64, poses: [{ cx: 50, s: 1 }, { cx: 46, s: 0.8125 }, { cx: 30, s: 0.72 }] };
const PHONE_W = 34;
const PHONE_H = (PHONE_W * celularDemo.height) / celularDemo.width;
const PHONE_POSES = [
  { cx: 104, cy: 62, r: 16, s: 0.9, o: 0 },
  { cx: 40, cy: 66, r: -14, s: 0.9, o: 1 },
  { cx: 71, cy: 50, r: 0, s: 1.06, o: 1 },
];
// pontos da arte na pose 1 (a placa com 52% de lado)
const plate1Size = PLATE.w * PLATE.poses[1].s;
const plate1 = { left: PLATE.poses[1].cx - plate1Size / 2, top: 50 - plate1Size / 2, size: plate1Size };
const NFC_AT = { x: plate1.left + plaquePhoto.nfc.x * plate1.size, y: plate1.top + plaquePhoto.nfc.y * plate1.size };
const QR_AT = { x: plate1.left + plaquePhoto.qr.x * plate1.size, y: plate1.top + plaquePhoto.qr.y * plate1.size, size: plaquePhoto.qr.size * plate1.size };

let sceneTooSlow = false;

/**
 * Celular, tablet e movimento reduzido: placa e celular na mesma demonstração,
 * em três estados (a placa → aproxime ou escaneie → a página de avaliação).
 * Quando aparece na tela, a sequência anda sozinha uma vez e para no fim; os
 * três controles levam a qualquer estado, por toque ou teclado. Nada depende
 * de hover, e a rolagem da página continua livre.
 */
export default function PlaqueDemo({ enabled, className }: { enabled: boolean; className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<PlaqueSceneApi | null>(null);
  const prog = useRef({ p: 0 });
  const { capability, reducedMotion } = useMotionPreference();
  const inView = useInView(stageRef, { threshold: 0.3 });
  const near = useInView(stageRef, { threshold: 0, rootMargin: "120% 0px" });
  const [state, setState] = useState(0);
  const [auto, setAuto] = useState(true);
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);

  // Cena 3D quando a demonstração se aproxima da tela.
  useEffect(() => {
    const host = hostRef.current;
    if (!enabled || !near || reducedMotion || capability !== "full" || sceneTooSlow || !host || !supportsWebGL2()) return;
    let cancelled = false;
    let api: PlaqueSceneApi | null = null;
    const css = getComputedStyle(document.body).fontFamily;
    import("./plaque-scene")
      .then(({ mountPlaqueScene }) =>
        mountPlaqueScene(host, {
          photoSrc: placaReal.src,
          fonts: { display: css, sans: css, mono: "ui-monospace, monospace" },
          focusX: 0.5,
          compact: true,
          background: PLAQUE_BG,
          onReady: () => !cancelled && setReady(true),
          onContextLost: () => setReady(false),
          onTooSlow: () => {
            // aparelho sem fôlego: a versão em HTML assume e a cena não volta nesta visita
            sceneTooSlow = true;
            setReady(false);
            api?.dispose();
            sceneRef.current = null;
          },
        })
      )
      .then((a) => {
        if (cancelled) return a.dispose();
        api = a;
        sceneRef.current = a;
        a.setProgress(prog.current.p);
      })
      .catch(() => setReady(false));
    return () => {
      cancelled = true;
      api?.dispose();
      sceneRef.current = null;
      setReady(false);
    };
  }, [enabled, near, reducedMotion, capability]);

  // Estado → progresso da cena (curto, com início e fim suaves).
  useEffect(() => {
    if (!started) return;
    const target = STATES[state].progress;
    const instant = matches(REDUCED_MOTION_QUERY);
    const tween = gsap.to(prog.current, {
      p: target,
      duration: instant ? 0 : state === 0 ? 1.8 : 1.5,
      ease: "power2.inOut",
      onUpdate: () => sceneRef.current?.setProgress(prog.current.p),
    });
    return () => {
      tween.kill();
    };
  }, [state, started]);

  // Sequência automática: começa ao aparecer, pausa fora da tela e para no último estado.
  useEffect(() => {
    if (!enabled || !inView) return;
    if (!started) setStarted(true);
    if (!auto || reducedMotion) return;
    const dwell = STATES[state].dwell;
    if (!dwell) {
      setAuto(false);
      return;
    }
    const id = window.setTimeout(() => setState((s) => Math.min(s + 1, STATES.length - 1)), dwell + (state === 0 ? 600 : 0));
    return () => window.clearTimeout(id);
  }, [enabled, inView, auto, state, started, reducedMotion]);

  function choose(i: number) {
    setAuto(false);
    setStarted(true);
    setState(i);
  }

  const plate = PLATE.poses[state];
  const phone = PHONE_POSES[state];
  const playing = auto && started && inView && !reducedMotion && STATES[state].dwell > 0;

  return (
    <div className={className}>
      <div
        ref={stageRef}
        role="group"
        aria-roledescription="demonstração"
        aria-label="Placa e celular: da aproximação à página de avaliação"
        data-state={state}
        className="relative mx-auto aspect-square w-full max-w-[460px] overflow-hidden rounded-[var(--radius-frame)] landscape-phone:max-w-[min(460px,72svh)]"
        style={{ background: PLAQUE_BG }}
      >
        {/* versão em HTML */}
        <div aria-hidden={ready || undefined} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: ready ? 0 : 1 }}>
          <div
            className="absolute left-1/2 top-1/2 transition-transform duration-[1100ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{
              width: `${PLATE.w}%`,
              transform: `translate(-50%, -50%) translateX(${((plate.cx - 50) / PLATE.w) * 100}%) scale(${plate.s})`,
            }}
          >
            <PlaqueCutout glow sizes="(min-width: 640px) 300px, 64vw" />
          </div>
          <span
            aria-hidden
            className={cn("absolute transition-opacity duration-500", state === 1 ? "opacity-100 delay-700" : "opacity-0")}
            style={{ left: `${NFC_AT.x}%`, top: `${NFC_AT.y}%` }}
          >
            {[0, 1, 2].map((k) => (
              <span
                key={k}
                className="absolute -left-6 -top-6 h-12 w-12 rounded-full border border-signal motion-safe:animate-[pulse-ring_1.8s_ease-out_infinite]"
                style={{ animationDelay: `${k * 0.6}s` }}
              />
            ))}
          </span>
          <span
            aria-hidden
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 rounded-md ring-2 ring-signal transition-opacity duration-500",
              state === 1 ? "opacity-100 delay-1000 motion-safe:animate-[qr-glow_1.6s_ease-in-out_infinite]" : "opacity-0"
            )}
            style={{ left: `${QR_AT.x}%`, top: `${QR_AT.y}%`, width: `${QR_AT.size + 2}%`, height: `${QR_AT.size + 2}%` }}
          />
          <div
            className="absolute left-1/2 top-1/2 transition-[transform,opacity] duration-[1100ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{
              width: `${PHONE_W}%`,
              opacity: phone.o,
              transform: `translate(-50%, -50%) translate(${((phone.cx - 50) / PHONE_W) * 100}%, ${((phone.cy - 50) / PHONE_H) * 100}%) rotate(${phone.r}deg) scale(${phone.s})`,
            }}
          >
            <Image src={celularDemo} alt={state === 2 ? PHONE_ALT : ""} sizes="(min-width: 640px) 170px, 36vw" className="h-auto w-full" />
            {/* antes da página abrir, a tela fica apagada */}
            <span
              aria-hidden
              className={cn("absolute inset-0 bg-[#0f1311] transition-opacity duration-500", state === 2 ? "opacity-0 delay-500" : "opacity-100")}
              style={{ clipPath: "polygon(11.6% 7.4%, 87.6% 6.6%, 87.4% 93.4%, 11.4% 92.6%)" }}
            />
          </div>
        </div>
        {/* cena 3D por cima, quando pronta */}
        <div ref={hostRef} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: ready ? 1 : 0 }} />

        {/* a legenda fica sobre um "chão" no tom da cena: o celular passa por baixo sem cobrir o texto */}
        <p
          className="font-label pointer-events-none absolute inset-x-0 bottom-0 pb-3 pt-10 text-center text-fg-muted"
          style={{ backgroundImage: `linear-gradient(to top, ${PLAQUE_BG} 45%, transparent)` }}
        >
          <span key={state} className="inline-block motion-safe:animate-[panel-in_360ms_cubic-bezier(0.22,1,0.36,1)]">
            {STATES[state].label}
          </span>
        </p>
      </div>

      {/* controles: qualquer estado, por toque ou teclado; o ativo mostra o tempo até o próximo */}
      <div role="group" aria-label="Etapas da demonstração" className="mx-auto mt-4 grid max-w-[460px] grid-cols-3 gap-1.5">
        {STATES.map((s, i) => (
          <button
            key={s.tab}
            type="button"
            aria-pressed={i === state}
            onClick={() => choose(i)}
            className={cn(
              "step-btn relative flex min-h-12 flex-col items-start justify-center overflow-hidden rounded-[var(--radius-choice)] px-3 py-2 text-left",
              i === state && "is-current"
            )}
          >
            <span className="font-label">0{i + 1}</span>
            <span className="text-[15px] font-medium leading-tight">{s.tab}</span>
            {i === state && playing && (
              <span
                key={`${state}-bar`}
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-signal animate-[fill-x_linear_both]"
                style={{ animationDuration: `${s.dwell + (i === 0 ? 600 : 0)}ms` }}
              />
            )}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="mx-auto mt-4 min-h-[3.2em] max-w-[460px] text-pretty leading-relaxed text-fg-muted">
        {STATES[state].text}
      </p>
    </div>
  );
}
