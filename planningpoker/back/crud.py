"""
Fonctions CRUD de l'application.

Ce module contient les fonctions permettant d'effectuer
les opérations de base sur la base de données :
- création
- lecture
- mise à jour
- suppression

Ces fonctions sont utilisées par les routes FastAPI
définies dans le fichier ``main.py``.
"""

from sqlalchemy.orm import Session
import models, schemas
from sqlmodel import select
import numpy as np
from passlib.context import CryptContext

mdpContext = CryptContext(schemes=["sha256_crypt"], deprecated="auto")

def verifierMDPEnClair(mdp, mdpHashe):
    """
    Vérifie si un mot de passe en clair correspond au hash en BD.

    :return: Un booléen permettant de savoir si les deux mots de passe sont similaires.
    :rtype: bool
    """
    return mdpContext.verify(mdp, mdpHashe)

def hashMDP(mdp):
    """
    Génère un hash sécurisé à partir d'un mot de passe en clair.

    :return: Une chaine de caractères correspondant au mot de passe hashé.
    :rtype: str
    """
    return mdpContext.hash(mdp)

def getAllUsers(db: Session):
    """
    Récupère l'ensemble des utilisateurs enregistrés.

    :param db: Session active de base de données.
    :type db: Session
    :return: Liste de tous les utilisateurs.
    :rtype: list[models.Utilisateur]
    """
    return db.exec(select(models.Utilisateur)).all()

def getAllTache(db: Session):
    """
    Récupère l'ensemble des tâches présentes dans la base de données.

    :param db: Session active de base de données.
    :type db: Session
    :return: Liste de toutes les tâches.
    :rtype: list[models.Tache]
    """
    return db.exec(select(models.Tache)).all()

def insertOneUser(db: Session, nouvelUtilisateur: schemas.ConnexionInscription):
    """
    Insère un nouvel utilisateur dans la base de données.

    :param db: Session active de base de données.
    :type db: Session
    :param nouvelUtilisateur: Données de l'utilisateur à créer.
    :type nouvelUtilisateur: ConnexionInscription
    :return: Utilisateur créé.
    :rtype: models.Utilisateur
    """
    utilisateurBD = models.Utilisateur(nom=nouvelUtilisateur.nom, motDePasse=hashMDP(nouvelUtilisateur.motDePasse))
    db.add(utilisateurBD)
    db.commit()
    db.refresh(utilisateurBD)
    return utilisateurBD

def getTachesWithUserId(db: Session, userId: int):
    """
    Récupère toutes les tâches créées par un utilisateur donné.

    :param db: Session active de base de données.
    :type db: Session
    :param userId: Identifiant de l'utilisateur.
    :type userId: int
    :return: Liste des tâches créées par l'utilisateur.
    :rtype: list[models.Tache]
    """
    statement = select(models.Tache).where(models.Tache.createurId == userId)
    return db.exec(statement).all()

def createTache(db: Session, nouvelleTache: schemas.TacheCreate):
    """
    Crée une nouvelle tâche dans la base de données.

    :param db: Session active de base de données.
    :type db: Session
    :param nouvelleTache: Données nécessaires à la création de la tâche.
    :type nouvelleTache: TacheCreate
    :return: Tâche créée.
    :rtype: models.Tache
    """
    tacheBD = models.Tache(
        titre=nouvelleTache.titre,
        description=nouvelleTache.description,
        statut=nouvelleTache.statut,
        createurId=nouvelleTache.createurId,
        nombreMaxParticipant=nouvelleTache.nombreMaxParticipant
    )

    db.add(tacheBD)
    db.commit()
    db.refresh(tacheBD)
    return tacheBD


def getTache(db: Session, tacheId: int):
    """
    Récupère une tâche à partir de son identifiant.

    :param db: Session active de base de données.
    :type db: Session
    :param tacheId: Identifiant de la tâche.
    :type tacheId: int
    :return: Tâche correspondante ou ``None`` si elle n'existe pas.
    :rtype: models.Tache | None
    """
    statement = select(models.Tache).where(models.Tache.id == tacheId)
    return db.exec(statement).first()


def updateTache(db: Session, tacheId: int, tacheUpdate: schemas.TacheUpdate):
    """
    Met à jour une tâche existante.

    Seuls les champs fournis dans ``tacheUpdate`` sont modifiés.

    :param db: Session active de base de données.
    :type db: Session
    :param tacheId: Identifiant de la tâche à modifier.
    :type tacheId: int
    :param tacheUpdate: Données de mise à jour de la tâche.
    :type tacheUpdate: TacheUpdate
    :return: Tâche mise à jour ou ``None`` si elle n'existe pas.
    :rtype: models.Tache | None
    """
    tacheBD = db.get(models.Tache, tacheId)
    if not tacheBD:
        return None

    update_data = tacheUpdate.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(tacheBD, key, value)

    db.commit()
    db.refresh(tacheBD)
    return tacheBD


def deleteTache(db: Session, tacheId: int):
    """
    Supprime une tâche de la base de données.

    :param db: Session active de base de données.
    :type db: Session
    :param tacheId: Identifiant de la tâche à supprimer.
    :type tacheId: int
    :return: ``True`` si la suppression a réussi, ``None`` sinon.
    :rtype: bool | None
    """
    tacheBD = db.get(models.Tache, tacheId)
    if not tacheBD:
        return None

    db.delete(tacheBD)
    db.commit()
    return True

def getUserById(db: Session, user_id: int):
    """
    Récupère un utilisateur à partir de son identifiant.

    :param db: Session active de base de données.
    :type db: Session
    :param user_id: Identifiant de l'utilisateur.
    :type user_id: int
    :return: Utilisateur correspondant ou ``None`` s'il n'existe pas.
    :rtype: models.Utilisateur | None
    """
    return db.get(models.Utilisateur, user_id)

def createEvaluation(db: Session, evaluation: schemas.EvaluationCreate):
    dbEvaluation = models.EvaluationTache(
        utilisateurId=evaluation.utilisateurId,
        tacheId=evaluation.tacheId,
        valeur=evaluation.valeur
    )
    db.add(dbEvaluation)
    db.commit()
    db.refresh(dbEvaluation)
    tache = db.query(models.Tache).filter(models.Tache.id == evaluation.tacheId).first()

    if tache:
        cmptVotes = db.query(models.EvaluationTache).filter(models.EvaluationTache.tacheId == evaluation.tacheId).count()

        if cmptVotes >= tache.nombreMaxParticipant:
            print(f"Tâche #{tache.id} complète ! Archivage de la tâche !")
            tache.statut = "archivee"
            db.commit()
            db.refresh(tache)
    return dbEvaluation

def calculNoteFinale(valeurs_votes: list[str], methode: str):
    notes = [int(i) for i in valeurs_votes if i.isdigit()]
    if not notes:
        return {
            "etat": "Echec",
            "message": "Aucun vote."
        }
    arrayNotes = np.array(notes)
    if methode == "Unanimité":
        if len(set(notes)) == 1:
            return {
                "etat": "Reussite",
                "message": str(notes[0])
            }
        else:
            return {
                "etat": "Echec",
                "message": "Aucune unanimité trouvée."
            }
    if methode == "Moyenne":
        return {
            "etat": "Reussite",
            "message": str(round(np.mean(arrayNotes), 1))
        }
    elif methode == "Médiane":
        return {
            "etat": "Reussite",
            "message": str(np.median(arrayNotes))
        }
    elif methode == "Majorité absolue":
        valeurs, comptes = np.unique(arrayNotes, return_counts=True)
        indexMax = np.argmax(comptes)
        topVote = valeurs[indexMax]
        cmpt = comptes[indexMax]
        if cmpt > len(notes) / 2:
            return {
                "etat": "Reussite",
                "message": str(topVote)
            }
        return {
            "etat": "Echec",
            "messsage": "Désaccord (Pas de majorité absolue)"
        }
    elif methode == "Majorité relative":
        valeurs, comptes = np.unique(arrayNotes, return_counts=True)
        return {
            "etat": "Reussite",
            "message": str(valeurs[np.argmax(comptes)])
        }
    return {
        "etat": "Echec",
        "message": "Indéfini."
    }

def getTachesArchiveesCreateur(db: Session, createur_id: int):
    taches = db.query(models.Tache).filter(models.Tache.createurId == createur_id).all()
    tachesArchivees = []
    for tache in taches:
        cmptVotes = len(tache.votes)
        if cmptVotes >= tache.nombreMaxParticipant and tache.nombreMaxParticipant > 0:
            valeurs = [i.valeur for i in tache.votes]
            noteFinale = calculNoteFinale(valeurs, tache.methodeEvaluation)
            dictTaches = tache.__dict__.copy()
            dictTaches['noteFinale'] = noteFinale
            dictTaches['statut'] = 'archivee'
            tachesArchivees.append(dictTaches)
    return tachesArchivees

def relancerTacheArchivee(db: Session, tache_id: int):
    tache = db.query(models.Tache).filter(models.Tache.id == tache_id).first()
    if not tache:
        return None
    tache.statut = "ouverte"
    db.query(models.EvaluationTache).filter(models.EvaluationTache.tacheId == tache_id).delete(synchronize_session=False)

    db.commit()
    db.refresh(tache)
    return tache