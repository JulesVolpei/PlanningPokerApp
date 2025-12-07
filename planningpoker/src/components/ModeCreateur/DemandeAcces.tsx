import {CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Check } from 'lucide-react';
import { X } from 'lucide-react';
import {Button} from "@/components/ui/button.tsx";

/**
 * Composant affichant les différentes demandes faites à un utilisateur pour accéder à une tâche à évaluer.
 *
 * Permet :
 * - D'afficher les demandes d'accès à une tâche précisée par un utilisateur indiqué par son nom.
 * - D'accepter la demande d'accès à l'utilisateur.
 * - De refuser la demande d'accès faite par l'utilisateur.
 *
 * @param informationUtilisateur Variable contenant les informations liées à l'utilisateur connecté via le contexte d'authentification de l'application.
 * @returns {JSX.Element} Retourne un composant permettant de valider l'accès ou non à une tâche à un utilisateur externe.
 */
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
                <Table>
                    <TableCaption>Tant de demandes, vous ne seriez pas ministre pas hasard ?</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Utilisateur</TableHead>
                            <TableHead className="w-full text-center">Tâche</TableHead>
                            <TableHead className="text-right"> Validation / Refus </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">User1</TableCell>
                            <TableCell>GouGouGaGa</TableCell>
                            <TableCell className="text-right grid grid-cols-2 gap-6">
                                <Button className="flex items-center justify-center bg-green-600 hover:bg-green-500">
                                    <Check className="h-4 w-4" />
                                </Button>
                                <Button className="flex items-center justify-center bg-red-600 hover:bg-red-500">
                                    <X className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </>
    )
}

export default DemandeAcces;