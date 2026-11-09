import { faq } from "@/data/faq";
import Disclosure from "@/components/ui/disclosure";

/** Perguntas frequentes: a primeira já aberta; a animação de abrir e fechar está em Disclosure. */
export default function FaqAccordion() {
  return (
    <div className="border-t border-rule">
      {faq.map((item, i) => (
        <Disclosure
          key={item.q}
          defaultOpen={i === 0}
          className="border-b border-rule"
          summary={<span className="font-heading text-[1.2rem] text-fg">{item.q}</span>}
        >
          <p className="max-w-[64ch] pb-6 text-pretty leading-relaxed text-fg-muted">{item.a}</p>
        </Disclosure>
      ))}
    </div>
  );
}
