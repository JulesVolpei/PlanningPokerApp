from dataclasses import Field

from pydantic import BaseModel
from typing import Optional

class Utilisateur(BaseModel):
    id: int
    nom: str
    motDePasse: str

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