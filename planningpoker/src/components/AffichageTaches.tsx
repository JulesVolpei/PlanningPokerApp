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

const AffichageTaches = ({ donnees, maxElement }) => {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [tacheSelectionnee, setTacheSelectionnee] = useState(null);

    const totalPages = Math.ceil(donnees.length / maxElement);

    const debut = (page - 1) * maxElement;
    const fin = debut + maxElement;

    const donneesPage = donnees.slice(debut, fin);

    const ouvrirDialog = (tache) => {
        setTacheSelectionnee(tache);
        setOpen(true);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="text-center py-12 text-muted-foreground grid grid-cols-3 gap-6">
                {donneesPage.map((donnee) => (
                    <CarteTache
                        key={donnee.id}
                        donneesTache={donnee}
                        access={"enAttente"}
                        onClick={() => ouvrirDialog(donnee)}
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
