# ArpeX Technology — site institucional

Next.js 16 (App Router) · React 19 · Tailwind 4 · GSAP 3 · Three.js (cenas sob demanda).

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

## Onde está cada coisa

- `src/data/` — conteúdo: soluções em três frentes (`solutions.ts`), projetos (`projects.ts`), método, placa (`plaque.ts`, parâmetros do modelo 3D), CRM, contato (opções e mensagens do WhatsApp), FAQ.
- `src/components/hero` · `plaque` — cenas WebGL (`*-scene.ts`, importadas sob demanda) e seus posters HTML.
- `src/lib/three/stage.ts` — ciclo de vida comum das cenas 3D (DPR, pausa fora da tela, perda de contexto, descarte).
- `src/styles/tokens.css` · `motion.css` — tipografia (Manrope + Source Sans 3), escala, superfícies e regras das cenas sticky. A condição do modo completo precisa ser igual à de `src/lib/motion/queries.ts`; `--hero-copy-max` espelha a posição da tela principal em `src/components/hero/hero-layout.ts`.
- `src/assets/projects/` — capturas reais dos trabalhos (origem em `docs/refatoracao/README.md`).
- `scripts/render-plaque-poster.mjs` — regenera o poster da placa depois de mudar `src/data/plaque.ts`.

Decisões, validações, medições e pendências de material: [docs/refatoracao/README.md](docs/refatoracao/README.md) (refatoração) e [docs/ajuste-posicionamento/README.md](docs/ajuste-posicionamento/README.md) (posicionamento, conteúdo e tipografia, com capturas antes/depois).
