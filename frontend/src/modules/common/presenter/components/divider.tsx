"use client";

import { useTheme } from "@/modules/theme";
import { twJoin } from "tailwind-merge";

export type DividerProps = React.HTMLAttributes<HTMLSpanElement>;

export function Divider({ className, ...props }: DividerProps) {
  const { theme } = useTheme();

  return (
    <>
      <span
        className={twJoin("rounded", theme.divider, className)}
        {...props}
      ></span>
    </>
  );
}
