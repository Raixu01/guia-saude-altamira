from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Estabelecimento
from app.schemas import EstabelecimentoResponse, EstabelecimentoCreate

router = APIRouter(prefix="/estabelecimentos", tags=["Estabelecimentos"])

@router.get("", response_model=List[EstabelecimentoResponse])
def listar_estabelecimentos(
    tipo: Optional[str] = Query(None, description="Filtrar por tipo: clinica, hospital, laboratorio, farmacia"),
    busca: Optional[str] = Query(None, description="Buscar por nome, bairro ou endereço"),
    db: Session = Depends(get_db),
):
    query = db.query(Estabelecimento)
    if tipo:
        query = query.filter(Estabelecimento.tipo == tipo.lower().strip())
    if busca:
        termo = f"%{busca.strip()}%"
        query = query.filter(
            (Estabelecimento.nome.ilike(termo))
            | (Estabelecimento.bairro.ilike(termo))
            | (Estabelecimento.endereco.ilike(termo))
        )
    return query.order_by(Estabelecimento.nome).all()

@router.get("/{id}", response_model=EstabelecimentoResponse)
def obter_estabelecimento(id: str, db: Session = Depends(get_db)):
    est = db.query(Estabelecimento).filter(Estabelecimento.id == id).first()
    if not est:
        raise HTTPException(status_code=404, detail="Estabelecimento não encontrado")
    return est

@router.post("", response_model=EstabelecimentoResponse, status_code=201)
def criar_estabelecimento(dados: EstabelecimentoCreate, db: Session = Depends(get_db)):
    novo = Estabelecimento(**dados.model_dump())
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo
