import {createContext, type ReactNode, useContext, useEffect, useState} from "react";

/**
 * Représente les données d'un utilisateur connecté stockées dans l'application.
 * @category Interfaces
 */
interface Utilisateur {
    /** Identifiant unique en base de données */
    id: number;
    /** Nom d'affichage de l'utilisateur */
    nom: string;
}

/**
 * Définit la structure des données et méthodes exposées par le contexte d'authentification.
 * @category Interfaces
 */
interface Authentification {
    /** L'objet utilisateur si connecté, sinon null */
    utilisateur: Utilisateur | null;
    /** Envoie les identifiants à l'API pour connecter l'utilisateur */
    connexion: (nom: string, motDePasse: string) => Promise<void>;
    /** Crée un nouveau compte via l'API puis connecte automatiquement l'utilisateur */
    inscription: (nom: string, motDePasse: string) => Promise<void>;
    /** Supprime les données locales et déconnecte l'utilisateur */
    deconnexion: () => void;
    /** Booléen utilitaire pour vérifier rapidement si une session est active */
    estConnecte: boolean;
}

const lienURLAPI = "http://localhost:8000"; // Lien de connexion pour FastAPI et la DB en python le boss
const AuthentificationContext = createContext<Authentification | undefined>(undefined);

/**
 * Hook permettant de récupérer l'état de la connexion et les actions d'authentification.
 *
 * @remarks
 * Ce hook ne peut être utilisé qu'à l'intérieur d'un `AuthentificationProvider`.
 *
 * @category Hooks
 * @throws {Error} Si le hook est appelé en dehors de l'arbre du Provider.
 * @returns {Authentification} L'objet contenant l'utilisateur courant et les méthodes de connexion.
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
 * Composant responsable de la gestion globale de l'état utilisateur.
 *
 * Il initialise la session utilisateur au démarrage de l'application en vérifiant le stockage local
 * et met à disposition les fonctions nécessaires pour s'inscrire, se connecter ou se déconnecter.
 *
 * @category Providers
 * @param {Object} props - Les propriétés du composant.
 * @param {ReactNode} props.children - Les composants enfants qui auront accès au contexte.
 * @returns {JSX.Element} Le fournisseur de contexte englobant l'application.
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
     * Gère la tentative de connexion auprès de l'API.
     * Met à jour le state et le localStorage en cas de succès.
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
     * Gère la création de compte et enchaîne sur une connexion automatique.
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