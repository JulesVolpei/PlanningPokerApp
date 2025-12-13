from pydantic import BaseModel

class Utilisateur(BaseModel):
    id: int
    nom: str
    motDePasse: str

    class Config:
        from_attributes = True

class EvaluationTache(BaseModel):
    id: int
    utilisateurId: int
    tacheId: int
    valeur: str

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

class Taches(BaseModel):
    id: int
    titre: str
    description: str
    statut: str
    createurId: int
    nombreMaxParticipant: int
    methodeEvaluation: str
    participantsActuels: int = 1
    nombreVotes: int = 0

    class Config:
        from_attributes = True

class TacheCreate(BaseModel):
    titre: str
    description: str
    createurId: int
    nombreMaxParticipant: int = 5
    statut: str = "ouverte"
    methodeEvaluation: str = "Moyenne"

class TacheUpdate(BaseModel):
    titre: str | None = None
    description: str | None = None
    statut: str | None = None
    nombreMaxParticipant: int | None = None
    methodeEvaluation: str | None = None

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

class EvaluationCreate(BaseModel):
    utilisateurId: int
    tacheId: int
    valeur: str