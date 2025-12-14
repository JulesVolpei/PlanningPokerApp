import {accessAuthentification} from "@/context/AuthentificationContext.tsx";
import {toast} from "sonner";
import { LogOut } from 'lucide-react';
import {Button} from "@/components/ui/button.tsx";

/**
 * Bouton de déconnexion.
 *
 * Ce composant affiche un bouton situé en bas de la barre latérale.
 * Lorsqu'il est cliqué, il déclenche la fermeture de la session utilisateur via le contexte d'authentification
 * et affiche une notification de confirmation.
 *
 * @category Composants/Authentification
 * @returns {JSX.Element} Le bouton de déconnexion.
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