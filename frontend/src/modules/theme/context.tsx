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
import { LightTheme } from "./light";
import { Theme } from "./types";

type ThemeContextData = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

export const ThemeContext = createContext<ThemeContextData>(
  {} as ThemeContextData
);

export function ThemeProvider({ children }: BaseContextProps) {
  const [theme, setTheme] = useState<Theme>(LightTheme);

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
