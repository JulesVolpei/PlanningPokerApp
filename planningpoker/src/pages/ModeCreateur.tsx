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
 * Composant à la racine de l'affichage des composants dans la page du mode créateur.
 *
 * @constructor
 */
const ModeCreateur = () => {
    return (
        <div className="flex w-full max-w-sm flex-col gap-6">
            <TableMatieresModeCreateur />
        </div>
    )
}

export default ModeCreateur;