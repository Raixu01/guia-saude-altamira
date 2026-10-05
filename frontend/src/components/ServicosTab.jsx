import React, { useState, useEffect } from "react";
import { api } from "../api";

export default function ServicosTab({ onOpenSugestao }) {
  const [servicos, setServicos] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(false);
  // Estado para os blocos de intenção expansíveis (iniciam abertos ou sob clique)
  const [categoriaAberta, setCategoriaAberta] = useState({
    farmaceutico: true,
    enfermagem: true,
    cuidados: true,
  });

  const categorias = [
    {
      id: "farmaceutico",
      titulo: "Serviços Farmacêuticos",
      icone: "local_pharmacy",
    },
    {
      id: "enfermagem",
      titulo: "Assistência de Enfermagem",
      icone: "medical_services",
    },
    {
      id: "cuidados",
      titulo: "Cuidados e Acompanhamento",
      icone: "elderly",
    },
  ];

  function extrairCoren(responsavel) {
    if (!responsavel) return "";
    const match = responsavel.match(/COREN[^)]+/i);
    if (match) return match[0];
    return responsavel.includes("COREN") ? responsavel : "";
  }

  useEffect(() => {
    carregarServicos();
  }, []);

  async function carregarServicos(termo = "") {
    setCarregando(true);
    try {
      const data = await api.getServicos("todos", termo);
      setServicos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
    }
  }

  function handleBuscaChange(e) {
    const val = e.target.value;
    setBusca(val);
    carregarServicos(val);
  }

  function toggleCategoria(catId) {
    setCategoriaAberta((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  }

  function buildWhatsappServicoUrl(numero, titulo) {
    const numLimpo = numero ? numero.replace(/\D/g, "") : "5593999999999";
    const msg = encodeURIComponent(
      `Olá! Encontrei o contato da ${titulo} pelo Guia de Saúde de Altamira e gostaria de informações sobre atendimento.`
    );
    return `https://wa.me/${numLimpo}?text=${msg}`;
  }

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-12 max-w-lg mx-auto gap-4 animate-tab-enter">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#005C55] text-[24px]">
            medical_services
          </span>
          <h2 className="font-display font-bold text-[20px] text-on-surface">
            Serviços de Saúde
          </h2>
        </div>
      </div>

      {/* Busca Rápida de Serviços */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </div>
        <input
          type="search"
          value={busca}
          onChange={handleBuscaChange}
          placeholder="Busque por farmácia, cuidador, enfermagem..."
          className="w-full h-12 pl-11 pr-11 bg-white rounded-2xl text-[14px] text-on-surface placeholder:text-on-surface-variant/70 shadow-soft border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {busca && (
          <button
            type="button"
            onClick={() => {
              setBusca("");
              carregarServicos("");
            }}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">cancel</span>
          </button>
        )}
      </div>

      {/* Skeletons de carregamento */}
      {carregando ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="w-full h-24 bg-white rounded-3xl skeleton-box" />
          ))}
        </div>
      ) : (
        /* Blocos de Intenção Verticais (Padrão Stitch) */
        <div className="flex flex-col gap-4">
          {categorias.map((cat) => {
            const servicosDaCategoria = servicos.filter(
              (s) => s.categoria === cat.id
            );
            const isOpen = categoriaAberta[cat.id];

            if (busca && servicosDaCategoria.length === 0) {
              return null;
            }

            return (
              <section
                key={cat.id}
                className="bg-white rounded-3xl shadow-soft border border-outline-variant/30 overflow-hidden transition-all"
              >
                {/* Gatilho da Categoria com Ícone e Chevron */}
                <button
                  type="button"
                  onClick={() => toggleCategoria(cat.id)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors active:scale-[0.99] cursor-pointer"
                >
                  <div className="flex items-center gap-3 pr-2 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-[#D7F8EE] text-[#005C55] flex items-center justify-center flex-shrink-0 border border-[#005C55]/20">
                      <span className="material-symbols-outlined text-[24px]">
                        {cat.icone}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-[16px] text-on-surface leading-tight">
                      {cat.titulo}
                    </h3>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180 bg-primary text-white" : ""
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      expand_more
                    </span>
                  </div>
                </button>

                {/* Lista de Cards da Categoria */}
                {isOpen && (
                  <div className="p-3.5 pt-1 flex flex-col gap-3 border-t border-outline-variant/20 bg-surface/30">
                    {servicosDaCategoria.map((serv) => {
                      const coren = serv.categoria === "enfermagem" ? extrairCoren(serv.responsavel) : "";
                      const mostrarEndereco = serv.categoria === "farmaceutico";

                      return (
                        <article
                          key={serv.id}
                          className="bg-white rounded-2xl p-4 shadow-sm border border-outline-variant/30 flex flex-col gap-3"
                        >
                          <div className="flex flex-col gap-1">
                            <h4 className="font-display font-bold text-[15px] text-on-surface leading-tight">
                              {serv.titulo}
                            </h4>

                            {coren && (
                              <p className="text-[12px] font-semibold text-primary">
                                {coren}
                              </p>
                            )}

                            {mostrarEndereco && serv.endereco && (
                              <p className="text-[12px] text-on-surface-variant flex items-center gap-1 mt-0.5">
                                <span className="material-symbols-outlined text-[14px] text-primary flex-shrink-0">
                                  location_on
                                </span>
                                <span>{serv.endereco}</span>
                              </p>
                            )}
                          </div>

                          {/* Enfermagem e cuidados exibem somente empresa, COREN (quando aplicável) e contato. */}
                          <div className="flex items-center gap-2 pt-0.5">
                            <a
                              href={buildWhatsappServicoUrl(serv.whatsapp, serv.titulo)}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => api.trackEvent("contact_clicked", { channel: "whatsapp", category: "servico", target: serv.titulo })}
                              className="flex-1 min-h-[44px] rounded-xl bg-[#25D366] hover:bg-[#20BA59] text-white font-bold text-[13px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-sm"
                            >
                              <span className="material-symbols-outlined text-[18px]">chat</span>
                              <span>Contato</span>
                            </a>

                            {mostrarEndereco && serv.google_maps_url && (
                              <a
                                href={serv.google_maps_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-[44px] rounded-xl border border-outline-variant/50 bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center active:scale-95 transition-transform"
                                title="Ver no mapa"
                              >
                                <span className="material-symbols-outlined text-[18px]">directions</span>
                              </a>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}

      {/* Banner Comunitário para Cadastro de Novos Serviços */}
      <div className="p-4.5 rounded-3xl bg-surface-container-high/60 border border-outline-variant/30 flex flex-col gap-2.5 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">handshake</span>
          </div>
          <h4 className="font-display font-bold text-[15px] text-on-surface">
            Cadastrar Serviço em Altamira
          </h4>
        </div>
        <p className="text-[12px] text-on-surface-variant leading-relaxed">
          Oferece farmácia, home care ou cuidados de saúde em Altamira? Cadastre gratuitamente seus contatos.
        </p>
        <button
          onClick={onOpenSugestao}
          className="h-11 mt-1 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-[13px] flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>Cadastrar Meu Serviço</span>
        </button>
      </div>
    </div>
  );
}
