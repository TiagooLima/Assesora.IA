import { useCallback } from "react";
import type { SimulationFormData, simulationRecord } from "@/data/simulation";

export const useSimulationStorage = () => {
  const saveFormData = useCallback((formData: SimulationFormData) => {
        const id = crypto.randomUUID()
    const record: simulationRecord = { ...formData, id, createdAt: new Date().toISOString() }

        const storage = localStorage.getItem('simulation-data')
        const savedData = storage ? (JSON.parse(storage) as simulationRecord[]) : []

        localStorage.setItem('simulation-data', JSON.stringify([...savedData, record]))

        return id
      }, [])

      const getFormSimulation = useCallback((id:string) => {
      const storage = localStorage.getItem('simulation-data')
      if(!storage){
        return null
      }

      const savedData = JSON.parse(storage) as simulationRecord[]
      return savedData.find((record) => record.id === id) || null
    }, [])

    const getSimulations = useCallback(() => {
      const storage = localStorage.getItem('simulation-data')
      return storage ? (JSON.parse(storage) as simulationRecord[]) : []
    }, [])

    const deleteSimulation = useCallback((id: string) => {
      const updated = getSimulations().filter((record) => record.id !== id)
      localStorage.setItem('simulation-data', JSON.stringify(updated))
    }, [getSimulations])

    const updateSimulation = useCallback((id: string, data: Partial<simulationRecord>) => {
      const storage = localStorage.getItem('simulation-data')
      const savedData = storage ? (JSON.parse(storage) as simulationRecord[]) : []

      const updated = savedData.map((record) => record.id === id ? {...record, ...data} : record)
      localStorage.setItem('simulation-data', JSON.stringify(updated))
    }, [])

    return {saveFormData, getFormSimulation, getSimulations, deleteSimulation, updateSimulation}
}
