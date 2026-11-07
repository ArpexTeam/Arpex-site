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
- `src/components/hero` · `plaque` — cenas WebGL (`*-scene.ts`, importadas sob demanda) e seus posters HTML. A cena da placa usa a foto real recortada (`src/assets/plaque/placa-real.webp`, pontos de NFC e QR em `src/data/plaque.ts`).
- `src/lib/three/stage.ts` — ciclo de vida comum das cenas 3D (DPR, pausa fora da tela, perda de contexto, descarte).
- `src/styles/tokens.css` · `motion.css` — tipografia (Instrument Sans, uma família só), escala, superfícies e regras das cenas sticky. A condição do modo completo precisa ser igual à de `src/lib/motion/queries.ts`; `--hero-copy-max` espelha a posição da tela principal em `src/components/hero/hero-layout.ts`.
- `src/styles/controls.css` — botões, links, menu, abas, seletores e campos: raio, cores, estados (hover, pressionado, foco, selecionado) e transições. Os componentes só escolhem a classe (`btn`, `btn-secondary`, `link` com `link-label`, `link-action`, `link-inline`, `link-muted`, `nav-link`, `tab`, `choice`, `field`, `icon-btn`); `Button` em `src/components/ui/button.tsx` tem as variantes `primary` (preenchimento no hover), `secondary` e `link`.
- `src/assets/projects/` — capturas reais dos trabalhos (origem em `docs/refatoracao/README.md`).
- `scripts/render-plaque-poster.mjs` — regenera o celular de demonstração (`src/assets/plaque/celular-demonstracao.webp`) a partir da cena, depois de mudar a tela em `plaque-art.ts`.

Decisões, validações, medições e pendências de material: [docs/refatoracao/README.md](docs/refatoracao/README.md) (refatoração) , [docs/ajuste-posicionamento/README.md](docs/ajuste-posicionamento/README.md) (posicionamento, conteúdo e tipografia) [docs/refinamento-hierarquia/README.md](docs/refinamento-hierarquia/README.md) (hierarquia, quantidade de texto e ritmo) , [docs/refinamento-controles/README.md](docs/refinamento-controles/README.md) (botões, links e seletores), [docs/revisao-visual/README.md](docs/revisao-visual/README.md) (revisão visual: padrão dos controles, Instrument Sans e reorganização das páginas) e [docs/placa-real/README.md](docs/placa-real/README.md) (foto real da placa, recorte, animação e hover de cada ação), todos com capturas.
