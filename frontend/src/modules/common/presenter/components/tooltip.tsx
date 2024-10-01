"use client";

import { useTheme } from "@/modules/theme";
import { useState } from "react";
import { twJoin } from "tailwind-merge";

export type TooltipProps = React.PropsWithChildren<{
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  message: string;
}>;
export function Tooltip({ children, containerProps, message }: TooltipProps) {
  const { theme } = useTheme();
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const { className, ...props } = { ...containerProps };

  const tooltipId = message.toLowerCase().split(" ").join("_");

  return (
    <div
      className={twJoin("group", className)}
      onMouseOver={(e) => {
        const tooltip = document.getElementById(tooltipId);
        if (!tooltip) return;

        const tooltipRect = tooltip.getBoundingClientRect();

        const rect = e.currentTarget.getBoundingClientRect();

        const newPosition = {
          top: rect.top - 1.75 * rect.height,
          left: rect.left + rect.width / 2 - tooltipRect.width / 2,
        };

        if (
          position.top == newPosition.top &&
          position.left == newPosition.left
        )
          return;

        setPosition(newPosition);
      }}
      {...props}
    >
      <div
        id={tooltipId}
        className={twJoin(
          "hidden group-hover:block px-2 py-1.5 rounded-md shadow text-sm",
          "w-max absolute z-10",
          theme.colors.background.primary,
          theme.colors.text.black
        )}
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        {message}
      </div>
      {children}
    </div>
  );
}
