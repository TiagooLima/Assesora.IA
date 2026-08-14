import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }: React.PropsWithChildren){
    const [theme, setTheme] = useState(() => {
        const localStorageTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
        if(localStorageTheme){
            return localStorageTheme
        }

        const systemPrefers = window.matchMedia('(prefers-color-scheme:dark)').matches
        //Se sistema prefere dark => retorna dark, senão, retorna light
        return systemPrefers ? 'dark' : 'light'
    })

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    const changeTheme = () => {
        setTheme((theme) => (theme === 'light' ? 'dark' : 'light')) 
        //Se o tema estiver light e o usuário clicar, vai se tornar dark. Caso contrário, se tornará light
    }

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}