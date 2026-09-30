import React, { useState, useEffect } from "react";
import { api } from "../api";

export default function ServicosTab({ onOpenSugestao }) {
  const [servicos, setServicos] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(false);

  const categorias = [
    { id: "todos", label: "Todos", icon: "select_all" },
    { id: "farmaceutico", label: "Farmácias 24h", icon: "local_pharmacy" },
    { id: "enfermagem", label: "Home Care & Enfermagem", icon: "medical_services" },
    { id: "cuidados", label: "Cuidadores & Fisioterapia", icon: "elderly" },
  ];

  useEffect(() => {
    carregarServicos("todos", "");
  }, []);

  async function carregarServicos(cat, termo) {
    setCarregando(true);
    try {
      const data = await api.getServicos(cat, termo);
      setServicos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
    }
  }

  function handleCategoriaClick(catId) {
    setCategoriaAtiva(catId);
    carregarServicos(catId, busca);
  }

  function handleBuscaChange(e) {
    const val = e.target.value;
    setBusca(val);
    carregarServicos(categoriaAtiva, val);
  }

  function buildWhatsappServicoUrl(numero, titulo) {
    const numLimpo = numero.replace(/\D/g, "");
    const msg = encodeURIComponent(
      `Olá! Encontrei o contato do ${titulo} pelo Guia de Saúde de Altamira e gostaria de informações sobre atendimento.`
    );
    return `https://wa.me/${numLimpo}?text=${msg}`;
  }

  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-12 max-w-lg mx-auto gap-4">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[24px]">
            medical_services
          </span>
          <h2 className="font-display font-bold text-[20px] text-on-surface">
            Serviços de Saúde
          </h2>
        </div>
        <span className="text-[12px] font-semibold text-primary">
          {servicos.length} cadastrados
        </span>
      </div>

      {/* Busca */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </div>
        <input
          type="search"
          value={busca}
          onChange={handleBuscaChange}
          placeholder="Busque por farmácia, cuidador, curativos..."
          className="w-full h-12 pl-11 pr-11 bg-white rounded-2xl text-[14px] text-on-surface placeholder:text-on-surface-variant/70 shadow-soft border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {busca && (
          <button
            type="button"
            onClick={() => {
              setBusca("");
              carregarServicos(categoriaAtiva, "");
            }}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[18px]">cancel</span>
          </button>
        )}
      </div>

      {/* Pílulas de Filtro de Categoria */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 -mx-4 px-4 scrollbar-none">
        {categorias.map((cat) => {
          const isActive = categoriaAtiva === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoriaClick(cat.id)}
              className={`h-10 px-3.5 rounded-xl flex items-center gap-1.5 font-display font-bold text-[12px] whitespace-nowrap transition-all ${
                isActive
                  ? "bg-primary text-white shadow-md scale-102"
                  : "bg-white text-on-surface-variant border border-outline-variant/40 hover:bg-surface-container shadow-sm"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {cat.icon}
              </span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Listagem de Serviços */}
      {carregando ? (
        <div className="py-12 flex flex-col items-center justify-center text-on-surface-variant gap-2">
          <span className="material-symbols-outlined animate-spin text-[32px] text-primary">
            progress_activity
          </span>
          <span className="text-[13px]">Carregando serviços...</span>
        </div>
      ) : servicos.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-3xl border border-outline-variant/30 flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-[40px] text-on-surface-variant">
            handshake
          </span>
          <span className="font-bold text-[16px] text-on-surface">
            Nenhum serviço encontrado
          </span>
          <p className="text-[12px] text-on-surface-variant">
            Você atua na área da saúde em Altamira? Cadastre seu serviço gratuitamente.
          </p>
          <button
            onClick={onOpenSugestao}
            className="mt-1 px-4 py-2 rounded-xl bg-primary text-white font-bold text-[13px]"
          >
            Cadastrar Serviço
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {servicos.map((serv) => {
            const tagsList = serv.tags ? serv.tags.split(",").map((t) => t.trim()) : [];
            const isFarmacia = serv.categoria === "farmaceutico";

            return (
              <article
                key={serv.id}
                className="bg-white rounded-3xl p-5 shadow-card border border-outline-variant/30 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[24px]">
                        {isFarmacia ? "local_pharmacy" : "medical_services"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-display font-bold text-[16px] text-on-surface leading-tight">
                          {serv.titulo}
                        </h3>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Verificado
                        </span>
                      </div>
                      {serv.responsavel && (
                        <p className="text-[12px] text-on-surface-variant mt-0.5">
                          {serv.responsavel}
                        </p>
                      )}
                      {serv.endereco && (
                        <p className="text-[12px] text-primary flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[14px]">location_on</span>
                          <span>{serv.endereco}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {serv.horario_funcionamento && (
                    <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-lg whitespace-nowrap">
                      {serv.horario_funcionamento}
                    </span>
                  )}
                </div>

                {/* Tags de Serviços Oferecidos */}
                {tagsList.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {tagsList.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface text-[11px] font-medium flex items-center gap-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Ações */}
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={buildWhatsappServicoUrl(serv.whatsapp, serv.titulo)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-h-[46px] rounded-xl bg-[#25D366] hover:bg-[#20BA59] text-white font-bold text-[13px] flex items-center justify-center gap-2 active:scale-98 transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Chamar no WhatsApp</span>
                  </a>

                  {serv.google_maps_url && (
                    <a
                      href={serv.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-[46px] rounded-xl bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center active:scale-95 transition-transform"
                      title="Ver localização no mapa"
                    >
                      <span className="material-symbols-outlined text-[20px]">directions</span>
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Banner Comunitário para Cadastro de Novos Serviços */}
      <div className="p-5 rounded-3xl bg-surface-container-high/60 border border-outline-variant/30 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">handshake</span>
          </div>
          <h4 className="font-display font-bold text-[15px] text-on-surface">
            Fortaleça a Rede de Altamira
          </h4>
        </div>
        <p className="text-[12px] text-on-surface-variant leading-relaxed">
          Você é enfermeiro(a), fisioterapeuta, cuidador(a) ou possui farmácia em Altamira? Cadastre gratuitamente seus contatos neste guia público.
        </p>
        <button
          onClick={onOpenSugestao}
          className="h-11 mt-1 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-[13px] flex items-center justify-center gap-1.5 active:scale-98 transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>Cadastrar Meu Serviço</span>
        </button>
      </div>
    </div>
  );
}
