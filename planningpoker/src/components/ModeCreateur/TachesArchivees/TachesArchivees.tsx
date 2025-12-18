import {CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useQuery} from "@tanstack/react-query";
import {getTachesArchivees} from "@/services/api.ts";
import BarreDeRecherche from "@/components/Index/BarreDeRecherche.tsx";
import * as React from "react";
import {use, useState} from "react";
import {OrbitProgress} from "react-loading-indicators";
import AffichageTaches from "@/components/AffichageTaches.tsx";


/**
 * Ce composant permet d'afficher l'historique des sessions de planning poker
 * qui ont été clôturées.
 * Les tâches affichées sont des tâches créées par l'utilisateur et le bouton permettant initialement
 * d'accéder au vote est remplacé pour relancer le vote de la tâche.
 * Un bouton est également présent pour enregistrer les données de votes.
 *
 *
 * @category Composants/ModeCreateur
 * @param {props} props - Les informations de l'utilisateur.
 * @returns {JSX.Element} La structure de la page d'archives des tâches avec une barre de recherche pour filtrer les résultats.
 */
const TachesArchivees = ({informationUtilisateur}) => {
    const [recherche, setRecherche] = useState<string>('');
    let donneesFiltrees = [];
    const { data: archives = [], isSuccess} = useQuery({
        queryKey: ["tachesArchivees", informationUtilisateur?.id],
        queryFn: () => getTachesArchivees(informationUtilisateur.id),
        enabled: !!informationUtilisateur?.id,
    });
    if (isSuccess) {
        donneesFiltrees = archives.filter(tache =>
            tache.titre.toLowerCase().includes(recherche.toLowerCase())
        );
    }

    return (
        <>
            <CardHeader>
                <CardTitle>Voici les différentes tâches évaluées</CardTitle>
                <CardDescription>
                    Assez voté, au travail maintenant !
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="mb-8">
                    <div className="relative">
                        <BarreDeRecherche value={recherche} onChange={(e) => setRecherche(e.target.value)}/>
                    </div>
                </div>

                {archives ? (
                    <AffichageTaches donnees={donneesFiltrees} maxElement={3} listeIdTache={null}/>
                ) : <OrbitProgress color="#000000" size="medium" text="" textColor="" />}
            </CardContent>
        </>
    )
}

export default TachesArchivees;