import os
import sys

# Configura encoding UTF-8 no terminal Windows
if sys.platform.startswith("win"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

from app.database import SessionLocal, Base, engine
from app.services.ingestion import (
    carregar_estabelecimentos,
    carregar_profissionais_real,
    carregar_exames_real,
    carregar_planilha_servicos,
)

def run_ingestion():
    print("=" * 65)
    print("[*] INICIANDO INGESTAO DE BASES REAIS - GUIA DE SAUDE ALTAMIRA")
    print("=" * 65)

    # Recria tabelas com schema atualizado
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(base_dir, "data")

    csv_estabelecimentos = os.path.join(data_dir, "estabelecimentos.csv")
    csv_profissionais = os.path.join(data_dir, "profissionais.csv")
    csv_exames = os.path.join(data_dir, "exames.csv")
    csv_servicos = os.path.join(data_dir, "sample_planilha_servicos.csv")

    try:
        # 1. Estabelecimentos
        if os.path.exists(csv_estabelecimentos):
            print(f"\n[+] 1. Ingestao de Estabelecimentos: {csv_estabelecimentos}")
            s_est = carregar_estabelecimentos(csv_estabelecimentos, db)
            print(f"   [OK] Estabelecimentos novos: {s_est['estabelecimentos_novos']}")
            print(f"   [OK] Estabelecimentos atualizados: {s_est['estabelecimentos_atualizados']}")
        else:
            print(f"[WARN] Arquivo nao encontrado: {csv_estabelecimentos}")

        # 2. Profissionais
        if os.path.exists(csv_profissionais):
            print(f"\n[+] 2. Ingestao de Profissionais & Especialidades: {csv_profissionais}")
            s_prof = carregar_profissionais_real(csv_profissionais, db)
            print(f"   [OK] Especialidades novas: {s_prof['especialidades']}")
            print(f"   [OK] Profissionais novos: {s_prof['profissionais']}")
            print(f"   [OK] Vinculos profissional-clinica: {s_prof['vinculos']}")
        else:
            print(f"[WARN] Arquivo nao encontrado: {csv_profissionais}")

        # 3. Exames
        if os.path.exists(csv_exames):
            print(f"\n[+] 3. Ingestao do Catalogo de Exames: {csv_exames}")
            s_exam = carregar_exames_real(csv_exames, db)
            print(f"   [OK] Exames novos: {s_exam['exames']}")
            print(f"   [OK] Vinculos exame-estabelecimento: {s_exam['vinculos']}")
        else:
            print(f"[WARN] Arquivo nao encontrado: {csv_exames}")

        # 4. Serviços de Cuidados & Farmácias
        if os.path.exists(csv_servicos):
            print(f"\n[+] 4. Ingestao de Servicos de Saude Comunitarios: {csv_servicos}")
            s_serv = carregar_planilha_servicos(csv_servicos, db)
            print(f"   [OK] Servicos de saude: {s_serv['servicos']}")
        else:
            print(f"[WARN] Arquivo nao encontrado: {csv_servicos}")

        print("\n" + "=" * 65)
        print("[SUCCESS] CARGA DAS 3 BASES REAIS CONCLUIDA COM SUCESSO NO BANCO!")
        print("=" * 65)

    except Exception as e:
        print(f"\n[ERRO] DURANTE A INGESTAO: {e}", file=sys.stderr)
        db.rollback()
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    run_ingestion()
