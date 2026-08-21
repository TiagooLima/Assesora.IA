import { useCallback, useState } from 'react'
import type { ChatMessage, simulationRecord } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { getChatResponse } from '@/services/aiService'
import { calcTotalSavings } from '@/utils/simulation'
import { parseCurrency } from '@/utils/currency'

const createMessage = (role: ChatMessage['role'], content: string): ChatMessage => ({
  id: crypto.randomUUID(),
  role,
  content,
  createdAt: new Date().toISOString(),
})

const buildChatPrompt = (simulation: simulationRecord, messages: ChatMessage[], question: string) => {
  const history = messages
    .map((message) => `${message.role === 'user' ? 'Usuário' : 'Educador'}: ${message.content}`)
    .join('\n')
  const monthlySavingsNeeded = parseCurrency(simulation.goalAmount) / Number(simulation.goalDeadline)

  return `Você é um educador financeiro brasileiro, didático e acolhedor. Responda em português do Brasil, em texto simples e sem markdown.

Contexto da simulação:
- Meta: ${simulation.goalName}
- Custo da meta: ${simulation.goalAmount}
- Prazo: ${simulation.goalDeadline} meses
- Renda mensal: ${simulation.income}
- Custos fixos: ${simulation.expenses}
- Dívidas e parcelas: ${simulation.debts}
- Valor disponível mensal: ${calcTotalSavings(simulation).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
- Economia mensal necessária: ${monthlySavingsNeeded.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

Histórico da conversa:
${history || 'Nenhuma pergunta anterior.'}

Nova pergunta do usuário: ${question}

Responda de forma personalizada, objetiva e prática. Não invente dados que não estejam no contexto.`
}

export function useAIChat(simulationId: string) {
  const { getFormSimulation, updateSimulation } = useSimulationStorage()
  const [messages, setMessages] = useState<ChatMessage[]>(() => getFormSimulation(simulationId)?.chat ?? [])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastQuestion, setLastQuestion] = useState<string | null>(null)

  const sendQuestion = useCallback(async (question: string, retry = false) => {
    const simulation = getFormSimulation(simulationId)
    if (!simulation || !question.trim() || isLoading) return

    const userMessage = retry ? null : createMessage('user', question.trim())
    const nextMessages = userMessage ? [...messages, userMessage] : messages
    setMessages(nextMessages)
    setLastQuestion(question.trim())
    setError(null)
    setIsLoading(true)

    if (userMessage) {
      updateSimulation(simulationId, { chat: nextMessages })
    }

    try {
      const answer = await getChatResponse(buildChatPrompt(simulation, nextMessages, question.trim()))
      const updatedMessages = [...nextMessages, createMessage('assistant', answer)]
      setMessages(updatedMessages)
      updateSimulation(simulationId, { chat: updatedMessages })
    } catch {
      setError('Não foi possível obter uma resposta agora. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }, [getFormSimulation, isLoading, messages, simulationId, updateSimulation])

  const retry = useCallback(() => {
    if (lastQuestion) void sendQuestion(lastQuestion, true)
  }, [lastQuestion, sendQuestion])

  return { messages, isLoading, error, sendQuestion, retry }
}