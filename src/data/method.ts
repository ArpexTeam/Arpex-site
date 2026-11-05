export type MethodStep = {
  index: string;
  title: string;
  description: string;
};

/** Planejamento, validação, testes e evolução — no tamanho de cada projeto. */
export const methodSteps: MethodStep[] = [
  {
    index: "01",
    title: "Entender",
    description: "Conhecemos o negócio, a rotina da equipe e o que precisa melhorar primeiro.",
  },
  {
    index: "02",
    title: "Definir",
    description: "Escolhemos as prioridades e planejamos uma solução proporcional à necessidade, com proposta por escrito.",
  },
  {
    index: "03",
    title: "Construir e validar",
    description: "Desenvolvemos em etapas e conferimos o funcionamento com quem vai usar, no celular e no computador.",
  },
  {
    index: "04",
    title: "Acompanhar",
    description: "Depois da entrega, ajustamos e evoluímos a solução conforme o projeto e o suporte contratado.",
  },
];
