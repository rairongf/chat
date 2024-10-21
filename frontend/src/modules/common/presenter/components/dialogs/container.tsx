import { Button, Column, Icon } from "@/modules/common";
import { useTheme } from "@/modules/theme";
import { twJoin, twMerge } from "tailwind-merge";

export type DialogContainerProps = React.PropsWithChildren<{
  onClose: () => void;
}> &
  Pick<React.HTMLAttributes<HTMLDivElement>, "className">;

export function DialogContainer({
  children,
  className,
  onClose,
}: DialogContainerProps) {
  const { theme } = useTheme();

  return (
    <Column
      className={twMerge(
        "relative w-[27.5rem] min-h-52 max-h-[85%] rounded",
        theme.colors.background.primary,
        className
      )}
    >
      <Button
        className="absolute right-3 top-3 size-6"
        onClick={() => onClose()}
      >
        <Icon
          name={"close"}
          className={twJoin("text-2xl leading-none", theme.colors.text.base)}
        />
      </Button>
      {children}
    </Column>
  );
}
