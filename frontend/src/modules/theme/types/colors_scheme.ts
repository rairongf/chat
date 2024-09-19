import { CommonColorsScheme } from "../common";

/// Known issue: https://tailwindcss.com/docs/content-configuration#dynamic-class-names
export interface ColorsScheme {
  common: typeof CommonColorsScheme;
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  focusBackground: string;
  hoverMessageBackground: string;
  foreground: string;
  divider: string;
}