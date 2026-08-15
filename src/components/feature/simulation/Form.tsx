import { FormStep } from "./FormStep";
import { Progress } from "./Progress";
import { simulationFormSteps } from "@/data/simulation";
import type {SimulationFormData} from "@/data/simulation";
import { useSimulationStorage } from "@/hooks/useSimulationStorage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SimulationForm(){
    const {saveFormData} = useSimulationStorage()
    const [indexCurrentStep, setIndexCurrentStep] = useState(0)
    const totalSteps = simulationFormSteps.length
    const currentStep = simulationFormSteps[indexCurrentStep]
    const [formData, setFormData] = useState<SimulationFormData>({} as SimulationFormData)
    /* Estado com tipagem criada no arquivo simulation.ts que já é inicializada como objeto */

    const navigate = useNavigate()

    //prosseguir
    const handleNextStep = (value: string) => {
        const updatedFormData = {...formData, [currentStep.id]: value}
        setFormData(updatedFormData)

        if(indexCurrentStep+1 > totalSteps-1){
            // se esta na ultima etapa, utiliza o hook de salvar no local storage e joga pra rota resultado
            const id = saveFormData(updatedFormData)
            navigate(`/resultado/${id}`)
            return
        }

        setIndexCurrentStep(prev => prev+1)
    }

    //voltar
    const handleBackStep = () => {
        if(indexCurrentStep===0){
            return
        }

        setIndexCurrentStep(prev => prev-1)
    }

    return(
        <>
            <Progress totalSteps={totalSteps} currentStep={indexCurrentStep + 1} />
            <FormStep
                key={currentStep.id}
                {...currentStep}
                onBack={handleBackStep}
                onNext={handleNextStep}
                hiddenOnBack={indexCurrentStep+1 === 1 ? true : false}
            />
        </>
    )
}
