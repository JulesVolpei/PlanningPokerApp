from pydantic import BaseModel

class Utilisateur(BaseModel):
    """
    Schéma représentant un utilisateur.

    Ce schéma est utilisé pour les échanges API impliquant
    les informations d'un utilisateur.

    :param id: Identifiant unique de l'utilisateur
    :type id: int
    :param nom: Nom de l'utilisateur
    :type nom: str
    :param motDePasse: Mot de passe de l'utilisateur
    :type motDePasse: str
    """
    id: int
    nom: str
    motDePasse: str

    class Config:
        from_attributes = True

class EvaluationTache(BaseModel):
    """
    Schéma représentant une évaluation associée à une tâche.

    :param id: Identifiant de l'évaluation
    :type id: int
    :param utilisateurId: Identifiant de l'utilisateur
    :type utilisateurId: int
    :param tacheId: Identifiant de la tâche
    :type tacheId: int
    :param valeur: Valeur de l'évaluation
    :type valeur: str
    """
    id: int
    utilisateurId: int
    tacheId: int
    valeur: str

    class Config:
        from_attributes = True

class DemandeAccessTache(BaseModel):
    """
    Schéma représentant une demande d'accès à une tâche.

    :param id: Identifiant de la demande
    :type id: int
    :param utilisateurId: Identifiant de l'utilisateur demandeur
    :type utilisateurId: int
    :param tacheId: Identifiant de la tâche
    :type tacheId: int
    :param statut: Statut de la demande
    :type statut: str
    """
    id: int
    utilisateurId: int
    tacheId: int
    statut: str

    class Config:
        from_attributes = True

class ConnexionInscription(BaseModel):
    """
    Schéma utilisé pour la connexion et l'inscription d'un utilisateur.

    :param nom: Nom de l'utilisateur
    :type nom: str
    :param motDePasse: Mot de passe associé
    :type motDePasse: str
    """
    nom: str
    motDePasse: str

class Taches(BaseModel):
    """
    Schéma représentant une tâche enrichie retournée par l'API.

    Ce schéma contient :
    - les champs persistés en base de données
    - des champs calculés dynamiquement par l'API

    Champs calculés :
    - ``participantsActuels`` : nombre de participants acceptés
    - ``nombreVotes`` : nombre total d'évaluations

    :param id: Identifiant unique de la tâche
    :type id: int
    :param titre: Titre de la tâche
    :type titre: str
    :param description: Description de la tâche
    :type description: str
    :param statut: Statut actuel de la tâche
    :type statut: str
    :param createurId: Identifiant du créateur de la tâche
    :type createurId: int
    :param nombreMaxParticipant: Nombre maximal de participants
    :type nombreMaxParticipant: int
    :param methodeEvaluation: Méthode d'évaluation utilisée
    :type methodeEvaluation: str
    :param participantsActuels: Nombre actuel de participants
    :type participantsActuels: int
    :param nombreVotes: Nombre total de votes
    :type nombreVotes: int
    """
    id: int
    titre: str
    description: str
    statut: str
    createurId: int
    nombreMaxParticipant: int
    methodeEvaluation: str
    participantsActuels: int = 1
    nombreVotes: int = 0

    class Config:
        from_attributes = True

class TacheCreate(BaseModel):
    """
    Schéma utilisé pour la création d'une nouvelle tâche.

    Ce schéma contient uniquement les champs nécessaires
    à la création d'une tâche.

    :param titre: Titre de la tâche
    :type titre: str
    :param description: Description de la tâche
    :type description: str
    :param createurId: Identifiant du créateur
    :type createurId: int
    :param nombreMaxParticipant: Nombre maximal de participants
    :type nombreMaxParticipant: int
    :param statut: Statut initial de la tâche
    :type statut: str
    :param methodeEvaluation: Méthode d'évaluation
    :type methodeEvaluation: str
    """
    titre: str
    description: str
    createurId: int
    nombreMaxParticipant: int = 5
    statut: str = "ouverte"
    methodeEvaluation: str = "Moyenne"

class TacheUpdate(BaseModel):
    """
    Schéma utilisé pour la mise à jour partielle d'une tâche.

    Tous les champs sont optionnels afin de permettre
    une modification partielle (PATCH logique).

    :param titre: Nouveau titre de la tâche
    :type titre: str | None
    :param description: Nouvelle description
    :type description: str | None
    :param statut: Nouveau statut
    :type statut: str | None
    :param nombreMaxParticipant: Nouveau nombre maximal de participants
    :type nombreMaxParticipant: int | None
    :param methodeEvaluation: Nouvelle méthode d'évaluation
    :type methodeEvaluation: str | None
    """
    titre: str | None = None
    description: str | None = None
    statut: str | None = None
    nombreMaxParticipant: int | None = None
    methodeEvaluation: str | None = None

class DemandeAccessTacheCreate(BaseModel):
    """
    Schéma utilisé pour créer une demande d'accès à une tâche.

    :param utilisateurId: Identifiant de l'utilisateur demandeur
    :type utilisateurId: int
    :param tacheId: Identifiant de la tâche ciblée
    :type tacheId: int
    """
    utilisateurId: int
    tacheId: int

class DemandeAccessTacheDetail(BaseModel):
    """
    Schéma détaillé représentant une demande d'accès enrichie.

    Ce schéma inclut :
    - les informations de la demande
    - l'utilisateur demandeur
    - la tâche concernée

    :param id: Identifiant de la demande
    :type id: int
    :param utilisateurId: Identifiant de l'utilisateur
    :type utilisateurId: int
    :param tacheId: Identifiant de la tâche
    :type tacheId: int
    :param statut: Statut de la demande
    :type statut: str
    :param utilisateur: Utilisateur ayant effectué la demande
    :type utilisateur: Utilisateur
    :param tache: Tâche concernée
    :type tache: Taches
    """
    id: int
    utilisateurId: int
    tacheId: int
    statut: str
    utilisateur: Utilisateur
    tache: Taches

    class Config:
        from_attributes = True

class EvaluationCreate(BaseModel):
    """
    Schéma utilisé pour créer ou mettre à jour une évaluation.

    :param utilisateurId: Identifiant de l'utilisateur votant
    :type utilisateurId: int
    :param tacheId: Identifiant de la tâche évaluée
    :type tacheId: int
    :param valeur: Valeur de l'évaluation
    :type valeur: str
    """
    utilisateurId: int
    tacheId: int
    valeur: str