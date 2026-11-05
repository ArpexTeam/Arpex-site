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
    description: "Conhecemos o negócio, a rotina e o que precisa melhorar primeiro.",
  },
  {
    index: "02",
    title: "Definir",
    description: "Priorizamos e planejamos uma solução do tamanho da necessidade.",
  },
  {
    index: "03",
    title: "Construir e validar",
    description: "Desenvolvemos em etapas e testamos com quem vai usar.",
  },
  {
    index: "04",
    title: "Acompanhar",
    description: "Ajustamos e evoluímos a solução conforme o suporte contratado.",
  },
];
