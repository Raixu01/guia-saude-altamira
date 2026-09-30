import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    dados = response.json()
    assert "Guia de Saúde Altamira" in dados["projeto"]
    assert dados["municipio"] == "Altamira - PA"

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    dados = response.json()
    assert dados["status"] == "healthy"

def test_listar_especialidades():
    response = client.get("/api/especialidades")
    assert response.status_code == 200
    dados = response.json()
    assert isinstance(dados, list)
    assert len(dados) >= 6
    
    slugs = [item["slug"] for item in dados]
    assert "cardiologia" in slugs
    assert "pediatria" in slugs

def test_obter_especialidade_por_slug():
    response = client.get("/api/especialidades/cardiologia")
    assert response.status_code == 200
    dados = response.json()
    assert dados["nome"] == "Cardiologia"
    assert dados["total_profissionais"] >= 2

def test_listar_profissionais_com_locais():
    response = client.get("/api/profissionais")
    assert response.status_code == 200
    dados = response.json()
    assert isinstance(dados, list)
    assert len(dados) >= 8

    primeiro = dados[0]
    assert "nome" in primeiro
    assert "registro_conselho" in primeiro
    assert "locais_atendimento" in primeiro
    assert isinstance(primeiro["locais_atendimento"], list)

def test_filtrar_profissionais_por_especialidade():
    response = client.get("/api/profissionais?especialidade_id=cardiologia")
    assert response.status_code == 200
    dados = response.json()
    assert len(dados) >= 2
    nomes = [p["nome"] for p in dados]
    assert "Dr. Francisco Schucrutz" in nomes

def test_buscar_profissional_por_nome():
    response = client.get("/api/profissionais?busca=Schucrutz")
    assert response.status_code == 200
    dados = response.json()
    assert len(dados) == 1
    assert dados[0]["nome"] == "Dr. Francisco Schucrutz"
    assert dados[0]["registro_conselho"] == "CRM-PA 5892"
    assert len(dados[0]["locais_atendimento"]) > 0
    assert dados[0]["locais_atendimento"][0]["estabelecimento"]["whatsapp"] == "5593999990001"

def test_listar_exames():
    response = client.get("/api/exames")
    assert response.status_code == 200
    dados = response.json()
    assert isinstance(dados, list)
    assert len(dados) >= 15

def test_filtrar_exames_por_letra():
    response = client.get("/api/exames?letra=E")
    assert response.status_code == 200
    dados = response.json()
    assert len(dados) >= 3
    for ex in dados:
        assert ex["letra_inicial"] == "E"
    
    nomes = [e["nome"] for e in dados]
    assert any("Ecocardiograma" in n for n in nomes)

def test_indice_alfabetico_exames():
    response = client.get("/api/exames/indice-alfabetico")
    assert response.status_code == 200
    dados = response.json()
    assert isinstance(dados, dict)
    assert "E" in dados
    assert dados["E"] >= 3

def test_listar_servicos_saude():
    response = client.get("/api/servicos")
    assert response.status_code == 200
    dados = response.json()
    assert len(dados) >= 6

    # Filtro por categoria farmaceutico
    resp_farmacia = client.get("/api/servicos?categoria=farmaceutico")
    assert resp_farmacia.status_code == 200
    dados_farmacia = resp_farmacia.json()
    assert len(dados_farmacia) >= 2
    assert any("Farmácia São Lucas" in f["titulo"] for f in dados_farmacia)

def test_enviar_sugestao_correcao():
    payload = {
        "tipo_entidade": "profissional",
        "mensagem": "O Dr. Francisco agora também atende nas quintas-feiras à tarde.",
        "contato_colaborador": "cidadao@altamira.com"
    }
    response = client.post("/api/sugestoes", json=payload)
    assert response.status_code == 201
    dados = response.json()
    assert dados["id"] is not None
    assert dados["status"] == "pendente"

def test_enviar_sugestao_invalida():
    payload = {
        "tipo_entidade": "profissional",
        "mensagem": "  "
    }
    response = client.post("/api/sugestoes", json=payload)
    assert response.status_code == 400
