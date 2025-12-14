import { Search } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";


/**
 * Ce composant sert à filtrer les tâches en fonction du nom de ces dernières et d'une chaine de caractères
 * rentrée par l'utilisateur.
 *
 * @category Composants/Index
 * @param {props} props - Les propriétés du champ à recherche.
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
