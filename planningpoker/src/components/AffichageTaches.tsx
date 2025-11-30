import CarteTache from "@/components/Index/CarteTache.tsx";
import {accessAuthentification} from "@/context/AuthentificationContext.tsx";

const AffichageTaches = ({donnees}) => {
    return (
        <div className="text-center py-12 text-muted-foreground grid grid-cols-3 gap-6">
            {donnees.map((donnee) => (
                <CarteTache donneesTache={donnee} access={"enAttente"}/>
            )) /*Il va falloir accéder aux valeurs d'accès plus tard donc compliqué de boucler sur donnees */}
        </div>
    )
}

export default AffichageTaches;