export type Service = {
  slug: string;
  index: string;
  name: string;
  headline: string;
  description: string;
};

export const services: Service[] = [
  {
    slug: "sistemas-sob-medida",
    index: "01",
    name: "Sistemas sob medida",
    headline: "Software desenhado ao redor da sua operação — não o contrário.",
    description:
      "Construímos sistemas internos para organizar operação, centralizar informações, controlar status, permissões, histórico e rotinas críticas do negócio.",
  },
  {
    slug: "automacao-e-ia",
    index: "02",
    name: "Automação + IA",
    headline: "Menos tarefas repetidas. Mais capacidade para decidir e crescer.",
    description:
      "Desenhamos fluxos que reduzem tarefas manuais, retrabalho e falhas entre captação, atendimento, follow-up, execução e pós-venda.",
  },
  {
    slug: "apps-e-produtos",
    index: "03",
    name: "Apps e produtos",
    headline: "Da hipótese à experiência utilizável, preparada para evoluir.",
    description:
      "Criamos apps, portais e ambientes de uso contínuo para clientes, equipes e parceiros acessarem dados, executarem rotinas e acompanharem operações.",
  },
  {
    slug: "experiencias-digitais",
    index: "04",
    name: "Experiências digitais",
    headline: "Sites que deixam de ser cartão de visita e passam a vender percepção.",
    description:
      "Criamos páginas e experiências focadas em posicionamento, captação e conversão — sem reduzir a ArpeX a esse tipo de entrega.",
  },
];
