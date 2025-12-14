import {CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";


/**
 * Vue des tâches terminées et archivées.
 *
 * Ce composant a pour but d'afficher l'historique des sessions de Planning Poker
 * qui ont été clôturées.
 *
 * @remarks
 * Pas encore développé dans l'application.
 *
 * @category Composants/ModeCreateur
 * @param {props} props - Les informations de l'utilisateur.
 * @returns {JSX.Element} La structure de la page d'archives.
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