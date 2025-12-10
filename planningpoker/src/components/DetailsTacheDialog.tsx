import {
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {Users, User, Shredder, Activity, MailWarning } from "lucide-react";
import {Progress} from "@/components/ui/progress.tsx";
import {useQuery} from "@tanstack/react-query";
import {retrouverCreateur} from "@/services/api.ts";
import {OrbitProgress} from "react-loading-indicators";
import * as React from "react";
import {Label} from "@/components/ui/label.tsx";

const TacheDetailContent = ({ tache }) => {
    if (!tache) return null;

    const { data: createur, isLoading } = useQuery({
        queryKey: ["createurTache", tache.id],
        queryFn: () => retrouverCreateur(tache.id),
        enabled: !!tache.id,
    });

    const pourcentageVotes = tache.participantsActuels > 0
        ? (tache.nombreVotes / tache.nombreMaxParticipant) * 100
        : 0;

    return (
        <div className="flex flex-col gap-6">
            <DialogHeader>
                <div className="flex items-center justify-between gap-4">
                    <DialogTitle className="text-2xl font-bold">{tache.titre}</DialogTitle>
                </div>
                <DialogDescription className="text-base mt-2">
                    {tache.description || "Aucune description fournie pour cette tâche."}
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                    <span className="flex items-center gap-2 text-primary">
                        <MailWarning className="w-4 h-4" /> Avancement des votes
                    </span>
                    <span>{tache.nombreVotes ? tache.nombreVotes : 0 } / {tache.nombreMaxParticipant} votes</span>
                </div>
                <Progress value={pourcentageVotes} className="h-2" />
                <Label className="text-xs text-muted-foreground text-right">
                    {pourcentageVotes === 100 ? "Tout le monde a voté !" : "En attente de votes..."}
                </Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-6">

                <div className="flex flex-col gap-1 p-3 rounded-lg bg-muted/30">
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                        <Users className="w-4 h-4" /> Participants
                    </span>
                    <span className="font-semibold text-lg">
                        {tache.participantsActuels} / {tache.nombreMaxParticipant}
                    </span>
                </div>

                <div className="flex flex-col gap-1 p-3 rounded-lg bg-muted/30">
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                        <User className="w-4 h-4" /> Créé par
                    </span>
                    <span className="font-semibold text-lg">
                        {isLoading ? (
                            <>
                                <OrbitProgress color="#000000" size="small" text="" textColor="" />
                            </>
                        ) : (
                            createur ? createur.nom : `ID #${tache.createurId}`
                        )}
                    </span>
                </div>

                <div className="flex flex-col gap-1 p-3 rounded-lg bg-muted/30">
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                        <Shredder className="w-4 h-4" /> Méthode de vote
                    </span>
                    <span className="font-semibold text-lg capitalize">
                        {tache.methodeEvaluation}
                    </span>
                </div>

                <div className="flex flex-col gap-1 p-3 rounded-lg bg-muted/30">
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                        <Activity className="w-4 h-4" /> État
                    </span>
                    <span className="font-semibold text-lg capitalize">
                        {tache.statut}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TacheDetailContent;