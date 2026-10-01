import React, { useState } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import HomeTab from "./components/HomeTab";
import MedicosTab from "./components/MedicosTab";
import ExamesTab from "./components/ExamesTab";
import ServicosTab from "./components/ServicosTab";
import CommunityUpdateFab from "./components/CommunityUpdateFab";
import ModalSugestao from "./components/ModalSugestao";
import ModalComoFunciona from "./components/ModalComoFunciona";

export default function App() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [modalSugestaoOpen, setModalSugestaoOpen] = useState(false);
  const [modalComoFuncionaOpen, setModalComoFuncionaOpen] = useState(false);

  function handleNavigate(tabId) {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface font-sans text-on-surface antialiased selection:bg-primary/20 selection:text-primary">
      {/* Top Header Fixo Consolidado */}
      <Header />

      {/* Área Principal de Conteúdo */}
      <main className="flex-1 w-full pt-16 pb-24">
        {activeTab === "inicio" && (
          <HomeTab onNavigate={handleNavigate} />
        )}
        {activeTab === "medicos" && (
          <MedicosTab onOpenSugestao={() => setModalSugestaoOpen(true)} />
        )}
        {activeTab === "exames" && (
          <ExamesTab onOpenSugestao={() => setModalSugestaoOpen(true)} />
        )}
        {activeTab === "servicos" && (
          <ServicosTab onOpenSugestao={() => setModalSugestaoOpen(true)} />
        )}
      </main>

      {/* Botão Flutuante Global Comunitário: "Atualize o Guia" */}
      <CommunityUpdateFab onClick={() => setModalSugestaoOpen(true)} />

      {/* Barra de Navegação Inferior Fixa */}
      <BottomNav activeTab={activeTab} onSelectTab={handleNavigate} />

      {/* Modal de Transparência / Como Funciona Este Guia */}
      <ModalComoFunciona
        isOpen={modalComoFuncionaOpen}
        onClose={() => setModalComoFuncionaOpen(false)}
        onOpenSugestao={() => setModalSugestaoOpen(true)}
      />

      {/* Modal de Colaboração Cidadã / Fale com a gente */}
      <ModalSugestao
        isOpen={modalSugestaoOpen}
        onClose={() => setModalSugestaoOpen(false)}
      />
    </div>
  );
}

