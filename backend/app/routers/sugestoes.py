from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import SugestaoCorrecao
from app.schemas import SugestaoCorrecaoCreate, SugestaoCorrecaoResponse

router = APIRouter(prefix="/sugestoes", tags=["Sugestões & Colaboração Cidadã"])

@router.post("", response_model=SugestaoCorrecaoResponse, status_code=201)
def enviar_sugestao(dados: SugestaoCorrecaoCreate, db: Session = Depends(get_db)):
    """
    Registra uma sugestão cidadã de correção de número de WhatsApp,
    novo médico ou serviço não cadastrado.
    """
    if not dados.mensagem or len(dados.mensagem.strip()) < 3:
        raise HTTPException(
            status_code=400, detail="A mensagem da sugestão deve conter pelo menos 3 caracteres."
        )

    nova = SugestaoCorrecao(
        tipo_entidade=dados.tipo_entidade,
        entidade_id=dados.entidade_id,
        mensagem=dados.mensagem.strip(),
        contato_colaborador=dados.contato_colaborador.strip() if dados.contato_colaborador else None,
        status="pendente",
    )
    db.add(nova)
    db.commit()
    db.refresh(nova)
    return nova

@router.get("", response_model=List[SugestaoCorrecaoResponse])
def listar_sugestoes(
    status: Optional[str] = Query(None, description="Filtrar por status: pendente, analisado, incorporado"),
    db: Session = Depends(get_db),
):
    query = db.query(SugestaoCorrecao)
    if status:
        query = query.filter(SugestaoCorrecao.status == status)
    return query.order_by(SugestaoCorrecao.created_at.desc()).all()
