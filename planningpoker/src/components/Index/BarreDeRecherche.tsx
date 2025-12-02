import { Search } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";

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
