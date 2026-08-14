import type { SimulationFormData } from "@/data/simulation";

export const useSimulationStorage = () => {
    const saveFormData = (formData: SimulationFormData) => {
        const storage = localStorage.getItem('simulation-data')
        const savedData = storage ? (JSON.parse(storage) as SimulationFormData[]) : []
        
        localStorage.setItem('simulation-data', JSON.stringify([...savedData, formData]))
    }

    return {saveFormData}
}