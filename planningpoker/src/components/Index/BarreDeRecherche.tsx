import { Search } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";


/**
 * Composant affichant une barre de recherche pour aider à la recherche d'une tâche précise.
 *
 * Ce composant permet de :
 * - Gérer la valeur du champ de recherche via les props `value` et `onChange`.
 *
 * @param {string} value Valeur dans la barre de recherche.
 * @param {React.ChangeEvent<HTMLInputElement>} onChange Fonction permettant de mettre à jour la valeur dans l'input.
 * @returns {JSX.Element} Une barre de recherche permettant de trier les tâches.
 *
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
