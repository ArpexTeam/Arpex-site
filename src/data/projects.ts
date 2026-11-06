import type { StaticImageData } from "next/image";

import torVinhos from "@/assets/projects/carta-toricelli/vinhos.webp";
import torCarta from "@/assets/projects/carta-toricelli/carta.webp";
import torSobremesas from "@/assets/projects/carta-toricelli/sobremesas.webp";
import torInicio from "@/assets/projects/carta-toricelli/inicio.webp";
import torMobile from "@/assets/projects/carta-toricelli/mobile.webp";
import torGarrafa from "@/assets/projects/carta-toricelli/garrafa.webp";
import torCamadas from "@/assets/projects/carta-toricelli/sobremesa-camadas.webp";

import chefInicio from "@/assets/projects/chef-bruno/inicio.webp";
import chefPagina from "@/assets/projects/chef-bruno/pagina.webp";
import chefMobile from "@/assets/projects/chef-bruno/mobile.webp";
import chefOrcamento from "@/assets/projects/chef-bruno/orcamento.webp";
import chefCardapio from "@/assets/projects/chef-bruno/cardapio.webp";
import chefEventos from "@/assets/projects/chef-bruno/eventos.webp";
import chefCartaoQr from "@/assets/projects/chef-bruno/cartao-qr.webp";

import luxInicio from "@/assets/projects/lux-bar/inicio.webp";
import luxMobile from "@/assets/projects/lux-bar/mobile.webp";
import luxBebidas from "@/assets/projects/lux-bar/bebidas.webp";
import luxMonte from "@/assets/projects/lux-bar/monte-seu-bar.webp";
import luxDrinkA from "@/assets/projects/lux-bar/drink-encanto-de-verao.webp";
import luxDrinkB from "@/assets/projects/lux-bar/drink-bem-vindo-ao-paraiso.webp";
import luxDrinkC from "@/assets/projects/lux-bar/drink-the-best-of-the-princess.webp";

import honInicio from "@/assets/projects/honoratto-tattoo/inicio.webp";
import honPagina from "@/assets/projects/honoratto-tattoo/pagina.webp";
import honMobile from "@/assets/projects/honoratto-tattoo/mobile.webp";

import florLanding from "@/assets/projects/flor-de-maria-vip/landing.webp";

import crmHoje from "@/assets/projects/arpex-crm/hoje.webp";
import crmModoFoco from "@/assets/projects/arpex-crm/modo-foco.webp";
import crmPipeline from "@/assets/projects/arpex-crm/pipeline.webp";

export type ProjectMedia = {
  src: StaticImageData;
  alt: string;
  /** desktop | mobile | recorte (objeto sem fundo) | pagina (captura de página inteira) */
  kind: "desktop" | "mobile" | "cutout" | "page" | "print";
  caption?: string;
};

/** Situação pública verificável do trabalho — nunca uma métrica inventada. */
export type ProjectStatus = {
  label: string;
  /** endereço público verificado, quando existir */
  url?: string;
  urlLabel?: string;
  /** data da última verificação do endereço */
  checkedAt?: string;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  /** tipo de solução, em poucas palavras (listas e capítulos) */
  type: string;
  /** a entrega em uma frase, junto do nome e da imagem (home, portfólio, case) */
  context?: string;
  /** frentes (categorias) com evidência da entrega */
  categories: string[];
  summary: string;
  /** o que o cliente precisava resolver, em uma frase (lista de projetos) */
  problem?: string;
  challenge?: string;
  solution?: string;
  deliverables: string[];
  status: ProjectStatus;
  /** observação honesta sobre limites do material exibido */
  note?: string;
  cover?: ProjectMedia;
  gallery: ProjectMedia[];
  /** captura de página inteira usada na demonstração de rolagem */
  pageScroll?: ProjectMedia;
  /** paleta do capítulo, derivada da identidade do próprio projeto */
  palette: { bg: string; fg: string; muted: string; accent: string; dark: boolean };
  /** listado no arquivo e na home */
  listed: boolean;
  /** capítulo na home (ordem). A carta Toricelli aparece na abertura, não como capítulo. */
  featured?: number;
};

const checkedAt = "04/11/2026";

export const projects: Project[] = [
  {
    slug: "carta-toricelli",
    title: "Carta de vinhos 3D",
    client: "Toricelli Panetteria",
    type: "Carta digital em 3D para tablets",
    context: "Carta de vinhos e sobremesas em 3D para os tablets do salão de uma panetteria.",
    categories: ["Experiência digital", "Aplicativo web (PWA)"],
    summary:
      "Uma carta para tablets que se folheia como um livro. Ao tocar um vinho, a garrafa 3D sai do rótulo e vai ao palco, sem trocar de tela.",
    problem: "Apresentar a adega e as sobremesas em tablets no salão, de forma rápida para o cliente e para a equipe, inclusive sem internet.",
    challenge:
      "Apresentar a adega e as sobremesas da casa em tablets no salão, com leitura rápida para o cliente e para a equipe, inclusive sem internet.",
    solution:
      "Carta folheável com busca e filtros, garrafas 3D por família de vinho e uma vitrine de sobremesas em que “Descobrir as camadas” corta o doce e separa o interior. “Minha seleção” guarda as escolhas para mostrar à equipe.",
    deliverables: [
      "Carta folheável com busca, filtros e sumário",
      "Garrafas 3D por família: Bordeaux, Borgonha, espumante e fortificado",
      "Vitrine de sobremesas com corte em camadas e etiquetas tocáveis",
      "“Minha seleção” para mostrar à equipe",
      "Aplicativo instalável (PWA) com funcionamento offline",
      "Desenho para tablets de 10 a 13 polegadas, nas duas orientações, e celular",
    ],
    status: {
      label: "Protótipo funcional publicado",
      url: "https://carta-vinhos-projeto.vercel.app/",
      urlLabel: "Abrir a carta",
      checkedAt,
    },
    note: "Os rótulos das garrafas são provisórios, até a chegada das artes oficiais.",
    cover: { src: torVinhos, alt: "Tela da carta Toricelli com a garrafa Guaspari Vale da Pedra Syrah em 3D ao lado da ficha do vinho", kind: "desktop" },
    gallery: [
      { src: torCarta, alt: "Carta aberta como livro: sumário à esquerda e página de tintos à direita", kind: "desktop", caption: "A carta abre como um livro, com sumário e páginas por tipo." },
      { src: torSobremesas, alt: "Vitrine de sobremesas com um entremet em formato de laranja em 3D", kind: "desktop", caption: "Sobremesas: cada doce é um objeto 3D explorável." },
      { src: torCamadas, alt: "Render da sobremesa cortada, com as camadas internas afastadas", kind: "cutout", caption: "“Descobrir as camadas”: o corte separa o interior do doce." },
      { src: torGarrafa, alt: "Render da garrafa de vinho com rótulo provisório", kind: "cutout" },
      { src: torInicio, alt: "Tela inicial com os quadros Carta de vinhos e Sobremesas", kind: "desktop", caption: "Entrada em quadros grandes: vinhos ou sobremesas." },
      { src: torMobile, alt: "Carta de vinhos no celular", kind: "mobile" },
    ],
    palette: { bg: "#efe8db", fg: "#1c2a24", muted: "#4f5a52", accent: "#a8200b", dark: false },
    listed: true,
  },
  {
    slug: "chef-bruno",
    title: "Chef Bruno Sushi",
    client: "Chef Bruno Sushi",
    type: "Site com painel de conteúdo",
    context: "Site com cardápio e pedido de orçamento para um chef de eventos.",
    categories: ["Presença digital", "Painel de conteúdo", "Google e SEO"],
    summary:
      "Site editorial para um chef que leva o sushi ao endereço do evento, com cardápio, modalidades e pedido de orçamento — atualizável pelo próprio cliente.",
    problem: "Explicar um serviço que acontece no endereço do cliente e levar o visitante ao pedido de orçamento.",
    challenge:
      "Explicar um serviço que acontece ao vivo, no endereço do cliente, e levar o visitante do encantamento ao pedido de orçamento sem depender de troca de mensagens.",
    solution:
      "Site com vídeo, experiência, modalidades, cardápio, eventos e a história do chef. O orçamento pergunta modalidade, data e número de convidados. Um painel de conteúdo permite ao cliente atualizar cardápio, eventos, modalidades e dúvidas.",
    deliverables: [
      "Site publicado com páginas de experiência, modalidades, cardápio, eventos, chef e dúvidas",
      "Formulário de orçamento com modalidade, data e número de convidados",
      "Painel de conteúdo para cardápio, eventos, modalidades, dúvidas e textos",
      "WhatsApp e redes sociais integrados",
      "Checklist do perfil no Google e SEO básico (títulos, descrições, sitemap)",
      "QR Code personalizado para cartão e balcão",
      "Manual de entrega e 30 dias de suporte para ajustes",
    ],
    status: {
      label: "Site publicado · entregue em agosto de 2026",
      url: "https://chef-bruno-sushi.vercel.app/",
      urlLabel: "Visitar o site",
      checkedAt,
    },
    cover: { src: chefInicio, alt: "Abertura do site Chef Bruno Sushi: “O corte revela” sobre vídeo de sushi", kind: "desktop" },
    pageScroll: { src: chefPagina, alt: "Página inicial completa do site Chef Bruno Sushi", kind: "page" },
    gallery: [
      { src: chefMobile, alt: "Abertura do site Chef Bruno Sushi no celular", kind: "mobile" },
      { src: chefOrcamento, alt: "Página de orçamento com escolha de modalidade, data e convidados", kind: "desktop", caption: "Orçamento guiado: modalidade, data e convidados." },
      { src: chefCardapio, alt: "Página de cardápio do Chef Bruno Sushi", kind: "desktop", caption: "Cardápio gerenciado pelo painel de conteúdo." },
      { src: chefEventos, alt: "Página de eventos do Chef Bruno Sushi", kind: "desktop" },
      { src: chefCartaoQr, alt: "Cartão com QR Code que leva ao cardápio online do Chef Bruno Sushi", kind: "print", caption: "Cartão com QR Code entregue junto com o site." },
    ],
    palette: { bg: "#15100d", fg: "#f3eadf", muted: "#b9aa9a", accent: "#e8845f", dark: true },
    listed: true,
    featured: 1,
  },
  {
    slug: "lux-bar",
    title: "Lux Bartenders",
    client: "Lux Bartenders",
    type: "Site com configurador de eventos",
    context: "Site em que o visitante monta o próprio bar antes de pedir a proposta.",
    categories: ["Presença digital", "Experiência digital"],
    summary:
      "Site para um bar de eventos que faz o visitante ver o drink e montar o próprio bar antes de pedir a proposta.",
    problem: "Mostrar a estrutura do bar para eventos e transformar a visita ao site em um briefing útil para a equipe.",
    challenge:
      "Mostrar coquetelaria, estrutura e atendimento para casamentos e eventos corporativos, e transformar a visita em um briefing útil para a equipe.",
    solution:
      "Abertura editorial com fotografia em camadas, página de bebidas com recortes dos drinks e um configurador “Monte seu bar” que conduz por ocasião, volume, logística e menu, montando um resumo ao lado.",
    deliverables: [
      "Site com experiência, serviços, bebidas, galeria e contato",
      "Página de bebidas com recortes dos drinks autorais",
      "Configurador “Monte seu bar” em quatro etapas com resumo do briefing",
      "Sistema visual: preto aquecido, marfim e dourado",
      "Navegação, estados de foco e redução de movimento padronizados",
    ],
    status: { label: "Site publicado", url: "https://lux-bar.vercel.app/", urlLabel: "Visitar o site", checkedAt },
    cover: { src: luxInicio, alt: "Abertura do site Lux Bartenders: “O bar que entra na história”", kind: "desktop" },
    gallery: [
      { src: luxBebidas, alt: "Página de bebidas com drinks recortados em círculo", kind: "desktop", caption: "Bebidas: os drinks aparecem como objetos, não como fotos em grade." },
      { src: luxMonte, alt: "Configurador Monte seu bar na etapa Ocasião, com resumo ao lado", kind: "desktop", caption: "“Monte seu bar”: quatro etapas e um resumo para a equipe." },
      { src: luxDrinkA, alt: "Recorte do drink Encanto de Verão", kind: "cutout" },
      { src: luxDrinkB, alt: "Recorte do drink Bem-vindo ao Paraíso", kind: "cutout" },
      { src: luxDrinkC, alt: "Recorte do drink The Best of the Princess", kind: "cutout" },
      { src: luxMobile, alt: "Abertura do site Lux Bartenders no celular", kind: "mobile" },
    ],
    palette: { bg: "#0d0b09", fg: "#f1e9da", muted: "#a99e8c", accent: "#d2ae62", dark: true },
    listed: true,
    featured: 2,
  },
  {
    slug: "honoratto-tattoo",
    title: "Honoratto Tattoo",
    client: "Honoratto Tattoo",
    type: "Site de portfólio",
    context: "Portfólio de um estúdio de tatuagem autoral, com o orçamento a um clique.",
    categories: ["Presença digital"],
    summary:
      "Site de portfólio para um estúdio de tatuagem autoral: o trabalho em primeiro plano e o orçamento a um clique.",
    problem: "Apresentar um trabalho autoral com a força do portfólio e conduzir o visitante ao orçamento.",
    challenge: "Apresentar um trabalho autoral com a força do portfólio e conduzir o visitante ao orçamento.",
    solution:
      "Abertura tipográfica forte, coleções por estilo, portfólio em carrossel, apresentação do espaço e chamada para orçamento em todas as seções.",
    deliverables: [
      "Site com início, estúdio, galeria e orçamento",
      "Coleções por estilo e portfólio navegável",
      "Apresentação do espaço do estúdio",
      "Chamadas para orçamento e agendamento",
    ],
    status: { label: "Site publicado", url: "https://honoratto.vercel.app/", urlLabel: "Visitar o site", checkedAt },
    cover: { src: honInicio, alt: "Abertura do site Honoratto Tattoo: “Tinta que marca, estilo que permanece”", kind: "desktop" },
    pageScroll: { src: honPagina, alt: "Página inicial completa do site Honoratto Tattoo", kind: "page" },
    gallery: [{ src: honMobile, alt: "Site Honoratto Tattoo no celular", kind: "mobile" }],
    palette: { bg: "#e4e0d8", fg: "#121212", muted: "#55524d", accent: "#121212", dark: false },
    listed: true,
    featured: 3,
  },
  {
    slug: "flor-de-maria-vip",
    title: "Flor de Maria VIP",
    client: "Flor de Maria",
    type: "Sistema de lembretes",
    context: "Sistema que avisa os clientes de uma floricultura antes das datas importantes.",
    categories: ["Sistema sob medida", "Automação"],
    summary:
      "Sistema de lembretes para uma floricultura: o cliente cadastra as datas importantes e recebe um aviso no WhatsApp antes de cada uma.",
    problem: "Lembrar os clientes da floricultura das datas importantes antes que elas passem.",
    challenge: "Fazer a floricultura lembrar o cliente das datas importantes antes que elas passem.",
    solution:
      "Página de apresentação e área do cliente para cadastrar pessoa, data, ocasião e flor preferida, com login pelo Google e verificação de telefone. Um painel administrativo organiza usuários, datas, opções e o envio das mensagens.",
    deliverables: [
      "Página de apresentação com cadastro",
      "Área do cliente com cadastro de datas (pessoa, ocasião, flor)",
      "Login com Google e verificação de telefone",
      "Painel administrativo de usuários, datas e opções",
      "Mensagens de lembrete pelo WhatsApp, em modo manual ou automático",
    ],
    status: { label: "Sistema desenvolvido" },
    note: "A imagem mostra a página de apresentação do sistema.",
    cover: { src: florLanding, alt: "Página de apresentação da Flor de Maria VIP: “Nunca mais perca aniversário, bodas ou datas especiais”", kind: "desktop" },
    gallery: [],
    palette: { bg: "#f6efec", fg: "#3a1512", muted: "#6e4b46", accent: "#8e2a23", dark: false },
    listed: true,
  },
  {
    slug: "arpex-crm",
    title: "ArpeX CRM",
    client: "Produto próprio",
    type: "CRM · produto próprio",
    context: "O CRM da própria ArpeX, para organizar contatos, retornos e oportunidades.",
    categories: ["Produto próprio", "Sistema"],
    summary:
      "CRM próprio da ArpeX: o dia começa pela próxima oportunidade, o modo foco prepara a mensagem e o pipeline mostra o que avançou.",
    problem: "Organizar prospecção, retornos e fechamento sem planilhas paralelas nem lembretes de memória.",
    challenge: "Organizar prospecção, follow-up e fechamento sem planilhas paralelas nem lembretes de memória.",
    solution:
      "Tela “Hoje” com a próxima oportunidade e a fila do dia, modo foco com contexto e mensagem pronta para o WhatsApp, pipeline em tabela ou fluxo, métricas e financeiro.",
    deliverables: ["Hoje e fila do dia", "Modo foco com mensagem pronta", "Pipeline em tabela e fluxo", "Follow-ups, prospecção e modelos de mensagem", "Métricas, financeiro e relatórios"],
    status: { label: "Produto publicado, com acesso por login", url: "/ecossistema", urlLabel: "Conhecer o produto" },
    note: "Telas reais do produto, com dados de demonstração.",
    cover: { src: crmHoje, alt: "Tela Hoje do ArpeX CRM com a próxima oportunidade e a fila do dia (dados de demonstração)", kind: "desktop" },
    gallery: [
      { src: crmModoFoco, alt: "Modo foco do ArpeX CRM com a mensagem pronta para o WhatsApp (dados de demonstração)", kind: "desktop" },
      { src: crmPipeline, alt: "Pipeline do ArpeX CRM em tabela (dados de demonstração)", kind: "desktop" },
    ],
    palette: { bg: "#0f1412", fg: "#ede9e1", muted: "#9da39e", accent: "#00cf77", dark: true },
    listed: true,
  },
  {
    // Slug preservado de versões anteriores. Sem material liberado: a página
    // existe para não quebrar links, mas fica fora do arquivo e do índice.
    slug: "dalury",
    title: "Dalury",
    client: "Dalury",
    type: "Projeto",
    categories: [],
    summary: "Este trabalho ainda não tem material liberado para publicação.",
    deliverables: [],
    status: { label: "Material em liberação" },
    gallery: [],
    palette: { bg: "#0b0e0c", fg: "#ede9e1", muted: "#9da39e", accent: "#00cf77", dark: true },
    listed: false,
  },
];

export const listedProjects = projects.filter((p) => p.listed);

export const featuredProjects = projects
  .filter((p) => typeof p.featured === "number")
  .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = listedProjects.findIndex((p) => p.slug === slug);
  if (i === -1) return listedProjects[0];
  return listedProjects[(i + 1) % listedProjects.length];
}
