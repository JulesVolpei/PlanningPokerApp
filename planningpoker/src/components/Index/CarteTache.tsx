import {Button} from "@/components/ui/button.tsx"
import {MailOpen, RotateCcw, Users} from 'lucide-react';
import { LockKeyhole } from 'lucide-react';
import { LockKeyholeOpen } from 'lucide-react';
import { PenOff } from 'lucide-react';
import { Ban } from 'lucide-react';
import { Ellipsis } from 'lucide-react';
import { Mail } from 'lucide-react';

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import {Label} from "@/components/ui/label.tsx";
import {accessAuthentification} from "@/context/AuthentificationContext.tsx";
import {toast} from "sonner";
import {demanderAccessTache, relancerTache} from "@/services/api.ts";
import {useQueryClient} from "@tanstack/react-query";

/**
 * Type représentant les différents niveaux d'accès possibles à une tâche.
 *
 * - `"enAttente"` : L'utilisateur peut demander l'accès.
 * - `"accepte"` : L'utilisateur a accès à la tâche.
 * - `"refuse"` : L'accès à la tâche a été refusé.
 */
type AccessType = "enAttente" | "acceptee" | "refusee" | "full" | "demanderAcces";

/**
 * Carte interactive représentant une tâche.
 *
 * Ce composant affiche le résumé d'une tâche et adapte son bouton d'action en fonction
 * du statut de l'utilisateur vis-à-vis de cette tâche :
 * - **Anonyme/Nouveau** : Bouton "Demander accès".
 * - **En attente** : Bouton désactivé "En attente".
 * - **Accepté/Créateur** : Bouton "Accéder" pour accéder au dialogue de vote.
 * - **Refusé** : Bouton rouge "Refusé".
 * - **Plein** : Bouton "Complet" si le nombre max de participants est atteint.
 *
 * @category Composants/Index
 * @param {props} props - Les données et gestionnaires d'événements.
 * @returns {JSX.Element} La carte rendue.
 */
const CarteTache = ({ donneesTache, onClickDetail, onClickVote }) => {
    const { utilisateur, estConnecte } = accessAuthentification();
    const queryClient = useQueryClient();
    console.log("Data tache : ", donneesTache);
    const handleDemandeAccess = async () => {
        if (!estConnecte) {
            toast.error("Tu dois être connecté pour demander l'accès !");
            return;
        }
        try {
            await demanderAccessTache(utilisateur.id, donneesTache.id);
            toast.success("Demande d'accès envoyée !");
        } catch (e) {
            toast.error("Erreur : Demande déjà envoyée");
        }
    };

    const differentsBoutonsAcces: Record<AccessType, JSX.Element> = {

        demanderAcces: (
            <Button
                className="bg-red-600 hover:bg-red-400 gap-1 group"
                onClick={(e) => {
                    e.stopPropagation();
                    handleDemandeAccess();
                }}>
                <Mail className="block group-hover:hidden" />

                <MailOpen className="hidden group-hover:block" />

                <Label className="cursor-pointer"> Demander accès </Label>
            </Button>
        ),
        acceptee: (
            <Button onClick={(e) => {
                e.stopPropagation(); // Pour pas ouvrir le dialog de la tâche
                onClickVote();
            }}>
                <LockKeyholeOpen />
                <Label className="cursor-pointer"> Accéder </Label>
            </Button>
        ),
        refusee: (
            <Button className="bg-red-600 hover:bg-red-600">
                <Ban />
                <Label className="cursor-pointer"> Refusé </Label>
            </Button>
        ),
        full: (
            <Button>
                <PenOff />
                <Label className="cursor-pointer"> Complet </Label>
            </Button>
        ),
        enAttente: (
            <Button>
                <Ellipsis />
                <Label className="cursor-pointer"> En attente </Label>
            </Button>
        )
    };
    const estCreateur = estConnecte && utilisateur?.id === donneesTache.createurId;
    const estArchivee = donneesTache.statut === "archivee";
    const handleRelancer = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await relancerTache(donneesTache.id);
            await queryClient.invalidateQueries({ queryKey: ["taches"] });
            await queryClient.invalidateQueries({ queryKey: ["tachesArchivees"] });
            toast.success("Le vote a été relancé !");
        } catch (error) {
            toast.error("Impossible de relancer la tâche");
            console.error(error);
        }
    };
    return (
        <Card
            className="w-full max-w-sm cursor-pointer hover:shadow-lg transition"
            onClick={onClickDetail}
        >
            <CardHeader>
                <CardTitle>{donneesTache.titre}</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Si la tâche est archivée, on fait un bouton JSON qui permet de voir le vote au format JSON */}
            </CardContent>
            <CardFooter className="flex-col grid grid-cols-2 gap-6">
                <Button>
                    <Label> {donneesTache.statut !== "archivee" ? `${donneesTache.participantsActuels} / ${donneesTache.nombreMaxParticipant}` : `${donneesTache.nombreMaxParticipant} / ${donneesTache.nombreMaxParticipant}`} </Label>
                    <Users />
                </Button>
                {estCreateur && estArchivee ? (
                    <Button
                        className="w-full gap-2"
                        variant="default"
                        onClick={handleRelancer}
                    >
                        <RotateCcw className="w-4 h-4" />
                        <Label className="cursor-pointer">Relancer</Label>
                    </Button>
                ) : (
                    donneesTache.access
                        ? differentsBoutonsAcces[donneesTache.access]
                        : differentsBoutonsAcces["demanderAcces"]
                )}
            </CardFooter>
        </Card>
    );
};

export default CarteTache;