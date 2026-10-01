import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe border-b border-outline-variant/30">
      <div className="h-16 px-4 flex items-center justify-between">
        {/* Logo da Imagem PNG */}
        <div className="flex items-center gap-2 min-w-0">
          <img
            src="/logo.png"
            alt="Pulso Saúde"
            className="h-9 sm:h-10 w-auto object-contain"
          />
        </div>

        {/* Pin e Localização Altamira-Pará (Substitui o Apoio e o ?) */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low text-primary font-bold text-[12px] sm:text-[13px] border border-outline-variant/40 shadow-sm">
          <span className="material-symbols-outlined text-[18px] text-primary">
            location_on
          </span>
          <span className="tracking-tight text-on-surface">Altamira-Pará</span>
        </div>
      </div>
    </header>
  );
}
