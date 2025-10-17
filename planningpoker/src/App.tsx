import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Router} from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

const App=  () => {
    return (
        <QueryClientProvider client={queryClient}>
            {/* Mettre les routes des différentes pages */}
            <></>
        </QueryClientProvider>
    )
}

export default App
