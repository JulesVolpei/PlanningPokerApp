from sqlmodel import SQLModel, create_engine, Session
import os
from dotenv import load_dotenv

load_dotenv()
engine = create_engine(str(os.getenv("DATABASEURL")), echo=True)

def initDb():
    from models import Utilisateur, Taches, EvaluationTache, DemandeAccessTache
    SQLModel.metadata.create_all(engine)
    print("Connexion DB Réussite")

def get_session():
    with Session(engine) as session:
        yield session