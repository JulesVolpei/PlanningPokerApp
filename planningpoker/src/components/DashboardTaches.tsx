import {Component, useEffect, useState} from 'react';
import {fecthAllTaches, fetchAllUser} from "@/services/api.ts";
import {useQuery} from "@tanstack/react-query";
import BarreDeRecherche from "@/components/BarreDeRecherche.tsx";
import CarteTache from "@/components/CarteTache.tsx";
import {Label} from "@/components/ui/label.tsx";


const DashboardTaches = ({ titre }) => {
    const [recherche, setRecherche] = useState<string>('');
    const [pageActuelle, setPageActuelle] = useState(1);
    const [carteSelectionnee, setCarteSelectionnee] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const nombreDeTachesParPage = 6;
    let donnees = [];
    const totalPages = 0;

    //const {data: taches, error, isLoading, isFetching } = listeTacheQuery();


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

        // Utiliser les taches normalisées pour la suite du composant
        const totalPages = Math.ceil(donnees.length / nombreDeTachesParPage);
        const indexPagination = (pageActuelle - 1) * nombreDeTachesParPage;
        const tachesAffichees = donnees.slice(indexPagination, indexPagination + nombreDeTachesParPage); //Utiliser plus tard, je slice pour uniquement avoir les tâches à afficher
        // TODO: Si la recherche est mise il faut modifier la liste en fonction de la variable recherche
        console.log("Longueur données taches: ", donnees.length);
        console.log("Total pages : ", totalPages);
        console.log("Données : ", donnees[0]);
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-black mb-8">
                {titre}
            </h1>
            {/*<h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-8">*/}
            {/*    {test.isSuccess ?*/}
            {/*        <p className="text-2xl bg-gradient-primary bg-clip-text text-black mb-8"> Données chargées avec succès !</p> :*/}
            {/*        <p className="text-2xl bg-gradient-primary bg-clip-text text-black mb-8"> Chargement ... </p>*/}
            {/*        // TODO: Faire un composant d'une carte avec toutes les infos avec la pagination et tout*/}
            {/*    }*/}
            {/*</h1>*/}

            <div className="mb-8">
                <div className="relative">
                    <BarreDeRecherche value={recherche} onChange={(e) => setRecherche(e.target.value)}/>
                </div>
            </div>

            {test.isSuccess ? (
                donnees.length > 0 ? (
                    <div className="text-center py-12 text-muted-foreground grid grid-cols-3 gap-6">
                        {donnees.map((donne) => (
                            <CarteTache donneesTache={donne} />
                        ))}
                    </div>
                ) : <div className="text-center py-12 text-muted-foreground grid grid-cols-3 gap-4">
                    <p className="text-center py-12 text-muted-foreground"> No data ? (comme le meme) </p>
                </div>
            ) : <p className="text-center py-12 text-muted-foreground"> Chargement ... </p>
            }
        </div>
    )
}

export default DashboardTaches;