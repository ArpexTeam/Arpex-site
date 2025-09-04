import Section from "@/components/ui/section";
import { H2, Sub } from "@/components/ui/heading";

/* Ícones simples em SVG (sem dependências) */
function IconWeb(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden width="18" height="18" {...props}>
      <path d="M3 6h18v12H3zM3 10h18" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7" cy="8" r="1" fill="currentColor" />
      <circle cx="10" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}
function IconCart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden width="18" height="18" {...props}>
      <path d="M3 5h2l2.5 10h9.5l2-7H6.5M10 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconBrand(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden width="18" height="18" {...props}>
      <rect x="4" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="14" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="4" y="14" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="14" y="14" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}
function IconLanding(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden width="18" height="18" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M6 9h12M6 12h8M6 15h6" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}

type Item = { title: string; desc: string; icon: React.ReactNode };

const items: Item[] = [
  {
    title: "Desenvolvimento de Sites Personalizados",
    desc:
      "Criamos sites sob medida que refletem a essência da sua marca, oferecendo uma experiência única e envolvente para seus usuários.",
    icon: <IconWeb className="text-black" />,
  },
  {
    title: "E-commerce",
    desc:
      "Construímos lojas virtuais intuitivas e seguras, projetadas para maximizar suas vendas e proporcionar uma experiência de compra excepcional aos seus clientes.",
    icon: <IconCart className="text-black" />,
  },
  {
    title: "Identidade visual",
    desc:
      "Desenvolvemos uma identidade visual forte e coesa que comunica sua marca de forma impactante, garantindo que você se destaque no mercado.",
    icon: <IconBrand className="text-black" />,
  },
  {
    title: "Landing pages",
    desc:
      "Criamos landing pages otimizadas que convertem visitantes em leads, focadas em resultados e desenhadas para impulsionar suas campanhas de marketing.",
    icon: <IconLanding className="text-black" />,
  },
];

function ServiceCard({ item }: { item: Item }) {
  return (
    <div className="group rounded-sm border border-white/10 bg-white/[0.06] p-5 py-10 transition hover:border-[color:var(--color-brand)]/40 hover:bg-white/[0.08]">
      {/* Ícone no badge verde */}
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-[color:var(--color-brand)] ring-1 ring-black/10 shadow-[0_4px_16px_rgba(0,207,119,0.35)]">
        {item.icon}
      </div>

      <h3 className="font-semibold text-white leading-snug">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/75">{item.desc}</p>
    </div>
  );
}

export default function ServicesOverview() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-r from-[#1A1A1A] to-black py-44">
      {/* fundo com gradiente sutil como no mock */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#141414] to-[#0b0b0b]" />
      {/* brilho leve no canto direito */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-20%] h-[480px] w-[480px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(0,207,119,0.12), transparent 70%)" }}
      />

      <div className="mx-auto w-10/12 max-w-[1200px] px-4">
        <header className="mb-6">
          <H2 className="text-white">Serviços</H2>
          <Sub className="mt-1 text-white/70">
            Oferecemos soluções criativas para levar seu site ao próximo nível.
          </Sub>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          {items.map((it) => (
            <ServiceCard key={it.title} item={it} />
          ))}
        </div>
      </div>
    </Section>
  );
}
