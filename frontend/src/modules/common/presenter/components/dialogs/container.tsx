import { Button, Column, Icon } from "@/modules/common";
import { useTheme } from "@/modules/theme";
import { twJoin } from "tailwind-merge";

export type DialogContainerProps = React.PropsWithChildren<{
  onClose: () => void;
}>;

export function DialogContainer({ children, onClose }: DialogContainerProps) {
  const { theme } = useTheme();

  return (
    <Column
      className={twJoin(
        "relative w-[27.5rem] min-h-52 max-h-[85%] rounded",
        theme.colors.background.primary
      )}
    >
      <Button className="absolute right-3 top-3" onClick={() => onClose()}>
        <Icon
          name={"close"}
          className={twJoin("text-2xl", theme.colors.text.base)}
        />
      </Button>
      {children}
    </Column>
  );
}
