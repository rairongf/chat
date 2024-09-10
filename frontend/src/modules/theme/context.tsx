"use client";

import { BaseContextProps } from "@/modules/common";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { LightThemeColors, ThemeColors } from ".";

type ThemeContextData = {
  theme: ThemeColors;
  setTheme: Dispatch<SetStateAction<ThemeColors>>;
};

export const ThemeContext = createContext<ThemeContextData>(
  {} as ThemeContextData
);

export function ThemeProvider({ children }: BaseContextProps) {
  const [theme, setTheme] = useState<ThemeColors>(LightThemeColors);

  useEffect(() => {}, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
