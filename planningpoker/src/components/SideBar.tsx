import { Home, Sparkles, LogIn } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { accessAuthentification } from '@/context/AuthentificationContext';
//import { LoginDialog } from './LoginDialog';

export const SideBar = () => {
    const [connexionIcone, setconnexionIcone] = useState(false);
    const { estConnecte } = accessAuthentification();
    // console.log(estConnecte);
    const test = true;
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

                {test ? ( // TODO: Remplacer par estConnecte plus tard quand j'aurais fait le formulaire
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
                        onClick={() => setconnexionIcone(true)}
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent transition-smooth"
                        title="Mode créateur"
                    >
                        <Sparkles className="w-5 h-5" />
                    </button>
                )}

                <button
                    onClick={() => setconnexionIcone(true)}
                    className="mt-auto w-10 h-10 rounded-lg flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent transition-smooth"
                    title="Login / Register"
                >
                    <LogIn className="w-5 h-5 text-black" />
                </button>
            </aside>
        </>
    );
};

export default SideBar;