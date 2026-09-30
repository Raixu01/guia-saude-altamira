import React from "react";

export default function BottomNav({ activeTab, onSelectTab }) {
  const tabs = [
    { id: "inicio", label: "Início", icon: "home" },
    { id: "medicos", label: "Médicos", icon: "stethoscope" },
    { id: "exames", label: "Exames", icon: "science" },
    { id: "servicos", label: "Serviços", icon: "medical_services" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe bg-white/95 backdrop-blur-xl shadow-nav border-t border-outline-variant/30">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[48px] px-2 py-1 rounded-xl transition-all active:scale-95 ${
                isActive
                  ? "text-primary font-bold"
                  : "text-on-surface-variant hover:text-primary font-medium"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[24px] ${
                  isActive ? "text-primary font-bold" : "text-on-surface-variant"
                }`}
              >
                {tab.icon}
              </span>
              <span className="text-[11px] leading-tight tracking-tight">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
