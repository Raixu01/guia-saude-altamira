import React from "react";

export default function HomeTab({ onNavigate }) {
  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-8 max-w-lg mx-auto gap-5 animate-tab-enter">
      {/* Título Oficial */}
      <div className="flex flex-col pt-1">
        <h2 className="font-display font-bold text-[24px] sm:text-[26px] text-on-surface tracking-tight leading-tight">
          O que você precisa encontrar hoje?
        </h2>
      </div>

      {/* 3 Cartões de Navegação */}
      <div className="flex flex-col gap-3">
        {/* Opção 1: Consultas médicas (Cartão Herói com Gradiente Profundo e Ícone Teal Escuro) */}
        <button
          onClick={() => onNavigate("medicos")}
          className="group relative min-h-[104px] overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#005C55_0%,#0F766E_58%,#15998E_100%)] p-5 text-left shadow-[0_14px_30px_rgba(0,92,85,0.20)] transition duration-200 active:scale-[0.985]"
        >
          <span className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[#8CF2D5]/25 blur-2xl" />
          <span className="absolute -bottom-8 right-16 h-24 w-24 rounded-full border border-white/15" />
          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D7F8EE] shadow-[inset_0_1px_0_rgba(255,255,255,.65)] flex-shrink-0">
                <span className="material-symbols-outlined text-[29px] text-[#005C55]">
                  stethoscope
                </span>
              </div>
              <span className="font-display text-[20px] font-bold tracking-tight text-white leading-tight">
                Consultas médicas
              </span>
            </div>
            <span className="material-symbols-outlined text-[24px] text-white/90 transition-transform duration-200 group-hover:translate-x-1 flex-shrink-0">
              arrow_forward
            </span>
          </div>
        </button>

        {/* Opção 2: Exames (Fundo Branco + Bloco Menta/Lavanda) */}
        <button
          onClick={() => onNavigate("exames")}
          className="group relative min-h-[88px] flex items-center justify-between p-4.5 rounded-[20px] bg-white text-on-surface shadow-card active:scale-[0.985] transition-all border border-[#E2E8F0] text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-[#D7F8EE] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[#005C55] text-[27px]">
                science
              </span>
            </div>
            <span className="font-display font-bold text-[18px] text-on-surface leading-tight">
              Exames
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
            <span className="material-symbols-outlined text-primary text-[22px]">
              arrow_forward
            </span>
          </div>
        </button>

        {/* Opção 3: Serviços (Fundo Branco + Bloco Menta/Lavanda) */}
        <button
          onClick={() => onNavigate("servicos")}
          className="group relative min-h-[88px] flex items-center justify-between p-4.5 rounded-[20px] bg-white text-on-surface shadow-card active:scale-[0.985] transition-all border border-[#E2E8F0] text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-[#D7F8EE] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[#005C55] text-[27px]">
                medical_services
              </span>
            </div>
            <span className="font-display font-bold text-[18px] text-on-surface leading-tight">
              Serviços
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
            <span className="material-symbols-outlined text-primary text-[22px]">
              arrow_forward
            </span>
          </div>
        </button>
      </div>

      {/* Seção de Emergências (Dois botões iguais: 192 / SAMU e 193 / Bombeiros) */}
      <div className="flex gap-2.5 pt-1">
        <a
          href="tel:192"
          className="flex-1 flex items-center justify-center gap-2 p-3 bg-white rounded-2xl shadow-card border border-[#E2E8F0] active:scale-[0.985] transition-all"
        >
          <span className="font-display font-bold text-[17px] text-error">192</span>
          <span className="text-[13px] font-bold text-on-surface">SAMU</span>
        </a>
        <a
          href="tel:193"
          className="flex-1 flex items-center justify-center gap-2 p-3 bg-white rounded-2xl shadow-card border border-[#E2E8F0] active:scale-[0.985] transition-all"
        >
          <span className="font-display font-bold text-[17px] text-[#005C55]">193</span>
          <span className="text-[13px] font-bold text-on-surface">Bombeiros</span>
        </a>
      </div>
    </div>
  );
}

