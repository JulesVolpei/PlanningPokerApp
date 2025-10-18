
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import TestAffichageUtilisateurs from "@/components/TestAffichageUtilisateurs.tsx";

const queryClient = new QueryClient();

const App=  () => {
    return (
        <QueryClientProvider client={queryClient}>
            {/* Mettre les routes des différentes pages */}
            <BrowserRouter>
                <Routes>
                    <Route path={"/utilisateurs"} element={<TestAffichageUtilisateurs />}></Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
