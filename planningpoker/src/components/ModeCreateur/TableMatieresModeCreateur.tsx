import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import TemplatePage from "@/components/ModeCreateur/TemplatePage.tsx";

/**
 * Système d'onglets pour la navigation dans le Mode Créateur.
 *
 * Ce composant structure la page d'administration en trois sections distinctes accessibles via des onglets :
 * 1. **Tâches en cours** : Gestion des tâches actives.
 * 2. **Demande d'accès** : Validation des nouveaux participants.
 * 3. **Tâches archivées** : Historique des sessions terminées.
 *
 * Il utilise le composant {@link TemplatePage} pour effectuer le rendu du contenu de chaque onglet.
 *
 * @category Composants/ModeCreateur
 * @returns {JSX.Element} Le conteneur d'onglets complet.
 */
const TableMatieresModeCreateur = () => {
    return (
        <>
            <Tabs defaultValue="taches">
                <TabsList>
                    <TabsTrigger value="taches">Tâches en cours</TabsTrigger>
                    <TabsTrigger value="demandeAcces">Demande d'accès</TabsTrigger>
                    <TabsTrigger value="tachesArchivees">Tâches archivées</TabsTrigger>
                </TabsList>
                <TabsContent value={"taches"}>
                    <TemplatePage page={"taches"}/>
                </TabsContent>
                <TabsContent value={"demandeAcces"}>
                    <TemplatePage page={"demandeAcces"}/>
                </TabsContent>
                <TabsContent value={"tachesArchivees"}>
                    <TemplatePage page={"tachesArchivees"}/>
                </TabsContent>
            </Tabs>
        </>
    )
}

export default TableMatieresModeCreateur;