import { createContext } from "react";

interface ValueThemeContext {
    theme: 'light' | 'dark';
    toggleTheme: () => void
}

export const ThemeContext = createContext<ValueThemeContext | undefined> (undefined)