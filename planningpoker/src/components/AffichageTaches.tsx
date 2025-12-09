import { useState } from "react";
import CarteTache from "@/components/Index/CarteTache";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationLink,
} from "@/components/ui/pagination";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {accessAuthentification} from "@/context/AuthentificationContext.tsx";
import {fecthAllTaches, getDemandesUtilisateur} from "@/services/api.ts";
import {useQuery} from "@tanstack/react-query";

/**
 * Composant permettant d'afficher un certain nombre de tâches données en paramètre.
 *
 * @this {[page, setPage]} Hooker permettant de mettre à jour la page courante.
 * @this {[open, setOpen]} Hooker permettant de mettre à jour l'ouverture ou non du dialogue shadcn/ui affichant le détail de la tâche.
 * @this {[tacheSelectionnee, setTacheSelectionnee]} Hooker permettant de mettre à jour la tâche sélectionnée par l'utilisateur.
 * @this {totalPages} Variable correspondant au nombre de pages pour la pagination en fonction du nombre de tâche et du nombre de tâche à afficher.
 * @this {debut} Variable correspondant à la première page de la pagination.
 * @this {fin} Variable correspondant à la dernière page de la pagination.
 * @this {donneesPage} Variable correspondant à un slice sur l'ensemble des tâche en partant de la variable debut à la variable fin.
 * @this {ouvrirDialog} Fonction permettant d'appeler les hooker pour modifier la valeur de la tâche sélectionnée et de l'ouverture du dialogue shadcn/ui.
 * @param donnees Variable contenant toutes les données relatives aux tâches.
 * @param maxElement Variable indiquant le nombre de tâche à afficher.
 * @returns {JSX.Element} Retourne un composant gérant l'affichage et la pagination des tâches.
 */
const AffichageTaches = ({ donnees, maxElement, listeIdTache }) => {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [tacheSelectionnee, setTacheSelectionnee] = useState(null);
    const {estConnecte, utilisateur} = accessAuthentification();
    const {data: demandesAcces = [], isLoading: loadingDemandes} = useQuery({
        queryKey: ["demandesAcces", utilisateur?.id],
        queryFn: () => getDemandesUtilisateur(utilisateur.id),
        enabled: estConnecte && Boolean(utilisateur?.id),
        refetchInterval: 15000,
    });

    const totalPages = Math.ceil(donnees.length / maxElement);

    const debut = (page - 1) * maxElement;
    const fin = debut + maxElement;
    if (demandesAcces) {
        for (let i = 0; i < demandesAcces.length; i++) {
            console.log("TEST : ", demandesAcces[i]["tacheId"])
            donnees[demandesAcces[i]["tacheId"]]["access"] = demandesAcces[i]["statut"];
        }
    }

    const donneesPage = donnees.slice(debut, fin);
    const listeIdTachePage = listeIdTache ? listeIdTache.slice(debut, fin) : [];

    if (listeIdTachePage && estConnecte) {
        for (let i = 0; i < donneesPage.length; i++) {
            if (utilisateur.id == listeIdTachePage[i]) {
                donneesPage[i]["access"] = "acceptee"
            }
        }
    }


    const ouvrirDialog = (tache) => {
        setTacheSelectionnee(tache);
        setOpen(true);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="text-center py-12 text-muted-foreground grid grid-cols-3 gap-6">
                {donneesPage.map((donnee, idTache) => (
                    <CarteTache
                        key={donnee.id}
                        donneesTache={donnee}
                        onClick={() => ouvrirDialog(donnee)}
                        idTache = {donnee.id}
                    />
                ))}
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            className={page === 1 ? "pointer-events-none opacity-40" : ""}
                        />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                isActive={page === i + 1}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                setPage((p) => Math.min(totalPages, p + 1))
                            }
                            className={page === totalPages ? "pointer-events-none opacity-40" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    {tacheSelectionnee && (
                        <>
                            <DialogHeader>
                                <DialogTitle>{tacheSelectionnee.titre}</DialogTitle>
                                <DialogDescription>
                                    {tacheSelectionnee.description}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="mt-4 space-y-3">
                                <p><strong>Participants max :</strong> {tacheSelectionnee.nombreMaxParticipant}</p>
                                <p><strong>Statut :</strong> {tacheSelectionnee.statut}</p>
                                <p><strong>Créateur :</strong> {tacheSelectionnee.createurId}</p>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default AffichageTaches;
