import { PiggyBank } from "lucide-react";
import { FormStep } from "./FormStep";
import { Progress } from "./Progress";

export function SimulationForm(){
    return(
        <>
            <Progress totalSteps={5} currentStep={1} />
            <FormStep 
                icon={PiggyBank}
                title='Renda mensal bruta'
                question="Quanto é depositado na sua conta todo mês (somando todas as fontes)?"
                inputProps={{
                    type: 'text',
                    placeholder: '5.000,00',
                    prefix: 'R$'
                }}
            />
        </>
    )
}