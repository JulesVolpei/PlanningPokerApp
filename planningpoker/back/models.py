from pydantic import BaseModel

from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Utilisateur(Base):
    """
    Modèle représentant un utilisateur de l'application.

    Cette classe correspond à la table ``utilisateurs`` de la base de données.
    Elle stocke les informations relatives à chaque utilisateur, notamment son
    identifiant, son nom et son mot de passe. Elle inclut également les relations
    vers les tâches créées, les demandes d'accès et les évaluations réalisées.

    :param id: Identifiant unique de l'utilisateur.
    :type id: int
    :param nom: Nom de l'utilisateur (utilisé pour l’authentification).
    :type nom: str
    :param motDePasse: Mot de passe associé au compte utilisateur.
    :type motDePasse: str

    :relationship tacheCreee: Liste des tâches créées par cet utilisateur.
    :relationship demandeAccess: Demandes d'accès envoyées par cet utilisateur.
    :relationship evaluations: Évaluations laissées par cet utilisateur.

    """
    __tablename__ = "utilisateurs"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    nom = Column(String)
    motDePasse = Column(String)

    tacheCreee = relationship("Tache", back_populates="createur")
    demandeAccess = relationship("DemandeAccessTache", back_populates="utilisateur")
    evaluations = relationship("EvaluationTache", back_populates="utilisateur")

class Tache(Base):
    """
    Modèle représentant une tâche créée par un utilisateur.

    Cette classe correspond à la table ``taches`` et contient toutes les
    informations liées à une tâche : titre, description, statut, créateur et
    nombre maximal de participants. Elle maintient également les relations avec
    les demandes d'accès et les évaluations.

    :param id: Identifiant unique de la tâche.
    :type id: int
    :param titre: Titre de la tâche (obligatoire).
    :type titre: str
    :param description: Description détaillée de la tâche.
    :type description: str | None
    :param statut: Statut actuel de la tâche (par défaut ``"ouverte"``).
    :type statut: str
    :param createurId: Identifiant de l'utilisateur ayant créé la tâche.
    :type createurId: int
    :param nombreMaxParticipant: Nombre maximal de participants autorisés.
    :type nombreMaxParticipant: int

    :relationship createur: Utilisateur ayant créé la tâche.
    :relationship demandeAccess: Demandes d'accès associées à la tâche.
    :relationship evaluations: Évaluations de la tâche.

    """
    __tablename__ = "taches"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    titre = Column(String, nullable=False)
    description = Column(String)
    statut = Column(String, default="ouverte")
    createurId = Column(Integer, ForeignKey("utilisateurs.id"))
    nombreMaxParticipant = Column(Integer, default=5)
    methodeEvaluation = Column(String, default="Moyenne")

    # Relations
    createur = relationship("Utilisateur", back_populates="tacheCreee")
    demandeAccess = relationship("DemandeAccessTache", back_populates="tache")
    evaluations = relationship("EvaluationTache", back_populates="tache")


class EvaluationTache(Base):
    """
    Modèle représentant une évaluation laissée par un utilisateur sur une tâche.

    La table ``evaluationTache`` fait le lien entre un utilisateur et une tâche
    évaluée. Chaque évaluation possède une valeur numérique (ex. une note).

    :param id: Identifiant unique de l'évaluation.
    :type id: int
    :param utilisateurId: Identifiant de l'utilisateur ayant laissé l'évaluation.
    :type utilisateurId: int
    :param tacheId: Identifiant de la tâche évaluée.
    :type tacheId: int
    :param valeur: Valeur de l'évaluation (note).
    :type valeur: float

    :relationship utilisateur: Utilisateur ayant effectué l’évaluation.
    :relationship tache: Tâche évaluée.

    """
    __tablename__ = "evaluationTache"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    utilisateurId = Column(Integer, ForeignKey("utilisateurs.id"))
    tacheId = Column(Integer, ForeignKey("taches.id"))
    valeur = Column(String, nullable=False)

    # Relations
    utilisateur = relationship("Utilisateur", back_populates="evaluations")
    tache = relationship("Tache", back_populates="evaluations")

class DemandeAccessTache(Base):
    """
    Modèle représentant une demande d'accès d'un utilisateur à une tâche.

    Cette classe correspond à la table ``demandeAccessTache`` et enregistre
    les demandes d'accès envoyées par les utilisateurs souhaitant participer
    à une tâche. Chaque demande est associée à un statut (par défaut
    ``"enAttente"``).

    :param id: Identifiant unique de la demande.
    :type id: int
    :param utilisateurId: Identifiant de l'utilisateur ayant formulé la demande.
    :type utilisateurId: int
    :param tacheId: Identifiant de la tâche ciblée par la demande.
    :type tacheId: int
    :param statut: Statut actuel de la demande (ex. ``enAttente``).
    :type statut: str

    :relationship utilisateur: Utilisateur ayant effectué la demande d'accès.
    :relationship tache: Tâche visée par la demande.
    
    """
    __tablename__ = "demandeAccessTache"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    utilisateurId = Column(Integer, ForeignKey("utilisateurs.id"))
    tacheId = Column(Integer, ForeignKey("taches.id"))
    statut = Column(String, default="enAttente")

    # Relations
    utilisateur = relationship("Utilisateur", back_populates="demandeAccess")
    tache = relationship("Tache", back_populates="demandeAccess")