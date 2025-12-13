import { Search } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";


/**
 * Champ de saisie avec icône pour le filtrage.
 *
 * Ce composant est un simple wrapper autour de l'Input shadcn/ui, ajoutant une icône de loupe
 * et gérant le style standardisé pour la recherche.
 *
 * @category Composants/Index
 * @param {props} props - Les propriétés du champ.
 * @returns {JSX.Element} L'input de recherche stylisé.
 */
const BarreDeRecherche = ({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Rechercher une tâche ..."
                className="pl-10 h-12"
                value={value}
                onChange={onChange}
            />
        </>
    );
};

export default BarreDeRecherche;
