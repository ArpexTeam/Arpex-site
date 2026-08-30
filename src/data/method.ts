export type MethodStepIcon = "plan" | "content" | "fe" | "dev" | "qa" | "ship";

export type MethodStep = {
  index: string;
  icon: MethodStepIcon;
  title: string;
  description: string;
};

export const methodSteps: MethodStep[] = [
  {
    index: "01",
    icon: "plan",
    title: "Diagnóstico",
    description:
      "Entendemos o contexto do negócio, as dores atuais e os objetivos para definir a direção correta.",
  },
  {
    index: "02",
    icon: "content",
    title: "Escopo e proposta",
    description:
      "Transformamos o diagnóstico em um plano claro, com prioridades, entregas, prazos e definição de valor.",
  },
  {
    index: "03",
    icon: "fe",
    title: "Protótipo e validação",
    description:
      "Quando faz sentido, validamos fluxos, telas e estrutura antes do desenvolvimento para reduzir risco e retrabalho.",
  },
  {
    index: "04",
    icon: "dev",
    title: "Desenvolvimento",
    description:
      "Construímos a solução com foco em robustez, clareza operacional, experiência de uso e evolução futura.",
  },
  {
    index: "05",
    icon: "qa",
    title: "Lançamento",
    description:
      "Publicamos a entrega com validações finais, ajustes de qualidade e preparação do ambiente para uso real.",
  },
  {
    index: "06",
    icon: "ship",
    title: "Ajustes e evolução",
    description:
      "Acompanhamos os primeiros ciclos de uso e refinamos o que for necessário para consolidar o resultado.",
  },
];
