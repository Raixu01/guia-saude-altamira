# Tech Stack & Arquitetura Técnica: Guia de Saúde Altamira

> **Versão**: 1.0.0  
> **Status**: Aprovado  
> **Última Atualização**: 2026-09-28  

---

## 1. Visão Geral da Arquitetura Desacoplada

O **Guia de Saúde Altamira** adota uma arquitetura limpa, modular e desacoplada entre **Front-end** e **Back-end**, com banco relacional na nuvem para suportar tanto o consumo rápido pelo usuário mobile quanto a ingestão automatizada de planilhas.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   FRONT-END (Apresentação Mobile-First)                │
│       React / Next.js / HTML5 + Tailwind CSS + Lucide Icons            │
│       - Consumo direto de API REST / Supabase client                   │
│       - Interface em árvore amigável a TDAH e conexões móveis locais   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Requisições HTTPS (REST JSON)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               BACK-END PRIORITÁRIO (Ingestão & APIs Core)              │
│               Python 3.12+ com FastAPI, Pydantic e Uvicorn             │
│       - Script de ingestão de planilhas (CSV/Excel para Postgres)      │
│       - Endpoints públicos de especialidades, exames e contatos        │
│       - Endpoint de sugestão de correções cidadãs                      │
│       - Documentação interativa automática em /docs (Swagger)          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   BANCO DE DADOS & ARMAZENAMENTO                       │
│                   Supabase (PostgreSQL 15+)                            │
│       - Tabelas normalizadas: especialidades, profissionais,           │
│         estabelecimentos, exames e relacionamentos N:N                 │
│       - Políticas de leitura pública (Row Level Security / RLS)        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Camadas da Stack Tecnológica

| Camada | Tecnologia Escolhida | Versão | Justificativa Técnica |
|---|---|---|---|
| **Front-end (`frontend/`)** | React / Next.js + Tailwind CSS | React 18+ / Next 14+ | Renderização estática ultra-veloz, excelente para PWA mobile no interior do Pará |
| **Back-end (`backend/`)** | **Python (FastAPI + Pydantic)** | Python 3.12+ | **Padrão Prioritário do AGENTS.md**: Tipagem forte, documentação OpenAPI automática em `/docs` e script de ingestão de planilhas |
| **Banco de Dados** | Supabase (PostgreSQL) | Postgres 15 | Banco relacional robusto, suporte nativo a API REST, painel visual para gerenciar dados e camada gratuita generosa |
| **Ingestão de Dados** | Python (`pandas` / `openpyxl` / `httpx`) | Script CLI | Converte planilhas brutas em registros normalizados e auditáveis no Supabase |
| **Ícones & UI** | Lucide Icons / Heroicons | Latest | Ícones vetoriais leves para medicina, estetoscópio, microscópio, telefone e WhatsApp |
| **Deploy & Hospedagem** | Vercel (Front) + Render/Railway (Back) | Cloud | Deploy contínuo integrado ao GitHub com custo zero na fase de MVP |

---

## 3. Modelagem de Dados Relacional (PostgreSQL / Supabase)

### Tabela `especialidades`
- `id` (UUID, Primary Key)
- `nome` (VARCHAR, ex: "Cardiologia")
- `descricao` (TEXT, opcional)
- `icone` (VARCHAR, nome do ícone)
- `ordem` (INT)

### Tabela `estabelecimentos` (Clínicas, Hospitais e Laboratórios)
- `id` (UUID, Primary Key)
- `nome` (VARCHAR, ex: "Clínica Vida")
- `tipo` (VARCHAR: `clinica`, `laboratorio`, `hospital`)
- `endereco` (TEXT)
- `bairro` (VARCHAR)
- `cidade` (VARCHAR, default 'Altamira')
- `telefone_fixo` (VARCHAR, opcional)
- `whatsapp` (VARCHAR)
- `status_verificacao` (VARCHAR: `verificado`, `informado_planilha`)
- `data_ultima_verificacao` (TIMESTAMP)

### Tabela `profissionais`
- `id` (UUID, Primary Key)
- `nome` (VARCHAR, ex: "Dr. João Silva")
- `registro_conselho` (VARCHAR, ex: "CRM-PA 12345")
- `especialidade_id` (UUID, FK -> `especialidades.id`)
- `status_verificacao` (VARCHAR: `verificado`, `informado_planilha`)
- `ativo` (BOOLEAN, default true)

### Tabela `profissionais_estabelecimentos` (Relacionamento N:N)
- `profissional_id` (UUID, FK)
- `estabelecimento_id` (UUID, FK)
- `dias_atendimento` (VARCHAR, opcional)
- `observacoes` (TEXT, opcional)

### Tabela `exames`
- `id` (UUID, Primary Key)
- `nome` (VARCHAR, ex: "Ecocardiograma Transtorácico")
- `categoria` (VARCHAR: `sangue`, `imagem`, `cardiologico`, etc.)
- `letra_inicial` (CHAR(1), ex: 'E')
- `preparo_basico` (TEXT, aviso genérico de confirmação)

### Tabela `estabelecimentos_exames` (Relacionamento N:N)
- `estabelecimento_id` (UUID, FK)
- `exame_id` (UUID, FK)
- `status_confirmacao` (VARCHAR: `confirmado`, `a_confirmar`)

### Tabela `sugestoes_correcao` (Colaboração Cidadã)
- `id` (UUID, Primary Key)
- `tipo_entidade` (VARCHAR: `profissional`, `estabelecimento`, `exame`)
- `entidade_id` (UUID, opcional)
- `mensagem` (TEXT)
- `contato_colaborador` (VARCHAR, opcional)
- `status` (VARCHAR: `pendente`, `analisado`, `incorporado`)
- `created_at` (TIMESTAMP)

---

## 4. Matriz de Provisionamento Ativo de Ferramental

| Ferramenta | Status no Ambiente | Comando de Diagnóstico | Ação se Ausente |
|---|---|---|---|
| **Git** | ✅ Instalado | `git --version` | `winget install --id Git.Git -e --silent` |
| **GitHub CLI (`gh`)** | ✅ Autenticado | `gh auth status` | `winget install --id GitHub.cli -e --silent` |
| **Python 3.12+** | ✅ Instalado | `python --version` | `winget install --id Python.Python.3.12 -e --silent` |
| **Gerenciador `uv`** | A Verificar | `uv --version` | Instalação via PowerShell script oficial |
| **Node.js / npm** | A Verificar | `node -v` | `winget install --id OpenJS.NodeJS.LTS -e --silent` |
