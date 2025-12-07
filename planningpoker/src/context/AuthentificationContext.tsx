import {createContext, type ReactNode, useContext, useEffect, useState} from "react";

/**
 * Interface représentant un utilisateur authentifié.
 * @property {number} id Identifiant unique de l’utilisateur.
 * @property {string} nom Nom de l’utilisateur.
 */
interface Utilisateur {
    id: number;
    nom: string;
}

/**
 * Interface définissant le contenu du contexte d'authentification.
 * @property {Utilisateur | null} utilisateur L’utilisateur actuellement connecté (ou null si aucun).
 * @property {(nom: string, motDePasse: string) => Promise<void>} connexion Fonction pour se connecter.
 * @property {(nom: string, motDePasse: string) => Promise<void>} inscription Fonction pour créer un compte et se connecter.
 * @property {() => void} deconnexion Fonction pour se déconnecter.
 * @property {boolean} estConnecte Indique si un utilisateur est actuellement connecté.
 */
interface Authentification {
    utilisateur: Utilisateur | null; // Car on est pas forcément connecté
    connexion: (nom: string, motDePasse: string) => Promise<void>;
    inscription: (nom: string, motDePasse: string) => Promise<void>;
    deconnexion: () => void;
    estConnecte: boolean;
}

const lienURLAPI = "http://localhost:8000"; // Lien de connexion pour FastAPI et la DB en python le boss
const AuthentificationContext = createContext<Authentification | undefined>(undefined);

/**
 * Hook permettant d'accéder au contexte d'authentification.
 * @throws {Error} Si le hook est utilisé en dehors du AuthentificationProvider.
 * @returns {Authentification} Objet contenant l'utilisateur et les fonctions d'authentification.
 */
export const accessAuthentification = () => {
    // Permet d'accéder au contexte, si un utilisateur est connecté ou non, à utilisateur plus tard dans les conditions de composants
    const context = useContext(AuthentificationContext);
    if (!context) {
        throw new Error("Aucune connexion");
    }
    return context;
}

/**
 * Provider qui englobe l’application et gère toute l’authentification.
 *
 * @param {ReactNode} children Noeuds enfants qui auront accès au contexte.
 * @returns {JSX.Element} Le composant Provider enveloppant l'application.
 *
 * Permet de :
 * - Charger automatiquement l’utilisateur depuis le localStorage.
 * - Proposer des fonctions asynchrones pour se connecter ou s'inscrire.
 * - Stocker l’utilisateur dans le localStorage pour persister après rafraîchissement (même si avec React l'utilisateur n'aurait techniquement pas besoin de recharger la page).
 * - Permet de supprimer les données lors de la déconnexion.
 */
export const AuthentificationProvider = ({children } : {children: ReactNode}) => {
    const [utilisateur, setUtilisateur] = useState<Utilisateur | null>( null);

    useEffect(() => {
        const utilisateurStocke = localStorage.getItem("utilisateur");
        if (utilisateurStocke) {
            setUtilisateur(JSON.parse(utilisateurStocke));
        }
    }, []); // Plus de token d'accès, trop compliqué juste du json

    /**
     * Fonction de connexion envoyant nom et mot de passe à l'API Python.
     *
     * Si succès :
     *  - Récupère les données utilisateur.
     *  - Les stocke dans le localStorage.
     *  - Met à jour l'état React.
     *
     * @param {string} nom Nom de l’utilisateur.
     * @param {string} motDePasse Mot de passe de l’utilisateur.
     * @throws {Error} Si la réponse de l’API est invalide.
     */
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

        if (!reponse.ok) throw new Error("Erreur lors de la connexion")

        const data = await reponse.json();
        localStorage.setItem("utilisateur", JSON.stringify(data.utilisateur))
        const utilisateurConnete = {"id": data.utilisateur.id, "nom": data.utilisateur.nom};
        setUtilisateur(utilisateurConnete);
    }

    /**
     * Fonction d’inscription créant un nouvel utilisateur via l’API Python.
     *
     * Si succès, la fonction connecte automatiquement l’utilisateur.
     *
     * @param {string} nom Nom choisi par le nouvel utilisateur.
     * @param {string} motDePasse Mot de passe souhaité.
     * @throws {Error} En cas d’échec durant l’inscription.
     */
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