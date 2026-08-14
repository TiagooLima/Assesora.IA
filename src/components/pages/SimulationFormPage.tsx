import { SimulationForm } from "../feature/simulation/Form";
import { SimulationHero } from "../feature/simulation/Hero";
import { Progress } from "../feature/simulation/Progress";

export function SimulationFormPages() {
    return (
        <main className="mx-auto max-w-xl px-4 py-10 sm:py-14">
            <SimulationHero />
            <SimulationForm />
        </main>
    )
}