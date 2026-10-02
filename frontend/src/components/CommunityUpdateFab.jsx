import React from "react";

export default function CommunityUpdateFab({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Fale com a equipe e ajude a atualizar o Guia"
      className="fixed bottom-[88px] right-4 z-40 inline-flex h-12 items-center gap-2.5 rounded-full bg-[#005C55] pl-2.5 pr-4 text-[13px] font-bold text-white shadow-[0_12px_24px_rgba(0,92,85,.28)] transition duration-200 hover:bg-[#0F766E] active:scale-[0.97] cursor-pointer"
    >
      <div className="w-7 h-7 rounded-full bg-white p-0.5 flex items-center justify-center flex-shrink-0 shadow-xs">
        <img
          src="/logo.png"
          alt="Pulso Saúde"
          className="w-full h-full object-contain"
        />
      </div>
      <span>Atualize o Guia</span>
    </button>
  );
}
