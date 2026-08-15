import type { SimulationFormData, simulationRecord } from "@/data/simulation";

export const useSimulationStorage = () => {
    const saveFormData = (formData: SimulationFormData) => {
        const id = crypto.randomUUID()
        const record: simulationRecord = { ...formData, id}

        const storage = localStorage.getItem('simulation-data')
        const savedData = storage ? (JSON.parse(storage) as simulationRecord[]) : []

        localStorage.setItem('simulation-data', JSON.stringify([...savedData, record]))

        return id
    }

    const getFormSimulation = (id:string) => {
      const storage = localStorage.getItem('simulation-data')
      if(!storage){
        return null
      }

      const savedData = JSON.parse(storage) as simulationRecord[]
      return savedData.find((record) => record.id === id) || null
    }

    return {saveFormData, getFormSimulation}
}
