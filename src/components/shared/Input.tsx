import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    prefix?: string
    suffix?: string
} 

export function Input({prefix, suffix, ...rest}: InputProps){
    //  Prefixo - O que eu quero colocar antes do input, como um icone ou uma mensagem
    //  Sufixo - A mesma coisa, porém depois do input.
    //  Ambos são opcionais
    return (
        <div className="bg-input flex items-center rounded-2xl p-4 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
            {prefix && (
                <>
                    <span className="text-muted-foreground text-sm font-medium mr-2">
                        {prefix}
                    </span>
                    <p className="text-gray-500 mr-2">|</p>
                </>
            )}
            <input
                className="text-foreground placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
                autoFocus
                {...rest}
            />
            {suffix && (
                <>
                    <p className="text-gray-500 ml-2">|</p>
                    <span className="text-muted-foreground ml-3 text-sm font-medium">
                        {suffix}
                    </span>
                </>
            )}
        </div>
    )
}