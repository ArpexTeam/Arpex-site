import { faq } from "@/data/faq";

/** details/summary nativos: teclado, leitor de tela e funcionamento sem JS. */
export default function FaqAccordion() {
  return (
    <div className="border-t border-rule">
      {faq.map((item, i) => (
        <details key={item.q} open={i === 0} className="group border-b border-rule">
          <summary className="focus-ring group/q flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-heading text-[1.2rem] text-fg">{item.q}</span>
            <span aria-hidden className="relative h-4 w-4 shrink-0 text-fg-muted transition-colors group-hover/q:text-fg">
              <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
              <span className="absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-200 group-open:scale-y-0" />
            </span>
          </summary>
          <p className="max-w-[64ch] pb-6 text-pretty leading-relaxed text-fg-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
