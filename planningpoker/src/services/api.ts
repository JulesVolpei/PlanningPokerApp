export const APIURL = "http://localhost:8000";

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

export async function retrouverCreateur(tacheId: number) {
    const reponse = await fetch(`${APIURL}/taches/${tacheId}/createur`, {
        method: "GET",
    });

    if (!reponse.ok) {
        throw new Error("Créateur introuvable");
    }

    return reponse.json();
}