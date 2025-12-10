
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Index from "@/pages";
import {SideBar} from "@/components/SideBar.tsx";
import {AuthentificationProvider} from "@/context/AuthentificationContext.tsx";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import ModeCreateur from "@/pages/ModeCreateur.tsx";

const queryClient = new QueryClient();

/**
 * Composant racine de l'application.
 * * Il agit comme le point d'entrée principal et orchestre l'ensemble des fournisseurs de contexte
 * nécessaires au bon fonctionnement de l'application.
 * * ## Architecture des Providers
 * L'application est enveloppée dans l'ordre suivant :
 * 1. **QueryClientProvider** : Gestionnaire de cache et d'état serveur de React Query.
 * 2. **AuthentificationProvider** : Gestion de l'état de connexion utilisateur.
 * 3. **TooltipProvider** : Contexte UI pour les info-bulles de shadcn/ui.
 * 4. **Toaster** : Gestionnaire de notifications toast.
 * 5. **BrowserRouter** : Gestionnaire de routage.
 *  @example
 * ```tsx
 * import { createRoot } from 'react-dom/client'
 * import App from './App'
 * * createRoot(document.getElementById('root')!).render(
 * <StrictMode>
 *     <App />
 * </StrictMode>,
 * )
 * ```
 * @returns {JSX.Element} L'arbre de composants complet de l'application avec le routing configuré.
 */
const App=  () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthentificationProvider>
                <TooltipProvider>
                    <Toaster />
                    <BrowserRouter>
                        <SideBar />
                        <Routes>
                            <Route path={"/"} element={<Index />}/>
                            <Route path={"/modecreateur"} element={<ModeCreateur />}/>
                        </Routes>
                    </BrowserRouter>
                </TooltipProvider>
            </AuthentificationProvider>
        </QueryClientProvider>
    )
}

export default App
