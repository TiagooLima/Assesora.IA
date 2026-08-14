interface ProgressProps {
    currentStep: number;
    totalSteps: number
}

export function Progress({currentStep, totalSteps}:ProgressProps){
    const progress = (currentStep/totalSteps)*100 // calculo de quantos porcentos está do formulário

    return(
        <div className="mb-4">
            <p className="text-muted-foreground mb-2 text-sm">
                Passo {currentStep} de {totalSteps}
            </p>
            <div className="bg-border h-1 w-full overflow-hidden rounded-full">
                <div 
                    className="bg-primary h-full rounded-full transition-all duration-300"
                    style={{ width: `${progress}%`}}
                />
            </div>
        </div>
    )
}