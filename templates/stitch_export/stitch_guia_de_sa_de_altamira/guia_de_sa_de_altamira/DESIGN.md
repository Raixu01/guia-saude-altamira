---
name: Guia de Saúde Altamira
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3e4947'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6e7977'
  outline-variant: '#bdc9c6'
  surface-tint: '#006a63'
  primary: '#005c55'
  on-primary: '#ffffff'
  primary-container: '#0f766e'
  on-primary-container: '#a3faef'
  inverse-primary: '#80d5cb'
  secondary: '#006d2f'
  on-secondary: '#ffffff'
  secondary-container: '#5dfd8a'
  on-secondary-container: '#007232'
  tertiary: '#734700'
  on-tertiary: '#ffffff'
  tertiary-container: '#945d00'
  on-tertiary-container: '#ffe6cc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9cf2e8'
  primary-fixed-dim: '#80d5cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#00504a'
  secondary-fixed: '#66ff8e'
  secondary-fixed-dim: '#3de273'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005322'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Outfit
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Outfit
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

O design system estabelece uma experiência mobile-first centrada na saúde comunitária, projetada especificamente para o contexto regional de Altamira (Pará). Seu propósito essencial é eliminar barreiras cognitivas, oferecendo acesso rápido, desmistificado e humanizado a postos de saúde, unidades de pronto atendimento, especialidades e contatos diretos.

### Personalidade da Marca
- **Acolhedora & Humana:** Transmite amparo, calor comunitário e segurança imediata em momentos de vulnerabilidade ou urgência.
- **Clara & TDAH-Friendly:** Reduz a sobrecarga sensorial através de blocos de informação escaneáveis, sem poluição visual, com microações explícitas e foco unívoco por tela.
- **Confiável & Resolutiva:** Garante transparência em relação ao status de cada serviço (verificado recentemente, em espera ou suspenso), priorizando contato via canais nativos populares como WhatsApp.

### Estilo Visual
A abordagem combina **Minimalismo Funcional** com toques suaves de **Tactile/Warm UI**:
- Superfícies predominantemente alvas e limpas sobre base neutra fresca (`#F8FAFC`).
- Destaques funcionais no tom esmeralda/azulado profundo (`#0F766E`), evocando a água e a vegetação amazônica com sobriedade clínica.
- Elementos táteis generosos, pensados para toque seguro em telas móveis sob sol intenso ou em trânsito.

## Colors

A paleta cromática foi estruturada para maximizar a legibilidade sob luz natural intensa e estabelecer uma hierarquia de atenção imediata sem sobrecarga sensorial.

### Papéis Cromáticos

- **Primária (`#0F766E` / Teal 700 balanceado com `#0D9488`):** Identidade institucional, cabeçalhos de seções críticas, links estruturais e estados ativos de navegação. Representa saúde, tranquilidade e autoridade médica comunitária.
- **Ação Imediata / Conexão Direta (`#25D366`):** Exclusiva para canais de conversa e acionamento instantâneo (ex.: "Conversar no WhatsApp", "Chamar Ambulância/SAMU"). Permite identificação instantânea mesmo por usuários com baixa literacia digital.
- **Confirmação Recente / Sucesso (`#10B981`):** Sinaliza postos abertos, dados atualizados nas últimas 24h e agendamentos confirmados.
- **Alerta / Não Confirmado (`#F59E0B`):** Destaca horários sujeitos a alteração, falta temporária de insumos ou informações pendentes de checagem comunitária.
- **Superfície & Fundo:**
  - Fundo Geral: `#F8FAFC` (Slate 50), fornecendo descanso ocular sem a frieza do branco absoluto.
  - Fundo de Cards & Modais: `#FFFFFF`, garantindo destaque de conteúdo em cartões de serviços.
- **Textos & Contraste:**
  - Título e Texto Primário: `#0F172A` (Slate 900), garantindo conformidade WCAG AAA de contraste.
  - Texto Secundário e Apoio: `#64748B` (Slate 500), ideal para legendas, metadados e endereços.
- **Divisores e Contornos:** `#E2E8F0` (Slate 200), delimitando contornos de cartões de forma suave e sem ruído óptico.

## Typography

A tipografia do sistema resolve o equilíbrio entre expressividade acolhedora e precisão funcional:

- **Títulos (`Outfit`):** Uma geometria humanista moderna e acolhedora, com terminação aberta e curvas generosas que eliminam a sensação de frieza hospitalar. Empregada com peso 600 e 700 para criar âncoras visuais nítidas para usuários com TDAH que realizam leitura dinâmica.
- **Corpo e Rótulos (`Plus Jakarta Sans`):** Tipografia de alta legibilidade em telas móveis, com x-height equilibrada e aberturas generosas que evitam confusão entre caracteres semelhantes em ambientes ensolarados.
- **Regras de Acessibilidade:**
  - Tamanho mínimo de fonte para informações de saúde críticas: 14px.
  - Entrelinha (line-height) sempre superior a 1.4x o tamanho do corpo da fonte para evitar saltos ou perda de linha na leitura contínua.
  - Ênfases e status não dependem apenas da cor; utilizam combinação de peso tipográfico (SemiBold/Bold) e ícones dedicados.

## Layout & Spacing

O layout foi formulado sob as diretrizes de ergonomia móvel e navegação em área de alcance com o polegar (thumb zone).

### Grade e Alinhamento
- **Grid Mobile:** Sistema flexível de 4 colunas em telas de até 599px, com margens laterais fixas de `1rem` (16px) e calhas (gutters) de `1rem` (16px).
- **Densidade Consciente (Anti-Sobrecarga):** Seções são delimitadas por respiros verticais generosos de `space-xl` (24px) a `32px`, agrupando conteúdos relacionados em cards isolados para evitar aglomeração de dados.
- **Alvos de Toque:**
  - Nenhum elemento acionável possui altura inferior a **52px**.
  - Espaçamento mínimo entre dois alvos interativos adjacentes: 12px.

## Elevation & Depth

A profundidade é tratada com delicadeza para manter o foco cognitivo no conteúdo, combinando planos de cor com elevação atmosférica.

### Níveis de Profundidade
1. **Nível 0 (Lona Base):** Fundo contínuo em `#F8FAFC`. Sem sombras nem elevação.
2. **Nível 1 (Cartões e Listas em Repouso):** Superfície `#FFFFFF` com contorno de `1px solid #E2E8F0` e sombra ambiente sutil: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`.
3. **Nível 2 (Cards Interativos & Filtros Ativos):** Sombra suave projetada com leve matiz slate: `0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
4. **Nível 3 (Barra de Ação Fixa & Modais de Urgência):** Sombra ascendente para barras flutuantes inferiores: `0 -4px 12px rgba(15, 23, 42, 0.08)`. Transmite solidez física sem criar ruído visual.

## Shapes

O sistema adota cantos curvados amigáveis de nível 2, reforçando a sensação de segurança, calor e acolhimento comunitário:

- **Botões e Campos de Entrada:** Raio exato de `14px`, proporcionando ergonomia tátil e visual moderno.
- **Cartões de Estabelecimentos e Guias:** Cantos arredondados com `16px` (`rounded-lg`), eliminando quinas agressivas.
- **Badges, Tags e Chips de Filtro:** Formato pílula completa (`9999px`) para rápida distinção entre tags contextuais e cartões clicáveis de navegação.

## Components

### 1. Botões de Ação
- **Botão Principal (Saúde / Navegação):** Fundo `#0F766E`, texto `#FFFFFF`, altura mínima de `52px`, raio de `14px`, fonte `Outfit` 16px peso 600.
- **Botão de Ação Imediata (WhatsApp / Emergência Comunitária):** Fundo `#25D366`, texto `#FFFFFF` ou `#0F172A`, ícone de canal à esquerda (20px), altura de `54px`, raio de `14px`. Feedback tátil de clique com leve compressão de escala (0.98x).
- **Botão Secundário:** Superfície transparente com contorno de `1.5px solid #0F766E`, texto `#0F766E`, altura de `52px`.

### 2. Cartões de Unidade de Saúde (Cards)
- Fundo `#FFFFFF`, raio de `16px`, borda de `1px solid #E2E8F0`, padding interno de `16px`.
- Cabeçalho com nome do posto/clínica em `Outfit` 18px Bold (`#0F172A`), badge de status à direita.
- Corpo com metadados claros: bairro, distância aproximada, horários e indicação de acessibilidade.
- Rodapé integrado com botão direto de contato e rota facilitada.

### 3. Chips de Status e Filtragem
- **Chip "Aberto Agora / Confirmado":** Fundo `#ECFDF5`, texto `#047857`, borda `#A7F3D0`, com ponto indicador circular verde de 6px.
- **Chip "Horário Sujeito a Alteração":** Fundo `#FFFBEB`, texto `#B45309`, borda `#FDE68A`.
- **Chips de Especialidade (Filtros de Busca):** Altura de `40px`, raio `9999px`, fundo neutro `#F1F5F9`, mudando para `#0F766E` com texto branco quando selecionado.

### 4. Campos de Busca e Entradas de Texto
- Altura de `52px`, raio de `14px`, fundo `#FFFFFF`, borda `#E2E8F0`.
- Ícone de busca à esquerda em `#64748B`.
- Botão "Limpar" à direita acessível em um toque para facilitar navegação rápida e sem atritos por usuários neurodivergentes.
- Estado de foco destacado com contorno de `2px solid #0F766E`.

### 5. Barra Inferior de Emergência & Apoio (Bottom Bar)
- Fixa na base com preenchimento para área segura do celular.
- Acesso de 1 toque aos números de emergência locais (SAMU 192, Bombeiros, Farmácia de Plantão) com contraste cromático absoluto.