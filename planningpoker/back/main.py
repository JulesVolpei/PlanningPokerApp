from contextlib import asynccontextmanager
from contextlib import contextmanager
from multiprocessing.managers import Token

from fastapi import FastAPI, HTTPException, Depends, status
from sqlmodel import Session, select
from models import Utilisateur
from models import Tache
from models import DemandeAccessTache
from models import EvaluationTache
from schemas import Taches
from database import initDb, get_session
from fastapi.middleware.cors import CORSMiddleware
import schemas
import crud


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Cette fonction gère le cycle de vie de l'application FastAPI.

    Elle est exécutée au démarrage du serveur et à l'arrêt du serveur
    """
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

    \nLes champs ajoutés sont :
    \n- ``participantsActuels`` : nombre de participants acceptés.
    \n- ``nombreVotes`` : nombre total d'évaluations.

    :param db: Session de connexion à la base de données.
    :type db: Session
    :return: Liste de toutes les tâches.
    :rtype: list[Tache]
    """
    tachesDb = crud.getAllTache(db)
    tachesAvecInfos = []
    for tache in tachesDb:
        totalParticipants = 1 + len([d for d in tache.demandeAccess if d.statut == "acceptee"])
        cmptVotes = len(tache.evaluations)
        dictTaches = tache.__dict__
        dictTaches["participantsActuels"] = totalParticipants
        dictTaches["nombreVotes"] = cmptVotes
        tachesAvecInfos.append(dictTaches)

    return tachesAvecInfos

@app.post("/authentification/connexion")
def connexion(data: schemas.ConnexionInscription, db: Session = Depends(get_session)):
    """
    Cette fonction gère l'authentification d'un utilisateur en vérifiant son nom et son mot de passe.

    :param data: Informations de connexion (nom et mot de passe).
    :type data: ConnexionInscription
    :param db: Session de connexion à la base de données.
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
    :param db: Session de connexion à la base de données.
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

@app.get("/taches/user/{user_id}", response_model=list[schemas.Taches])
def getUserTaches(user_id: int, db: Session = Depends(get_session)):
    """
    Cette fonction permet de récupérer les tâches créées par un utilisateur donné.

    :param user_id: Identifiant de l'utilisateur
    :type user_id: int
    :param db: Session de connexion à la base de données.
    :type db: Session
    :return: Liste des tâches de l'utilisateur
    :rtype: list[Tache]
    """
    tachesDb = crud.getTachesWithUserId(db, user_id)
    tachesAvecInfos = []
    for tache in tachesDb:
        totalParticipants = 1 + len([d for d in tache.demandeAccess if d.statut == "acceptee"])
        cmptVotes = len(tache.evaluations)
        dictTache = tache.__dict__
        dictTache["participantsActuels"] = totalParticipants
        dictTache["nombreVotes"] = cmptVotes
        tachesAvecInfos.append(dictTache)
    return tachesAvecInfos

@app.post("/taches/creer")
def creerTache(tache: Taches, db: Session = Depends(get_session)):
    """
    Cette fonction permet de créer une tâche. Les attributs du type Tache sont initialisés à partir des informations fournies par l'utilisateur.

   :param tache: Objet contenant les informations fournies par l'utilisateur pour la création d'une tâche.
   :type tache: Taches
   :param db: Session de connexion à la base de données.
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
        methodeEvaluation=tache.methodeEvaluation,
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
    Cette fonction retourne le créateur d'une tâche.

   :param tache_id: Identifiant de la tâche.
   :type tache_id: int
   :param db: Session de connexion à la base de données.
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

@app.post("/demandeAcces", response_model=schemas.DemandeAccessTache)
def DemanderAcces(demande: schemas.DemandeAccessTacheCreate, db: Session = Depends(get_session)):
    """
    Cette fonction permet de créer une demande d'accès à une tâche pour un utilisateur.

    Une vérification est effectuée afin d'éviter les doublons (une seule demande par utilisateur et par tâche).

    :param demande: Données de la demande d'accès
    :type demande: DemandeAccessTacheCreate
    :param db: Session de connexion à la base de données
    :type db: Session
    :raises HTTPException: Si une demande existe déjà
    :return: Demande d'accès créée
    :rtype: DemandeAccessTache
    """
    demandeExistante = db.exec(
        select(DemandeAccessTache)
        .where(DemandeAccessTache.utilisateurId == demande.utilisateurId)
        .where(DemandeAccessTache.tacheId == demande.tacheId)
    ).first()

    if demandeExistante:
        raise HTTPException(
            status_code=400,
            detail="Une demande existe déjà pour cette utilisateur"
        )

    demandeAcces = DemandeAccessTache(
        utilisateurId=demande.utilisateurId,
        tacheId=demande.tacheId,
        statut="enAttente"
    )
    db.add(demandeAcces)
    db.commit()
    db.refresh(demandeAcces)
    return demandeAcces

@app.get("/demandeAcces/tache/{tacheId}", response_model=list[schemas.DemandeAccessTache])
def getDemandeParTache(tacheId: int, db: Session = Depends(get_session)):
    """
    Cette fonction permet de récupérer toutes les demandes d'accès associées à une tâche donnée.

    :param tacheId: Identifiant de la tâche
    :type tacheId: int
    :param db: Session de connexion à la base de données
    :type db: Session
    :return: Liste des demandes d'accès pour la tâche
    :rtype: list[DemandeAccessTache]
    """
    return db.exec(
        select(DemandeAccessTache).where(DemandeAccessTache.tacheId == tacheId)
    ).all()

# J'ai renommé cette fonction car elle avait le même nom que la précédente !
@app.get("/demandeAcces/utilisateur/{utilisateurID}", response_model=list[schemas.DemandeAccessTache])
def getDemandeParUtilisateur(utilisateurID: int, db: Session = Depends(get_session)):
    """
    Cette fonction permet de récupérer toutes les demandes d'accès effectuées par un utilisateur.

    :param utilisateurID: Identifiant de l'utilisateur
    :type utilisateurID: int
    :param db: Session de connexion à la base de données
    :type db: Session
    :return: Liste des demandes d'accès de l'utilisateur
    :rtype: list[DemandeAccessTache]
    """
    return db.exec(
        select(DemandeAccessTache).where(DemandeAccessTache.utilisateurId == utilisateurID)
    ).all()

@app.get("/demandeAcces/createur/{utilisateurID}", response_model=list[schemas.DemandeAccessTacheDetail])
def demandesCreateur(utilisateurID: int, db: Session = Depends(get_session)):
    """
    Cette foncion permet de récupérer toutes les demandes d'accès liées aux tâches créées par un utilisateur donné.

    :param utilisateurID: Identifiant du créateur des tâches
    :type utilisateurID: int
    :param db: Session de connexion à la base de données
    :type db: Session
    :return: Liste des demandes d'accès pour les tâches du créateur
    :rtype: list[DemandeAccessTacheDetail]
    """
    requete = db.exec(
        select(DemandeAccessTache)
        .join(Tache, Tache.id == DemandeAccessTache.tacheId)
        .where(Tache.createurId == utilisateurID)
    ).all()

    return requete

@app.put("/demandeAcces/{demandeId}/accepter")
def accepterDemande(demandeId: int, db: Session = Depends(get_session)):
    """
    Cete fonction permet d'accepter une demande d'accès à une tâche.

    Le statut de la demande passe à ``acceptee``.

    :param demandeId: Identifiant de la demande
    :type demandeId: int
    :param db: Session de connexion à la base de données
    :type db: Session
    :raises HTTPException: Si la demande n'existe pas
    :return: Message de confirmation et demande mise à jour
    :rtype: dict
    """
    demande = db.get(DemandeAccessTache, demandeId)

    if not demande:
        raise HTTPException(404, "Demande introuvable")

    demande.statut = "acceptee"
    db.add(demande)
    db.commit()
    db.refresh(demande)

    return {"message": "Demande acceptée", "demande": demande}

@app.put("/demandeAcces/{demandeId}/refuser")
def refuserDemande(demandeId: int, db: Session = Depends(get_session)):
    """
    Cette fonction permet de refuser une demande d'accès à une tâche.

    Le statut de la demande passe à ``refusee``.

    :param demandeId: Identifiant de la demande
    :type demandeId: int
    :param db: Session de connexion à la base de données
    :type db: Session
    :raises HTTPException: Si la demande n'existe pas
    :return: Message de confirmation et demande mise à jour
    :rtype: dict
    """
    demande = db.get(DemandeAccessTache, demandeId)

    if not demande:
        raise HTTPException(404, "Demande introuvable")

    demande.statut = "refusee"
    db.add(demande)
    db.commit()
    db.refresh(demande)

    return {"message": "Demande refusée", "demande": demande}


@app.get("/demandeAcces/tache/{tacheId}/acceptees")
def demandesAcceptees(tacheId: int, db: Session = Depends(get_session)):
    """
    Cette fonction permet de récupérer toutes les demandes d'accès acceptées pour une tâche donnée.

    :param tacheId: Identifiant de la tâche
    :type tacheId: int
    :param db: Session de connexion à la base de données
    :type db: Session
    :return: Liste des demandes acceptées
    :rtype: list[DemandeAccessTache]
    """
    demandes = db.exec(
        select(DemandeAccessTache)
        .where(DemandeAccessTache.tacheId == tacheId)
        .where(DemandeAccessTache.statut == "acceptee")
    ).all()

    return demandes

@app.post("/evaluations/creer")
def creerEvaluation(eval: schemas.EvaluationCreate, db: Session = Depends(get_session)):
    """
    Cette fonction permet de créer ou de mettre à jour une évaluation (vote) pour une tâche.

    Si l'utilisateur a déjà voté pour la tâche, la valeur du vote est mise à jour.

    :param eval: Données de l'évaluation
    :type eval: EvaluationCreate
    :param db: Session de connexion à la base de données
    :type db: Session
    :return: Message de confirmation et vote enregistré
    :rtype: dict
    """
    existe = db.exec(select(EvaluationTache).where(
        EvaluationTache.utilisateurId == eval.utilisateurId,
        EvaluationTache.tacheId == eval.tacheId
    )).first()

    if existe:
        existe.valeur = eval.valeur
        db.add(existe)
        db.commit()
        db.refresh(existe)
        return {"message": "Vote mis à jour", "vote": existe}

    nouveauVote = EvaluationTache(
        utilisateurId=eval.utilisateurId,
        tacheId=eval.tacheId,
        valeur=eval.valeur
    )
    db.add(nouveauVote)
    db.commit()
    db.refresh(nouveauVote)
    return {"message": "A voté !", "vote": nouveauVote}