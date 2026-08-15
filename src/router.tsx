import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import { SimulationFormPages } from "./components/pages/SimulationFormPage";
import { SimulationResultsPage } from "./components/pages/SimulationResultsPage";

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <SimulationFormPages />
            },
            {
                path: '/resultado/:id',
                element: <SimulationResultsPage />
            },
            {
                path: '/historico',
                element: <h1>Históricos de simulações</h1>
            },
        ]
    }
])
