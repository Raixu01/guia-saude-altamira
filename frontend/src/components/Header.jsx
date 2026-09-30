import React from "react";

export default function Header({ onOpenSugestao }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe border-b border-outline-variant/30">
      <div className="h-14 px-4 flex items-center justify-between">
        {/* Logo Pulso Saúde + Localização */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold shadow-inner">
            <span className="material-symbols-outlined text-[22px]">favorite</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-display font-bold text-[18px] text-on-surface leading-tight tracking-tight">
              Pulso <span className="text-primary">Saúde</span>
            </span>
            <div className="flex items-center gap-1 text-[11px] font-medium text-on-surface-variant">
              <span className="material-symbols-outlined text-[13px] text-primary">location_on</span>
              <span>Altamira - PA</span>
            </div>
          </div>
        </div>

        {/* Botão de Sugestão / Transparência */}
        <button
          onClick={onOpenSugestao}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-semibold text-[12px] active:scale-95 transition-all"
          title="Sugerir correção ou novo número"
        >
          <span className="material-symbols-outlined text-[16px]">help_center</span>
          <span>Apoio</span>
        </button>
      </div>
    </header>
  );
}
