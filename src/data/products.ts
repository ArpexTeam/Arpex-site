export type ProductFeature = {
  title: string;
  description: string;
};

export const arpexCrm = {
  name: "ArpeX CRM",
  tagline: "Inteligência comercial em um único fluxo.",
  description:
    "Produto próprio da ArpeX, construído para organizar pipeline, leads, cadência e follow-up em um sistema só — sem depender de planilhas soltas ou mensagens espalhadas.",
  features: [
    {
      title: "Pipeline",
      description: "Visualização clara do estágio de cada oportunidade, do primeiro contato ao fechamento.",
    },
    {
      title: "Leads",
      description: "Captação e organização centralizada, sem depender de planilhas ou anotações soltas.",
    },
    {
      title: "Cadência",
      description: "Sequências de contato estruturadas para manter o ritmo comercial sem depender da memória.",
    },
    {
      title: "Follow-ups",
      description: "Lembretes e próximas ações sempre visíveis, para nenhuma oportunidade esfriar.",
    },
    {
      title: "Dashboard",
      description: "Visão consolidada da operação comercial, com dados conectados em um único lugar.",
    },
    {
      title: "Próxima ação",
      description: "Cada lead sempre com uma direção clara de qual é o próximo passo.",
    },
  ] satisfies ProductFeature[],
};
