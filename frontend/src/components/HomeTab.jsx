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

      {/* 3 Cartões de Navegação (Brancos por padrão, mudam para cor de seleção ao clicar) */}
      <div className="flex flex-col gap-3">
        {/* Opção 1: Consultas médicas */}
        <button
          onClick={() => onNavigate("medicos")}
          className="group relative min-h-[88px] flex items-center justify-between p-4.5 rounded-[20px] bg-white text-on-surface shadow-card active:scale-[0.985] active:bg-[#005C55] active:text-white transition-all border border-[#E2E8F0] hover:border-[#005C55]/30 text-left cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-[#D7F8EE] flex items-center justify-center flex-shrink-0 group-active:bg-white/20 transition-colors">
              <span className="material-symbols-outlined text-[#005C55] group-active:text-white text-[27px] transition-colors">
                stethoscope
              </span>
            </div>
            <span className="font-display font-bold text-[18px] text-on-surface group-active:text-white leading-tight transition-colors">
              Consultas médicas
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-surface-container group-active:bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:translate-x-0.5 transition-all">
            <span className="material-symbols-outlined text-primary group-active:text-white text-[22px] transition-colors">
              arrow_forward
            </span>
          </div>
        </button>

        {/* Opção 2: Exames */}
        <button
          onClick={() => onNavigate("exames")}
          className="group relative min-h-[88px] flex items-center justify-between p-4.5 rounded-[20px] bg-white text-on-surface shadow-card active:scale-[0.985] active:bg-[#005C55] active:text-white transition-all border border-[#E2E8F0] hover:border-[#005C55]/30 text-left cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-[#D7F8EE] flex items-center justify-center flex-shrink-0 group-active:bg-white/20 transition-colors">
              <span className="material-symbols-outlined text-[#005C55] group-active:text-white text-[27px] transition-colors">
                science
              </span>
            </div>
            <span className="font-display font-bold text-[18px] text-on-surface group-active:text-white leading-tight transition-colors">
              Exames
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-surface-container group-active:bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:translate-x-0.5 transition-all">
            <span className="material-symbols-outlined text-primary group-active:text-white text-[22px] transition-colors">
              arrow_forward
            </span>
          </div>
        </button>

        {/* Opção 3: Serviços */}
        <button
          onClick={() => onNavigate("servicos")}
          className="group relative min-h-[88px] flex items-center justify-between p-4.5 rounded-[20px] bg-white text-on-surface shadow-card active:scale-[0.985] active:bg-[#005C55] active:text-white transition-all border border-[#E2E8F0] hover:border-[#005C55]/30 text-left cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-[#D7F8EE] flex items-center justify-center flex-shrink-0 group-active:bg-white/20 transition-colors">
              <span className="material-symbols-outlined text-[#005C55] group-active:text-white text-[27px] transition-colors">
                medical_services
              </span>
            </div>
            <span className="font-display font-bold text-[18px] text-on-surface group-active:text-white leading-tight transition-colors">
              Serviços
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-surface-container group-active:bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:translate-x-0.5 transition-all">
            <span className="material-symbols-outlined text-primary group-active:text-white text-[22px] transition-colors">
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

