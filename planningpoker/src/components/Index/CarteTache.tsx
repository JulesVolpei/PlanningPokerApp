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

type AccessType = "enAttente" | "accepte" | "refuse";

const CarteTache = ({donneesTache, access}) => {
    const differentsBoutonsAcces: Record<AccessType, JSX.Element> = {
        enAttente: ( // Il faudra faire un onClick pour demander l'accès lorsque l'on est connecté
            <Button className="bg-red-600 hover:bg-red-400">
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
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle> {donneesTache.titre} </CardTitle>
                <CardDescription>
                    Created by ...
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-6">
                    <Label className="flex justify-center w-full"> Afficher l'état de la tâche </Label>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 grid grid-cols-2 gap-6">
                <Button>
                    <Label> 0 / {donneesTache.nombreMaxParticipant} </Label>
                    <Users />
                </Button>
                {differentsBoutonsAcces[access]}
            </CardFooter>
        </Card>
    )
}

export default CarteTache;