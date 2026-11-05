/**
 * Artes desenhadas em canvas para a cena da placa. Tudo é demonstração:
 * a arte da placa diz "Sua marca" e a tela do celular é identificada como
 * demonstração, com estrelas vazias — nenhuma avaliação é simulada.
 */

export type ArtFonts = { display: string; sans: string; mono: string };

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function star(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? r : r * 0.45;
    const x = cx + Math.cos(a) * rr;
    const y = cy + Math.sin(a) * rr;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function nfcIcon(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  ctx.lineWidth = s * 0.09;
  for (let i = 0; i < 3; i++) {
    const r = s * (0.22 + i * 0.2);
    ctx.beginPath();
    ctx.arc(cx - s * 0.25, cy, r, -Math.PI / 3.2, Math.PI / 3.2);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(cx - s * 0.25, cy, s * 0.06, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

export async function loadImage(src: string) {
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  await img.decode();
  return img;
}

/** Arte impressa da placa (proporção 1 : 1.42). */
export function drawPlaqueArt(qr: HTMLImageElement, fonts: ArtFonts) {
  const W = 1024;
  const H = 1454;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#f3f1eb";
  ctx.fillRect(0, 0, W, H);

  // faixa superior: marca do cliente (placeholder)
  ctx.fillStyle = "#0f1311";
  ctx.beginPath();
  ctx.arc(140, 150, 46, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#00cf77";
  ctx.font = `600 34px ${fonts.display}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SM", 140, 152);
  ctx.textAlign = "left";
  ctx.fillStyle = "#0f1311";
  ctx.font = `600 44px ${fonts.display}`;
  ctx.fillText("Sua marca", 214, 138);
  ctx.fillStyle = "#5a605b";
  ctx.font = `500 24px ${fonts.sans}`;
  ctx.fillText("logotipo e cores da sua empresa", 214, 182);

  ctx.fillStyle = "#0f1311";
  ctx.font = `700 92px ${fonts.display}`;
  ctx.fillText("Gostou do", 96, 336);
  ctx.fillText("atendimento?", 96, 432);
  ctx.fillStyle = "#3d433f";
  ctx.font = `500 36px ${fonts.sans}`;
  ctx.fillText("Avalie a sua experiência.", 98, 508);

  // QR em painel branco
  const qx = 96;
  const qy = 600;
  const qs = 470;
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, qx, qy, qs, qs, 28);
  ctx.fill();
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(qr, qx + 26, qy + 26, qs - 52, qs - 52);
  ctx.imageSmoothingEnabled = true;

  // zona NFC
  nfcIcon(ctx, 760, 760, 150, "#0f1311");
  ctx.fillStyle = "#0f1311";
  ctx.font = `600 34px ${fonts.display}`;
  ctx.fillText("Aproxime", 650, 900);
  ctx.fillText("o celular", 650, 942);
  ctx.fillStyle = "#5a605b";
  ctx.font = `500 26px ${fonts.sans}`;
  ctx.fillText("ou escaneie o código", 650, 990);

  ctx.strokeStyle = "rgba(15,19,17,0.18)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(96, 1170);
  ctx.lineTo(W - 96, 1170);
  ctx.stroke();

  ctx.fillStyle = "#0f1311";
  ctx.font = `600 40px ${fonts.display}`;
  ctx.fillText("Aproxime. Acesse. Avalie.", 96, 1250);
  ctx.fillStyle = "#5a605b";
  ctx.font = `500 22px ${fonts.mono}`;
  ctx.fillText("ARTE DE DEMONSTRAÇÃO · ARPEX", 96, 1330);

  return c;
}

/** Tela do celular: 0 = aguardando aproximação · 1 = página de avaliação (demonstração). */
export function drawPhoneScreen(state: 0 | 1, fonts: ArtFonts) {
  const W = 720;
  const H = 1480;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;
  ctx.textBaseline = "alphabetic";

  if (state === 0) {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#161b18");
    g.addColorStop(1, "#0b0e0c");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(237,233,225,0.9)";
    ctx.font = `600 120px ${fonts.display}`;
    ctx.textAlign = "center";
    ctx.fillText("9:41", W / 2, 360);
    nfcIcon(ctx, W / 2 + 40, 760, 220, "#00cf77");
    ctx.fillStyle = "rgba(237,233,225,0.85)";
    ctx.font = `500 40px ${fonts.sans}`;
    ctx.fillText("Aproximando da placa…", W / 2, 1010);
    return c;
  }

  ctx.fillStyle = "#f6f4ef";
  ctx.fillRect(0, 0, W, H);

  // selo de demonstração
  ctx.fillStyle = "#0b0e0c";
  roundRect(ctx, 48, 70, 300, 56, 28);
  ctx.fill();
  ctx.fillStyle = "#00cf77";
  ctx.font = `500 24px ${fonts.mono}`;
  ctx.fillText("DEMONSTRAÇÃO", 76, 107);

  ctx.fillStyle = "#0f1311";
  ctx.beginPath();
  ctx.arc(96, 230, 44, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#00cf77";
  ctx.font = `600 32px ${fonts.display}`;
  ctx.textAlign = "center";
  ctx.fillText("SM", 96, 241);
  ctx.textAlign = "left";
  ctx.fillStyle = "#0f1311";
  ctx.font = `700 52px ${fonts.display}`;
  ctx.fillText("Sua empresa", 164, 226);
  ctx.fillStyle = "#5a605b";
  ctx.font = `500 28px ${fonts.sans}`;
  ctx.fillText("Página de avaliação", 164, 268);

  ctx.fillStyle = "#0f1311";
  ctx.font = `600 54px ${fonts.display}`;
  ctx.fillText("Como foi a sua", 48, 430);
  ctx.fillText("experiência?", 48, 494);

  ctx.strokeStyle = "#0f1311";
  ctx.lineWidth = 4;
  for (let i = 0; i < 5; i++) {
    star(ctx, 100 + i * 118, 610, 46);
    ctx.stroke();
  }
  ctx.fillStyle = "#5a605b";
  ctx.font = `500 26px ${fonts.sans}`;
  ctx.fillText("Toque para escolher", 48, 700);

  ctx.strokeStyle = "rgba(15,19,17,0.25)";
  ctx.lineWidth = 3;
  roundRect(ctx, 48, 750, W - 96, 300, 26);
  ctx.stroke();
  ctx.fillStyle = "#8a908b";
  ctx.font = `500 30px ${fonts.sans}`;
  ctx.fillText("Conte como foi o atendimento…", 80, 812);

  ctx.fillStyle = "#0f1311";
  roundRect(ctx, 48, 1100, W - 96, 108, 54);
  ctx.fill();
  ctx.fillStyle = "#f6f4ef";
  ctx.font = `600 36px ${fonts.sans}`;
  ctx.textAlign = "center";
  ctx.fillText("Publicar avaliação", W / 2, 1167);

  ctx.fillStyle = "#5a605b";
  ctx.font = `500 26px ${fonts.sans}`;
  ctx.fillText("Nada é publicado antes desse toque.", W / 2, 1290);
  return c;
}
