import {accessAuthentification} from "@/context/AuthentificationContext.tsx";
import {toast} from "sonner";
import { LogOut } from 'lucide-react';
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router";

/**
 * Ce composant affiche un bouton situé en bas de la sidebar.
 * Lorsqu'il est cliqué, il redirige l'utilisateur vers la page d'accueil et
 * il déclenche la fermeture de la session utilisateur via le contexte d'authentification
 * avant d'afficher une notification de confirmation de la déconnexion.
 *
 * @category Composants/Authentification
 * @returns {JSX.Element} Le bouton de déconnexion.
 */
const LogOutBouton = () => {
    const {deconnexion} = accessAuthentification();
    const redirection = useNavigate();
    const hangleLogOut = () => {
        try {
            redirection("/");
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