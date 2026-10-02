# Design System & Especificação UI/UX: Pulso Saúde (Guia de Saúde Altamira)

> **Objetivo**: Especificar a identidade visual, design tokens, componentes modulares e prompts prontos para prototipagem no **Google Stitch** e geração de telas visuais no **ChatGPT / DALL-E 3**.  
> **Status**: Atualizado & Consolidado (Marco 5)  
> **Versão**: 1.1.0  
> **Última Atualização**: 2026-10-02  

---

## 1. Identidade Visual & Design Tokens

A proposta visual une a identidade da marca **Pulso Saúde** com **acolhimento comunitário**, **clareza extrema** e **alta legibilidade** para uso rápido no celular sob a rotina de Altamira-PA.

### Paleta de Cores (Acolhedora & TDAH-Friendly)
- **Fundo da Aplicação (Light Mode Acolhedor)**: `#F6F8FA` (Surface suave) e `#FFFFFF` (Card branco puro com sombra sutil `shadow-card`).
- **Cor Primária (Saúde & Identidade Pulso)**: `#005C55` (Teal Profundo) e `#D7F8EE` (Mint suave de destaque).
- **Cor de Destaque / Ação Imediata**: `#25D366` (Verde WhatsApp) — reconhecimento cognitivo instantâneo para o botão de contato.
- **Cor de Alerta / Incerteza**: `#F59E0B` (Âmbar 500) — selo *"Dado de planilha pública / A confirmar"*.
- **Cor de Confirmação**: `#10B981` (Esmeralda 500) — selo *"Confirmado recentemente"*.
- **Texto Principal**: `#0F172A` (Slate 900) — legibilidade máxima e alto contraste.
- **Texto Secundário / Apoio**: `#64748B` (Slate 500) — para endereços, CRM e horários.
- **Bordas & Divisores**: `#E2E8F0` (Slate 200) — separadores discretos sem ruído visual.

### Tipografia & Hierarquia
- **Fonte de Títulos**: `Plus Jakarta Sans` ou `Outfit` (geometria moderna e acolhedora).
- **Fonte de Corpo & Dados**: `Inter` (sans-serif neutra com legibilidade otimizada em telas pequenas).
- **Tamanhos e Pesos**:
  - Título Principal da Home: `24px - 26px / Bold (700)`.
  - Nomes de Médicos / Exames / Serviços: `16px - 18px / Bold (700)`.
  - Textos de Apoio / Endereços: `12px - 13px / Regular (400) e Medium (500)`.
  - Badges e Selos de Verificação: `11px / Bold (700)` com cantos arredondados.
- **Áreas de Toque (Mobile-First)**:
  - Botões de WhatsApp: Altura de `50px` com cantos `rounded-2xl`.
  - Cartões de navegação da Home: Altura mínima de `88px` com cantos `rounded-[20px]`.

---

## 2. Mapa das Telas do MVP

1. **Header Fixo Global (Todas as Telas)**:
   - Logotipo oficial da marca **Pulso Saúde**.
   - Pin de localização com indicação de cidade: *"Altamira • PA"*.
   - Botão de acesso ao modal *"Como Funciona"*.

2. **Tela 1 (`SCREEN-01`): Início com 3 Blocos de Intenção**
   - Pergunta direta de acolhimento: *"O que você precisa encontrar hoje?"*.
   - 3 Cartões de Navegação Principais (brancos com efeito ativo em tom teal):
     - `[ 🩺 Consultas médicas ]` ➔ Especialidades e lista de profissionais com CRM.
     - `[ 🔬 Exames ]` ➔ Catálogo alfabético A-Z de exames e laboratórios locais.
     - `[ 🏥 Serviços ]` ➔ Terapias, odontologia, enfermagem e clínicas multidisciplinares.
   - Botão Flutuante Comunitário Global (FAB): `[ 💬 Atualize o Guia ]`.

3. **Tela 2 (`SCREEN-02`): Especialidades & Profissionais**
   - Campo de busca instantânea com filtro em tempo real por médico ou CRM.
   - Seletor de especialidades com ícones temáticos e contadores de profissionais.
   - Cards de profissionais: Nome, CRM, local de atendimento, selo de verificação e botão verde WhatsApp com mensagem pré-formatada.

4. **Tela 3 (`SCREEN-03`): Catálogo de Exames A-Z**
   - Barra de rolagem alfabética A-Z com indicador da letra selecionada.
   - Cards expansíveis no estilo acordeão com aviso de confirmação prévia e locais disponíveis em Altamira.

5. **Tela 4 (`SCREEN-04`): Serviços de Saúde & Bem-Estar**
   - Abas por categoria (Odontologia, Fisioterapia, Psicologia, Enfermagem, etc.).
   - Tags de serviços prestados, horários de atendimento e contato direto.

6. **Modais Globais**:
   - **Modal de Transparência / Como Funciona**: 4 compromissos de honestidade radical e limites legais.
   - **Modal de Colaboração Cidadã**: Formulário direto para correção ou indicação de novos estabelecimentos.

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
