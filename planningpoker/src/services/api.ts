export const APIURL = "http://localhost:8000";


/**
 * Fonction permettant de récupérer la liste de tous les utilisateurs depuis l'API Python.
 *
 * @returns {Promise<Utilisateur[]>} Une promesse résolue avec la liste des utilisateur au format JSON.
 * @throws {Error} Une erreur indiquant qu'aucun utilisateur n'a été trouvé.
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
 * Fonction permettant de récupérer la liste de toutes les tâches depuis l'API Python.
 *
 * @returns {Promise<Tache[]>} Une promesse résolue avec la liste des tâches au format JSON.
 * @throws {Error} Une erreur indiquant qu'aucune tâche n'a été trouvé.
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
 * Fonction permettant de récupérer toutes les tâches associées à un id utilisateur.
 *
 * @param id Variable indiquant le numéro unique permettant d'identifier l'utilisateur.
 * @returns {Promise<Tache[]>} Une promesse résolue avec la liste des tâches d'un utilisateur précis au format JSON.
 * @throws {Error} Une erreur si l'utilisateur n'est pas trouvable.
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
 * Fonction permettant la création d'une nouvelle tâche depuis l'API Python.
 *
 * @param nouvelleTache Variable contenant toutes les informations liées à la nouvelle tâche à créer.
 * @returns {Promise<JSON>} Promesse résolue envoyer un message de confirmation de création de la nouvelle tâche au format JSON.
 * @throws {Error} Erreur indiquant l'impossibilité de créer la nouvelle tâche.
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
 * Fonction permettant de retrouver l'utilisateur ayant créée une tâche précise.
 *
 * @param tacheId Variable correspondant à l'id permettant d'identifier la tâche.
 * @returns {Promise<Utilisateur[]>} Promesse résolue avec les informations liées au créateur de la tâche.
 * @throws {Error} Erreur si l'utilisateur est introuvable.
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

export const getDemandesUtilisateur = async (userId: number) => {
    const r = await fetch(`${APIURL}/demandeAcces/utilisateur/${userId}`);
    if (!r.ok) {
        throw new Error("Erreur lors de la demande d'accès");
    }
    return await r.json();
};

export const getDemandesCreateur = async (userId: number) => {
    const response = await fetch(`${APIURL}/demandeAcces/createur/${userId}`);

    if (!response.ok) {
        throw new Error("Erreur lors de la demande d'accès")
    }
    const test = await response.json();
    const resultatsFiltres = test.filter(item => item.utilisateurId !== userId && item.statut === "enAttente");
    return await resultatsFiltres;
};

export const accepterDemande = async (demandeId: number) => {
    console.log("Envoyé à API : ", demandeId);
    const response = await fetch(`${APIURL}/demandeAcces/${demandeId}/accepter`, {
        method: "PUT",
    });

    if (!response.ok){
        throw new Error("Erreur acceptation demande");
    }
    return await response.json();
};

export const refuserDemande = async (demandeId: number) => {
    console.log("Envoyé à API : ", demandeId);
    const response = await fetch(`${APIURL}/demandeAcces/${demandeId}/refuser`, {
        method: "PUT",
    });

    if (!response.ok) {
        throw new Error("Erreur refus demande");
    }
    return await response.json();
};
