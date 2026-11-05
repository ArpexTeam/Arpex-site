/** Três situações curtas: o visitante se reconhece sem ler uma explicação prévia. */
const situations = [
  { title: "Informações espalhadas.", text: "Planilha, caderno e mensagem guardando o mesmo dado." },
  { title: "Contatos sem acompanhamento.", text: "Pedidos que chegam e se perdem entre conversas." },
  { title: "Tarefas que se repetem.", text: "Avisos e lembretes feitos à mão, todo dia." },
];

/** Reconhecimento da necessidade: logo depois da abertura, antes das soluções. */
export default function Need() {
  return (
    <section id="necessidade" aria-labelledby="necessidade-title" className="surface-paper py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-[var(--gutter)] md:grid-cols-12 md:gap-x-6">
        <div className="md:col-span-5">
          <h2 id="necessidade-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg">
            Sua empresa cresceu. A rotina precisa acompanhar.
          </h2>
          <p className="mt-4 max-w-[40ch] text-pretty text-[length:var(--text-lead)] leading-[1.5] text-fg-muted">
            Para quem já sente o peso do crescimento ou quer se preparar para ele.
          </p>
        </div>

        <ul className="md:col-span-6 md:col-start-7">
          {situations.map((s) => (
            <li key={s.title} className="border-t border-rule py-5 last:border-b md:py-6">
              <p className="font-heading text-[length:var(--text-h3)] text-fg">{s.title}</p>
              <p className="mt-1.5 text-pretty leading-relaxed text-fg-muted">{s.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
