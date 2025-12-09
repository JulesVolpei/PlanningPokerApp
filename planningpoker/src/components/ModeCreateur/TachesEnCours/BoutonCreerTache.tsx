import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Plus, ChevronDown, Minus, Plus as PlusIcon } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.tsx";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu.tsx";
import {createNewTask} from "@/services/api.ts";
import {toast} from "sonner";

/**
 * Composant correspondant au formulaire d'ajout d'une tâche lorsque l'utilisateur appuie sur le bouton de création d'une tâche.
 *
 * @example :
 * ```tsx
 * <BoutonCreerTache informationUtilisateur={informationUtilisateur} open={open} setOpen={setOpen}/>
 * ```
 *
 *
 * @param informationUtilisateur Variable correspondant aux informations de l'utilisateur actuellement connecté sur la session.
 * @param open Variable boléenne déterminant l'ouverture ou non du formulaire.
 * @param setOpen Hooker permettant de modifier la valeur de la variable "open".
 */
const BoutonCreerTache = ({informationUtilisateur, open, setOpen}) => {
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [evaluation, setEvaluation] = useState("Aucune");
    const [maxParticipants, setMaxParticipants] = useState(1);
    const [dialogOpen, setDialogOpen] = useState(false); // Faire ça plus tard

    const increment = () => setMaxParticipants((prev) => Math.min(prev + 1, 99));
    const decrement = () => setMaxParticipants((prev) => Math.max(prev - 1, 1));

    const envoyerTache = async () => {
        try {
            const nouvelleTache = {
                titre:titre,
                description:description,
                // Ajouter l'évaluation par la suite,
                statut:"ouverte",
                createurId: informationUtilisateur.id,
                nombreMaxParticipant:maxParticipants,
                methodeEvaluation:evaluation,
            };

            const resultat = await createNewTask(nouvelleTache);
            toast.success(`Tâche ${titre} crée`);
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Créer une tâche
                </Button>
            </DialogTrigger>

            <DialogContent className="min-w-[420px]">
                <DialogHeader>
                    <DialogTitle>Création d'une tâche</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-2">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Titre</label>
                        <Input
                            placeholder="Entrez le titre de la tâche"
                            value={titre}
                            onChange={(e) => setTitre(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                            placeholder="Entrez une description détaillée..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Méthode d'évaluation</label>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-between"
                                >
                                    {evaluation}
                                    <ChevronDown className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className={"w-[var(--radix-popper-anchor-width)]"}>
                                <DropdownMenuItem onClick={() => setEvaluation("Moyenne")}>
                                    Moyenne
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setEvaluation("Médiane")}>
                                    Médiane
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setEvaluation("Majorité absolue")}>
                                    Majorité absolue
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setEvaluation("Majorité relative")}>
                                    Majorité relative
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Participants max</label>

                        <div className="flex items-center gap-2">

                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={decrement}
                                className="w-8 h-8"
                            >
                                <Minus className="w-4 h-4" />
                            </Button>

                            <span className="w-10 text-center font-medium">
                                {maxParticipants}
                            </span>

                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={increment}
                                className="w-8 h-8"
                            >
                                <PlusIcon className="w-4 h-4" />
                            </Button>

                        </div>
                    </div>
                    <Button className="mt-2" onClick={envoyerTache}>
                        Ajouter la tâche
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BoutonCreerTache;
