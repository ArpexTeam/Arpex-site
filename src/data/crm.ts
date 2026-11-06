import type { StaticImageData } from "next/image";
import hoje from "@/assets/projects/arpex-crm/hoje.webp";
import modoFoco from "@/assets/projects/arpex-crm/modo-foco.webp";
import pipeline from "@/assets/projects/arpex-crm/pipeline.webp";
import followups from "@/assets/projects/arpex-crm/followups.webp";
import metricas from "@/assets/projects/arpex-crm/metricas.webp";
import prospeccao from "@/assets/projects/arpex-crm/prospeccao.webp";
import mensagens from "@/assets/projects/arpex-crm/mensagens.webp";
import financeiro from "@/assets/projects/arpex-crm/financeiro.webp";
import hojeMobile from "@/assets/projects/arpex-crm/hoje-mobile.webp";
import modoFocoMobile from "@/assets/projects/arpex-crm/modo-foco-mobile.webp";

export const CRM_LOGIN_URL = "https://arpex-crm.vercel.app/";

export type CrmScreen = {
  key: string;
  name: string;
  text: string;
  src: StaticImageData;
  mobile?: StaticImageData;
  /** área destacada na sequência da home, em % da captura */
  focus?: { x: number; y: number; w: number; h: number };
};

/** Sequência curta de uso (home): Hoje → Modo foco → Pipeline. */
export const crmStory: CrmScreen[] = [
  {
    key: "hoje",
    name: "Hoje",
    text: "O dia começa pela próxima oportunidade e pela fila do que está atrasado.",
    src: hoje,
    mobile: hojeMobile,
    focus: { x: 17.8, y: 17.4, w: 80, h: 19.8 },
  },
  {
    key: "modo-foco",
    name: "Modo foco",
    text: "Contexto do lead, mensagem pronta com os dados preenchidos e um toque para abrir o WhatsApp.",
    src: modoFoco,
    mobile: modoFocoMobile,
    focus: { x: 56.6, y: 55.6, w: 36.8, h: 13 },
  },
  {
    key: "pipeline",
    name: "Pipeline",
    text: "Cada negócio com etapa, temperatura e próxima atividade, em tabela ou fluxo.",
    src: pipeline,
    focus: { x: 19.4, y: 45.4, w: 78.4, h: 8.2 },
  },
];

export const crmScreens: CrmScreen[] = [
  ...crmStory,
  { key: "followups", name: "Follow-ups", text: "A fila de retornos: atrasados, de hoje e sem próxima ação, com mensagem para copiar.", src: followups },
  { key: "prospeccao", name: "Prospecção", text: "Fila diária de abordagem a partir da meta comercial, com listas importadas.", src: prospeccao },
  { key: "mensagens", name: "Modelos de mensagem", text: "Mensagens reutilizáveis, preenchidas com os dados de cada lead.", src: mensagens },
  { key: "metricas", name: "Métricas", text: "Onde o processo comercial está funcionando e onde está travando, com a evidência de cada alerta.", src: metricas },
  { key: "financeiro", name: "Financeiro", text: "Saldo, projeção de 30 dias e o que exige ação no caixa.", src: financeiro },
];

const byKey = (key: string) => crmScreens.find((s) => s.key === key)!;

/** Recorte de uma tela, em pixels da captura (proporção 16:10), e o trecho em destaque. */
export type CrmDetail = {
  key: string;
  title: string;
  text: string;
  screen: CrmScreen;
  crop: { x: number; y: number; w: number };
  ring: { x: number; y: number; w: number; h: number };
};

/** Fluxo curto, do contato recebido ao próximo retorno: o trecho de cada tela que faz a ação. */
export const crmFlow: CrmDetail[] = [
  {
    key: "entra",
    title: "O contato entra no pipeline",
    text: "Cada lead fica com etapa, temperatura e próxima atividade.",
    screen: byKey("pipeline"),
    crop: { x: 290, y: 330, w: 760 },
    ring: { x: 296, y: 410, w: 748, h: 54 },
  },
  {
    key: "mensagem",
    title: "A mensagem sai pronta",
    text: "No modo foco, o texto já vem com os dados do lead e abre no WhatsApp.",
    screen: byKey("modo-foco"),
    crop: { x: 790, y: 286, w: 640 },
    ring: { x: 842, y: 498, w: 496, h: 50 },
  },
  {
    key: "retorno",
    title: "O retorno entra na fila",
    text: "Follow-ups mostra o que está atrasado, com a mensagem para copiar.",
    screen: byKey("followups"),
    crop: { x: 280, y: 190, w: 1100 },
    ring: { x: 296, y: 343, w: 1070, h: 64 },
  },
  {
    key: "proximo",
    title: "O dia começa pelo próximo retorno",
    text: "Hoje abre na próxima oportunidade e na fila do que ficou para trás.",
    screen: byKey("hoje"),
    crop: { x: 240, y: 140, w: 1180 },
    ring: { x: 252, y: 152, w: 1160, h: 186 },
  },
];

/** Três usos práticos; cada um mostra duas telas inteiras. */
export const crmUses = [
  { key: "organizar", tab: "Contatos", title: "Organizar contatos e oportunidades.", screens: [byKey("pipeline"), byKey("prospeccao")] },
  { key: "acompanhar", tab: "Retornos", title: "Acompanhar retornos e propostas.", screens: [byKey("followups"), byKey("mensagens")] },
  { key: "conferir", tab: "Andamento", title: "Conferir o andamento comercial.", screens: [byKey("metricas"), byKey("financeiro")] },
];
