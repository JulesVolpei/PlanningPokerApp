import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import TemplatePage from "@/components/ModeCreateur/TemplatePage.tsx";

const ModeCreateur = () => {
    return (
        <div className="flex w-full max-w-sm flex-col gap-6">
            <Tabs defaultValue="taches">
                <TabsList>
                    <TabsTrigger value="taches">Tâches en cours</TabsTrigger>
                    <TabsTrigger value="demandeAcces">Demande d'accès</TabsTrigger>
                    <TabsTrigger value="tachesArchivees">Tâches archivées</TabsTrigger>
                </TabsList>
                <TabsContent value={"taches"} >
                    <TemplatePage page={"taches"} />
                </TabsContent>
                <TabsContent value={"demandeAcces"}>
                    <TemplatePage page={"demandeAcces"} />
                </TabsContent>
                <TabsContent value={"tachesArchivees"}>
                    <TemplatePage page={"tachesArchivees"} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default ModeCreateur;