from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.routers import (
    especialidades,
    profissionais,
    exames,
    servicos,
    estabelecimentos,
    sugestoes,
)

# Cria as tabelas do banco de dados automaticamente se não existirem
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=(
        "API Core do Guia de Saúde Altamira (PA). "
        "Fornece catálogo de especialidades médicas, médicos com WhatsApp, "
        "exames organizados de A-Z com locais de realização e serviços comunitários."
    ),
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configuração de CORS para permitir integração com frontend local ou hospedado
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção pode ser restringido por variável de ambiente
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registro das rotas
app.include_router(especialidades.router, prefix=settings.API_V1_STR)
app.include_router(profissionais.router, prefix=settings.API_V1_STR)
app.include_router(exames.router, prefix=settings.API_V1_STR)
app.include_router(servicos.router, prefix=settings.API_V1_STR)
app.include_router(estabelecimentos.router, prefix=settings.API_V1_STR)
app.include_router(sugestoes.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "projeto": settings.PROJECT_NAME,
        "versao": settings.VERSION,
        "status": "online",
        "docs": "/docs",
        "municipio": "Altamira - PA",
    }

@app.get(f"{settings.API_V1_STR}/health")
def health_check():
    return {"status": "healthy", "database": "connected"}
