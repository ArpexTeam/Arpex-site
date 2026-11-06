import type { ContactInterest } from "./contact";

export type SolutionDemo = "page" | "interface" | "flow" | "local";

/**
 * Estruturação digital em três frentes: presença, atendimento e operação.
 * Cada frente funciona sozinha; o cliente começa pela que pesa mais hoje.
 * Só entra aqui o que já foi entregue em algum projeto (ver `examples`).
 */
export type Solution = {
  slug: string;
  /** âncoras antigas de /solucoes (quatro frentes) que continuam chegando aqui */
  legacyAnchors: string[];
  index: string;
  name: string;
  /** benefício em uma frase (painel da home e abertura da frente) */
  promise: string;
  /** situação em que a frente faz sentido (página Soluções) */
  need: string;
  /** entregas possíveis (página Soluções) */
  delivery: string[];
  /** por onde começar, só quando não repete as entregas (página Soluções) */
  start?: string;
  /** slugs de projetos que comprovam a frente */
  examples: string[];
  demo: SolutionDemo;
  interest: ContactInterest;
  cta: string;
};

export const solutions: Solution[] = [
  {
    slug: "presenca",
    legacyAnchors: ["presenca-digital", "presenca-local"],
    index: "01",
    name: "Presença",
    promise: "Para sua empresa ser encontrada e se apresentar bem.",
    need: "Seu cliente procura você no celular, compara opções e decide em poucos segundos se vale entrar em contato.",
    delivery: [
      "Sites e páginas comerciais, com WhatsApp e formulários conectados",
      "Perfil da Empresa no Google: categoria, descrição, horário, link e fotos",
      "Placas de avaliação com QR Code e NFC",
      "QR Code personalizado para cartão, balcão e impressos",
    ],
    examples: ["chef-bruno", "lux-bar", "honoratto-tattoo"],
    demo: "page",
    interest: "site",
    cta: "Quero melhorar minha presença",
  },
  {
    slug: "atendimento",
    legacyAnchors: [],
    index: "02",
    name: "Atendimento",
    promise: "Para acompanhar oportunidades e facilitar a rotina.",
    need: "Os pedidos e contatos chegam, mas acompanhar cada conversa até o fim está ficando difícil.",
    delivery: [
      "Contatos e oportunidades organizados, com histórico e próxima ação",
      "Lembretes de retorno para nenhum contato ficar esquecido",
      "Mensagens prontas com os dados do cliente, para enviar pelo WhatsApp",
      "Formulários de orçamento que já chegam com as informações necessárias",
    ],
    start: "Começamos por como os pedidos chegam hoje e onde se perdem. Daí sai o caminho: o ArpeX CRM, um formulário ou uma automação.",
    examples: ["arpex-crm", "chef-bruno", "lux-bar"],
    demo: "interface",
    interest: "crm",
    cta: "Quero organizar meu atendimento",
  },
  {
    slug: "operacao",
    legacyAnchors: ["sistemas-e-produtos", "automacao-e-ia"],
    index: "03",
    name: "Operação",
    promise: "Para reduzir trabalho repetitivo e ter mais controle.",
    need: "A rotina depende de planilhas, anotações e da memória de alguém, e as mesmas tarefas se repetem todo dia.",
    delivery: [
      "Sistema web sob medida, com login e permissões",
      "Painel com cadastros, histórico e informações em um só lugar",
      "Avisos e lembretes automáticos no momento certo",
      "Aplicativo instalável quando o uso é em tablet ou celular",
    ],
    start: "Começamos por um processo que hoje toma tempo, como um cadastro, um controle ou um lembrete.",
    examples: ["flor-de-maria-vip", "carta-toricelli"],
    demo: "flow",
    interest: "sistema",
    cta: "Quero organizar minha operação",
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
