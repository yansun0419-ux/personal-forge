"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { getNextThemeMode, type ThemeMode } from "@/lib/theme";

interface ThemeContextValue {
  nextTheme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>("day");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const value = useMemo<ThemeContextValue>(() => {
    const nextTheme = getNextThemeMode(theme);

    return {
      nextTheme,
      setTheme,
      theme,
      toggleTheme: () => setTheme(nextTheme),
    };
  }, [theme]);

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme() {
  const value = useContext(ThemeContext);

  if (value === null) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return value;
}
