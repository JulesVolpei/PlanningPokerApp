"""
Gestion de la base de données de l'application.

Ce module est responsable de :
- la création du moteur de connexion à la base de données
- l'initialisation des tables SQL
- la gestion des sessions de base de données

Il est utilisé par FastAPI via le mécanisme de dépendances.
"""

from sqlmodel import SQLModel, create_engine, Session
import os
from dotenv import load_dotenv
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import pymysql
pymysql.install_as_MySQLdb()

load_dotenv()
engine = create_engine(str(os.getenv("DATABASEURL")), echo=True)

def initDb():
    """
    Initialise la base de données de l'application.

    Cette fonction :
    \n- importe les modèles SQL
    \n- crée les tables si elles n'existent pas encore
    \n- établit la connexion avec la base de données

    Elle est appelée au démarrage de l'application FastAPI.
    """
    from models import Utilisateur, Tache, EvaluationTache, DemandeAccessTache
    SQLModel.metadata.create_all(engine)
    print("Connexion DB Réussite")

def get_session():
    """
    Fournit une session de base de données.

    Cette fonction est utilisée comme dépendance FastAPI
    afin de fournir automatiquement une session SQLModel
    aux routes de l'API.

    La session est automatiquement fermée après utilisation.

    :yield: Session active de base de données
    :rtype: Session
    """
    with Session(engine) as session:
        yield session

