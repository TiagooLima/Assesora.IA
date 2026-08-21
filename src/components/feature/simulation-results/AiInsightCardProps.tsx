import { useEffect, useRef, useState, type FormEvent } from "react"
import { MessageCircle, Send } from "lucide-react"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { useInsight } from "@/hooks/useInsight"
import { useAIChat } from "@/hooks/useAIChat"
import { Button } from "@/components/shared/Button"
import { Error } from "../insights/Error"
import { Content } from "../insights/Context"

interface AllInsightProps {
  simulationId: string
}

export function AllInsightCard({simulationId}: AllInsightProps){
  const {insight, isLoading, error, fetchInsight} = useInsight(simulationId)
  const {messages, isLoading: isChatLoading, error: chatError, sendQuestion, retry} = useAIChat(simulationId)
  const [question, setQuestion] = useState('')
  const conversationEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isChatLoading])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!question.trim() || isChatLoading) return
    void sendQuestion(question)
    setQuestion('')
  }

  return(
    <div className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
      <div className="mb-3 flex items-center gap-1.5" >
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          Insight Financeiro Personalizado
        </span>
      </div>

      {isLoading && (
        <div className="flex">
          <Skeleton
            count={10}
            baseColor="var(--skeleton-base-color)"
            highlightColor="var(--skeleton-highlight-color)"
            className="mb-3 flex rounded-lg"
            containerClassName="flex-1"
            inline
          />
        </div>
      )}
      {!isLoading && error && <Error simulationId={simulationId} message={error} onRetry={() => {fetchInsight(simulationId)}}/>}
      {!isLoading && insight && !error &&<Content insight={insight} />}

      <div className="mt-8 border-t border-border pt-6">
        <div className="mb-4 flex items-center gap-2">
          <MessageCircle size={18} className="text-primary" />
          <h2 className="text-sm font-semibold">Conversando com o Educador Financeiro</h2>
        </div>

        <div className="flex max-h-80 flex-col gap-3 overflow-y-auto pr-1 lg:scrollbar-thin lg:[scrollbar-color:var(--border)_transparent]">
          {messages.length === 0 && !isChatLoading && (
            <p className="rounded-xl bg-secondary-button p-4 text-sm text-muted-foreground">
              Tire suas dúvidas sobre esta simulação e receba uma orientação personalizada.
            </p>
          )}
          {messages.map((message) => (
            <div key={message.id} className={`max-w-[90%] rounded-xl px-4 py-3 text-sm leading-relaxed ${message.role === 'user' ? 'self-end bg-primary text-primary-foreground' : 'self-start bg-secondary-button text-foreground'}`}>
              {message.content}
            </div>
          ))}
          {isChatLoading && <Skeleton width="70%" height={48} baseColor="var(--skeleton-base-color)" highlightColor="var(--skeleton-highlight-color)" className="rounded-xl" />}
          <div ref={conversationEndRef} />
        </div>

        {chatError && <Error simulationId={simulationId} message={chatError} onRetry={retry} />}

        <form className="mt-4 flex items-end gap-2 " onSubmit={handleSubmit}>
          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Digite sua pergunta..."
            aria-label="Pergunta para o educador financeiro"
            rows={2}
            disabled={isChatLoading}
            className="min-h-12 flex-1 resize-none rounded-2xl bg-input p-4 text-sm text-foreground shadow-[4px_4px_18px_0px_rgba(0,0,0,0.1)] outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary "
          />
          <Button aria-label="Enviar pergunta" title="Enviar pergunta" variant="primary" icon={Send} disabled={!question.trim() || isChatLoading} />
        </form>
      </div>

    </div>
  )
}
