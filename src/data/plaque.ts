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

/** Destino do QR de demonstração: a própria página de placas da ArpeX. */
export const plaqueDemoQrTarget = `${SITE_URL}/placas?origem=qr-demonstracao`;

export const plaqueSteps = [
  {
    key: "aproxime",
    title: "Aproxime ou escaneie.",
    text: "O cliente encosta o celular na placa (NFC) ou aponta a câmera para o QR Code.",
  },
  {
    key: "acesse",
    title: "Acesse a página.",
    text: "Abre a página de avaliação da sua empresa, sem aplicativo e sem cadastro na placa.",
  },
  {
    key: "avalie",
    title: "Deixe sua avaliação.",
    text: "O cliente escolhe a nota, escreve e decide se envia. Abrir o link não publica nada.",
  },
] as const;

export const plaqueUses = [
  { place: "Balcão e caixa", text: "No momento em que o atendimento termina." },
  { place: "Mesas", text: "Enquanto o cliente espera a conta." },
  { place: "Recepção", text: "Na saída de consultórios, salões e estúdios." },
  { place: "Entrega", text: "Junto do pedido, para quem atende fora do endereço." },
];

export const plaqueCustomization = [
  "A identidade da sua empresa: logotipo, cores e frase de chamada.",
  "O destino do link: a página de avaliação da sua empresa ou outro endereço que você aprovar.",
  "QR Code e NFC apontando para o mesmo lugar, para quem não tem NFC no celular.",
];

/** Itens a confirmar antes de publicar especificações comerciais. */
export const plaquePending = [
  "Medidas reais da placa",
  "Espessura e acabamento do acrílico",
  "Fotos frontal, lateral e de detalhe; fotos instaladas em clientes",
  "Prazo de produção, formas de entrega e preço",
  "Face de impressão da arte (frente ou verso)",
];
