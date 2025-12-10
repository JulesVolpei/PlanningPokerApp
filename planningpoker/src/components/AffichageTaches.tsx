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
import {demanderAccessTache, envoyerEvaluation, fecthAllTaches, getDemandesUtilisateur} from "@/services/api.ts";
import {useQuery} from "@tanstack/react-query";
import {toast} from "sonner";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import VoteDialogContent from "@/components/VoteDialog.tsx";
import TacheDetailContent from "@/components/DetailsTacheDialog.tsx";

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
    const [openVote, setOpenVote] = useState(false);
    const [tacheAVoter, setTacheAVoter] = useState(null);
    const [valeurVote, setValeurVote] = useState("");
    const {data: demandesAcces = [], isLoading: loadingDemandes} = useQuery({
        queryKey: ["demandesAcces", utilisateur?.id],
        queryFn: () => getDemandesUtilisateur(utilisateur.id),
        enabled: estConnecte && Boolean(utilisateur?.id),
        refetchInterval: 15000,
    });

    const totalPages = Math.ceil(donnees.length / maxElement);

    const debut = (page - 1) * maxElement;
    const fin = debut + maxElement;
    const mapDemandes = {};
    if (demandesAcces) {
        demandesAcces.forEach(demande => {
            if(demande.tacheId) mapDemandes[demande.tacheId] = demande.statut;
        });
    }
    const donneesPageAvecStatus = donnees.slice(debut, fin).map((tache) => {
        const tacheModifiee = { ...tache };
        if (estConnecte && utilisateur && tache.createurId === utilisateur.id) {
            tacheModifiee.access = "acceptee";
        }
        else if (mapDemandes[tache.id]) {
            tacheModifiee.access = mapDemandes[tache.id];
        }

        return tacheModifiee;
    });

    const ouvrirDialog = (tache) => {
        setTacheSelectionnee(tache);
        setOpen(true);
    };

    const ouvrirDialogVote = (tache) => {
        setTacheAVoter(tache);
        setValeurVote(""); // Reset input
        setOpenVote(true);
    };

    const handleVoteSubmit = async (valeurRecue) => {
        console.log("Valeur vote reçue du dialog : ", valeurRecue);
        if(!valeurRecue) return toast.error("Entrez une valeur !");
        try {
            await envoyerEvaluation(utilisateur.id, tacheAVoter.id, valeurRecue);
            toast.success(`${utilisateur.nom} a voté ${valeurRecue} !`);
            setOpenVote(false);
        } catch (error) {
            toast.error("Erreur lors du vote");
            console.error(error);
        }
    };
    console.log(`Participants : ${donneesPageAvecStatus[0].participantsActuels}`)
    return (
        <div className="flex flex-col gap-8">
            <div className="text-center py-12 text-muted-foreground grid grid-cols-3 gap-6">
                {donneesPageAvecStatus.map((donnee) => (
                    <CarteTache
                        key={donnee.id}
                        donneesTache={donnee}
                        onClickDetail={() => ouvrirDialog(donnee)}
                        onClickVote={() => ouvrirDialogVote(donnee)}
                    />
                ))}
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            className={page === 1 ? "pointer-events-none opacity-40 " : "cursor-pointer"}
                        />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                isActive={page === i + 1}
                                onClick={() => setPage(i + 1)}
                                className={"cursor-pointer"}
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
                            className={page === totalPages ? "pointer-events-none opacity-40" : "cursor-pointer"}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-2xl">
                    <TacheDetailContent tache={tacheSelectionnee} />

                </DialogContent>
            </Dialog>
            <Dialog open={openVote} onOpenChange={setOpenVote}>
                <DialogContent className="max-w-3xl">
                    {tacheAVoter && (
                        <VoteDialogContent
                            tache={tacheAVoter}
                            onSubmit={handleVoteSubmit}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AffichageTaches;
