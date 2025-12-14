import {toast} from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Copy, Download, FileJson} from "lucide-react";

/**
 * Ce composant permet de visualiser le contenu complet d'une tâche au format JSON en plus d'offrir
 * deux fonctionnalités d'export :
 * - **Copier** : Met le JSON dans le presse-papier.
 * - **Télécharger** : Génère un fichier `.json` nommé selon le titre de la tâche.
 *
 * @param {Object} data - Les informations de la tâche à afficher et à convertir au format JSON.
 */
const DetailsDonneesTacheDialog = ({ data }) => {
    const jsonString = JSON.stringify(data, null, 2);

    const handleCopyJson = () => {
        navigator.clipboard.writeText(jsonString);
        toast.success("JSON copié dans le presse-papier !");
    };
    const handleDownloadJson = () => {
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${data.titre}Export.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success("Fichier JSON téléchargé !");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full border-dashed"
                    onClick={(e) => e.stopPropagation()}
                >
                    <FileJson />
                    Données brutes (JSON)
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-lg" onClick={(e) => e.stopPropagation()}>
                <DialogHeader>
                    <DialogTitle>Export des données</DialogTitle>
                    <DialogDescription>
                        Voici les données brutes au format JSON.
                    </DialogDescription>
                </DialogHeader>

                <div className="bg-muted p-4 rounded-md overflow-auto max-h-[300px] text-xs font-mono">
                    <pre>{jsonString}</pre>
                </div>

                <div className="flex gap-2 justify-end mt-2">
                    <Button variant="secondary" onClick={handleCopyJson}>
                        <Copy />
                        Copier
                    </Button>
                    <Button onClick={handleDownloadJson}>
                        <Download />
                        Télécharger
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DetailsDonneesTacheDialog;