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
 * Tableau de bord des tâches actives de l'utilisateur.
 *
 * Ce composant gère l'affichage principal du mode créateur :
 * - Message de bienvenue personnalisé.
 * - Barre de recherche.
 * - Récupération automatique des tâches toutes les 15 secondes.
 * - Affichage de la grille de tâches ou d'un indicateur de chargement.
 *
 * @category Composants/ModeCreateur
 * @param {props} props - Les informations de l'utilisateur courant.
 * @returns {JSX.Element} La vue complète des tâches en cours.
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
    let donneesFiltrees = [];
    if (tacheUtilisateur.isSuccess) {
        donnees = tacheUtilisateur.data;
        donnees.map((donnee) => {
            idTaches.push(donnee.createurId);
        })
        donneesFiltrees = donnees.filter(tache =>
            tache.titre.toLowerCase().includes(recherche.toLowerCase()) && tache.statut !== "archivee"
        );
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

                {tacheUtilisateur.isSuccess ? <AffichageTaches donnees={donneesFiltrees} maxElement={3} listeIdTache={idTaches} /> : <OrbitProgress color="#000000" size="medium" text="" textColor="" />}

            </CardContent>
            <CardFooter>
                <BoutonCreerTache informationUtilisateur={informationUtilisateur} open={open} setOpen={setOpen}/>
            </CardFooter>
        </>
    )
}

export default ListeTachesEnCours;