from contextlib import asynccontextmanager
from contextlib import contextmanager
from multiprocessing.managers import Token

from fastapi import FastAPI, HTTPException, Depends, status
from sqlmodel import Session, select
from models import Utilisateur
from models import Tache
from schemas import Taches
from database import initDb, get_session
from fastapi.middleware.cors import CORSMiddleware
import schemas
import crud


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("D2MARRAGE SERVEUR ATTENTION POUSSEZ VOUS")
    yield  # Serveur qui tourne en mode beyblade
    print("Arrêt du serveur ... Avis Interstellar ?")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def on_startup():
    # Mettre ici l'appel à la fonciton qui permet de récupérer les tâches
    initDb()

@app.get("/users", response_model=list[schemas.Utilisateur])
async def getUsers(db: Session = Depends(get_session)):
    return crud.getAllUsers(db)

@app.get("/taches", response_model=list[schemas.Taches])
async def getTaches(db: Session = Depends(get_session)):
    return crud.getAllTache(db)

@app.post("/authentification/connexion")
def connexion(data: schemas.ConnexionInscription, db: Session = Depends(get_session)):
    utilisateurs = crud.getAllUsers(db)
    utilisateurDansDB = next(
        (utilisateur for utilisateur in utilisateurs if utilisateur.nom == data.nom and utilisateur.motDePasse == data.motDePasse),
        None
    )
    if not utilisateurDansDB:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Utilisateur non existant ou mdp incorrect")
    return {
        "message": "Connexion réussie !",
        "utilisateur": {
            "id": utilisateurDansDB.id,
            "nom": utilisateurDansDB.nom
        }
    }

@app.post("/authentification/inscription")
def inscription(data: schemas.ConnexionInscription, db: Session = Depends(get_session)):
    utilisateurs = crud.getAllUsers(db)
    utilisateursDansDB = next(
        (utilisateur for utilisateur in utilisateurs if utilisateur.nom == data.nom),
        None
    )
    if utilisateursDansDB:
        raise HTTPException(status_code=400, detail="Utilisateur déjà inscrit.")
    nouvelUtilisateur = crud.insertOneUser(db, data)
    return {
        "message": "Inscription réussite",
        "utilisateur": {
            "id": nouvelUtilisateur.id,
            "nom": nouvelUtilisateur.nom
        }
    }

@app.get("/taches/user/{user_id}")
def getUserTaches(user_id: int, db: Session = Depends(get_session)):
    return crud.getTachesWithUserId(db, user_id)


@app.post("/taches/creer")
def creerTache(tache: Taches, db: Session = Depends(get_session)):
    nouvelleTache = Tache(
        titre=tache.titre,
        description=tache.description,
        statut=tache.statut,
        createurId=int(tache.createurId),
        nombreMaxParticipant=int(tache.nombreMaxParticipant),
    )

    db.add(nouvelleTache)
    db.commit()
    db.refresh(nouvelleTache)

    return {
        "message": "Tâche créée",
        "tache": nouvelleTache
    }

@app.get("/taches/{tache_id}/createur", response_model=schemas.Utilisateur)
def getCreateurTache(tache_id: int, db: Session = Depends(get_session)):
    # Étape 1 : récupérer la tâche
    tache = db.get(Tache, tache_id)
    if not tache:
        raise HTTPException(status_code=404, detail="Tâche non trouvée")

    # Étape 2 : récupérer le créateur
    createur = db.get(Utilisateur, tache.createurId)
    if not createur:
        raise HTTPException(status_code=404, detail="Créateur introuvable")

    return createur