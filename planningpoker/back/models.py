from pydantic import BaseModel

from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Utilisateur(Base):
    __tablename__ = "utilisateurs"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    nom = Column(String)
    motDePasse = Column(String)

class Taches(BaseModel):
    id: int
    titre: str
    description: str
    statut: str
    createurId: int
    nombreMaxParticipant: int

class EvaluationTache(BaseModel):
    id: int
    utilisateurId: int
    tacheId: int
    valeur: float

class DemandeAccessTache(BaseModel):
    id: int
    utilisateurId: int
    tacheId: int
    statut: str