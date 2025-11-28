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

#TO DO:
# def createTache() :
#     TO DO

# def getTache() :
#     TO DO

# def updateTache() :
#     TO DO

# def deleteTache() :
#     TO DO