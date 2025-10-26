import {createContext, type ReactNode, useContext, useEffect, useState} from "react";


interface Utilisateur {
    id: number;
    nom: string;
}

interface Authentification {
    utilisateur: Utilisateur | null; // Car on est pas forcément connecté
    connexion: (nom: string, motDePasse: string) => Promise<void>;
    inscription: (nom: string, motDePasse: string) => Promise<void>;
    deconnexion: () => void;
    estConnecte: boolean;
}

const lienURLAPI = "http://localhost:8000"; // Lien de connexion pour FastAPI et la DB en python le boss
const AuthentificationContext = createContext<Authentification | undefined>(undefined);

export const accessAuthentification = () => {
    // Permet d'accéder au contexte, si un utilisateur est connecté ou non, à utilisateur plus tard dans les conditions de composants
    const context = useContext(AuthentificationContext);
    if (!context) {
        throw new Error("Aucune connexion");
    }
    return context;
}

export const AuthentificationProvider = ({children } : {children: ReactNode}) => {
    const [utilisateur, setUtilisateur] = useState<Utilisateur | null>( null);

    useEffect(() => {
        const utilisateurStocke = localStorage.getItem("utilisateur");
        if (utilisateurStocke) {
            setUtilisateur(JSON.parse(utilisateurStocke));
        }
    }, []); // Plus de token d'accès, trop compliqué juste du json

    // Méthodes de connexion
    const connexion = async (nom: string, motDePasse: string) => {
        const formulaireConnexion = {
            "nom": nom,
            "motDePasse": motDePasse,
        }

        const reponse = await fetch(`${lienURLAPI}/authentification/connexion`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formulaireConnexion),
        })

        console.log(reponse);

        if (!reponse.ok) throw new Error("Erreur lors de la connexion")

        const data = await reponse.json()
        console.log("Données retour connexion : ", data);
        //localStorage.setItem("token", data.accessToken)
        localStorage.setItem("utlisateur", JSON.stringify(data.utilisateur))
        const utilisateurConnete = {"id": data.utilisateur.id, "nom": data.utilisateur.nom};
        setUtilisateur(utilisateurConnete);
        console.log("Utilisateur connecté :", utilisateurConnete)
    }

    const inscription = async (nom: string, motDePasse: string) => {
        const formulaireInscription = {
            "nom": nom,
            "motDePasse": motDePasse,
        }

        const reponse = await fetch(`${lienURLAPI}/authentification/inscription?nom=${nom}&mdp=${motDePasse}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formulaireInscription),
        })

        if (!reponse.ok) throw new Error("Oups, quelque chose s\'est map passé lors de l'inscription")
        await connexion(nom, motDePasse) // On fait la connexion direct ici
    }

    const deconnexion = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("utilisateur")
        setUtilisateur(null)
    }

    return (
        <AuthentificationContext.Provider
            value={{
                utilisateur,
                connexion,
                inscription,
                deconnexion,
                estConnecte: !!utilisateur,
            }}
        >
            {children}
        </AuthentificationContext.Provider>
    );
}