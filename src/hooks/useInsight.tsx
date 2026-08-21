import { useCallback, useEffect, useRef, useState } from 'react'
import { buildAIPrompt } from '@/data/aiPrompt'
import { getInsight } from '@/services/aiService'
import type {insightData} from '@/services/aiService'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'


export const useInsight = (id: string) => {
  const { getFormSimulation, updateSimulation } = useSimulationStorage()
  const [insight, setInsight] = useState<insightData | null>(() => {
    const simulation = getFormSimulation(id)

    if(simulation?.insight){
      return simulation.insight
    }

    return null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isRequestPending = useRef(false)


  const fetchInsight = useCallback(
    async (simulationId: string) => {
      const simulation = getFormSimulation(simulationId)

      if (!simulation) {
        setError('Simulação não encontrada.')
        return
      }
      isRequestPending.current = true
      setIsLoading(true)
      setError(null)

      try {
        const prompt = buildAIPrompt(simulation)
        const data = await getInsight(prompt)
        setInsight(data)

        updateSimulation(simulationId, { insight: data })
      } catch {
        setError('Erro ao gerar diagnóstico, tente novamente mais tarde')
      } finally {
        isRequestPending.current = false
        setIsLoading(false)
      }
    },
    [getFormSimulation, updateSimulation],
  )

  useEffect(() => {0
    if (insight || isLoading || error || isRequestPending.current) {
      return
    }

    fetchInsight(id)
  }, [id, insight, isLoading, error, fetchInsight, isRequestPending])

  return { insight, isLoading, error, fetchInsight }
}
