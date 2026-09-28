# Guia de Saúde Altamira — Narrativa do Projeto & Tese de Produto

> **Diretriz de Narrativa**: A narrativa do projeto não é uma ficção; é a **linha lógica real, clara e prática** do produto. Ela define o contexto de quem vive o problema em Altamira-PA, a dor real enfrentada na busca por médicos e exames, o racional da solução sem intermediação e o impacto prático gerado para a população.

---

## 1. Contexto & Usuário Real
*Quem é a pessoa real no centro do problema e em que cenário ela atua?*

- **Perfil Real**: Morador comum de Altamira (ou familiar que cuida de idosos/crianças) que precisa de atendimento médico particular, clínica ou laboratório de exames no município de Altamira-PA.
- **Rotina & Cenário de Atuação**: Diante de um sintoma, necessidade de acompanhamento médico ou pedido de exame em mãos, acessa o celular para tentar descobrir: "Onde tem cardiologista atendendo?", "Quem faz ultrassom morfológico aqui na cidade?", "Qual é o telefone atual da clínica X?".
- **Objetivo Prático**: Encontrar com agilidade o contato direto e o local de atendimento do profissional ou do laboratório para ligar ou mandar mensagem no WhatsApp e marcar seu atendimento diretamente.

---

## 2. O Gargalo Real & A Dor Concreta
*Onde o processo trava na vida real e o que gera frustração ou ineficiência palpável?*

- **O Problema Real**: Os dados de saúde na cidade estão dispersos em planilhas não estruturadas, PDFs antigos que circulam em grupos de WhatsApp, perfis de Instagram sem endereço claro ou listas desatualizadas. O morador perde horas perguntando em grupos ou ligando para números errados/desativados.
- **O Custo da Ineficiência**: Estresse, atraso no diagnóstico e início do tratamento, perda de tempo em ligações infrutíferas e deslocamentos desnecessários pelo calor de Altamira até clínicas que mudaram de endereço ou não oferecem mais a especialidade/exame procurado.
- **Por que as alternativas atuais falham**:
  - Planilhas soltas no Excel/Google Drive são péssimas para navegar no celular.
  - Grandes plataformas nacionais de agendamento (Doctoralia, etc.) quase não possuem cobertura ou profissionais cadastrados no interior do Pará.
  - A maioria dos apps promete agendamento automático que não funciona no contexto local, gerando frustração.

---

## 3. A Linha Lógica da Solução (A Tese do Produto)
*Qual é o raciocínio por trás da solução e como ela destrava o processo?*

- **A Abordagem Central**: Uma aplicação web mobile-first extremamente simples, leve e honesta. O usuário não precisa se cadastrar, não precisa preencher formulários e nem mesmo digitar nada se não quiser. Ele simplesmente escolhe:
  - **[ 🩺 Consulta ]** ou **[ 🔬 Exames ]**
  - Navega pela árvore de especialidades ou lista alfabética de exames.
  - Chega diretamente ao card do profissional ou clínica com o botão de contato (WhatsApp/Telefone) e o status de verificação daquele dado.
- **O Ponto de Virada Prático ("Aha! Moment")**: Em menos de 10 segundos e 3 toques no celular, a pessoa sai do nome do exame ou especialidade para a conversa no WhatsApp da clínica com mensagem pré-preenchida.
- **Diferencial Real (Honestidade Radical)**:
  - **Não recomenda profissionais** (não cria ranking nem privilégios).
  - **Não faz diagnóstico**.
  - **Não agenda consultas** nem cobra intermediação.
  - **Preserva incertezas**: rotula claramente o que é *"Confirmado recentemente"* vs *"Informado na planilha / Não confirmado"*.
  - Facilita o próximo passo: falar direto com a clínica ou médico.

---

## 4. O Impacto Prático & Resultado Tangível
*O que muda concretamente na rotina de quem usa?*

- **Antes vs. Depois na Prática**:
  - *Antes*: Pede indicação em 3 grupos de WhatsApp, abre um PDF pesado de 2 anos atrás, liga para um número fixo que não chama, fica sem saber onde faz o exame prescrito.
  - *Depois*: Abre o Guia no navegador do celular, toca em "Exames", clica na letra "E" -> "Ecocardiograma", vê os locais registrados em Altamira, toca no botão do WhatsApp da clínica e pergunta a disponibilidade imediatamente.
- **Benefício Tangível**: Economia de tempo, clareza instantânea de opções locais e autonomia imediata para o cidadão e seus familiares.

---

## 5. Posicionamento, Tom de Voz & Estilo
*Como o produto se comunica e se apresenta no mercado?*

- **Tom de Comunicação**: Transparente, direto, acolhedor, cidadão e sem promessas vazias. Comunicação acessível para qualquer nível de escolaridade e idade.
- **Estilo Visual e Percepção**: Interface limpa, arejada, inspirada no acolhimento e na sobriedade da saúde (tons de esmeralda/verde saúde com neutros limpos), com tipografia legível, botões grandes e navegação amigável para TDAH (zero poluição visual).

---

## 6. Arquitetura da Navegação Central

```
Início
├── [ 🩺 Consulta ]
│   └── Especialidades
│       └── [Especialidade Escolhida, ex: Cardiologia]
│           └── Lista de Profissionais + Clínica/Endereço + Registro (CRM) + Botão de Contato
│
├── [ 🔬 Exames ]
│   └── Lista Alfabética de Exames
│       └── [Exame Escolhido, ex: Raio-X de Tórax]
│           └── Clínicas / Laboratórios Relacionados + Botão de Contato + Aviso de Confirmação
│
└── [ ℹ️ Como funciona o Guia? ]
    └── Explicação das fontes, transparência radical, limites legais e canal de colaboração
```
