from sqlmodel import SQLModel, create_engine, Session
import os
from dotenv import load_dotenv
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()
engine = create_engine(str(os.getenv("DATABASEURL")), echo=True)

def initDb():
    from models import Utilisateur, Tache, EvaluationTache, DemandeAccessTache
    SQLModel.metadata.create_all(engine)
    print("Connexion DB Réussite")

def get_session():
    with Session(engine) as session:
        yield session

