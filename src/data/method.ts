export type MethodStep = {
  index: string;
  title: string;
  description: string;
};

export const methodSteps: MethodStep[] = [
  {
    index: "01",
    title: "Mapear",
    description:
      "Entendemos o contexto do negócio, os gargalos e os objetivos antes de propor qualquer tecnologia.",
  },
  {
    index: "02",
    title: "Desenhar",
    description:
      "Transformamos o diagnóstico em plano claro: prioridades, escopo, prazos e arquitetura da solução.",
  },
  {
    index: "03",
    title: "Construir",
    description:
      "Desenvolvemos com foco em robustez, clareza operacional e experiência de uso real.",
  },
  {
    index: "04",
    title: "Evoluir",
    description:
      "Acompanhamos os primeiros ciclos de uso e refinamos o que for necessário para consolidar o resultado.",
  },
];
