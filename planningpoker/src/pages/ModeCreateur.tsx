import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import TemplatePage from "@/components/ModeCreateur/TemplatePage.tsx";
import {Component} from "react";
import TableMatieresModeCreateur from "@/components/ModeCreateur/TableMatieresModeCreateur.tsx";

/**
 * Page principale du Mode Créateur.
 * * Ce composant agit comme le conteneur pour toute la section de l'administration/création des tâches et accès.
 * Il est responsable de la mise en page globale de cette section et intègre les sous-composants de navigation ou de gestion.
 *  @remarks
 * Actuellement, il charge principalement le composant {@link TableMatieresModeCreateur}.
 * @category Pages
 * @returns {JSX.Element} La structure DOM de la page Mode Créateur.
 */
const ModeCreateur = () => {
    return (
        <div className="flex w-full max-w-sm flex-col gap-6">
            <TableMatieresModeCreateur />
        </div>
    )
}

export default ModeCreateur;