# Foto real das placas e refinamento das interações

Esta rodada parte do ramo `feat/revisao-visual` (commit `3b49e59`). Dois pedidos foram atendidos
juntos:

1. **Fotos reais da placa:** a placa fotografada substitui o modelo fictício. O recorte da placa
   preta é o elemento principal das animações, e as fotos com a mão vão para uma seção de detalhe.
2. **Um hover próprio para cada ação:** botão principal, secundário, links, menu e abas.

## Arquivos

| Arquivo | Origem | Uso |
|---|---|---|
| `placa-recorte.png` (nesta pasta) | foto das duas placas sobre a mesa (`7AEF69E9-….jpeg`) | **arquivo transparente para conferência**: PNG sem perdas, 398 × 398 px |
| `src/assets/plaque/placa-real.webp` | o mesmo recorte | site: cena da home, abertura de Placas e versões estáticas (WebP com transparência, 34 KB) |
| `src/assets/plaque/placa-mao.webp` | `IMG_1964.jpeg` | detalhe em Placas: a placa na mão, para dar a escala (920 × 1150) |
| `src/assets/plaque/placa-frontal.webp` | `IMG_1963.jpeg` | detalhe em Placas: a frente da placa (780 × 780) |
| `src/assets/plaque/celular-demonstracao.webp` | render da própria cena (`scripts/render-plaque-poster.mjs`) | versões sem WebGL e em fluxo: o celular com a página de avaliação de demonstração |

As imagens entram por importação estática do `next/image`. Assim, cada uma tem largura e altura
reservadas, versões responsivas (`srcset`) e descrição alternativa. Saíram do projeto os renders
de demonstração (`placa-render-*.webp`, `placa-demonstracao.webp`) e o QR fictício
(`qr-demonstracao.svg`).

### Como o recorte foi feito

Ver `00-origem-e-recorte.webp` e `01-recorte-sobre-os-fundos.webp`.

- **Máscara:** as quatro bordas da placa preta foram medidas na foto e ajustadas por reta. O
  contorno inclui o brilho do polimento do acrílico e deixa de fora a sombra da mesa (à esquerda e
  embaixo). Os cantos são arredondados com 9 px de raio.
- **Pixels preservados:** nenhum pixel foi redesenhado. Proporção, cantos, texto e QR Code são os
  da foto, e a máscara foi rasterizada em 4× para suavizar o contorno.
- **Cor:** o branco do acrílico saiu amarelado pela luz do ambiente. Por isso o tom quente foi
  atenuado em 70% (ganhos R 0,94 · G 0,99 · B 1,08).
- **Giro:** a foto original tem um giro leve, de cerca de 1,8°. Ele é desfeito só na exibição,
  pela cena e pelo CSS, e o arquivo continua como saiu da foto.
- **Contorno:** conferido sobre os quatro fundos do site, os dois escuros e os dois claros.

### Fotos com a mão

Ver `07-fotos-com-a-mao-antes-depois.webp`.

- **IMG_1964:** recorte 4:5 sem a parede vazia de cima, com a mão inteira para dar a escala.
- **IMG_1963:** recorte quadrado em torno da placa e dos dedos.
- **Ajuste nas duas:** exposição +12% e contraste leve, sem mexer na saturação.

## Destino dos QR fotografados

Os QR das fotos foram decodificados e os destinos conferidos (só o primeiro redirecionamento, sem
abrir a página final):

| Placa | Código | Destino |
|---|---|---|
| Preta, nas fotos com a mão (IMG_1963/1964/1965) | `go.dettali.com/p/A004003` | formulário de avaliação no Google de um estabelecimento real |
| Azul, na foto das duas placas | `go.dettali.com/p/A004203` | formulário de avaliação no Google de outro estabelecimento real |
| Preta, na foto das duas placas (a do recorte) | `go.dettali.com/p/A003955` | página da Dettali "Esta placa aguarda configuração", com o link "Sou o responsável · Configurar placa" |

Por isso o site **não convida o visitante a escanear as fotos como teste**. As etapas ("Aproxime
ou escaneie") descrevem o uso da placa do cliente, não um teste com a foto.

O QR foi mantido na imagem, como pedido. **Antes de publicar em produção**, recomendamos uma
destas opções:

- **Configurar a placa A003955:** apontar o QR para a página de avaliação da própria ArpeX ou
  para uma página de demonstração. Assim o QR deixa de abrir a configuração para qualquer pessoa
  e, se fizer sentido, o site pode convidar ao teste.
- **Desfocar o QR nas imagens publicadas:** vale para as três placas.

## Animação

### Home: dois momentos na mesma cena

Ver `02-cena-home-1920.webp`, com seis pontos da rolagem.

1. **Produto (0–44% da rolagem).** A foto entra de trás, um pouco abaixo e virada, e assenta de
   frente. Ela começa a 25% de opacidade e chega a 100%. Uma faixa de brilho atravessa o acrílico
   na entrada. O rótulo da cena diz "Foto real da placa", e as etapas ficam esmaecidas.
2. **Demonstração (44–100%).** A placa abre espaço para a esquerda, e o celular encosta no ícone de
   NFC da arte real.
   - Os anéis de sinal aparecem sobre esse ícone.
   - A tela abre a página de avaliação de demonstração.
   - No fim, o contorno verde destaca o QR Code.
   - As etapas acendem uma por vez, e o rótulo passa a "Demonstração · a tela do celular é
     ilustrativa".

**Elementos e limites da cena:**
- **Sombra e luz:** a sombra é um elemento separado e acompanha a placa, mais aberta e mais fraca
  quando a placa está longe. Uma luz difusa atrás dá contraste ao topo preto.
- **Giro:** fica em até ~10° no eixo vertical e ~4° no horizontal, porque a foto só registra a
  frente.
- **Rolagem:** a seção ganhou rolagem (300 → 360 svh) para os dois momentos.
- **Página Placas:** a mesma cena entra em "Como funciona" já com a placa em foco.

### Abertura de Placas

A foto recortada entra em CSS, sem depender de JavaScript: sobe 44 px com uma inclinação de 6° e
10° e a escala vai de 0,95 a 1, em 1,1 s. Com a rolagem, ela sobe um pouco e inclina até 8°, e a
sombra fica para trás. Entrada, deslocamento e sombra ficam em elementos separados.

### Alternativas

| Situação | O que aparece |
|---|---|
| Sem WebGL (ou até o primeiro quadro) | a mesma sequência em HTML: a foto em foco e, na demonstração, a placa vai para o lado e o celular entra (`03-…`, embaixo) |
| Celular, tablet e movimento reduzido | o produto (a foto, "Foto real da placa.") logo depois do texto e a demonstração (o celular) depois das etapas, em figuras separadas (`04-…`) |
| Movimento reduzido na abertura de Placas | foto parada, sem entrada nem deslocamento |

## Hover de cada ação

Tudo em `src/styles/controls.css`. Ver `05-estados-desktop.webp`, `06-toque-celular.webp` e
`08-preenchimento-do-botao.webp` (o preenchimento quadro a quadro, entrando e saindo).

| Controle | Repouso | Hover (ponteiro fino) | Pressionado (toque e clique) | Foco (teclado) |
|---|---|---|---|---|
| Botão principal | marfim compacto (grafite nos fundos claros) | a cor de destaque da seção preenche o botão da esquerda para a direita em 460 ms e, ao sair, recolhe pela direita. Fundo escuro: verde da marca. Fundo claro: verde profundo. Cases: a cor do projeto. O texto não muda de cor; rótulo, medida e posição não mudam | o tom escurece | contorno de 2 px afastado 3 px |
| Botão secundário (WhatsApp ao lado do principal) | contorno fino a 30% da cor do texto, sem preenchimento | contorno a 58% e preenchimento a 6%, na cor da seção | preenchimento a 11% | contorno de 2 px |
| Link de ação ("Ver soluções", "Ver o case") | texto e seta | sublinhado de 1 px que se revela da esquerda para a direita (240 ms) | sublinhado pleno | contorno de 2 px |
| Link dentro do texto | sublinhado a 38%, sempre visível | o sublinhado pleno se revela por cima | sublinhado pleno | contorno colado |
| Menu | texto a 64% | texto a 92% e o sublinhado que se revela | fundo a 11% | contorno de 2 px |
| Menu, página atual | texto pleno e o ponto verde, sem sublinhado | — | — | — |
| Abas | texto esmaecido | realce suave do fundo (6%); a linha da aba ativa continua visível | fundo a 11% | contorno interno |

**Regras gerais:**
- **Durações:** cor, fundo e borda em 200 ms; o preenchimento do botão principal em 460 ms, com
  entrada e saída suaves.
- **Ponteiro:** o hover só existe com ponteiro fino (`(hover: hover) and (pointer: fine)`). No
  toque, a resposta é a troca breve de tom ao pressionar, sem nada preso depois.
- **Movimento reduzido:** o preenchimento do botão aparece por esmaecimento, sem deslizar, e o
  sublinhado aparece de uma vez.
- **Botões principais:** todos usam o mesmo preenchimento, inclusive "Abrir no WhatsApp" no
  formulário de contato. Uma primeira versão reservava uma área verde para a seta no hover; ela
  foi trocada pelo preenchimento depois da revisão.
- **WhatsApp ao lado do principal:** em Placas, no encerramento da home e no menu do celular,
  virou botão secundário.

## Verificações

Rodadas no build de produção local, com o WhatsApp interceptado: nenhuma mensagem real foi
enviada.

| Verificação | Resultado |
|---|---|
| `tsc --noEmit`, `eslint src`, `next build` | sem erros; 21 rotas |
| Testes funcionais | 74 de 74 |
| Foco de teclado (9 rotas) | 177 elementos a 1920 px e 131 a 390 px, todos com contorno visível |
| Toque (iPhone 13, sem hover) | todos os controles respondem à pressão; nada fica preso; sem erros de página |
| Estouro horizontal (9 tamanhos, de 360 a 1920 px) | nenhum. A luz atrás da placa estourava a 360, 390, 768 e 1024 px; as duas seções agora cortam o excesso |
| Rolagem até o fim e de volta (1920 e 390) | sem erros; a abertura reaparece inteira |
| Cena da placa com GPU, sem WebGL e em movimento reduzido | ver `02`, `03` e `04` |

## Pendências e limites

- **Resolução:** as fotos recebidas têm 1152 × 1536, e os arquivos em Downloads são os mesmos. O
  recorte tem 398 px de lado e é exibido com até ~400 px. Em telas de alta densidade (2×) fica um
  pouco macio. Com o original do iPhone (3024 × 4032, enviado como "Tamanho real" ou por
  AirDrop), o recorte pode ser refeito com o mesmo script, em cerca de 1000 px.
- **QR das fotos:** ver a seção "Destino dos QR fotografados" acima.
- **Arte genérica:** a placa fotografada usa a chamada "Nós adoraríamos a sua avaliação no
  Google", e não a arte de um cliente. As legendas dizem só "Foto real da placa", e o texto
  sobre arte personalizada fica na seção "A placa é da sua empresa".
- **Medidas:** continuam não confirmadas e não aparecem no texto.
- **Fotos instaladas:** não há fotos da placa instalada em clientes.
