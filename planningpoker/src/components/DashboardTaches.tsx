import {useEffect, useState} from 'react';
import {fecthAllTaches, fetchAllUser} from "@/services/api.ts";
import {useQuery} from "@tanstack/react-query";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";

const DashboardTaches = ({ titre }) => {
    const [recherche, setRecherche] = useState<string>('');
    const [pageActuelle, setPageActuelle] = useState(1);
    const [carteSelectionnee, setCarteSelectionnee] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const nombreDeTachesParPage = 6;
    const donnees = [];
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
        const donnees = test.data;

        // Utiliser les taches normalisées pour la suite du composant
        const totalPages = Math.ceil(donnees.length / nombreDeTachesParPage);
        const indexPagination = (pageActuelle - 1) * nombreDeTachesParPage;
        const tachesAffichees = donnees.slice(indexPagination, indexPagination + nombreDeTachesParPage); //Utiliser plus tard, je slice pour uniquement avoir les tâches à afficher
        // TODO: Si la recherche est mise il faut modifier la liste en fonction de la variable recherche
        console.log("Longueur données taches: ", donnees.length);
        console.log("Total pages : ", totalPages);
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
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Rechercher une tâche ..."
                        className="pl-10 h-12"
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                    />
                </div>
            </div>

            {test.isSuccess ? (
                    donnees.length > 0 && totalPages >= 1 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            Afficher les contenus
                        </div>
                    ) : <div className="text-center py-12 text-muted-foreground">
                        Aucune tâche de trouvé.
                    </div>
                ) : <p className="text-center py-12 text-muted-foreground"> Chargement ... </p>
            }
        </div>
    )
}

export default DashboardTaches;