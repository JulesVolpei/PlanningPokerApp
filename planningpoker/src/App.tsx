
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
            {/* Mettre les routes des différentes pages */}
        </QueryClientProvider>
    )
}

export default App
