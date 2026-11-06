import { SITE_URL } from "./social-links";

/**
 * Placa de avaliação com QR Code e NFC — acrílico, sem base.
 *
 * Medidas, acabamento e fotos reais ainda não foram recebidos: o modelo 3D
 * usa as proporções abaixo como parâmetro provisório e NENHUMA medida é
 * exibida no texto. Ao receber as medidas reais, troque apenas `model`.
 */
export const plaqueModel = {
  /** proporção largura × altura (unidades da cena, não centímetros) */
  width: 1.0,
  height: 1.42,
  thickness: 0.06,
  cornerRadius: 0.07,
  /** face em que a arte está impressa — confirmar com a produção */
  printSide: "back" as "front" | "back",
  measuresConfirmed: false,
  photosAvailable: false,
};

/** Fundo da cena e dos renders da placa (a página Placas abre no mesmo tom). */
export const PLAQUE_BG = "#0d110f";

/** Destino do QR de demonstração: a própria página de placas da ArpeX. */
export const plaqueDemoQrTarget = `${SITE_URL}/placas?origem=qr-demonstracao`;

export const plaqueSteps = [
  {
    key: "aproxime",
    title: "Aproxime ou escaneie",
    text: "Encostando o celular (NFC) ou com a câmera (QR Code).",
  },
  {
    key: "acesse",
    title: "Abra a página",
    text: "A página de avaliação da sua empresa abre no navegador, sem aplicativo.",
  },
  {
    key: "avalie",
    title: "Deixe sua avaliação",
    text: "O cliente escolhe a nota, escreve e decide se publica.",
  },
] as const;

export const plaqueUses = [
  { place: "Balcão e caixa", text: "No momento em que o atendimento termina." },
  { place: "Mesas", text: "Enquanto o cliente espera a conta." },
  { place: "Recepção", text: "Na saída de consultórios, salões e estúdios." },
  { place: "Entrega", text: "Junto do pedido, para quem atende fora do endereço." },
];

export const plaqueCustomization = [
  { t: "Acrílico, sem base", d: "Medidas e acabamento são combinados na contratação." },
  { t: "A arte da sua empresa", d: "Logotipo, cores e a frase de chamada, definidos com você." },
];

/** Contratação: arte, destino do link e entrega, combinados na mesma conversa. */
export const plaqueHire = [
  { t: "Arte", d: "Definimos com você o logotipo, as cores e a frase da placa." },
  { t: "Destino do link", d: "O QR Code e o NFC levam à página que você escolher, normalmente a de avaliação da sua empresa." },
  { t: "Entrega", d: "Produção, prazo e entrega são combinados na mesma conversa." },
];

/** Compatibilidade e dúvidas, numa área curta perto do fim. */
export const plaqueFaq = [
  {
    q: "Funciona em qualquer celular?",
    a: "Com NFC ativado, basta aproximar. Em qualquer celular com câmera, pelo QR Code. Por isso a placa tem os dois.",
  },
  { q: "Precisa de aplicativo?", a: "Não. A página abre no navegador do celular." },
];

/** Itens a confirmar antes de publicar especificações comerciais. */
export const plaquePending = [
  "Medidas reais da placa",
  "Espessura e acabamento do acrílico",
  "Fotos frontal, lateral e de detalhe; fotos instaladas em clientes",
  "Prazo de produção, formas de entrega e preço",
  "Face de impressão da arte (frente ou verso)",
];
