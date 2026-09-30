from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import ServicoSaude
from app.schemas import ServicoSaudeResponse, ServicoSaudeCreate

router = APIRouter(prefix="/servicos", tags=["Serviços de Saúde"])

@router.get("", response_model=List[ServicoSaudeResponse])
def listar_servicos(
    categoria: Optional[str] = Query(
        None,
        description="Filtrar por categoria: 'farmaceutico', 'enfermagem', 'cuidados', 'fisioterapia'",
    ),
    busca: Optional[str] = Query(None, description="Buscar por nome, tag ou responsável"),
    db: Session = Depends(get_db),
):
    query = db.query(ServicoSaude)
    if categoria and categoria.lower() != "todos":
        query = query.filter(ServicoSaude.categoria == categoria.lower().strip())

    if busca:
        termo = f"%{busca.strip()}%"
        query = query.filter(
            (ServicoSaude.titulo.ilike(termo))
            | (ServicoSaude.tags.ilike(termo))
            | (ServicoSaude.responsavel.ilike(termo))
            | (ServicoSaude.bairro.ilike(termo))
        )

    servicos = query.order_by(ServicoSaude.titulo).all()
    return servicos

@router.get("/{id}", response_model=ServicoSaudeResponse)
def obter_servico(id: str, db: Session = Depends(get_db)):
    servico = db.query(ServicoSaude).filter(ServicoSaude.id == id).first()
    if not servico:
        raise HTTPException(status_code=404, detail="Serviço de saúde não encontrado")
    return servico

@router.post("", response_model=ServicoSaudeResponse, status_code=201)
def cadastrar_servico(dados: ServicoSaudeCreate, db: Session = Depends(get_db)):
    novo = ServicoSaude(**dados.model_dump())
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo
