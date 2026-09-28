# Canvas da Proposta de Valor: Guia de Saúde Altamira

> **Metodologia**: Value Proposition Canvas (Alexander Osterwalder) com Amarração Biunívoca Estrita 1:1.  
> **Regra de Ouro**: Nenhuma dor do cliente fica sem um aliviador correspondente no produto, e nenhum ganho desejado fica sem um mecanismo criador. Nenhuma feature é inventada sem lastro em uma dor ou ganho.

---

## 1. O Perfil do Cliente (Lado Direito)

### 1.1 Tarefas do Cliente (Customer Jobs)
*O que o morador de Altamira está tentando realizar quando busca cuidados médicos?*
- **Tarefas Funcionais**:
  - Encontrar um médico de uma especialidade específica em Altamira.
  - Descobrir em qual laboratório ou clínica determinado exame prescrito pode ser feito.
  - Obter o número de WhatsApp ou telefone correto para tirar dúvidas e agendar.
  - Saber o endereço físico onde o profissional atende.
- **Tarefas Emocionais**:
  - Sentir segurança de que não está perdendo tempo com informações falsas ou desatualizadas.
  - Reduzir a ansiedade e o desamparo diante de um problema de saúde na família.
- **Tarefas Sociais**:
  - Prover cuidado rápido para seus dependentes (pais, filhos, parentes).
  - Compartilhar com conhecidos onde encontrar atendimento confiável.

### 1.2 Dores Concretas do Cliente (Customer Pains)

| ID | Dor / Fricção Concreta | Intensidade | Custo Prático da Dor (Tempo, R$, Estresse) |
|---|---|---|---|
| **DOR-01** | Informações de saúde fragmentadas em PDFs desatualizados e grupos de WhatsApp informais | Alta | Perda de 1 a 3 dias tentando descobrir quem atende a especialidade |
| **DOR-02** | Telefones que não atendem, números que mudaram ou clínicas que já fecharam | Alta | Deslocamento inútil no calor de Altamira e frustração profunda |
| **DOR-03** | Falta de clareza sobre onde fazer exames específicos (ex: mamografia, ecocardiograma) | Alta | Atraso no diagnóstico de doenças graves e exames não realizados |
| **DOR-04** | Plataformas complexas que exigem cadastro, login, senhas ou prometem agendamento falso | Média | Abandono do uso por idosos ou pessoas com baixa instrução digital |
| **DOR-05** | Sensação de desconfiança por falta de transparência sobre quem patrocina ou recomenda médicos | Média | Dúvida se a indicação é legítima ou se é propaganda paga |

### 1.3 Ganhos Desejados pelo Cliente (Customer Gains)

| ID | Ganho Desejado | Relevância | Critério de Sucesso do Cliente |
|---|---|---|---|
| **GANHO-01** | Navegação rápida no celular sem precisar digitar nada (mobile-first guiado) | Essencial | Chegar ao profissional/exame em menos de 10 segundos com 3 toques |
| **GANHO-02** | Botão direto para iniciar conversa no WhatsApp ou ligar imediatamente | Essencial | Conversa aberta no WhatsApp com o nome do profissional já contextualizado |
| **GANHO-03** | Transparência honesta sobre a certeza do dado (saber se o telefone foi verificado) | Essencial | Selo claro identificando contatos verificados vs. dados da planilha |
| **GANHO-04** | Canal simples para avisar sobre dados desatualizados ou sugerir novos locais | Desejado | Formulário de 1 clique ou link de WhatsApp para reportar correções |
| **GANHO-05** | Acesso 100% público e gratuito, sem necessidade de login ou download de aplicativo | Essencial | Abrir direto no navegador por link compartilhado sem barreiras |

---

## 2. O Mapa de Valor do Produto (Lado Esquerdo)

### 2.1 Produtos & Serviços
- **Aplicação Web Pública Guia de Saúde Altamira (PWA/Mobile-First)**: Catálogo acessível pelo navegador sem cadastro prévio.
- **Módulo de Consultas**: Navegação estruturada por especialidades médicas e lista de profissionais com CRM e locais de atendimento.
- **Módulo de Exames**: Índice alfabético (A-Z) com busca rápida e mapeamento dos estabelecimentos que realizam cada procedimento.
- **Módulo de Transparência e Incertezas**: Selos de verificação e tela informativa sobre a origem pública/suplementar dos dados.
- **Módulo Colaborativo Cidadão**: Botão "Sugerir correção" em cada card.

### 2.2 Aliviadores de Dor (Pain Relievers)
- **ALIV-01** (elimina **DOR-01**): Centralização limpa das especialidades e profissionais da cidade em uma árvore única e intuitiva.
- **ALIV-02** (elimina **DOR-02**): Selo de confiabilidade do contato ("Confirmado recentemente" vs "Informado na planilha / Não confirmado") e botão com link direto testado.
- **ALIV-03** (elimina **DOR-03**): Catálogo alfabético dedicado de exames associando diretamente exames às clínicas/laboratórios que os executam.
- **ALIV-04** (elimina **DOR-04**): Interface sem login, sem formulários, baseada em botões visuais diretos (amigável a TDAH e idosos).
- **ALIV-05** (elimina **DOR-05**): Política de honestidade radical: o Guia declara explicitamente que não recomenda, não ranqueia e não privilegia ninguém.

### 2.3 Criadores de Ganho (Gain Creators)
- **CRIA-01** (entrega **GANHO-01**): Menu inicial binário claro: `[ 🩺 Consulta ]` ou `[ 🔬 Exames ]` com carregamento instantâneo.
- **CRIA-02** (entrega **GANHO-02**): Botão `[ Falar no WhatsApp ]` com mensagem inicial pré-formatada ("Olá, vi no Guia de Saúde de Altamira e gostaria de informações sobre...").
- **CRIA-03** (entrega **GANHO-03**): Tag visual colorida com ícone no card: Verde para verificado e Âmbar para pendente de confirmação.
- **CRIA-04** (entrega **GANHO-04**): Botão discreto `[ Sugerir alteração ]` que envia o ID do registro e a sugestão sem burocracia.
- **CRIA-05** (entrega **GANHO-05**): Web App universal leve (menos de 500KB) que roda em qualquer navegador moderno de smartphone.

---

## 3. Matriz de Fit Problema-Solução (Auditoria Estrita 1:1)

### 3.1 Tabela de Amarração de Dores (Dores vs. Aliviadores)

| ID Dor | Dor Concreta do Cliente | Aliviador Específico no Produto | Funcionalidade Correspondente no PRD |
|---|---|---|---|
| **DOR-01** | Dados fragmentados em PDFs e grupos | **ALIV-01**: Catálogo estruturado por especialidades e exames | `RF-01`: Navegação por Especialidades & Exames |
| **DOR-02** | Telefones errados e clínicas fechadas | **ALIV-02**: Selo de status do contato e aviso de confirmação direta | `RF-02`: Exibição de Contatos com Status de Incerteza |
| **DOR-03** | Falta de informação sobre exames | **ALIV-03**: Índice alfabético A-Z de exames mapeados para laboratórios | `RF-03`: Catálogo Alfabético de Exames & Locais |
| **DOR-04** | Apps complexos que exigem login | **ALIV-04**: Acesso 100% livre sem login ou senhas | `RF-04`: Interface Pública Zero-Auth & Mobile-First |
| **DOR-05** | Desconfiança sobre patrocínios | **ALIV-05**: Transparência radical sem ranking ou recomendações | `RF-05`: Tela "Como Funciona o Guia" & Isenção |

### 3.2 Tabela de Amarração de Ganhos (Ganhos vs. Criadores)

| ID Ganho | Ganho Desejado pelo Cliente | Criador Específico no Produto | Funcionalidade Correspondente no PRD |
|---|---|---|---|
| **GANHO-01** | Navegação rápida sem precisar digitar | **CRIA-01**: Seleção em árvore com botões de toque largo | `RF-01`: Menu Binário e Navegação Visual |
| **GANHO-02** | Botão direto para WhatsApp/Ligação | **CRIA-02**: Ação de contato com 1 clique (deep link WhatsApp) | `RF-02`: Ação de Contato Direto (WhatsApp / Tel) |
| **GANHO-03** | Transparência honesta sobre status | **CRIA-03**: Badges visuais de confirmação de cadastro | `RF-02`: Badges de Verificação de Dados |
| **GANHO-04** | Canal para sugerir correções | **CRIA-04**: Botão de reporte em cada card | `RF-06`: Canal de Sugestão e Colaboração Cidadã |
| **GANHO-05** | Gratuito e rápido no navegador | **CRIA-05**: PWA leve otimizada para internet móvel | `RNF-01`: Performance e Carregamento Rápido |
