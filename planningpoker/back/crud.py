from sqlalchemy.orm import Session
import models, schemas
from sqlmodel import select

def getAllUsers(db: Session):
    return db.exec(select(models.Utilisateur)).all()
