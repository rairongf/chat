import { CommonColorsScheme } from "../common";
import { ColorsScheme } from "../types";

export const LightThemeColorsScheme: ColorsScheme = {
  common: CommonColorsScheme,
  background: {
    primary: 'bg-[#ffffff]',
    black: 'bg-[#313338]',
    highlightedBlack: 'bg-[#1E1F22]',
    secondary: 'bg-[#F2F3F5]',
    tertiary: 'bg-[#E3E5E8]',
    focus: 'bg-[#D7D8DD]',
    primaryHover: 'hover:bg-[#F7F7F7]',
    primaryHoverHighlighted: 'hover:bg-[#EBEBED]',
    hoverBlurple: 'hover:bg-[#5865f2]',
    divider: 'bg-[#CBCED2]',
  },
  text: {
    base: 'text-[#4E5058]',
    gray: 'text-[#B5BAC1]',
    link: 'text-[#02a8fc]',
    black: 'text-[#060607]',
    white: 'text-[#ffffff]',
    highlighted: 'text-[#4E5058]',
    highlightedHover: 'hover:text-[#303237]',
    hoverWhite: 'hover:text-[#ffffff]',
  },
}