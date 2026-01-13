// src/context/ThemeContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import { type ThemeType, THEMES } from "../config/theme";

interface ThemeContextType {
    theme: ThemeType;
    toggleTheme: () => void;
    styles: typeof THEMES["light"]; // ใช้ Type ของ Light เป็นแม่แบบ
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    // เริ่มต้นที่ 'light'
    const [theme, setTheme] = useState<ThemeType>("light");

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider
            value={{ theme, toggleTheme, styles: THEMES[theme] }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};