import {Component, useEffect, useState} from 'react';
import {fecthAllTaches, fetchAllUser} from "@/services/api.ts";
import {useQuery} from "@tanstack/react-query";
import BarreDeRecherche from "@/components/Index/BarreDeRecherche.tsx";
import CarteTache from "@/components/Index/CarteTache.tsx";
import {Label} from "@/components/ui/label.tsx";
import {OrbitProgress} from "react-loading-indicators";
import * as React from "react";
import AffichageTaches from "@/components/AffichageTaches.tsx";

/**
 * Composant d'affichage principal des tâches.
 *
 * Le composant permet de :
 * - récupèrer la liste des tâches depuis l'API via *React Query*,
 * - afficher un champ de recherche,
 * - gèrer une pagination interne,
 * - afficher les tâches via le composant {@link AffichageTaches},
 * - montrer un loader tant que les données ne sont pas disponibles.
 *
 * @param {string} titre Titre de la tâche.
 */
const DashboardTaches = ({ titre }) => {
    const [recherche, setRecherche] = useState<string>('');
    const [pageActuelle, setPageActuelle] = useState(1);
    const nombreDeTachesParPage = 6;
    let donnees = [];
    const idTaches = []


    const listeTacheQuery = () => {
        return useQuery({
            queryKey: ["taches"],
            queryFn: fecthAllTaches,
            refetchInterval: 15000,
        });
    };

    const test = listeTacheQuery();

    console.log("Succès : ", test.isSuccess);

    if (test.isSuccess) {
        donnees = test.data;
        console.log("TOUTES DONNEES : ", donnees);
        donnees.map((donnee, cmpt) => {
            idTaches.push(donnee.createurId);
        })
        console.log(idTaches);
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-black mb-8">
                {titre}
            </h1>

            <div className="mb-8">
                <div className="relative">
                    <BarreDeRecherche value={recherche} onChange={(e) => setRecherche(e.target.value)}/>
                </div>
            </div>

            {test.isSuccess ? (
                donnees.length > 0 ? (
                    <AffichageTaches donnees={donnees} maxElement={6} listeIdTache={idTaches}/>
                ) : <div className="text-center py-12 text-muted-foreground grid grid-cols-3 gap-4">
                    <p className="text-center py-12 text-muted-foreground"> No data ? (comme le meme) </p>
                </div>
            ) : <OrbitProgress color="#000000" size="medium" text="" textColor="" />
            }
        </div>
    )
}

export default DashboardTaches;