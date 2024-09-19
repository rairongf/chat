import { CommonColorsScheme } from "../common";
import { ColorsScheme } from "../types";

export const LightThemeColorsScheme: ColorsScheme = {
  common: CommonColorsScheme,
  background: {
    primary: 'bg-[#ffffff]',
    secondary: 'bg-[#F2F3F5]',
    tertiary: 'bg-[#E3E5E8]',
    focus: 'bg-[#D7D8DD]',
    primaryHover: 'hover:bg-[#F7F7F7]',
    primaryHoverHighlighted: 'hover:bg-[#EBEBED]',
    divider: 'bg-[#CBCED2]',
  },
  text: {
    base: 'text-[#4E5058]',
    black: 'text-[#060607]',
    highlighted: 'text-[#4E5058]',
    highlightedHover: 'hover:text-[#303237]',
  },
}