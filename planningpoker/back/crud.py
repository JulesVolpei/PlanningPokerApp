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