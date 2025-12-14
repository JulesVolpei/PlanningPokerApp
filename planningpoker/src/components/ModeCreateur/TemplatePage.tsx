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
 * @category Type
 */
type PageType = "taches" | "demandeAcces" | "tachesArchivees";

/**
 * Ce composant agit comme un gestionnaire d'onglets : il reçoit un identifiant de page (`page`)
 * et rend le composant correspondant (Liste des tâches, Demandes d'accès, ou Archives)
 * à l'intérieur d'une carte qui sert de fond.
 *
 * Il injecte également automatiquement les informations de l'utilisateur connecté
 * dans les sous-composants.
 *
 * @category Composants/ModeCreateur
 * @param {props} props - Les paramètres d'affichage.
 * @returns {JSX.Element} Le composant correspondant à la page demandée, enveloppé dans une Card qui sert de fond.
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