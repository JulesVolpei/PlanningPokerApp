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
 * Tableau de bord principal de l'application.
 *
 * Ce composant agit comme le contrôleur de la page d'accueil. Il est responsable de :
 * 1. **Récupérer** la liste complète des tâches depuis l'API.
 * 2. **Filtrer** ces tâches via la barre de recherche (filtrage côté client).
 * 3. **Afficher** le résultat via le composant de présentation {@link AffichageTaches}.
 *
 * @category Composants/Pages
 * @param {props} props - Les propriétés de configuration.
 * @returns {JSX.Element} La page principale avec recherche et grille de tâches.
 */
const DashboardTaches = ({ titre }) => {
    const [recherche, setRecherche] = useState<string>('');
    const [pageActuelle, setPageActuelle] = useState(1);
    const nombreDeTachesParPage = 6;
    let donnees = [];
    let donneesFiltrees = [];
    const idTaches = [];


    const listeTacheQuery = () => {
        return useQuery({
            queryKey: ["taches"],
            queryFn: fecthAllTaches,
            refetchInterval: 15000,
        });
    };



    const test = listeTacheQuery();

    if (test.isSuccess) {
        donnees = test.data;
        donnees.map((donnee, cmpt) => {
            idTaches.push(donnee.createurId);
        })
        donneesFiltrees = donnees.filter(tache =>
            tache.titre.toLowerCase().includes(recherche.toLowerCase()) && tache.statut !== "archivee"
        );
    }
    console.log("Data dashboard : ", donneesFiltrees);
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
                    <AffichageTaches donnees={donneesFiltrees} maxElement={6} listeIdTache={idTaches}/>
                ) : <div className="text-center py-12 text-muted-foreground grid grid-cols-3 gap-4">
                    <p className="text-center py-12 text-muted-foreground"> No data ? (comme le meme) </p>
                </div>
            ) : <OrbitProgress color="#000000" size="medium" text="" textColor="" />
            }
        </div>
    )
}

export default DashboardTaches;