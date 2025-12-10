import {CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import BarreDeRecherche from "@/components/Index/BarreDeRecherche.tsx";
import * as React from "react";
import {getTachesWithUserId} from "@/services/api.ts";
import { PartyPopper } from 'lucide-react';
import {useQuery} from "@tanstack/react-query";
import AffichageTaches from "@/components/AffichageTaches.tsx";
import {OrbitProgress} from "react-loading-indicators";
import BoutonCreerTache from "@/components/ModeCreateur/TachesEnCours/BoutonCreerTache.tsx";

/**
 * Composant affichant la liste des tâches en cours pour un utilisateur donné.
 *
 * Permet de :
 * - Afficher un message de bienvenue personnalisé.
 * - Rechercher parmi les tâches.
 * - Afficher les tâches en cours ou un indicateur de chargement.
 * - Ouvrir un dialogue pour créer une nouvelle tâche via un formulaire.
 *
 * @param {informationUtilisateur} Variable contenant des informations liées à l'utilisateur via le contexte d'authentification.
 * @this {[recherche, setRecherche]} Hooker permettant de mettre à jour la valeur dans la barre de recherche.
 * @this {[open, setOpen]} Hooker permettant d'ouvrir le dialogue shadcn/ui du détail de la tâche.
 * @this {tacheUtilisateur()} UseQuery permettant de faire un appel à la base de données toutes les X secondes pour avoir une actualisation des tâches à afficher.
 * @returns {JSX.Element} Un composant contenant la liste des tâches en cours pour un utilisateur.
 *
 */
const ListeTachesEnCours = ({informationUtilisateur}) => {
    const [recherche, setRecherche] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const tacheUtilisateur = useQuery({
        queryKey: ["tachesUser", informationUtilisateur.id],
        queryFn: () => getTachesWithUserId(informationUtilisateur.id),
        refetchInterval: 15000,
    });
    const idTaches = []
    let donnees = [];
    if (tacheUtilisateur.isSuccess) {
        donnees = tacheUtilisateur.data;
        donnees.map((donnee) => {
            idTaches.push(donnee.createurId);
        })
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

                {tacheUtilisateur.isSuccess ? <AffichageTaches donnees={donnees} maxElement={3} listeIdTache={idTaches} /> : <OrbitProgress color="#000000" size="medium" text="" textColor="" />}

            </CardContent>
            <CardFooter>
                <BoutonCreerTache informationUtilisateur={informationUtilisateur} open={open} setOpen={setOpen}/>
            </CardFooter>
        </>
    )
}

export default ListeTachesEnCours;