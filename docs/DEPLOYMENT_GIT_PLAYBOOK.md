# Playbook de Deploy & Versionamento Git: Guia de Saúde Altamira (Pulso Saúde)

> **Versão**: 1.0.0  
> **Última Atualização**: 2026-10-02  
> **Status**: Marco 5 - Pronto para Publicação  

---

## 1. Visão Geral da Arquitetura de Publicação

```
┌────────────────────────────────────────┐
│  FRONTEND (React + Vite + Tailwind)    │  →  Hospedagem: Vercel (Gratuito)
│  • Conecta via API REST ao Backend     │  →  Domínio: https://guia-saude-altamira.vercel.app
└──────────────────┬─────────────────────┘
                   │
                   ▼
┌────────────────────────────────────────┐
│  BACKEND (Python + FastAPI + Uvicorn)  │  →  Hospedagem: Render (Gratuito)
│  • Endpoints /api com CORS configurado │  →  URL: https://guia-saude-api.onrender.com
└──────────────────┬─────────────────────┘
                   │
                   ▼
┌────────────────────────────────────────┐
│  BANCO DE DADOS (PostgreSQL / SQLite)  │  →  Supabase / Render PostgreSQL
│  • Especialidades, Médicos, Exames     │  →  Custo Zero Inicial (Camada Free)
└────────────────────────────────────────┘
```

---

## 2. Passo a Passo "Clique a Clique" de Publicação

### 🚀 Etapa A: Publicar o Backend no Render (API FastAPI)

1. Acesse o site do [Render](https://dashboard.render.com) e faça login com sua conta do **GitHub**.
2. No painel principal, clique no botão azul **"New +"** no canto superior direito e selecione **"Web Service"**.
3. Escolha a opção **"Build and deploy from a Git repository"** e clique em **Next**.
4. Conecte seu repositório `guia-saude-altamira` (ou selecione na lista).
5. Preencha os campos exatamente como abaixo:
   * **Name**: `pulso-saude-api` (ou nome de sua preferência).
   * **Region**: `Oregon (US West)` ou `Ohio (US East)`.
   * **Root Directory**: `backend` *(MUITO IMPORTANTE)*.
   * **Runtime**: `Python 3`.
   * **Build Command**: `pip install -r requirements.txt`.
   * **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
   * **Instance Type**: `Free`.
6. Na seção **"Environment Variables"** (Variáveis de Ambiente), adicione:
   * `ALLOWED_ORIGINS`: `*` *(ou a URL do frontend da Vercel após criar)*.
7. Clique em **"Deploy Web Service"** no final da página.
8. Quando o status mudar para **"Live"**, copie a URL gerada (exemplo: `https://pulso-saude-api.onrender.com`).

---

### 🌐 Etapa B: Publicar o Frontend no Vercel (Interface Web)

1. Acesse o site da [Vercel](https://vercel.com) e faça login com sua conta do **GitHub**.
2. Clique no botão **"Add New..."** e selecione **"Project"**.
3. Localize o repositório `guia-saude-altamira` e clique em **"Import"**.
4. Configure o projeto na tela:
   * **Project Name**: `guia-saude-altamira` (ou `pulso-saude-altamira`).
   * **Framework Preset**: `Vite` (identificado automaticamente).
   * **Root Directory**: Clique em *Edit* e selecione a pasta `frontend`.
5. Abra a seção **"Environment Variables"** e adicione:
   * **Name**: `VITE_API_URL`
   * **Value**: `https://pulso-saude-api.onrender.com/api` *(substitua pela URL real copiada no passo anterior)*.
6. Clique no botão azul **"Deploy"**.
7. Em cerca de 1 minuto, seu site estará no ar com link público e certificado HTTPS gratuito!

---

### 🗄️ Etapa C: Banco de Dados Supabase (Opcional para Produção)

1. Acesse o [Supabase](https://supabase.com) e crie um novo projeto gratuito.
2. Em **Project Settings > Database**, copie a `Connection string (URI)`.
3. No painel do Render (Backend), adicione a variável de ambiente:
   * `DATABASE_URL`: `sua_connection_string_do_supabase`
4. O backend já possui suporte automático via SQLAlchemy para alternar do SQLite local para o PostgreSQL do Supabase.

---

## 3. Guia de Versionamento Git & Boas Práticas

### Estratégia de Branches
* `main`: Branch principal de produção estável (o Vercel e Render atualizam automaticamente a cada commit nesta branch).
* `develop` ou `feature/nome`: Para testes ou novos desenvolvimentos antes de enviar para o ar.

### Padrão de Commits Semânticos
* `feat:` Nova funcionalidade para o usuário (ex: `feat: adiciona busca por bairros`).
* `fix:` Correção de bug ou erro de visual (ex: `fix: corrige alinhamento do modal`).
* `docs:` Atualizações em documentação (ex: `docs: atualiza playbook de deploy`).
* `refactor:` Melhorias internas de código sem alterar funcionamento.

---

## 4. Checklist de Lançamento (Go-to-Market)

- [x] Backend e rotas de especialidades, profissionais e exames testados e aprovados.
- [x] Frontend responsivo mobile-first testado em resolução de smartphone.
- [x] Botões de WhatsApp com mensagens pré-formatadas e números limpos.
- [x] Modal "Como Funciona o Guia" com aviso de limites e honestidade radical.
- [x] Canal de colaboração comunitária ("Atualize o Guia") funcional.
- [x] Arquivos de configuração de deploy (`vercel.json`, `requirements.txt`, `Procfile`) gerados.
