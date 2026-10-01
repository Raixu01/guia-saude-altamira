# Brief de execução — redesign visual do Pulso Saúde

> **Objetivo:** tornar o Guia mais marcante, simples de ler e mais convidativo à colaboração comunitária, sem alterar os fluxos de dados, as APIs ou as regras de transparência.
>
> **Princípio de interface:** uma tela deve comunicar uma ação principal em menos de dois segundos. O usuário não precisa de textos explicando o que cada seção faz; nomes, ícones e chamadas diretas são suficientes.

---

## 1. Direção visual a implementar

Adote o conceito **"Pulso vivo da saúde local"**: uma interface clara e confiável, com um ponto de energia visual forte na primeira ação, superfícies leves e uma chamada comunitária sempre ao alcance.

| Papel | Token / regra |
|---|---|
| Fundo | `#FAF8FF` (lavanda quase branca), sem gradientes no fundo geral. |
| Ação principal | Gradiente profundo `#005C55 → #0F766E`, com um brilho suave em verde-água no canto direito. |
| Ícones de escolha | Bloco menta `#D7F8EE`; ícone **escuro** `#005C55`. Nunca usar ícone branco dentro desse bloco. |
| Ação WhatsApp | Exclusivamente `#25D366`. |
| Destaque comunitário | Teal profundo, não WhatsApp, para não concorrer com contato de clínicas. |
| Cartões | Branco, borda `#E2E8F0`, raio de 20–24px, sombra discreta e curta. |
| Movimento | 160–200ms, opacidade + deslocamento máximo de 6px; respeitar `prefers-reduced-motion`. |

O resultado deve parecer mais editorial e menos genérico: alto contraste na primeira ação, ritmo por espaços em branco e detalhes verdes usados só onde geram decisão.

---

## 2. Alterações obrigatórias da Home

**Arquivo:** `frontend/src/components/HomeTab.jsx`

### 2.1 Card “Consultas médicas”

Substituir a composição atual por um cartão-herói com fundo em gradiente. O ícone de estetoscópio **não pode ser branco**.

```jsx
<button
  onClick={() => onNavigate("medicos")}
  className="group relative min-h-[104px] overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#005C55_0%,#0F766E_58%,#15998E_100%)] p-5 text-left shadow-[0_14px_30px_rgba(0,92,85,0.20)] transition duration-200 active:scale-[0.985]"
>
  <span className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[#8CF2D5]/25 blur-2xl" />
  <span className="absolute -bottom-8 right-16 h-24 w-24 rounded-full border border-white/15" />
  <div className="relative z-10 flex items-center justify-between gap-4">
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D7F8EE] shadow-[inset_0_1px_0_rgba(255,255,255,.65)]">
        <span className="material-symbols-outlined text-[29px] text-[#005C55]">stethoscope</span>
      </div>
      <span className="font-display text-[20px] font-bold tracking-tight text-white">Consultas médicas</span>
    </div>
    <span className="material-symbols-outlined text-[24px] text-white/90 transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
  </div>
</button>
```

Não usar `text-white` no elemento do ícone `stethoscope`.

### 2.2 Cards “Exames” e “Serviços”

- Remover qualquer descrição abaixo dos nomes.
- Manter apenas: ícone, título e seta.
- Usar 88px de altura mínima, fundo branco, raio `20px` e ícone em bloco menta/lavanda.
- No toque, aplicar somente `scale-[0.985]`; não usar variações bruscas de sombra ou cor.

### 2.3 Emergências e transparência

- Manter SAMU e Bombeiros, mas remover a legenda superior `Emergências em Altamira`.
- Transformar o bloco em dois botões iguais, com `192 / SAMU` e `193 / Bombeiros`; sem texto auxiliar.
- Remover o botão “Como funciona este guia · Nossa transparência” da Home. Essa informação permanece acessível no menu/modal de transparência, mas não deve competir com a ação principal nesta tela.

---

## 3. Remover legendas não essenciais

Não remover informação clínica, endereço, CRM, status de verificação, preparo de exame ou texto de ação. Eles ajudam a pessoa a tomar uma decisão segura.

Remover somente textos redundantes que explicam uma seção já compreensível pelo título/ícone:

| Arquivo | Remover |
|---|---|
| `MedicosTab.jsx` | contador `X profissionais disponíveis` abaixo de cada especialidade e contador de especialidades no cabeçalho. |
| `ExamesTab.jsx` | contador `X exames`, legenda `Categoria: ...` e contador `X locais disponíveis` no acordeão. |
| `ServicosTab.jsx` | contador `X disponíveis` no cabeçalho e qualquer microlegenda que apenas repita o nome da categoria. |
| `HomeTab.jsx` | todas as descrições de cartões; preservar somente título, ícone e seta. |

Conservar os rótulos da navegação inferior (`Início`, `Médicos`, `Exames`, `Serviços`): eles identificam controles de navegação e não são legendas redundantes.

---

## 4. Chamada comunitária permanente — “Ajude a atualizar o Guia”

### Decisão de UX

Criar um botão flutuante global, presente em todas as abas, que abre o formulário já existente (`ModalSugestao`). Ele deve ser visível sem bloquear conteúdo nem competir com o WhatsApp dos prestadores.

**Texto do botão:** `Atualize o Guia`  
**Texto do modal:** `Fale com a gente`  
**Mensagem de apoio no modal:** `Viu um contato errado ou conhece um serviço que falta aqui? Sua informação ajuda Altamira inteira.`

### Novo componente

Criar `frontend/src/components/CommunityUpdateFab.jsx`:

```jsx
import React from "react";

export default function CommunityUpdateFab({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Fale com a equipe e ajude a atualizar o Guia"
      className="fixed bottom-[88px] right-4 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-[#005C55] px-4 text-[13px] font-bold text-white shadow-[0_12px_24px_rgba(0,92,85,.28)] transition duration-200 hover:bg-[#0F766E] active:scale-[0.97]"
    >
      <span className="material-symbols-outlined text-[20px]">campaign</span>
      <span>Atualize o Guia</span>
    </button>
  );
}
```

### Integração

No `frontend/src/App.jsx`:

1. Importar `CommunityUpdateFab`.
2. Renderizá-lo imediatamente antes de `BottomNav`.
3. Passar `onClick={() => setModalSugestaoOpen(true)}`.
4. Manter `z-40`; a navegação inferior continua em `z-50`.

No `frontend/src/components/ModalSugestao.jsx`:

- trocar o título para `Fale com a gente`;
- usar o texto de apoio definido acima;
- manter os campos e o envio atuais;
- em celular, apresentar como *bottom sheet*: `items-end sm:items-center`, painel com `rounded-t-3xl sm:rounded-3xl` e animação curta de entrada vertical.

---

## 5. Padronização das demais telas

### Cabeçalho

**Arquivo:** `frontend/src/components/Header.jsx`

- Manter o logo SVG, marca e localidade já implementados.
- Remover a borda inferior visível; manter apenas sombra de `0 1px 10px rgba(15,23,42,.04)`.
- Dar mais respiro lateral: `px-5` em telas móveis.

### Navegação inferior

**Arquivo:** `frontend/src/components/BottomNav.jsx`

- Manter os quatro rótulos.
- Remover o ponto indicador abaixo do item ativo; o ícone preenchido e a cor teal já são suficientes.
- Para o item ativo, usar uma cápsula sutil atrás do ícone (`bg-primary/10`), sem alterar o tamanho dos quatro itens.

### Médicos, exames e serviços

- Estabelecer raio único: `rounded-2xl` para listagens e `rounded-3xl` só para cards de destaque/modal.
- Diminuir tags secundárias: mostrar no máximo três por card de serviço e agrupar as demais em `+N` se necessário.
- Dar prioridade de contraste a status de verificação e WhatsApp; todo o restante deve ficar em slate/teal suave.
- Onde houver carregamento, usar `skeleton-box` existente em vez do ícone girando.

---

## 6. Ajustes globais de acabamento

**Arquivo:** `frontend/src/index.css`

Adicionar suporte a movimento reduzido:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Arquivo:** `frontend/index.html`

- Remover `maximum-scale=1.0` e `user-scalable=no` da meta viewport. O zoom é necessário para legibilidade em um produto de saúde.

---

## 7. Critérios de aceite

- [ ] O ícone de estetoscópio de “Consultas médicas” está em teal escuro sobre bloco menta; não é branco.
- [ ] Home abre com apenas três escolhas evidentes e os dois telefones de emergência, sem textos explicativos extras.
- [ ] Não há contadores ou legendas redundantes em especialidades, exames e serviços.
- [ ] O botão flutuante `Atualize o Guia` está presente em todas as abas, acima da navegação inferior.
- [ ] O botão abre o modal `Fale com a gente` e envia para o mesmo fluxo de sugestão já conectado à API/fallback.
- [ ] WhatsApp continua sendo a única ação verde-clara em cards de prestadores.
- [ ] A aplicação permanece utilizável em 360px, 390px e 430px de largura, sem sobreposição entre FAB e navegação.
- [ ] `npm run build` termina sem erros.

---

## Prompt compacto para o Antigravity

> Implemente integralmente o arquivo `docs/BRIEF_REDESIGN_VISUAL_ANTIGRAVITY.md`. Preserve APIs, dados e regras de negócio. Priorize a Home, remova somente legendas e contadores redundantes, deixe o estetoscópio de Consultas em teal escuro sobre fundo menta e crie o FAB global “Atualize o Guia” que abre o `ModalSugestao` renomeado para “Fale com a gente”. Use os critérios de aceite, valide em viewport 390px e execute `npm run build` ao final.
