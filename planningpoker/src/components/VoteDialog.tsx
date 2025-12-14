import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Ce composant présente les valeurs de vote suivant : 0, 1, 2, 3, 5, 8, 13, 20, 40, 100,
 * ainsi que les cartes spéciales "Café" (relance) et "?" (incertitude, vote non comptabilisé).
 *
 * @category Composants/Vote
 * @param {Object} props - Les propriétés du composant (tache : informations de la tâche | onSubmit : fonction appelée lors de la validation)
 * @returns {JSX.Element} Le contenu du dialogue de vote avec la grille de cartes.
 */
const VoteDialogContent = ({ tache, onSubmit }) => {
    const [selection, setSelection] = useState(null);
    const cartesPoker = ["0", "1", "2", "3", "5", "8", "13", "20", "40", "100", "cafe", "?"];
    const handleValidation = () => {
        if (selection) {
            onSubmit(selection);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <DialogHeader>
                <DialogTitle>Voter pour : {tache.titre}</DialogTitle>
                <DialogDescription>
                    Sélectionnez une carte pour estimer la difficulté de la tâche.
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
                <Label className="text-sm text-muted-foreground">
                    Un grand vote implique de grandes responsabilités
                </Label>

                <div className="flex flex-wrap gap-3 justify-center">
                    {cartesPoker.map((valeur) => {
                        const estSelectionne = selection === valeur;

                        return (
                            <button
                                key={valeur}
                                onClick={() => setSelection(valeur)}
                                className={cn(
                                    "w-16 h-24 rounded-lg border-2 flex items-center justify-center transition-all duration-200 text-xl font-bold shadow-sm hover:-translate-y-1",
                                    estSelectionne
                                        ? "border-primary bg-primary text-primary-foreground shadow-md scale-105"
                                        : "border-muted bg-card hover:border-primary/50 hover:shadow"
                                )}
                            >
                                {valeur === "cafe" ? (
                                    <Coffee className="w-8 h-8" />
                                ) : (
                                    <span>{valeur}</span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
            <DialogFooter className="sm:justify-between items-center gap-4 border-t pt-4">
                <div className="text-sm font-medium text-muted-foreground">
                    {selection ? (
                        <span className="text-primary flex items-center gap-2">
                            Vote sélectionné :
                            {selection === "cafe" ? <Coffee className="w-4 h-4" /> : " " + selection}
                        </span>
                    ) : (
                        "Aucune carte sélectionnée"
                    )}
                </div>

                <Button
                    onClick={handleValidation}
                    disabled={!selection}
                    className="w-full sm:w-auto"
                >
                    Envoyer mon vote
                </Button>
            </DialogFooter>
        </div>
    );
}

export default VoteDialogContent;