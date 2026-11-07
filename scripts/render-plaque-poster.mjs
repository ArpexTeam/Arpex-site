// Regenera src/assets/plaque/celular-demonstracao.webp (o celular da cena da
// placa, no estado final, com a página de avaliação de demonstração) a partir
// da própria cena 3D. Rode depois de mudar a tela do celular (plaque-art.ts).
//
// Requer Playwright (não é dependência do projeto):
//   npm i -D playwright@1.64.1 && npx playwright install chromium
// Uso, com o site rodando (npm run dev ou npm start):
//   node scripts/render-plaque-poster.mjs http://localhost:3000
import { chromium } from "playwright";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const base = process.argv[2] ?? "http://localhost:3000";
const out = fileURLToPath(new URL("../src/assets/plaque/celular-demonstracao.webp", import.meta.url));

const browser = await chromium.launch({
  headless: true,
  args: ["--enable-gpu", "--ignore-gpu-blocklist", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto(`${base}/placas`, { waitUntil: "networkidle" });
await page.waitForTimeout(3000);

// rola em passos até o fim do trecho sticky (progresso 1)
const end = await page.evaluate(() => {
  const s = document.querySelector('[data-scene="plaque"]');
  return s.getBoundingClientRect().top + window.scrollY + s.offsetHeight - window.innerHeight;
});
for (let i = 1; i <= 20; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), (end * i) / 20);
  await page.waitForTimeout(120);
}
await page.waitForTimeout(4000);
// só a cena: sem texto, rótulos e cabeçalho
await page.addStyleTag({
  content: '[data-scene="plaque"] .relative.z-10, [data-scene="plaque"] [data-label-demo], [data-scene="plaque"] [data-label-produto], header { visibility: hidden !important; }',
});
await page.waitForTimeout(500);

const shot = await page.screenshot({ timeout: 180000 });
const { data, info } = await sharp(shot).removeAlpha().raw().toBuffer({ resolveWithObject: true });

// caixa do celular: pixels claramente diferentes do fundo na metade direita
const [br, bg, bb] = [data[0], data[1], data[2]];
let x0 = info.width, y0 = info.height, x1 = 0, y1 = 0;
for (let y = 0; y < info.height; y++) {
  for (let x = Math.round(info.width * 0.72); x < info.width; x++) {
    const i = (y * info.width + x) * 3;
    if (Math.abs(data[i] - br) + Math.abs(data[i + 1] - bg) + Math.abs(data[i + 2] - bb) > 90) {
      x0 = Math.min(x0, x);
      x1 = Math.max(x1, x);
      y0 = Math.min(y0, y);
      y1 = Math.max(y1, y);
    }
  }
}
const pad = 24;
await sharp(shot)
  .extract({ left: x0 - pad, top: y0 - pad, width: x1 - x0 + pad * 2, height: y1 - y0 + pad * 2 })
  .webp({ quality: 86 })
  .toFile(out);
console.log("celular atualizado:", out, x1 - x0, y1 - y0);
await browser.close();
