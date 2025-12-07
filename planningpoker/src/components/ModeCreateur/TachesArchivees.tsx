import {CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";


/**
 * Composant permettant d'afficher les différentes tâches archivées.
 *
 * @param informationUtilisateur Variable contenant les informations sur l'utilisateur connecté.
 */
const TachesArchivees = ({informationUtilisateur}) => {
    return (
        <>
            <CardHeader>
                <CardTitle>Voici les différentes tâches évaluées</CardTitle>
                <CardDescription>
                    Il serait temps de se mettre au travail !
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">

            </CardContent>
        </>
    )
}

export default TachesArchivees;