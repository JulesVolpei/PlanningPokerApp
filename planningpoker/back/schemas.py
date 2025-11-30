from pydantic import BaseModel

class Utilisateur(BaseModel):
    id: int
    nom: str
    motDePasse: str

    class Config:
        from_attributes = True

class Taches(BaseModel):
    titre: str
    description: str
    statut: str
    createurId: int
    nombreMaxParticipant: int

    class Config:
        from_attributes = True

class EvaluationTache(BaseModel):
    id: int
    utilisateurId: int
    tacheId: int
    valeur: float

    class Config:
        from_attributes = True

class DemandeAccessTache(BaseModel):
    id: int
    utilisateurId: int
    tacheId: int
    statut: str

    class Config:
        from_attributes = True

class ConnexionInscription(BaseModel):
    nom: str
    motDePasse: str