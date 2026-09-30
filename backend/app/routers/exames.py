from typing import List, Optional, Dict
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from app.database import get_db
from app.models import Exame, ExameEstabelecimento, Estabelecimento
from app.schemas import ExameResponse, ExameCreate, LocalExameResponse, EstabelecimentoResponse

router = APIRouter(prefix="/exames", tags=["Exames"])

def _serializar_exame(ex: Exame) -> ExameResponse:
    locais = []
    for ee in ex.estabelecimentos:
        if ee.estabelecimento:
            locais.append(
                LocalExameResponse(
                    estabelecimento=EstabelecimentoResponse.model_validate(ee.estabelecimento),
                    status_confirmacao=ee.status_confirmacao,
                    observacoes=ee.observacoes,
                )
            )
    return ExameResponse(
        id=ex.id,
        nome=ex.nome,
        categoria=ex.categoria,
        letra_inicial=ex.letra_inicial.upper(),
        preparo_basico=ex.preparo_basico,
        estabelecimentos=locais,
    )

@router.get("", response_model=List[ExameResponse])
def listar_exames(
    letra: Optional[str] = Query(None, description="Filtrar por letra inicial do exame (A-Z)"),
    busca: Optional[str] = Query(None, description="Buscar por nome do exame"),
    categoria: Optional[str] = Query(None, description="Filtrar por categoria (imagem, sangue, cardiologico)"),
    db: Session = Depends(get_db),
):
    """
    Retorna o catálogo de exames médicos ordenados alfabeticamente,
    com suporte a filtro por letra inicial (para o carrossel A-Z) e busca rápida.
    """
    query = (
        db.query(Exame)
        .options(
            joinedload(Exame.estabelecimentos).joinedload(ExameEstabelecimento.estabelecimento)
        )
    )

    if letra:
        query = query.filter(Exame.letra_inicial.ilike(letra.strip()[:1]))

    if busca:
        query = query.filter(Exame.nome.ilike(f"%{busca.strip()}%"))

    if categoria:
        query = query.filter(Exame.categoria == categoria.strip().lower())

    exames = query.order_by(Exame.nome).all()
    return [_serializar_exame(e) for e in exames]

@router.get("/indice-alfabetico", response_model=Dict[str, int])
def obter_indice_alfabetico(db: Session = Depends(get_db)):
    """
    Retorna o dicionário de letras A-Z com a quantidade de exames cadastrados em cada uma.
    Útil para renderizar o carrossel de letras com destaque e badge de contagem.
    """
    resultados = (
        db.query(Exame.letra_inicial, func.count(Exame.id))
        .group_by(Exame.letra_inicial)
        .all()
    )
    indice = {letra.upper(): contagem for letra, contagem in resultados if letra}
    return indice

@router.get("/{id}", response_model=ExameResponse)
def obter_exame(id: str, db: Session = Depends(get_db)):
    exame = (
        db.query(Exame)
        .options(
            joinedload(Exame.estabelecimentos).joinedload(ExameEstabelecimento.estabelecimento)
        )
        .filter(Exame.id == id)
        .first()
    )
    if not exame:
        raise HTTPException(status_code=404, detail="Exame não encontrado")
    return _serializar_exame(exame)

@router.post("", response_model=ExameResponse, status_code=201)
def criar_exame(dados: ExameCreate, db: Session = Depends(get_db)):
    novo = Exame(
        nome=dados.nome,
        categoria=dados.categoria,
        letra_inicial=dados.letra_inicial.upper() if dados.letra_inicial else dados.nome[0].upper(),
        preparo_basico=dados.preparo_basico,
    )
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return _serializar_exame(novo)
