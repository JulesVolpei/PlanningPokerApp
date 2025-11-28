import {CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";


const DemandeAcces = ({informationUtilisateur}) => {
    return (
        <>
            <CardHeader>
                <CardTitle>Gérer les demandes d'accès à vos tâches</CardTitle>
                <CardDescription>
                    Toutes ces personnes qui veulent voter .. on devrait en faire un truc non ?
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">

            </CardContent>
        </>
    )
}

export default DemandeAcces;