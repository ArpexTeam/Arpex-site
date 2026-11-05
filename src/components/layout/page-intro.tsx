import { cn } from "@/lib/cn";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  surface?: "surface-ink" | "surface-mineral" | "surface-paper";
  children?: React.ReactNode;
  className?: string;
};

/** Abertura das páginas internas: título grande à esquerda, apoio à direita. */
export default function PageIntro({ eyebrow, title, lead, surface = "surface-ink", children, className }: Props) {
  return (
    <section className={cn(surface, "pt-[calc(var(--header-height)+72px)] pb-16 md:pt-[calc(var(--header-height)+112px)] md:pb-24", className)}>
      <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-[var(--gutter)] md:grid-cols-12 md:gap-x-6">
        <div className="md:col-span-8">
          <p className="font-kicker text-accent">{eyebrow}</p>
          <h1 className="font-display mt-4 text-balance text-[length:var(--text-display)] text-fg">{title}</h1>
        </div>
        {(lead || children) && (
          <div className="md:col-span-4 md:self-end">
            {lead && <p className="max-w-[60ch] text-pretty text-[length:var(--text-lead)] leading-[1.55] text-fg">{lead}</p>}
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
