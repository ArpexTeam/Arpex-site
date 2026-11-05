export type FaqItem = {
  q: string;
  a: string;
};

export const faq: FaqItem[] = [
  {
    q: "Preciso contratar tudo de uma vez?",
    a: "Não. Você pode começar por uma necessidade específica, como um site, uma placa ou a automação de uma tarefa. Outras frentes só entram se fizerem sentido depois.",
  },
  {
    q: "Ainda não sei do que preciso. Posso conversar mesmo assim?",
    a: "Pode. A primeira conversa serve para entender a rotina da empresa e identificar por onde começar.",
  },
  {
    q: "Quanto custa um projeto?",
    a: "Depende do escopo, das integrações e do prazo. Depois da conversa inicial você recebe uma proposta por escrito com o que está incluído.",
  },
  {
    q: "Qual é o prazo?",
    a: "Projetos enxutos saem em poucas semanas; sistemas com mais regras pedem mais validação. O prazo vem definido na proposta.",
  },
  {
    q: "O que recebo na entrega?",
    a: "A solução publicada, as informações de acesso e do que foi configurado, e o suporte definido na proposta para ajustes.",
  },
];
