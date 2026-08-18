import { useInsight } from "@/hooks/useInsight"
import { Error } from "../insights/Error"
import { Content } from "../insights/Context"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

interface AllInsightProps {
  simulationId: string
}

export function AllInsightCard({simulationId}: AllInsightProps){
  const {insight, isLoading, error, fetchInsight} = useInsight(simulationId)
  console.log(insight)

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

    </div>
  )
}
