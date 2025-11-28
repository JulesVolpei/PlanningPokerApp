import {CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import { Plus } from 'lucide-react';
import BarreDeRecherche from "@/components/Index/BarreDeRecherche.tsx";
import * as React from "react";
import {fecthAllTaches, getTachesWithUserId} from "@/services/api.ts";
import { PartyPopper } from 'lucide-react';
import {useQuery} from "@tanstack/react-query";
import AffichageTaches from "@/components/AffichageTaches.tsx";


const ListeTachesEnCours = ({informationUtilisateur}) => {
    const [recherche, setRecherche] = React.useState('');
    const tacheUtilisateur = useQuery({
        queryKey: ["tachesUser", informationUtilisateur.id],
        queryFn: () => getTachesWithUserId(informationUtilisateur.id),
        refetchInterval: 15000,
    });
    if (tacheUtilisateur.isSuccess) {
        console.log(tacheUtilisateur.data);
    }
    return (
        <>
            <CardHeader>
                <CardTitle>Liste des tâches en cours</CardTitle>
                <CardDescription>
                    <Label className="flex justify-center"> Bonjour {informationUtilisateur.nom} !<PartyPopper size={"20px"}/></Label>
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">

                <div className="mb-8">
                    <div className="relative">
                        <BarreDeRecherche value={recherche} onChange={(e) => setRecherche(e.target.value)}/>
                    </div>
                </div>

                <AffichageTaches donnees={tacheUtilisateur.data} />

            </CardContent>
            <CardFooter>
                <Button><Plus /> Créer une tâche </Button>
            </CardFooter>
        </>
    )
}

export default ListeTachesEnCours;