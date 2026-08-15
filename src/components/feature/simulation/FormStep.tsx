import { Button } from "@/components/shared/Button";
import { Input, type InputProps } from "@/components/shared/Input";
import formatCurrencyInput from "@/utils/currency";
import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react";
import { useState } from "react";

export interface FormStepProps {
  id: string;
  icon: LucideIcon;
  title: string;
  question: string;
  inputProps: InputProps;
  submitButtonProps?: {
    label: string;
    emojicon?: string;
  };
}

//interface definido tipagem de ação dos botoes (voltar e prosseguir) da navegação
interface Props {
  onBack: () => void;
  onNext: (value: string) => void;
  hiddenOnBack?: boolean;
}

export function FormStep({
  icon: Icon,
  title,
  question,
  inputProps,
  submitButtonProps,
  onBack,
  onNext,
  hiddenOnBack,
}: FormStepProps & Props) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue) {
      return;
    }

    onNext(inputValue);
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:p-8">
      <div className="bg-primary h-15 w-15 mb-4 flex items-center justify-center rounded-xl">
        <Icon size={32} className="text-primary-foreground" />
      </div>
      <h2 className="text-primary mb-1 text-xs font-semibold uppercase tracking-widest">{title}</h2>
      <h3 className="text-foreground mb-6 text-xl font-semibold leading-snug sm:text-2xl">
        {question}
      </h3>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {" "}
        {/* nova função so pra inserir o preventDefault */}
        <Input
          {...inputProps}
          value={inputValue}
          onChange={(e) => {
            inputProps.prefix === "R$"
              ? setInputValue(formatCurrencyInput(e.target.value))
              : setInputValue(e.target.value);
          }}
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          {!hiddenOnBack && (
            <Button
              type="button"
              onClick={onBack}
              variant="ghost"
              className="order-2 flex-1 justify-center rounded-xl py-3 sm:order-1"
              icon={ArrowLeft}
            >
              Voltar
            </Button>
          )}
          <Button
            type="submit" // por ser submit, o onClick se torna onSubmit, escalando pra tag form
            variant="primary"
            icon={!submitButtonProps ? ArrowRight : undefined}
            className="order-1 flex-1 sm:order-2"
            disabled={!inputValue}
          >
            {submitButtonProps?.label ?? "Próximo"}
            {submitButtonProps?.emojicon}
          </Button>
        </div>
      </form>
    </div>
  );
}
