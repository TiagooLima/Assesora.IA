import { createContext } from "react";

interface ValueThemeContext {
    theme: 'light' | 'dark';
    changeTheme: () => void;
}

export const ThemeContext = createContext<ValueThemeContext | undefined> (undefined)
