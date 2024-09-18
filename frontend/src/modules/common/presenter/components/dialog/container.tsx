import { Button, Column, Icon } from "@/modules/common";

export type DialogContainerProps = React.PropsWithChildren<{
  onClose: () => void;
}>;

export function DialogContainer({ children, onClose }: DialogContainerProps) {
  return (
    <Column className="relative w-min p-4 h-min bg-indigo-400">
      <Button className="absolute right-0 top-0" onClick={() => onClose()}>
        <Icon name={"close"} />
      </Button>
      {children}
    </Column>
  );
}
