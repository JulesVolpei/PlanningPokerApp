import {useState} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {toast} from 'sonner';
import {accessAuthentification} from "@/context/AuthentificationContext.tsx";

interface LoginDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
} // Permet de savoir si on ouvre le popup ou non lorsque l'utilisateur clique dessus

const PopUpLogin = ({open, onOpenChange}: LoginDialogProps) => {
    const {connexion, inscription, estConnecte, deconnexion} = accessAuthentification();
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
                                    type="motDePasse"
                                    placeholder="********"
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
                                    placeholder="********"
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