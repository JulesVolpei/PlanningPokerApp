import {Button} from "@/components/ui/button.tsx"
import { Users } from 'lucide-react';
import { LockKeyhole } from 'lucide-react';
import { LockKeyholeOpen } from 'lucide-react';
import { PenOff } from 'lucide-react';

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
import {demanderAccessTache} from "@/services/api.ts";

/**
 * Type représentant les différents niveaux d'accès possibles à une tâche.
 *
 * - `"enAttente"` : L'utilisateur peut demander l'accès.
 * - `"accepte"`   : L'utilisateur a accès à la tâche.
 * - `"refuse"`    : L'accès à la tâche a été refusé.
 */
type AccessType = "enAttente" | "accepte" | "refuse";

/**
 * Composant d'affichage d'une carte de tâche.
 *
 * Ce composant permet de :
 * - afficher un aperçu d'une tâche (titre, participants),
 * - montrer l'état d'accès de l'utilisateur à cette tâche,
 * - proposer un bouton différent selon le niveau d'accès :
 *    - bouton pour demander l'accès (`enAttente`),
 *    - bouton pour accéder (`accepte`),
 *    - bouton indiquant le refus (`refuse`),
 * - déclencher une fonction via `onClick` lorsqu'on clique sur la carte entière.
 *
 * @this {differentsBoutonsAcces} Dictionnaire permettant d'afficher un composant en fonction de la variable AccessType donnée.
 * @param {CarteTacheProps} props Les propriétés reçues par le composant.
 * @returns {JSX.Element} Un composant de carte interactive représentant une tâche.
 */
const CarteTache = ({donneesTache, onClick, idTache, demandes}) => {
    const { utilisateur, estConnecte } = accessAuthentification();
    const listeDemande = null;


    const handleDemandeAccess = async () => {
        if (!estConnecte) {
            toast.error("Tu dois être connecté pour demander l'accès !");
            return;
        }

        try {
            await demanderAccessTache(utilisateur.id, idTache);
            toast.success("Demande d'accès envoyée !");
        } catch (e) {
            toast.error("Erreur : ", e);
        }
    };
    const differentsBoutonsAcces: Record<AccessType, JSX.Element> = {
        enAttente: ( // Il faudra faire un onClick pour demander l'accès lorsque l'on est connecté
            <Button className="bg-red-600 hover:bg-red-400 gap-1" onClick={handleDemandeAccess}>
                <LockKeyhole />
                <Label> Demander accès </Label>
            </Button>
        ),
        accepte: (
            <Button>
                <LockKeyholeOpen />
                <Label> Accéder </Label>
            </Button>
        ),
        refuse: (
            <Button className="bg-red-600 hover:bg-red-600">
                <PenOff />
                <Label> Refusé </Label>
            </Button>
        ),
    };
    return (
        <Card
            className="w-full max-w-sm cursor-pointer hover:shadow-lg transition"
            onClick={onClick}
        >
            <CardHeader>
                <CardTitle>{donneesTache.titre}</CardTitle>
                <CardDescription>
                    Created by ...
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Label className="flex justify-center w-full">
                    Afficher l'état de la tâche
                </Label>
            </CardContent>

            <CardFooter className="flex-col gap-2 grid grid-cols-2 gap-6">
                <Button>
                    <Label> 0 / {donneesTache.nombreMaxParticipant} </Label>
                    <Users />
                </Button>

                {donneesTache.access ? differentsBoutonsAcces[donneesTache.access] : differentsBoutonsAcces["enAttente"]}
            </CardFooter>
        </Card>
    );
};


export default CarteTache;