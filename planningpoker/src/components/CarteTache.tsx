import {Button} from "@/components/ui/button"
import { Users } from 'lucide-react';
import { LockKeyhole } from 'lucide-react';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input.tsx";

const CarteTache = ({donneesTache}) => {
    console.log(donneesTache);
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
                    <Label className="flex justify-center w-full"> Afficher l'estimation de la tâche </Label>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 grid grid-cols-2 gap-6">
                <Button>
                    <Label> 2 / 5 </Label>
                    <Users />
                </Button>
                <Button className="bg-red-600 hover:bg-red-400">
                    <LockKeyhole />
                    <Label> Demander l'accès </Label>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default CarteTache;