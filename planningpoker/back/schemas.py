from pydantic import BaseModel

class Utilisateur(BaseModel):
    id: int
    nom: str
    motDePasse: str

    class Config:
        from_attributes = True