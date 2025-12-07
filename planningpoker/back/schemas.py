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

class TacheCreate(BaseModel):
    titre: str
    description: str
    createurId: int
    nombreMaxParticipant: int = 5  # valeur par défaut
    statut: str = "ouverte"


class TacheUpdate(BaseModel):
    titre: str | None = None
    description: str | None = None
    statut: str | None = None
    nombreMaxParticipant: int | None = None

class DemandeAccessTacheCreate(BaseModel):
    utilisateurId: int
    tacheId: int

class DemandeAccessTacheDetail(BaseModel):
    id: int
    utilisateurId: int
    tacheId: int
    statut: str
    utilisateur: Utilisateur
    tache: Taches

    class Config:
        from_attributes = True
