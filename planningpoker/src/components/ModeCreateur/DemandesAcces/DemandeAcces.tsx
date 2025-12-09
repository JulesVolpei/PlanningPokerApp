import {CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx";
import {Check} from 'lucide-react';
import {X} from 'lucide-react';
import {Button} from "@/components/ui/button.tsx";
import {accepterDemande, getDemandesCreateur, refuserDemande} from "@/services/api.ts";
import {useQuery} from "@tanstack/react-query";
import {OrbitProgress} from "react-loading-indicators";
import * as React from "react";

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
    const {data} = useQuery({
        queryKey: ["demandesCreateur", informationUtilisateur.id],
        queryFn: () => getDemandesCreateur(informationUtilisateur.id),
        refetchInterval: 3000,
    });
    const resultats = data || [];
    const resultatsFiltres = resultats;
    console.log(resultatsFiltres);
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
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Utilisateur</TableHead>
                            <TableHead className="w-full text-center">Tâche</TableHead>
                            <TableHead className="text-right"> Validation / Refus </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {resultatsFiltres ? resultatsFiltres.map((donnee, id) => {
                            return (
                                <TableRow key={id}>
                                    <TableCell className="font-medium">{donnee["utilisateur"]["nom"]}</TableCell>
                                    <TableCell>{donnee["tache"]["titre"]}</TableCell>
                                    <TableCell className="text-right grid grid-cols-2 gap-6">
                                        <Button
                                            className="flex items-center justify-center bg-green-600 hover:bg-green-500"
                                            onClick={() => accepterDemande(donnee.id)}
                                        >
                                            <Check className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            className="flex items-center justify-center bg-red-600 hover:bg-red-500"
                                            onClick={() => refuserDemande(donnee.id)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        }) : <OrbitProgress color="#000000" size="medium" text="" textColor="" />}
                    </TableBody>
                </Table>
            </CardContent>
        </>
    )
}

export default DemandeAcces;