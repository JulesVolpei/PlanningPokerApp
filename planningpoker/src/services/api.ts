/**
 * Module de gestion des communications avec l'API Backend (FastAPI).
 * Ce fichier centralise toutes les requêtes HTTP (GET, POST, PUT) vers le serveur.
 * @module ServicesAPI
 */

export const APIURL = "http://localhost:8000";


/**
 * Récupère la liste complète des utilisateurs enregistrés.
 *
 * @category Utilisateurs
 * @returns {Promise<Utilisateur[]>} Une promesse contenant le tableau de tous les utilisateurs.
 * @throws {Error} Si la requête échoue ou si la liste est vide.
 */
export async function fetchAllUser() {
    const reponse = await fetch(`${APIURL}/users`, {
        method: "GET",
        headers: {}
    })
    if (!reponse) {
        throw new Error("Aucun utilisateur trouvé")
    }
    return reponse.json();
}


/**
 * Récupère la liste complète des tâches disponibles.
 *
 * @category Tâches
 * @returns {Promise<Tache[]>} Une promesse contenant le tableau de toutes les tâches.
 * @throws {Error} Si aucune tâche n'est trouvée.
 */
export async function fecthAllTaches() {
    const reponse = await fetch(`${APIURL}/taches`, {
        method: "GET",
        headers: {}
    })
    if (!reponse) {
        throw new Error("Aucune tâches en BD");
    }
    return reponse.json();
}

/**
 * Récupère les tâches spécifiques associées à un utilisateur (créées ou rejointes).
 *
 * @category Tâches
 * @param {string} id - L'identifiant unique de l'utilisateur.
 * @returns {Promise<Tache[]>} Liste des tâches liées à l'utilisateur.
 * @throws {Error} Si l'utilisateur est introuvable.
 */
export async function getTachesWithUserId(id: string) {
    const reponse = await fetch(`${APIURL}/taches/user/${id}`, {
        method: "GET",
        headers: {}
    })
    if (!reponse) {
        throw new Error("Utilisateur non trouvé");
    }
    return reponse.json();
}

/**
 * Crée une nouvelle tâche dans la base de données.
 *
 * @category Tâches
 * @param {Object} nouvelleTache - Objet contenant les infos de la tâche (titre, description, etc.).
 * @returns {Promise<any>} Confirmation de la création (JSON).
 * @throws {Error} Si la création échoue (validation ou erreur serveur).
 */
export async function createNewTask(nouvelleTache: any) {
    const reponse = await fetch(`${APIURL}/taches/creer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(nouvelleTache),
    });

    if (!reponse.ok) {
        throw new Error("Échec lors de la création de la tâche");
    }

    return await reponse.json();
}

/**
 * Récupère les informations du créateur d'une tâche spécifique.
 *
 * @category Utilisateurs
 * @param {number} tacheId - L'identifiant de la tâche cible.
 * @returns {Promise<Utilisateur>} Les informations publiques du créateur.
 * @throws {Error} Si le créateur est introuvable pour cette tâche.
 */
export async function retrouverCreateur(tacheId: number) {
    const reponse = await fetch(`${APIURL}/taches/${tacheId}/createur`, {
        method: "GET",
    });

    if (!reponse.ok) {
        throw new Error("Créateur introuvable");
    }

    return reponse.json();
}

/**
 * Envoie une demande d'accès pour rejoindre une tâche privée.
 *
 * @category DemandeAccess
 * @param {number} utilisateurId - L'ID de l'utilisateur demandant l'accès.
 * @param {number} tacheId - L'ID de la tâche à rejoindre.
 * @returns {Promise<DemandeAccess>} L'objet demande créé avec le statut "enAttente".
 * @throws {Error} Si la demande échoue ou existe déjà.
 */
export const demanderAccessTache = async (utilisateurId: number, tacheId: number) => {
    const reponse = await fetch(`${APIURL}/demandeAcces`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            utilisateurId,
            tacheId,
        }),
    });

    if (!reponse.ok) {
        throw new Error("Erreur lors de la demande d'accès");
    }

    return await reponse.json();
};

/**
 * Récupère toutes les demandes d'accès émises par un utilisateur.
 *
 * @category DemandeAccess
 * @param {number} userId - L'ID de l'utilisateur.
 * @returns {Promise<DemandeAccess[]>} Liste des demandes effectuées par cet utilisateur.
 */
export const getDemandesUtilisateur = async (userId: number) => {
    const r = await fetch(`${APIURL}/demandeAcces/utilisateur/${userId}`);
    if (!r.ok) {
        throw new Error("Erreur lors de la demande d'accès");
    }
    return await r.json();
};

/**
 * Récupère les demandes d'accès "en attente" pour les tâches créées par un utilisateur.
 * Filtre automatiquement les demandes pour ne garder que celles qui nécessitent une action.
 *
 * @category DemandeAccess
 * @param {number} userId - L'ID du créateur (pour voir qui veut rejoindre ses tâches).
 * @returns {Promise<DemandeAccess[]>} Liste filtrée des demandes en attente venant d'autres utilisateurs.
 */
export const getDemandesCreateur = async (userId: number) => {
    const response = await fetch(`${APIURL}/demandeAcces/createur/${userId}`);

    if (!response.ok) {
        throw new Error("Erreur lors de la demande d'accès")
    }
    const test = await response.json();
    const resultatsFiltres = test.filter((item: any) => item.utilisateurId !== userId && item.statut === "enAttente");
    return await resultatsFiltres;
};

/**
 * Valide une demande d'accès en passant le statut à "acceptee".
 *
 * @category DemandeAccess
 * @param {number} demandeId - L'ID de la demande à accepter.
 * @returns {Promise<DemandeAccess>} La demande mise à jour.
 */
export const accepterDemande = async (demandeId: number) => {
    const response = await fetch(`${APIURL}/demandeAcces/${demandeId}/accepter`, {
        method: "PUT",
    });

    if (!response.ok){
        throw new Error("Erreur acceptation demande");
    }
    return await response.json();
};

/**
 * Refuse une demande d'accès en passant le statut à "refusee".
 *
 * @category DemandeAccess
 * @param {number} demandeId - L'ID de la demande à refuser.
 * @returns {Promise<DemandeAccess>} La demande mise à jour.
 */
export const refuserDemande = async (demandeId: number) => {
    const response = await fetch(`${APIURL}/demandeAcces/${demandeId}/refuser`, {
        method: "PUT",
    });

    if (!response.ok) {
        throw new Error("Erreur refus demande");
    }
    return await response.json();
};

/**
 * Envoie un vote pour une tâche donnée.
 *
 * @category Votes
 * @param {number} utilisateurId - L'utilisateur qui vote.
 * @param {number} tacheId - La tâche concernée.
 * @param {string} valeur - La valeur du vote (ex: "5", "XS", "cafe").
 * @returns {Promise<any>} Le résultat de l'enregistrement du vote.
 */
export async function envoyerEvaluation(utilisateurId: number, tacheId: number, valeur: string) {
    const reponse = await fetch(`${APIURL}/evaluations/creer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            utilisateurId,
            tacheId,
            valeur
        }),
    });

    if (!reponse.ok) {
        throw new Error("Erreur lors de l'envoi du vote");
    }

    return await reponse.json();
}

/**
 * Récupère les tâches archivées d'un créateur avec leurs notes finales.
 *
 * @category Tâches
 * @param {number} createurId - L'ID du créateur.
 * @returns {Promise<any[]>} Liste des tâches archivées.
 */
export async function getTachesArchivees(createurId: number) {
    const reponse = await fetch(`${APIURL}/taches/archivees/createur/${createurId}`, {
        method: "GET",
    });

    if (!reponse.ok) {
        throw new Error("Impossible de récupérer les archives");
    }
    return reponse.json();
}

/**
 * Relance une tâche archivée : remet le statut à "ouverte" et supprime les votes.
 *
 * @category Tâches
 * @param {number} tacheId - L'ID de la tâche à relancer.
 */
export async function relancerTache(tacheId: number) {
    const reponse = await fetch(`${APIURL}/taches/${tacheId}/relancer`, {
        method: "PUT",
    });

    if (!reponse.ok) {
        throw new Error("Erreur lors de la relance de la tâche");
    }
    return reponse.json();
}