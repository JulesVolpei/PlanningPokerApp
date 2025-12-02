import {CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";


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