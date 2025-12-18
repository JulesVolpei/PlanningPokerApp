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
 * Ce composant liste toutes les demandes "En attente" pour les tâches créées par l'utilisateur connecté.
 * Il offre deux actions pour chaque demande :
 * - **Valider** : Donne l'accès à l'utilisateur et ferme la demande.
 * - **Refuser** : Bloque l'accès et ferme la demande.
 *
 * Les données sont rafraîchies automatiquement toutes les 3 secondes pour un aspect temps réel.
 *
 * @category Composants/ModeCreateur
 * @param {props} props - Les infos de l'utilisateur connecté.
 * @returns {JSX.Element} Le tableau des demandes.
 */
const DemandeAcces = ({informationUtilisateur}) => {
    const {data} = useQuery({
        queryKey: ["demandesCreateur", informationUtilisateur.id],
        queryFn: () => getDemandesCreateur(informationUtilisateur.id),
        refetchInterval: 3000,
    });
    const resultats = data || [];
    const resultatsFiltres = resultats;
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