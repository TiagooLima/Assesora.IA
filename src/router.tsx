import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import { SimulationFormPages } from "./components/pages/SimulationFormPage";
import { SimulationResultsPage } from "./components/pages/SimulationResultsPage";
import { SimulationHistoryPage } from "./components/pages/SimulationHistoryPage";

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
                element: <SimulationHistoryPage />
            },
        ]
    }
])
