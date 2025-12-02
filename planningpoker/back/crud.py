from sqlalchemy.orm import Session
import models, schemas
from sqlmodel import select

def getAllUsers(db: Session):
    return db.exec(select(models.Utilisateur)).all()

def getAllTache(db: Session):
    return db.exec(select(models.Tache)).all()

def insertOneUser(db: Session, nouvelUtilisateur: schemas.ConnexionInscription):
    utilisateurBD = models.Utilisateur(nom=nouvelUtilisateur.nom, motDePasse=nouvelUtilisateur.motDePasse)
    db.add(utilisateurBD)
    db.commit()
    db.refresh(utilisateurBD)
    return utilisateurBD

def getTachesWithUserId(db: Session, userId: int):
    statement = select(models.Tache).where(models.Tache.createurId == userId)
    return db.exec(statement).all()

def createTache(db: Session, nouvelleTache: schemas.TacheCreate):
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
    statement = select(models.Tache).where(models.Tache.id == tacheId)
    return db.exec(statement).first()


def updateTache(db: Session, tacheId: int, tacheUpdate: schemas.TacheUpdate):
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
    tacheBD = db.get(models.Tache, tacheId)
    if not tacheBD:
        return None

    db.delete(tacheBD)
    db.commit()
    return True

def getUserById(db: Session, user_id: int):
    return db.get(models.Utilisateur, user_id)