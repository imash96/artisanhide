"use client";

import { useTheme } from "@lib/hook/use-theme";
import { Lightbulb, LightbulbOff } from "lucide-react";

type ThemeProviderProps = {
    initialTheme: "light" | "dark"
    className: string
}

export default function ThemeButton({ className = "", initialTheme }: ThemeProviderProps) {
    const { theme, toggleTheme } = useTheme(initialTheme);

    return (
        <button onClick={toggleTheme} className={className} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`} >
            {theme === "light" ? (
                <LightbulbOff className="h-5 w-5" />
            ) : (
                <Lightbulb className="h-5 w-5" />
            )}
            <span className="sr-only">Theme Toggle</span>
        </button>
    );
}
