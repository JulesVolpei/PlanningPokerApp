import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {LockKeyhole, LockKeyholeOpen, PenOff} from "lucide-react";
import ListeTachesEnCours from "@/components/ModeCreateur/TachesEnCours/ListeTachesEnCours.tsx";
import DemandeAcces from "@/components/ModeCreateur/DemandesAcces/DemandeAcces.tsx";
import TachesArchivees from "@/components/ModeCreateur/TachesArchivees/TachesArchivees.tsx";
import {accessAuthentification} from "@/context/AuthentificationContext.tsx";

/**
 * Type définissant les différentes valeurs que peuvent les matières dans la table des matières.
 */
type PageType = "taches" | "demandeAcces" | "tachesArchivees";

/**
 * Composant permettant d'afficher les différentes pages en fonction de la valeur donnée.
 *
 * @this {utilisateur} Variable du contexte d'authentification permettant de récupérer les informations d'un utilisateur.
 * @this {differentesPages} Dictionnaire avec comme clé un PageType et en valeur un composant permettant d'afficher le composant en fonction de la variable page.
 * @param page Variable indiquant la valeur de la page à afficher.
 * @returns {JSX.Element} Retourne le composant qui affiche les composants liés aux matières.
 */
const TemplatePage = ({page}) => {
    const { utilisateur } = accessAuthentification();
    const differentesPages: Record<PageType, JSX.Element> = {
        taches: (
            <ListeTachesEnCours informationUtilisateur={utilisateur}/>
        ),
        demandeAcces: (
            <DemandeAcces informationUtilisateur={utilisateur}/>
        ),
        tachesArchivees: (
            <TachesArchivees informationUtilisateur={utilisateur}/>
        ),
    };
    return (
        <Card className="w-full h-full min-h-170 min-w-340">
            {differentesPages[page]}
        </Card>
    )
}

export default TemplatePage;