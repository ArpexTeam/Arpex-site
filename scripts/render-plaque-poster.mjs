// Regenera public/placas/placa-demonstracao.webp a partir da própria cena 3D
// (estado final), depois de alterar src/data/plaque.ts.
//
// Requer Playwright (não é dependência do projeto):
//   npm i -D playwright@1.64.1 && npx playwright install chromium
// Uso, com o site rodando (npm run dev ou npm start):
//   node scripts/render-plaque-poster.mjs http://localhost:3000
import { chromium } from "playwright";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const base = process.argv[2] ?? "http://localhost:3000";
const out = fileURLToPath(new URL("../public/placas/placa-demonstracao.webp", import.meta.url));

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
await page.addStyleTag({ content: '[data-scene="plaque"] .relative.z-10, header { visibility: hidden !important; }' });
await page.waitForTimeout(500);

const shot = await page.screenshot({ clip: { x: 600, y: 110, width: 720, height: 720 }, timeout: 180000 });
// recorte justo da composição (placa + celular), proporção 1320×920
await sharp(shot).extract({ left: 60, top: 220, width: 1320, height: 920 }).webp({ quality: 84 }).toFile(out);
console.log("poster atualizado:", out);
await browser.close();
