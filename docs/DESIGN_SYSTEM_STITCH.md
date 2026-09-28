# Design System & Especificação UI/UX: Guia de Saúde Altamira

> **Objetivo**: Especificar a identidade visual, design tokens, componentes modulares e prompts prontos para prototipagem no **Google Stitch** e geração de telas visuais no **ChatGPT / DALL-E 3**.  
> **Status**: Aprovado (Marco 2)  
> **Versão**: 1.0.0  
> **Última Atualização**: 2026-09-28  

---

## 1. Identidade Visual & Design Tokens

A proposta visual une **acolhimento comunitário**, **clareza extrema** e **alta legibilidade** para uso rápido no celular sob o calor e a rotina de Altamira-PA.

### Paleta de Cores (Acolhedora & TDAH-Friendly)
- **Fundo da Aplicação (Light Mode Acolhedor)**: `#F8FAFC` (Slate 50) e `#FFFFFF` (Card branco puro para contraste limpo).
- **Cor Primária (Saúde & Ação)**: `#0D9488` (Teal 600 - Verde Esmeralda/Azulado) — transmite confiança, serenidade e saúde pública.
- **Cor de Destaque / Ação Imediata**: `#25D366` (Verde WhatsApp) — reconhecimento cognitivo imediato para o botão de contato.
- **Cor de Alerta / Incerteza**: `#F59E0B` (Âmbar 500) — usado no selo *"Informado na planilha / Não confirmado"*.
- **Cor de Confirmação**: `#10B981` (Esmeralda 500) — usado no selo *"Confirmado recentemente com o local"*.
- **Texto Principal**: `#0F172A` (Slate 900) — legibilidade máxima sem preto agressivo.
- **Texto Secundário / Apoio**: `#64748B` (Slate 500) — para endereços e orientações auxiliares.
- **Bordas & Divisores**: `#E2E8F0` (Slate 200) — divisões suaves e sem poluição.

### Tipografia & Hierarquia
- **Fonte Principal**: `Inter` ou `Outfit` (sans-serif moderna, geométrica e extremamente legível).
- **Tamanhos e Pesos**:
  - Títulos de Seção: `20px / Bold (700)`.
  - Nomes de Médicos / Exames: `17px / Semi-Bold (600)`.
  - Textos de Apoio / CRM / Clínicas: `14px / Regular (400)`.
  - Badges e Selos: `12px / Medium (500)` com cantos arredondados.
- **Áreas de Toque (Mobile)**: Botões primários com altura mínima de `52px` e cantos arredondados de `14px`, garantindo toque sem erro no polegar.

---

## 2. Mapa das 4 Telas do MVP

1. **Tela 1 (`SCREEN-01`): Início Binário & Acolhedor**
   - Cabeçalho limpo com saudação: *"Guia de Saúde Altamira — O que você precisa hoje?"*.
   - Dois botões gigantes e contrastantes em destaque vertical:
     - `[ 🩺 Consulta Médica ]` (Encontrar por especialidade)
     - `[ 🔬 Exames & Laboratórios ]` (Buscar por ordem alfabética A-Z)
   - Lupa retrátil discreta no topo para pesquisa livre opcional.
   - Link de rodapé: *"ℹ️ Como funciona o Guia? (Nossa transparência)"*.

2. **Tela 2 (`SCREEN-02`): Especialidades & Card do Profissional**
   - Grade limpa de especialidades médicas (Cardiologia, Pediatria, Ortopedia, Ginecologia, etc.).
   - Card do médico ao clicar na especialidade:
     - Nome completo do profissional + CRM/PA.
     - Clínicas onde atende + bairro / ponto de referência.
     - **Selo de Certeza**: Verde (*"Confirmado"* com data) ou Âmbar (*"Dado de planilha"*).
     - Botão verde grande: `[ Conversar no WhatsApp ]` e botão secundário `[ Ligar ]`.
     - Link discreto: *"Sugerir correção ou novo número"*.

3. **Tela 3 (`SCREEN-03`): Lista de Exames A-Z & Laboratórios**
   - Seletor de letras alfabéticas A-Z deslizável no topo.
   - Lista de exames (ex: *Ecocardiograma*, *Endoscopia*, *Ressonância*, *Hemograma*).
   - Card do exame expandido:
     - Clínicas e laboratórios que realizam em Altamira.
     - **Aviso de Honestidade Radical**: *"⚠️ Valores, preparo e agendamento devem ser confirmados diretamente com a clínica."*
     - Botão de WhatsApp direto da clínica.

4. **Tela 4 (`SCREEN-04`): Transparência Radical & Como Funciona**
   - Explicação clara dos 4 compromissos com o cidadão:
     - 1. Gratuito para a população.
     - 2. Sem promessas falsas de agendamento automático pelo app.
     - 3. Transparência na origem dos dados (planilhas públicas + checagem ativa).
     - 4. Correção comunitária contínua.

---

## 3. Prompts Estruturados para Geração de Imagens das Telas via ChatGPT (DALL-E 3)

Estes prompts foram desenvolvidos especificamente para que o ChatGPT gere **mockups visuais de alta fidelidade** das telas em um smartphone moderno (iPhone/Android), com interface em português e design limpo.

---

### Prompt 1 — Tela Inicial Binária (Home)
```text
A realistic, high-resolution mobile UI/UX design mockup of a smartphone displaying the clean home screen of a community health app called "Guia de Saúde Altamira". 
The screen has a clean white and soft slate-gray background (#F8FAFC) with modern typography in Portuguese. 
At the top, a warm header says "Guia de Saúde Altamira" with a subtle subtitle "O que você precisa encontrar hoje em Altamira-PA?" and a minimal search icon (magnifying glass) in the upper corner.
In the center of the screen, there are two large, prominent, friendly touch-friendly cards stacked vertically:
1. First card has a deep teal/emerald background (#0D9488) with white bold text: "🩺 Consultas Médicas" and subtitle "Encontre médicos por especialidade".
2. Second card has a crisp white surface with teal border and dark slate text: "🔬 Exames e Laboratórios" and subtitle "Consulte clínicas e locais de exame de A a Z".
At the bottom, a discreet link says "ℹ️ Como funciona o Guia? Transparência e dados locais".
Modern mobile app interface, clean aesthetic, generous whitespace, zero clutter, accessible design, Figma style presentation on a sleek smartphone.
```

---

### Prompt 2 — Tela de Consultas & Card do Médico com WhatsApp
```text
A realistic, high-resolution mobile UI/UX design mockup of a smartphone displaying the doctor directory screen of "Guia de Saúde Altamira".
The screen shows a top navigation bar with a back button and the title "Cardiologia (Altamira-PA)".
Below, there are clean, high-contrast doctor profile cards with modern spacing:
The main featured card displays:
- Doctor name in bold slate text: "Dr. Carlos Eduardo Meireles - Cardiologista (CRM-PA 8421)"
- Clinic name and location: "Clínica Vida & Saúde • Av. Djalma Dutra, Centro"
- Verification status badge: A soft green pill badge with a checkmark saying "✓ Confirmado com o local em Set/2026"
- Action button: A prominent bright green WhatsApp button (#25D366) with a WhatsApp icon and bold white text saying "Conversar no WhatsApp"
- A secondary phone call button with icon.
- A tiny subtle text at the card footer: "Sugerir correção ou novo número".
Modern mobile health app, clean UI, white cards on soft background, high contrast, readable Brazilian Portuguese text, Figma UI style.
```

---

### Prompt 3 — Tela de Exames A-Z & Laboratórios
```text
A realistic, high-resolution mobile UI/UX design mockup of a smartphone displaying the medical exams directory screen of "Guia de Saúde Altamira".
At the top, a clean horizontal alphabet scrubber bar showing letters "A B C D E F G..." with the letter "E" highlighted in bright teal.
Below, the screen lists exams starting with E, showing a card for "Ecocardiograma com Doppler":
Inside the card:
- Exam title in bold dark slate text: "Ecocardiograma com Doppler"
- List of clinics that offer the exam: "1. Centro Médico Xingu • 2. Hospital Santo Agostinho"
- A prominent notice box with amber background (#FEF3C7) and amber icon: "⚠️ Confirme valores, preparo e horários diretamente com a clínica."
- A direct green WhatsApp button: "Falar com Centro Médico Xingu".
Crisp mobile layout, Portuguese medical terms, accessible high-contrast design, clean health directory UI, realistic smartphone screen.
```

---

### Prompt 4 — Tela de Transparência Radical ("Como Funciona")
```text
A realistic, high-resolution mobile UI/UX design mockup of a smartphone displaying the transparency and community manifesto screen of "Guia de Saúde Altamira".
Header with title "Como Funciona o Guia".
The screen features 3 clean, visually distinct informational cards with modern minimalist icons:
1. Card with a green badge: "100% Gratuito para o Cidadão — Sem cobranças ou anúncios invasivos"
2. Card with an amber caution shield: "Honestidade Radical — Não fazemos agendamento direto pelo app; conectamos você ao contato verificado da clínica para evitar filas e números errados"
3. Card with a blue handshake icon: "Colaboração Comunitária — Ajude a manter o guia atualizado enviando correções"
At the bottom, a prominent friendly button: "Voltar para o Início".
Clean, trustworthy, editorial layout, friendly typography in Brazilian Portuguese, modern mobile app showcase.
```

---

## 4. Prompts para Ilustrações e Ativos Visuais (DALL-E / ChatGPT)

Se desejar gerar ilustrações isoladas de apoio para banners e empty states:

- **Estilo de Direção de Arte**: *3D Clay Minimalista e Acolhedor, cores em tons de esmeralda/teal (#0D9488), branco e toques de verde (#25D366), iluminação difusa de estúdio, superfícies foscas, sem detalhes caóticos.*
- **Ilustração 1 (Banner de Saúde Comunitária)**:
  `A charming 3D clay minimal illustration of a friendly doctor and a patient shaking hands in front of a modern small-town medical clinic, soft diffused studio lighting, matte clay texture, vibrant teal (#0D9488) and pastel green tones, isolated on clean white background, clean and welcoming medical theme.`
- **Ilustração 2 (Conexão Direta / WhatsApp)**:
  `A charming 3D clay minimal illustration of a mobile smartphone showing a friendly chat bubble with a medical cross, connecting directly to a clinic building, smooth rounded shapes, matte finish, teal and green color palette, warm clean lighting, isolated on solid white background.`
