import { Home, Sparkles, LogIn } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { accessAuthentification } from '@/context/AuthentificationContext';
import PopUpLogin from "@/components/PopUpLogin.tsx";

export const SideBar = () => {
    const [ouverturePopUp, setOuverturePopUp] = useState(false);
    const { estConnecte } = accessAuthentification();
    console.log(estConnecte);
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
                    <NavLink
                        to="/modecreateur"
                        className={({ isActive }) =>
                            'w-10 h-10 rounded-lg flex items-center justify-center transition-smooth text-sidebar-foreground hover:bg-sidebar-accent'
                        }
                    >
                        <Sparkles className="w-5 h-5 text-black" />
                    </NavLink>
                ) : (
                    <button
                        onClick={() => setOuverturePopUp(true)}
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent transition-smooth"
                        title="Mode créateur"
                    >
                        <Sparkles className="w-5 h-5" />
                    </button>
                )}

                <button
                    onClick={() => setOuverturePopUp(true)}
                    className="mt-auto w-10 h-10 rounded-lg flex items-center justify-center bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-primary transition-smooth"
                    title="Connexion / Inscription"
                >
                    <LogIn className="w-5 h-5" />
                    {/* Demander de l'aide parce que mon icone est invisible enfaite ??? */}
                </button>
            </aside>
            <PopUpLogin open={ouverturePopUp} onOpenChange={setOuverturePopUp} />
        </>
    );
};

export default SideBar;