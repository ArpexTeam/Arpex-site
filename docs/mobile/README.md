# Refatoração mobile

Branch `feat/mobile-refactor`, a partir de `17db14d` (a versão em produção em 08/11/2026).
Stack mantida: Next.js 16.1, React 19, Tailwind 4, GSAP 3 e Three.js. Nenhuma dependência nova.
As URLs são as mesmas e as composições de desktop (cenas sticky a partir de 1024 × 620) foram
preservadas.

## 1. Por que as animações não apareciam no celular

A biblioteca não era o problema: o GSAP e o Three.js funcionam no celular. O código simplesmente
não registrava nada para telas de toque. Foram duas condições.

1. **Toda cena dependia de uma única media query.** `FULL_SCENE_QUERY` exige
   `min-width: 1024px`, `min-height: 620px` e movimento permitido. Abaixo disso, o CSS
   `.only-flow` trocava cada cena por uma versão empilhada e parada: a abertura virava uma imagem
   estática, a placa e o CRM viravam listas verticais de imagens. Nenhum `gsap.matchMedia` tinha um
   ramo para telas menores, então celular e tablet em pé nunca viam movimento algum.
2. **Todo aparelho de toque era tratado como fraco.** O `MotionProvider` marcava a capacidade como
   `reduced` com `pointer: coarse`, com até 4 núcleos ou com menos de 4 GB de memória. Como todo
   celular tem `pointer: coarse`, a cena WebGL da placa nunca montava num aparelho de toque, nem
   num tablet potente.

O resultado era uma home de 14,5 telas de altura no celular (390 × 844), feita de imagens e textos
empilhados.

### O que mais foi verificado

O briefing pedia para não supor a causa. Os outros pontos foram conferidos pelos testes
automatizados (seção 5) e não eram a origem do problema, mas alguns pediram ajuste:

| Ponto | Situação encontrada | O que foi feito |
|---|---|---|
| Largura e tipo de aparelho | causa 1 | novo modo compacto (abaixo) |
| Toque e hover | causa 2. Nada essencial dependia de hover. | capacidade agora depende só de memória baixa ou economia de dados |
| Componentes escondidos | `.only-full` com `display: none` no celular, por desenho | as versões de celular passaram a ter movimento próprio |
| Início depois do carregamento e navegação | sem falha | coberto por teste: voltar pelo navegador repete a entrada da abertura |
| Orientação | sem falha | coberto por teste: girar o aparelho reenquadra a cena |
| Alturas fixas, sticky e overflow | no celular, nenhuma seção sticky. As alturas fixas eram só do desktop. | nenhuma seção de celular tem altura fixa |
| Movimento reduzido | conteúdo visível, sem animação | mantido. Verificado em todas as páginas. |
| WebGL | não montava no toque (causa 2) | monta no celular, com recuo automático para HTML (abaixo) |
| Falhas de inicialização | nenhum texto era escondido antes do JS | as entradas novas mantêm isso: só escondem o que está abaixo da dobra, e só depois que o JS roda |

## 2. Como o movimento funciona agora

`src/lib/motion/queries.ts` tem três modos:

- **Cena completa** (`FULL_SCENE_QUERY`, a partir de 1024 × 620, sem alteração): as cenas sticky do
  desktop, como estavam.
- **Compacto** (`COMPACT_SCENE_QUERY`, novo): celular, tablet em pé e telas baixas. Cada seção tem
  uma demonstração própria, curta, sem fixar a página: estados que se alternam, câmera que
  aproxima e reenquadra, rolagem ligada ao movimento onde ajuda e entradas discretas.
- **Movimento reduzido:** todo o conteúdo aparece de uma vez, sem animação. Os controles das
  demonstrações continuam funcionando e trocam de estado sem transição.

Regras comuns:

- **Nada depende de hover.** Os efeitos de hover do desktop só valem com `hover: hover` e
  `pointer: fine`. No toque, os controles têm um estado pressionado discreto (`:active`).
- **Sem WebGL, ou com o aparelho lento, há uma versão HTML.** A cena da placa mede 90 quadros
  depois de montar. Abaixo de cerca de 48 fps, reduz a resolução (DPR). Se, já com a resolução
  mínima, ficar abaixo de cerca de 24 fps, troca para a versão HTML, feita com a mesma foto real e
  a mesma tela de demonstração.
- **Uma falha nunca deixa conteúdo invisível.** A classe que esconde o texto antes da entrada é
  adicionada por JS e só abaixo da dobra. Sem JS, tudo aparece. Na impressão, tudo é revelado.
- **As demonstrações funcionam nos dois sentidos da rolagem.** Cada uma começa quando entra na tela
  e pausa fora dela. As de "câmera" (Soluções e CRM) voltam ao início quando saem, para recomeçar
  quando a pessoa volta. A da placa guarda o estado, e os controles continuam funcionando depois
  de voltar pela rolagem (há teste para isso).
- **A rolagem vertical nunca é bloqueada.** Faixas e telas que deslizam na horizontal usam
  `touch-action: pan-y` ou rolagem horizontal nativa. Arrastar na vertical por cima delas rola a
  página (há teste para isso).
- **Trabalho fora da tela fica pausado.** A cena WebGL só monta perto da área visível e para de
  desenhar fora dela. As demonstrações em CSS só rodam visíveis.

## 3. O que mudou em cada parte

### Home

- **Abertura.** "Tecnologia para organizar seu negócio" foi mantido. No celular, título, apoio e as
  duas ações ficam inteiros na primeira tela, e a demonstração vem logo abaixo, também na primeira
  tela. É a mesma composição da carta 3D, em formato compacto: o celular da Toricelli à frente, os
  celulares da Honoratto e da Lux inclinados ao fundo, e a garrafa. Tudo entra em sequência. A
  rolagem afasta os celulares, gira o da frente e faz a garrafa subir, reenquadrando a cena. Na legenda, "Em destaque: …" leva ao case.
  Celular deitado: duas colunas.
- **Soluções.** As três frentes partem das necessidades do briefing:
  - "Apresentar melhor a empresa e facilitar que ela seja encontrada."
  - "Acompanhar clientes, oportunidades e retornos."
  - "Reduzir tarefas repetitivas e organizar a rotina."

  Ordem no celular: necessidade → demonstração → complemento curto → link. As abas ocupam a
  largura toda, têm estado ativo evidente e funcionam com toque e teclado (setas, Home e End).
  Necessidade, demonstração e complemento trocam juntos, na direção da aba escolhida, e o painel
  não muda de altura. A floricultura aparece como **exemplo** de automação ("A mesma automação
  serve a cadastros, controles e lembretes de outras rotinas"), não como a única aplicação.
- **Placa.** No celular, a placa e o celular ficam numa só demonstração em três estados:
  1. **A placa:** foto real da placa.
  2. **Aproxime:** o celular chega, e a área de NFC e o QR Code se destacam.
  3. **Avalie:** a página de avaliação.

  A sequência anda sozinha quando entra na tela e para no fim. Os botões levam a qualquer estado,
  com barra de progresso, e a legenda curta acompanha cada estado. A tela final tem a etiqueta
  "Demonstração · tela ilustrativa" e não simula publicação. A foto e o recorte são os reais.
- **ArpeX CRM.** Três estados (Hoje, Modo Foco e Pipeline), uma tela por vez. Cada tela vem com uma
  explicação curta e tem abas visíveis, alternativa ao deslize. A "câmera" aproxima a parte da
  tela real que importa naquele estado, em vez de encolher a tela de desktop inteira. A legenda
  diz: "Telas reais do ArpeX CRM, com dados de demonstração."
- **Projetos.** No celular, uma faixa horizontal com os cards Chef Bruno Sushi, Flor de Maria VIP,
  Lux Bartenders e Honoratto Tattoo, mais "Todos os projetos". O cartão do meio fica inteiro e os vizinhos recuam
  acompanhando o dedo. Há contador ("2 de 5") e botões anterior/próximo. A mistura equilibra sites
  com sistemas de atendimento e operação.
- **Hierarquia.** A ordem segue entender → reconhecer a necessidade → ver prova → escolher o
  caminho → contato, e as demonstrações longas foram encurtadas.

### Páginas internas

- **Soluções (`/solucoes`).** Cada frente usa a mesma demonstração da home.
- **Placas (`/placas`).** A mesma demonstração em três estados, com a foto real. No celular, a lista
  de etapas do desktop fica só na demonstração, sem repetir.
- **ArpeX CRM (`/ecossistema`).**
  - Saíram as telas repetidas (`crm-uses`, `screen-detail`).
  - A página agora é organizada por tarefa: "Saber quem abordar hoje", "Mandar a mensagem certa
    sem digitar de novo" e "Não esquecer nenhum retorno".
  - Demonstração e texto curto se alternam de lado.
  - Métricas e financeiro ficaram num expansível ("Também no CRM: métricas e financeiro").
  - A aplicação CRM não foi alterada.
- **Projetos (`/projetos`).** Filtros por frente (Todos, Presença, Atendimento, Operação), com
  estado ativo evidente.
- **Sobre (`/sobre`).** Só refinamento: entradas discretas, sem mudança de conteúdo.
- **Contato (`/contato`).**
  - "Quero entender por onde começar" vem marcado e em destaque.
  - "Já sei o que preciso" abre uma lista compacta de soluções.
  - O interesse de origem chega selecionado (`?interesse=placas` → "Solicitar uma placa"). O
    projeto de origem também (`?projeto=…`).
  - Os erros aparecem junto ao campo.
  - Com o teclado aberto, o campo em foco fica abaixo do cabeçalho, com rótulo à vista.
  - O WhatsApp continua 5519988935849, e nada é enviado sem a pessoa tocar em enviar no próprio
    WhatsApp.
- **Perguntas frequentes.** O acordeão virou o componente genérico `Disclosure`, com a mesma
  animação, e é reaproveitado no CRM.

### Botões e controles

`.step-btn` (abas, estados e filtros):

- o hover só vale com ponteiro fino;
- o estado pressionado é discreto;
- o foco é visível;
- a área de toque tem pelo menos 44 px;
- o estado ativo (`.is-current` e `aria-pressed`/`aria-selected`) não depende de cor sozinha.

Os hovers do desktop foram preservados. A tipografia não mudou, porque não havia problema concreto.

## 4. Arquivos

| Área | Arquivos |
|---|---|
| Modos e capacidade | `src/lib/motion/queries.ts`, `src/components/motion/motion-provider.tsx`, `src/lib/three/stage.ts`, `src/lib/motion/use-in-view.ts` (novo) |
| Estilos | `src/styles/motion.css`, `src/styles/controls.css` |
| Abertura | `src/components/hero/hero.tsx` |
| Soluções | `src/components/solutions/solutions-showcase.tsx`, `src/components/solutions/solution-demos.tsx`, `src/data/solutions.ts`, `src/app/solucoes/page.tsx` |
| Placa | `src/components/plaque/plaque-demo.tsx` (novo), `src/components/plaque/plaque-scene.ts`, `src/components/plaque/plaque-story.tsx`, `src/app/placas/page.tsx` |
| CRM | `src/components/crm/crm-states.tsx` (novo), `src/components/crm/crm-task.tsx` (novo), `src/components/crm/crm-story.tsx`, `src/data/crm.ts`, `src/app/ecossistema/page.tsx`. Removidos: `crm-uses.tsx` e `screen-detail.tsx`. |
| Projetos | `src/components/projects/project-rail.tsx` (novo), `src/components/projects/projects-explorer.tsx` (novo), `src/components/projects/selected-projects.tsx`, `src/app/projetos/page.tsx` |
| Contato | `src/components/contact/contact-form.tsx`, `src/components/contact/faq-accordion.tsx`, `src/app/contato/page.tsx` |
| Comuns | `src/components/ui/screen-pan.tsx` (novo), `src/components/ui/disclosure.tsx` (novo), `src/components/need/need.tsx`, `src/components/closing/closing.tsx`, `src/app/sobre/page.tsx` |

## 5. Evidências

### Altura das páginas no celular (390 × 844)

Medida como `scrollHeight` ÷ altura da janela, depois do carregamento. "Antes" é a produção
(`17db14d`), e "depois" é este branch.

| Página | Antes | Depois |
|---|---|---|
| Home | 14,5 telas | 8,7 telas |
| Soluções | 6,1 | 6,4: cada frente ganhou a sua demonstração |
| Placas | 6,4 | 6,1 |
| ArpeX CRM | 7,7 | 5,8 |
| Projetos | 5,0 | 5,1 |
| Sobre | 5,2 | 5,2 |
| Contato | 4,2 | 3,6 |

Nenhuma página tem rolagem horizontal em nenhum dos tamanhos testados.

### Testes automatizados

Os testes rodaram no build de produção, uma condição por vez. Todos os testes de uma condição usam
o mesmo roteiro, adaptado ao tamanho.

| Tamanho | Condição | Resultado |
|---|---|---|
| 390 × 844 | celular, normal | 68 de 68 (ver a nota abaixo) |
| 360 × 800 | celular pequeno | 68 de 68 |
| 430 × 932 | celular grande | 68 de 68 |
| 390 × 844 | movimento reduzido | 64 de 64 |
| 390 × 844 | sem WebGL | 65 de 65 |
| 844 × 390 | celular deitado | 64 de 64 |
| 768 × 1024 | tablet em pé | 64 de 64 |
| 1440 × 900 | desktop | 36 de 36 |
| 1920 × 1032 | desktop grande | 36 de 36 |
| 1440 × 900 | desktop, movimento reduzido | 34 de 34 |
| 1440 × 900 | roteiro funcional do desktop | 78 de 78 |

**Nota sobre o deslize do CRM.** Em 390 × 844, a primeira rodada final deu 67 de 68: o deslize
entre as telas do CRM ficou em "Modo foco". A rodada seguinte passou inteira (68 de 68). Ao longo
do trabalho, essa verificação falhou 2 vezes em 26 rodadas completas. Em 67 repetições isoladas do
mesmo gesto, inclusive com quatro navegadores em paralelo e com a página ainda em movimento, não
falhou nenhuma vez. A causa não foi identificada, e o código do deslize não foi alterado. As abas
Hoje, Modo foco e Pipeline continuam visíveis como alternativa. Vale conferir o deslize num aparelho.

**O que o roteiro do celular confere:**

- **Abertura:** o título não é cortado. Título, apoio e ação ficam inteiros na primeira tela, e a
  demonstração começa nela. A garrafa entra animada, a composição fica visível depois da entrada e
  a rolagem reenquadra a cena.
- **Soluções:** o toque troca a frente, a seta do teclado leva à próxima aba e o foco acompanha.
  A seção não muda de altura entre as abas, e só um painel aparece por vez.
- **Placa:**
  - a cena 3D fica ativa no celular;
  - a sequência anda sozinha até a página de avaliação;
  - os controles levam a cada estado;
  - depois de voltar pela rolagem, os controles continuam funcionando.
- **CRM:** o toque na aba troca a tela. Deslizar para a esquerda vai para a próxima tela, arrastar
  na vertical rola a página, e só um painel aparece por vez.
- **Projetos:** deslizar mostra o próximo cartão, e o botão "Próximo projeto" também avança.
  Arrastar na vertical sobre a faixa rola a página.
- **Menu:** abre e leva à página. A âncora "Ver soluções" para com o título abaixo do cabeçalho.
- **Navegação:** voltar pelo navegador repete a abertura inteira.
- **Rotação:** a cena acompanha o aparelho deitado e de volta em pé, sem rolagem horizontal, e a
  ação da abertura continua na primeira tela.
- **Contato:**
  - "Solicitar uma placa" chega com o interesse;
  - o Tab leva do nome à empresa;
  - o erro de nome aparece;
  - com o teclado aberto, rótulo e campo ficam à vista abaixo do cabeçalho;
  - nada é enviado.
- **Em todas as rotas:** sem rolagem horizontal, sem erro de página, nenhuma entrada pendente e
  nenhum texto invisível depois de ir até o fim e voltar.

### Imagens (nesta pasta)

| Arquivo | O que mostra |
|---|---|
| `01-antes-depois-home-390.webp` | home no celular, antes × depois: abertura, soluções, placa, CRM e projetos |
| `02-telas-home-390.webp` … `07-telas-contato-390.webp` | cada página como a pessoa vê, tela a tela, rolando (home, soluções, placas, CRM, projetos, contato) |
| `08-placa-estados-390.webp` | os três estados da placa com WebGL, sem WebGL e com movimento reduzido |
| `09-abertura-tamanhos.webp` | a primeira tela em 360 × 800, 390 × 844, 430 × 932, 768 × 1024 e 844 × 390 |
| `10-antes-depois-desktop-1440.webp` | desktop antes × depois: as composições foram preservadas |

### Gravações (`videos/`)

Gravações curtas no celular (390 × 844, toque e WebGL), em MP4:

| Arquivo | Cena |
|---|---|
| `abertura.mp4` | entrada da abertura, rolagem que reenquadra, volta |
| `solucoes.mp4` | as três frentes por toque nas abas |
| `placa.mp4` | a sequência automática e o toque em "Aproxime" (cortamos 14 s parados no estado final) |
| `crm.mp4` | Hoje → Modo foco pela aba → Pipeline pelo deslize |
| `projetos.mp4` | dois deslizes na faixa e o botão "Próximo projeto" |
| `placas-pagina.mp4` | a demonstração na página Placas |
| `crm-pagina.mp4` | as tarefas na página do ArpeX CRM |

## 6. Ambiente e limitações

**Ambiente dos testes.** Build de produção (`next build` + `next start`) em Windows 11.
O navegador foi o Chromium do Playwright 1.64.1, em modo headless, configurado como celular:

- `isMobile` e `hasTouch` ativados;
- densidade 2×;
- WebGL por SwiftShader, uma GPU emulada em software.

Para a versão sem WebGL, o Chromium rodou com `--disable-gpu --disable-3d-apis`. Os gestos foram
enviados como eventos de toque crus pelo DevTools Protocol. Nenhum formulário foi enviado: o
`window.open` é interceptado e só o `localhost` carrega. O WhatsApp nunca foi aberto.

**Limitações:**

- **Nenhum aparelho físico estava disponível.** Tudo foi validado em emulação, então falta conferir
  num Android e num iPhone de verdade: o arremesso e o encaixe do dedo, o teclado virtual real, a
  barra de endereço que encolhe e o desempenho da GPU.
- **Safari/iOS (WebKit) não foi testado.** Só o Chromium está instalado aqui. Os pontos a conferir
  são os que mais variam no Safari:
  - o encaixe da faixa de projetos;
  - o `scrollend`, que tem um recuo por tempo;
  - o WebGL2 da placa;
  - as unidades `svh`.
- **O desempenho não foi medido num aparelho.** O SwiftShader roda o WebGL na CPU e é bem mais lento
  que uma GPU de celular. Por isso nenhum número de desempenho aparece neste documento. O recuo
  automático da cena (resolução menor e, se preciso, a versão HTML) foi verificado no código e na
  emulação, não num aparelho fraco de verdade.
- **O teclado virtual foi simulado** encolhendo a janela para 55% da altura. É uma aproximação: o
  comportamento real do `visualViewport` no iOS e no Android pode variar.
- **Os gestos emulados não têm a física de um dedo.** Na investigação apareceu um efeito da
  emulação: movimentos de toque enviados todos no mesmo instante viram um arremesso de velocidade
  infinita, e o Chromium engole o toque seguinte para pará-lo. Isso acontece até na rolagem comum da
  página, sem nenhum componente do site envolvido. O teste passou a usar movimentos espaçados como
  os de um dedo, e o site não foi alterado por causa disso.
- **Uma ocorrência isolada:** numa das rodadas de 844 × 390, o toque no
  botão do menu foi interceptado pelo link "Contato" do cabeçalho. A medição isolada mostrou os dois
  sem sobreposição (Contato em 661–760 px, menu em 768–812 px), e a rodada repetida passou inteira.
  Vale conferir no aparelho deitado.

**Pendências anteriores, ainda abertas:**

- O QR da placa fotografada (`A003955`) leva à página "Esta placa aguarda configuração". É preciso
  configurá-lo ou desfocá-lo na foto.
- As fotos originais em resolução cheia ainda não foram recebidas.
