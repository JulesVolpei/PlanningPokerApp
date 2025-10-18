from pydantic import BaseModel

from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Utilisateur(Base):
    __tablename__ = "utilisateurs"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    nom = Column(String)
    motDePasse = Column(String)

    tacheCreee = relationship("Tache", back_populates="createur")
    demandeAccess = relationship("DemandeAccessTache", back_populates="utilisateur")
    evaluations = relationship("EvaluationTache", back_populates="utilisateur")

# -----------------------
# Table Tache
# -----------------------
class Tache(Base):
    __tablename__ = "taches"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    titre = Column(String, nullable=False)
    description = Column(String)
    statut = Column(String, default="ouverte")
    createurId = Column(Integer, ForeignKey("utilisateurs.id"))
    nombreMaxParticipant = Column(Integer, default=5)

    # Relations
    createur = relationship("Utilisateur", back_populates="tacheCreee")
    demandeAccess = relationship("DemandeAccessTache", back_populates="tache")
    evaluations = relationship("EvaluationTache", back_populates="tache")


# -----------------------
# Table EvaluationTache
# -----------------------
class EvaluationTache(Base):
    __tablename__ = "evaluationTache"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    utilisateurId = Column(Integer, ForeignKey("utilisateurs.id"))
    tacheId = Column(Integer, ForeignKey("taches.id"))
    valeur = Column(Float, nullable=False)

    # Relations
    utilisateur = relationship("Utilisateur", back_populates="evaluations")
    tache = relationship("Tache", back_populates="evaluations")


# -----------------------
# Table DemandeAccessTache
# -----------------------
class DemandeAccessTache(Base):
    __tablename__ = "demandeAccessTache"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    utilisateurId = Column(Integer, ForeignKey("utilisateurs.id"))
    tacheId = Column(Integer, ForeignKey("taches.id"))
    statut = Column(String, default="enAttente")

    # Relations
    utilisateur = relationship("Utilisateur", back_populates="demandeAccess")
    tache = relationship("Tache", back_populates="demandeAccess")