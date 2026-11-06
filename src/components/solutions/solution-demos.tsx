"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { SolutionDemo } from "@/data/solutions";
import chefPagina from "@/assets/projects/chef-bruno/pagina.webp";
import chefCartaoQr from "@/assets/projects/chef-bruno/cartao-qr.webp";
import crmHoje from "@/assets/projects/arpex-crm/hoje.webp";

/** Barra de navegador mínima, só para enquadrar capturas de página. */
function BrowserBar({ url }: { url: string }) {
  return (
    <div className="flex h-9 shrink-0 items-center gap-3 border-b border-white/10 bg-[#161a17] px-4">
      <span aria-hidden className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      </span>
      <span className="truncate rounded-full bg-white/[0.06] px-3 py-1 text-[11px] text-white/55">{url}</span>
    </div>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="font-label mt-4 text-fg-muted">{children}</p>;
}

/** Página real rolando dentro do quadro (demonstração isolada, sem iframe). */
function PageDemo({ active }: { active: boolean }) {
  return (
    <figure>
      <div className="frame flex aspect-[4/3] flex-col">
        <BrowserBar url="chef-bruno-sushi.vercel.app" />
        <div className="relative flex-1 overflow-hidden [container-type:size]">
          <div className={cn("absolute inset-x-0 top-0", active && "motion-safe:animate-[page-scroll_22s_ease-in-out_infinite_alternate]")}>
            <Image src={chefPagina} alt="Página inicial do site Chef Bruno Sushi" sizes="(min-width: 1024px) 46vw, 92vw" className="h-auto w-full" />
          </div>
        </div>
      </div>
      <Caption>Site real · Chef Bruno Sushi</Caption>
    </figure>
  );
}

/** Tela real do CRM com o foco percorrendo a próxima ação e a fila. */
function InterfaceDemo({ active }: { active: boolean }) {
  return (
    <figure>
      <div className="frame relative aspect-[4/3]">
        <Image src={crmHoje} alt="Tela Hoje do ArpeX CRM com a próxima oportunidade e a fila do dia (dados de demonstração)" fill sizes="(min-width: 1024px) 46vw, 92vw" className="object-cover object-left-top" />
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute rounded-xl ring-2 ring-signal shadow-[0_0_0_9999px_rgba(11,14,12,0.38)] transition-all duration-500",
            active ? "opacity-100" : "opacity-0"
          )}
          style={{ left: "20.6%", top: "16.8%", width: "77.6%", height: "20.4%" }}
        />
      </div>
      <Caption>Tela real do ArpeX CRM · dados de demonstração</Caption>
    </figure>
  );
}

const flowSteps = [
  { t: "O cliente cadastra a data", d: "Pessoa, ocasião e flor preferida" },
  { t: "O sistema acompanha o calendário", d: "Sem planilha, sem lembrete de memória" },
  { t: "Aviso pelo WhatsApp antes da data", d: "Envio manual ou automático, pelo painel" },
  { t: "O pedido acontece a tempo", d: "A floricultura não perde a data" },
];

function FlowDemo({ active }: { active: boolean }) {
  return (
    <figure>
      <div className="frame relative aspect-[4/3] bg-[#121613] p-6 sm:p-10">
        <ol className="relative flex h-full flex-col justify-between">
          <span aria-hidden className="absolute bottom-6 left-[11px] top-6 w-px bg-white/12" />
          <span
            aria-hidden
            className={cn(
              "absolute left-[11px] top-6 w-px origin-top bg-signal transition-transform duration-[2200ms] ease-in-out",
              active ? "scale-y-100" : "scale-y-0"
            )}
            style={{ height: "calc(100% - 48px)" }}
          />
          {flowSteps.map((s, i) => (
            <li key={s.t} className="relative grid grid-cols-[24px_1fr] items-start gap-4">
              <span
                aria-hidden
                className={cn(
                  "mt-1 grid h-6 w-6 place-items-center rounded-full border text-[10px] font-semibold transition-colors duration-300",
                  active ? "border-signal bg-signal text-ink" : "border-white/25 bg-[#121613] text-white/60"
                )}
                style={{ transitionDelay: active ? `${i * 520}ms` : "0ms" }}
              >
                {i + 1}
              </span>
              <div>
                <p className="font-heading text-[1.15rem] text-ivory sm:text-[1.35rem]">{s.t}</p>
                <p className="mt-1 text-sm text-white/55">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <Caption>Fluxo do sistema Flor de Maria VIP</Caption>
    </figure>
  );
}

const checklist = [
  "Perfil da empresa encontrado no Google",
  "Telefone do perfil confere com o WhatsApp",
  "Títulos e descrições das páginas revisados",
  "Imagens com texto alternativo",
  "Sitemap publicado",
  "QR Code personalizado entregue",
];

function LocalDemo({ active }: { active: boolean }) {
  return (
    <figure>
      <div className="frame relative grid aspect-[4/3] grid-cols-[0.8fr_1fr] gap-5 bg-[#121613] p-5 sm:gap-8 sm:p-8">
        {/* o cartão inteiro, na proporção da foto (3:4), sem corte nas laterais */}
        <div className="relative aspect-[3/4] self-center overflow-hidden rounded-xl bg-white">
          <Image src={chefCartaoQr} alt="Cartão com QR Code entregue ao Chef Bruno Sushi" fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover" />
        </div>
        <ul className="flex flex-col justify-center gap-2.5 sm:gap-3.5">
          {checklist.map((item, i) => (
            <li
              key={item}
              className={cn("flex items-start gap-3 text-[13px] leading-snug text-white/80 transition-opacity duration-300 sm:text-[15px]", active ? "opacity-100" : "opacity-30")}
              style={{ transitionDelay: active ? `${150 + i * 180}ms` : "0ms" }}
            >
              <svg aria-hidden viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-signal" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Caption>Checklist de entrega real · Chef Bruno Sushi</Caption>
    </figure>
  );
}

export default function SolutionDemoView({ demo, active: selected }: { demo: SolutionDemo; active: boolean }) {
  // o painel sai de display:none; um quadro de atraso deixa as transições rodarem
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!selected) {
      setActive(false);
      return;
    }
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setActive(true)));
    return () => cancelAnimationFrame(id);
  }, [selected]);

  switch (demo) {
    case "page":
      return <PageDemo active={active} />;
    case "interface":
      return <InterfaceDemo active={active} />;
    case "flow":
      return <FlowDemo active={active} />;
    case "local":
      return <LocalDemo active={active} />;
  }
}
