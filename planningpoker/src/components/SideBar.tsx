import { Home, Sparkles, LogIn } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { accessAuthentification } from '@/context/AuthentificationContext';
import PopUpLogin from "@/components/PopUpLogin.tsx";
import LogOutBouton from "@/components/LogOutBouton.tsx";

/**
 * Sidebar persistante.
 *
 * Ce composant est ancré sur le côté gauche de l'application et gère la navigation principale.
 * Il adapte dynamiquement son contenu selon l'état d'authentification de l'utilisateur.
 *
 * @remarks
 * **Logique d'affichage :**
 * * **Utilisateur Connecté** : Affiche l'accès au "Mode Créateur" et le bouton de déconnexion.
 * * **Visiteur (Non connecté)** : Affiche des boutons qui déclenchent l'ouverture du dialogue de connexion {@link PopUpLogin}.
 *
 * @category Layout
 * @returns {JSX.Element} La structure HTML de la barre latérale.
 */
export const SideBar = () => {
    const [ouverturePopUp, setOuverturePopUp] = useState(false);
    const { estConnecte } = accessAuthentification();
    return (
        <>
            <aside className="fixed left-0 top-0 h-screen w-16 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-6 gap-6 z-50">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        'w-10 h-10 rounded-lg flex items-center justify-center transition-smooth text-sidebar-foreground hover:bg-sidebar-accent'
                    }
                >
                    <Home className="w-5 h-5 text-black" />
                </NavLink>

                {estConnecte ? (
                    <>
                        <NavLink
                            to="/modecreateur"
                            className={({ isActive }) =>
                                'w-10 h-10 rounded-lg flex items-center justify-center transition-smooth text-sidebar-foreground hover:bg-sidebar-accent'
                            }
                        >
                            <Sparkles className="w-5 h-5 text-black" />
                        </NavLink>
                        <LogOutBouton />
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setOuverturePopUp(true)}
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent transition-smooth"
                            title="Mode créateur"
                        >
                            <Sparkles className="w-5 h-5"/>
                        </button>
                        <button
                            onClick={() => setOuverturePopUp(true)}
                            className="mt-auto w-10 h-10 rounded-lg flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent transition-smooth"
                            title="Connexion / Inscription"
                        >
                            <LogIn className="w-5 h-5"/>
                        </button>
                        <PopUpLogin open={ouverturePopUp} onOpenChange={setOuverturePopUp} />
                    </>
                )}
            </aside>

        </>
    );
};

export default SideBar;