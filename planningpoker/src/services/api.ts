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