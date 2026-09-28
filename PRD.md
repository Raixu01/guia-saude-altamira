# PRD — Product Requirements Document: Guia de Saúde Altamira

> **Status**: Aprovado  
> **Versão**: 1.0.0  
> **Autor/Responsável**: Operador / Agente de IA  
> **Última Atualização**: 2026-09-28  

---

## 1. Visão do Produto & Resumo Executivo

O **Guia de Saúde Altamira** é uma aplicação web mobile-first de utilidade pública que organiza as informações dispersas sobre profissionais médicos, especialidades e locais de exames no município de Altamira-PA.

Inspirado pelo princípio da **honestidade radical**, o Guia transforma planilhas estáticas e contatos soltos em uma árvore de navegação com 3 níveis de profundidade, permitindo ao cidadão encontrar o contato direto (WhatsApp ou telefone) da clínica ou do médico em menos de 10 segundos, sem necessidade de digitação prévia e sem promessas ilusórias de agendamento automático.

- **Oportunidade**: Ausência de um diretório centralizado, confiável e adaptado à realidade local de Altamira para localização de médicos particulares e exames de laboratório.
- **Proposta Central de Valor**: Navegação intuitiva em árvore (Consulta vs. Exames), exibição clara do nível de certeza dos dados e conexão direta com os prestadores locais.

---

## 2. Personas & Jornada do Usuário

### Persona Principal: Cidadão / Cuidador em Altamira
- **Nome**: Dona Maria ou Seu João (morador de Altamira-PA).
- **Dores Principais**:
  - Dificuldade para saber quais médicos atendem na cidade e em quais clínicas.
  - Perda de tempo ligando para números errados ou desatualizados.
  - Incerteza sobre onde realizar exames específicos prescritos.
- **Objetivos**: Descobrir o número correto do WhatsApp da clínica ou do consultório para marcar a consulta ou tirar dúvidas de preço e disponibilidade.
- **Gatilho de Uso**: Consulta prescrita, mal-estar familiar ou necessidade de marcar exames com urgência.

### Jornada do Usuário ("Happy Path")

```
[Início]
   │
   ├─► Opção A: [ 🩺 Consulta ]
   │      │
   │      └─► Lista de Especialidades (ex: Pediatria, Ortopedia)
   │             │
   │             └─► Lista de Profissionais
   │                    │
   │                    └─► Card com Clínica, CRM, Status de Confirmação
   │                           │
   │                           └─► Botão [ WhatsApp ] / [ Ligar ]
   │
   ├─► Opção B: [ 🔬 Exames ]
   │      │
   │      └─► Lista Alfabética A-Z (ex: E -> Ecocardiograma)
   │             │
   │             └─► Clínicas e Laboratórios que realizam o exame
   │                    │
   │                    └─► Aviso de Confirmação Prévia + Botão de Contato
   │
   └─► Opção C: [ ℹ️ Como Funciona o Guia? ]
          │
          └─► Transparência radical: fontes dos dados, isenções legais e limites
```

---

## 3. Requisitos Funcionais (Escopo do Produto)

| ID | Módulo / Funcionalidade | Descrição & Regras de Negócio | Prioridade (MoSCoW) | Tier IA |
|---|---|---|---|---|
| `RF-01` | **Tela Inicial Binária** | Exibição de cabeçalho limpo com saudação acolhedora e 3 opções de toque: `[ 🩺 Consulta ]`, `[ 🔬 Exames ]` e link discreto para `[ Como funciona o Guia? ]`. Inclui lupa retrátil no topo para busca livre opcional. | Must Have | Tier 2 |
| `RF-02` | **Navegação de Consultas por Especialidade** | Apresenta a grade/lista de especialidades disponíveis. Ao selecionar uma especialidade, exibe todos os profissionais vinculados, com nome, CRM, clínicas onde atende e status do dado. | Must Have | Tier 2 |
| `RF-03` | **Card de Profissional & Ação de Contato** | Exibe detalhes do profissional: nome completo, especialidade, registro de classe (CRM), clínicas/endereço de atendimento, badges de confirmação e botão direto de WhatsApp com mensagem pré-configurada ou discador telefônico. | Must Have | Tier 2 |
| `RF-04` | **Navegação de Exames por Índice Alfabético** | Lista alfabética (A-Z) com seletor de letras e filtro rápido. Ao selecionar o exame, lista todos os estabelecimentos credenciados/mapeados que realizam o exame na cidade. | Must Have | Tier 2 |
| `RF-05` | **Selo Visual de Incerteza & Confiabilidade** | Todo contato exibe um selo explícito: Verde (`Confirmado recentemente com o local`) ou Âmbar (`Informado na planilha / Não confirmado`). O card de exame contém aviso: *"Confirme valores, preparo e disponibilidade diretamente com o local"*. | Must Have | Tier 2 |
| `RF-06` | **Canal de Colaboração & Correção Cidadã** | Botão discreto `[ Sugerir alteração ou novo dado ]` em cada card, permitindo ao usuário ou clínica enviar apontamento de telefone mudado, novo médico ou exame. | Must Have | Tier 2 |
| `RF-07` | **Tela de Transparência & Limites Legais** | Página/modal dedicada explicando que o Guia não faz agendamentos, não recebe dinheiro de consultas, não faz diagnóstico e não ranqueia médicos por patrocínio. | Must Have | Tier 2 |
| `RF-08` | **Busca Opcional Retrátil (Lupa)** | Campo de busca acionado por ícone de lupa discreto que filtra instantaneamente por nome do profissional, clínica, especialidade ou exame sem poluir o visual principal. | Should Have | Tier 2 |

---

## 4. Requisitos Não-Funcionais & Diretrizes de Engenharia

- **`RNF-01` (Performance Mobile Extrema)**: Carregamento inicial em menos de 1,5 segundos em redes móveis (3G/4G locais do Pará). Bundle otimizado.
- **`RNF-02` (Zero Fricção de Acesso)**: Aplicação 100% utilizável sem exigência de login, cadastro, cookies invasivos ou instalação obrigatória de aplicativo de loja.
- **`RNF-03` (Design & Acessibilidade TDAH-Friendly)**:
  - Alto contraste visual, tipografia sem serifa legível (Inter/Outfit).
  - Espaçamento generoso entre botões para toque confortável em telas de celular.
  - Zero sobrecarga de texto denso; blocos modulares e diretos.
- **`RNF-04` (Segurança & LGPD)**: Nenhum dado confidencial de pacientes é coletado ou armazenado. Apenas dados de contato de estabelecimentos públicos ou comerciais de saúde.
- **`RNF-05` (Conformidade com AGENTS.md)**: Desenvolvimento modular desacoplado, com backend prioritário em Python (FastAPI) e interface responsiva espelhada nas diretrizes de UI/UX.

---

## 5. Catálogo de Telemetria & Eventos de Uso (`analytics.json`)

| Nome do Evento | Gatilho de Disparo | Propriedades Registradas | Objetivo de Negócio |
|---|---|---|---|
| `app_opened` | Abertura da aplicação web | `timestamp`, `user_agent_platform` | Medir acessos e tráfego |
| `category_selected` | Clique em "Consulta" ou "Exames" | `category` (`consulta` ou `exames`) | Medir interesse por tipo de serviço |
| `specialty_viewed` | Visualização de uma especialidade médica | `specialty_name` | Mapear demandas de saúde na cidade |
| `exam_viewed` | Visualização de um exame da lista | `exam_name` | Mapear carência de exames diagnósticos |
| `contact_clicked` | Clique no botão de WhatsApp ou Ligar | `provider_id`, `provider_type`, `status_verificacao` | Medir conversão de ajuda real gerada |
| `correction_suggested` | Envio de formulário de sugestão de correção | `item_id`, `issue_type` | Medir engajamento da comunidade |

---

## 6. Critérios de Aceite para Entrega (Marco 1 Concluído)
- [x] Narrativa de produto e proposta de valor amarrada 1:1.
- [x] PRD aprovado com requisitos funcionais e não-funcionais definidos.
- [x] Especificação de arquitetura técnica com Supabase e FastAPI (`TECH_STACK.md`).
- [x] Modelo de sustentabilidade e custos estruturado (`FINANCIAL_MODEL.md`).
- [x] `tasks.json` atualizado com todas as tarefas dos 5 marcos.
