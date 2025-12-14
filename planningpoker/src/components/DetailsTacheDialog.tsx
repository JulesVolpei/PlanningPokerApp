import {
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {Users, User, Shredder, Activity, MailWarning, CheckCircle2, CircleX} from "lucide-react";
import {Progress} from "@/components/ui/progress.tsx";
import {useQuery} from "@tanstack/react-query";
import {retrouverCreateur} from "@/services/api.ts";
import {OrbitProgress} from "react-loading-indicators";
import * as React from "react";
import {Label} from "@/components/ui/label.tsx";

/**
 * Ce composant affiche une vue complète des informations d'une tâche.
 * L'affichage s'adapte dynamiquement selon l'état de la tâche :
 *
 * - **Titre et description** : Informations de base.
 * - Si la tâche est **en cours** : Affiche une barre de progression des votes.
 * - Si la tâche est **archivée** : Affiche le résultat final avec le message associé.
 * - **Métadonnées** : Participants, créateur, méthode de calcul et statut.
 *
 * @category Composants/Tâches
 * @param {props} props - Les données de la tâche à afficher.
 * @returns {JSX.Element} Le contenu du dialogue.
 */
const TacheDetailContent = ({ tache }) => {
    const { data: createur, isLoading } = useQuery({
        queryKey: ["createurTache", tache.id],
        queryFn: () => retrouverCreateur(tache.id),
        enabled: !!tache.id,
    });

    const pourcentageVotes = tache.participantsActuels > 0
        ? (tache.nombreVotes / tache.nombreMaxParticipant) * 100
        : 0;
    const estArchivee = tache.noteFinale !== undefined && tache.noteFinale !== null;
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
                {estArchivee ? (
                    tache.noteFinale["etat"] === "Reussite" ? (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-2 shadow-sm">
                        <span className="text-green-800 dark:text-green-400 font-semibold flex items-center gap-2 uppercase tracking-wide text-sm">
                            <CheckCircle2 className="w-5 h-5" /> Résultat Final
                        </span>
                            <span className="text-5xl font-extrabold text-green-700 dark:text-green-300 tracking-tighter">
                            {tache.noteFinale["message"]}
                        </span>
                        </div>
                    ) : (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-2 shadow-sm">
                        <span className="text-red-800 dark:text-red-400 font-semibold flex items-center gap-2 uppercase tracking-wide text-sm">
                            <CircleX className="w-5 h-5" /> Résultat Final
                        </span>
                            <span className="text-5xl font-extrabold text-red-700 dark:text-red-300 tracking-tighter">
                            {tache.noteFinale["message"]}
                        </span>
                        </div>
                    )
                ) : (
                    <>
                        <div className="flex justify-between text-sm font-medium">
                            <span className="flex items-center gap-2 text-primary">
                                <MailWarning className="w-4 h-4" /> Avancement des votes
                            </span>
                            <span>{tache.nombreVotes ? tache.nombreVotes : 0 } / {tache.nombreMaxParticipant} votes</span>
                        </div>
                        <Progress value={pourcentageVotes} className="h-2" />
                        <Label className="text-xs text-muted-foreground text-right block">
                            {pourcentageVotes === 100 ? "Tout le monde a voté !" : "En attente de votes..."}
                        </Label>
                    </>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-6">

                <div className="flex flex-col gap-1 p-3 rounded-lg bg-muted/30">
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                        <Users className="w-4 h-4" /> Participants
                    </span>
                    <span className="font-semibold text-lg">
                        {tache.statut !== "archivee" ? `${tache.participantsActuels} / ${tache.nombreMaxParticipant}` : `${tache.nombreMaxParticipant} / ${tache.nombreMaxParticipant}`}
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
                        {estArchivee ? "Archivée" : tache.statut}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TacheDetailContent;