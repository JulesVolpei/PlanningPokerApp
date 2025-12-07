import {useState} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {toast} from 'sonner';
import {accessAuthentification} from "@/context/AuthentificationContext.tsx";

/**
 * Interface permettant de définir si le PopUp s'ouvre ou non via le dialogue shadcn/ui.
 * @this {open} Variable booléenne déterminant l'ouverture ou non.
 * @this {onOpenChange} Fonction permettant de faire le lien entre le hooker et l'ouverture du dialogue shadcn/ui.
 */
interface LoginDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

/**
 * Composant affichant un dialogue shadcn/ui comportant le formulaire d'inscription et de connexion et la gestion de la réussite ou non de la fonction voulues.
 *
 *
 * @this {connexion, inscription} Fonctions du contexte d'authentification permettant de gérer la connexion et l'inscription.
 * @this {[isLoading, setIsLoading]} Hooker permettant de savoir l'état de la connexion.
 * @this {[connexionData, setConnexionData]} Hooker permettant de stocker les valeurs de connexion rentrées par l'utilisateur.
 * @this {[inscriptionData, setInscriptionData]}  Hooker permettant de stocker les valeurs d'inscription rentrées par l'utilisateur.
 * @this {handleLogin()} Fonction asynchrone permettant de gérer l'état de la connexion en fonction du retour de la connexion dans le contexte d'authentification.
 * @this {handleRegister()} Fonction asynchrone permettant de gérer l'état de l'inscription en fonction du retour de l'inscription dans le contexte d'authentification.
 * @param open Variable booléenne indiquant l'ouverture ou non du dialogue shadcn/ui.
 * @param onOpenChange Fonction permettant de changer la valeurs de open et d'ouvrir le dialogque shadcn/ui.
 */
const PopUpLogin = ({open, onOpenChange}: LoginDialogProps) => {
    const {connexion, inscription} = accessAuthentification();
    const [isLoading, setIsLoading] = useState(false);
    const [connexionData, setConnexionData] = useState({nom: '', motDePasse: ''});
    const [inscriptionData, setInscriptionData] = useState({nom: '', motDePasse: ''});

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await connexion(connexionData.nom, connexionData.motDePasse); // Faire marcher la fonction de connexion que j'avais fait
            toast.success(`Bienvenue ${connexionData.nom} !`);
            onOpenChange(false);
            setConnexionData({nom: '', motDePasse: ''});
        } catch (error) {
            toast.error(`Erreur de connexion : ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await inscription(inscriptionData.nom, inscriptionData.motDePasse); // Pareil pour ici
            toast.success(`Création de ton compte réussie ${inscriptionData.nom}, bienvenue !`);
            onOpenChange(false);
            setInscriptionData({nom: '', motDePasse: ''});
        } catch (error) {
            toast.error(`Erreur lors de la création du compte : ${error}`);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle> Bienvenue ! </DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="connexion" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 space-x-1">
                        <TabsTrigger value="connexion">Connexion</TabsTrigger>
                        <TabsTrigger value="inscription">Inscription</TabsTrigger>
                    </TabsList>

                    <TabsContent value="connexion">
                        <form onSubmit={handleLogin} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="connexion-nom">Nom</Label>
                                <Input
                                    id="connexion-nom"
                                    type="text"
                                    value={connexionData.nom}
                                    placeholder="Ton nom"
                                    onChange={(e) => setConnexionData({...connexionData, nom: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="connexion-motDePasse">Mot de passe</Label>
                                <Input
                                    id="connexion-motDePasse"
                                    type="password"
                                    value={connexionData.motDePasse}
                                    onChange={(e) => setConnexionData({...connexionData, motDePasse: e.target.value})}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full bg-black" disabled={isLoading}>
                                {isLoading ? 'Connexion ...' : 'Connexion'}
                            </Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="inscription">
                        <form onSubmit={handleRegister} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="inscription-nom">Nom</Label>
                                <Input
                                    id="inscription-nom"
                                    type="text"
                                    placeholder="Ton nom"
                                    value={inscriptionData.nom}
                                    onChange={(e) => setInscriptionData({...inscriptionData, nom: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="inscription-motDePasse">Mot de passe</Label>
                                <Input
                                    id="inscription-motDePasse"
                                    type="password"
                                    value={inscriptionData.motDePasse}
                                    onChange={(e) => setInscriptionData({
                                        ...inscriptionData,
                                        motDePasse: e.target.value
                                    })}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full bg-black" disabled={isLoading}>
                                {isLoading ? 'Création du compte ...' : 'Inscription'}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default PopUpLogin;