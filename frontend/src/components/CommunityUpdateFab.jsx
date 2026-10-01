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
