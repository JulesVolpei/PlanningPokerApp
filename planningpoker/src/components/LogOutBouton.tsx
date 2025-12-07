import {accessAuthentification} from "@/context/AuthentificationContext.tsx";
import {toast} from "sonner";
import { LogOut } from 'lucide-react';
import {Button} from "@/components/ui/button.tsx";

/**
 * Composant permettant d'afficher l'icone responsable de la déconnexion et de gérer l'appel à la déconnexion dans le contexte d'authentification.
 *
 * @this {deconnexion} Fonction dans le contexte d'authentification permettant de déconnecter l'utilisateur.
 * @this {handleLogOut()} Fonction permettant de gérer la réponse de la déconnexion dans le contexte d'authentification.
 */
const LogOutBouton = () => {
    const {deconnexion} = accessAuthentification();
    const hangleLogOut = () => {
        try {
            deconnexion();
            toast.success("Déconnexion");
        } catch (e) {
            toast.error(`Erreur lors de la déconnexion : ${e}`);
        }
    }
    return (
        <Button onClick={hangleLogOut} className="mt-auto w-10 h-10 rounded-lg flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent transition-smooth bg-sidebar">
            <LogOut className="w-5 h-5"/>
        </Button>
    )
}

export default LogOutBouton;