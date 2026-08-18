import { Button } from "@/components/shared/Button"
import { RefreshCcw } from "lucide-react"

interface ErrorProps {
  simulationId: string
  message: string
  onRetry: () => void
}

export function Error({simulationId, message, onRetry}: ErrorProps){
  if(!simulationId || !message){
    return null
  }

  return(
    <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
      <p className=""> ⚠️ {message} </p>
      <Button
        variant="primary"
        className="px-6"
        icon={RefreshCcw}
        onClick={onRetry}
      >
        Tentar de novo
      </Button>
    </div>

  )
}
