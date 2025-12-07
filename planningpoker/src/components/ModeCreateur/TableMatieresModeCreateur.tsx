import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import TemplatePage from "@/components/ModeCreateur/TemplatePage.tsx";

/**
 * Composant permettant l'affichage de la table des matières des différentes options présentes dans la page du mode créateur
 * @example
 * ```tsx
 * <Tabs defaultValue="matière1"> {// Composant shadcn/ui permettant d'instancier la table des matières}
 *     <TabsList> {// Composant shadcn/ui permettant d'afficher les différentes matières}
 *         <TabsTrigger value="matière1"> {//Composant shadcn/ui correspondant à }
 *         ...
 *     <TabsList/>
 *     <TabsContent value="matière1"> {// Composant shadcn/ui permettant d'afficher le composant voulu lorsque l'utilisateur clique sur le trigger de la matière correspondante}
 *         <Composant> {//Composant quelconque à afficher}
 *     <TabsContent/>
 *     ...
 * </Tabs>
 * ```
 * @constructor
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