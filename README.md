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
- `src/styles/tokens.css` · `motion.css` — tipografia (Instrument Sans, uma família só), escala, superfícies e regras das cenas sticky. A condição do modo completo precisa ser igual à de `src/lib/motion/queries.ts`; `--hero-copy-max` espelha a posição da tela principal em `src/components/hero/hero-layout.ts`.
- `src/styles/controls.css` — botões, links, menu, abas, seletores e campos: raio, cores, estados (hover, pressionado, foco, selecionado) e transições. Os componentes só escolhem a classe (`btn`, `link`, `link-action`, `link-inline`, `link-muted`, `nav-link`, `tab`, `choice`, `field`, `icon-btn`); `Button` em `src/components/ui/button.tsx` tem as variantes `primary` e `link`.
- `src/assets/projects/` — capturas reais dos trabalhos (origem em `docs/refatoracao/README.md`).
- `scripts/render-plaque-poster.mjs` — regenera o poster da placa depois de mudar `src/data/plaque.ts`.

Decisões, validações, medições e pendências de material: [docs/refatoracao/README.md](docs/refatoracao/README.md) (refatoração) , [docs/ajuste-posicionamento/README.md](docs/ajuste-posicionamento/README.md) (posicionamento, conteúdo e tipografia) [docs/refinamento-hierarquia/README.md](docs/refinamento-hierarquia/README.md) (hierarquia, quantidade de texto e ritmo) , [docs/refinamento-controles/README.md](docs/refinamento-controles/README.md) (botões, links e seletores) e [docs/revisao-visual/README.md](docs/revisao-visual/README.md) (revisão visual: padrão dos controles, Instrument Sans e reorganização das páginas), todos com capturas antes/depois.
