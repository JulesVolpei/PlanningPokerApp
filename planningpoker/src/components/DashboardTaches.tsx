import {useEffect, useState} from 'react';
import {fecthAllTaches} from "@/services/api.ts";

const DashboardTaches = ({ titre }) => {
    const [recherche, setRecherche] = useState<string>('');
    const [pageActuelle, setPageActuelle] = useState(1);
    const [carteSelectionnee, setCarteSelectionnee] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const nombreDeTachesParPage = 6;
    const [tachesNormalisees, setTachesNormalisees] = useState<any[]>([]);

    const [informationsTaches, setInformationsTAches] = useState<any[]>([]);

    useEffect(() => {
        fecthAllTaches().then((data) => {
            setInformationsTAches(data);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    if (loading) {
        // TODO: A changer plus tard par un component de chargement
        return <p> Chargement des données </p>
    }

    // Utiliser les taches normalisées pour la suite du composant
    const totalPages = Math.ceil(tachesNormalisees.length / nombreDeTachesParPage);
    const indexPagination = (pageActuelle - 1) * nombreDeTachesParPage;
    const tachesAffichees = tachesNormalisees.slice(indexPagination, indexPagination + nombreDeTachesParPage);

    return (
        <div className="w-full max-w-6x1 mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-black mb-8">
                {titre}
            </h1>

            <div></div>
        </div>
    )
}

export default DashboardTaches;