import {useEffect, useState} from 'react';
import {fecthAllTaches, fetchAllUser} from "@/services/api.ts";
import {useQuery} from "@tanstack/react-query";

const DashboardTaches = ({ titre }) => {
    const [recherche, setRecherche] = useState<string>('');
    const [pageActuelle, setPageActuelle] = useState(1);
    const [carteSelectionnee, setCarteSelectionnee] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const nombreDeTachesParPage = 6;

    //const {data: taches, error, isLoading, isFetching } = listeTacheQuery();

    const [informationsTaches, setInformationsTAches] = useState<any[]>([]);

    const listeTacheQuery = () => {
        return useQuery({
            queryKey: ["taches"],
            queryFn: fecthAllTaches,
            refetchInterval: 15000,
        });
    };

    const test = listeTacheQuery();

    console.log(test);

    // Utiliser les taches normalisées pour la suite du composant
    const totalPages = Math.ceil(informationsTaches.length / nombreDeTachesParPage);
    const indexPagination = (pageActuelle - 1) * nombreDeTachesParPage;
    const tachesAffichees = informationsTaches.slice(indexPagination, indexPagination + nombreDeTachesParPage);

    console.log(test.data);

    return (
        <div className="w-full max-w-6x1 mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-black mb-8">
                {titre}
            </h1>

            <div>
                {test.isSuccess ?
                    <p className="text-2xl bg-gradient-primary bg-clip-text text-black mb-8"> Données chargées avec succès !</p> :
                    <p className="text-2xl bg-gradient-primary bg-clip-text text-black mb-8"> Chargement ... </p>
                    // TODO: Faire un composant d'une carte avec toutes les infos avec la pagination et tout
                }
            </div>
        </div>
    )
}

export default DashboardTaches;