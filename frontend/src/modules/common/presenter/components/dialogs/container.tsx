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
        "relative w-min p-4 h-min",
        theme.colors.background.primary
      )}
    >
      <Button className="absolute right-0 top-0" onClick={() => onClose()}>
        <Icon name={"close"} />
      </Button>
      {children}
    </Column>
  );
}
