import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import { SimulationFormPages } from "./components/pages/SimulationFormPage";

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <SimulationFormPages />
            },
            {
                path: '/resultado',
                element: <h1>Resultado da simulação</h1>
            },
            {
                path: '/historico',
                element: <h1>Históricos de simulações</h1>
            },
        ]
    }
])