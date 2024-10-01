import { useTheme } from "@/modules/theme";
import { twJoin } from "tailwind-merge";
import { Button, ButtonProps } from "../buttons";

export type LeftNavigationBarItemProps = React.PropsWithChildren<
  Pick<ButtonProps, "onClick"> & {
    selected?: boolean;
  }
>;

export function LeftNavigationBarItem({
  children,
  onClick,
  selected = false,
}: LeftNavigationBarItemProps) {
  const { theme } = useTheme();

  return (
    <Button
      className={twJoin(
        selected
          ? theme.colors.common.background.blurple
          : theme.colors.background.focus,
        "w-full aspect-square",
        selected ? "rounded-2xl" : "rounded-full hover:rounded-2xl",
        selected ? "" : theme.colors.background.hoverBlurple,
        selected ? theme.colors.text.white : theme.colors.text.hoverWhite
      )}
      style={{
        transition: selected
          ? "none"
          : "background-color .1s ease-out, color .1s ease-out",
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
