
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import TestAffichageUtilisateurs from "@/components/Index/TestAffichageUtilisateurs.tsx";
import Index from "@/pages";
import {SideBar} from "@/components/SideBar.tsx";
import {AuthentificationProvider} from "@/context/AuthentificationContext.tsx";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import ModeCreateur from "@/pages/ModeCreateur.tsx";

const queryClient = new QueryClient();

/**
 * Composant principal de l'application. Il fournit les contextes et les routes nécessaires au bon fonctionnement de l'application.
 * @example
 * ```tsx
 *  <QueryClientProvider client={queryClient}> {//Fournisseur de contexte pour ReactQuery}
 *      <AuthentificationProvider> {//Composant fournissant les informations sur l'état de la connexion de l'utilsateur et ses informations une fois connecté}
 *          <TooltipProvider> {//Composant shadcn/ui permettant l'utilisation des tooltips dans le programme}
 *              <Toaster /> {//Composant shadcn/ui permettant l'utilisation des notifications toaster dans le programme}
 *                  <BrowserRouter> {//Composant permettant la gestion des routes dans l'application}
 *                      <SideBar /> {//Composant représentant la sidebar de l'application. Ce composant est dans l'App pour être accessible de partout.}
 *                      <Routes> {//Composant permettant de gérer un ensemble de routes dans l'application.}
 *                          <Route> {//Composant de route individuelle.}
 * ```
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
                            <Route path={"/utilisateurs"} element={<TestAffichageUtilisateurs />} />
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
