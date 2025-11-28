import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {LockKeyhole, LockKeyholeOpen, PenOff} from "lucide-react";
import ListeTachesEnCours from "@/components/ModeCreateur/ListeTachesEnCours.tsx";
import DemandeAcces from "@/components/ModeCreateur/DemandeAcces.tsx";
import TachesArchivees from "@/components/ModeCreateur/TachesArchivees.tsx";
import {accessAuthentification} from "@/context/AuthentificationContext.tsx";

type PageType = "taches" | "demandeAcces" | "tachesArchivees";

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