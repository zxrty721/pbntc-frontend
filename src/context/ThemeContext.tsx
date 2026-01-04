// src/context/ThemeContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import { type ThemeType, THEMES } from "../config/theme";

interface ThemeContextType {
    theme: ThemeType;
    toggleTheme: () => void;
    styles: (typeof THEMES)["purple"];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<ThemeType>("purple"); // เริ่มต้นสีม่วง

    const toggleTheme = () => {
        setTheme((prev) => (prev === "purple" ? "red" : "purple"));
    };

    return (
        <ThemeContext.Provider
            value={{ theme, toggleTheme, styles: THEMES[theme] }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
