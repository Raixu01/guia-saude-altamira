# Business Model Canvas Sistêmico & Integrado: Guia de Saúde Altamira

> **Metodologia Sistêmica Sebrae Startups**: O Business Model Canvas não é uma colcha de retalhos isolada; é uma engrenagem viva com **auditoria cruzada obrigatória**.  
> **Regra Suprema**: Toda estratégia de relacionamento exige um canal; todo compromisso assumido em Proposta de Valor, Relacionamento, Canais e Sustentabilidade gera uma **Atividade Principal compulsória**; toda atividade demanda um **Recurso Principal**; e atividades/recursos que não fazemos internamente devem ser absorvidos por **Parcerias Estratégicas**.

---

## 1. Segmentos de Clientes
- **Perfil do Usuário Final (Cidadão de Altamira - Beachhead Market)**: Moradores de Altamira (18 a 65+ anos) e cuidadores familiares que buscam consultas e exames particulares ou de convênio na cidade.
- **Segmento B2B / Provedores de Saúde (Futuro/Sustentabilidade)**: Clínicas, consultórios e laboratórios de Altamira interessados em ter seus dados verificados com selo oficial de atualização, horário de atendimento e contatos em destaque.
- **Segmento Institucional / Governamental (Potencial de Expansão)**: Associações médicas, cooperativas de saúde ou prefeituras da região da Transamazônica que queiram estender a tecnologia para outros municípios.

---

## 2. Proposta de Valor (Importada do Canvas de Proposta de Valor)
*Conexão direta com [`docs/VALUE_PROPOSITION_CANVAS.md`](./VALUE_PROPOSITION_CANVAS.md):*

- **Oferta Central**: Guia público, mobile-first e honesto de consultas e exames em Altamira-PA, que transforma planilhas estáticas em navegação intuitiva em 3 toques, com conexão direta ao WhatsApp das clínicas.
- **Aliviadores de Dor Ativos**:
  - Eliminação da dispersão de dados em PDFs e grupos informais (**DOR-01**).
  - Indicação explícita de incertezas e contatos não confirmados (**DOR-02**).
  - Mapeamento claro de exames para estabelecimentos (**DOR-03**).
  - Zero atrito de autenticação (sem senhas/login) (**DOR-04**).
  - Honestidade radical: sem recomendações pagas disfarçadas ou diagnósticos (**DOR-05**).
- **Criadores de Ganho Ativos**:
  - Navegação visual por árvore sem esforço de digitação (**GANHO-01**).
  - Botão direto para WhatsApp com mensagem pré-formatada (**GANHO-02**).
  - Badges visuais de confirmação de cadastro (**GANHO-03**).
  - Canal ágil para sugerir correções de dados (**GANHO-04**).
  - Acesso 100% gratuito e leve para o morador (**GANHO-05**).
- **Diferencial Competitivo / Moat**:
  - Foco hiperlocal exclusivo em Altamira-PA.
  - Curadoria e validação de dados reais da cidade que nenhuma plataforma nacional possui.
  - Postura de transparência ética radical (preservar incertezas em vez de fingir cobertura perfeita).

---

## 3 & 4. Matriz Integrada: Relacionamento com o Cliente & Canais

| Momento da Jornada | Estratégia de Relacionamento | Canal(is) de Execução | Desdobramento em Atividade Principal |
|---|---|---|---|
| **Antes do Acesso (Descoberta & Atração)** | Disseminação boca a boca e compartilhamento comunitário | WhatsApp, Instagram local de Altamira, links de redes de saúde | Campanhas comunitárias e parcerias com influenciadores locais |
| **Antes do Acesso (Conscientização & Confiança)** | Explicação clara do propósito não-comercial e sem viés | Tela "Como Funciona o Guia" & Redes Sociais | Redação e manutenção dos termos de transparência |
| **Durante o Uso (Navegação & Conexão)** | Experiência fluida em árvore com 3 cliques até o WhatsApp | Web App responsiva (PWA) no navegador mobile | Desenvolvimento e manutenção contínua da interface web |
| **Durante o Uso (Transparência do Dado)** | Selos visuais claros de certeza do contato | Cards de profissional/exame no app | Rotina de classificação e revisão de status de contatos |
| **Após o Uso (Colaboração & Correção)** | Recebimento de alertas de números errados ou novos locais | Botão "Sugerir correção" no card (Form/WhatsApp) | Triagem periódica de sugestões da comunidade |
| **Após o Uso (Engajamento de Clínicas)** | Convite para clínicas validarem e atualizarem seus dados | WhatsApp comercial e e-mail institucional | Contato direto e verificação cadastral de clínicas |

---

## 5. Sustentabilidade & Modelo de Receita

- **Acesso ao Cidadão**: **100% Gratuito e Público** (sem barreiras de acesso para a população de Altamira).
- **Sustentabilidade Operacional (Fases de Monetização)**:
  - *Fase 1 (MVP de Validação)*: Custo zero de infraestrutura (camada gratuita do Supabase, Vercel e Render/Railway).
  - *Fase 2 (Selo de Clínica Verificada - B2B)*: Plano opcional para clínicas/laboratórios com selo "Verificado com a Administração da Clínica", link direto para redes sociais e fotos do espaço físico (R$ 39 a R$ 69/mês por clínica).
  - *Fase 3 (Licenciamento Municipal / Regional)*: Versões personalizadas do Guia para cidades vizinhas da Transamazônica (Medicilândia, Brasil Novo, Uruará, Vitória do Xingu).

---

## 6. Atividades Principais (Motor Operacional — Auditoria Compulsória)

1. **Gestão e Higienização da Base de Dados**: Ingestão de dados de planilhas CSV/Excel no Supabase, normalização de nomes, CRM, especialidades e exames.
2. **Desenvolvimento e Manutenção da Plataforma**: Manutenção da interface web Next.js/React e APIs FastAPI para busca rápida e consumo de dados.
3. **Curadoria e Moderação de Contatos**: Avaliação de relatos de números incorretos recebidos via botão de colaboração e atualização do status de verificação.
4. **Comunicação e Engajamento Comunitário**: Divulgação do link do Guia em canais da cidade e atendimento a clínicas parceiras.

---

## 7. Recursos Principais

- **Tecnológicos**: Banco de dados relacional Supabase (PostgreSQL), API em Python FastAPI, hospedagem frontend edge (Vercel) e domínio amigável.
- **Dados & Conteúdo**: Planilhas locais de especialidades, profissionais registrados, exames e estabelecimentos de saúde de Altamira.
- **Humanos**: Responsável pela curadoria/atualização dos dados e moderação de correções.

---

## 8. Parcerias Estratégicas

- **Clínicas, Consultórios e Laboratórios de Altamira**: Parceiros fundamentais para validar se contatos e horários estão corretos.
- **Canais de Mídia e Páginas Locais de Altamira**: Divulgação voluntária do guia para utilidade pública da população.
- **Provedores de Nuvem e Ferramentas**: Supabase (banco de dados), Vercel (distribuição CDN web), GitHub (código e esteira CI/CD).

---

## 9. Estrutura de Custos

| Item de Custo | Categoria | Estimativa Mensal (Fase MVP) | Estimativa (Escala 5k usuários/mês) |
|---|---|---|---|
| **Hospedagem Frontend (Vercel)** | Infraestrutura | R$ 0,00 (Free Tier) | R$ 0,00 a R$ 100,00 |
| **Banco de Dados (Supabase)** | Infraestrutura | R$ 0,00 (Free Tier) | R$ 0,00 a R$ 130,00 |
| **API Backend (Python/FastAPI)** | Servidor | R$ 0,00 (Hobby/Free Tier) | R$ 35,00 a R$ 50,00 |
| **Domínio Próprio (.com.br)** | Identidade | R$ 3,33/mês (R$ 40/ano) | R$ 3,33/mês |
| **Curadoria & Moderação** | Operacional | Orgânico / Criador | Parcial / Colaborativo |
| **TOTAL ESTIMADO** | — | **~R$ 3,33 / mês** | **~R$ 180,00 / mês** |
