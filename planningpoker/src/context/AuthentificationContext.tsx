import {createContext, type ReactNode, useContext, useEffect, useState} from "react";


interface Utilisateur {
    id: number;
    name: string;
}

interface Authentification {
    utilisateur: Utilisateur | null; // Car on est pas forcément connecté
    connexion: (nom: string, motDePasse: string) => Promise<void>;
    inscription: (nom: string, motDePasse: string) => Promise<void>;
    deconnexion: () => void;
    estConnecte: boolean;
}

const lienURLAPI = "http://localhost:5173/"; // Lien de connexion pour FastAPI et la DB en python le boss
const AuthentificationContext = createContext<Authentification | undefined>(undefined);

export const AccessAuthentification = () => {
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
        const tokenConnexion = localStorage.getItem('token');
        if (tokenConnexion) {
            fetch(`${lienURLAPI}/authentification/${tokenConnexion}`, {
                headers: {Authorization: `Bearer ${tokenConnexion}`},
            }).then(res => res.ok ? res.json() : null)
                .then((data: any) => {setUtilisateur(data as Utilisateur)})
                .catch(() => {setUtilisateur(null)});
        }
    }, []);

    // Méthodes de connexion
    const connexion = async (nom: string, motDePasse: string) => {
        const formData = new URLSearchParams()
        formData.append("nomUtilisateur", nom)
        formData.append("mdpUtilisateur", motDePasse)

        const reponse = await fetch(`${lienURLAPI}/authentification/connexion`, {
            method: "POST",
            body: formData,
        })

        if (!reponse.ok) throw new Error("Login failed")

        const data = await reponse.json()
        localStorage.setItem("token", data.accessToken)
        localStorage.setItem("utlisateur", JSON.stringify(data.utilisateur))
        setUtilisateur(data.utilisateur)
    }

    const inscription = async (nom: string, motDePasse: string) => {
        const res = await fetch(`${lienURLAPI}/auth/register?nom=${nom}&mdp=${motDePasse}`, {
            method: "POST",
        })

        if (!res.ok) throw new Error("Oups, quelque chose s\'est map passé lors de l'inscription")
        await connexion(nom, motDePasse) // On fait la connexion direct ici
    }

    const deconnexion = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("utilisateur")
        setUtilisateur(null)
    }

    return (
        <AccessAuthentification.Provider value={{ utilisateur, connexion, inscription, deconnexion, estConnecte: !! utilisateur }}>
            {children}
        </AccessAuthentification.Provider>
    )
}