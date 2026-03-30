import Section from "@/components/ui/section";
import { H2, Sub } from "@/components/ui/heading";

function IconSoftware(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden width="18" height="18" {...props}>
      <path d="M4 6h16v12H4zM8 10h8M8 14h5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconFlow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden width="18" height="18" {...props}>
      <path
        d="M6 7h6v4H6zM12 9h6M12 15H6v-4h6zM18 13v4h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconDashboard(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden width="18" height="18" {...props}>
      <path
        d="M5 18V9m7 9V6m7 12v-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconIntegrations(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden width="18" height="18" {...props}>
      <path
        d="M7 7h4v4H7zM13 13h4v4h-4zM11 9h2v2h-2zM9 11v2M15 11v2M11 15h2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconWeb(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden width="18" height="18" {...props}>
      <path d="M3 6h18v12H3zM3 10h18" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7" cy="8" r="1" fill="currentColor" />
      <circle cx="10" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

function IconLanding(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden width="18" height="18" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 9h12M6 12h8M6 15h6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

type Item = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const items: Item[] = [
  {
    title: "Sistemas sob medida",
    desc:
      "Construímos softwares personalizados para organizar operação, centralizar informações, controlar status, permissões, histórico e rotinas críticas do negócio.",
    icon: <IconSoftware className="text-black" />,
  },
  {
    title: "Automação de processos",
    desc:
      "Desenhamos fluxos que reduzem tarefas manuais, retrabalho e falhas entre captação, atendimento, follow-up, execução e pós-venda.",
    icon: <IconFlow className="text-black" />,
  },
  {
    title: "Aplicativos, portais e áreas logadas",
    desc:
      "Criamos apps, portais e ambientes de uso contínuo para clientes, equipes e parceiros acessarem dados, executarem rotinas e acompanharem operações.",
    icon: <IconDashboard className="text-black" />,
  },
  {
    title: "Soluções financeiras e regras de negócio",
    desc:
      "Estruturamos cálculos, repasses, validações, esteiras de aprovação e outras lógicas financeiras específicas do modelo de cada empresa.",
    icon: <IconIntegrations className="text-black" />,
  },
  {
    title: "Integrações e centralização de dados",
    desc:
      "Conectamos ferramentas, consolidamos informações e evitamos operações quebradas em planilhas, mensagens soltas e retrabalho constante.",
    icon: <IconWeb className="text-black" />,
  },
  {
    title: "Sites, landing pages e ativos de conversão",
    desc:
      "Criamos páginas focadas em posicionamento, captação, validação e vendas, sem reduzir a ArpeX a esse tipo de entrega.",
    icon: <IconLanding className="text-black" />,
  },
];

function ServiceCard({ item }: { item: Item }) {
  return (
    <div className="group rounded-sm border border-white/10 bg-white/[0.06] p-5 py-10 transition hover:border-[color:var(--color-brand)]/40 hover:bg-white/[0.08]">
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-[color:var(--color-brand)] ring-1 ring-black/10 shadow-[0_4px_16px_rgba(0,207,119,0.35)]">
        {item.icon}
      </div>

      <h3 className="font-semibold leading-snug text-white">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/75">{item.desc}</p>
    </div>
  );
}

export default function ServicesOverview() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-r from-[#1A1A1A] to-black py-44">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#141414] to-[#0b0b0b]" />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-20%] h-[480px] w-[480px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(0,207,119,0.12), transparent 70%)" }}
      />

      <div className="mx-auto w-10/12 max-w-[1200px] px-4">
        <header className="mb-10">
          <H2 className="text-white">Frentes de software e tecnologia que a ArpeX entrega</H2>
          <Sub className="mt-2 max-w-[72ch] text-white/70">
            A ArpeX atua como fábrica de software. Antes de vender qualquer entrega,
            entende o contexto, identifica gargalos e estrutura a solução mais aderente
            ao momento da empresa.
          </Sub>
        </header>

        <div className="mb-10 rounded-sm border border-white/10 bg-white/[0.04] px-6 py-6 text-sm leading-relaxed text-white/75">
          Nossa atuação combina clareza de negócio, qualidade de execução, robustez e velocidade.
          O foco não é empurrar tecnologia pela tecnologia, mas construir algo que traga controle,
          ganho de tempo, melhor experiência e valor real para a operação.
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <ServiceCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </Section>
  );
}
