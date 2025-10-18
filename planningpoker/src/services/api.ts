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