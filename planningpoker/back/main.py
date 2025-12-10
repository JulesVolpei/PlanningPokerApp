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
    """
    Cette fonction exécute l'initialisation de la base de données au lancement du serveur via `initDb()`.
    
    """
    # Mettre ici l'appel à la fonciton qui permet de récupérer les tâches
    initDb()

@app.get("/users", response_model=list[schemas.Utilisateur])
async def getUsers(db: Session = Depends(get_session)):
    """
    Cette fonction permet de récupérer tous les utilisateurs présents dans la base de données.

    :param db: Session de connexion à la base de données.
    :type db: Session
    :return: Liste des utilisateurs enregistrés.
    :rtype: list[Utilisateur]
    
    """
    return crud.getAllUsers(db)

@app.get("/taches", response_model=list[schemas.Taches])
async def getTaches(db: Session = Depends(get_session)):
    """
    Cette fonction permet de récupérer l'ensemble des tâches stockées dans la base de données.

    :param db: Session de connexion à la base de données.
    :type db: Session
    :return: Liste de toutes les tâches.
    :rtype: list[Tache]
    
    """
    return crud.getAllTache(db)

@app.post("/authentification/connexion")
def connexion(data: schemas.ConnexionInscription, db: Session = Depends(get_session)):
    """
    Cette fonction gère l'authentification d'un utilisateur en vérifiant son nom et son mot de passe.

    :param data: Informations de connexion (nom et mot de passe).
    :type data: ConnexionInscription
    :param db: Session de connexion à la base.
    :type db: Session
    :return: Message de confirmation et informations sur l'utilisateur connecté.
    :rtype: dict
    :raises HTTPException: Si l'utilisateur n'existe pas ou si le mot de passe est incorrect.
    
    """
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
    """
    Cette fonction gère l'inscription d'un utilisateur si son nom n'existe pas déjà dans la base de données.

    :param data: Informations de connexion (nom et mot de passe).
    :type data: ConnexionInscription
    :param db: Session de connexion à la base.
    :type db: Session
    :return: Message de succès et informations sur le nouvel utilisateur.
    :rtype: dict
    :raises HTTPException: Si le nom est déjà utilisé.

    """
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
    """
    Cette fonction permet de récupérer toutes les tâches que l'utilisateur a créées.

    :param user_id: Identifiant de l'utilisateur.
    :type user_id: int
    :param db: Session de connexion à la base.
    :type db: Session
    :return: Liste de toutes les tâches associées à l'utilisateur.
    :rtype: liste[Tache]

    """
    return crud.getTachesWithUserId(db, user_id)


@app.post("/taches/creer")
def creerTache(tache: Taches, db: Session = Depends(get_session)):
    """
    Cette fonction permet de créer une tâche. Les attributs du type Tache sont initialisés à partir des informations fournies par l'utilisateur.

   :param tache: Objet contenant les informations fournies par l'utilisateur pour la création d'une tâche.
   :type tache: Taches
   :param db: Session de connexion à la base.
   :type db: Session
   :return: Message de succès et la nouvelle tâche.
   :rtype: dict

    """
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
    """
    Retourne le créateur d'une tâche.

   :param tache_id: Identifiant de la tâche.
   :type tache_id: int
   :param db: Session de connexion à la base.
   :type db: Session
   :return: Utilisateur créateur de la tâche.
   :rtype: Utilisateur
   :raises HTTPException: Si la tâche ou le créateur n'existe pas.

    """
    # Étape 1 : récupérer la tâche
    tache = db.get(Tache, tache_id)
    if not tache:
        raise HTTPException(status_code=404, detail="Tâche non trouvée")

    # Étape 2 : récupérer le créateur
    createur = db.get(Utilisateur, tache.createurId)
    if not createur:
        raise HTTPException(status_code=404, detail="Créateur introuvable")

    return createur