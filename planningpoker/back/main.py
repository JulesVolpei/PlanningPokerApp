from contextlib import asynccontextmanager

from fastapi import FastAPI, Depends
from sqlmodel import Session, select
from models import Utilisateur
from connexionDB import initDb, get_session
from fastapi.middleware.cors import CORSMiddleware

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
    initDb()

@app.get("/users")
def get_users(session: Session = Depends(get_session)):
    users = session.exec(select(Utilisateur)).all()
    return users
