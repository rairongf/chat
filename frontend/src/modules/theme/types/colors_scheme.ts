import { CommonColorsScheme } from "../common";

/// Known issue: https://tailwindcss.com/docs/content-configuration#dynamic-class-names
export interface ColorsScheme {
  common: typeof CommonColorsScheme;
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    focus: string;
    primaryHover: string;
    primaryHoverHighlighted: string;
    divider: string;
  };
  text: {
    base: string;
    black: string;
    highlighted: string;
    highlightedHover: string;
  };
}