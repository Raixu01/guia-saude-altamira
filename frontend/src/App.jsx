import React, { useState } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import HomeTab from "./components/HomeTab";
import MedicosTab from "./components/MedicosTab";
import ExamesTab from "./components/ExamesTab";
import ServicosTab from "./components/ServicosTab";
import ModalSugestao from "./components/ModalSugestao";

export default function App() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [modalSugestaoOpen, setModalSugestaoOpen] = useState(false);
  const [globalSearchTerm, setGlobalSearchTerm] = useState("");

  function handleNavigate(tabId) {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSearchFromHome(term) {
    setGlobalSearchTerm(term);
    setActiveTab("medicos");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface font-sans text-on-surface antialiased">
      {/* Top Header Fixo */}
      <Header onOpenSugestao={() => setModalSugestaoOpen(true)} />

      {/* Área Principal de Conteúdo */}
      <main className="flex-1 w-full pt-16 pb-24">
        {activeTab === "inicio" && (
          <HomeTab
            onNavigate={handleNavigate}
            onSearchGlobal={handleSearchFromHome}
          />
        )}
        {activeTab === "medicos" && (
          <MedicosTab
            initialSearch={globalSearchTerm}
            onOpenSugestao={() => setModalSugestaoOpen(true)}
          />
        )}
        {activeTab === "exames" && (
          <ExamesTab
            initialSearch={globalSearchTerm}
            onOpenSugestao={() => setModalSugestaoOpen(true)}
          />
        )}
        {activeTab === "servicos" && (
          <ServicosTab onOpenSugestao={() => setModalSugestaoOpen(true)} />
        )}
      </main>

      {/* Barra de Navegação Inferior Fixa */}
      <BottomNav activeTab={activeTab} onSelectTab={handleNavigate} />

      {/* Modal de Colaboração Cidadã */}
      <ModalSugestao
        isOpen={modalSugestaoOpen}
        onClose={() => setModalSugestaoOpen(false)}
      />
    </div>
  );
}
